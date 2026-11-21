import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const root=process.env.GHOST_REPO||path.resolve(import.meta.dirname,'..');
const require=createRequire(path.join(root,'tools/verifier/package.json'));
const {chromium}=require('playwright');

test('ghost editor: previews, keyboard selection, bounds, modes and responsive modal',async()=>{
 const source=await fs.readFile(path.join(root,'tools/opponent-presets.mjs'),'utf8');
 const patch=await fs.readFile(path.join(root,'polytrack_062_patch.js'),'utf8');
 const car=patch.slice(patch.indexOf('  function carModelPreview('),patch.indexOf('  const overallCarRenderCache'));
 assert.match(patch.slice(patch.indexOf('  async function openOpponentShortcutMenu('),patch.indexOf('  function handleOpponentPresetShortcut(')),/renderRacer:row=>carModelPreview/);
 const font=(await fs.readFile(path.join(root,'forced_square.woff2'))).toString('base64');
 const image=await fs.readFile(path.join(root,'images/car_thumbnail_placeholder.png'));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',route=>{
   const url=new URL(route.request().url());
   assert.equal(url.hostname,'localhost','no external / production requests');
   return route.fulfill(url.pathname==='/opponent.mjs'?{contentType:'text/javascript',body:source}:url.pathname.endsWith('.png')?{contentType:'image/png',body:image}:{contentType:'text/html',body:'<!doctype html><title>Local ghost editor audit</title><button id="open">Open ghost shortcut</button>'});
  });
  await page.goto('http://localhost/');
  await page.addStyleTag({content:`@font-face{font-family:ForcedSquare;src:url(data:font/woff2;base64,${font})}body{background:#101a35;color:#fff;font-family:ForcedSquare}`});
  await page.addScriptTag({content:`const __pt062NormalizeStyle=x=>x,__pt062GetRememberedStyle=()=>'',normalizeCarColorId=x=>x,cleanUserId=x=>x,escapeHtml=x=>String(x).replaceAll('"','&quot;');${car}`});
  await page.evaluate(async()=>{
   const module=await import('/opponent.mjs');window.module=module;window.hydrated=0;window.saved=[];
   window.profiles=Array.from({length:30},(_,i)=>({accountId:'racer'+i,name:i===0?'Apex <img onerror=alert(1)>':'Racer '+String(i).padStart(2,'0'),carStyle:'style-'+i}));
   window.escapedKeys=0;document.addEventListener('keydown',()=>escapedKeys++);
   document.querySelector('#open').onclick=()=>module.openOpponentPresetDialog({document,storage:localStorage,getProfiles:()=>profiles,renderRacer:row=>carModelPreview(row.carStyle,'',row.accountId),onRenderRacers:root=>{hydrated+=root.querySelectorAll('.overall-car-model').length;},onSave:value=>saved.push(value),returnFocus:document.querySelector('#open')});
  });
  await page.locator('#open').click();
  const dialog=page.locator('dialog');
  await page.locator('[data-mode]').selectOption('accounts');
  assert.equal(await page.locator('[data-run]').isDisabled(),true);
  assert.equal(await page.locator('[data-results] .overall-car-model').count(),24);
  assert.equal(await page.locator('[data-results] .sq-opponent-racer-name img').count(),0,'names stay escaped text');
  await page.evaluate(()=>profiles[0].name='Apex');await page.locator('[data-search]').fill(' ');
  await page.locator('[data-search]').focus();await page.keyboard.press('ArrowDown');
  assert.equal(await page.evaluate(()=>document.activeElement.dataset.racerId),'racer0');
  await page.keyboard.press('Space');assert.equal(await page.locator('[data-racer-id="racer0"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.evaluate(()=>document.activeElement.dataset.racerId),'racer0','selection retains focus');
  await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>document.activeElement.dataset.racerId),'racer1');
  await page.keyboard.press('End');assert.equal(await page.evaluate(()=>document.activeElement.dataset.racerId),'racer23');
  await page.keyboard.press('Home');await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-racer-id="racer0"]').getAttribute('aria-pressed'),'false');
  for(let i=0;i<10;i++)await page.locator(`[data-racer-id="racer${i}"]`).click();
  await page.locator('[data-racer-id="racer10"]').click();assert.match(await page.locator('[data-status]').textContent(),/Remove one/);
  assert.equal(await page.locator('[data-picked] button').count(),10);
  await page.locator('[data-save]').click();assert.equal(await page.evaluate(()=>saved.at(-1).accounts.length),10);
  await page.locator('[data-search]').fill('does not exist !');assert.equal(await page.locator('[data-results] button').count(),0);assert.match(await page.locator('[data-results-status]').textContent(),/No saved racers match/);
  await page.locator('[data-search]').fill('external-public-id');assert.equal(await page.locator('[data-results] button').count(),1);assert.match(await page.locator('[data-results-status]').textContent(),/not in the saved directory/);
  await page.locator('[data-search]').fill('Racer 12');assert.equal(await page.locator('[data-results] button').count(),1);
  await page.locator('[data-search]').fill('');
  await page.locator('[data-key]').focus();await page.keyboard.press('c');assert.match(await page.locator('[data-status]').textContent(),/Choose B/);
  await page.keyboard.press('Shift+J');assert.equal(await page.locator('[data-key]').inputValue(),'Shift+J');
  for(const mode of ['relative','places','recent','percentile','filters','accounts']){
   await page.locator('[data-mode]').selectOption(mode);
   assert.equal(await page.locator('[data-for]:visible').count(),1);
   assert.equal(await page.locator('[data-for]:visible').getAttribute('data-for'),mode);
  }
  const dir=process.env.POLYTRACK_AUDIT_SCREENSHOT_DIR;
  if(dir)await fs.mkdir(dir,{recursive:true});
  for(const [width,height] of [[1280,900],[320,568],[390,844],[844,390]]){
   await page.setViewportSize({width,height});await page.evaluate(()=>document.fonts.ready);
   const bounds=await dialog.evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,overflow:el.scrollWidth>el.clientWidth+1,mainOverflow:el.querySelector('main').scrollWidth>el.querySelector('main').clientWidth+1};});
   assert.ok(bounds.x>=0&&bounds.y>=0&&bounds.right<=width&&bounds.bottom<=height,JSON.stringify(bounds));
   assert.equal(bounds.overflow,false,'dialog width '+width);assert.equal(bounds.mainOverflow,false,'content width '+width);
   assert.equal(await page.locator('footer [data-save]').isVisible(),true);
   if(dir){
    await page.screenshot({path:path.join(dir,`ghost-editor-${width}x${height}.png`)});
    await page.locator('[data-results]').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(dir,`ghost-finder-${width}x${height}.png`)});
    await page.locator('main').evaluate(el=>el.scrollTop=0);
   }
  }
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog'));assert.equal(await page.locator('#open').evaluate(el=>el===document.activeElement),true);
  await page.locator('#open').click();assert.equal(await page.locator('[data-picked] button').count(),10,'saved group survives reopen');
  await page.locator('[data-close]').click();await page.waitForFunction(()=>!document.querySelector('dialog'));
  await page.evaluate(()=>{
   window.runCount=0;
   module.openOpponentPresetDialog({document,storage:localStorage,getProfiles:()=>profiles,onRun:async()=>{runCount++;throw Error('No saved replay on this track.');}});
  });
  await page.locator('[data-run]').click();assert.equal(await dialog.count(),1);assert.match(await page.locator('[data-status]').textContent(),/No saved replay/);
  assert.equal(await page.evaluate(()=>runCount),1);
  await page.locator('[data-close]').click();await page.waitForFunction(()=>!document.querySelector('dialog'));
  await page.evaluate(()=>module.openOpponentPresetDialog({document,storage:localStorage,getProfiles:()=>profiles,onRun:async()=>{runCount++;}}));
  await page.locator('[data-run]').click();await page.waitForFunction(()=>!document.querySelector('dialog'));assert.equal(await page.evaluate(()=>runCount),2);
  assert.equal(await page.evaluate(()=>escapedKeys),0,'dialog keys never reach game controls');
  assert.ok(await page.evaluate(()=>hydrated)>0);assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
