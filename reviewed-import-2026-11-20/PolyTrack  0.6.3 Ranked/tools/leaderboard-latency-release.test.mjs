import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stampClientRelease} from './site-release.mjs';

test('native initial-open module import follows client release stamping',()=>{
  const patch=readFileSync(new URL('../polytrack_062_patch.js',import.meta.url),'utf8');
  const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(patch,/leaderboard-latency-hook\.mjs\?v=\d+/);
  const stamped=stampClientRelease(patch,index,169);
  assert.match(stamped.patch,/leaderboard-latency-hook\.mjs\?v=169/);
  assert.deepEqual(stampClientRelease(stamped.patch,stamped.index,169),stamped);
  assert.match(stampClientRelease(stamped.patch,stamped.index,170).patch,/leaderboard-latency-hook\.mjs\?v=170/);
});
