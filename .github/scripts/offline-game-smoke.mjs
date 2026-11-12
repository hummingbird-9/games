import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8765';
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl', '--ignore-gpu-blocklist', '--use-gl=angle', '--use-angle=swiftshader']
});

async function makeOfflinePage() {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const evidence = { external: [], badResponses: [], pageErrors: [], consoleErrors: [] };
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.protocol === 'data:' || url.protocol === 'blob:') return route.continue();
    if (url.origin !== BASE) { evidence.external.push(url.href); return route.abort(); }
    return route.continue();
  });
  page.on('response', response => {
    if (response.url().startsWith(BASE) && response.status() >= 400) evidence.badResponses.push({status:response.status(),url:response.url()});
  });
  page.on('pageerror', error => evidence.pageErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') evidence.consoleErrors.push(message.text()); });
  page.on('websocket', socket => { if (!socket.url().startsWith(BASE)) evidence.external.push(socket.url()); });
  return { context, page, evidence };
}

function assertOffline(name, evidence) {
  if (evidence.external.length) throw new Error(name + ' attempted external requests: ' + evidence.external.join(', '));
  if (evidence.badResponses.length) throw new Error(name + ' has missing local assets: ' + JSON.stringify(evidence.badResponses));
  if (evidence.pageErrors.length) throw new Error(name + ' page errors: ' + evidence.pageErrors.join(' | '));
  if (evidence.consoleErrors.length) console.log(name + ' console errors:', JSON.stringify(evidence.consoleErrors));
}

async function testWeBecomeWhatWeBehold() {
  const { context, page, evidence } = await makeOfflinePage();
  try {
    await page.goto(`${BASE}/Webecomewhatwebehold/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#stage canvas', { timeout: 20000 });
    await page.waitForFunction(() => window.Game && window.Game.scene, null, { timeout: 20000 });

    const initial = await page.evaluate(() => ({
      scene: window.Game.scene?.constructor?.name || null,
      renderer: !!window.Game.renderer,
      resourceKeys: Object.keys(window.PIXI?.loader?.resources || {}),
      soundKeys: Object.keys(window.Game?.sounds || {}),
      squeakState: window.Game?.sounds?.squeak?.state?.() || null,
      warning: document.querySelector('#warning')?.style.display || null
    }));
    console.log('WBWWB startup diagnostic:', JSON.stringify(initial));

    await page.waitForFunction(() =>
      window.Game?.scene?.constructor?.name === 'Scene_Preloader' &&
      !!window.PIXI?.loader?.resources?.bg_preload?.texture &&
      !!window.PIXI?.loader?.resources?.bg_preload_2?.texture &&
      !!window.PIXI?.loader?.resources?.preload_play?.data?.frames,
      null,
      { timeout: 30000 }
    );
    const canvas = page.locator('#stage canvas');
    const bounds = await canvas.boundingBox();
    if (!bounds) throw new Error('WBWWB canvas has no visible bounds');

    await page.mouse.click(bounds.x + 278, bounds.y + 250);
    try {
      await page.waitForFunction(() =>
        window.Game?.scene?.constructor?.name === 'Scene_Game' &&
        window.Game?.scene?.world?.peeps?.length >= 20 &&
        !!window.Game?.scene?.camera,
        null,
        { timeout: 25000 }
      );
    } catch (error) {
      const diagnostic = await page.evaluate(() => ({
        scene: window.Game?.scene?.constructor?.name || null,
        resourceKeys: Object.keys(window.PIXI?.loader?.resources || {}),
        squeakState: window.Game?.sounds?.squeak?.state?.() || null,
        soundKeys: Object.keys(window.Game?.sounds || {})
      }));
      console.log('WBWWB transition diagnostic:', JSON.stringify(diagnostic));
      throw error;
    }

    await page.mouse.click(bounds.x + 480, bounds.y + 270);
    await page.waitForFunction(() => window.Game?.scene?.camera?.frozen === true, null, { timeout: 5000 });
    const state = await page.evaluate(() => ({
      scene: window.Game.scene.constructor.name,
      peeps: window.Game.scene.world.peeps.length,
      photoCaptured: window.Game.scene.camera.frozen
    }));
    assertOffline('Webecomewhatwebehold', evidence);
    console.log('PASS Webecomewhatwebehold offline startup/gameplay', JSON.stringify(state));
  } finally { await context.close(); }
}

async function testIdleBreakout() {
  const { context, page, evidence } = await makeOfflinePage();
  try {
    await page.goto(`${BASE}/Idlebreakout/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#canvas', { timeout: 20000 });
    await page.waitForFunction(() => typeof window.GameMaker_Init === 'function', null, { timeout: 20000 });
    await page.waitForTimeout(7000);
    const canvas = page.locator('#canvas');
    const bounds = await canvas.boundingBox();
    if (!bounds) throw new Error('Idlebreakout canvas has no visible bounds');
    const before = await canvas.screenshot();
    let interactionChangedCanvas = false;
    for (const [x, y] of [[0.50, 0.30], [0.42, 0.30], [0.58, 0.30], [0.50, 0.42]]) {
      await page.mouse.click(bounds.x + bounds.width * x, bounds.y + bounds.height * y);
      await page.waitForTimeout(350);
      const after = await canvas.screenshot();
      if (!before.equals(after)) { interactionChangedCanvas = true; break; }
    }
    if (!interactionChangedCanvas) throw new Error('Idlebreakout canvas did not visibly respond to the brick-click gameplay test');
    assertOffline('Idlebreakout', evidence);
    console.log('PASS Idlebreakout offline startup/gameplay', JSON.stringify({
      canvasWidth: await canvas.evaluate(el => el.width),
      canvasHeight: await canvas.evaluate(el => el.height),
      clickChangedCanvas: interactionChangedCanvas
    }));
  } finally { await context.close(); }
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
