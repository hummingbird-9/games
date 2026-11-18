import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {installNativeRankedAuditFixture} from './native-ranked-audit-fixture.mjs';

const url=String(process.env.POLYTRACK_NATIVE_AUDIT_URL||'').trim();

test('native Summer 1 pagination and verified filter work from local snapshots offline',{skip:!url},async()=>{
 const require=createRequire(new URL('./verifier/package.json',import.meta.url));
 const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
 const origin=new URL(url).origin,externalRequests=[],pageErrors=[];
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 try{
  const page=await browser.newPage({viewport:{width:844,height:390}});
  page.on('pageerror',error=>pageErrors.push(String(error?.stack||error)));
  await page.route('**/*',route=>{
   const target=new URL(route.request().url());
   if(target.origin===origin)return route.continue();
   externalRequests.push({origin:target.origin,path:target.pathname});
   return route.abort('blockedbyclient');
  });
  await installNativeRankedAuditFixture(page,{rejectWrites:true});
  await page.goto(url,{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'Exit',exact:true}).click();
  await page.getByRole('button',{name:/^Summer 1/}).last().click();

  const board=page.locator('.track-info-ui .leaderboard-ui');
  const rows=board.locator('.container button.main');
  await page.waitForFunction(()=>document.querySelectorAll('.track-info-ui .leaderboard-ui .container button.main').length===20,null,{timeout:30000});
  const freshness=page.locator('#polytrackTrackFreshness');
  assert.equal(await freshness.evaluate(element=>element.parentElement===document.body),
   true,'freshness context is anchored outside the scaled native board');
  const overlaps=await freshness.evaluate(element=>{
   const a=element.getBoundingClientRect();
   return [...document.querySelectorAll('.track-info-ui .leaderboard-ui > .container button.main')].some(row=>{
    const b=row.getBoundingClientRect();return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
   });
  });
  assert.equal(overlaps,false,'freshness context does not cover racer results');
  const totalText=await board.locator(':scope > .total-players').innerText();
  const total=Number(totalText.match(/[\d,]+/)?.[0].replaceAll(',',''));
  assert.ok(Number.isFinite(total)&&total>20,`local snapshot provides multiple pages: ${totalText}`);
  assert.match(await rows.first().innerText(),/^1st\b/);

  if(process.env.POLYTRACK_REVIEW_SCREENSHOT_DIR){
   await page.screenshot({path:`${process.env.POLYTRACK_REVIEW_SCREENSHOT_DIR}/footer-native-844x390.png`});
   await page.setViewportSize({width:1366,height:900});
   await page.screenshot({path:`${process.env.POLYTRACK_REVIEW_SCREENSHOT_DIR}/footer-native-1366x900.png`});
   await page.setViewportSize({width:844,height:390});
  }

  const pageTwo=board.locator('.pages > button.page').filter({hasText:/^2$/});
  await pageTwo.click();
  await page.waitForFunction(()=>document.querySelector('.track-info-ui .leaderboard-ui .container button.main')?.innerText.startsWith('21st'),null,{timeout:20000});
  assert.equal(await board.locator('.pages > button.page.selected').innerText(),'2');

  await board.locator('.button-wrapper > .only-verified').click();
  await page.waitForFunction(()=>document.querySelector('.track-info-ui .leaderboard-ui .container button.main')?.innerText.startsWith('1st'),null,{timeout:20000});
  assert.equal(await board.locator('.pages > button.page.selected').innerText(),'1','changing verification resets pagination');
  assert.equal(await board.locator('.button-wrapper > .only-verified').evaluate(button=>button.classList.contains('disabled')),false,'verified-only state is active');

  await board.locator('.button-wrapper > .only-verified').click();
  await page.waitForFunction(()=>document.querySelector('.track-info-ui .leaderboard-ui .container button.main')?.innerText.startsWith('1st'),null,{timeout:20000});
  assert.equal(await board.locator('.pages > button.page.selected').innerText(),'1');
  assert.equal(await board.locator('.button-wrapper > .only-verified').evaluate(button=>button.classList.contains('disabled')),true,'verified-only state returns to inactive');
  assert.deepEqual(pageErrors,[]);
  assert.equal(await page.evaluate(()=>window.__ptNativeRankedAudit?.errors?.length||0),0,'native game reports no captured runtime errors');
  console.log(JSON.stringify({viewport:'844x390',snapshotRacers:total,loadedPages:Math.ceil(total/20),externalRequestsBlocked:externalRequests.length,firestoreWorkerRequests:0,verifiedFilterToggles:2,pageTransition:'1 -> 2 -> 1'}));
 }finally{await browser.close();}
});
