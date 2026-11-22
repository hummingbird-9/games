import test from 'node:test';import assert from 'node:assert/strict';import {collectLocalDiagnostics} from './local-diagnostics.mjs';
const id='a'.repeat(64),track='b'.repeat(64),other='c'.repeat(64);
function storage(values){return Object.assign({...values},{getItem(key){return values[key]??null;}});}
test('native profiles and PBs are exported by public hash without profile tokens or recordings',async()=>{
 const values={'polytrack_v5_prod_user_0':JSON.stringify({token:'d'.repeat(64),nickname:'Driver',carStyle:'style'}),['polytrack_v5_prod_record_0_default_'+track]:JSON.stringify({tokenHash:id,frames:12345,recording:'SECRET-REPLAY'}),['polytrack_v5_prod_record_0_default_'+other]:JSON.stringify({tokenHash:'mismatch',frames:1}),firebaseAuth:'SECRET-AUTH',unrelated:'SECRET-OTHER'};
 const data=await collectLocalDiagnostics({storage:storage(values),hashToken:async()=>id,trackInfo:()=>({name:'Summer 1',type:'official'}),practiceRows:()=>[{trackId:track,attempts:2}]});
 assert.equal(data.profiles[0].publicId,id);assert.equal(data.profiles[0].name,'Driver');assert.equal(data.profiles[0].personalBests.length,1);assert.equal(data.profiles[0].personalBests[0].timeMs,12345);assert.equal(data.practice[0].publicId,id);assert.doesNotMatch(JSON.stringify(data),/SECRET|dddddddd/);
});
test('per-profile best times stay separate, native undeterministic results retain mode',async()=>{
 const values={'polytrack_v5_prod_user_1':JSON.stringify({token:'d'.repeat(64),nickname:'Second'}),['polytrack_v5_prod_record_1_undeterministic_'+track]:JSON.stringify({tokenHash:id,frames:111})};
 const data=await collectLocalDiagnostics({storage:storage(values),hashToken:async()=>id,localRows:[{accountId:id,trackId:track,timeMs:222},{accountId:other,trackId:track,timeMs:333}]});
 assert.equal(data.profiles.length,2);assert.equal(data.profiles.find(p=>p.publicId===id).personalBests.length,2);assert.equal(data.profiles.find(p=>p.publicId===other).personalBests[0].timeMs,333);assert.equal(data.profiles[0].personalBests.find(p=>p.mode==='undeterministic').timeMs,111);
});
test('saved custom-track codes stay available only to the later export consent gate',async()=>{
 const key='polytrack_v5_prod_track_private';
 const values={[key]:JSON.stringify({data:'PRIVATE-TRACK-CODE',saveTime:123})};
 const data=await collectLocalDiagnostics({storage:storage(values)});
 assert.equal(data.collection.savedTrackCount,1);
 assert.equal(data.collection.savedTrackBytes,18);
 assert.deepEqual(data.savedTracks,[{name:'private',data:'PRIVATE-TRACK-CODE',savedAt:123,bytes:18}]);
});
