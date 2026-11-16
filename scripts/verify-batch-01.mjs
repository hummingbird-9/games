import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const root = process.cwd();
const origin = 'http://127.0.0.1:4173';
const artifacts = path.join(root, 'artifacts');
fs.mkdirSync(artifacts, { recursive: true });

const results = {
  baldi: { ok: false, notes: [], external: [], errors: [], failed: [] },
  bowling: { ok: false, notes: [], external: [], errors: [], failed: [] },
  harness: { ok: false, notes: [] },
};

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.data': 'application/octet-stream',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url || '/', origin).pathname);
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
      'Accept-Ranges': 'bytes',
      'Content-Length': size,
      'Access-Control-Allow-Origin': '*',
    };
    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return;
    }
    const range = req.headers.range;
    if (range) {
      const match = /^bytes=(\\d*)-(\\d*)$/.exec(range);
      if (!match) {
        res.writeHead(416, { 'Content-Range': 'bytes */' + size });
        res.end();
        return;
      }
      let start = match[1] ? Number(match[1]) : 0;
      let end = match[2] ? Number(match[2]) : size - 1;
      if (!match[1] && match[2]) start = Math.max(0, size - Number(match[2]));
      end = Math.min(end, size - 1);
      if (start > end || start >= size) {
        res.writeHead(416, { 'Content-Range': 'bytes */' + size });
        res.end();
        return;
      }
      res.writeHead(206, {
        ...headers,
        'Content-Length': end - start + 1,
        'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  } catch (err) {
    res.writeHead(500);
    res.end(String(err));
  }
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function verifyLocalHtmlGraph(folder, requiredFiles = []) {
  const index = path.join(folder, 'index.html');
  assert(fs.existsSync(index), 'index.html is missing');
  const html = fs.readFileSync(index, 'utf8');
  assert(html.trim().length > 0, 'index.html is empty');

  const refs = [...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  for (const ref of refs) {
    if (/^(?:data:|#|javascript:)/i.test(ref)) continue;
    assert(!/^(?:https?:)?\/\//i.test(ref), 'external HTML dependency: ' + ref);
    const clean = decodeURIComponent(ref.split('?')[0].split('#')[0]).replace(/^\.\//, '');
    const target = path.resolve(folder, clean);
    assert(target === folder || target.startsWith(folder + path.sep), 'path escapes game folder: ' + ref);
    assert(fs.existsSync(target), 'missing local HTML dependency: ' + ref);
  }

  const cssFiles = [];
  for (const ref of refs) {
    if (/\.css(?:[?#]|$)/i.test(ref)) cssFiles.push(path.resolve(folder, decodeURIComponent(ref.split('?')[0])));
  }
  for (const cssFile of cssFiles) {
    const css = fs.readFileSync(cssFile, 'utf8');
    for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
      const ref = m[1].trim();
      const decodedRef = decodeURIComponent(ref);
      if (/^(?:data:|#)/i.test(decodedRef)) continue;
      assert(!/^(?:https?:)?\/\//i.test(ref), 'external CSS dependency: ' + ref);
      const target = path.resolve(path.dirname(cssFile), decodeURIComponent(ref.split('?')[0]));
      assert(target === folder || target.startsWith(folder + path.sep), 'CSS path escapes game folder: ' + ref);
      assert(fs.existsSync(target), 'missing local CSS dependency: ' + ref);
    }
  }

  for (const rel of requiredFiles) {
    assert(fs.existsSync(path.join(folder, rel)), 'missing required runtime file: ' + rel);
  }
  return { htmlRefs: refs.length, cssFiles: cssFiles.length };
}

function nodeTest(folder, testFile) {
  const r = spawnSync(process.execPath, [testFile], { cwd: folder, encoding: 'utf8', timeout: 30000 });
  return {
    ok: r.status === 0,
    status: r.status,
    stdout: (r.stdout || '').slice(-5000),
    stderr: (r.stderr || '').slice(-5000),
  };
}

async function pageTracker(context, page, target) {
  target.responses = [];
  page.on('pageerror', e => target.errors.push(String(e.message || e)));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const message = msg.text().trim();
      // libpd prints its bundled Pure Data version banner to stderr during startup.
      if (message !== 'pd 0.55.0') target.errors.push(message);
    }
  });
  page.on('requestfailed', req => {
    if (req.url().startsWith(origin)) target.failed.push(req.url() + ' ' + (req.failure()?.errorText || 'failed'));
  });
  page.on('websocket', ws => {
    if (!ws.url().startsWith(origin)) target.external.push('WebSocket ' + ws.url());
  });
  page.on('response', resp => {
    if (resp.url().startsWith(origin)) {
      target.responses.push({ url: new URL(resp.url()).pathname, status: resp.status() });
      if (resp.status() >= 400) target.failed.push(resp.status() + ' ' + resp.url());
    }
  });
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) await route.continue();
    else {
      target.external.push(url.href);
      await route.abort();
    }
  });
}

function pixelDiff(aBuffer, bBuffer) {
  const a = PNG.sync.read(aBuffer);
  const b = PNG.sync.read(bBuffer);
  if (a.width !== b.width || a.height !== b.height) return Number.MAX_SAFE_INTEGER;
  let changed = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    const delta = Math.abs(a.data[i] - b.data[i]) +
      Math.abs(a.data[i + 1] - b.data[i + 1]) +
      Math.abs(a.data[i + 2] - b.data[i + 2]);
    if (delta > 45) changed++;
  }
  return changed;
}

async function testBaldi(browser) {
  const folder = path.join(root, "Baldi's Basics");
  const graph = verifyLocalHtmlGraph(folder);
  const map = nodeTest(folder, 'tests/map-check.js');
  const seed = nodeTest(folder, 'tests/seed-map-test.js');
  results.baldi.notes.push('Local HTML/CSS asset graph passed: ' + JSON.stringify(graph));
  results.baldi.notes.push('map-check.js: ' + (map.ok ? 'PASS' : 'FAIL'));
  results.baldi.notes.push('seed-map-test.js: ' + (seed.ok ? 'PASS' : 'FAIL'));
  if (!map.ok) throw new Error('map-check.js failed: ' + map.stderr + map.stdout);
  if (!seed.ok) throw new Error('seed-map-test.js failed: ' + seed.stderr + seed.stdout);

  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await pageTracker(context, page, results.baldi);
  await page.goto(origin + "/Baldi%27s%20Basics/index.html", { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => {
    const loading = document.getElementById('loading-screen');
    return loading && getComputedStyle(loading).display === 'none' &&
      document.querySelector('#ui-layer .ui-button');
  }, { timeout: 45000 });

  const initialState = await page.evaluate(() => Game.state);
  assert(initialState === 'menu', 'Baldi recreation did not reach the main menu: ' + initialState);
  await page.locator('#ui-layer .ui-button').first().click();
  await page.waitForFunction(() => Game.state === 'playing', { timeout: 15000 });

  const before = await page.evaluate(() => Game.__debug.pos());
  await page.keyboard.down('w');
  await page.waitForTimeout(700);
  await page.keyboard.up('w');
  const after = await page.evaluate(() => Game.__debug.pos());
  const movement = Math.hypot(after.x - before.x, after.z - before.z);
  assert(movement > 0.03, 'W input did not move the player; movement=' + movement);
  assert(results.baldi.external.length === 0, 'external requests attempted: ' + results.baldi.external.join(', '));
  assert(results.baldi.errors.length === 0, 'browser errors: ' + results.baldi.errors.join(' | '));
  assert(results.baldi.failed.length === 0, 'failed local requests: ' + results.baldi.failed.join(' | '));

  await page.screenshot({ path: path.join(artifacts, 'baldi-playing.png'), fullPage: true });
  results.baldi.notes.push('Chromium reached the menu and entered Game.state=playing.');
  results.baldi.notes.push('W movement changed player position by ' + movement.toFixed(3) + ' world units.');
  results.baldi.notes.push('Offline browser: 0 external requests, 0 page/console errors, 0 failed local requests.');
  results.baldi.ok = true;
  await context.close();
}

async function testBowling(browser) {
  const folder = path.join(root, '3D Bowling');
  const graph = verifyLocalHtmlGraph(folder, ['BowlingOnline2.js', 'BowlingOnline2.data', 'BowlingOnline2.wasm']);
  results.bowling.notes.push('Local HTML asset graph passed: ' + JSON.stringify(graph));
  results.bowling.notes.push('Bundled runtime data and WebAssembly files exist.');

  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await pageTracker(context, page, results.bowling);
  await page.addInitScript(() => {
    window.__bowlingRuntimeReady = false;
    window.Module = {
      onRuntimeInitialized() { window.__bowlingRuntimeReady = true; },
    };
  });
  await page.goto(origin + '/3D%20Bowling/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__bowlingRuntimeReady === true ||
    (window.Module && window.Module.calledRun === true), { timeout: 60000 });

  const loaded = await page.evaluate(() => {
    const canvas = document.querySelector('#canvas');
    return {
      canvas: !!canvas,
      width: canvas?.width || 0,
      height: canvas?.height || 0,
      webgl: !!(canvas && (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))),
    };
  });
  assert(loaded.canvas && loaded.width > 0 && loaded.height > 0, 'bowling canvas did not initialize: ' + JSON.stringify(loaded));
  assert(loaded.webgl, 'WebGL context was not created');
  const dataLoaded = results.bowling.responses.some(x => x.url.endsWith('/BowlingOnline2.data') && (x.status === 200 || x.status === 206));
  const wasmLoaded = results.bowling.responses.some(x => x.url.endsWith('/BowlingOnline2.wasm') && (x.status === 200 || x.status === 206));
  assert(dataLoaded && wasmLoaded, 'local data/wasm responses missing: ' + JSON.stringify(results.bowling.responses));
  assert(results.bowling.external.length === 0, 'external requests attempted: ' + results.bowling.external.join(', '));
  assert(results.bowling.errors.length === 0, 'browser errors: ' + results.bowling.errors.join(' | '));

  const canvas = page.locator('#canvas');
  const box = await canvas.boundingBox();
  assert(box && box.width > 200 && box.height > 150, 'bowling canvas has no usable size');
  const idleA = await canvas.screenshot();
  await page.waitForTimeout(450);
  const idleB = await canvas.screenshot();
  const natural = pixelDiff(idleA, idleB);

  const swipes = [
    [0.50, 0.78, 0.50, 0.28],
    [0.42, 0.80, 0.58, 0.30],
    [0.58, 0.80, 0.42, 0.30],
  ];
  let actionDiff = 0;
  for (let i = 0; i < swipes.length; i++) {
    const [x1, y1, x2, y2] = swipes[i];
    await page.mouse.move(box.x + box.width * x1, box.y + box.height * y1);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * x2, box.y + box.height * y2, { steps: 14 });
    await page.mouse.up();
    await page.waitForTimeout(850);
    const after = await canvas.screenshot();
    actionDiff = Math.max(actionDiff, pixelDiff(idleB, after));
    await page.screenshot({ path: path.join(artifacts, 'bowling-after-swipe-' + (i + 1) + '.png') });
    if (actionDiff > Math.max(1200, natural * 1.15)) break;
  }
  await page.screenshot({ path: path.join(artifacts, 'bowling-loaded.png') });
  assert(actionDiff > Math.max(1200, natural * 1.15),
    'swipe did not produce a measurable gameplay frame change; idle=' + natural + ', swipe=' + actionDiff);

  assert(results.bowling.failed.length === 0, 'failed local requests: ' + results.bowling.failed.join(' | '));
  results.bowling.notes.push('Bundled .data and .wasm loaded from the local repository; WebAssembly runtime initialized.');
  results.bowling.notes.push('WebGL canvas initialized at ' + loaded.width + 'x' + loaded.height + '.');
  results.bowling.notes.push('Swipe gameplay changed ' + actionDiff + ' canvas pixels (idle baseline ' + natural + ').');
  results.bowling.notes.push('Offline browser: 0 external requests, 0 page/console errors, 0 failed local requests.');
  results.bowling.ok = true;
  await context.close();
}

async function main() {
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
    results.harness.ok = true;
    await testBaldi(browser).catch(err => {
      results.baldi.ok = false;
      results.baldi.notes.push('FAILED: ' + String(err.stack || err));
    });
    await testBowling(browser).catch(err => {
      results.bowling.ok = false;
      results.bowling.notes.push('FAILED: ' + String(err.stack || err));
    });
  } catch (err) {
    results.harness.ok = false;
    results.harness.notes.push(String(err.stack || err));
    results.baldi.notes.push('Browser harness failed: ' + String(err.message || err));
    results.bowling.notes.push('Browser harness failed: ' + String(err.message || err));
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }

  fs.writeFileSync(path.join(artifacts, 'verification.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}

main().catch(err => {
  results.harness.ok = false;
  results.harness.notes.push(String(err.stack || err));
  fs.mkdirSync(artifacts, { recursive: true });
  fs.writeFileSync(path.join(artifacts, 'verification.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  process.exitCode = 0;
});
