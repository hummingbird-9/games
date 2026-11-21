import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {normalizeOpponentPreset,selectOpponentRows,opponentShortcutMatches,loadOpponentPreset,saveOpponentPreset,opponentRunAt,openOpponentPresetDialog} from './opponent-presets.mjs';
const rows=Array.from({length:21},(_,i)=>({accountId:'racer-'+i,timeMs:1000+i*100,uploadId:1700000000000000+i,pbAt:1700000000000+i*1000,name:'Racer '+i}));
const choose=(preset,options={})=>selectOpponentRows(rows,preset,{selfId:'racer-10',complete:true,totalEntries:21,...options});
const ids=value=>value.rows.map(row=>row.accountId);
test('chosen accounts use exact identities, preserve order and work without complete rank coverage',()=>{
 assert.deepEqual(ids(choose({mode:'accounts',accounts:['racer-19','racer-2']},{complete:false})),['racer-19','racer-2']);
 const result=choose({mode:'accounts',accounts:['missing','racer-1']});assert.equal(result.missing,1);assert.deepEqual(ids(result),['racer-1']);
});
test('saved filters supply independent matching accounts while visible filters can be off',()=>{
 assert.deepEqual(ids(choose({mode:'filters'},{filteredIds:['racer-19','racer-3']})),['racer-3','racer-19']);
 assert.equal(choose({mode:'filters'}).rows.length,0);
});
test('exact places and nearby places use the full field, not the visible page',()=>{
 assert.deepEqual(ids(choose({mode:'places',places:[3,20]})),['racer-2','racer-19']);
 assert.deepEqual(ids(choose({mode:'relative',relative:[-2,-1,1,2]})),['racer-8','racer-9','racer-11','racer-12']);
});
test('place and percentile rules refuse partial standings or missing self',()=>{
 for(const mode of ['places','relative','percentile'])assert.equal(choose({mode},{complete:false}).complete,false);
 assert.match(choose({mode:'relative'},{selfId:'absent'}).reason,/saved finish/);
 assert.equal(choose({mode:'places',places:[1]},{totalEntries:30}).rows.length,0);
});
test('native row-indexed ties retain distinct places and percentiles span first to last',()=>{
 const tied=rows.map(row=>({...row}));tied[3].timeMs=tied[2].timeMs;
 assert.deepEqual(ids(selectOpponentRows(tied,{mode:'places',places:[3]},{complete:true,totalEntries:21})),['racer-2']);
 assert.deepEqual(ids(selectOpponentRows(tied,{mode:'places',places:[4]},{complete:true,totalEntries:21})),['racer-3']);
 assert.deepEqual(ids(choose({mode:'percentile',percentileMin:0,percentileMax:10})),['racer-0','racer-1','racer-2']);
 assert.deepEqual(ids(choose({mode:'percentile',percentileMin:100,percentileMax:100})),['racer-20']);
});
test('recent PBs sort exact run dates and filter a half-open local date interval',()=>{
 assert.deepEqual(ids(choose({mode:'recent',limit:3})),['racer-20','racer-19','racer-18']);
 assert.deepEqual(ids(choose({mode:'recent',after:rows[3].pbAt,before:rows[5].pbAt})),['racer-4','racer-3']);
 assert.equal(opponentRunAt({uploadId:1700000000000000}),1700000000000);assert.equal(opponentRunAt({id:'random'}),0);
});
test('selection bounds, self handling and absent replays never invent playable rows',()=>{
 assert.equal(choose({mode:'recent',limit:999}).rows.length,10);
 assert.deepEqual(ids(choose({mode:'accounts',accounts:['racer-10']})),[]);
 assert.deepEqual(ids(choose({mode:'accounts',accounts:['racer-10'],includeSelf:true})),['racer-10']);
 const input=[{accountId:'a',timeMs:1000,pbAt:1,uploadId:0}];assert.match(selectOpponentRows(input,{mode:'recent'}).reason,/no saved replay/);
});
test('stored preferences are bounded and key matching protects existing navigation',()=>{
 const store=new Map(),storage={getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)};
 const saved=saveOpponentPreset(storage,{key:'Shift+KeyB',mode:'recent',accounts:['a','a'],limit:11});assert.equal(saved.limit,10);assert.deepEqual(loadOpponentPreset(storage),saved);
 assert.equal(normalizeOpponentPreset({key:'KeyT'}).key,'KeyG');
 assert.equal(opponentShortcutMatches({code:'KeyB',shiftKey:true},saved),true);
 for(const option of ['repeat','ctrlKey','altKey','metaKey'])assert.equal(opponentShortcutMatches({code:'KeyB',shiftKey:true,[option]:true},saved),false);
});

function nativeFixture(){
 const source=fs.readFileSync(new URL('../main.bundle.js',import.meta.url),'utf8');
 const start=source.indexOf('(0,R.gn)(this,Fo,"f").__pt062OpponentSelection=');
 const end=source.indexOf(',(0,R.gn)(this,Fo,"f").__pt062EventRows=',start);
 assert.ok(start>0&&end>start);
 const instance={},Fo=new WeakMap(),Po=new WeakMap(),Uo=new WeakMap(),Do=new WeakMap(),el=new WeakMap(),selected=new Map([[1,true],[2,false]]),notifications=[];
 const root={isConnected:true,classList:{contains:()=>false},querySelectorAll:()=>[1,2].map(id=>({dataset:{sqRecordingId:String(id)},classList:{toggle:(_,value)=>selected.set(id,value)}}))};
 Fo.set(instance,root);Po.set(instance,'track');Uo.set(instance,{getCurrentUserProfile:()=>({tokenHash:'racer'})});Do.set(instance,rows=>notifications.push(rows));el.set(instance,[{recordingId:1,nickname:'Old',isSelf:false}]);
 const context=vm.createContext({Fo,Po,Uo,Do,el,instance,R:{gn:(o,key)=>key.get(o),GG:(o,key,value)=>key.set(o,value)}});
 vm.runInContext(`(function(){${source.slice(start,end)};}).call(instance)`,context);
 return {api:root.__pt062OpponentSelection,root,selected,notifications};
}
test('actual native bridge selects off-page ghosts and clears the prior group without paging or filters',()=>{
 const h=nativeFixture();assert.equal(h.api.set([{recordingId:2,nickname:'Two',isSelf:false},{recordingId:90,nickname:'Off page',isSelf:false}],{trackId:'track',accountId:'racer'}),2);
 assert.deepEqual(Array.from(h.api.get(),r=>r.recordingId),[2,90]);assert.equal(h.selected.get(1),false);assert.equal(h.selected.get(2),true);assert.equal(h.notifications.length,1);
 h.api.get()[0].nickname='mutated';assert.equal(h.api.get()[0].nickname,'Two');
});
test('native bridge rejects stale ownership, event boards, invalid rows and over-cap groups atomically',()=>{
 const h=nativeFixture(),valid={recordingId:2,nickname:'Two',isSelf:false},context={trackId:'track',accountId:'racer'};
 for(const wrong of [{...context,trackId:'other'},{...context,accountId:'other'}])assert.throws(()=>h.api.set([valid],wrong),/context/);
 for(const group of [[{...valid,recordingId:0}],[valid,valid],Array(11).fill(valid),[{...valid,isSelf:1}],[{...valid,recordingId:Number.MAX_SAFE_INTEGER+1}]])assert.throws(()=>h.api.set(group,context),/selection|context/);
 assert.equal(h.notifications.length,0);assert.deepEqual(Array.from(h.api.get(),r=>r.recordingId),[1]);
 h.root.classList.contains=()=>true;assert.throws(()=>h.api.set([valid],context),/context/);h.root.classList.contains=()=>false;h.root.isConnected=false;assert.throws(()=>h.api.set([valid],context),/context/);
});


test('equal-time reverse lexical IDs keep the actual supplied native row order',()=>{
 const input=['z','m','a'].map((accountId,index)=>({accountId,timeMs:1000,uploadId:index+1}));
 const options={selfId:'m',complete:true,totalEntries:3};
 const exact=selectOpponentRows(input,{mode:'places',places:[2],includeSelf:true},options);
 assert.deepEqual(ids(exact),['m']);assert.equal(exact.rows[0].selectionRank,2);
 assert.deepEqual(ids(selectOpponentRows(input,{mode:'relative',relative:[-1]},options)),['z']);
 assert.deepEqual(ids(selectOpponentRows(input,{mode:'relative',relative:[1]},options)),['a']);
 assert.deepEqual(ids(selectOpponentRows(input,{mode:'percentile',percentileMin:100,percentileMax:100},options)),['a']);
 assert.deepEqual(input.map(row=>row.accountId),['z','m','a']);
});

test('place-based selection matches the actual patch native display adapter on ties',()=>{
 const source=fs.readFileSync(new URL('../polytrack_062_patch.js',import.meta.url),'utf8');
 const start=source.indexOf('  function visibleTrackEntries('),end=source.indexOf('  function computeTrackTopEntries(',start);
 assert.ok(start>=0&&end>start);
 const context=vm.createContext({canonicalRaceTimeMs:row=>row.timeMs});
 vm.runInContext(source.slice(start,end)+';globalThis.display=visibleTrackEntries;',context);
 const input=['z','m','a'].map((accountId,index)=>({accountId,timeMs:1000,uploadId:index+1}));
 const displayed=context.display(input,false,'m'),options={selfId:'m',complete:true,totalEntries:3};
 const exact=selectOpponentRows(displayed,{mode:'places',places:[2],includeSelf:true},options);
 assert.equal(exact.rows[0].accountId,displayed[1].accountId);
 assert.equal(exact.rows[0].selectionRank,displayed[1].rank);
 assert.equal(selectOpponentRows(displayed,{mode:'relative',relative:[-1]},options).rows[0].accountId,displayed[0].accountId);
});

function presetDialogFixture(initial={}){
 const values=new Map(),fields=new Map(),saved=[];
 const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
 saveOpponentPreset(storage,initial);
 const node=()=>({value:'',checked:false,disabled:false,dataset:{},children:[],listeners:{},isConnected:true,
  setAttribute(){},append(...nodes){this.children.push(...nodes);},replaceChildren(...nodes){this.children=[...nodes];},
  addEventListener(type,callback){this.listeners[type]=callback;},focus(){},remove(){this.isConnected=false;}});
 const sectionModes=['accounts','filters','places','relative','recent','percentile'];
 const sections=sectionModes.map(mode=>({...node(),dataset:{for:mode}}));
 const dialog={...node(),querySelector(selector){if(!fields.has(selector))fields.set(selector,node());return fields.get(selector);},querySelectorAll:()=>sections,showModal(){},close(){this.listeners.close?.();}};
 const document={activeElement:null,getElementById:id=>id==='sqOpponentStyle'?{}:null,head:{append(){}},body:{append(){}},createElement:tag=>tag==='dialog'?dialog:node()};
 openOpponentPresetDialog({document,storage,onSave:value=>saved.push(value)});
 const set=(key,value)=>{fields.get('[data-'+key+']').value=value;};
 const save=()=>fields.get('[data-save]').onclick();
 return {set,save,fields,saved,storage};
}

test('switching mode ignores invalid hidden drafts and preserves inactive saved configuration',()=>{
 const initial={mode:'places',accounts:['friend'],places:[2,4],relative:[-3,2],percentileMin:20,percentileMax:60,after:1700000000000,before:1700100000000};
 const f=presetDialogFixture(initial);
 f.set('places','invalid');f.set('relative','invalid');f.set('min','invalid');f.set('max','invalid');
 f.set('mode','recent');f.set('after','');f.set('before','');f.save();
 assert.equal(f.saved.length,1);assert.equal(f.saved[0].mode,'recent');
 assert.deepEqual(f.saved[0].places,[2,4]);assert.deepEqual(f.saved[0].relative,[-3,2]);
 assert.deepEqual(f.saved[0].accounts,['friend']);assert.equal(f.saved[0].percentileMin,20);assert.equal(f.saved[0].percentileMax,60);
 assert.equal(f.saved[0].after,0);assert.equal(f.saved[0].before,0);
 f.set('mode','filters');f.set('after','invalid');f.save();assert.equal(f.saved.length,2);
 assert.equal(f.saved[1].after,0,'the latest successfully saved value survives switching again');
});

test('active mode validation still rejects invalid configuration without saving',()=>{
 for(const [mode,key,value] of [['places','places','invalid'],['relative','relative','invalid'],['percentile','min','invalid'],['recent','after','2026-10-22']]){
  const f=presetDialogFixture({mode,places:[1],relative:[-1]});
  f.set(key,value);if(mode==='recent')f.set('before','2026-10-20');
  f.save();assert.equal(f.saved.length,0,mode);assert.equal(f.fields.get('[data-status]').dataset.error,'true');
 }
 const valid=presetDialogFixture({mode:'places',relative:[-2,2]});
 valid.set('relative','invalid');valid.set('places','3, 5');valid.save();
 assert.deepEqual(valid.saved[0].places,[3,5]);assert.deepEqual(valid.saved[0].relative,[-2,2]);
});
