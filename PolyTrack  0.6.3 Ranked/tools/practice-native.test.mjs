import test from 'node:test';
import assert from 'node:assert/strict';
import {createPracticeHistory} from './practice-history.mjs';
import {installPracticeObserver} from './practice-native.mjs';

const account='a'.repeat(64),track='b'.repeat(64);
function fixture(options={}){
 let at=100000,tick,shown=true,owner=account;
 const events=new EventTarget();
 class Physics{createCar(_a,_b,_c,_track){return {carState:{frames:0,x:0,y:0,z:0}};}}
 class Car{
  constructor(state){this.state=state;this.reset=[];this.finish=[];this.paused=false;this.started=true;}
  getCarState(){return this.state;}
  getTime(){return {numberOfFrames:this.state.frames};}
  getPosition(){return this.state;}
  hasStarted(){return this.started;}
  hasFinished(){return false;}
  get isPaused(){return this.paused;}
  getNextCheckpointIndex(){return 1;}
  addResetCallback(fn){this.reset.push(fn);return 'reset-registered';}
  addFinishCallback(fn){this.finish.push(fn);}
  dispose(){return 'disposed';}
 }
 if(options.noMotion)delete Car.prototype.getPosition;
 const history=createPracticeHistory({now:()=>at});
 const physics=new Physics();
 const observer=installPracticeObserver({require:id=>({A:id===5220?Physics:Car}),history,accountId:()=>owner,bestMs:()=>options.bestMs||0,clock:()=>at,visible:()=>shown,schedule:fn=>{tick=fn;},cancel(){},placementAfterFinish:options.placementAfterFinish,eventTarget:events,windowTarget:events});
 function car(trackId=track){const c=new Car(physics.createCar(null,null,null,{getId:()=>trackId}).carState);assert.equal(c.addResetCallback(()=>{}),'reset-registered');return c;}
 function advance(c,{ms=1000,frames=ms,x=c.state.x}={}){at+=ms;c.state.frames+=frames;c.state.x=x;}
 return {history,observer,car,advance,events,step(c,{ms=1000,frames=ms,x=c.state.x}={}){at+=ms;c.state.frames+=frames;c.state.x=x;tick();},hide(){shown=false;events.dispatchEvent(new Event('blur'));},show(){shown=true;events.dispatchEvent(new Event('focus'));},switchAccount(){owner='c'.repeat(64);}};
}

test('native sampling separates moving, stationary, hidden, paused and long gaps',()=>{
 const f=fixture();try{
  const car=f.car();f.step(car,{x:2});f.step(car);f.hide();f.step(car,{x:4});f.show();car.paused=true;f.step(car,{x:6});car.paused=false;
  f.step(car,{ms:60000,x:8});f.step(car,{x:10});
  const row=f.history.get(account,track);
  assert.equal(row.movingMs,2000);assert.equal(row.stationaryMs,1000);assert.equal(row.hiddenMs,1000);assert.equal(row.pausedMs,1000);assert.equal(row.unobservedGapMs,60000);
  assert.equal(row.activeMs,3000);assert.equal(row.longestHuntMs,2000);
 }finally{f.observer.stop();}
});

test('missing or failing motion API preserves race observation without inventing driving',()=>{
 for(const noMotion of [true,false]){
  const f=fixture({noMotion});try{const car=f.car();if(!noMotion)car.getPosition=()=>{throw Error('unavailable');};f.step(car,{x:3});
   const row=f.history.get(account,track);assert.equal(row.activeMs,1000);assert.equal(row.progressingMs,1000);assert.equal(row.motionObservedMs,0);assert.equal(row.movingMs,0);assert.equal(row.longestHuntMs,0);
  }finally{f.observer.stop();}
 }
});

test('resets and implausible position jumps do not count as motion',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{x:10000});assert.equal(f.history.get(account,track).movingMs,0);
  car.state.x=0;for(const fn of car.reset)fn();f.step(car,{x:0});assert.equal(f.history.get(account,track).movingMs,0);
  f.step(car,{x:1});assert.equal(f.history.get(account,track).movingMs,1000);
 }finally{f.observer.stop();}
});

test('same-track recreation carries hunt and account switch never credits previous owner',()=>{
 const f=fixture();try{const first=f.car();f.step(first,{x:2});first.dispose();const second=f.car();f.step(second,{x:3});assert.equal(f.history.get(account,track).longestHuntMs,2000);
  f.switchAccount();f.step(second,{x:4});for(const fn of second.finish)fn();assert.equal(f.history.get(account,track).finishes,0);assert.equal(f.history.get(account,track).movingMs,2000);
  const third=f.car();f.step(third,{x:5});assert.equal(f.history.get('c'.repeat(64),track).movingMs,1000);
 }finally{f.observer.stop();}
});

test('optional placement callback runs once after finish with explicit identity and time',async()=>{
 let calls=0;
 const f=fixture({placementAfterFinish:request=>{calls++;assert.equal(f.history.get(account,track).trackedBestMs,1000);return {...request,at:request.finishedAt,rank:5,total:100,exact:true,complete:true,authoritative:true};}});
 try{const car=f.car();f.step(car,{x:3});for(const fn of car.finish){fn();fn();}await Promise.resolve();assert.equal(calls,1);assert.equal(f.history.get(account,track).firstPlacement.rank,5);}finally{f.observer.stop();}
});

test('placement callback failure, partial boards and mismatching identity/time stay unknown',async()=>{
 for(const patch of [{complete:false},{authoritative:false},{timeMs:999},{trackId:'c'.repeat(64)},{accountId:'c'.repeat(64)},null,'throw']){
  const f=fixture({placementAfterFinish:request=>{if(patch==='throw')return Promise.reject(Error('offline'));return patch===null?null:{...request,at:request.finishedAt,rank:1,total:100,exact:true,complete:true,authoritative:true,...patch};}});
  try{const car=f.car();f.step(car,{x:3});for(const fn of car.finish)fn();await Promise.resolve();assert.equal(f.history.get(account,track).firstPlacement,null);}finally{f.observer.stop();}
 }
});

test('late async placement after observer stop is ignored',async()=>{
 let resolve;const f=fixture({placementAfterFinish:()=>new Promise(r=>resolve=r)});
 const car=f.car();f.step(car,{x:1});for(const fn of car.finish)fn();f.observer.stop();
 resolve({accountId:account,trackId:track,timeMs:1000,at:101000,rank:1,total:100,exact:true,complete:true,authoritative:true});await Promise.resolve();assert.equal(f.history.get(account,track).firstPlacement,null);
});
test('native finish records a slower-than-PB result once',()=>{
 const f=fixture({bestMs:900});try{
  const car=f.car();f.step(car,{frames:1200,x:1});for(const fn of car.finish){fn();fn();}
  const row=f.history.get(account,track);
  assert.equal(row.finishes,1);assert.equal(row.pbs,0);assert.equal(row.bestMs,900);
  assert.equal(row.trackedBestMs,1200);assert.equal(row.lastObservedFinishMs,1200);
  assert.equal(row.recentFinishes[0].timeMs,1200);
 }finally{f.observer.stop();}
});

test('short starts and slow clock progress never credit a whole sampling interval',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{frames:100,x:1});f.step(car,{frames:100,x:2});
  const row=f.history.get(account,track);
  assert.equal(row.activeMs,200);assert.equal(row.simulatedMs,200);assert.equal(row.progressingMs,200);
  assert.equal(row.movingMs,200);assert.equal(row.focusedMs,2000);assert.equal(row.idleMs,1800);
 }finally{f.observer.stop();}
});

test('ordinary timer jitter below the gap threshold is not silently discarded',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{ms:2400,x:4});
  const row=f.history.get(account,track);assert.equal(row.activeMs,2400);assert.equal(row.movingMs,2400);
 }finally{f.observer.stop();}
});

test('blur and focus close exact subsecond observation intervals without hidden catch-up',()=>{
 const f=fixture();try{const car=f.car();f.advance(car,{ms:300,x:1});f.hide();
  f.advance(car,{ms:1200,x:3});f.show();f.step(car,{ms:400,x:4});
  const row=f.history.get(account,track);
  assert.equal(row.activeMs,700);assert.equal(row.focusedMs,700);assert.equal(row.hiddenMs,1200);
  assert.equal(row.progressingMs,700);assert.equal(row.movingMs,700);
 }finally{f.observer.stop();}
});

test('leaving before the first timer sample preserves the unfinished attempt',async()=>{
 const f=fixture();try{const car=f.car();f.advance(car,{ms:250,x:1});car.dispose();await Promise.resolve();
  const row=f.history.get(account,track);assert.equal(row.activeMs,250);assert.equal(row.attempts,1);
  assert.equal(row.finishes,0);assert.equal(row.restarts,0);
 }finally{f.observer.stop();}
});

test('same-track rapid restarts account for each short attempt without timer ticks',()=>{
 const f=fixture();try{for(let i=0;i<10;i++){const car=f.car();f.advance(car,{ms:100,x:1});car.dispose();}
  f.car();const row=f.history.get(account,track);assert.equal(row.activeMs,1000);assert.equal(row.restarts,10);assert.equal(row.attempts,10);
 }finally{f.observer.stop();}
});

test('track ownership rejects late disposed-car callbacks and never leaks progress to another track',()=>{
 const f=fixture();try{const first=f.car();f.advance(first,{ms:100,x:1});first.dispose();
  const other='d'.repeat(64),second=f.car(other);for(const fn of first.finish)fn();for(const fn of first.reset)fn();
  f.step(second,{x:1});assert.equal(f.history.get(account,track).finishes,0);
  assert.equal(f.history.get(account,track).respawns,0);assert.equal(f.history.get(account,other).activeMs,1000);
 }finally{f.observer.stop();}
});

test('explicit sampling makes unfinished progress current and observer stop removes lifecycle listeners',()=>{
 const f=fixture();const car=f.car();f.advance(car,{ms:250,x:1});f.observer.sample();
 assert.equal(f.history.get(account,track).activeMs,250);f.observer.stop();
 f.advance(car,{ms:250,x:2});f.hide();f.show();for(const fn of car.reset)fn();for(const fn of car.finish)fn();
 assert.equal(f.history.get(account,track).activeMs,250);assert.equal(f.history.get(account,track).finishes,0);
});

test('native finished state survives disposal before analytics callback and is not a restart',()=>{
 const f=fixture({bestMs:900});try{const car=f.car();f.advance(car,{ms:1200,x:1});
  car.hasFinished=()=>true;car.getFinishTime=()=>({numberOfFrames:1100});
  car.dispose();for(const fn of car.finish)fn();f.car();
  const row=f.history.get(account,track);assert.equal(row.finishes,1);assert.equal(row.pbs,0);
  assert.equal(row.trackedBestMs,1100);assert.equal(row.activeMs,1100);assert.equal(row.restarts,0);
  assert.equal(row.recentFinishes.length,1);
 }finally{f.observer.stop();}
});

test('sample recovers an authoritative native finish if its notification was missed',()=>{
 const f=fixture();try{const car=f.car();car.hasFinished=()=>true;car.getFinishTime=()=>({numberOfFrames:750});
  f.step(car,{frames:1000,x:1});f.step(car,{x:2});for(const fn of car.finish)fn();
  const row=f.history.get(account,track);assert.equal(row.finishes,1);assert.equal(row.activeMs,750);assert.equal(row.trackedBestMs,750);
 }finally{f.observer.stop();}
});

test('950 + 1050 worker jitter preserves cumulative time and prior motion evidence',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{frames:950,x:1});f.step(car,{frames:1050,x:2});
  const row=f.history.get(account,track);assert.equal(row.activeMs,2000);assert.equal(row.progressingMs,2000);
  assert.equal(row.movingMs,2000);assert.equal(row.idleMs,0);assert.equal(row.focusedMs,2000);
 }finally{f.observer.stop();}
});

test('clock catch-up is invariant to normal sample partitioning and leading or lagging batches',()=>{
 for(const parts of [ [[2000,2000]],[[1000,950],[1000,1050]],[[1000,1050],[1000,950]],[[500,950],[500,0],[1000,1050]],[[1000,950],[0,50],[1000,1000]] ]){
  const f=fixture();try{const car=f.car();for(const [ms,frames]of parts)f.step(car,{ms,frames,x:car.state.x+(frames?1:0)});
   const row=f.history.get(account,track);assert.equal(row.activeMs,2000,JSON.stringify(parts));assert.equal(row.progressingMs,2000);assert.equal(row.idleMs,0);
  }finally{f.observer.stop();}
 }
});

test('slow and stalled CPU clocks never receive whole wall-time credit',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{frames:100,x:1});assert.equal(f.history.get(account,track).activeMs,100);
  for(let i=0;i<6;i++)f.step(car,{frames:0});
  assert.equal(f.history.get(account,track).activeMs,100);assert.equal(f.history.get(account,track).movingMs,100);
 }finally{f.observer.stop();}
});

test('unknown old motion is not inferred from movement in a later worker batch',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{frames:0});f.step(car,{frames:2000,x:2});
  const row=f.history.get(account,track);assert.equal(row.activeMs,2000);assert.equal(row.movingMs,1000);
  assert.equal(row.stationaryMs,0);assert.equal(row.motionObservedMs,1000);assert.equal(row.idleMs,0);
 }finally{f.observer.stop();}
});

test('catch-up preserves old stationary evidence instead of copying current motion',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{frames:950});f.step(car,{frames:1050,x:2});
  const row=f.history.get(account,track);assert.equal(row.activeMs,2000);assert.equal(row.stationaryMs,1000);assert.equal(row.movingMs,1000);
 }finally{f.observer.stop();}
});

test('catch-up pending credit is discarded at visibility, gap and reset boundaries',()=>{
 for(const boundary of ['visibility','gap','reset']){
  const f=fixture();try{const car=f.car();f.step(car,{frames:950,x:1});
   if(boundary==='visibility'){f.hide();f.step(car,{frames:0});f.show();}
   if(boundary==='gap')f.step(car,{ms:3000,frames:0});
   if(boundary==='reset')for(const fn of car.reset)fn();
   f.step(car,{frames:1050,x:2});assert.equal(f.history.get(account,track).activeMs,1950,boundary);
  }finally{f.observer.stop();}
 }
});

test('pause and resume credits proven resumed clock progress but not paused wall time',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{x:1});car.paused=true;f.step(car,{frames:0});
  car.paused=false;f.step(car,{ms:500,frames:500,x:2});
  const row=f.history.get(account,track);assert.equal(row.activeMs,1500);assert.equal(row.pausedMs,1000);assert.equal(row.focusedMs,1500);
 }finally{f.observer.stop();}
});

test('resumed interval remainder remains unknown and no old pending credit crosses a pause',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{frames:950,x:1});car.paused=true;f.step(car,{frames:0});
  car.paused=false;f.step(car,{ms:1000,frames:500,x:2});
  const row=f.history.get(account,track);assert.equal(row.activeMs,1450);assert.equal(row.unobservedGapMs,500);
  assert.equal(row.focusedMs,1500);assert.equal(row.pausedMs,1000);
 }finally{f.observer.stop();}
});

test('long continuous clock stalls have at most 2500 ms of recoverable prior wall time',()=>{
 const f=fixture();try{const car=f.car();for(let i=0;i<10;i++)f.step(car,{frames:0});
  f.step(car,{frames:20000,x:2});assert.equal(f.history.get(account,track).activeMs,3500);
 }finally{f.observer.stop();}
});

test('clear invalidates the live attempt and the next in-place reset starts fresh',()=>{
 const f=fixture();try{const car=f.car();f.step(car,{frames:950,x:1});f.history.clear(account);
  f.step(car,{x:2});for(const fn of car.finish)fn();assert.equal(f.history.get(account,track),null);
  for(const fn of car.reset)fn();f.step(car,{x:3});
  const row=f.history.get(account,track);assert.equal(row.activeMs,1000);assert.equal(row.attempts,1);
  assert.equal(row.finishes,0);assert.equal(row.restarts,0);assert.equal(row.respawns,0);
 }finally{f.observer.stop();}
});

test('finish and account boundaries do not transfer accumulated clock credit to another attempt',()=>{
 const f=fixture();try{const first=f.car();f.step(first,{frames:1050,x:1});for(const fn of first.finish)fn();first.dispose();
  const second=f.car();f.step(second,{frames:950,x:1});assert.equal(f.history.get(account,track).activeMs,1950);
  f.switchAccount();f.step(second,{frames:1050,x:2});const third=f.car();f.step(third,{frames:950,x:1});
  assert.equal(f.history.get('c'.repeat(64),track).activeMs,950);
 }finally{f.observer.stop();}
});
