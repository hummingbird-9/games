import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDeveloperReport } from './developer-diagnostics.mjs';

const id = 'a'.repeat(64);

test('report preserves the v1 structure and omits public ID by default', () => {
 const report = buildDeveloperReport({ publicId: id, email: 'private@example.test', token: 'secret' });
 assert.equal(report.schema, 'polytrack-developer-diagnostics-v1');
 assert.equal(report.privacy.automaticUpload, false);
 assert.equal(report.publicRacerId, undefined);
 assert.doesNotMatch(JSON.stringify(report), /private@example|secret|token/);
 assert.equal(buildDeveloperReport({ publicId: id, includePublicId: true }).publicRacerId, id);
});

test('local results reuse the loaded-results whitelist and rejects secrets', () => {
 const report = buildDeveloperReport({ localResults: [{ trackId: id, timeMs: 42, rank: 1, fieldSize: 5, code: 'private-code', replay: 'secret', token: 'secret' }] });
 assert.deepEqual(report.localResults[0], { trackId: id, timeMs: 42, rank: 1, fieldSize: 5, weight: null, cachedAt: 0, snapshotCapturedAt: 0, runVerified: null, integrityVerified: null, local: false, placementKnown: true });
 assert.doesNotMatch(JSON.stringify(report.localResults), /private-code|secret|replay|token/);
});

test('insights, tracks, and settings export only bounded schema fields', () => {
 const report = buildDeveloperReport({
  insights: { version: 1, startedAt: 3, revisions: [{ revision: 7, firstAt: 1, lastAt: 2, visits: 4, token: 'secret' }], tracks: { [id]: { plays: 2, sources: { planner: 1, password: 'secret' }, token: 'secret' } }, transitions: { [`${id}:${id}`]: 5 }, metrics: { BOARD: { count: 2, totalMs: 20, maxMs: 15, over5s: 1, arbitrary: 'secret' } }, actions: { 'planner-track-click': 1 }, token: 'secret' },
  extraTracks: [{ id, name: 'Track', author: 'Maker', code: 'secret', script: 'secret' }],
  settings: { music: true, volume: 0.5, token: 'secret', privateSetting: 'secret', debug: false }
 });
 assert.deepEqual(report.extraTracks, [{ trackId: id, name: 'Track', author: 'Maker' }]);
 assert.deepEqual(report.settings, { music: true, volume: 0.5 });
 assert.equal(report.insights.tracks[id].sources.planner, 1);
 assert.doesNotMatch(JSON.stringify(report.insights), /secret|token|password/);
});

test('local results and extra-track metadata allow 5000 rows and report truncation', () => {
 const rows = Array.from({ length: 5001 }, (_, index) => ({ trackId: String(index), name: 'Track ' + index, timeMs: index }));
 const report = buildDeveloperReport({ localResults: rows, extraTracks: rows });
 assert.equal(report.localResults.length, 5000);
 assert.equal(report.extraTracks.length, 5000);
 assert.deepEqual(report.truncation, { localResults: { omitted: 1 }, extraTracks: { omitted: 1 }, localProfiles: { omitted: 0 }, localPersonalBests: { omitted: 0 }, localTracks: { omitted: 0 }, localPractice: { omitted: 0 } });
 assert.equal(report.extraTracks[0].trackId, '0');
 assert.equal(report.extraTracks[0].timeMs, undefined);
});

test('practice aggregate stats include active time, starts, finishes, resets and notes', () => {
 const report = buildDeveloperReport({ practice: [
  { activeMs: 200, attempts: 3, finishes: 0, restarts: 2, respawns: 1, recentFinishes: [{ timingNote: true }] },
  { activeMs: 300, attempts: 2, finishes: 1, restarts: 4, respawns: 0, recentFinishes: [{ timingNote: false }] }
 ] });
 assert.deepEqual(report.practiceSummary, { activeMs: 500, starts: 5, finishes: 1, resets: 7, tracksNeverFinished: 1, timingNotes: 1 });
});

test('unknown result placement remains unknown and sensitive fields never escape', () => {
 const result = buildDeveloperReport({ finishes: [{ rank: Infinity, fieldSize: Infinity, weight: null, connectionCode: 'secret' }] }).loadedResults[0];
 assert.equal(result.rank, null); assert.equal(result.fieldSize, null); assert.equal(result.placementKnown, false);
 assert.doesNotMatch(JSON.stringify(result), /secret|connectionCode/);
});

test('local profile data is explicit, whitelisted, ID-preserving, and gated by the existing checkbox consent', () => {
 const localData = {
  profiles: [{ publicId: 'racer_ID-0000000000000000000000000000000000000000000000000000000000000000', name: 'Racer', carColors: ['#112233', '#abcdef'], cosmetics: { body: 'sport', wheels: 'gold', authToken: 'secret', arbitrary: { password: 'secret' } }, playtimeMs: 1234, personalBests: [{ trackId: id, trackName: 'Track', timeMs: 456, frames: 28, achievedAt: 99, replay: 'secret' }], email: 'private@example.test', token: 'secret' }],
  tracks: [{ trackId: 'opaque-track-identifier-that-must-not-be-cut', name: 'Track', author: 'Builder', source: 'local', official: false, connectionCode: 'secret' }],
  practice: [{ trackId: id, trackName: 'Track', activeMs: 80, focusedMs: 20, pausedMs: 3, hiddenMs: 4, movingMs: 10, longestHuntMs: 6, biggestImprovementMs: 12, token: 'secret' }]
 };
 const optedOut = buildDeveloperReport({ localData });
 assert.equal(optedOut.localData, null);
 assert.deepEqual(optedOut.truncation.localProfiles, { omitted: 1 });
 const report = buildDeveloperReport({ localData, includePublicId: true });
 assert.equal(report.localData.profiles[0].publicId, localData.profiles[0].publicId);
 assert.equal(report.localData.tracks[0].trackId, localData.tracks[0].trackId);
 assert.equal(report.localData.profiles[0].personalBests[0].timeMs, 456);
 assert.equal(report.localData.practice[0].focusedMs, 20);
 assert.equal(report.localData.practice[0].biggestImprovementMs, 12);
 assert.equal(report.privacy.includesLocalProfiles, true);
 assert.doesNotMatch(JSON.stringify(report), /secret|private@example|authToken|connectionCode|replay/);
 assert.match(report.privacy.limitations, /does not imply legacy playtime was tracked/);
});

test('opt-in preserves every whitelisted local profile, PB, track and practice row', () => {
 const profiles = Array.from({ length: 501 }, (_, i) => ({ publicId: `racer${i}`, personalBests: i ? [] : Array.from({ length: 5001 }, (_, n) => ({ trackId: id, timeMs: n + 1 })) }));
 const report = buildDeveloperReport({ includePublicId: {includePublicId:true,includeSavedTrackCodes:false}, localData: { profiles, tracks: Array(5001).fill({ trackId: 'track' }), practice: Array(501).fill({ trackId: id }), savedTracks: [{ data: 'PRIVATE-TRACK-CODE' }] } });
 assert.equal(report.localData.profiles.length, 501);
 assert.equal(report.localData.profiles[0].personalBests.length, 5001);
 assert.equal(report.localData.tracks.length, 5001);
 assert.equal(report.localData.practice.length, 501);
 assert.deepEqual(report.truncation.localProfiles, { omitted: 0 });
 assert.deepEqual(report.truncation.localPersonalBests, { omitted: 0 });
 assert.deepEqual(report.truncation.localTracks, { omitted: 0 });
 assert.deepEqual(report.truncation.localPractice, { omitted: 0 });
 assert.deepEqual(report.localData.savedTracks, [{name:'',savedAt:0,bytes:18}]);
 assert.deepEqual(report.savedTrackSummary, {count:1,bytes:18});
 assert.doesNotMatch(JSON.stringify(report), /PRIVATE-TRACK-CODE/);
 const withCodes=buildDeveloperReport({ includePublicId: {includePublicId:true,includeSavedTrackCodes:true}, localData: { profiles, savedTracks:[{name:'Private',data:'PRIVATE-TRACK-CODE'}] } });
 assert.equal(withCodes.localData.savedTracks[0].data,'PRIVATE-TRACK-CODE');
 assert.equal(withCodes.privacy.includesSavedTrackCodes,true);
 assert.equal(buildDeveloperReport({includePublicId:true,localData:{savedTracks:[{data:'PRIVATE-TRACK-CODE'}]}}).localData.savedTracks[0].data,'PRIVATE-TRACK-CODE');
 assert.equal(buildDeveloperReport({includePublicId:true,includeSavedTrackCodes:false,localData:{savedTracks:[{data:'PRIVATE-TRACK-CODE'}]}}).localData.savedTracks[0].data,undefined);
 assert.equal(buildDeveloperReport({ includeSavedTrackCodes:true, localData:{savedTracks:[{data:'PRIVATE-TRACK-CODE'}]} }).localData,null);
});

test('ordinary non-PB finishes retain observed time in the export', () => {
 const report = buildDeveloperReport({ practice: [{ trackId: id, attempts: 2, finishes: 1, pbs: 0, bestMs: 900, trackedBestMs: 1000, lastObservedFinishMs: 1000, lastObservedFinishAt: 1234, recentFinishes: [{ at: 1234, timeMs: 1000 }] }] });
 assert.equal(report.practiceSummary.finishes, 1);
 assert.equal(report.practice[0].pbs, 0);
 assert.equal(report.practice[0].lastObservedFinishMs, 1000);
 assert.equal(report.practice[0].recentFinishes[0].timeMs, 1000);
});

test('compact serialization materially reduces report bytes without dropping v1 fields', () => {
 const report = buildDeveloperReport({
  practice: Array.from({ length: 40 }, (_, i) => ({ trackId: id, trackName: `Practice ${i}`, activeMs: i * 1000, attempts: i + 1, recentFinishes: [{ at: i, timeMs: 12000 + i, practiceMs: 15000, timingNote: false }] })),
  localResults: Array.from({ length: 160 }, (_, i) => ({ trackId: id, timeMs: i + 1000, rank: i + 1, fieldSize: 500 })),
  extraTracks: Array.from({ length: 240 }, (_, i) => ({ id: `track-${i}`, name: `Extra Track ${i}`, author: 'Builder' })),
  localData: { profiles: Array.from({ length: 20 }, (_, i) => ({ publicId: `racer-${i}`, name: `Racer ${i}`, personalBests: Array.from({ length: 8 }, (_, n) => ({ trackId: id, trackName: `Track ${n}`, timeMs: 30000 + n })) })) },
  includePublicId: true
 });
 const compact = JSON.stringify(report);
 const pretty = JSON.stringify(report, null, 2);
 assert.ok(Buffer.byteLength(compact) < Buffer.byteLength(pretty) * 0.8, `${Buffer.byteLength(compact)} compact bytes vs ${Buffer.byteLength(pretty)} pretty bytes`);
 assert.equal(report.schema, 'polytrack-developer-diagnostics-v1');
 for (const key of ['privacy', 'practice', 'loadedResults', 'localResults', 'insights', 'extraTracks', 'localData', 'truncation', 'recentEvents']) assert.ok(Object.hasOwn(report, key), `missing v1 field ${key}`);
 assert.equal(report.localData.profiles.length, 20);
 assert.equal(report.localData.profiles[0].personalBests.length, 8);
});
