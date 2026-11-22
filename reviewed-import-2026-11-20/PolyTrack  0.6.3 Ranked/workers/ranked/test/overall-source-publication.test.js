import test from 'node:test';
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {prepareSourcePublication,decodeSourcePublication,sourcePublicationIds,SOURCE_PUBLICATION_PART_BYTES} from '../src/overall-source-publication.js';
const marker={digest:'a'.repeat(64)};
const docs=p=>new Map(p.documents.map(d=>[d.id,{data:d.data}]));

test('source companion roundtrip spans bounded parts and never puts a document over 800k',async()=>{
  const body=randomBytes(1100000).toString('hex');
  const p=await prepareSourcePublication(body,marker);
  assert.ok(p.documents.length>1);
  assert.equal(await decodeSourcePublication(p.marker,docs(p)),body);
  for(const d of p.documents){assert.ok(d.data.bundle.length<=SOURCE_PUBLICATION_PART_BYTES);assert.ok(JSON.stringify(d.data).length<800000);}
});

test('missing, mixed, wrong-order, truncated, and decompression-bomb publications fail closed',async()=>{
  const p=await prepareSourcePublication('x'.repeat(10000),marker);
  const cases=[new Map(),new Map([['main_0',{data:{...p.documents[0].data,digest:'b'.repeat(64)}}]]),
    new Map([['main_0',{data:{...p.documents[0].data,part:1}}]]),
    new Map([['main_0',{data:{...p.documents[0].data,bundle:'bad'}}]])];
  for(const d of cases)await assert.rejects(decodeSourcePublication(p.marker,d),/PUBLICATION_INVALID/);
  await assert.rejects(decodeSourcePublication({...p.marker,publication:{...p.marker.publication,rawBytes:1}},docs(p)),/INFLATE_LIMIT/);
  for(const publication of [{...p.marker.publication,parts:33},{...p.marker.publication,rawBytes:17000000},{...p.marker.publication,encodedBytes:1}])
    await assert.rejects(decodeSourcePublication({...p.marker,publication},docs(p)),/PUBLICATION_INVALID/);
  assert.deepEqual(sourcePublicationIds({publication:{parts:33}}),[]);
  assert.equal(await prepareSourcePublication('x'.repeat(17000000),marker),null);
});


test('source publication exceeding four compressed parts stays optional',async()=>{
  assert.equal(await prepareSourcePublication(randomBytes(3000000).toString('base64'),marker),null);
});
