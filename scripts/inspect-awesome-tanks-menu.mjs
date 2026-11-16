import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const root = process.cwd();
const out = path.join(root, 'artifacts');
fs.mkdirSync(out, {recursive:true});
const origin = 'http://127.0.0.1:4173';
const server = http.createServer((req,res) => {
  try {
    const url = new URL(req.url || '/', origin);
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
    const ext = path.extname(file).toLowerCase();
    const types = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.json':'application/json','.ttf':'font/ttf','.mp3':'audio/mpeg','.frag':'text/plain'};
    res.writeHead(200, {'Content-Type':types[ext] || 'application/octet-stream','Cache-Control':'no-store'});
    fs.createReadStream(file).pipe(res);
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});

async function main() {
  await new Promise((resolve,reject) => { server.once('error',reject); server.listen(4173,'127.0.0.1',resolve); });
  const browser = await chromium.launch({headless:true,args:['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
  const context = await browser.newContext({viewport:{width:1280,height:800}});
  const page = await context.newPage();
  const external = [], errors = [], failed = [], steps = [];
  page.on('pageerror', e => errors.push(String(e.stack || e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('requestfailed', r => { if (r.url().startsWith(origin)) failed.push(r.url() + ' ' + (r.failure()?.errorText || 'failed')); });
  await context.route('**/*', async route => {
    const u = new URL(route.request().url());
    if (u.origin === origin) await route.continue();
    else { external.push(u.href); await route.abort(); }
  });
  await page.goto(origin + '/Awesome%20Tanks/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(() => document.querySelector('canvas')?.width > 300,{timeout:30000});
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  if (!box || box.width < 300 || box.height < 200) throw new Error('Canvas bounds unavailable');
  const shot = async name => {
    const p = path.join(out,name + '.png');
    await page.screenshot({path:p});
    steps.push({name, screenshot:name+'.png', info:await page.evaluate(() => ({
      canvas: (()=>{const c=document.querySelector('canvas');return c?{width:c.width,height:c.height}:null})(),
      bodyText:document.body.innerText.slice(0,300),
      phaser:!!window.Phaser,
      state:window.game?.state?.current || window.gameInstance?.state?.current || null
    }))});
  };
  const click = async (name,x,y,wait=1800) => {
    await page.mouse.click(box.x + box.width*x, box.y + box.height*y);
    await page.waitForTimeout(wait);
    await shot(name);
  };
  await page.waitForTimeout(1500);
  await shot('01-title');
  // The title screen's Play button is centered near y=0.61.
  await click('02-play',0.50,0.61,2500);
  // The next screen asks whether sound should be enabled. The Disable button
  // is on the right at approximately x=0.58, y=0.55.
  await click('03-disable-sound',0.58,0.55,2500);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1500);
  await shot('04-after-sound');
  await page.keyboard.press('Space');
  await page.keyboard.down('w');
  await page.waitForTimeout(800);
  await page.keyboard.up('w');
  await page.mouse.click(box.x+box.width*0.72,box.y+box.height*0.50);
  await page.waitForTimeout(1000);
  await shot('05-input');
  const result = {steps,external,errors,failed,canvasBounds:box};
  fs.writeFileSync(path.join(out,'diagnostic.json'),JSON.stringify(result,null,2));
  console.log('AWESOME_TANKS_DIAGNOSTIC=' + JSON.stringify(result));
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
main().catch(async e => {
  fs.writeFileSync(path.join(out,'diagnostic-error.txt'),String(e.stack || e));
  console.error(e);
  process.exitCode=1;
  try { server.close(); } catch {}
});
