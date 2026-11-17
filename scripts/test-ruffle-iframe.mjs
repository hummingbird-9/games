import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const root=process.cwd();
const origin='http://127.0.0.1:4175';
const out=path.join(root,'artifacts');
fs.mkdirSync(out,{recursive:true});

const targets=[
  'Bloons TD 2','Bloons TD 4','Duck Life 2','Duck Life',
  'Learn to Fly 2','Learn to Fly 3','Learn to Fly',
  'Plants vs Zombies','Raft Wars 2','Raft Wars','Red Ball','Run 1',
  'Super Mario 63',"The World's Hardest Game",'This Is The Only Level'
];
const mime={
  '.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml',
  '.wasm':'application/wasm','.swf':'application/x-shockwave-flash',
  '.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav'
};
const server=http.createServer((req,res)=>{
  if(req.url==='/host.html'){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.end('<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>');
    return;
  }
  res.writeHead(404);res.end('not found');
});

function gameHtml(folder){
  let html=fs.readFileSync(path.join(root,folder,'index.html'),'utf8');
  html=html.replace(/<base\b[^>]*>/ig,'');
  const base='<base href="https://cdn.jsdelivr.net/gh/hummingbird-9/games@main/'+
    folder.split('/').map(encodeURIComponent).join('/')+'/">';
  if(/<head\b[^>]*>/i.test(html)) return html.replace(/<head\b[^>]*>/i,m=>m+base);
  return '<!doctype html><html><head><meta charset="utf-8">'+base+'</head><body>'+html+'</body></html>';
}

function makeEvents(){
  return {external:[],responses:[],failed:[],pageErrors:[],consoleErrors:[]};
}

async function snapshot(frame){
  return frame.evaluate(()=>{
    const all=[...document.querySelectorAll('ruffle-player,ruffle-embed,ruffle-object,object,embed,canvas')];
    const elements=all.map(el=>{
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return {tag:el.tagName.toLowerCase(),width:Math.round(r.width),height:Math.round(r.height),
        display:s.display,visibility:s.visibility,opacity:s.opacity,
        type:el.getAttribute('type')||'',src:el.getAttribute('src')||''};
    });
    return {
      title:document.title,
      readyState:document.readyState,
      ruffleGlobal:!!window.RufflePlayer,
      rufflePlayerElements:elements.filter(x=>x.tag.startsWith('ruffle-')).length,
      canvasElements:elements.filter(x=>x.tag==='canvas').length,
      objectElements:elements.filter(x=>x.tag==='object').length,
      embedElements:elements.filter(x=>x.tag==='embed').length,
      visibleRuntimeElements:elements.filter(x=>x.width>20&&x.height>20&&x.display!=='none'&&x.visibility!=='hidden'&&x.opacity!=='0').length,
      text:(document.body?.innerText||'').replace(/\s+/g,' ').slice(0,160),
      elements
    };
  });
}

async function main(){
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(4175,'127.0.0.1',resolve);});
  let browser;
  const results=[];
  try{
    browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage',
      '--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});

    for(const folder of targets){
      const result={game:folder,direct:null,iframe:null,directEvents:makeEvents(),iframeEvents:makeEvents()};
      const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,ignoreHTTPSErrors:true});
      let active=result.directEvents;

      await context.route('**/*',async route=>{
        const request=route.request(),raw=request.url();
        if(raw.startsWith(origin)||/^(?:blob:|data:|about:|chrome-extension:)/i.test(raw)){
          await route.continue();return;
        }
        let u;
        try{u=new URL(raw);}catch{await route.continue();return;}

        if(u.hostname==='cdn.jsdelivr.net'&&u.pathname==='/game-capture.js'){
          await route.fulfill({status:200,contentType:'application/javascript; charset=utf-8',body:'/* no-op test helper */'});
          return;
        }

        let candidate=null;
        const repoPrefix='/gh/hummingbird-9/games@main/';
        if(u.hostname==='cdn.jsdelivr.net'&&u.pathname.startsWith(repoPrefix)){
          const relative=decodeURIComponent(u.pathname.slice(repoPrefix.length)).replace(/^\/+/,'');
          candidate=path.resolve(root,relative);
        }else{
          const relative=decodeURIComponent(u.pathname).replace(/^\/+/,'');
          candidate=path.resolve(root,folder,'_ext',u.host,relative);
        }

        if(candidate&&candidate.startsWith(root+path.sep)&&fs.existsSync(candidate)&&fs.statSync(candidate).isFile()){
          const buffer=fs.readFileSync(candidate);
          const range=request.headers().range;
          if(range){
            const m=/^bytes=(\d*)-(\d*)$/.exec(range);
            if(m){
              let first=m[1]?Number(m[1]):0,last=m[2]?Number(m[2]):buffer.length-1;
              if(!m[1]&&m[2])first=Math.max(0,buffer.length-Number(m[2]));
              last=Math.min(last,buffer.length-1);
              if(first<=last&&first<buffer.length){
                await route.fulfill({status:206,contentType:mime[path.extname(candidate).toLowerCase()]||'application/octet-stream',
                  body:buffer.subarray(first,last+1),
                  headers:{'Accept-Ranges':'bytes','Content-Range':'bytes '+first+'-'+last+'/'+buffer.length}});
                return;
              }
            }
          }
          await route.fulfill({status:200,contentType:mime[path.extname(candidate).toLowerCase()]||'application/octet-stream',
            body:request.method()==='HEAD'?'':buffer});
          return;
        }

        if(/google-analytics|googletagmanager|doubleclick|googleadservices|cloudflareinsights|\/cdn-cgi\/rum/i.test(raw)){
          await route.abort();return;
        }
        // Important: let uncached SWF URLs reach their real public source so we can
        // compare the tab and iframe behavior rather than fail them artificially.
        await route.continue();
      });

      const page=await context.newPage();
      page.on('request',q=>{
        if(/^https?:/.test(q.url())&&!q.url().startsWith(origin)) active.external.push(q.url());
      });
      page.on('response',q=>active.responses.push({url:q.url(),status:q.status()}));
      page.on('requestfailed',q=>active.failed.push({url:q.url(),error:q.failure()?.errorText||'failed'}));
      page.on('pageerror',e=>active.pageErrors.push(String(e.message||e)));
      page.on('console',m=>{if(m.type()==='error'&&active.consoleErrors.length<20)active.consoleErrors.push(m.text());});

      const html=gameHtml(folder);
      try{
        await page.goto(origin+'/host.html',{waitUntil:'domcontentloaded'});
        await page.setContent(html,{waitUntil:'domcontentloaded',timeout:15000});
        await page.waitForTimeout(7500);
        result.direct=await snapshot(page.mainFrame());
        await page.screenshot({path:path.join(out,folder.replace(/[^a-z0-9]+/gi,'-')+'-tab.png')});

        active=result.iframeEvents;
        await page.setContent('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe id="game" allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write" allowfullscreen></iframe></body></html>');
        await page.locator('#game').evaluate((el,source)=>{el.srcdoc=source;},html);
        await page.waitForTimeout(7500);
        const child=page.frames().find(f=>f.parentFrame()===page.mainFrame());
        result.iframe=child?await snapshot(child):{error:'iframe child frame not found'};
        await page.locator('#game').screenshot({path:path.join(out,folder.replace(/[^a-z0-9]+/gi,'-')+'-iframe.png')});
      }catch(e){
        result.error=String(e.stack||e);
      }finally{
        await context.close();
      }

      const direct=result.direct||{},iframe=result.iframe||{};
      if((direct.rufflePlayerElements||0)>0&&(iframe.rufflePlayerElements||0)===0) result.comparison='Ruffle player only appears in top-level tab';
      else if((direct.rufflePlayerElements||0)>0&&(iframe.rufflePlayerElements||0)>0) result.comparison='Ruffle player appears in both tab and iframe';
      else if((iframe.objectElements||iframe.embedElements||0)>0) result.comparison='Object/embed exists in iframe but Ruffle player not detected';
      else result.comparison='Ruffle player not detected in one or both modes';
      results.push(result);
      console.log(folder+': '+result.comparison);
    }
  }finally{
    if(browser)await browser.close().catch(()=>{});
    await new Promise(resolve=>server.close(resolve));
  }

  const output={generatedAt:new Date().toISOString(),note:'Real SWF URLs were allowed to load. Local _ext Ruffle runtime files were served from the repository cache. This tests runtime rendering, not full gameplay.',results};
  fs.writeFileSync(path.join(out,'ruffle-iframe-comparison.json'),JSON.stringify(output,null,2));
  console.log(JSON.stringify({results:results.map(x=>({game:x.game,comparison:x.comparison,direct:x.direct,iframe:x.iframe,
    iframeFailed:x.iframeEvents.failed,iframeErrors:x.iframeEvents.pageErrors,iframeConsole:x.iframeEvents.consoleErrors.slice(0,5)}))},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
