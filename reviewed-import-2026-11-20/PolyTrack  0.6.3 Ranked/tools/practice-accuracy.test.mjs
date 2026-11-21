import test from 'node:test';
import assert from 'node:assert/strict';
import {createPracticeHistory,PRACTICE_KEY} from './practice-history.mjs';
import {buildDeveloperReport} from './developer-diagnostics.mjs';

const account='a'.repeat(64),track='b'.repeat(64);
const at=Date.UTC(2026,9,22),limit=315576000000;
function fixture(row,coverage={}){
 let saved=JSON.stringify({version:1,accounts:{[account]:{[track]:row}},coverage}),writes=0;
 const storage={getItem:key=>{assert.equal(key,PRACTICE_KEY);return saved;},setItem:(key,value)=>{assert.equal(key,PRACTICE_KEY);saved=value;writes++;}};
 return {storage,read:()=>JSON.parse(saved),writes:()=>writes,load:()=>createPracticeHistory({storage,now:()=>at})};
}

test('minimized older diagnostics shape keeps totals but never invents lost finish dates',()=>{
 const old={activeTimeVersion:2,activeMs:90000,legacyActiveMs:90000,simulatedMs:60000,
  attempts:10,finishes:2,lastPlayedAt:at-1000,lastObservedFinishAt:at-1000,
  recentFinishes:[{at:limit,timeMs:23074,practiceMs:23072},{at:limit,timeMs:23470,practiceMs:23469}]};
 const f=fixture(old),h=f.load(),row=h.get(account,track);
 assert.equal(row.activeMs,90000);assert.equal(row.legacyActiveMs,90000);
 assert.deepEqual(row.recentFinishes.map(run=>run.at),[0,0]);
 assert.deepEqual(row.recentFinishes.map(run=>run.timeMs),[23074,23470]);
 assert.equal(row.lastObservedFinishAt,at-1000);
 assert.equal(f.writes(),0);assert.equal(h.flush(true),true);
 assert.deepEqual(f.load().get(account,track),row);
});

test('v2 legacy equality is not repeated migration: new clock credit survives multiple reloads',()=>{
 const f=fixture({activeTimeVersion:2,activeMs:90000,legacyActiveMs:90000,attempts:10});
 for(let i=1;i<=3;i++){
  const h=f.load(),a=h.begin(account,track);a.tick(950,1,950);a.leave();
  const row=f.load().get(account,track);
  assert.equal(row.activeMs,90000+i*950);assert.equal(row.legacyActiveMs,90000);
 }
});

test('unversioned legacy estimates migrate durably even without a new run',()=>{
 const f=fixture({activeMs:90000,legacyActiveMs:5000,trackingStartedAt:at-5000,finishes:2}),h=f.load();
 assert.equal(h.get(account,track).legacyActiveMs,90000);
 assert.equal(h.flush(true),true);assert.equal(f.read().accounts[account][track].activeTimeVersion,2);
 const restored=f.load();assert.equal(restored.flush(true),false);
 assert.equal(restored.get(account,track).legacyActiveMs,90000);
 assert.equal(restored.get(account,track).trackedBestMs,0);
});

test('future and malformed epoch fields become unknown, never today or a duration',()=>{
 const f=fixture({activeTimeVersion:2,activeMs:1,legacyActiveMs:0,attempts:1,
  lastPlayedAt:at+1,lastPbAt:'bad',trackingStartedAt:at+1,
  observedStartedAt:at+1,lastObservedFinishAt:at+1}, {[account]:{startedAt:at+1}});
 const row=f.load().get(account,track);
 for(const key of ['lastPlayedAt','lastPbAt','trackingStartedAt','observedStartedAt','lastObservedFinishAt'])assert.equal(row[key],0,key);
 assert.equal(f.load().coverage(account).startedAt,0);
});

test('new epoch finishes and millisecond durations round-trip without seconds or 60Hz conversion',()=>{
 const f=fixture({}),h=f.load(),a=h.begin(account,track);
 a.tick(1000,1,1000);a.finish(12345);
 const row=f.load().get(account,track);
 assert.equal(row.recentFinishes[0].at,at);assert.equal(row.recentFinishes[0].timeMs,12345);
 assert.equal(row.activeMs,1000);assert.equal(row.simulatedMs,1000);assert.equal(row.legacyActiveMs,0);
 const report=buildDeveloperReport({practice:[{trackId:track,...row}]});
 assert.equal(report.practice[0].recentFinishes[0].at,at);
 assert.equal(report.practice[0].recentFinishes[0].timeMs,12345);
});

test('both export paths mark known corrupt dates unknown and leave the input untouched',()=>{
 const row={publicId:account,trackId:track,activeTimeVersion:2,activeMs:1000,legacyActiveMs:1000,
  recentFinishes:[null,{at:limit,timeMs:12345,practiceMs:12340},{at:at-1000,timeMs:12300,practiceMs:12290},{at:at,timeMs:-1}]};
 const before=JSON.stringify(row);
 const report=buildDeveloperReport({practice:[row],localData:{practice:[row]},includePublicId:true});
 for(const output of [report.practice[0],report.localData.practice[0]]){
  assert.deepEqual(output.recentFinishes.map(run=>run.at),[0,at-1000]);
  assert.deepEqual(output.recentFinishes.map(run=>run.timeMs),[12345,12300]);
  assert.equal(output.activeMs,output.legacyActiveMs);assert.equal(output.activeTimeVersion,2);
 }
 assert.equal(JSON.stringify(row),before);
});

test('runtime duration saturation matches reload and coverage cannot grow unbounded',()=>{
 const f=fixture({activeTimeVersion:2,activeMs:limit-1,simulatedMs:limit-1,sincePbMs:limit-1,legacyActiveMs:0,attempts:1},
  {[account]:{startedAt:at-1000,baselinePlaytimeMs:limit-1,knownPlaytimeMs:limit-1,observedVisibleMs:limit-1}});
 const h=f.load(),a=h.begin(account,track);a.tick(1000);a.leave();
 for(const row of [h.get(account,track),f.load().get(account,track)])for(const key of ['activeMs','simulatedMs','sincePbMs'])assert.equal(row[key],limit);
 h.observeCoverage(account,Number.MAX_VALUE,120000);h.flush(true);
 assert.equal(h.coverage(account).knownPlaytimeMs,limit);assert.equal(h.coverage(account).observedVisibleMs,limit);
 assert.deepEqual(f.load().coverage(account),h.coverage(account));
 assert.ok(JSON.stringify(f.read()).length<4000);
});
