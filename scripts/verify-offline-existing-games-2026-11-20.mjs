import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const root = process.cwd();
const artifactDir = path.join(root, "artifacts");
fs.mkdirSync(artifactDir, { recursive: true });
const origin = "http://127.0.0.1:4173";
const results = { date: "2026-11-20", mode: "external requests blocked", games: {}, blockedExternal: [], localHttpErrors: [], failedRequests: [], localSuccessfulResponses: [], pageErrors: [], consoleErrors: [] };
const mime = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".json":"application/json", ".wasm":"application/wasm", ".data":"application/octet-stream", ".png":"image/png", ".jpg":"image/jpeg", ".svg":"image/svg+xml", ".ico":"image/x-icon", ".ogg":"audio/ogg", ".wav":"audio/wav" };

const server = http.createServer((req, res) => {
  try {
    let target = path.resolve(root, "." + decodeURIComponent(new URL(req.url, origin).pathname));
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); res.end("Forbidden"); return; }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, { "Content-Type": mime[path.extname(target).toLowerCase()] || "application/octet-stream", "Cache-Control":"no-store" });
    fs.createReadStream(target).pipe(res);
  } catch { res.writeHead(400); res.end("Bad request"); }
});
await new Promise(resolve => server.listen(4173, "127.0.0.1", resolve));

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox", "--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
function errors(game) {
  const benignCanceled = results.failedRequests.filter(x => x.game === game && x.error === "net::ERR_ABORTED" && results.localSuccessfulResponses.some(y => y.game === game && y.url === x.url));
  const benignDiagnostics = results.consoleErrors.filter(x => x.game === game && game === "3D Bowling" && x.message === "pd 0.55.0");
  return {
    external: results.blockedExternal.filter(x => x.game === game),
    localHttp: results.localHttpErrors.filter(x => x.game === game),
    requestFailures: results.failedRequests.filter(x => x.game === game && !benignCanceled.includes(x)),
    pageErrors: results.pageErrors.filter(x => x.game === game && !benignDiagnostics.includes(x)),
    consoleErrors: results.consoleErrors.filter(x => x.game === game && !benignDiagnostics.includes(x)),
    benignCanceledRequests: benignCanceled,
    diagnosticConsoleMessages: benignDiagnostics
  };
}
function isClean(game) {
  const e = errors(game);
  return ["external", "localHttp", "requestFailures", "pageErrors", "consoleErrors"].every(key => e[key].length === 0);
}
async function createPage(game) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on("request", req => { if (!req.url().startsWith(origin)) results.blockedExternal.push({ game, url: req.url() }); });
  page.on("requestfailed", req => results.failedRequests.push({ game, url: req.url(), error: req.failure()?.errorText || "" }));
  page.on("response", res => {
    if (res.url().startsWith(origin)) {
      if (res.status() >= 400) results.localHttpErrors.push({ game, url: res.url(), status: res.status() });
      else results.localSuccessfulResponses.push({ game, url: res.url(), status: res.status() });
    }
  });
  page.on("pageerror", e => results.pageErrors.push({ game, message: e.message }));
  page.on("console", msg => { if (msg.type() === "error") results.consoleErrors.push({ game, message: msg.text() }); });
  await page.route("**/*", async route => { if (route.request().url().startsWith(origin)) await route.continue(); else await route.abort("blockedbyclient"); });
  return page;
}

// 8 Ball Pool: check menu-to-bot match, cue placement, aim, and a shot.
{
  const game = "8 Ball Pool";
  const page = await createPage(game);
  const report = { source: "existing single-file HTML5 build; repository MIT license", checks: [], status: "FAIL" };
  try {
    await page.goto(origin + "/8%20Ball%20Pool/index.html", { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.querySelector("#screenMenu")?.classList.contains("active"), null, { timeout: 5000 });
    report.checks.push("menu rendered");
    await page.locator('.mode-card[data-mode="bot"]').click();
    await page.locator("#cityCarousel .city-card").first().click();
    await page.waitForFunction(() => document.querySelector("#screenGame")?.classList.contains("active"), null, { timeout: 8000 });
    report.checks.push("bot match reached");
    await page.waitForSelector("#ballInHandBar[style*='display: block']", { timeout: 3000 });
    const canvas = page.locator("#table");
    const box = await canvas.boundingBox();
    if (!box || box.width < 200 || box.height < 150) throw new Error("pool canvas size invalid");
    await page.mouse.click(box.x + box.width * 0.18, box.y + box.height * 0.68);
    await page.locator("#confirmPlaceBtn").click();
    report.checks.push("cue-ball placement confirmed");
    await page.mouse.click(box.x + box.width * 0.78, box.y + box.height * 0.48);
    report.checks.push("aim input exercised");
    await page.locator("#powerWrap").evaluate(el => { el.tabIndex = 0; el.focus(); });
    await page.keyboard.press("End");
    const beforeShot = await canvas.evaluate(c => c.toDataURL());
    await page.keyboard.press("Enter");
    await page.waitForTimeout(900);
    const afterShot = await canvas.evaluate(c => c.toDataURL());
    report.canvasChangedAfterShot = beforeShot !== afterShot;
    report.checks.push("power set by keyboard and shot triggered");
    if (!report.canvasChangedAfterShot) throw new Error("canvas did not change after the shot");
    await page.screenshot({ path: path.join(artifactDir, "8-ball-pool-gameplay.png"), fullPage: true });
    if (!isClean(game)) throw new Error("external request, local HTTP error, or browser error recorded");
    report.status = "PASS";
  } catch (e) { report.error = String(e); }
  report.network = errors(game);
  results.games[game] = report;
  await page.close();
}

// 3D Bowling: verify its complete local Unity package and offline startup.
// Mouse drag and Space are attempted; this is not a gameplay pass by itself.
{
  const game = "3D Bowling";
  const page = await createPage(game);
  const loaded = new Set();
  page.on("response", res => { if (res.url().startsWith(origin) && /BowlingOnline2\.(data|wasm)/.test(res.url()) && res.status() === 200) loaded.add(path.basename(res.url())); });
  const report = { source: "existing local Unity WebGL build (data, JavaScript, WASM)", checks: [], gameplay: "NOT CERTIFIED", status: "FAIL" };
  try {
    await page.goto(origin + "/3D%20Bowling/index.html", { waitUntil: "load", timeout: 30000 });
    const canvas = page.locator("#canvas");
    await canvas.waitFor({ state: "visible", timeout: 5000 });
    await page.waitForFunction(() => { const c = document.querySelector("#canvas"); return c && c.width > 0 && c.height > 0; }, null, { timeout: 45000 });
    report.checks.push("Unity canvas initialized");
    await page.waitForTimeout(3000);
    const before = await canvas.evaluate(c => c.toDataURL());
    report.canvasDataUrlLength = before.length;
    report.canvasDimensions = await canvas.evaluate(c => ({ width: c.width, height: c.height }));
    if (before.length < 1000) throw new Error("canvas rendered blank/near-blank image");
    report.checks.push("canvas rendered image data");
    await page.screenshot({ path: path.join(artifactDir, "3d-bowling-loaded.png") });
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.445); // Single Game button
      await page.waitForTimeout(1500);
      const afterSingle = await canvas.evaluate(c => c.toDataURL());
      report.singleGameMenuCanvasChanged = before !== afterSingle;
      report.checks.push("Single Game button click attempted; visual transition recorded");
      await page.screenshot({ path: path.join(artifactDir, "3d-bowling-after-single-game.png") });
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.6);
      await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.6);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.35, { steps: 8 });
      await page.mouse.up();
      await page.keyboard.press("Space");
      await page.waitForTimeout(1500);
      const after = await canvas.evaluate(c => c.toDataURL());
      report.interactionCanvasChanged = afterSingle !== after;
      report.checks.push("mouse drag and Space input attempted after menu click");
      await page.screenshot({ path: path.join(artifactDir, "3d-bowling-after-input.png") });
    }
    if (!loaded.has("BowlingOnline2.data")) throw new Error("Unity data package did not return HTTP 200");
    if (!loaded.has("BowlingOnline2.wasm")) throw new Error("Unity WASM did not return HTTP 200");
    report.checks.push("local Unity data and WASM loaded successfully");
    if (!isClean(game)) throw new Error("external request, local HTTP error, or browser error recorded");
    report.status = "PASS (offline startup only; gameplay not certified)";
  } catch (e) { report.error = String(e); }
  report.requiredFilesSuccessfullyLoaded = [...loaded];
  report.network = errors(game);
  results.games[game] = report;
  await page.close();
}

await browser.close();
await new Promise(resolve => server.close(resolve));
fs.writeFileSync(path.join(artifactDir, "offline-existing-games-results.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
const failed = Object.values(results.games).some(g => !g.status.startsWith("PASS"));
const fatal = Object.values(results.games).some(g => g.network && (g.network.requestFailures.length || g.network.consoleErrors.length));
if (failed || results.blockedExternal.length || results.localHttpErrors.length || results.pageErrors.length || fatal) process.exitCode = 1;
