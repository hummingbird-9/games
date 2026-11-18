import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import zlib from 'node:zlib';
import {encodeSnapshot} from '../snapshot-package.mjs';
import {comparisonCodeFingerprint,runSnapshotPairLedger} from './snapshot-pair-ledger.mjs';

const TRACK='a'.repeat(64), ACCOUNTS=['b','c','d'].map(char=>char.repeat(64));
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');

function replay(ticks=Array.from({length:24},(_,i)=>(i+1)*100)) {
 const parts=[];
 for(const name of ['up','right','down','left','reset']) {
  const values=name==='right'?ticks:[], count=Buffer.alloc(3);count.writeUIntLE(values.length,0,3);parts.push(count);
  let previous=0;
  for(const tick of values){const delta=Buffer.alloc(3);delta.writeUIntLE(tick-previous,0,3);parts.push(delta);previous=tick;}
 }
 return zlib.deflateSync(Buffer.concat(parts)).toString('base64url');
}

const BASE=replay(), VARIANT=replay(Array.from({length:24},(_,i)=>i===23?2401:(i+1)*100));
function job(index, value=BASE, changes={}) {
 return {kind:'normal',source:`recordings/${100+index}.json`,recordId:`normal-${index}`,
  trackId:TRACK,accountId:ACCOUNTS[index],timeMs:5000,replayHash:hash(value),replay:value,...changes};
}

async function fixture() {
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'pair-ledger-test-'));
 const root=path.join(temp,'repo'),privateDir=path.join(temp,'private');
 await fs.mkdir(root);await fs.mkdir(privateDir);
 return {temp,root,ledger:path.join(privateDir,'ledger.json'),report:path.join(privateDir,'summary.json')};
}
const cleanup=item=>fs.rm(item.temp,{recursive:true,force:true});
const input=(jobs,generation)=>async()=>({jobs,manifest:{generation},coverage:{complete:true},issues:[]});

test('reuses completed cliques across generations while retaining removed-run findings',async()=>{
 const item=await fixture(),fingerprint='f'.repeat(64),a=job(0),b=job(1),c=job(2,VARIANT);
 try {
  const run=(jobs,generation,extra={})=>runSnapshotPairLedger({ledger:item.ledger,report:item.report,root:item.root,
   fingerprint,loadInputs:input(jobs,generation),...extra});
  const first=await run([a,b],'public-snapshots1');
  assert.equal(first.totalPairs,1);assert.equal(first.comparedPairs,1);assert.equal(first.currentFindings,1);
  const second=await run([a,b,c],'public-snapshots2');
  assert.equal(second.totalPairs,3);assert.equal(second.reusedPairs,1);assert.equal(second.comparedPairs,2);
  assert.equal(second.explicitCompletedPairs,0);
  const third=await run([b,c],'public-snapshots3');
  assert.equal(third.reusedPairs,1);assert.equal(third.comparedPairs,0);
  assert.equal(third.historicalFindings,3);assert.equal(third.currentFindings,1);
  const changed=await run([b,{...c,timeMs:5001}],'public-snapshots4');
  assert.equal(changed.comparedPairs,1);assert.equal(changed.historicalFindings>=third.historicalFindings,true);
  const changedCode=await run([b,c],'public-snapshots5',{fingerprint:'e'.repeat(64)});
  assert.equal(changedCode.comparedPairs,1);assert.equal(changedCode.reusedPairs,0);
  assert.equal(changedCode.historicalFindings>third.historicalFindings,true);
  const state=JSON.parse(await fs.readFile(item.ledger,'utf8'));
  assert.ok(state.cliques.some(row=>row.fingerprint===fingerprint));
  assert.ok(state.cliques.some(row=>row.fingerprint==='e'.repeat(64)));
  assert.doesNotMatch(JSON.stringify(state),/"replay":"/);
  assert.equal(JSON.parse(await fs.readFile(item.report,'utf8')).noVerdictOrPublication,true);
 } finally {await cleanup(item);}
});

test('partial run checkpoints explicit pairs and resumes without repeating comparisons',async()=>{
 const item=await fixture(),jobs=[job(0),job(1),job(2,VARIANT)],fingerprint='d'.repeat(64);
 try {
  const opts={ledger:item.ledger,report:item.report,root:item.root,fingerprint,loadInputs:input(jobs,'public-snapshots1')};
  const partial=await runSnapshotPairLedger({...opts,maxPairs:1});
  assert.equal(partial.complete,false);assert.equal(partial.comparedPairs,1);
  assert.equal(partial.remainingPairs,2);assert.equal(partial.explicitCompletedPairs,1);
  const resumed=await runSnapshotPairLedger(opts);
  assert.equal(resumed.complete,true);assert.equal(resumed.reusedPairs,1);
  assert.equal(resumed.comparedPairs,2);assert.equal(resumed.remainingPairs,0);
  assert.equal(resumed.explicitCompletedPairs,0);
  assert.equal((await fs.readFile(item.ledger+'.findings.jsonl','utf8')).trim().split('\n').length,3);
 } finally {await cleanup(item);}
});

test('run identity changes invalidate only affected pairs and private paths are required',async()=>{
 const item=await fixture(),a=job(0),b=job(1),fingerprint='c'.repeat(64);
 try {
  const base={ledger:item.ledger,report:item.report,root:item.root,fingerprint};
  await assert.rejects(runSnapshotPairLedger({...base,report:path.join(item.root,'summary.json'),loadInputs:input([a,b],'public-snapshots1')}),/outside the Git repository/);
  await runSnapshotPairLedger({...base,loadInputs:input([a,b],'public-snapshots1')});
  for(const changed of [{...b,replay:VARIANT,replayHash:hash(VARIANT)},{...b,accountId:ACCOUNTS[2]},{...b,timeMs:5001}]) {
   const summary=await runSnapshotPairLedger({...base,loadInputs:input([a,changed],'public-snapshots2')});
   assert.equal(summary.comparedPairs,1);assert.equal(summary.reusedPairs,0);
  }
  assert.match(await comparisonCodeFingerprint(),/^[a-f0-9]{64}$/);
 } finally {await cleanup(item);}
});

test('undecodable replay pairs remain uncompleted and are counted as skipped',async()=>{
 const item=await fixture();
 try {
  const invalid=job(2,'!invalid');
  const summary=await runSnapshotPairLedger({ledger:item.ledger,report:item.report,root:item.root,
   fingerprint:'b'.repeat(64),loadInputs:input([job(0),job(1),invalid],'public-snapshots1')});
  assert.equal(summary.pairsComplete,true);assert.equal(summary.complete,false);
  assert.equal(summary.sourcePairs,3);assert.equal(summary.totalPairs,1);
  assert.equal(summary.skippedInputInvalid,2);assert.equal(summary.inputDecodeUnavailable,1);
 } finally {await cleanup(item);}
});

test('active writer lock is refused and a dead-process lock can resume',async()=>{
 const item=await fixture();
 try {
  const opts={ledger:item.ledger,report:item.report,root:item.root,fingerprint:'b'.repeat(64),loadInputs:input([job(0),job(1)],'public-snapshots1')};
  await fs.writeFile(item.ledger+'.lock',JSON.stringify({pid:process.pid,nonce:'active'}));
  await assert.rejects(runSnapshotPairLedger(opts),/already running/);
  const deadPid=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['-e',''],{windowsHide:true});child.once('error',reject);child.once('close',()=>resolve(child.pid));});
  await fs.writeFile(item.ledger+'.lock',JSON.stringify({pid:deadPid,nonce:'stale'}));
  assert.equal((await runSnapshotPairLedger(opts)).complete,true);
  await assert.rejects(fs.access(item.ledger+'.lock'),{code:'ENOENT'});
 } finally {await cleanup(item);}
});

test('orphaned findings are never overwritten by a fresh ledger',async()=>{
 const item=await fixture();
 try {
  const file=item.ledger+'.findings.jsonl';
  await fs.writeFile(file,'private prior evidence\n');
  await assert.rejects(runSnapshotPairLedger({ledger:item.ledger,report:item.report,root:item.root,
   fingerprint:'b'.repeat(64),loadInputs:input([job(0),job(1)],'public-snapshots1')}),/Findings exist without a matching pair ledger/);
  assert.equal(await fs.readFile(file,'utf8'),'private prior evidence\n');
 } finally {await cleanup(item);}
});

test('default loader compares a real indexed snapshot without a network or native verifier',async()=>{
 const item=await fixture();
 try {
  const generation=path.join(item.root,'public-snapshots1'),files={};await fs.mkdir(generation);
  const values=new Map(),board=[];
  for(let i=0;i<2;i++) {
   const row={accountId:ACCOUNTS[i],trackId:TRACK,uploadId:100+i,timeMs:5000,frames:5000,replayHash:hash(BASE)};
   values.set(`canonical/${TRACK}/${ACCOUNTS[i]}.json`,row);
   values.set(`recordings/${100+i}.json`,{accountId:ACCOUNTS[i],trackId:TRACK,frames:5000,replayHash:hash(BASE),recording:BASE});
   board.push({...row,id:100+i,userId:ACCOUNTS[i]});
  }
  values.set(`tracks/${TRACK}.json`,{trackId:TRACK,entries:board});
  for(const [logical,value] of values) {
   const encoded=Buffer.from(await encodeSnapshot(value)),sha256=hash(encoded);
   await fs.writeFile(path.join(generation,`${sha256}.bin`),encoded);
   files[logical]={path:`${sha256}.bin`,sha256,decodedBytes:Buffer.byteLength(JSON.stringify(value))};
  }
  await fs.writeFile(path.join(generation,'index.json'),JSON.stringify({schemaVersion:1,generation:1,encoding:'gzip-xor-a7-v1',files}));
  await fs.writeFile(path.join(item.root,'snapshot-current.json'),JSON.stringify({currentdir:'public-snapshots1'}));
  const summary=await runSnapshotPairLedger({ledger:item.ledger,report:item.report,root:item.root});
  assert.equal(summary.complete,true);assert.equal(summary.totalPairs,1);
  assert.equal(summary.comparedPairs,1);assert.equal(summary.currentFindings,1);
  assert.equal(summary.sourceCoverage.complete,true);
 } finally {await cleanup(item);}
});
