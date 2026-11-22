import test from 'node:test';
import assert from 'node:assert/strict';
import {importOfficialLeaderboardPage, officialPercentile} from './official-benchmark.mjs';

const trackId = 'a'.repeat(64);
const physicsFingerprint = 'b'.repeat(64);
const capturedAt = '2026-10-20T00:00:00.000Z';
const context = {trackId, physicsFingerprint, capturedAt};
const rows = [100, 200, 200, 400].map((frames, index) => ({
  frames, verifiedState: 1, userId: `private-${index}`, nickname: `Racer ${index}`,
  recording: 'do-not-copy'
}));

test('imports only timing values and explicit coverage from one native page', () => {
  const reference = importOfficialLeaderboardPage({total: 20, entries: rows}, context);
  assert.deepEqual(reference.frames, [100, 200, 200, 400]);
  assert.deepEqual(reference.coverage, {totalEntries: 20, sampledEntries: 4, skip: 0, complete: false});
  assert.doesNotMatch(JSON.stringify(reference), /private-|Racer|do-not-copy/);
  assert.equal(officialPercentile(reference, {...context, frames: 200}), null);
});

test('complete, compatible field yields a tie-aware percentile', () => {
  const reference = importOfficialLeaderboardPage({total: 4, entries: rows}, context);
  assert.deepEqual(officialPercentile(reference, {...context, frames: 200}), {
    percentile: 50, population: 4, capturedAt,
    definition: 'Percentage of verified records slower than this time, with ties counted as half'
  });
  assert.equal(officialPercentile(reference, {...context, frames: 500}).percentile, 0);
});

test('refuses missing or mismatched physics, track, version, and partial pages', () => {
  const reference = importOfficialLeaderboardPage({total: 4, entries: rows}, context);
  assert.equal(officialPercentile(reference, {trackId, frames: 200}), null);
  assert.equal(officialPercentile(reference, {...context, physicsFingerprint: 'c'.repeat(64), frames: 200}), null);
  assert.equal(officialPercentile(reference, {...context, trackId: 'c'.repeat(64), frames: 200}), null);
  assert.equal(officialPercentile(reference, {...context, gameVersion: '0.6.2', frames: 200}), null);
  assert.equal(officialPercentile(importOfficialLeaderboardPage({total: 5, entries: rows}, context), {...context, frames: 200}), null);
  assert.equal(officialPercentile(importOfficialLeaderboardPage({total: 5, entries: rows}, {...context, skip: 1}), {...context, frames: 200}), null);
});

test('rejects malformed, unsorted, and unverifiable native responses', () => {
  assert.throws(() => importOfficialLeaderboardPage({total: 2, entries: rows}, context));
  assert.throws(() => importOfficialLeaderboardPage({total: 2, entries: [rows[1], rows[0]]}, context));
  assert.throws(() => importOfficialLeaderboardPage({total: 1, entries: [{frames: 0, verifiedState: 1}]}, context));
  assert.throws(() => importOfficialLeaderboardPage({total: 1, entries: [{frames: 100, verifiedState: 0}]}, context));
  assert.throws(() => importOfficialLeaderboardPage({total: 1, entries: [rows[0]]}, {...context, onlyVerified: false}));
});
