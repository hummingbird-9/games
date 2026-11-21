import test from 'node:test';
import assert from 'node:assert/strict';
import {liveEventWindow, staticEventRead} from '../src/event-read-policy.js';
import {eventWorkerHandler} from '../src/events-worker.js';
import {eventEncode} from '../src/events-store.js';
import {EVENT_COLLECTIONS as C, eventPeriod} from '../src/events.js';

const at = Date.parse('2026-10-20T12:00:00Z'), day = 86400000;
const origin = 'https://game.test', account = 'a'.repeat(64);
const headers = {Origin:origin, 'CF-Connecting-IP':'192.0.2.1'};

test('finite event windows match UTC provisioners, settlement, and invalid dates', () => {
  for (const id of ['d_20261020','d_20261019','w_20261019','kodub_' + Date.parse('2026-10-25T20:00:00Z')])
    assert.equal(liveEventWindow(id, at), true, id);
  for (const id of ['d_20261018','d_20261021','w_20261012','w_20261020','d_20260230','d_20261301',
    'kodub_9007199254740999','kodub_001','custom_event'])
    assert.equal(liveEventWindow(id, at), false, id);
  const cutoff = Date.parse('2026-10-22T00:00:00Z');
  assert.equal(liveEventWindow('d_20261020', cutoff - 1), true);
  assert.equal(liveEventWindow('d_20261020', cutoff), false);
  assert.equal(staticEventRead('/v1/events/permanent-rolling-hills/snapshot', at), null);
  for (const path of ['/catalog','/totals','/totals/page','/current'])
    assert.equal(staticEventRead('/v1/events' + path, at), null);
});

test('historical event routes cost zero Firestore/auth/limiter/cache calls, including cache misses', async () => {
  const prior = globalThis.caches;
  globalThis.caches = {default:{match:async()=>assert.fail('archive must not consult old live caches')}};
  const handler = eventWorkerHandler({EVENTS_ENABLED:'true', EVENT_RATE_LIMITER:{limit:async()=>assert.fail('rate limit')}}, {
    now:()=>at, request:async()=>assert.fail('Firestore'), authenticate:async()=>assert.fail('authentication'),
    origins:new Set([origin])
  });
  try {
    for (const id of ['d_20261001','w_20260928','kodub_1791748800000','custom_event'])
      for (const resource of ['snapshot','snapshot/page','replays/'+account,'playbacks/'+account,'track','receipt','runs/'+account]) {
        const response = await handler(new Request(`https://worker.test/v1/events/${id}/${resource}?page=0&generation=${account}`, {headers}));
        assert.equal(response.status, 410);
        assert.deepEqual(await response.json(), {error:'event_archive_static_only', snapshotOnly:true,
          snapshotPointer:'snapshot-current.json', periodId:id});
      }
    const month = await handler(new Request('https://worker.test/v1/events/archives/202610', {headers}));
    assert.equal(month.status, 410);
    const denied = await handler(new Request('https://worker.test/v1/events/d_20261001/snapshot',
      {headers:{Origin:'https://untrusted.test'}}));
    assert.equal(denied.status, 403);
  } finally {if (prior === undefined) delete globalThis.caches; else globalThis.caches = prior;}
});

test('live routes stay available; settlement cutoff defeats a previously warm cache', async () => {
  const prior = globalThis.caches, stored = new Map();
  let now = at, reads = 0, permits = 0;
  globalThis.caches = {default:{
    match:async key=>stored.get(key.url)?.clone(),
    put:async(key,response)=>{stored.set(key.url,response.clone());}
  }};
  const id = 'd_20261020', period = eventPeriod({id, trackId:account, startsAt:at-12*3600000,
    endsAt:at+12*3600000, graceMs:day, enabled:true, kind:'daily', eligibility:'best-submitted-during-period',
    capacity:{policyVersion:'test',entrants:200,admissionsPerPeriod:2048,replayBytesPerPeriod:16777216,
      minIntervalMs:5000,verificationsPerDay:1536}, targetMs:10000, maxRp:100});
  const handler = eventWorkerHandler({EVENTS_ENABLED:'true', EVENT_RATE_LIMITER:{limit:async()=>{permits++;return {success:true};}}}, {
    now:()=>now, origins:new Set([origin]), authenticate:async()=>assert.fail('anonymous'),
    request:async(route)=>{
      if (route === ':beginTransaction') return {transaction:'test'};
      if (route === ':commit' || route === ':rollback') return {};
      reads++;
      const key = route.split('?')[0];
      const value = key === '/'+C.periods+'/'+id ? period : key === '/'+C.live+'/'+id ? {entries:[],updatedAt:at} : null;
      return value ? {fields:eventEncode(value).mapValue.fields,updateTime:'v1'} : null;
    }
  });
  const get = suffix=>handler(new Request('https://worker.test/v1/events/'+id+'/snapshot'+suffix, {headers}));
  try {
    const cold = await get('');
    assert.equal(cold.status,200); assert.equal((await cold.json()).archived,false);
    assert.equal(reads,3); assert.equal(permits,1);
    assert.equal((await get('?ignored=1')).status,200);
    assert.equal(reads,3); assert.equal(permits,1);
    const cached = [...stored.values()][0];
    assert.equal(cached.headers.get('Cache-Control'),'public, max-age=60');
    now = period.endsAt + day;
    assert.equal((await get('')).status,410);
    assert.equal(reads,3); assert.equal(permits,1);
  } finally {if (prior === undefined) delete globalThis.caches; else globalThis.caches = prior;}
});
