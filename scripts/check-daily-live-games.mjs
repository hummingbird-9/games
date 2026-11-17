import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const root = process.cwd();
const host = 'http://127.0.0.1:4180';
const outDir = path.join(root, 'artifacts');
const reportRoot = path.join(root, 'repair-reports', 'daily-game-checks');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(reportRoot, { recursive: true });

const batchSize = Math.max(1, Number.parseInt(process.env.DAILY_AUDIT_GAMES || '15', 10) || 15);
const runsPerGame = Math.max(1, Number.parseInt(process.env.DAILY_AUDIT_RUNS || '3', 10) || 3);
const waitMs = Math.max(3000, Number.parseInt(process.env.DAILY_AUDIT_WAIT_MS || '8000', 10) || 8000);
const day = new Date().toISOString().slice(0, 10);
const ignoredFolders = new Set(['scripts', 'repair-reports', 'artifacts', 'node_modules', 'third-party-licenses']);

function listGames() {
  return fs.readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.') &&
      !ignoredFolders.has(entry.name) && fs.existsSync(path.join(root, entry.name, 'index.html')))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function encodePath(value) {
  return String(value).split('/').map(part => encodeURIComponent(part)).join('/');
}

function makeGameUrl(folder) {
  return 'https://ghp.hummingbird.rf.gd/games/' + encodePath(folder) + '/index.html';
}

const server = http.createServer((req, res) => {
  if (req.url === '/audit-host.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#111}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe id="game" title="Game being checked"></iframe></body></html>');
    return;
  }
  res.writeHead(404);
  res.end('not found');
});

const ignoredNoise = /google-analytics|googletagmanager|doubleclick|googleadservices|facebook\.com\/plugins|platform\.twitter\.com|cloudflareinsights|\/cdn-cgi\/rum|\/cdn-cgi\/challenge-platform/i;
const benignConsole = /Allow attribute will take precedence over ['"]allowfullscreen['"]|Unrecognized feature:.*(attribution-reporting|private-aggregation|join-ad-interest-group|run-ad-auction|browsing-topics)/i;
const runtimeSelector = 'canvas,object,embed,ruffle-player,ruffle-embed,video,#gameContainer,#unity-container,#playn-root,[data-game-container]';

async function inspectGame(browser, folder, run) {
  const result = {
    game: folder,
    run,
    gameUrl: makeGameUrl(folder),
    documentStatus: null,
    finalUrl: null,
    outcome: 'unknown',
    snapshot: null,
    httpErrors: [],
    failedRequests: [],
    pageErrors: [],
    consoleErrors: [],
    consoleWarnings: []
  };
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  let gameFrame = null;

  page.on('response', response => {
    const url = response.url();
    if (ignoredNoise.test(url)) return;
    if (response.status() >= 400) {
      result.httpErrors.push({ status: response.status(), url: url.slice(0, 500) });
    }
    if (url === result.gameUrl) result.documentStatus = response.status();
  });
  page.on('requestfailed', request => {
    const url = request.url();
    if (ignoredNoise.test(url)) return;
    result.failedRequests.push({
      url: url.slice(0, 500),
      error: request.failure()?.errorText || 'request failed'
    });
  });
  page.on('pageerror', error => {
    result.pageErrors.push(String(error.message || error).slice(0, 500));
  });
  page.on('console', message => {
    const value = message.text();
    if (benignConsole.test(value)) return;
    if (message.type() === 'error' && result.consoleErrors.length < 25) {
      result.consoleErrors.push(value.slice(0, 500));
    } else if (message.type() === 'warning' && result.consoleWarnings.length < 15) {
      result.consoleWarnings.push(value.slice(0, 500));
    }
  });

  try {
    await page.goto(host + '/audit-host.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
    gameFrame = page.frameLocator('#game');
    await page.locator('#game').evaluate((frame, url) => { frame.src = url; }, result.gameUrl);
    await page.waitForTimeout(waitMs);

    const child = page.frames().find(frame => frame.parentFrame() === page.mainFrame());
    if (!child) {
      result.outcome = 'iframe-not-created';
    } else {
      result.finalUrl = child.url();
      try {
        result.snapshot = await child.evaluate(selector => {
          const elements = [...document.querySelectorAll(selector)].slice(0, 30).map(element => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return {
              tag: element.tagName.toLowerCase(),
              id: element.id || '',
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              display: style.display,
              visibility: style.visibility,
              opacity: style.opacity
            };
          });
          const visible = item => item.width > 20 && item.height > 20 &&
            item.display !== 'none' && item.visibility !== 'hidden' && item.opacity !== '0';
          const bodyText = (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 260);
          const visibleImages = [...document.images].filter(image => {
            const rect = image.getBoundingClientRect();
            const style = getComputedStyle(image);
            return rect.width > 20 && rect.height > 20 && style.display !== 'none' &&
              style.visibility !== 'hidden' && style.opacity !== '0' && image.complete && image.naturalWidth > 0;
          }).length;
          const bodyChildren = [...(document.body?.children || [])].filter(element => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return rect.width > 20 && rect.height > 20 && style.display !== 'none' &&
              style.visibility !== 'hidden' && style.opacity !== '0';
          }).length;
          return {
            title: document.title,
            readyState: document.readyState,
            bodyText,
            runtimeElements: elements.length,
            visibleRuntimeElements: elements.filter(visible).length,
            visibleImages,
            visibleBodyChildren: bodyChildren,
            elements
          };
        }, runtimeSelector);
        const snap = result.snapshot;
        if (snap.visibleRuntimeElements > 0) result.outcome = 'runtime-visible';
        else if (snap.visibleBodyChildren > 0 || snap.bodyText.length > 20 || snap.visibleImages > 0) {
          result.outcome = 'page-visible-runtime-not-detected';
        } else result.outcome = 'blank-or-no-visible-content';
      } catch (error) {
        result.outcome = 'frame-document-unavailable';
        result.pageErrors.push('Could not inspect iframe document: ' + String(error.message || error).slice(0, 400));
      }
    }
  } catch (error) {
    result.outcome = 'navigation-or-harness-error';
    result.pageErrors.push(String(error.stack || error).slice(0, 1200));
  } finally {
    await context.close().catch(() => {});
  }

  if (result.documentStatus && result.documentStatus >= 400) result.outcome = 'game-html-http-error';
  return result;
}

async function main() {
  const allGames = listGames();
  if (!allGames.length) throw new Error('No game folders with root index.html files were found.');
  const dayNumber = Math.floor(Date.UTC(
    Number(day.slice(0, 4)), Number(day.slice(5, 7)) - 1, Number(day.slice(8, 10))
  ) / 86400000);
  const offset = (dayNumber * batchSize) % allGames.length;
  const selected = Array.from({ length: Math.min(batchSize, allGames.length) },
    (_, index) => allGames[(offset + index) % allGames.length]);

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(4180, '127.0.0.1', resolve);
  });

  let browser;
  const results = [];
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl',
        '--ignore-gpu-blocklist', '--use-gl=angle', '--use-angle=swiftshader']
    });
    for (const folder of selected) {
      const attempts = [];
      for (let run = 1; run <= runsPerGame; run++) {
        const attempt = await inspectGame(browser, folder, run);
        attempts.push(attempt);
        console.log(folder + ' (' + run + '/' + runsPerGame + '): ' + attempt.outcome +
          (attempt.documentStatus ? ' [HTML ' + attempt.documentStatus + ']' : ''));
      }
      const passed = attempts.filter(attempt =>
        attempt.outcome === 'runtime-visible' || attempt.outcome === 'page-visible-runtime-not-detected').length;
      const outcomes = [...new Set(attempts.map(attempt => attempt.outcome))];
      results.push({
        game: folder,
        passedRuns: passed,
        totalRuns: attempts.length,
        outcome: outcomes.length === 1 ? outcomes[0] : 'inconsistent-across-runs',
        outcomes,
        attempts
      });
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }

  const counts = {};
  for (const entry of results) counts[entry.outcome] = (counts[entry.outcome] || 0) + 1;
  const report = {
    generatedAt: new Date().toISOString(),
    dateUTC: day,
    totalCatalogGames: allGames.length,
    gamesChecked: selected.length,
    runsPerGame,
    totalAttempts: selected.length * runsPerGame,
    selection: selected,
    note: 'Tests the published GitHub Pages game URLs in a real iframe using fresh browser contexts. A visible runtime marker is a load smoke test, not proof that gameplay works. No game files are modified or removed.',
    counts,
    results
  };

  fs.writeFileSync(path.join(outDir, 'daily-live-game-checks-' + day + '.json'),
    JSON.stringify(report, null, 2));
  const lines = [
    '# Daily live game checks — ' + day,
    '',
    'Checked ' + selected.length + ' of ' + allGames.length + ' catalog games; ' +
      runsPerGame + ' separate iframe/browser runs per game (' + (selected.length * runsPerGame) + ' total attempts).',
    '',
    'These tests load the real public jsDelivr game URLs. They do not substitute files from the local checkout. A visible canvas/player is a load smoke test, not gameplay certification. No game files were changed or removed.',
    '',
    '## Summary',
    '',
    '| Result | Games |',
    '|---|---:|'
  ];
  Object.entries(counts).sort((a, b) => b[1] - a[1])
    .forEach(([outcome, count]) => lines.push('| ' + outcome + ' | ' + count + ' |'));
  lines.push('', '## Per-game results', '',
    '| Game | Runs showing content | Outcomes | HTTP errors | Failed requests | Page errors |',
    '|---|---:|---|---:|---:|---:|');
  for (const entry of results) {
    const allAttempts = entry.attempts;
    const http = allAttempts.reduce((n, attempt) => n + attempt.httpErrors.length, 0);
    const failed = allAttempts.reduce((n, attempt) => n + attempt.failedRequests.length, 0);
    const errors = allAttempts.reduce((n, attempt) => n + attempt.pageErrors.length + attempt.consoleErrors.length, 0);
    lines.push('| ' + entry.game.replace(/\|/g, '/') + ' | ' + entry.passedRuns + '/' +
      entry.totalRuns + ' | ' + entry.outcomes.join(', ') + ' | ' + http + ' | ' + failed + ' | ' + errors + ' |');
  }
  lines.push('', '## Attempt details', '');
  for (const entry of results) {
    lines.push('### ' + entry.game, '');
    for (const attempt of entry.attempts) {
      lines.push('- Run ' + attempt.run + ': **' + attempt.outcome + '**; HTML status: ' +
        (attempt.documentStatus ?? 'not recorded') + '; URL: ' + (attempt.finalUrl || attempt.gameUrl));
      for (const error of attempt.httpErrors.slice(0, 5)) lines.push('  - HTTP ' + error.status + ': ' + error.url);
      for (const failure of attempt.failedRequests.slice(0, 5)) lines.push('  - Failed: ' + failure.url + ' (' + failure.error + ')');
      for (const error of attempt.pageErrors.slice(0, 5)) lines.push('  - Page error: ' + error);
      for (const error of attempt.consoleErrors.slice(0, 5)) lines.push('  - Console error: ' + error);
    }
    lines.push('');
  }
  fs.writeFileSync(path.join(reportRoot, day + '.md'), lines.join('\n'));
  console.log(JSON.stringify({
    dateUTC: day,
    totalCatalogGames: allGames.length,
    gamesChecked: selected.length,
    runsPerGame,
    totalAttempts: selected.length * runsPerGame,
    counts,
    report: 'repair-reports/daily-game-checks/' + day + '.md'
  }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
