import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../polytrack_062_patch.js',import.meta.url),'utf8');
function extract(name){const start=source.indexOf('  function '+name+'('),end=source.indexOf('\n  }',start);assert.ok(start>=0&&end>start);return source.slice(start,end+4);}
const labels={events:'Event RP',overall:'Overall RP',tracks:'Tracks completed',topTracks:'Top Tracks',official:'Official tracks',community:'Community tracks'};
function fixture(saved){
  let stored=saved===undefined?null:JSON.stringify(saved);
  const context=vm.createContext({LEADERBOARD_LABELS:labels,LEADERBOARD_USAGE_KEY:'usage',overallCategory:'overall',escapeHtml:String,
    readJsonStorage:(_key,fallback)=>stored===null?fallback:JSON.parse(stored),writeJsonStorage:(_key,value)=>{stored=JSON.stringify(value);}});
  vm.runInContext(extract('recordLeaderboardUse')+'\n'+extract('leaderboardArcadeMarkup'),context);
  return {context,html:()=>context.leaderboardArcadeMarkup(),usage:()=>JSON.parse(stored),saved:()=>stored};
}
test('suggested favorites never invent usage counts and persisted counts survive reload',()=>{
  const f=fixture();assert.doesNotMatch(f.html(),/Opened/);assert.equal(f.saved(),null);
  f.context.recordLeaderboardUse('topTracks');assert.match(f.html(),/Opened 1 time on this device/);
  assert.deepEqual(f.usage(),{topTracks:1});assert.equal(fixture(f.usage()).html(),f.html());
});
test('legacy track-category variants contribute to the shared completion favorite',()=>{
  const f=fixture({official:3,community:2,tracks:1});
  assert.match(f.html(),/Opened 6 times on this device/);
  f.context.recordLeaderboardUse('community');assert.match(f.html(),/Opened 7 times on this device/);
  assert.doesNotMatch(f.html(),/data-leaderboard-shortcut="(?:official|community)"/);
});
test('corrupt usage values cannot produce invalid labels or unbounded counts',()=>{
  const f=fixture({overall:-3,tracks:'bad',topTracks:1e30,unknown:99,constructor:99});
  assert.doesNotMatch(f.html(),/NaN|Infinity|undefined|data-leaderboard-shortcut="constructor"/);
  f.context.recordLeaderboardUse('overall');f.context.recordLeaderboardUse('topTracks');f.context.recordLeaderboardUse('unknown');
  assert.equal(f.usage().overall,1);assert.equal(f.usage().topTracks,1000000000);assert.equal(f.usage().unknown,99);
});
test('all favorites delegate to the same category transition',()=>{
  const from=source.indexOf("      const leaderboardShortcut=event.target.closest?.('[data-leaderboard-shortcut]');");
  const to=source.indexOf('      const scope=',from);assert.ok(from>=0&&to>from);
  const selected=[];const context=vm.createContext({setOverallCategory:value=>selected.push(value)});
  const click=vm.runInContext('(event)=>{'+source.slice(from,to)+'}',context);
  for(const key of Object.keys(labels))click({target:{closest:()=>({dataset:{leaderboardShortcut:key}})}});
  assert.deepEqual(selected,Object.keys(labels));
});
test('active category clicks do not inflate counts while category changes synchronize the display',()=>{
  const calls=[];const context=vm.createContext({overallCategory:'overall',overallPage:7,overallEntriesCache:[{}],document:{getElementById:()=>({})},
    mirrorRankedFilterCategory:value=>calls.push(['filter',value]),recordLeaderboardUse:value=>calls.push(['use',value]),refreshLeaderboardArcade:()=>calls.push(['favorites']),syncOverallTrackScope:(_panel,value)=>calls.push(['scope',value]),syncCategorySelect:()=>calls.push(['label']),renderEntries:()=>calls.push(['render']),updateRankedFreshness:()=>calls.push(['freshness']),fetchEventTotals:()=>calls.push(['events'])});
  vm.runInContext(extract('setOverallCategory'),context);context.setOverallCategory('overall');assert.deepEqual(calls,[]);
  context.setOverallCategory('tracks');assert.equal(context.overallPage,0);
  assert.deepEqual(calls,[['filter','tracks'],['use','tracks'],['favorites'],['scope','tracks'],['label'],['render'],['freshness']]);
});
