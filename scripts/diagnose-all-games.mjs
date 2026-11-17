import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const root = process.cwd();
const origin = 'http://127.0.0.1:4173';
const outDir = path.join(root, 'artifacts');
const reportDir = path.join(root, 'repair-reports');
fs.mkdirSync(outDir, {recursive:true});
fs.mkdirSync(reportDir, {recursive:true});

const mime = {
  '.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.ico':'image/x-icon',
  '.wasm':'application/wasm','.data':'application/octet-stream','.unityweb':'application/octet-stream',
  '.swf':'application/x-shockwave-flash','.ogg':'audio/ogg','.mp3':'audio/mpeg',
  '.wav':'audio/wav','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml'
};

const server = http.createServer((req,res) => {
  try {
    const url = new URL(req.url || '/', origin);
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === '/favicon.ico') { res.writeHead(204); res.end(); return; }
    if (pathname === '/game-capture.js') {
      res.writeHead(200, {'Content-Type':'application/javascript; charset=utf-8'});
      res.end('/* test-only stub; game-capture.js is supplied by the live site */');
      return;
    }
    if (pathname === '/__iframe-audit-parent__.html') {
      const src = (url.searchParams.get('src') || '/').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
      res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
      res.end('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe id="audit-game" src="' + src + '"></iframe></body></html>');
      return;
    }
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end('forbidden'); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end('not found'); return; }
    const size = fs.statSync(file).size;
    const headers = {'Content-Type':mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control':'no-store','Accept-Ranges':'bytes','Content-Length':size,'Access-Control-Allow-Origin':'*'};
    if (req.method === 'HEAD') { res.writeHead(200,headers); res.end(); return; }
    const range = req.headers.range;
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!m) { res.writeHead(416,{'Content-Range':'bytes */'+size}); res.end(); return; }
      let start = m[1] ? Number(m[1]) : 0;
      let end = m[2] ? Number(m[2]) : size-1;
      if (!m[1] && m[2]) start = Math.max(0,size-Number(m[2]));
      end = Math.min(end,size-1);
      if (start > end || start >= size) { res.writeHead(416,{'Content-Range':'bytes */'+size}); res.end(); return; }
      res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':'bytes '+start+'-'+end+'/'+size});
      fs.createReadStream(file,{start,end}).pipe(res);
      return;
    }
    res.writeHead(200,headers);
    fs.createReadStream(file).pipe(res);
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});

function games() {
  return fs.readdirSync(root,{withFileTypes:true})
    .filter(x => x.isDirectory() && !x.name.startsWith('.') &&
      !['scripts','repair-reports','artifacts','node_modules'].includes(x.name) &&
      fs.existsSync(path.join(root,x.name,'index.html')))
    .map(x=>x.name).sort((a,b)=>a.localeCompare(b));
}
function newEvents() { return {external:[],failed:[],httpErrors:[],pageErrors:[],consoleErrors:[]}; }

async function directSnapshot(page) {
  return page.evaluate(() => {
    const sel='canvas,object,embed,ruffle-player,ruffle-embed,video,#gameContainer,#unity-container,#playn-root';
    const elements=[...document.querySelectorAll(sel)].slice(0,20).map(el=>{
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return {tag:el.tagName.toLowerCase(),id:el.id||'',width:Math.round(r.width),height:Math.round(r.height),
        display:s.display,visibility:s.visibility,opacity:s.opacity};
    });
    return {title:document.title,url:location.href,readyState:document.readyState,
      text:(document.body?.innerText||'').replace(/\s+/g,' ').slice(0,180),
      runtimeElements:elements.length,
      runtimeVisible:elements.filter(e=>e.width>20&&e.height>20&&e.display!=='none'&&e.visibility!=='hidden'&&e.opacity!=='0').length,
      elements};
  });
}
async function iframeSnapshot(page) {
  return page.evaluate(() => {
    const f=document.getElementById('audit-game');
    const r=f?.getBoundingClientRect();
    const parent={url:location.href,frameWidth:r?Math.round(r.width):0,frameHeight:r?Math.round(r.height):0};
    if(!f) return {parent,child:null,accessError:'iframe missing'};
    try {
      const d=f.contentDocument;
      if(!d) return {parent,child:null,accessError:'contentDocument unavailable'};
      const sel='canvas,object,embed,ruffle-player,ruffle-embed,video,#gameContainer,#unity-container,#playn-root';
      const elements=[...d.querySelectorAll(sel)].slice(0,20).map(el=>{
        const r=el.getBoundingClientRect(),s=d.defaultView.getComputedStyle(el);
        return {tag:el.tagName.toLowerCase(),id:el.id||'',width:Math.round(r.width),height:Math.round(r.height),
          display:s.display,visibility:s.visibility,opacity:s.opacity};
      });
      return {parent,child:{title:d.title,url:f.contentWindow.location.href,readyState:d.readyState,
        text:(d.body?.innerText||'').replace(/\s+/g,' ').slice(0,180),
        runtimeElements:elements.length,
        runtimeVisible:elements.filter(e=>e.width>20&&e.height>20&&e.display!=='none'&&e.visibility!=='hidden'&&e.opacity!=='0').length,
        elements}};
    } catch(e) { return {parent,child:null,accessError:String(e)}; }
  });
}

async function testGame(browser,folder) {
  const r={game:folder,classification:'unknown',direct:null,iframe:null,
    directEvents:newEvents(),iframeEvents:newEvents()};
  const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,ignoreHTTPSErrors:true});
  const page=await ctx.newPage();
  let active=r.directEvents;
  page.on('request',q=>{if(!q.url().startsWith(origin)) active.external.push(q.url());});
  page.on('requestfailed',q=>active.failed.push({url:q.url(),error:q.failure()?.errorText||'failed'}));
  page.on('response',q=>{if(q.status()>=400) active.httpErrors.push({url:q.url(),status:q.status()});});
  page.on('pageerror',e=>active.pageErrors.push(String(e.message||e)));
  page.on('console',m=>{if(m.type()==='error'&&active.consoleErrors.length<10)active.consoleErrors.push(m.text());});
  const target='/' + encodeURIComponent(folder) + '/index.html';
  try {
    try { await page.goto(origin+target,{waitUntil:'domcontentloaded',timeout:10000}); }
    catch(e) { r.directEvents.pageErrors.push('navigation: '+String(e.message||e).slice(0,140)); }
    await page.waitForTimeout(900);
    try { r.direct=await directSnapshot(page); } catch(e) { r.direct={snapshotError:String(e)}; }

    active=r.iframeEvents;
    const parent=origin+'/__iframe-audit-parent__.html?src='+encodeURIComponent(target);
    try { await page.goto(parent,{waitUntil:'domcontentloaded',timeout:10000}); }
    catch(e) { r.iframeEvents.pageErrors.push('parent navigation: '+String(e.message||e).slice(0,140)); }
    await page.waitForTimeout(1200);
    try { r.iframe=await iframeSnapshot(page); } catch(e) { r.iframe={snapshotError:String(e)}; }
    r.parentNavigated=!page.url().startsWith(origin+'/__iframe-audit-parent__.html');
    const d=r.direct||{},c=r.iframe?.child||{};
    if(r.parentNavigated) r.classification='iframe-caused-parent-navigation';
    else if((d.runtimeVisible||0)>0&&(c.runtimeVisible||0)===0) r.classification='possible-iframe-block-or-content-collapse';
    else if((r.iframeEvents.httpErrors.length+r.iframeEvents.failed.length)>0) r.classification='iframe-resource-errors';
    else if((c.runtimeVisible||0)>0) r.classification='runtime-visible-in-iframe';
    else r.classification='no-runtime-element-detected';
  } finally { await ctx.close().catch(()=>{}); }
  return r;
}

async function main() {
  const list=games();
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(4173,'127.0.0.1',resolve);});
  let browser;
  const results=new Array(list.length);
  let cursor=0;
  try {
    browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage',
      '--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader']});
    async function worker() {
      while(true) {
        const i=cursor++;
        if(i>=list.length) return;
        try { results[i]=await testGame(browser,list[i]); }
        catch(e) { results[i]={game:list[i],classification:'harness-error',error:String(e.stack||e)}; }
        console.log('['+(i+1)+'/'+list.length+'] '+list[i]+' -> '+results[i].classification);
      }
    }
    await Promise.all(Array.from({length:6},worker));
  } finally {
    if(browser) await browser.close().catch(()=>{});
    await new Promise(resolve=>server.close(resolve));
  }

  const counts={};
  for(const x of results) counts[x.classification]=(counts[x.classification]||0)+1;
  const report={generatedAt:new Date().toISOString(),gameCount:list.length,
    note:'Load/embedding smoke test only; visible runtime elements do not prove gameplay. No game folders are modified or deleted.',
    counts,results};
  fs.writeFileSync(path.join(outDir,'full-catalog-iframe-audit.json'),JSON.stringify(report,null,2));
  const lines=['# Full-catalog iframe/load diagnostic — 2026-11-16','',
    'Scanned '+list.length+' game folders in a top-level tab and a same-origin full-size iframe.',
    'This is a load/embedding smoke test, not a gameplay certification. No game folders were modified or removed.',
    'The diagnostic server stubs /game-capture.js because that helper is provided by the live site, not stored with each game.','',
    '## Summary','','| Result | Games |','|---|---:|'];
  Object.keys(counts).sort((a,b)=>counts[b]-counts[a]).forEach(k=>lines.push('| '+k+' | '+counts[k]+' |'));
  lines.push('','## Per-game results','','| Game | Result | Tab runtime | Iframe runtime | Iframe HTTP/failures | Iframe external requests |',
    '|---|---|---:|---:|---:|---:|');
  for(const x of results) {
    const d=x.direct||{},c=x.iframe?.child||{};
    const errors=(x.iframeEvents?.httpErrors?.length||0)+(x.iframeEvents?.failed?.length||0);
    lines.push('| '+x.game.replace(/\|/g,'/')+' | '+x.classification+' | '+(d.runtimeVisible??'—')+' | '+
      (c.runtimeVisible??'—')+' | '+errors+' | '+(x.iframeEvents?.external?.length||0)+' |');
  }
  lines.push('','## Interpretation','',
    '- possible-iframe-block-or-content-collapse: a runtime-like element appeared in a tab but not in the iframe; inspect the source and live page before changing it.',
    '- iframe-caused-parent-navigation: likely frame-busting or redirect behavior.',
    '- iframe-resource-errors: missing files or failed requests while embedded.',
    '- runtime-visible-in-iframe: a canvas/player-like element exists in the frame, but gameplay still needs manual input testing.',
    '- no-runtime-element-detected: may be a loader, DOM-only game, or incomplete build; review manually.','');
  fs.writeFileSync(path.join(reportDir,'2026-11-16-full-catalog-iframe-audit.md'),lines.join('\n'));
  console.log(JSON.stringify({gameCount:list.length,counts,report:'repair-reports/2026-11-16-full-catalog-iframe-audit.md'},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
