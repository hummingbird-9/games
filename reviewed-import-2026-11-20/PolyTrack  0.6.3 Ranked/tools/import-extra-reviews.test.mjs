import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {importReviews, parseReviews, serializeReviews} from './import-extra-reviews.mjs';
import {summarizeReviews, reviewedTags} from '../extra-tracks/reviewed.mjs';
const a = 'a'.repeat(64), b = 'b'.repeat(64), c = 'c'.repeat(64);
const catalog = [{trackId: a, name: 'A', tags: ['technical']}, {trackId: b, name: 'B', tags: []}];

test('import retains only explicit review opinions, reports canonical coverage, and never mutates source', () => {
  const input = {exportedAt: 'private', tracks: {
    [a]: {rating: 9, difficultyRating: 7, vote: 1, addedTags: ['Scenic'], removedTags: ['technical'],
      personalBestMs: 100, name: 'private', favorite: true, effectiveTags: ['inferred-tag']},
    [c]: {rating: 5}
  }};
  const original = JSON.stringify({catalog, input});
  const {dataset, report} = importReviews({catalog, input, reviewer: 'reviewer-001'});
  assert.deepEqual(dataset.reviewers['reviewer-001'][a], [9, 7, 1, ['scenic'], ['technical']]);
  assert.deepEqual(report.unknown, [c]); assert.deepEqual(report.missing, [{trackId: b, name: 'B'}]);
  const output = serializeReviews(dataset);
  for (const term of ['private', 'personalBestMs', 'exportedAt', 'favorite', 'inferred-tag']) assert.ok(!output.includes(term));
  assert.equal(JSON.stringify({catalog, input}), original);
});

test('stable reviewer replacement is idempotent; a second reviewer contributes once', () => {
  const first = importReviews({catalog, input: {tracks: {[a]: {rating: 9, difficultyRating: 7, vote: 0}}}, reviewer: 'reviewer-001'});
  const repeated = importReviews({catalog, input: {tracks: {[a]: {rating: 9, difficultyRating: 7, vote: 0}}}, reviewer: 'reviewer-001', existing: first.dataset});
  assert.equal(serializeReviews(first.dataset), serializeReviews(repeated.dataset));
  const second = importReviews({catalog, input: {tracks: {[a]: {rating: 5, difficultyRating: 3, vote: -1}}}, reviewer: 'reviewer-002', existing: first.dataset});
  assert.deepEqual(summarizeReviews(catalog[0], second.dataset), {count: 2, quality: 7, qualityCount: 2, difficulty: 5, difficultyCount: 2, up: 0, down: 1, votes: 1, addedTags: [], removedTags: []});
  const replacement = importReviews({catalog, input: {tracks: {[a]: {rating: 1}}}, reviewer: 'reviewer-001', existing: second.dataset});
  assert.equal(summarizeReviews(catalog[0], replacement.dataset).quality, 3);
  assert.equal(summarizeReviews(catalog[0], replacement.dataset).difficultyCount, 1);
});

test('explicit tag votes preserve ties and do not treat absent edits as votes', () => {
  const dataset = {schema: 1, reviewers: {one: {[a]: [9, 7, 0, ['scenic'], ['technical']]}, two: {[a]: [8, 6, 0]}}};
  assert.deepEqual(reviewedTags(catalog[0], summarizeReviews(catalog[0], dataset)), ['scenic']);
  dataset.reviewers.two[a] = [8, 6, 0, ['technical'], ['scenic']];
  assert.deepEqual(reviewedTags(catalog[0], summarizeReviews(catalog[0], dataset)), ['technical']);
  assert.deepEqual(catalog[0].tags, ['technical']);
});

test('rejects malformed identities, scores, tag deltas, stored payloads and executable module text', () => {
  for (const row of [{rating: 11}, {rating: '8'}, {difficultyRating: -1}, {vote: 2}, {addedTags: ['<script>']}, {addedTags: ['mini'], removedTags: ['mini']}]) {
    assert.throws(() => importReviews({catalog, input: {tracks: {[a]: row}}, reviewer: 'reviewer-001'}));
  }
  assert.throws(() => importReviews({catalog: [...catalog, catalog[0]], input: {tracks: {}}, reviewer: 'reviewer-001'}));
  assert.throws(() => importReviews({catalog, input: {tracks: {}}, reviewer: '../private'}));
  assert.throws(() => parseReviews('export default {}; globalThis.leaked=true;'));
  const dataset = importReviews({catalog, input: {tracks: {[a]: {rating: 5}}}, reviewer: 'reviewer-001'}).dataset;
  assert.deepEqual(parseReviews(serializeReviews(dataset)), dataset);
  assert.throws(() => serializeReviews({...dataset, personalBestMs: 42}));
});

test('committed dataset matches all catalog identities and contains compact review tuples only', () => {
  const source = fs.readFileSync(new URL('../extra-tracks/reviewed-data.mjs', import.meta.url), 'utf8');
  const data = parseReviews(source);
  const entries = JSON.parse(fs.readFileSync(new URL('../extra-tracks/catalog.json', import.meta.url), 'utf8'));
  const canonical = new Set(entries.map(entry => entry.trackId));
  const rows = Object.values(data.reviewers).flatMap(reviewer => Object.entries(reviewer));
  assert.equal(Object.keys(data.reviewers['reviewer-001']).length, 255);
  assert.equal(new Set(rows.map(([id]) => id)).size, entries.length);
  for (const [id, row] of rows) { assert.ok(canonical.has(id)); assert.ok([3, 5].includes(row.length)); }
  assert.equal(source.replace(/\r\n?/g, '\n'), serializeReviews(data));
  assert.ok(Buffer.byteLength(serializeReviews({schema: 1, reviewers: {'reviewer-001': data.reviewers['reviewer-001']}})) < 24000);
});


test('Windows CRLF modules parse identically and the next reviewer import remains deterministic',()=>{
 const first=importReviews({catalog,input:{tracks:{[a]:{rating:9,difficultyRating:7}}},reviewer:'reviewer-001'}).dataset;
 const lf=serializeReviews(first),crlf=lf.replace(/\n/g,'\r\n');
 assert.deepEqual(parseReviews(crlf),parseReviews(lf));assert.equal(serializeReviews(parseReviews(crlf)),lf);
 const second=importReviews({catalog,input:{tracks:{[a]:{rating:5,difficultyRating:3}}},reviewer:'reviewer-002',existing:parseReviews(crlf)});
 assert.equal(summarizeReviews(catalog[0],second.dataset).quality,7);
 assert.equal(summarizeReviews(catalog[0],second.dataset).count,2);
 assert.throws(()=>parseReviews(crlf+'globalThis.leaked=true;\r\n'),/Unexpected/);
});
