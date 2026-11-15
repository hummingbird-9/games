#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const ROOT = process.cwd();
const game = process.argv[2];
if (!game) throw new Error('Pass one game folder name');
const gameRoot = path.join(ROOT, game);
let activeServer = null;
let activeBrowser = null;
let activeContext = null;
if (!fs.existsSync(path.join(gameRoot, 'index.html'))) throw new Error('Missing ' + game + '/index.html');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.wasm': 'application/wasm'
};

function listFiles(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out;
}

function auditAssetGraph() {
  const missing = [];
  const external = [];
  const checked = new Set();
  const baseOrigin = 'http://offline.local';
  const indexText = fs.readFileSync(path.join(gameRoot, 'index.html'), 'utf8');
  const baseMatch = indexText.match(/<base\b[^>]*href=["']([^"']+)["']/i);
  const documentBase = new URL(baseMatch ? baseMatch[1] : './', baseOrigin + '/' + game + '/index.html');

  function addRef(ref, baseUrl, from, kind) {
    if (typeof ref !== 'string') return;
    const raw = ref.trim();
    if (!raw || raw.startsWith('#') || /^(data|blob|javascript|mailto|tel):/i.test(raw)) return;
    if (raw.startsWith('//') || /^https?:\/\//i.test(raw)) {
      external.push({ from, kind, ref: raw });
      return;
    }
    if (raw.startsWith('/')) {
      missing.push({ from, kind, ref: raw, reason: 'root-relative path is not self-contained' });
      return;
    }
    let resolved;
    try { resolved = new URL(raw, baseUrl); }
    catch { missing.push({ from, kind, ref: raw, reason: 'invalid URL' }); return; }
    if (resolved.origin !== baseOrigin) {
      external.push({ from, kind, ref: raw });
      return;
    }
    const pathname = decodeURIComponent(resolved.pathname);
    const prefix = '/' + game + '/';
    if (!pathname.startsWith(prefix)) {
      missing.push({ from, kind, ref: raw, reason: 'resolved path is outside the game folder' });
      return;
    }
    const rel = pathname.slice(prefix.length);
    const target = path.resolve(gameRoot, rel);
    if (target !== gameRoot && !target.startsWith(gameRoot + path.sep)) {
      missing.push({ from, kind, ref: raw, reason: 'path escapes game folder' });
      return;
    }
    if (!fs.existsSync(target)) {
      missing.push({ from, kind, ref: raw, reason: 'file not present' });
      return;
    }
    checked.add(rel || '.');
  }

  const tagRe = /<(script|link|img|audio|video|source|object|iframe|embed|input)\b[^>]*>/gi;
  for (const match of indexText.matchAll(tagRe)) {
    const tag = match[0];
    const name = match[1].toLowerCase();
    if (name === 'link') {
      const relMatch = tag.match(/\brel\s*=\s*["']([^"']+)["']/i);
      const rel = relMatch ? relMatch[1].toLowerCase() : '';
      if (!/(stylesheet|manifest|icon|apple-touch-icon|startup-image|preload|modulepreload|mask-icon)/i.test(rel)) continue;
    }
    const attrs = ['src', 'href', 'data', 'poster'];
    for (const attr of attrs) {
      const re = new RegExp("\\b" + attr + "\\s*=\\s*[\"']([^\"']+)[\"']", "i");
      const m = tag.match(re);
      if (m) addRef(m[1], documentBase, 'index.html', name + '.' + attr);
    }
  }

  for (const match of indexText.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    scanCss(match[1], documentBase, 'index.html:inline-style');
  }
  for (const match of indexText.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    scanJs(match[1], documentBase, 'index.html:inline-script');
  }

  function scanCss(text, baseUrl, from) {
    for (const m of text.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
      addRef(m[2], baseUrl, from, 'css-url');
    }
    for (const m of text.matchAll(/@import\s+(?:url\()?\s*['"]([^'"]+)['"]/gi)) {
      addRef(m[1], baseUrl, from, 'css-import');
    }
  }

  function scanJs(text, baseUrl, from) {
    const patterns = [
      /\b(?:fetch|importScripts|import)\s*\(\s*['"]([^'"]+)['"]/g,
      /\bnew\s+(?:Audio|Worker)\s*\(\s*['"]([^'"]+)['"]/g,
      /\.script\s*\(\s*['"]([^'"]+\.js)['"]/g,
      /(?:\.src|src)\s*=\s*['"]([^'"]+)['"]/g,
      /['"]((?:\.{0,2}\/)?(?:assets|img|images|audio|sounds|fonts|data|lib|script|css|vendor|en|js|src)\/[^'"]+)['"]/g
    ];
    for (const re of patterns) {
      for (const m of text.matchAll(re)) addRef(m[1], baseUrl, from, 'js-runtime');
    }
  }

  const all = listFiles(gameRoot);
  for (const file of all) {
    const rel = path.relative(gameRoot, file).split(path.sep).join('/');
    const ext = path.extname(file).toLowerCase();
    if (ext === '.css') {
      scanCss(fs.readFileSync(file, 'utf8'), new URL(rel, baseOrigin + '/' + game + '/'), rel);
    } else if (ext === '.js' || ext === '.mjs') {
      const jsText = fs.readFileSync(file, 'utf8');
      if (rel === 'service-worker.js') {
        for (const m of jsText.matchAll(/['"](\.\/[^'"]+)['"]/g)) addRef(m[1], documentBase, rel, 'service-worker-cache');
      } else {
        scanJs(jsText, new URL(rel, baseOrigin + '/' + game + '/'), rel);
      }
    } else if (ext === '.json' || ext === '.webmanifest') {
      const base = new URL(rel, baseOrigin + '/' + game + '/');
      try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        const walk = (value, key) => {
          if (Array.isArray(value)) return value.forEach(v => walk(v, key));
          if (value && typeof value === 'object') return Object.entries(value).forEach(([k, v]) => walk(v, k));
          if (typeof value === 'string' && ['src', 'href', 'start_url', 'scope'].includes(key)) addRef(value, base, rel, 'manifest-' + key);
        };
        walk(data, '');
      } catch {}
    }
  }
  return { checked: checked.size, missing, external };
}

function sha(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function main() {
  const graph = auditAssetGraph();
  assert.equal(graph.missing.length, 0, 'Static asset graph has missing local references: ' + JSON.stringify(graph.missing.slice(0, 20)));
  assert.equal(graph.external.length, 0, 'Static asset graph has external runtime references: ' + JSON.stringify(graph.external.slice(0, 20)));

  const server = http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); }
    catch { res.writeHead(400); res.end(); return; }
    if (pathname === '/favicon.ico' || pathname === '/robots.txt') {
      res.writeHead(204);
      res.end();
      return;
    }
    const rel = pathname.replace(/^\/+/, '');
    const file = path.resolve(ROOT, rel || 'index.html');
    if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    let target = file;
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      res.writeHead(404); res.end('Not found: ' + pathname); return;
    }
    res.setHeader('Content-Type', MIME[path.extname(target).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    fs.createReadStream(target).pipe(res);
  });

  activeServer = server;
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const origin = 'http://127.0.0.1:' + port;
  const browser = await chromium.launch({ headless: true });
  activeBrowser = browser;
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    serviceWorkers: 'block'
  });
  activeContext = context;
  const externalRequests = [];
  const failedLocal = [];
  const badResponses = [];
  const pageErrors = [];
  await context.route('**/*', async route => {
    const u = new URL(route.request().url());
    if (u.origin !== origin) {
      externalRequests.push(u.href);
      await route.abort('blockedbyclient');
    } else {
      await route.continue();
    }
  });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  page.on('pageerror', e => pageErrors.push(String(e)));
  page.on('requestfailed', r => {
    const u = new URL(r.url());
    if (u.origin === origin && !/\/(favicon\.ico|robots\.txt)$/.test(u.pathname)) failedLocal.push({ url: r.url(), error: r.failure()?.errorText || 'failed' });
  });
  page.on('response', r => {
    const u = new URL(r.url());
    if (u.origin === origin && r.status() >= 400 && !/\/(favicon\.ico|robots\.txt)$/.test(u.pathname)) badResponses.push({ url: r.url(), status: r.status() });
  });

  const url = origin + '/' + game + '/index.html';
  const actions = [];
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  if (game === '8-ball-classic') {
    const canvas = page.locator('#game');
    await canvas.waitFor();
    await page.waitForFunction(() => typeof view !== 'undefined' && view && view.constructor.name === 'Intro');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(250);
    if (await page.evaluate(() => view.constructor.name === 'Intro')) {
      await canvas.click({ position: { x: 400, y: 300 } });
    }
    await page.waitForFunction(() => view && view.constructor.name === 'MainMenu');
    await page.waitForTimeout(700);
    const box = await canvas.boundingBox();
    const point = (x, y) => ({ x: box.x + (x / 800) * box.width, y: box.y + (y / 600) * box.height });
    const practice = point(400, 220);
    await page.mouse.click(practice.x, practice.y);
    await page.waitForFunction(() => view && view.constructor.name === 'Practice');
    await page.waitForTimeout(400);
    const before = await canvas.screenshot();
    const start = point(400, 300);
    const pull = point(330, 300);
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(pull.x, pull.y, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(1000);
    const after = await canvas.screenshot();
    assert.notEqual(sha(after), sha(before), 'Cue shot did not change the table canvas');
    actions.push('Opened Practice, pulled the cue, and confirmed the table changed after the shot');
  } else if (game === '8-ball-pool') {
    const canvas = page.locator('#screen');
    await canvas.waitFor();
    await page.waitForFunction(() => typeof Game !== 'undefined' && Game.mainMenu && Game.mainMenu.buttons && Game.mainMenu.buttons.length > 0);
    await page.evaluate(() => { if (typeof SOUND_ON !== 'undefined') SOUND_ON = false; });
    const button = await page.evaluate(() => {
      const b = Game.mainMenu.buttons[0];
      const image = b.image || b.sprite || b.asset || {};
      const pos = b.position || b.pos || { x: 200, y: 200 };
      return {
        x: pos.x + (image.width || b.width || 100) / 2,
        y: pos.y + (image.height || b.height || 80) / 2,
        ox: Canvas2D.offset.x,
        oy: Canvas2D.offset.y,
        sx: Canvas2D.scale.x,
        sy: Canvas2D.scale.y
      };
    });
    await page.mouse.click(button.ox + button.x * button.sx, button.oy + button.y * button.sy);
    await page.waitForFunction(() => Game.gameWorld && Game.gameWorld.stick && Game.gameWorld.whiteBall && Game.policy);
    await page.waitForTimeout(5500);
    await page.evaluate(() => { if (typeof KEYBOARD_INPUT_ON !== 'undefined') KEYBOARD_INPUT_ON = true; });
    await page.keyboard.down('w');
    await page.waitForTimeout(900);
    await page.keyboard.up('w');
    const power = await page.evaluate(() => Game.gameWorld.stick.power);
    assert(power > 0, 'Cue power did not increase');
    const metrics = await page.evaluate(() => ({ ox: Canvas2D.offset.x, oy: Canvas2D.offset.y, sx: Canvas2D.scale.x, sy: Canvas2D.scale.y }));
    await page.mouse.move(metrics.ox + 800 * metrics.sx, metrics.oy + 413 * metrics.sy);
    await page.mouse.down();
    await page.waitForTimeout(120);
    await page.mouse.up();
    await page.waitForFunction(() => Game.policy.turnPlayed === true, null, { timeout: 8000 });
    actions.push('Started a two-player match, charged the cue, and executed a shot');
  } else if (game === 'backrooms') {
    await page.locator('#btnPlay').click();
    await page.waitForFunction(() => typeof gameState !== 'undefined' && gameState === 'playing');
    const tutorial = page.locator('#tutorialModal');
    if (await tutorial.count() && await tutorial.isVisible().catch(() => false)) {
      const close = page.locator('#btnCloseTutorial');
      if (await close.count()) await close.click();
    }
    let moved = false;
    for (const key of ['w', 'd', 's', 'a']) {
      const before = await page.evaluate(() => ({ x: posX, y: posY }));
      await page.keyboard.down(key);
      await page.waitForTimeout(500);
      await page.keyboard.up(key);
      const after = await page.evaluate(() => ({ x: posX, y: posY }));
      if (Math.abs(after.x - before.x) + Math.abs(after.y - before.y) > 0.001) {
        moved = true;
        break;
      }
    }
    assert(moved, 'Player position did not change after movement input');
    actions.push('Started Backrooms Infestation and moved the player with keyboard input');
  } else if (game === 'blackjack') {
    await page.locator('.classic-entry button').click();
    await page.locator('.chip-button').first().click();
    const deal = page.locator('.deal-button');
    await deal.waitFor();
    assert(await deal.isEnabled(), 'Deal button remained disabled after placing a bet');
    await deal.click();
    await page.waitForFunction(() => document.querySelectorAll('.player-hand .cards > *').length >= 2);
    const decline = page.locator('.insurance-actions button.secondary');
    if (await decline.count() && await decline.isVisible().catch(() => false)) await decline.click();
    await page.waitForFunction(() => document.querySelector('.result-row') || document.querySelector('button[aria-label="Hit"]'), null, { timeout: 10000 });
    const hit = page.locator('button[aria-label="Hit"]');
    if (await hit.count() && await hit.isEnabled().catch(() => false)) {
      const before = await page.locator('.player-hand .cards > *').count();
      await hit.click();
      await page.waitForFunction(n => document.querySelectorAll('.player-hand .cards > *').length > n || document.querySelector('.result-row'), before);
      const stand = page.locator('button[aria-label="Stand"]');
      if (await stand.count() && await stand.isEnabled().catch(() => false)) await stand.click();
    }
    await page.locator('.result-row').waitFor({ timeout: 20000 });
    actions.push('Placed a bet, dealt a hand, and completed hit/stand or natural-blackjack resolution');
  } else if (game === 'block-blast') {
    await page.locator('#gameCanvas').waitFor();
    await page.locator('#preview1').click();
    await page.locator('#gameCanvas').click({ position: { x: 20, y: 20 } });
    await page.waitForFunction(() => typeof gameState !== 'undefined' && gameState.score > 0 && gameState.grid.flat().some(Boolean));
    actions.push('Selected a block and placed it on the board; score and occupied grid updated');
  } else if (game === 'breaklock') {
    const start = page.locator('.action-btn').filter({ hasText: /START_/ }).first();
    await start.click();
    const svg = page.locator('svg.lock');
    await svg.waitFor();
    const info = await svg.evaluate(el => {
      const vb = (el.getAttribute('viewBox') || '0 0 100 100').trim().split(/\s+/).map(Number);
      const rect = el.getBoundingClientRect();
      const circles = Array.from(el.querySelectorAll('.lock-flashdots circle')).map(c => ({
        x: Number(c.getAttribute('cx')),
        y: Number(c.getAttribute('cy'))
      }));
      const unique = [];
      const seen = new Set();
      for (const c of circles) {
        const k = c.x + ',' + c.y;
        if (!seen.has(k)) { seen.add(k); unique.push(c); }
      }
      return { width: vb[2], height: vb[3], rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }, dots: unique };
    });
    assert(info.dots.length >= 4, 'Pattern lock did not expose enough dots');
    const points = info.dots.slice(0, 9).map(d => ({
      x: info.rect.x + (d.x / info.width) * info.rect.width,
      y: info.rect.y + (d.y / info.height) * info.rect.height
    }));
    await page.mouse.move(points[0].x, points[0].y);
    await page.mouse.down();
    for (const p of points.slice(1)) await page.mouse.move(p.x, p.y, { steps: 4 });
    await page.mouse.up();
    await page.waitForFunction(() => document.querySelectorAll('.history-container svg').length >= 1, null, { timeout: 10000 });
    actions.push('Started a pattern-lock challenge and submitted a multi-dot pattern recorded in history');
  } else {
    throw new Error('No gameplay test is defined for ' + game);
  }

  assert.equal(externalRequests.length, 0, 'External runtime requests were attempted: ' + JSON.stringify(externalRequests));
  assert.equal(failedLocal.length, 0, 'Local requests failed: ' + JSON.stringify(failedLocal));
  assert.equal(badResponses.length, 0, 'Local HTTP errors: ' + JSON.stringify(badResponses));
  assert.equal(pageErrors.length, 0, 'JavaScript page errors: ' + JSON.stringify(pageErrors));

  for (const name of fs.readdirSync(gameRoot)) {
    if (/^cover\./i.test(name)) {
      const p = path.join(gameRoot, name);
      if (fs.existsSync(p) && fs.statSync(p).isFile()) fs.unlinkSync(p);
    }
  }
  const coverPath = path.join(gameRoot, 'cover.png');
  await page.screenshot({ path: coverPath, fullPage: false, animations: 'disabled' });

  const requestCount = await page.evaluate(() => performance.getEntriesByType('resource').length);
  await context.close();
  activeContext = null;
  await browser.close();
  activeBrowser = null;
  await new Promise(resolve => server.close(resolve));
  activeServer = null;
  console.log(JSON.stringify({
    status: 'PASS',
    game,
    method: 'Chromium with external requests blocked; static asset graph audit; gameplay input',
    graph,
    actions,
    externalRequests,
    failedLocal,
    badResponses,
    pageErrors,
    requestCount,
    cover: game + '/cover.png'
  }));
}

main().catch(async error => {
  if (activeContext) { try { await activeContext.close(); } catch {} }
  if (activeBrowser) { try { await activeBrowser.close(); } catch {} }
  if (activeServer) { try { await new Promise(resolve => activeServer.close(resolve)); } catch {} }
  console.log(JSON.stringify({
    status: 'FAIL',
    game,
    error: String(error && error.stack || error)
  }));
  process.exitCode = 1;
});
