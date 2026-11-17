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
function newEvents() { return {external:[],cachedExternal:[],missingCachedExternal:[],optionalExternal:[],websockets:[],failed:[],httpErrors:[],pageErrors:[],consoleErrors:[]}; }

function encodePath(value) {
  return String(value).split('/').map(part => encodeURIComponent(part)).join('/');
}

function htmlForSiteViewer(folder) {
  const file = path.join(root, folder, 'index.html');
  if (!fs.existsSync(file)) throw new Error(folder + ': index.html missing');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<base\b[^>]*>/ig, '');
  const baseTag = '<base href="https://cdn.jsdelivr.net/gh/hummingbird-9/games@main/' + encodePath(folder) + '/">';
  if (/<head\b[^>]*>/i.test(html)) {
    return html.replace(/<head\b[^>]*>/i, match => match + baseTag);
  }
  return '<!doctype html><html><head><meta charset="utf-8">' + baseTag + '</head><body>' + html + '</body></html>';
}

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
  let active=r.directEvents;
  const optional=/google-analytics|googletagmanager|doubleclick|googleadservices|facebook\.com\/plugins|platform\.twitter\.com|cloudflareinsights|\/cdn-cgi\/rum|\/cdn-cgi\/challenge-platform/i;
  const repoCdnPrefix='/gh/hummingbird-9/games@main/';

  await ctx.route('**/*',async route=>{
    const request=route.request();
    const requestUrl=request.url();
    if(requestUrl.startsWith(origin)||/^(?:blob:|data:|about:|chrome-extension:)/i.test(requestUrl)) {
      await route.continue();
      return;
    }

    let u;
    try { u=new URL(requestUrl); }
    catch { active.missingCachedExternal.push(requestUrl); await route.abort(); return; }

    // Mirror the production CDN URL to the checked-out repository files.
    let candidate=null;
    if(u.hostname==='cdn.jsdelivr.net' && u.pathname.startsWith(repoCdnPrefix)) {
      const relative=decodeURIComponent(u.pathname.slice(repoCdnPrefix.length)).replace(/^\/+/, '');
      candidate=path.resolve(root,relative);
    } else if(u.hostname==='cdn.jsdelivr.net' && u.pathname==='/game-capture.js') {
      active.optionalExternal.push(requestUrl);
      await route.fulfill({status:200,contentType:'application/javascript; charset=utf-8',
        body:'/* test-only no-op for the live site capture helper */'});
      return;
    } else {
      const rel=decodeURIComponent(u.pathname).replace(/^\/+/, '');
      candidate=path.resolve(root,folder,'_ext',u.host,rel);
    }

    if(candidate && candidate.startsWith(root+path.sep) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      active.cachedExternal.push(requestUrl);
      const buffer=fs.readFileSync(candidate);
      const contentType=mime[path.extname(candidate).toLowerCase()]||'application/octet-stream';
      const range=request.headers().range;
      if(range) {
        const match=/^bytes=(\d*)-(\d*)$/.exec(range);
        if(match) {
          let first=match[1]?Number(match[1]):0;
          let last=match[2]?Number(match[2]):buffer.length-1;
          if(!match[1]&&match[2]) first=Math.max(0,buffer.length-Number(match[2]));
          last=Math.min(last,buffer.length-1);
          if(first<=last&&first<buffer.length) {
            await route.fulfill({status:206,contentType,body:buffer.subarray(first,last+1),
              headers:{'Accept-Ranges':'bytes','Content-Range':'bytes '+first+'-'+last+'/'+buffer.length}});
            return;
          }
        }
      }
      await route.fulfill({status:200,contentType,body:request.method()==='HEAD'?'':buffer});
      return;
    }

    if(optional.test(requestUrl)) {
      active.optionalExternal.push(requestUrl);
      await route.abort();
      return;
    }
    active.missingCachedExternal.push(requestUrl);
    await route.abort();
  });

  const page=await ctx.newPage();
  page.on('request',q=>{
    if(!q.url().startsWith(origin)&&! /^(?:blob:|data:|about:)/i.test(q.url())) active.external.push(q.url());
  });
  page.on('requestfailed',q=>active.failed.push({url:q.url(),error:q.failure()?.errorText||'failed'}));
  page.on('response',q=>{if(q.status()>=400) active.httpErrors.push({url:q.url(),status:q.status()});});
  page.on('pageerror',e=>active.pageErrors.push(String(e.message||e)));
  page.on('console',m=>{if(m.type()==='error'&&active.consoleErrors.length<10)active.consoleErrors.push(m.text());});
  page.on('websocket',ws=>active.websockets.push(ws.url()));

  const gameUrl='https://cdn.jsdelivr.net/gh/hummingbird-9/games@main/'+encodePath(folder)+'/index.html';
  try {
    // Test the URL as a regular tab.
    try { await page.goto(gameUrl,{waitUntil:'domcontentloaded',timeout:15000}); }
    catch(e) { r.directEvents.pageErrors.push('tab navigation: '+String(e.message||e).slice(0,140)); }
    await page.waitForTimeout(1800);
    try { r.direct=await directSnapshot(page); } catch(e) { r.direct={snapshotError:String(e)}; }

    // Reproduce the production Games page: a cross-origin iframe pointed at the actual CDN HTML URL.
    active=r.iframeEvents;
    try {
      await page.goto(origin+'/__iframe-audit-parent__.html',{waitUntil:'domcontentloaded',timeout:10000});
      await page.setContent('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe id="audit-game"></iframe></body></html>');
      await page.locator('#audit-game').evaluate((frame,url)=>{frame.src=url;},gameUrl);
      await page.waitForTimeout(2200);
      const child=page.frames().find(frame=>frame.parentFrame()===page.mainFrame());
      try { r.iframe=child?await directSnapshot(child):{snapshotError:'iframe child frame not found'}; }
      catch(e) { r.iframe={snapshotError:String(e)}; }
    } catch(e) {
      r.iframeEvents.pageErrors.push('iframe navigation: '+String(e.message||e).slice(0,140));
      r.iframe={snapshotError:String(e)};
    }

    const d=r.direct||{},c=r.iframe||{};
    const criticalExt=/\.(?:html?|mjs|js|css|wasm|data|unityweb|swf|json|bin|zip|bundle|part\d+)(?:$|[?#])/i;
    const missingCritical=(r.iframeEvents.missingCachedExternal||[])
      .filter(x=>criticalExt.test(new URL(x).pathname)).length;

    if((d.runtimeVisible||0)>0&&(c.runtimeVisible||0)===0&&missingCritical===0) r.classification='iframe-only-block-or-collapse';
    else if(missingCritical>0) r.classification='offline-game-assets-missing';
    else if((r.iframeEvents.missingCachedExternal||[]).length>0) r.classification='uncached-external-dependency';
    else if((r.iframeEvents.websockets||[]).length>0) r.classification='remote-websocket-service';
    else if((c.runtimeVisible||0)>0) r.classification='runtime-visible-in-iframe';
    else r.classification='no-runtime-element-detected';

    // Preserve the user's live-site confirmation over this intentionally offline-only audit.
    if(folder==='BitLife') r.classification='user-confirmed-working';
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
    'Scanned '+list.length+' game folders as top-level CDN URLs and in a full-size iframe whose src points to the same CDN URL, matching the updated production Games page.',
    'This is a load/embedding smoke test, not a gameplay certification. No game folders were modified or removed.',
    'The diagnostic server reproduces direct CDN iframe navigation and stubs the missing game-capture helper. Cached game-folder files and each games _ext cache are served from the checked-out repository.',
    '## Summary','','| Result | Games |','|---|---:|'];
  Object.keys(counts).sort((a,b)=>counts[b]-counts[a]).forEach(k=>lines.push('| '+k+' | '+counts[k]+' |'));
  lines.push('','## Per-game results','','| Game | Result | Tab runtime | Iframe runtime | Missing offline dependencies | Local request errors | WebSockets |',
    '|---|---|---:|---:|---:|---:|---:|');
  for(const x of results) {
    const d=x.direct||{},c=x.iframe?.child||{};
    const missing=(x.iframeEvents?.missingCachedExternal?.length||0);
    const local=(x.iframeEvents?.httpErrors||[]).filter(e=>e.url.startsWith(origin)).length+(x.iframeEvents?.failed||[]).filter(e=>e.url.startsWith(origin)).length;
    lines.push('| '+x.game.replace(/\|/g,'/')+' | '+x.classification+' | '+(d.runtimeVisible??'—')+' | '+
      (c.runtimeVisible??'—')+' | '+missing+' | '+local+' | '+(x.iframeEvents?.websockets?.length||0)+' |');
  }
  lines.push('','## Interpretation','',
    '- iframe-only-block-or-collapse: a runtime-like element appeared in a tab but not in the direct-URL iframe; inspect the source and live page before changing it.',
    '- user-confirmed-working: the user has confirmed this game works on the live site; it is not counted as broken by this offline audit.',
    '- iframe-caused-parent-navigation: likely frame-busting or redirect behavior.',
    '- offline-game-assets-missing: key scripts, loaders, JSON/data, WASM, SWF or equivalent assets are absent from the folder and its cached _ext files.',
    '- uncached-external-dependency: a non-optional remote dependency is not present in the local _ext cache.',
    '- optional analytics/ad requests are blocked and are reported separately rather than counted as game dependencies.',
    '- runtime-visible-in-iframe: a canvas/player-like element exists in the frame, but gameplay still needs manual input testing.',
    '- no-runtime-element-detected: may be a loader, DOM-only game, or incomplete build; review manually.','');
  fs.writeFileSync(path.join(reportDir,'2026-11-16-full-catalog-iframe-audit.md'),lines.join('\n'));
  console.log(JSON.stringify({gameCount:list.length,counts,report:'repair-reports/2026-11-16-full-catalog-iframe-audit.md'},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
