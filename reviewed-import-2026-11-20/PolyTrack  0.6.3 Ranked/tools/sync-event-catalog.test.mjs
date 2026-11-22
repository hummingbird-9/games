import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { publicCatalogBackup, syncPublicEventCatalog } from './sync-event-catalog.mjs';

test('public event backup retains assignments without private or overall ranking fields', () => {
  const period = { id: 'd_20260928', kind: 'daily', trackId: 'a'.repeat(64), startsAt: 100, endsAt: 200, maxRp: 100 };
  assert.deepEqual(publicCatalogBackup({ periods: [period], archives: [], totals: [{ accountId: 'private' }] }), { periods: [period], archives: [] });
  assert.throws(() => publicCatalogBackup({ periods: [{ ...period, trackId: 'bad' }], archives: [] }), /Invalid public event period/);
});

test('catalog temporary failures preserve saved assignments; invalid data remains an error', async t => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'polytrack-catalog-defer-'));
  t.after(() => fs.rm(directory, {recursive: true, force: true}));
  const outputFile = path.join(directory, 'catalog.json'), saved = '{"saved":true}';
  await fs.writeFile(outputFile, saved);
  for (const status of [408, 429, 500, 502, 503, 504]) {
    let calls = 0;
    const result = await syncPublicEventCatalog({outputFile, log: () => {}, fetchImpl: async () => {calls++; return new Response('', {status});}});
    assert.deepEqual(result, {deferred: true, status}); assert.equal(calls, 1);
    assert.equal(await fs.readFile(outputFile, 'utf8'), saved);
  }
  const failedNetwork = await syncPublicEventCatalog({outputFile, log: () => {}, fetchImpl: async () => {throw TypeError('fetch failed');}});
  assert.equal(failedNetwork.deferred, true);
  assert.equal(await fs.readFile(outputFile, 'utf8'), saved);
  const empty = await syncPublicEventCatalog({outputFile, log: () => {}, fetchImpl: async () => Response.json({periods: [], archives: []})});
  assert.equal(empty.deferred, true);
  assert.equal(await fs.readFile(outputFile, 'utf8'), saved);
  await assert.rejects(syncPublicEventCatalog({outputFile, fetchImpl: async () => Response.json({periods: 'bad'})}), /Invalid public event catalog/);
  assert.equal(await fs.readFile(outputFile, 'utf8'), saved);
});

test('catalog replacement writes complete valid data and leaves no temporary files', async t => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'polytrack-catalog-replace-'));
  t.after(() => fs.rm(directory, {recursive: true, force: true}));
  const outputFile = path.join(directory, 'catalog.json');
  await fs.writeFile(outputFile, JSON.stringify({periods:[],archives:[]}));
  const backup = {periods: [{id: 'daily_test', trackId: 'a'.repeat(64), startsAt: 1, endsAt: 2}], archives: []};
  assert.equal((await syncPublicEventCatalog({outputFile, log: () => {}, fetchImpl: async () => Response.json(backup)})).deferred, false);
  assert.deepEqual(JSON.parse(await fs.readFile(outputFile, 'utf8')), backup);
  assert.deepEqual(await fs.readdir(directory), ['catalog.json']);
});


test('successful sync preserves existing archives before replacement with exactly one existing Worker fetch',async t=>{
 const directory=await fs.mkdtemp(path.join(os.tmpdir(),'polytrack-catalog-history-'));
 t.after(()=>fs.rm(directory,{recursive:true,force:true}));
 const outputFile=path.join(directory,'catalog.json');
 const period={id:'old-frozen',kind:'daily',trackId:'a'.repeat(64),startsAt:1,endsAt:2};
 await fs.writeFile(outputFile,JSON.stringify({periods:[],archives:[period]}));
 const incoming={periods:[{...period,id:'new-live',startsAt:3,endsAt:4}],archives:[]};
 let calls=0;
 assert.deepEqual(await syncPublicEventCatalog({outputFile,log:()=>{},fetchImpl:async()=>{calls++;return Response.json(incoming);}}),{deferred:false});
 const saved=JSON.parse(await fs.readFile(outputFile,'utf8'));
 assert.equal(calls,1);assert.deepEqual(saved.periods,incoming.periods);
 assert.deepEqual(saved.archives,[{...period,archived:true}]);
 assert.deepEqual(await fs.readdir(directory),['catalog.json']);
});

test('malformed existing catalog is never silently overwritten by successful sync',async t=>{
 const directory=await fs.mkdtemp(path.join(os.tmpdir(),'polytrack-catalog-invalid-history-'));
 t.after(()=>fs.rm(directory,{recursive:true,force:true}));
 const outputFile=path.join(directory,'catalog.json');
 for(const saved of ['broken-json',JSON.stringify({periods:[],archives:'bad'})]){
  await fs.writeFile(outputFile,saved);
  await assert.rejects(syncPublicEventCatalog({outputFile,log:()=>{},fetchImpl:async()=>Response.json({periods:[{id:'live',kind:'daily',trackId:'a'.repeat(64),startsAt:1,endsAt:2}],archives:[]})}));
  assert.equal(await fs.readFile(outputFile,'utf8'),saved);
  assert.deepEqual(await fs.readdir(directory),['catalog.json']);
 }
});
