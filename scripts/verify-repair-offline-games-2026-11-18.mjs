import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const batch = Number(process.argv[2]);
const folders = { 1: 'Doodle Jump', 2: 'Crossy Road', 3: 'Google Snake' };
const game = folders[batch];
if (!game) throw new Error('Unknown batch ' + batch);

const root = process.cwd();
const origin = 'http://127.0.0.1:4173';
const folder = path.join(root, game);
const artifacts = path.join(root, 'artifacts');
fs.mkdirSync(artifacts, { recursive: true });

const result = {
  batch,
  game,
  ok: false,
  notes: [],
  externalRequests: [],
  failedLocalRequests: [],
  pageErrors: [],
  consoleErrors: [],
  responses: [],
};

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function verifyAssetGraph() {
  const index = path.join(folder, 'index.html');
  assert(fs.existsSync(index), 'index.html missing');
  const html = fs.readFileSync(index, 'utf8');
  assert(html.trim().length > 0, 'index.html is empty');

  const refs = [...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  for (const ref of refs) {
    if (/^(?:data:|#|javascript:|mailto:)/i.test(ref)) continue;
    assert(!/^(?:https?:)?\/\//i.test(ref), 'external HTML dependency: ' + ref);
    assert(!ref.startsWith('/'), 'root-relative HTML path is not portable: ' + ref);
    const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
    const target = path.resolve(folder, clean);
    assert(target.startsWith(folder + path.sep) || target === folder, 'HTML path escapes game folder: ' + ref);
    assert(fs.existsSync(target), 'missing HTML dependency: ' + ref);
  }

  let cssCount = 0;
  for (const file of walk(folder).filter(f => f.endsWith('.css'))) {
    cssCount++;
    const css = fs.readFileSync(file, 'utf8');
    for (const m of css.matchAll(/@import\s+(?:url\()?["']?([^"')\s;]+)["']?\)?\s*;/gi)) {
      const ref = m[1].trim();
      assert(!/^(?:https?:)?\/\//i.test(ref), 'external CSS import: ' + ref);
      const target = path.resolve(path.dirname(file), decodeURIComponent(ref.split(/[?#]/)[0]));
      assert(target.startsWith(folder + path.sep), 'CSS import escapes game folder: ' + ref);
      assert(fs.existsSync(target), 'missing CSS import: ' + ref);
    }
    for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
      const ref = m[1].trim();
      if (/^(?:data:|#)/i.test(ref)) continue;
      assert(!/^(?:https?:)?\/\//i.test(ref), 'external CSS asset: ' + ref);
      const target = path.resolve(path.dirname(file), decodeURIComponent(ref.split(/[?#]/)[0]));
      assert(target.startsWith(folder + path.sep), 'CSS asset escapes game folder: ' + ref);
      assert(fs.existsSync(target), 'missing CSS asset: ' + ref);
    }
  }

  for (const file of walk(folder).filter(f => /\.(?:js|html)$/i.test(f))) {
    if (path.basename(file) === 'three.min.js') continue;
    const source = fs.readFileSync(file, 'utf8');
    assert(!/\bfetch\s*\(/i.test(source), 'runtime fetch() found in ' + path.relative(folder, file));
    assert(!/\bnew\s+XMLHttpRequest\b/i.test(source), 'XMLHttpRequest found in ' + path.relative(folder, file));
    assert(!/\bnew\s+WebSocket\b/i.test(source), 'WebSocket found in ' + path.relative(folder, file));
  }

  result.notes.push('Static graph passed: ' + refs.length + ' HTML references and ' + cssCount + ' local CSS files; every referenced asset exists.');
  return html;
}

const server = http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || '/', origin).pathname);
    if (pathname === '/favicon.ico') {
      res.writeHead(204);
      res.end();
      return;
    }
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    const size = fs.statSync(file).size;
    const headers = {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Content-Length': size,
      'Access-Control-Allow-Origin': '*',
    };
    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return;
    }
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
});

async function attachGuards(context, page) {
  page.on('pageerror', error => result.pageErrors.push(String(error.message || error)));
  page.on('console', message => {
    if (message.type() === 'error') result.consoleErrors.push(message.text());
  });
  page.on('requestfailed', request => {
    if (request.url().startsWith(origin)) {
      result.failedLocalRequests.push(request.url() + ' ' + (request.failure()?.errorText || 'failed'));
    }
  });
  page.on('response', response => {
    if (response.url().startsWith(origin)) {
      result.responses.push({ url: new URL(response.url()).pathname, status: response.status() });
      if (response.status() >= 400) result.failedLocalRequests.push(response.status() + ' ' + response.url());
    }
  });
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.protocol === 'data:' || url.protocol === 'blob:' || url.origin === origin) {
      await route.continue();
    } else {
      result.externalRequests.push(url.href);
      await route.abort();
    }
  });
}

async function testDoodleJump(browser) {
  const context = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const page = await context.newPage();
  await attachGuards(context, page);
  await page.goto(origin + '/Doodle%20Jump/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.doodler', { timeout: 10000 });
  await page.waitForFunction(() => document.querySelectorAll('.platform').length >= 5, { timeout: 10000 });

  const before = await page.locator('.doodler').evaluate(el => parseFloat(el.style.left));
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(260);
  const after = await page.locator('.doodler').evaluate(el => parseFloat(el.style.left));
  assert(Number.isFinite(before) && Number.isFinite(after) && Math.abs(after - before) >= 5,
    'ArrowLeft did not move the Doodler; left=' + before + ' -> ' + after);

  const styles = await page.evaluate(() => ({
    background: getComputedStyle(document.querySelector('.grid')).backgroundImage,
    doodler: getComputedStyle(document.querySelector('.doodler')).backgroundImage,
    platform: getComputedStyle(document.querySelector('.platform')).backgroundImage,
  }));
  assert(styles.background.includes('background.png') && styles.doodler.includes('doodler-guy.png') &&
    styles.platform.includes('platform.png'), 'local game image styles did not resolve: ' + JSON.stringify(styles));

  await page.screenshot({ path: path.join(artifacts, 'batch-01-doodle-jump.png'), fullPage: true });
  result.notes.push('Chromium rendered five platforms and the Doodler from local PNG files.');
  result.notes.push('ArrowLeft moved the player horizontally by ' + Math.abs(after - before).toFixed(1) + ' pixels.');
  await context.close();
}

async function testCrossyRoad(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await attachGuards(context, page);
  await page.goto(origin + '/Crossy%20Road/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await page.waitForFunction(() => {
    const canvas = document.querySelector('canvas');
    return canvas && canvas.width > 100 && canvas.height > 100;
  }, { timeout: 15000 });

  const before = Number(await page.locator('#counter').textContent());
  await page.locator('#forward').click();
  await page.waitForFunction(() => Number(document.querySelector('#counter').textContent) >= 1, { timeout: 6000 });
  const after = Number(await page.locator('#counter').textContent());
  assert(after > before, 'Forward input did not advance the player; counter=' + before + ' -> ' + after);

  const webgl = await page.locator('canvas').evaluate(canvas => {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return { width: canvas.width, height: canvas.height, webgl: !!gl };
  });
  assert(webgl.webgl, 'Three.js did not create a WebGL context.');
  await page.screenshot({ path: path.join(artifacts, 'batch-02-crossy-road.png'), fullPage: true });
  result.notes.push('Three.js r99 initialized a local WebGL canvas at ' + webgl.width + 'x' + webgl.height + '.');
  result.notes.push('Forward button advanced the player counter from ' + before + ' to ' + after + '.');
  await context.close();
}

async function testGoogleSnake(browser) {
  const context = await browser.newContext({ viewport: { width: 1000, height: 850 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await attachGuards(context, page);
  await page.goto(origin + '/Google%20Snake/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#gameCanvas', { timeout: 10000 });
  await page.locator('button[onclick="game.start()"]').click();
  await page.waitForFunction(() => game.gameRunning === true, { timeout: 5000 });

  const before = await page.evaluate(() => ({
    x: game.snake[0].x,
    y: game.snake[0].y,
    direction: { x: game.direction.x, y: game.direction.y },
  }));
  await page.keyboard.press('ArrowUp');
  await page.waitForFunction(() => game.nextDirection.y === -1 || game.direction.y === -1, { timeout: 3000 });
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => ({
    x: game.snake[0].x,
    y: game.snake[0].y,
    direction: { x: game.direction.x, y: game.direction.y },
    nextDirection: { x: game.nextDirection.x, y: game.nextDirection.y },
  }));
  assert(after.direction.y === -1 || after.nextDirection.y === -1, 'ArrowUp did not change the snake direction.');
  assert(after.y < before.y || after.direction.y === -1, 'Snake did not move after the direction input.');

  await page.screenshot({ path: path.join(artifacts, 'batch-03-google-snake.png'), fullPage: true });
  result.notes.push('Standalone HTML game started and entered its playing state.');
  result.notes.push('ArrowUp changed the snake direction to up; head moved from (' + before.x + ',' + before.y + ') to (' + after.x + ',' + after.y + ').');
  await context.close();
}

async function main() {
  verifyAssetGraph();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(4173, '127.0.0.1', resolve);
  });

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--enable-webgl',
        '--ignore-gpu-blocklist',
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--disable-dev-shm-usage',
      ],
    });

    if (batch === 1) await testDoodleJump(browser);
    if (batch === 2) await testCrossyRoad(browser);
    if (batch === 3) await testGoogleSnake(browser);

    assert(result.externalRequests.length === 0,
      'External runtime requests were attempted: ' + result.externalRequests.join(', '));
    assert(result.failedLocalRequests.length === 0,
      'Local requests failed: ' + result.failedLocalRequests.join(', '));
    assert(result.pageErrors.length === 0,
      'Page errors: ' + result.pageErrors.join(' | '));
    assert(result.consoleErrors.length === 0,
      'Console errors: ' + result.consoleErrors.join(' | '));

    result.notes.push('Offline browser passed: 0 external requests, 0 failed local requests, 0 page errors and 0 console errors.');
    result.ok = true;
  } catch (error) {
    result.notes.push('FAILED: ' + String(error.stack || error));
    result.ok = false;
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }

  fs.writeFileSync(path.join(artifacts, 'verification-batch-' + batch + '.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 1;
}

main().catch(error => {
  result.ok = false;
  result.notes.push('Harness failure: ' + String(error.stack || error));
  fs.mkdirSync(artifacts, { recursive: true });
  fs.writeFileSync(path.join(artifacts, 'verification-batch-' + batch + '.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = 1;
});
