import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('native loading never inserts the removed compressed leaderboard preview',async()=>{
 const source=await fs.readFile(new URL('../polytrack_062_patch.js',import.meta.url),'utf8');
 assert.equal(source.includes('function showTrackLoadingPreview('),false);
 assert.equal(source.includes('void showTrackLoadingPreview('),false);
 assert.equal(source.includes('Saved leaderboard preview; full standings are loading'),false);
});
