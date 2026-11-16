import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const root=process.cwd(), out=path.join(root,'artifacts'), origin='http://127.0.0.1:4173';
fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{
  try{
    const u=new URL(req.url||'/',origin);
    let f=path.resolve(root,'.'+decodeURIComponent(u.pathname));
    if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
    if(!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404);res.end();return;}
    const e=path.extname(f).toLowerCase(),m={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.json':'application/json','.ttf':'font/ttf','.mp3':'audio/mpeg','.frag':'text/plain'};
    res.writeHead(200,{'Content-Type':m[e]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(f).pipe(res);
  }catch(e){res.writeHead(500);res.end(String(e));}
});
async function main(){
  await new Promise((r,j)=>{server.once('error',j);server.listen(4173,'127.0.0.1',r);});
  const browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
  const context=await browser.newContext({viewport:{width:1280,height:800}}),page=await context.newPage();
  const external=[],errors=[],failed=[],steps=[];
  page.on('pageerror',e=>errors.push(String(e.stack||e)));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('requestfailed',r=>{if(r.url().startsWith(origin))failed.push(r.url()+' '+(r.failure()?.errorText||'failed'));});
  await context.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin===origin)await route.continue();else{external.push(u.href);await route.abort();}});
  await page.goto(origin+'/Awesome%20Tanks/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('canvas')?.width>300,{timeout:30000});
  const canvas=page.locator('canvas').first(),box=await canvas.boundingBox();
  if(!box||box.width<300||box.height<200)throw new Error('Canvas bounds unavailable');
  const shot=async name=>{
    await page.screenshot({path:path.join(out,name+'.png')});
    steps.push({name,screenshot:name+'.png',info:await page.evaluate(()=>({canvas:(()=>{const c=document.querySelector('canvas');return c?{width:c.width,height:c.height}:null})(),phaser:!!window.Phaser,bodyText:document.body.innerText.slice(0,200)}))});
  };
  const click=async(name,x,y,wait=2000)=>{await page.mouse.click(box.x+box.width*x,box.y+box.height*y);await page.waitForTimeout(wait);await shot(name);};
  await page.waitForTimeout(1200);await shot('01-title');
  await click('02-play',0.50,0.61,2500);
  await click('03-disable-sound',0.58,0.55,1800);
  await click('04-disable-music',0.58,0.55,2500);
  const result={steps,external,errors,failed,canvasBounds:box};
  fs.writeFileSync(path.join(out,'diagnostic.json'),JSON.stringify(result,null,2));
  console.log('AWESOME_TANKS_DIAGNOSTIC='+JSON.stringify(result));
  await browser.close();await new Promise(r=>server.close(r));
}
main().catch(e=>{fs.writeFileSync(path.join(out,'diagnostic-error.txt'),String(e.stack||e));console.error(e);process.exitCode=1;try{server.close();}catch{}});
