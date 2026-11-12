import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8765';
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl', '--ignore-gpu-blocklist', '--use-gl=angle', '--use-angle=swiftshader']
});
const context = await browser.newContext({ serviceWorkers: 'block' });
const page = await context.newPage();
const external = [];
const badResponses = [];
const pageErrors = [];
const consoleErrors = [];

await page.route('**/*', async route => {
  const url = new URL(route.request().url());
  if (url.protocol === 'data:' || url.protocol === 'blob:') return route.continue();
  if (url.origin !== BASE) { external.push(url.href); return route.abort(); }
  return route.continue();
});
page.on('response', response => {
  if (response.url().startsWith(BASE) && response.status() >= 400) badResponses.push({status:response.status(),url:response.url()});
});
page.on('pageerror', error => pageErrors.push(error.message));
page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('websocket', socket => { if (!socket.url().startsWith(BASE)) external.push(socket.url()); });

try {
  await page.goto(`${BASE}/Webecomewhatwebehold/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#stage canvas', { timeout: 20000 });
  await page.waitForFunction(() =>
    window.Game?.scene?.constructor?.name === 'Scene_Preloader' &&
    window.PIXI?.loader?.resources?.cam_frame?.texture &&
    window.Game?.sounds?.squeak?.state?.() === 'loaded',
    null,
    { timeout: 30000 }
  );
  const canvas = page.locator('#stage canvas');
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error('WBWWB canvas has no visible bounds');

  // Start the game from its local preloader.
  await page.mouse.click(bounds.x + 278, bounds.y + 250);
  await page.waitForFunction(() =>
    window.Game?.scene?.constructor?.name === 'Scene_Game' &&
    window.Game?.scene?.world?.peeps?.length >= 20 &&
    !!window.Game?.scene?.camera,
    null,
    { timeout: 25000 }
  );

  // Take a photo, exercising the point-and-click game mechanic.
  await page.mouse.click(bounds.x + 480, bounds.y + 270);
  await page.waitForFunction(() => window.Game?.scene?.camera?.frozen === true, null, { timeout: 5000 });

  const state = await page.evaluate(() => ({
    scene: window.Game.scene.constructor.name,
    peeps: window.Game.scene.world.peeps.length,
    photoCaptured: window.Game.scene.camera.frozen
  }));
  if (external.length) throw new Error('External runtime requests were attempted: ' + external.join(', '));
  if (badResponses.length) throw new Error('Local assets failed: ' + JSON.stringify(badResponses));
  if (pageErrors.length) throw new Error('Page errors: ' + pageErrors.join(' | '));

  console.log('PASS Webecomewhatwebehold offline startup and gameplay', JSON.stringify(state));
  console.log('All runtime requests were local; external requests: 0');
  if (consoleErrors.length) console.log('Console errors:', JSON.stringify(consoleErrors));
} finally {
  await context.close();
  await browser.close();
}
