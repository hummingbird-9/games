import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mergeKodubHistory} from './kodub-history.mjs';
const selection=(letter,name)=>({trackId:letter.repeat(64),name,thumbnailUrl:'assets/'+letter.repeat(64)+'.webp'});
test('weekly capture retains prior artwork, deduplicates and rejects unsafe paths',()=>{
  const old=selection('a','Old'),current=selection('b','Current');
  assert.deepEqual(mergeKodubHistory([old],old,current),[old,current]);
  assert.deepEqual(mergeKodubHistory([], {...current,thumbnailUrl:'../bad.webp'}),[]);
  assert.deepEqual(mergeKodubHistory([old],{...old,name:'Renamed',thumbnailUrl:null}),[{...old,name:'Renamed'}]);
  assert.deepEqual(mergeKodubHistory([],{...current,thumbnailUrl:null}),[{...current,thumbnailUrl:null}]);
});
test('restored historical Kodub thumbnails point to existing checked-in assets',()=>{
  const history=JSON.parse(fs.readFileSync(new URL('./kodub/history.json',import.meta.url),'utf8'));
  assert.equal(mergeKodubHistory(history).length,history.length);
  for(const item of history)if(item.thumbnailUrl!==null)assert.ok(fs.statSync(new URL('./kodub/'+item.thumbnailUrl,import.meta.url)).size>0);
  assert.match(history.find(item=>item.name==='Spite')?.thumbnailUrl||'',/^assets\/[a-f0-9]{64}\.webp$/);
});
test('saved public Kodub periods have a local identity even before artwork capture',()=>{
  const history=JSON.parse(fs.readFileSync(new URL('./kodub/history.json',import.meta.url),'utf8'));
  const catalog=JSON.parse(fs.readFileSync(new URL('./public-catalog.json',import.meta.url),'utf8'));
  const known=new Set(history.map(item=>item.trackId));
  for(const period of [...catalog.periods,...catalog.archives].filter(item=>item.kind==='kodub'))assert.ok(known.has(period.trackId),period.id+' lacks Kodub identity');
});
