import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';

const require=createRequire(new URL('./verifier/package.json',import.meta.url));
const {chromium}=require('playwright');
const patch=fs.readFileSync(new URL('../polytrack_062_patch.js',import.meta.url),'utf8');
const home=fs.readFileSync(new URL('../home-ui.css',import.meta.url),'utf8');
const layout=patch.match(/function overallFooterLayoutCss\(\)\{[\s\S]*?return `([\s\S]*?)`;/)[1];
const challengeSource=patch.match(/    const challenge=([^\n]+);\r?\n/)[1];
const challenge=vm.runInNewContext(challengeSource,{
  escapeHtml:value=>String(value),trackThumbnailMarkup:()=>'<img alt="" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27100%27%3E%3C/svg%3E">',
});

test('weekly and daily footer tiles fit short laptop sections and react across the tile',async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage();
    await page.route('**/*',route=>route.abort());
    const cards=challenge('weekly-cup','WEEKLY EVENT',{id:'winter5',name:'Winter 5'},'Up to 500 Event RP','Resets<br><strong>Sun 17:00</strong>')+
      challenge('daily-card','DAILY EVENT',{id:'daily',name:'Amberbound'},'Up to 100 Event RP','Resets<br><strong>Mon 17:00</strong>');
    await page.setContent(`<style>body{margin:0;font-family:sans-serif} ${home}\n${layout}</style><main id="overallLeaderboardPanel"><footer id="overallDailyGrid"><div class="overall-challenge-stack">${cards}</div><div class="overall-center-tools">Pages</div><div class="overall-footer-right">Rank by</div></footer></main>`);
    for(const [width,height] of [[1366,768],[1280,720],[1024,600],[768,1024],[390,844]]){
      await page.setViewportSize({width,height});
      const measurements=await page.locator('.overall-challenge-stack > section').evaluateAll(cards=>cards.map(card=>{
        const bounds=card.getBoundingClientRect();
        return {width:bounds.width,overflow:card.scrollWidth-card.clientWidth,
          parts:[...card.querySelectorAll('button,.competition-feature-image,.competition-feature-copy,small')].map(node=>{
            const r=node.getBoundingClientRect();return {tag:node.tagName,left:r.left-bounds.left,right:r.right-bounds.right,overflow:node.scrollWidth-node.clientWidth};
          })};
      }));
      for(const card of measurements){
        assert.ok(card.width>0);
        assert.ok(card.overflow<=1,`${width}: tile overflow`);
        for(const part of card.parts){assert.ok(part.left>=0&&part.right<=1,`${width}: clipped tile content`);if(part.tag!=='BUTTON')assert.ok(part.overflow<=1,`${width}: text overflow ${JSON.stringify(part)}`);}
      }
      const tile=page.locator('.weekly-cup');
      await tile.hover();
      assert.equal(await tile.evaluate(node=>getComputedStyle(node).backgroundColor),'rgb(53, 85, 140)');
    }
  }finally{await browser.close();}
});
