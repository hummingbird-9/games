import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createReadStream, statSync, readFileSync, existsSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const game = process.argv[2];
const supported = ["2048", "flappy-bird", "tetris", "chess-classic", "idle-breakout", "n-gon"];
assert(supported.includes(game), "Pass one supported game folder: " + supported.join(", "));
const root = process.cwd();
const mime = {
  ".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",
  ".json":"application/json",".webmanifest":"application/manifest+json",".png":"image/png",".jpg":"image/jpeg",
  ".jpeg":"image/jpeg",".gif":"image/gif",".ico":"image/x-icon",".svg":"image/svg+xml",".woff":"font/woff",
  ".woff2":"font/woff2",".eot":"application/vnd.ms-fontobject",".ttf":"font/ttf",".ogg":"audio/ogg",
  ".mp3":"audio/mpeg",".wav":"audio/wav"
};
const server = createServer((req,res)=>{
  if(req.method!=="GET"){res.writeHead(405).end();return;}
  let file = resolve(root, "." + decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname));
  if(file!==root && !file.startsWith(root+sep)){res.writeHead(403).end();return;}
  try{
    if(statSync(file).isDirectory()) file=join(file,"index.html");
    if(!statSync(file).isFile()){res.writeHead(404).end();return;}
    res.writeHead(200,{"Content-Type":mime[extname(file).toLowerCase()]||"application/octet-stream","Cache-Control":"no-store"});
    createReadStream(file).pipe(res);
  }catch{res.writeHead(404).end();}
});
await new Promise(done=>server.listen(0,"127.0.0.1",done));
const origin="http://127.0.0.1:"+server.address().port;
let browser;
const external=[];
const pageErrors=[];
const failedLocal=[];
const badResponses=[];
const shotHash = async locator => createHash("sha256").update(await locator.screenshot()).digest("hex");

function inspectLocalHtmlCssGraph(game) {
  const gameRoot = resolve(root, game);
  const missing = [];
  const cssQueue = [];
  const visited = new Set();
  const resolveLocal = (base, ref) => {
    const clean = decodeURIComponent(ref.split(/[?#]/)[0].trim());
    if (!clean || /^(https?:|\/\/|data:|blob:|javascript:|mailto:|#)/i.test(clean)) return null;
    const file = resolve(base, clean.replace(/^\/+/, ""));
    if (file !== gameRoot && !file.startsWith(gameRoot + sep)) {
      missing.push("path escapes game folder: " + ref);
      return null;
    }
    return file;
  };
  const html = readFileSync(join(gameRoot, "index.html"), "utf8");
  const refs = [...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  for (const ref of refs) {
    const file = resolveLocal(gameRoot, ref);
    if (!file) continue;
    if (!existsSync(file)) missing.push(ref);
    else if (extname(file).toLowerCase() === ".css") cssQueue.push(file);
  }
  while (cssQueue.length) {
    const cssFile = cssQueue.shift();
    if (visited.has(cssFile)) continue;
    visited.add(cssFile);
    const css = readFileSync(cssFile, "utf8");
    const cssRefs = [
      ...[...css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)].map(m => m[1].trim()),
      ...[...css.matchAll(/@import\s+["']([^"']+)["']/gi)].map(m => m[1].trim())
    ];
    for (const ref of cssRefs) {
      const file = resolveLocal(dirname(cssFile), ref);
      if (!file) continue;
      if (!existsSync(file)) missing.push(relative(gameRoot, cssFile) + " -> " + ref);
      else if (extname(file).toLowerCase() === ".css") cssQueue.push(file);
    }
  }
  return { htmlReferences: refs.length, cssFiles: visited.size, missing };
}

try{
  browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  const context=await browser.newContext({serviceWorkers:"block",viewport:{width:1365,height:900}});
  await context.route("**/*",async route=>{
    const u=new URL(route.request().url());
    if(u.origin===origin) return route.continue();
    external.push(u.href);
    return route.abort("blockedbyclient");
  });
  const page=await context.newPage();
  page.on("pageerror",e=>pageErrors.push(e.message));
  page.on("requestfailed",r=>{if(new URL(r.url()).origin===origin)failedLocal.push({url:r.url(),error:r.failure()?.errorText});});
  page.on("response",r=>{if(r.status()>=400)badResponses.push({url:r.url(),status:r.status()});});
  if(game==="flappy-bird") await page.addInitScript(()=>{localStorage.setItem("flappyBirdMusic","0");localStorage.setItem("flappyBirdSfx","0");});
  await page.goto(origin+"/"+game+"/",{waitUntil:"domcontentloaded",timeout:30000});
  if(game==="2048"){
    await page.waitForSelector(".tile-container .tile",{timeout:12000});
    const initial=await page.locator(".tile-container .tile").count();
    for(const key of ["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"]) await page.keyboard.press(key);
    await page.waitForTimeout(350);
    const finalCount=await page.locator(".tile-container .tile").count();
    const score=Number((await page.locator(".score-container").innerText()).trim());
    assert(finalCount>initial||score>0,"2048 did not respond to arrow-key gameplay");
  }else if(game==="flappy-bird"){
    await page.waitForFunction(()=>window.state==="welcome",null,{timeout:10000});
    await page.keyboard.press("Space");
    await page.waitForFunction(()=>window.state==="countdown",null,{timeout:3000});
    await page.waitForFunction(()=>window.state==="playing",null,{timeout:6000});
    const before=await page.evaluate(()=>window.bY);
    await page.keyboard.press("Space");
    const after=await page.evaluate(()=>window.bY);
    assert(after<before,"Flappy Bird did not flap in response to Space");
  }else if(game==="tetris"){
    await page.waitForSelector("#canvas",{timeout:10000});
    const before=await shotHash(page.locator("#canvas"));
    await page.keyboard.press("Space");
    await page.waitForTimeout(250);
    const visibility=await page.locator("#start").evaluate(el=>getComputedStyle(el).visibility);
    assert.equal(visibility,"hidden","Tetris did not enter the playing state");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(350);
    const after=await shotHash(page.locator("#canvas"));
    assert.notEqual(after,before,"Tetris canvas did not change after gameplay input");
  }else if(game==="chess-classic"){
    await page.locator("button.mbtn.gold").click();
    await page.waitForFunction(()=>document.querySelectorAll("#board .sq").length===64,null,{timeout:10000});
    await page.locator("#board .sq").nth(48).click();
    await page.waitForSelector("#board .sq.sel",{timeout:5000});
    await page.locator("#board .sq").nth(40).click();
    await page.waitForFunction(()=>document.querySelectorAll("#mlist .mrow").length>=1,null,{timeout:5000});

  }else if(game==="n-gon"){
    const graph=inspectLocalHtmlCssGraph(game);
    assert.equal(graph.missing.length,0,"n-gon local HTML/CSS asset graph has missing files: "+JSON.stringify(graph.missing));
    await page.waitForSelector("#canvas",{timeout:15000});
    await page.waitForFunction(()=>typeof simulation!=="undefined"&&simulation.onTitlePage===true,null,{timeout:15000});
    await page.waitForTimeout(3600);
    const canvas=page.locator("#canvas");
    const beforeTitle=await shotHash(canvas);
    await page.locator("#start-button").click();
    await page.waitForFunction(()=>typeof simulation!=="undefined"&&simulation.onTitlePage===false,null,{timeout:15000});
    await page.waitForFunction(()=>typeof player!=="undefined"&&player&&player.position&&Number.isFinite(player.position.x),null,{timeout:10000});
    const beforeX=await page.evaluate(()=>player.position.x);
    await page.keyboard.down("ArrowRight");
    await page.waitForTimeout(850);
    await page.keyboard.up("ArrowRight");
    await page.waitForTimeout(350);
    const afterX=await page.evaluate(()=>player.position.x);
    assert(Math.abs(afterX-beforeX)>1,"n-gon player did not move after ArrowRight input");
    const afterPlay=await shotHash(canvas);
    assert.notEqual(afterPlay,beforeTitle,"n-gon canvas did not change after starting gameplay");
    await page.locator("#updates").evaluate(el=>{el.open=true;el.dispatchEvent(new Event("toggle"));});
    await page.waitForTimeout(150);
  }else if(game==="idle-breakout"){
    await page.waitForSelector("#canvas",{timeout:15000});
    await page.waitForFunction(()=>typeof window.GameMaker_Init==="function",null,{timeout:10000});
    await page.waitForTimeout(1200);
    const canvas=page.locator("#canvas");
    const box=await canvas.boundingBox();
    assert(box,"Idle Breakout canvas has no visible bounds");
    const roomBefore=await page.evaluate(()=>typeof room==="undefined"?null:room);
    const before=await shotHash(canvas);
    await page.mouse.click(box.x+box.width*(416/1024),box.y+box.height*(352/768));
    await page.waitForTimeout(700);
    const roomAfter=await page.evaluate(()=>typeof room==="undefined"?null:room);
    const started=await shotHash(canvas);
    assert.notEqual(started,before,"Idle Breakout did not leave the start room after clicking its Start button");
    if(roomBefore!==null&&roomAfter!==null) assert.notDeepEqual(roomAfter,roomBefore,"Idle Breakout room did not transition");
    await page.mouse.click(box.x+box.width*(512/1024),box.y+box.height*(640/768));
    await page.keyboard.press("Space");
    await page.waitForTimeout(900);
    const after=await shotHash(canvas);
    assert.notEqual(after,started,"Idle Breakout did not respond to gameplay input");
  }
  assert.equal(external.length,0,"External runtime requests were attempted: "+external.join(", "));
  assert.equal(failedLocal.length,0,"Local requests failed: "+JSON.stringify(failedLocal));
  assert.equal(badResponses.length,0,"Local assets returned errors: "+JSON.stringify(badResponses));
  assert.equal(pageErrors.length,0,"Browser page errors: "+pageErrors.join(" | "));
  console.log(JSON.stringify({game,result:"PASS",offline:true,externalRequests:external.length,localFailures:failedLocal.length,badResponses:badResponses.length,pageErrors:pageErrors.length}));
}finally{
  if(browser) await browser.close();
  await new Promise(done=>server.close(done));
}
