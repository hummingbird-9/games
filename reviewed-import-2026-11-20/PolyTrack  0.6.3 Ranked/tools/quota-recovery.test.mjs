import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../polytrack_062_patch.js',import.meta.url),'utf8');
const start=source.indexOf('  function firebaseQuotaRetryAt(');
const end=source.indexOf('  function firebaseQuotaPaused(',start);
const context=vm.createContext({Intl,Date});
vm.runInContext(source.slice(start,end),context);
test('quota retry uses a bounded cooldown outside the reset window',()=>{
  const now=Date.parse('2026-10-20T18:00:00Z');
  assert.equal(context.firebaseQuotaRetryAt(now),now+900000);
});
test('quota retry crosses Pacific midnight with two minutes grace in both DST seasons',()=>{
  for(const [before,after] of [['2026-10-20T06:55:00Z','2026-10-20T07:02:00Z'],['2026-12-20T07:55:00Z','2026-12-20T08:02:00Z']]){
    assert.equal(context.firebaseQuotaRetryAt(Date.parse(before)),Date.parse(after));
  }
});
test('quota retries resume on visibility, online and page restoration without bypassing backoff',()=>{
  for(const event of ['online','pageshow','visibilitychange'])assert.ok(source.includes(`addEventListener('${event}',resumeLocalPbCloudReconcile)`));
  const body=source.slice(source.indexOf('  function resumeLocalPbCloudReconcile('),source.indexOf('  const LOCAL_PB_RECONCILE_BATCH_SIZE'));
  assert.match(body,/scheduleLocalPbCloudReconcile\(activeRankedAccountId\(\)\)/);
  assert.doesNotMatch(body,/\.get\(|fetch\(|removeItem|retryAt\s*[:=]/);
});
