import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {chromium} from 'playwright';

const root=process.cwd(),origin='http://127.0.0.1:4176',out=path.join(root,'artifacts');
fs.mkdirSync(out,{recursive:true});
const targets=['Among Us','Boxing Random','Fruit Merge','Big NEON Tower Tiny Square'];
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg','.wasm':'application/wasm',
  '.unityweb':'application/octet-stream','.data':'application/octet-stream',
  '.mp3':'audio/mpeg','.ogg':'audio/ogg','.svg':'image/svg+xml','.woff2':'font/woff2'};

const server=http.createServer((req,res)=>{
  if(req.url==='/host.html'){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.end('<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>');
    return;
  }
  res.writeHead(404);res.end('not found');
});

function encodePath(value){return String(value).split('/').map(encodeURIComponent).join('/');}
function siteHtml(folder){
  let html=fs.readFileSync(path.join(root,folder,'index.html'),'utf8').replace(/<base\b[^>]*>/ig,'');
  const base='<base href="https://cdn.jsdelivr.net/gh/hummingbird-9/games@main/'+encodePath(folder)+'/">';
  return /<head\b[^>]*>/i.test(html)?html.replace(/<head\b[^>]*>/i,m=>m+base):
    '<!doctype html><html><head><meta charset="utf-8">'+base+'</head><body>'+html+'</body></html>';
}
function events(){return {external:[],responses:[],failed:[],pageErrors:[],consoleErrors:[]};}
async function snapshot(frame){
  return frame.evaluate(()=>{
    const all=[...document.querySelectorAll('canvas,ruffle-player,ruffle-object,embed,object,video,#unity-canvas,#gameContainer')];
    const elements=all.map(el=>{
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return {tag:el.tagName.toLowerCase(),id:el.id||'',width:Math.round(r.width),height:Math.round(r.height),
        display:s.display,visibility:s.visibility,opacity:s.opacity};
    });
    return {title:document.title,url:location.href,origin:location.origin,baseURI:document.baseURI,
      readyState:document.readyState,text:(document.body?.innerText||'').replace(/\s+/g,' ').slice(0,160),
      runtimeElements:elements.length,
      visibleRuntimeElements:elements.filter(e=>e.width>20&&e.height>20&&e.display!=='none'&&e.visibility!=='hidden'&&e.opacity!=='0').length,
      elements};
  });
}

async function main(){
  await new Promise((r,j)=>{server.once('error',j);server.listen(4176,'127.0.0.1',r);});
  let browser;const results=[];
  try{
    browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
    for(const folder of targets){
      const result={game:folder,srcdoc:null,directIframe:null,srcdocEvents:events(),directIframeEvents:events()};
      const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,ignoreHTTPSErrors:true});
      let active=result.srcdocEvents;

      await context.route('**/*',async route=>{
        const req=route.request(),raw=req.url();
        if(raw.startsWith(origin)||/^(?:blob:|data:|about:|chrome-extension:)/i.test(raw)){await route.continue();return;}
        let u;try{u=new URL(raw);}catch{await route.continue();return;}
        if(u.hostname==='cdn.jsdelivr.net'&&u.pathname==='/game-capture.js'){
          await route.fulfill({status:200,contentType:'application/javascript; charset=utf-8',body:'/* no-op test helper */'});return;
        }
        let file=null;
        const repoPrefix='/gh/hummingbird-9/games@main/';
        if(u.hostname==='cdn.jsdelivr.net'&&u.pathname.startsWith(repoPrefix)){
          file=path.resolve(root,decodeURIComponent(u.pathname.slice(repoPrefix.length)));
        }else{
          file=path.resolve(root,folder,'_ext',u.host,decodeURIComponent(u.pathname).replace(/^\/+/,''));
        }
        if(file.startsWith(root+path.sep)&&fs.existsSync(file)&&fs.statSync(file).isFile()){
          const body=fs.readFileSync(file);
          await route.fulfill({status:200,contentType:mime[path.extname(file).toLowerCase()]||'application/octet-stream',
            body:req.method()==='HEAD'?'':body});
          return;
        }
        await route.continue();
      });

      const page=await context.newPage();
      page.on('request',q=>{if(/^https?:/.test(q.url())&&!q.url().startsWith(origin))active.external.push(q.url());});
      page.on('response',q=>active.responses.push({url:q.url(),status:q.status()}));
      page.on('requestfailed',q=>active.failed.push({url:q.url(),error:q.failure()?.errorText||'failed'}));
      page.on('pageerror',e=>active.pageErrors.push(String(e.message||e)));
      page.on('console',m=>{if(m.type()==='error'&&active.consoleErrors.length<20)active.consoleErrors.push(m.text());});

      const html=siteHtml(folder),remoteUrl='https://cdn.jsdelivr.net/gh/hummingbird-9/games@main/'+encodePath(folder)+'/index.html';
      try{
        await page.goto(origin+'/host.html',{waitUntil:'domcontentloaded'});
        await page.setContent('<!doctype html><html><head><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe id="game"></iframe></body></html>');
        await page.locator('#game').evaluate((el,source)=>{el.srcdoc=source;},html);
        await page.waitForTimeout(8000);
        let child=page.frames().find(f=>f.parentFrame()===page.mainFrame());
        result.srcdoc=child?await snapshot(child):{error:'srcdoc frame unavailable'};
        await page.locator('#game').screenshot({path:path.join(out,folder.replace(/[^a-z0-9]+/gi,'-')+'-srcdoc.png')});

        active=result.directIframeEvents;
        await page.locator('#game').evaluate((el,url)=>{el.removeAttribute('srcdoc');el.src=url;},remoteUrl);
        await page.waitForTimeout(10000);
        child=page.frames().find(f=>f.parentFrame()===page.mainFrame());
        result.directIframe=child?await snapshot(child):{error:'direct iframe frame unavailable'};
        await page.locator('#game').screenshot({path:path.join(out,folder.replace(/[^a-z0-9]+/gi,'-')+'-direct-iframe.png')});
      }catch(e){result.error=String(e.stack||e);}
      await context.close();
      const a=result.srcdoc||{},b=result.directIframe||{};
      result.comparison=(a.visibleRuntimeElements||0)===0&&(b.visibleRuntimeElements||0)>0?
        'Direct iframe URL renders; srcdoc does not':
        (a.visibleRuntimeElements||0)>0&&(b.visibleRuntimeElements||0)>0?
          'Both srcdoc and direct iframe render runtime elements':
          'Neither mode showed a visible runtime element';
      results.push(result);
      console.log(folder+': '+result.comparison);
    }
  }finally{
    if(browser)await browser.close().catch(()=>{});
    await new Promise(r=>server.close(r));
  }
  const report={generatedAt:new Date().toISOString(),
    note:'Compares the production games.html iframe.srcdoc technique against an iframe.src pointing to the game HTML on jsDelivr. External requests are allowed; checked-out repo files and _ext caches are served locally when available.',
    results};
  fs.writeFileSync(path.join(out,'direct-iframe-vs-srcdoc.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(results.map(x=>({game:x.game,comparison:x.comparison,srcdoc:x.srcdoc,directIframe:x.directIframe,
    srcdocErrors:x.srcdocEvents?.pageErrors,directErrors:x.directIframeEvents?.pageErrors})),null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
