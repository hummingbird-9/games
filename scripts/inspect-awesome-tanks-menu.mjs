import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const root = process.cwd();
const out = path.join(root,'artifacts');
fs.mkdirSync(out,{recursive:true});
const origin = 'http://127.0.0.1:4173';
const server = http.createServer((req,res)=>{
  const url = new URL(req.url || '/',origin);
  let file = path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(file!==root && !file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404);res.end();return;}
  const ext=path.extname(file).toLowerCase();
  const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.json':'application/json','.ttf':'font/ttf','.mp3':'audio/mpeg','.frag':'text/plain'};
  res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
});

async function main(){
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(4173,'127.0.0.1',resolve);});
  const browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
  const context=await browser.newContext({viewport:{width:1280,height:800}});
  const page=await context.newPage();
  const external=[],errors=[],failed=[];
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('requestfailed',r=>{if(r.url().startsWith(origin))failed.push(r.url());});
  await context.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin===origin)await route.continue();else{external.push(u.href);await route.abort();}});
  await page.goto(origin+'/Awesome%20Tanks/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('canvas')?.width>300,{timeout:30000});
  const canvas=page.locator('canvas').first();
  const box=await canvas.boundingBox();
  const snap=async name=>{await page.screenshot({path:path.join(out,name+'.png')});};
  const info=async()=>await page.evaluate(()=>{
    const c=document.querySelector('canvas');
    return {canvas:c?{width:c.width,height:c.height}:null,bodyText:document.body.innerText.slice(0,500),
      windowKeys:Object.keys(window).filter(k=>/game|phaser|state|menu/i.test(k)).slice(0,60),
      gameState:window.game?.state?.current||null,href:location.href};
  });
  await page.waitForTimeout(1800);
  await snap('01-initial');
  const positions=[];
  const click=async(name,x,y)=>{
    await page.mouse.click(box.x+box.width*x,box.y+box.height*y);
    await page.waitForTimeout(700);
    positions.push({name,x,y,info:await info()});
    await snap(name);
  };
  await click('02-disable-sound',0.58,0.55);
  await click('03-center-65',0.50,0.65);
  await click('04-center-55',0.50,0.55);
  await click('05-center-45',0.50,0.45);
  await click('06-left-65',0.35,0.65);
  await click('07-right-65',0.65,0.65);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);
  positions.push({name:'08-enter',info:await info()});
  await snap('08-enter');
  await page.keyboard.press('Space');
  await page.keyboard.down('w'); await page.waitForTimeout(700); await page.keyboard.up('w');
  await page.mouse.click(box.x+box.width*0.75,box.y+box.height*0.5);
  await page.waitForTimeout(700);
  positions.push({name:'09-game-input',info:await info()});
  await snap('09-game-input');
  fs.writeFileSync(path.join(out,'diagnostic.json'),JSON.stringify({positions,external,errors,failed},null,2));
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
main().catch(async e=>{fs.writeFileSync(path.join(out,'diagnostic-error.txt'),String(e.stack||e));process.exitCode=1;try{server.close();}catch{}});
