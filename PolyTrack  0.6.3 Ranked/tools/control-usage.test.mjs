import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeControlUsage,installControlUsage,controlUsageName,controlUsageMenu} from './control-usage.mjs';
import {createLocalInsights} from './local-insights.mjs';
import {buildDeveloperReport} from './developer-diagnostics.mjs';
test('control counters survive reload and export only bounded menus and counts',()=>{
 const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
 const a=createLocalInsights({storage,now:()=>1700000000000,revision:175});a.control('track','toggle-ghost');a.control('track','toggle-ghost');a.control('settings','setting-ui-text-size');a.control('unknown','secret');a.flush(true);
 const b=createLocalInsights({storage,now:()=>1700000000000,revision:175});assert.deepEqual(b.report().controls,{track:{'toggle-ghost':2},settings:{'setting-ui-text-size':1}});
 assert.deepEqual(buildDeveloperReport({insights:b.report()}).insights.controls,b.report().controls);
 assert.deepEqual(normalizeControlUsage({track:{'secret_token':1,'toggle-ghost':Infinity,'play':2},private:{email:1}}),{track:{play:2}});
 for(let i=0;i<100;i++)b.control('track','control-'+i);assert.ok(Object.keys(b.report().controls.track).length<=64);
});
test('trusted activations and handled shortcut keys count once without typed text or generated clicks',async()=>{
 const handlers={},recorded=[],doc={addEventListener:(name,fn)=>handlers[name]=fn,removeEventListener:(name,fn)=>{assert.equal(handlers[name],fn);delete handlers[name];}};
 const stop=installControlUsage({document:doc,record:(...args)=>recorded.push(args),menuOf:()=> 'track'});
 const button={id:'overallFindMeBtn',closest:()=>button};handlers.click({isTrusted:true,target:button});handlers.click({isTrusted:false,target:button});
 handlers.keydown({code:'KeyG',defaultPrevented:true,target:{closest:()=>null}});
 handlers.keydown({code:'KeyG',defaultPrevented:true,repeat:true,target:{closest:()=>null}});
 handlers.keydown({code:'KeyG',defaultPrevented:true,target:{closest:()=>({})}});
 await Promise.resolve();assert.deepEqual(recorded,[['track','find-me'],['track','key-keyg']]);stop();assert.deepEqual(handlers,{});
});
test('password input values and arbitrary labels never become diagnostic identifiers',()=>{
 const input={type:'password',tagName:'INPUT',matches:selector=>selector.includes('autocomplete'),closest:()=>null};assert.equal(controlUsageName(input),'');
 const node={tagName:'BUTTON',textContent:'someone@example.com or a private room code',closest:()=>null,matches:()=>false,getAttribute:()=>null,querySelector:()=>null};assert.equal(controlUsageName(node),'activate-button');
});


function menuDom() {
 const nodes=[],listeners={};
 const document={defaultView:{getComputedStyle:node=>({visibility:node.visibility||'visible'})},
  querySelector:selector=>nodes.find(node=>node.matches(selector))||null,
  addEventListener:(type,callback)=>{listeners[type]=callback;},removeEventListener:type=>{delete listeners[type];}};
 function add(className,{parent=null,tagName='DIV',hidden=false,visibility='visible',rects=true,text=''}={}) {
  const node={className,parent,tagName,hidden,visibility,rects,textContent:text,ownerDocument:document,id:'',type:'',
   matches(selector){return selector.split(',').some(part=>{const s=part.trim();return s.startsWith('.')?!s.includes(' ')&&this.className.split(' ').includes(s.slice(1)):s.startsWith('#')?this.id===s.slice(1):this.tagName===s.toUpperCase();});},
   closest(selector){for(let item=this;item;item=item.parent)if(item.matches(selector))return item;return null;},
   getClientRects(){for(let item=this;item;item=item.parent)if(item.hidden||!item.rects)return [];return [{}];},
   getAttribute(){return null;},querySelector(){return null;}};
  nodes.push(node);return node;
 }
 return {document,add,listeners};
}

test('native pause and multiplayer controls resolve their actual menu rather than home or driving',()=>{
 for(const [className,menu] of [['pause-screen-ui','pause'],['multiplayer-ui','multiplayer']]){
  const dom=menuDom();dom.add('game-ui');dom.add('menu-ui',{hidden:true});
  const root=dom.add(className),button=dom.add('',{parent:root,tagName:'BUTTON',text:'Back'});
  assert.equal(controlUsageMenu(button,dom.document),menu);
  assert.equal(controlUsageMenu(dom.document,dom.document),menu,'body/document keyboard events use the visible native menu');
  root.hidden=true;
  assert.equal(controlUsageMenu(dom.document,dom.document),'driving','closing the overlay restores gameplay classification');
 }
});

test('verified native garage, editor and settings roots resolve controls and keyboard fallback',()=>{
 for(const [className,menu] of [['customization-ui','garage'],['editor-ui','editor'],['settings-menu-ui','settings']]){
  const dom=menuDom(),root=dom.add(className),control=dom.add('',{parent:root,tagName:'SELECT'});
  assert.equal(controlUsageMenu(control,dom.document),menu);
  assert.equal(controlUsageMenu(dom.document,dom.document),menu);
 }
});

test('hidden, unrendered and visibility-hidden menus do not steal gameplay or home counts',()=>{
 const dom=menuDom();dom.add('sq-extra-overlay',{hidden:true});dom.add('settings-menu-ui',{visibility:'hidden'});dom.add('pause-screen-ui',{rects:false});
 dom.add('game-ui');const main=dom.add('menu-ui',{hidden:true});
 assert.equal(controlUsageMenu(dom.document,dom.document),'driving');
 main.hidden=false;
 assert.equal(controlUsageMenu(dom.document,dom.document),'home');
});

test('practice controls inside a profile resolve to the practice section',()=>{
 const dom=menuDom(),profile=dom.add('');profile.id='overallProfilePopup';
 const practice=dom.add('polytrack-practice-profile',{parent:profile}),button=dom.add('',{parent:practice,tagName:'BUTTON',text:'Grid'});
 assert.equal(controlUsageMenu(button,dom.document),'practice');
 assert.equal(controlUsageMenu(profile,dom.document),'profile');
});

test('trusted native menu activations and handled keyboard usage retain their menu without recording labels',async()=>{
 const dom=menuDom(),recorded=[],root=dom.add('multiplayer-ui'),button=dom.add('',{parent:root,tagName:'BUTTON',text:'Back'});
 const stop=installControlUsage({document:dom.document,record:(...args)=>recorded.push(args)});
 dom.listeners.click({isTrusted:true,target:button});
 dom.listeners.keydown({isTrusted:true,target:dom.document,code:'Escape',defaultPrevented:true});
 await Promise.resolve();
 assert.deepEqual(recorded,[['multiplayer','back'],['multiplayer','key-escape']]);
 stop();assert.deepEqual(dom.listeners,{});
});

test('practice and Extra controls have distinct stable counters without recording their values',()=>{
 const node=(selector,dataset={})=>({matches:s=>s===selector,closest:()=>null,dataset,tagName:'SELECT',value:'private racer or search text'});
 for(const [selector,name] of [['[data-pp-sort]','sort'],['[data-pp-direction]','sort-direction'],['[data-pp-search]','search'],['[data-pp-track-id]','open-track'],['[data-places]','selection-places'],['[data-relative]','selection-offsets']])assert.equal(controlUsageName(node(selector)),name);
 assert.equal(controlUsageName(node('[data-pp-view]',{ppView:'list'})),'view-list');
 assert.equal(controlUsageName(node('',{sqControl:'source'})),'filter-source');
 assert.equal(controlUsageName(node('',{sqControl:'reviewed-difficulty'})),'filter-reviewed-difficulty');
 assert.equal(controlUsageName(node('',{sqControl:'private-racer-id'})),'choose-option');
});
