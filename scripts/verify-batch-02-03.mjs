import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const root = process.cwd();
const batch = Number(process.argv[2] || 2);
const origin = 'http://127.0.0.1:4173';
const artifacts = path.join(root, 'artifacts');
fs.mkdirSync(artifacts, { recursive: true });

const results = {};
const mime = {
  '.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp',
  '.ico':'image/x-icon','.wasm':'application/wasm','.data':'application/octet-stream',
  '.wav':'audio/wav','.ogg':'audio/ogg','.mp3':'audio/mpeg',
  '.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml',
  '.frag':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'
};

const server = http.createServer((req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url || '/', origin).pathname);
    if (pathname === '/favicon.ico') { res.writeHead(204); res.end(); return; }
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end('forbidden'); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end('not found'); return; }
    const size = fs.statSync(file).size;
    const headers = {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control':'no-store','Accept-Ranges':'bytes','Content-Length':size,
      'Access-Control-Allow-Origin':'*'
    };
    if (req.method === 'HEAD') { res.writeHead(200, headers); res.end(); return; }
    const range = req.headers.range;
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!m) { res.writeHead(416, {'Content-Range':'bytes */' + size}); res.end(); return; }
      let start = m[1] ? Number(m[1]) : 0;
      let end = m[2] ? Number(m[2]) : size - 1;
      if (!m[1] && m[2]) start = Math.max(0, size - Number(m[2]));
      end = Math.min(end, size - 1);
      if (start > end || start >= size) { res.writeHead(416, {'Content-Range':'bytes */' + size}); res.end(); return; }
      res.writeHead(206, {...headers,'Content-Length':end-start+1,'Content-Range':'bytes '+start+'-'+end+'/'+size});
      fs.createReadStream(file,{start,end}).pipe(res);
      return;
    }
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});

function assert(ok, message) { if (!ok) throw new Error(message); }

function staticGraph(folder) {
  const htmlPath = path.join(root, folder, 'index.html');
  assert(fs.existsSync(htmlPath), folder + ': index.html missing');
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert(html.trim().length > 0, folder + ': index.html empty');
  const refs = [...html.matchAll(/(?:src|href|poster)\s*=\s*["']([^"']*)["']/gi)].map(m => m[1]);
  const cssFiles = [];
  for (const ref of refs) {
    if (!ref || /^(?:data:|#|javascript:|mailto:|tel:|blob:)/i.test(ref)) continue;
    assert(!/^(?:https?:)?\/\//i.test(ref), folder + ': external HTML dependency ' + ref);
    const clean = decodeURIComponent(ref.split(/[?#]/)[0]).replace(/^\.\//, '');
    if (!clean) continue;
    const target = ref.startsWith('/') ? path.resolve(root, clean) : path.resolve(root, folder, clean);
    assert(target === root || target.startsWith(root + path.sep), folder + ': path escapes repository: ' + ref);
    assert(fs.existsSync(target), folder + ': missing local HTML dependency ' + ref);
    if (/\.css$/i.test(clean)) cssFiles.push(target);
  }
  for (const cssFile of cssFiles) {
    const css = fs.readFileSync(cssFile, 'utf8');
    const cssRefs = [...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map(m => m[1].trim());
    for (const ref of cssRefs) {
      if (!ref || /^(?:data:|#|blob:)/i.test(ref)) continue;
      assert(!/^(?:https?:)?\/\//i.test(ref), folder + ': external CSS dependency ' + ref);
      const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
      const target = path.resolve(path.dirname(cssFile), clean);
      assert(target === root || target.startsWith(root + path.sep), folder + ': CSS path escapes repository ' + ref);
      assert(fs.existsSync(target), folder + ': missing local CSS dependency ' + ref);
    }
  }
  return { htmlRefs: refs.length, cssFiles: cssFiles.length };
}

function pixelDiff(aBuffer, bBuffer) {
  const a = PNG.sync.read(aBuffer), b = PNG.sync.read(bBuffer);
  if (a.width !== b.width || a.height !== b.height) return Number.MAX_SAFE_INTEGER;
  let changed = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    const d = Math.abs(a.data[i]-b.data[i]) + Math.abs(a.data[i+1]-b.data[i+1]) + Math.abs(a.data[i+2]-b.data[i+2]);
    if (d > 45) changed++;
  }
  return changed;
}

async function trackedPage(browser, result) {
  const context = await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});
  const page = await context.newPage();
  result.external = [];
  result.pageErrors = [];
  result.consoleErrors = [];
  result.failed = [];
  result.responses = [];
  page.on('pageerror', e => result.pageErrors.push(String(e.message || e)));
  page.on('console', m => { if (m.type() === 'error') result.consoleErrors.push(m.text()); });
  page.on('requestfailed', req => {
    if (req.url().startsWith(origin)) result.failed.push(req.url() + ' ' + (req.failure()?.errorText || 'failed'));
  });
  page.on('response', resp => {
    if (resp.url().startsWith(origin)) {
      result.responses.push({url:new URL(resp.url()).pathname,status:resp.status()});
      if (resp.status() >= 400) result.failed.push(resp.status() + ' ' + resp.url());
    }
  });
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) await route.continue();
    else { result.external.push(url.href); await route.abort(); }
  });
  return {context,page};
}

function clean(result) {
  assert(result.external.length === 0, 'external requests attempted: ' + result.external.join(', '));
  assert(result.failed.length === 0, 'failed local requests: ' + result.failed.join(' | '));
  assert(result.pageErrors.length === 0, 'page errors: ' + result.pageErrors.join(' | '));
}

async function testBackrooms(browser) {
  const result = {ok:false,notes:[]}; results.backrooms = result;
  const graph = staticGraph('Backrooms');
  result.notes.push('Static local HTML/CSS graph passed: ' + JSON.stringify(graph));
  const {context,page} = await trackedPage(browser,result);
  try {
    await page.goto(origin + '/Backrooms/index.html',{waitUntil:'domcontentloaded'});
    await page.waitForSelector('#btn-enter',{timeout:10000});
    await page.locator('#btn-enter').click();
    await page.waitForFunction(() => window.SL && window.SL.game && window.SL.game.state.mode === 'play',{timeout:15000});
    const before = await page.evaluate(() => ({x:window.SL.game.state.player.x,y:window.SL.game.state.player.y}));
    await page.keyboard.down('w'); await page.waitForTimeout(700); await page.keyboard.up('w');
    const after = await page.evaluate(() => ({x:window.SL.game.state.player.x,y:window.SL.game.state.player.y}));
    const movement = Math.hypot(after.x-before.x,after.y-before.y);
    assert(movement > 0.05,'W movement did not move the player; distance=' + movement);
    await page.screenshot({path:path.join(artifacts,'backrooms-playing.png')});
    result.notes.push('Chromium entered level 0 and reached SL.game.state.mode=play.');
    result.notes.push('WASD gameplay moved the player ' + movement.toFixed(3) + ' world units.');
    clean(result);
    result.notes.push('Offline browser: zero external requests, zero failed local requests and zero page errors.');
    result.ok = true;
  } finally { await context.close(); }
}

async function testPool(browser) {
  const result = {ok:false,notes:[]}; results.pool = result;
  const graph = staticGraph('8 Ball Pool');
  result.notes.push('Static local HTML/CSS graph passed: ' + JSON.stringify(graph));
  const {context,page} = await trackedPage(browser,result);
  try {
    await page.goto(origin + '/8%20Ball%20Pool/index.html',{waitUntil:'domcontentloaded'});
    await page.locator('#modeGrid .mode-card[data-mode="bot"]').click({timeout:10000});
    await page.waitForSelector('#screenLobby.active',{timeout:10000});
    await page.locator('#cityCarousel .city-card').first().click();
    await page.waitForFunction(() => document.getElementById('screenGame')?.classList.contains('active'),{timeout:15000});
    await page.locator('#confirmPlaceBtn').click();
    await page.waitForFunction(() => document.getElementById('ballInHandBar').style.display === 'none',{timeout:5000});
    assert(!(await page.locator('#shootBtn').isDisabled()),'shoot control remained disabled after cue-ball placement');
    const canvas = page.locator('#table');
    const before = await canvas.screenshot();
    const box = await page.locator('#powerWrap').boundingBox();
    assert(box && box.height > 40,'power slider is not visible');
    await page.mouse.move(box.x+box.width/2,box.y+box.height*0.92);
    await page.mouse.down();
    await page.mouse.move(box.x+box.width/2,box.y+box.height*0.12,{steps:12});
    await page.mouse.up();
    await page.waitForTimeout(1100);
    const after = await canvas.screenshot();
    const diff = pixelDiff(before,after);
    assert(diff > 100,'power-slider shot did not change the pool table; changed pixels=' + diff);
    await page.screenshot({path:path.join(artifacts,'pool-gameplay.png')});
    result.notes.push('Local HTML5 Canvas pool game entered bot match and placed the cue ball.');
    result.notes.push('Power-slider release fired a shot and changed ' + diff + ' canvas pixels.');
    clean(result);
    result.notes.push('Offline browser: zero external requests, zero failed local requests and zero page errors.');
    result.ok = true;
  } finally { await context.close(); }
}

async function testAngryBirds(browser) {
  const result = {ok:false,notes:[]}; results.angryBirds = result;
  const graph = staticGraph('Angry Birds');
  result.notes.push('Static local HTML/CSS graph passed: ' + JSON.stringify(graph));
  const {context,page} = await trackedPage(browser,result);
  try {
    await page.goto(origin + '/Angry%20Birds/index.html',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => window.bird && window.engine && document.querySelector('canvas'),{timeout:20000});
    const canvas = page.locator('canvas').first();
    const box = await canvas.boundingBox();
    assert(box && box.width > 500 && box.height > 300,'p5 canvas has unusable dimensions');
    const initial = await page.evaluate(() => ({
      x:window.bird.body.position.x,y:window.bird.body.position.y,
      width:window.GAME_WIDTH,height:window.GAME_HEIGHT,launched:window.launched
    }));
    const sx = box.x + initial.x/initial.width*box.width;
    const sy = box.y + initial.y/initial.height*box.height;
    await page.mouse.move(sx,sy);
    await page.mouse.down();
    await page.mouse.move(box.x+(initial.x-85)/initial.width*box.width,box.y+(initial.y+65)/initial.height*box.height,{steps:12});
    await page.mouse.up();
    await page.waitForTimeout(650);
    const after = await page.evaluate(() => ({
      launched:window.launched,x:window.bird.body.position.x,y:window.bird.body.position.y,
      speed:window.bird.body.speed
    }));
    assert(after.launched === true,'slingshot release did not enter launched state');
    assert(after.speed > 0.03 || Math.hypot(after.x-initial.x,after.y-initial.y) > 5,'bird did not move after launch');
    await page.screenshot({path:path.join(artifacts,'angry-birds-playing.png')});
    result.notes.push('p5/Matter.js initialized the local level with ' + initial.width + 'x' + initial.height + ' world dimensions.');
    result.notes.push('Mouse drag/release activated the slingshot; bird speed=' + Number(after.speed).toFixed(3) + '.');
    clean(result);
    result.notes.push('Offline browser: zero external requests, zero failed local requests and zero page errors.');
    result.ok = true;
  } finally { await context.close(); }
}

async function testSnake(browser) {
  const result = {ok:false,notes:[]}; results.snake = result;
  const graph = staticGraph('Blocky Snakes');
  result.notes.push('Static local HTML/CSS graph passed: ' + JSON.stringify(graph));
  const {context,page} = await trackedPage(browser,result);
  try {
    await page.goto(origin + '/Blocky%20Snakes/index.html',{waitUntil:'domcontentloaded'});
    await page.waitForSelector('#board',{timeout:10000});
    await page.locator('#overlay-action').click({timeout:10000});
    await page.waitForFunction(() => document.getElementById('overlay').hidden === true,{timeout:5000});
    const canvas = page.locator('#board');
    await canvas.focus();
    const before = await canvas.screenshot();
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(550);
    const after = await canvas.screenshot();
    const diff = pixelDiff(before,after);
    assert(diff > 40,'Snake direction input did not change the gameplay canvas; changed pixels=' + diff);
    await page.screenshot({path:path.join(artifacts,'snake-playing.png')});
    result.notes.push('OpenGames Snake loaded its local gameplay, input, UI, audio and style modules.');
    result.notes.push('Play button and ArrowUp control changed ' + diff + ' canvas pixels.');
    clean(result);
    result.notes.push('Offline browser: zero external requests, zero failed local requests and zero page errors.');
    result.ok = true;
  } finally { await context.close(); }
}

async function testAwesomeTanks(browser) {
  const result = {ok:false,notes:[]}; results.awesomeTanks = result;
  const graph = staticGraph('Awesome Tanks');
  result.notes.push('Static local HTML/CSS graph passed: ' + JSON.stringify(graph));
  const {context,page} = await trackedPage(browser,result);
  try {
    await page.goto(origin + '/Awesome%20Tanks/index.html',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.width > 300 && c.height > 200;
    },{timeout:30000});
    await page.waitForTimeout(2200);
    const canvas = page.locator('canvas').first();
    const box = await canvas.boundingBox();
    assert(box && box.width > 300 && box.height > 200,'Phaser canvas has unusable dimensions');
    const beforeState = await page.evaluate(() => {
      const g = window.game || window.gameInstance || null;
      return g && g.state ? (g.state.current || g.state.currentState?.key || null) : null;
    });
    const idleA = await canvas.screenshot();
    await page.waitForTimeout(650);
    const idleB = await canvas.screenshot();
    const idleDiff = pixelDiff(idleA,idleB);
    const points = [[0.5,0.52],[0.5,0.62],[0.5,0.72],[0.5,0.42],[0.65,0.62]];
    for (const p of points) {
      await page.mouse.click(box.x+box.width*p[0],box.y+box.height*p[1]);
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      await page.waitForTimeout(250);
    }
    await page.keyboard.down('w');
    await page.mouse.click(box.x+box.width*0.72,box.y+box.height*0.5);
    await page.keyboard.up('w');
    await page.waitForTimeout(1100);
    const after = await canvas.screenshot();
    const actionDiff = pixelDiff(idleB,after);
    const afterState = await page.evaluate(() => {
      const g = window.game || window.gameInstance || null;
      return g && g.state ? (g.state.current || g.state.currentState?.key || null) : null;
    });
    assert((beforeState && afterState && beforeState !== afterState) || actionDiff > Math.max(500,idleDiff*1.2),
      'menu/gameplay input produced no measurable state or canvas transition; idle=' + idleDiff + ', action=' + actionDiff + ', state=' + beforeState + ' -> ' + afterState);
    await page.screenshot({path:path.join(artifacts,'awesome-tanks-playing.png')});
    result.notes.push('Phaser HTML5 canvas initialized at ' + Math.round(box.width) + 'x' + Math.round(box.height) + '.');
    result.notes.push('Menu/gameplay input produced canvas change=' + actionDiff + ' (idle baseline=' + idleDiff + '); state=' + beforeState + ' -> ' + afterState + '.');
    clean(result);
    result.notes.push('Offline browser: zero external requests, zero failed local requests and zero page errors.');
    result.ok = true;
  } finally { await context.close(); }
}

async function main() {
  await new Promise((resolve,reject) => { server.once('error',reject); server.listen(4173,'127.0.0.1',resolve); });
  let browser;
  try {
    browser = await chromium.launch({headless:true,args:[
      '--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle',
      '--use-angle=swiftshader','--disable-dev-shm-usage'
    ]});
    if (batch === 2) {
      await testBackrooms(browser).catch(e => { results.backrooms = results.backrooms || {ok:false,notes:[]}; results.backrooms.ok=false; results.backrooms.notes.push('FAILED: ' + String(e.stack || e)); });
      await testPool(browser).catch(e => { results.pool = results.pool || {ok:false,notes:[]}; results.pool.ok=false; results.pool.notes.push('FAILED: ' + String(e.stack || e)); });
      await testAngryBirds(browser).catch(e => { results.angryBirds = results.angryBirds || {ok:false,notes:[]}; results.angryBirds.ok=false; results.angryBirds.notes.push('FAILED: ' + String(e.stack || e)); });
      await testSnake(browser).catch(e => { results.snake = results.snake || {ok:false,notes:[]}; results.snake.ok=false; results.snake.notes.push('FAILED: ' + String(e.stack || e)); });
    } else if (batch === 3) {
      await testAwesomeTanks(browser).catch(e => { results.awesomeTanks = results.awesomeTanks || {ok:false,notes:[]}; results.awesomeTanks.ok=false; results.awesomeTanks.notes.push('FAILED: ' + String(e.stack || e)); });
    } else {
      throw new Error('Batch must be 2 or 3');
    }
  } catch (e) {
    results.harness = {ok:false,notes:[String(e.stack || e)]};
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
  const output = path.join(artifacts,'batch-' + String(batch).padStart(2,'0') + '-verification.json');
  fs.writeFileSync(output,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
}
main().catch(e => {
  results.harness = {ok:false,notes:[String(e.stack || e)]};
  const output = path.join(artifacts,'batch-' + String(batch).padStart(2,'0') + '-verification.json');
  fs.writeFileSync(output,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
});
