import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8765';
const browser = await chromium.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader'
  ]
});

async function makeOfflinePage() {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const evidence = {
    external: [],
    badResponses: [],
    failedRequests: [],
    pageErrors: [],
    consoleErrors: []
  };
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.protocol === 'data:' || url.protocol === 'blob:') return route.continue();
    if (url.origin !== BASE) {
      evidence.external.push(url.href);
      return route.abort();
    }
    return route.continue();
  });
  page.on('response', response => {
    if (response.url().startsWith(BASE) && response.status() >= 400) {
      evidence.badResponses.push({ status: response.status(), url: response.url() });
    }
  });
  page.on('requestfailed', request => {
    if (request.url().startsWith(BASE)) {
      evidence.failedRequests.push({
        url: request.url(),
        error: request.failure()?.errorText || 'unknown'
      });
    }
  });
  page.on('pageerror', error => evidence.pageErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') evidence.consoleErrors.push(message.text());
  });
  page.on('websocket', socket => {
    if (!socket.url().startsWith(BASE)) evidence.external.push(socket.url());
  });
  return { context, page, evidence };
}

async function snapshot(page, evidence) {
  const state = await page.evaluate(() => {
    const stage = document.querySelector('#stage');
    const canvas = document.querySelector('#stage canvas') || document.querySelector('#canvas');
    const warning = document.querySelector('#warning');
    let webgl = false;
    try {
      const probe = document.createElement('canvas');
      webgl = !!(probe.getContext('webgl') || probe.getContext('experimental-webgl'));
    } catch (error) {
      webgl = String(error);
    }
    return {
      title: document.title,
      stageChildren: stage?.children?.length ?? null,
      stageCanvas: !!stage?.querySelector('canvas'),
      warningDisplay: warning ? getComputedStyle(warning).display : null,
      warningText: warning?.innerText || '',
      webgl,
      pixiVersion: window.PIXI?.VERSION || null,
      scene: window.Game?.scene?.constructor?.name || null,
      resourceKeys: Object.keys(window.PIXI?.loader?.resources || {}),
      gameMakerInit: typeof window.GameMaker_Init,
      canvasSize: canvas ? { width: canvas.width, height: canvas.height } : null,
      idleClicks: typeof window._E7 === 'function' ? window._E7(0)?._89 ?? null : null,
      idleLevel: typeof window._E7 === 'function' ? window._E7(0)?._V8 ?? null : null
    };
  }).catch(error => ({ diagnosticError: error.message }));
  return { state, evidence };
}

function assertOffline(name, evidence) {
  if (evidence.external.length) {
    throw new Error(name + ' attempted external requests: ' + evidence.external.join(', '));
  }
  if (evidence.badResponses.length) {
    throw new Error(name + ' has missing local assets: ' + JSON.stringify(evidence.badResponses));
  }
  if (evidence.pageErrors.length) {
    throw new Error(name + ' page errors: ' + evidence.pageErrors.join(' | '));
  }
  if (evidence.consoleErrors.length) {
    console.log(name + ' console errors:', JSON.stringify(evidence.consoleErrors));
  }
  if (evidence.failedRequests.length) {
    console.log(name + ' failed local requests:', JSON.stringify(evidence.failedRequests));
  }
}

async function testWeBecomeWhatWeBehold() {
  const { context, page, evidence } = await makeOfflinePage();
  try {
    await page.goto(BASE + '/Webecomewhatwebehold/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => {
      const canvas = document.querySelector('#stage canvas');
      const warning = document.querySelector('#warning');
      const warningVisible = warning &&
        getComputedStyle(warning).display !== 'none' &&
        getComputedStyle(warning).visibility !== 'hidden' &&
        (warning.innerText || '').trim().length > 0;
      return !!canvas || !!warningVisible;
    }, null, { timeout: 20000 }).catch(async () => {
      throw new Error('WBWWB created neither a renderer canvas nor a visible warning: ' +
        JSON.stringify(await snapshot(page, evidence)));
    });

    const startup = await snapshot(page, evidence);
    console.log('WBWWB startup diagnostic:', JSON.stringify(startup));
    if (!startup.state.stageCanvas) {
      throw new Error('WBWWB renderer did not initialize: ' + JSON.stringify(startup));
    }

    await page.waitForFunction(() => window.Game && window.Game.scene, null, { timeout: 20000 })
      .catch(async () => {
        throw new Error('WBWWB scene did not initialize: ' +
          JSON.stringify(await snapshot(page, evidence)));
      });

    await page.waitForFunction(() =>
      window.Game?.scene?.constructor?.name === 'Scene_Preloader' &&
      !!window.PIXI?.loader?.resources?.bg_preload?.texture &&
      !!window.PIXI?.loader?.resources?.bg_preload_2?.texture &&
      !!window.PIXI?.loader?.resources?.preload_play?.data?.frames,
      null,
      { timeout: 30000 }
    ).catch(async () => {
      throw new Error('WBWWB preloader assets did not finish loading: ' +
        JSON.stringify(await snapshot(page, evidence)));
    });

    assertOffline('Webecomewhatwebehold', evidence);
    const canvas = page.locator('#stage canvas');
    const bounds = await canvas.boundingBox();
    if (!bounds) throw new Error('WBWWB canvas has no visible bounds');

    await page.mouse.click(bounds.x + 278, bounds.y + 250);
    await page.waitForFunction(() =>
      window.Game?.scene?.constructor?.name === 'Scene_Game' &&
      window.Game?.scene?.world?.peeps?.length >= 20 &&
      !!window.Game?.scene?.camera,
      null,
      { timeout: 25000 }
    ).catch(async () => {
      throw new Error('WBWWB did not enter playable scene after Play: ' +
        JSON.stringify(await snapshot(page, evidence)));
    });

    await page.mouse.click(bounds.x + 480, bounds.y + 270);
    await page.waitForFunction(() => window.Game?.scene?.camera?.frozen === true, null, { timeout: 5000 })
      .catch(async () => {
        throw new Error('WBWWB camera interaction did not work: ' +
          JSON.stringify(await snapshot(page, evidence)));
      });

    const state = await page.evaluate(() => ({
      scene: window.Game.scene.constructor.name,
      peeps: window.Game.scene.world.peeps.length,
      photoCaptured: window.Game.scene.camera.frozen
    }));
    assertOffline('Webecomewhatwebehold', evidence);
    console.log('PASS Webecomewhatwebehold offline startup/gameplay', JSON.stringify(state));
  } finally {
    await context.close();
  }
}

async function testIdleBreakout() {
  const { context, page, evidence } = await makeOfflinePage();
  try {
    await page.goto(BASE + '/Idlebreakout/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#canvas', { timeout: 20000 });
    await page.waitForFunction(() =>
      typeof window.GameMaker_Init === 'function' &&
      typeof window._E7 === 'function' &&
      typeof window._T7 === 'function' &&
      !!window._E7(0) &&
      typeof window._E7(0)._89 === 'number',
      null,
      { timeout: 30000 }
    ).catch(async () => {
      throw new Error('Idlebreakout GameMaker state did not initialize: ' +
        JSON.stringify(await snapshot(page, evidence)));
    });

    await page.waitForTimeout(7000);
    assertOffline('Idlebreakout', evidence);

    const canvas = page.locator('#canvas');
    const bounds = await canvas.boundingBox();
    if (!bounds) throw new Error('Idlebreakout canvas has no visible bounds');
    const size = await canvas.evaluate(el => ({ width: el.width, height: el.height }));
    if (!size.width || !size.height) throw new Error('Idlebreakout canvas has zero dimensions');

    const before = await page.evaluate(() => window._E7(0)._89);
    const brickPositions = [
      [464, 80], [560, 80], [656, 80], [752, 80], [848, 80],
      [944, 80], [80, 80], [176, 80], [272, 80], [368, 80]
    ];
    let interaction = null;
    for (const [x, y] of brickPositions) {
      await page.mouse.click(
        bounds.x + bounds.width * (x / size.width),
        bounds.y + bounds.height * (y / size.height)
      );
      await page.waitForTimeout(180);
      const clicks = await page.evaluate(() => window._E7(0)._89);
      if (clicks > before) {
        interaction = { x, y, clicksBefore: before, clicksAfter: clicks };
        break;
      }
    }
    if (!interaction) {
      throw new Error('Idlebreakout did not register a click on any known starting-room brick: ' +
        JSON.stringify({
          before,
          after: await page.evaluate(() => window._E7(0)._89),
          attemptedBrickPositions: brickPositions,
          diagnostic: await snapshot(page, evidence)
        }));
    }

    await page.waitForTimeout(500);
    const state = await page.evaluate(() => ({
      canvasWidth: document.querySelector('#canvas')?.width || 0,
      canvasHeight: document.querySelector('#canvas')?.height || 0,
      clickCount: window._E7(0)._89,
      level: window._E7(0)._V8
    }));
    assertOffline('Idlebreakout', evidence);
    console.log('PASS Idlebreakout offline startup/gameplay', JSON.stringify({ interaction, state }));
  } finally {
    await context.close();
  }
}

const failures = [];
for (const [name, test] of [
  ['Webecomewhatwebehold', testWeBecomeWhatWeBehold],
  ['Idlebreakout', testIdleBreakout]
]) {
  try {
    await test();
  } catch (error) {
    failures.push({ name, message: error?.message || String(error) });
    console.error('FAIL ' + name, error);
  }
}
await browser.close();
if (failures.length) {
  console.error('Offline verification failures:', JSON.stringify(failures));
  process.exitCode = 1;
} else {
  console.log('All offline game verification tests passed.');
}
