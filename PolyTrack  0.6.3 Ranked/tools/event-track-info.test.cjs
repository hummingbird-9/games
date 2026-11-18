const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../polytrack_062_patch.js'),'utf8');
const start=source.indexOf('  function updateTrackFreshnessBanner('),end=source.indexOf('\n  function ',start+1);
test('event leaderboards remove the normal weight/player infocard before painting',()=>{
 let removed=0;const board={classList:{contains:name=>name==='sq-event-board'}};
 const ctx=vm.createContext({document:{querySelector:()=>board,getElementById:()=>({remove(){removed++;}})},isElementVisible:()=>true,currentTrackLoadState:{trackId:'kodub'},positionTrackFreshnessBanner:()=>{}});
 vm.runInContext(source.slice(start,end),ctx);ctx.updateTrackFreshnessBanner();assert.equal(removed,1);
});
test('a new native Spite board never displays the previous Summer 1 metadata while loading',()=>{
 let removed=0,cleared=0;const summer='a'.repeat(64),spite='60e247f90d43ecaa8b56a4677307094ab0259f36151af23e09fdc824741d3e48';
 const board={__pt062OpponentSelection:{version:1,trackId:()=>spite},classList:{contains:()=>false}};
 const ctx=vm.createContext({document:{querySelector:()=>board,getElementById:()=>({remove(){removed++;}})},currentTrackLoadState:{trackId:summer,status:'snapshot'},positionTrackFreshnessBanner:(banner,owner)=>{assert.equal(banner,null);assert.equal(owner,null);cleared++;},readTrackSnapshotCache:()=>assert.fail('must not read or render the old track metadata')});
 vm.runInContext(source.slice(start,end),ctx);ctx.updateTrackFreshnessBanner();assert.equal(removed,1);assert.equal(cleared,1);
 ctx.currentTrackLoadState={trackId:spite,status:'loading'};ctx.isElementVisible=()=>true;ctx.eventUi=null;ctx.nativeWeeklySelection=null;ctx.kodubTrackHistory=new Map([[spite,{}]]);
 ctx.updateTrackFreshnessBanner();assert.equal(removed,2,'historical Kodub suppression still applies after matching load state arrives');
});

test('uninitialized native ownership hides old values; matching ownership resumes the normal metadata path',()=>{
 let removed=0;const board={__pt062OpponentSelection:{version:1,trackId:()=>''},classList:{contains:()=>false}};
 const ctx=vm.createContext({document:{querySelector:()=>board,getElementById:()=>({remove(){removed++;}})},currentTrackLoadState:{trackId:'normal',status:'loading'},positionTrackFreshnessBanner:()=>{}});
 vm.runInContext(source.slice(start,end),ctx);ctx.updateTrackFreshnessBanner();assert.equal(removed,1);
 board.__pt062OpponentSelection.trackId=()=> 'normal';Object.assign(ctx,{isElementVisible:()=>true,eventUi:null,nativeWeeklySelection:null,kodubTrackHistory:new Map(),readTrackSnapshotCache:()=>{throw Error('matching track path');}});
 assert.throws(()=>ctx.updateTrackFreshnessBanner(),/matching track path/);assert.equal(removed,1);
});

test('event takeover removes an already visible normal-track infocard immediately',()=>{
 const client=fs.readFileSync(path.join(__dirname,'../events/client.mjs'),'utf8');
 assert.match(client,/board.classList.add\('sq-event-board'\);root.classList.add\('sq-event-layout-ready'\);\s*document.getElementById\('polytrackTrackFreshness'\)\?\.remove\(\)/);
 assert.match(client,/points.textContent=Math.round\(Number\(row.groupRp\?\?row.rp\)\|\|0\)/);
});

test('entered event sessions suppress the infocard before takeover without hiding normal RHR',()=>{
 let removed=0;const board={classList:{contains:()=>false}};const ctx=vm.createContext({document:{querySelector:()=>board,getElementById:()=>({remove(){removed++;}})},isElementVisible:()=>true,eventUi:{isEntered:id=>id==='event'},nativeWeeklySelection:null,kodubTrackHistory:new Map(),currentTrackLoadState:{trackId:'event'},positionTrackFreshnessBanner:()=>{}});
 vm.runInContext(source.slice(start,end),ctx);ctx.updateTrackFreshnessBanner();assert.equal(removed,1);
 ctx.currentTrackLoadState={trackId:'normal-rhr'};ctx.readTrackSnapshotCache=()=>{throw Error('normal banner path');};assert.throws(()=>ctx.updateTrackFreshnessBanner(),/normal banner path/);
});

test('current and archived Kodub normal-PB views also suppress the normal infocard',()=>{for(const archived of [false,true]){let removed=0;const ctx=vm.createContext({document:{querySelector:()=>({classList:{contains:()=>false}}),getElementById:()=>({remove(){removed++;}})},isElementVisible:()=>true,currentTrackLoadState:{trackId:'kodub'},eventUi:null,nativeWeeklySelection:archived?null:{trackId:'kodub'},kodubTrackHistory:new Map(archived?[['kodub',{}]]:[]),positionTrackFreshnessBanner:()=>{}});vm.runInContext(source.slice(start,end),ctx);ctx.updateTrackFreshnessBanner();assert.equal(removed,1);}});
