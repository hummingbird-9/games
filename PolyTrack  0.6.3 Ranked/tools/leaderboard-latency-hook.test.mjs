import test from 'node:test';
import assert from 'node:assert/strict';
import {installNativeInitialOpenLatencyHook,isVerifiedNativeInitialLeaderboardSchedule} from './leaderboard-latency-hook.mjs';

const nativeStack='Error\n    at Object.open (http://127.0.0.1:1234/main.bundle.js?v=168:20:1523594)';
const nativeCallback=()=>{if(!request.isCancelled) service.getLeaderboard();};

test('only the pinned native 500 ms leaderboard schedule qualifies',()=>{
  assert.equal(isVerifiedNativeInitialLeaderboardSchedule(nativeCallback,500,nativeStack),true);
  assert.equal(isVerifiedNativeInitialLeaderboardSchedule(nativeCallback,499,nativeStack),false);
  assert.equal(isVerifiedNativeInitialLeaderboardSchedule(nativeCallback,500,'Error\n at patch.js:20:2'),false);
  assert.equal(isVerifiedNativeInitialLeaderboardSchedule(()=>service.getLeaderboard(),500,nativeStack),false);
  assert.equal(isVerifiedNativeInitialLeaderboardSchedule(()=>{if(!request.isCancelled) service.load();},500,nativeStack),false);
  assert.equal(isVerifiedNativeInitialLeaderboardSchedule('not a function',500,nativeStack),false);
});

test('unmatched schedule is forwarded and timer override is restored during click',()=>{
  const delays=[],events=[];
  const button={isConnected:true,listener:null,addEventListener(_name,listener){this.listener=listener;},removeEventListener(_name,listener){if(this.listener===listener)this.listener=null;}};
  const root={listener:null,addEventListener(_name,listener){this.listener=listener;},removeEventListener(_name,listener){if(this.listener===listener)this.listener=null;},querySelector(selector){return selector.startsWith('script')?{}:null;}};
  const original=(callback,delay)=>{delays.push(delay);return delays.length;};
  const view={setTimeout:original,clearTimeout(){}};
  const uninstall=installNativeInitialOpenLatencyHook({window:view,document:root,onEvent:event=>events.push(event)});
  root.listener({target:{closest:()=>button}});
  assert.notEqual(view.setTimeout,original);
  view.setTimeout(()=>{},500);
  button.listener();
  assert.equal(view.setTimeout,original);
  assert.deepEqual(delays,[0,500]);
  assert.deepEqual(events,['armed','restored']);
  uninstall();
  assert.equal(root.listener,null);
});

const {runInNewContext}=await import('node:vm');
const nativeSchedule=runInNewContext('(view,callback)=>view.setTimeout(callback,500)',{}, {filename:'http://127.0.0.1:1234/main.bundle.js'});
function hookFixture(onInitialOpen){
  const pending=new Map(),delays=[],events=[];let next=0;
  const button={isConnected:true,listener:null,addEventListener(_name,listener){this.listener=listener;},removeEventListener(_name,listener){if(this.listener===listener)this.listener=null;}};
  const root={listener:null,addEventListener(_name,listener){this.listener=listener;},removeEventListener(){this.listener=null;},querySelector:selector=>selector.startsWith('script')?{}:null};
  const original=(callback,delay,...args)=>{delays.push(delay);pending.set(++next,()=>callback(...args));return next;};
  const view={setTimeout:original,clearTimeout:id=>pending.delete(id)};
  const uninstall=installNativeInitialOpenLatencyHook({window:view,document:root,onInitialOpen:()=>onInitialOpen?.(view),onEvent:event=>events.push(event)});
  return {view,original,pending,delays,events,button,uninstall,open:()=>root.listener({target:{closest:()=>button}})};
}
test('initial default settles before first paint and only initial schedules are accelerated',()=>{
  let renders=0;const request={isCancelled:false},service={getLeaderboard(){renders++;}};
  const initial=()=>{if(!request.isCancelled)service.getLeaderboard();};
  const finalRequest={isCancelled:false};
  const replacement=()=>{if(!finalRequest.isCancelled)service.getLeaderboard();};
  const f=hookFixture(view=>{request.isCancelled=true;nativeSchedule(view,replacement);});
  f.open();nativeSchedule(f.view,initial);f.button.listener();
  assert.equal(f.view.setTimeout,f.original);assert.deepEqual(f.delays,[0,0,0]);
  for(const callback of f.pending.values())callback();
  assert.equal(renders,1);assert.deepEqual(f.events,['armed','matched','matched','restored']);
  nativeSchedule(f.view,replacement);assert.equal(f.delays.at(-1),500);f.uninstall();
});
test('an initial-open exception and an abandoned click both restore the timer',()=>{
  const failed=hookFixture(()=>{throw Error('fixture');});failed.open();
  assert.throws(()=>failed.button.listener(),/fixture/);assert.equal(failed.view.setTimeout,failed.original);failed.uninstall();
  let initialized=0;const abandoned=hookFixture(()=>initialized++);abandoned.open();
  [...abandoned.pending.values()][0]();assert.equal(abandoned.view.setTimeout,abandoned.original);assert.equal(initialized,0);abandoned.uninstall();
});
