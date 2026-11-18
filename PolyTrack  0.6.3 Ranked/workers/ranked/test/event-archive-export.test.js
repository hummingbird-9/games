import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {eventWorkerHandler} from '../src/events-worker.js';
import {handleRequest} from '../src/index.js';
import {ARCHIVE_EXPORT_PREFIX, ARCHIVE_EXPORT_READ_LIMIT} from '../src/event-archive-export.js';
import {EVENT_COLLECTIONS as C, eventPeriod, publicEventPeriod} from '../src/events.js';
import {eventEncode} from '../src/events-store.js';
import {preparePublicationPages, PUBLIC_MANIFEST_COLLECTION, publicationManifestId} from '../src/paged-publication.js';

const origin = 'https://archive.test', token = 'synthetic-export-token', id = 'd_20261001';
const account = 'b'.repeat(64), track = 'a'.repeat(64), other = 'c'.repeat(64), now = Date.parse('2026-10-20T12:00:00Z');
const hash = value => createHash('sha256').update(value).digest('hex');
const headers = {Origin:origin,'X-Admin-Token':token};

async function fixture() {
  const calls = [], permits = [], data = new Map();
  const period = eventPeriod({id, enabled:true, kind:'daily', maxRp:100, targetMs:10000, trackId:track,
    startsAt:Date.parse('2026-10-01T00:00:00Z'), endsAt:Date.parse('2026-10-02T00:00:00Z'), graceMs:86400000,
    eligibility:'best-submitted-during-period', capacity:{policyVersion:'test',entrants:200,
      admissionsPerPeriod:2048,replayBytesPerPeriod:16777216,minIntervalMs:5000,verificationsPerDay:1536}});
  const entry = {accountId:account,name:'Racer',timeMs:10000,rp:80,rank:1,carStyle:'native'};
  const paged = await preparePublicationPages('event',id,[entry],{sourceRevision:7,sourceComplete:true});
  for (const doc of paged.documents) data.set(doc.collection+'/'+doc.id,doc.data);
  data.set(PUBLIC_MANIFEST_COLLECTION+'/'+publicationManifestId('event',id,paged.pagination.generation),paged.pagination);
  const board = {periodId:id, period:{...publicEventPeriod(period),ownerUid:'PRIVATE_CANARY'},
    entries:[{...entry,ownerUid:'PRIVATE_CANARY'}], archived:true, archivedAt:period.endsAt+period.graceMs,
    publicationPending:false, racerCount:1, totalEntries:1, complete:true, sourceComplete:true,
    sourceRevision:7, pagination:paged.pagination, privateNotes:'PRIVATE_CANARY'};
  data.set(C.history+'/'+id,board);
  data.set(C.periods+'/'+id,period);
  data.set(C.archives+'/'+id,{ownerUid:'PRIVATE_CANARY',unresolvedRunIds:['PRIVATE_CANARY']});
  const binding = {...period}; delete binding.scoringVersion; delete binding.storageVersion;
  data.set(C.replays+'/'+id+'_'+account,{periodId:id,accountId:account,trackId:track,
    periodBinding:JSON.stringify(binding),runId:other,timeMs:10000,replay:'ABCD',replayHash:hash('ABCD'),
    carStyle:'native',verifiedAt:period.endsAt-1,ownerUid:'PRIVATE_CANARY',proof:'PRIVATE_CANARY'});
  const code='PolyTrack2'+'a'.repeat(40);
  data.set(C.archiveTracks+'/'+id,{periodId:id,trackId:track,trackCode:code,
    trackCodeHash:hash(code),environment:2,privateNotes:'PRIVATE_CANARY'});
  data.set(C.public+'/archive_202610',{periods:[board.period],updatedAt:board.archivedAt,privateNotes:'PRIVATE_CANARY'});
  const request = async(path,init)=>{
    calls.push(path); assert.ok(!init?.method || init.method==='GET','only keyed GETs, never queries or transactions');
    assert.equal(init?.body,undefined);
    assert.equal(path.startsWith('/'),true);
    const value=data.get(path.slice(1));
    return value ? {fields:eventEncode(value).mapValue.fields} : null;
  };
  const env={EVENTS_ENABLED:'true',ADMIN_REBUILD_TOKEN:token,ALLOWED_ORIGINS:origin,
    EVENT_RATE_LIMITER:{limit:async row=>{permits.push(row.key);return {success:true};}},__TEST_FIRESTORE:request};
  const makeHandler=overrides=>eventWorkerHandler({...env,...overrides},{request,origins:new Set([origin]),now:()=>now,
    authenticate:async()=>assert.fail('archive export never authenticates a player')});
  return {calls,permits,data,board,env,makeHandler,handler:makeHandler(),generation:paged.pagination.generation};
}
const request = (suffix,init={})=>new Request('https://worker.test'+ARCHIVE_EXPORT_PREFIX+suffix,{headers,...init});

test('archive export is explicit GET + origin + admin auth before any database or limiter work',async()=>{
  const f=await fixture();
  for(const init of [{headers:{Origin:origin}}, {headers:{Origin:origin,'X-Admin-Token':'wrong'}},
    {headers:{Origin:origin,Authorization:'Bearer '+token}}, {headers:{Origin:'https://evil.test','X-Admin-Token':token}}]) {
    const response=await f.handler(request('/'+id+'/snapshot',init));
    assert.equal(response.status,403);
    assert.equal(response.headers.get('Cache-Control'),'private, no-store');
  }
  for(const method of ['POST','PUT','DELETE','OPTIONS','HEAD'])
    assert.equal((await f.handler(request('/'+id+'/snapshot',{method}))).status,405);
  assert.equal((await f.makeHandler({ADMIN_REBUILD_TOKEN:''})(request('/'+id+'/snapshot'))).status,403);
  assert.equal((await f.makeHandler({EVENTS_ENABLED:'false'})(request('/'+id+'/snapshot'))).status,503);
  assert.deepEqual(f.calls,[]); assert.deepEqual(f.permits,[]);
});

test('archive export rejects bulk, private, malformed and ambiguous selectors without reads',async()=>{
  const f=await fixture();
  for(const suffix of ['', '/', '/catalog', '/all', '/*/snapshot', '/'+id+'/receipt','/'+id+'/runs/'+account,
    '/'+id+'/playbacks/'+account,'/'+id+'/snapshot?limit=1000',
    '/'+id+'/snapshot/page?generation='+f.generation+'&page=100',
    '/'+id+'/snapshot/page?generation='+f.generation+'&page=0&page=1','/archives/202613']) {
    assert.ok([400,404].includes((await f.handler(request(suffix))).status),suffix);
  }
  assert.deepEqual(f.calls,[]); assert.deepEqual(f.permits,[]);
});

test('rate-limited or unavailable admission never touches Firestore',async()=>{
  const f=await fixture();
  for(const limiter of [undefined,{limit:async()=>({success:false})}]) {
    const response=await f.makeHandler({EVENT_RATE_LIMITER:limiter})(request('/'+id+'/snapshot'));
    assert.equal(response.status,429);assert.equal(response.headers.get('Retry-After'),'60');
  }
  assert.equal((await f.makeHandler({EVENT_RATE_LIMITER:{limit:async()=>{throw Error('limiter down');}}})(request('/'+id+'/snapshot'))).status,503);
  assert.deepEqual(f.calls,[]);
});

for(const [resource,expectedReads] of [['snapshot',1],['track',2],['replays/'+account,4],['page',3],['month',1]])
  test('operator exports only public '+resource+' with bounded keyed reads and no cache writes',async()=>{
    const f=await fixture(),prior=globalThis.caches;
    globalThis.caches={default:{match:async()=>assert.fail('cache read'),put:async()=>assert.fail('cache write')}};
    const suffix=resource==='page'?'/'+id+'/snapshot/page?generation='+f.generation+'&page=0':
      resource==='month'?'/archives/202610':'/'+id+'/'+resource;
    try {
      const response=await f.handler(request(suffix));
      const body=await response.json();
      assert.equal(response.status,200,JSON.stringify(body));
      assert.equal(JSON.stringify(body).includes('PRIVATE_CANARY'),false);
      assert.equal(response.headers.get('X-Archive-Document-Reads'),String(expectedReads));
      assert.equal(response.headers.get('Cache-Control'),'private, no-store');
      assert.equal(f.calls.length,expectedReads); assert.ok(f.calls.length<=ARCHIVE_EXPORT_READ_LIMIT);
      assert.deepEqual(f.permits,['admin-archive-export']);
      const publicPath=resource==='month'?'/archives/202610':resource==='page'?'/'+id+'/snapshot/page?generation='+f.generation+'&page=0':'/'+id+'/'+resource;
      const publicResponse=await f.handler(new Request('https://worker.test/v1/events'+publicPath,{headers}));
      assert.equal(publicResponse.status,410,'even a valid admin header cannot bypass the public guard');
      assert.equal(f.calls.length,expectedReads);
    } finally {if(prior===undefined)delete globalThis.caches;else globalThis.caches=prior;}
  });

test('missing or non-final archives never trigger a live lookup, scan, or verification',async()=>{
  for(const change of ['missing','live','pending','wrong_id','future']) {
    const f=await fixture();
    if(change==='missing')f.data.delete(C.history+'/'+id);
    if(change==='live')f.board.archived=false;
    if(change==='pending')f.board.publicationPending=true;
    if(change==='wrong_id')f.board.period.id='different';
    if(change==='future')f.board.archivedAt=now+1;
    const response=await f.handler(request('/'+id+'/snapshot'));
    assert.ok([404,409,503].includes(response.status),change);
    assert.deepEqual(f.calls,['/'+C.history+'/'+id]);
  }
});

test('archive page export binds to the frozen generation and rejects missing or mismatched parts',async()=>{
  const f=await fixture();
  let response=await f.handler(request('/'+id+'/snapshot/page?generation='+other+'&page=0'));
  assert.equal(response.status,409);assert.equal(f.calls.length,1);
  f.calls.length=0;
  f.data.delete(PUBLIC_MANIFEST_COLLECTION+'/'+publicationManifestId('event',id,f.generation));
  response=await f.handler(request('/'+id+'/snapshot/page?generation='+f.generation+'&page=0'));
  assert.equal(response.status,404);assert.equal(f.calls.length,2);
});

test('top-level Worker dispatch supports archive export without weakening public routes',async()=>{
  const f=await fixture();
  const response=await handleRequest(request('/'+id+'/snapshot'),f.env);
  assert.equal(response.status,200);assert.equal(f.calls.length,1);
  const publicResponse=await handleRequest(new Request('https://worker.test/v1/events/'+id+'/snapshot',{headers}),f.env);
  assert.equal(publicResponse.status,410);assert.equal(f.calls.length,1);
});
