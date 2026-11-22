const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../polytrack_062_patch.js'),'utf8');
function fixture(get,readSnapshot=async()=>null){
  let now=1000,reads=0,quotaErrors=0;
  const context={Map,Date:{now:()=>now},db:async()=>({collection:name=>{
    assert.equal(name,'0.6.2_event_public');
    return {doc:id=>({get:()=>{reads++;return get(id);}})};
  }}),readPublicSnapshotBackup:readSnapshot,snapshotOnlyForNewAccount:()=>false,noteFirebaseQuota:()=>quotaErrors++};
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('  const archiveMonthReads=new Map();'),source.indexOf('  const eventReplayRequests=new Map();')),context);
  return {read:context.readEventArchiveMonth,reads:()=>reads,quotaErrors:()=>quotaErrors,advance:ms=>now+=ms};
}
test('archive refreshes share one read and reuse results for ten minutes',async()=>{
  let release;const f=fixture(()=>assert.fail('No archive Firestore reads'),()=>new Promise(resolve=>release=resolve));
  const a=f.read('2026-09'),b=f.read('2026-09');
  await new Promise(resolve=>setImmediate(resolve));release({periods:[1]});
  assert.equal(await a,await b);assert.equal(f.reads(),0);
  await f.read('2026-09');assert.equal(f.reads(),0);
  f.advance(600001);const refresh=f.read('2026-09');await new Promise(resolve=>setImmediate(resolve));
  release({periods:[2]});await refresh;assert.equal(f.reads(),0);
});
test('missing archive is cached instead of repeatedly reading an absent document',async()=>{
  const f=fixture(async()=>({exists:false}));
  await assert.rejects(f.read('2026-09'),/not included in the saved data/);
  await assert.rejects(f.read('2026-09'),/retry paused/);assert.equal(f.reads(),0);
});
test('saved archive snapshot is used before Firestore',async()=>{
  const saved={periods:[{id:'saved'}]},snapshotReads=[];
  const f=fixture(()=>assert.fail('Firestore must not be read when the archive snapshot exists'),async(kind,id)=>{
    snapshotReads.push([kind,id]);return saved;
  });
  assert.strictEqual(await f.read('2026-09'),saved);
  assert.deepEqual(snapshotReads,[['archive-month','2026-09']]);
  assert.equal(f.reads(),0);
});
test('snapshot errors back off without falling through to Firebase',async()=>{
  const f=fixture(()=>assert.fail('No archive Firestore reads'),async()=>{throw Error('snapshot offline');});
  await assert.rejects(f.read('2026-09'));await assert.rejects(f.read('2026-09'),/retry paused/);
  assert.equal(f.reads(),0);
  f.advance(60001);await assert.rejects(f.read('2026-09'));assert.equal(f.reads(),0);
});
test('saved archive survives failed refreshes',async()=>{
  let fail=false;const f=fixture(()=>assert.fail('No archive Firestore reads'),async()=>{if(fail)throw Error('offline');return {periods:[1]};});
  const saved=await f.read('2026-09');fail=true;f.advance(600001);
  assert.equal(await f.read('2026-09'),saved);assert.equal(await f.read('2026-09'),saved);assert.equal(f.reads(),0);
});
test('invalid months cannot cause Firestore reads',async()=>{
  const f=fixture(async()=>({exists:false}));
  for(const month of ['2026-00','2026-13','../catalog','2026-9'])await assert.rejects(f.read(month),/Invalid archive month/);
  assert.equal(f.reads(),0);
});
test('cache capacity bounds simultaneous archive reads',async()=>{
  const releases=[],f=fixture(()=>assert.fail('No archive Firestore reads'),()=>new Promise(resolve=>releases.push(resolve)));
  const requests=[];for(let year=2000;year<2024;year++)requests.push(f.read(year+'-01'));
  await assert.rejects(f.read('2024-01'),/requests busy/);
  await new Promise(resolve=>setImmediate(resolve));
  for(const release of releases)release({periods:[]});await Promise.all(requests);assert.equal(f.reads(),0);
});
