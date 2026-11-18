import test from 'node:test';
import assert from 'node:assert/strict';
import {handleRequest} from '../src/index.js';
import {clientAccessPolicy, CANONICAL_CLIENT_URL} from '../src/client-access-policy.js';
const origin = 'https://staticquasar931.github.io';
const make = (path = '/v1/profile/notify', options = {}) => new Request('https://ranked.example' + path, {
  method: 'POST', body: '{}', ...options, headers: {Origin: origin, ...options.headers}
});
function harness(overrides = {}) {
  let db = 0, auth = 0;
  const env = {ALLOWED_ORIGINS: origin, MIN_CLIENT_REVISION: '172',
    __TEST_FIRESTORE: async () => {db++; return null;},
    __TEST_UID: {toString() {auth++; return 'owner';}},
    ...overrides};
  return {env, get db() {return db;}, get auth() {return auth;}};
}
test('floor boundary, missing staging, invalid and future revisions', () => {
  const env = {MIN_CLIENT_REVISION: '172'};
  for (const revision of ['172', '176', '177', '999']) assert.equal(clientAccessPolicy(make('', {headers: {'X-PolyTrack-Revision': revision}}), env), null);
  assert.equal(clientAccessPolicy(make(), env), null);
  for (const revision of ['171', '0', '-1', '177.0', '1e3', '', 'NaN', '9007199254740992', '177, 178']) {
    const denial = clientAccessPolicy(make('', {headers: {'X-PolyTrack-Revision': revision}}), env);
    assert.equal(denial.status, 426);
    assert.equal(denial.canonicalUrl, CANONICAL_CLIENT_URL);
  }
  assert.equal(clientAccessPolicy(make(), {...env, MISSING_CLIENT_REVISION_POLICY: 'reject'}).error, 'client_revision_required');
  assert.equal(clientAccessPolicy(make(), {MIN_CLIENT_REVISION: 'bad'}).status, 503);
  assert.equal(clientAccessPolicy(make(), {MIN_CLIENT_REVISION: '0'}), null);
});
test('origin/revision rejections never authenticate, read bodies, call network or DB', async () => {
  const previous = globalThis.fetch; let calls = 0;
  globalThis.fetch = async () => {calls++; throw Error('unexpected network');};
  try {
    for (const headers of [{Origin: 'https://copy.vercel.app'}, {Origin: 'https://staticquasar931.github.io.evil.test'}, {Origin: 'null'}, {'X-PolyTrack-Revision': '171'}, {'X-PolyTrack-Revision': 'bad'}]) {
      const h = harness();
      const req = make('/v1/profile/notify', {headers});
      const response = await handleRequest(req, h.env);
      assert.ok([403, 426].includes(response.status));
      assert.equal((await response.json()).canonicalUrl, CANONICAL_CLIENT_URL);
      assert.equal(req.bodyUsed, false);
      assert.equal(h.db, 0);
      assert.equal(h.auth, 0);
    }
    assert.equal(calls, 0);
  } finally {globalThis.fetch = previous;}
});
test('ranked and delegated event preflight allow revision header without checking floor', async () => {
  for (const path of ['/v1/profile/notify', '/v1/events/catalog']) {
    const h = harness({EVENTS_ENABLED: 'true', MISSING_CLIENT_REVISION_POLICY: 'reject'});
    const response = await handleRequest(make(path, {method: 'OPTIONS', body: undefined}), h.env);
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
    assert.match(response.headers.get('Access-Control-Allow-Headers'), /X-PolyTrack-Revision/i);
    assert.equal(h.db, 0);
    assert.equal(h.auth, 0);
  }
});
test('IP deny/unavailable fail closed before auth, body and DB', async () => {
  for (const [limiter, expected] of [
    [{limit: async () => ({success: false})}, 429],
    [{limit: async () => {throw Error('down');}}, 503],
    [{limit: async () => ({})}, 503],
    [undefined, 503]
  ]) {
    const h = harness({WRITE_IP_RATE_LIMITER: limiter, WRITE_IP_RATE_LIMIT_REQUIRED: 'true'});
    const req = make('/v1/profile/notify', {headers: {'CF-Connecting-IP': '192.0.2.1'}});
    const response = await handleRequest(req, h.env);
    assert.equal(response.status, expected);
    assert.equal(response.headers.get('Retry-After'), '60');
    assert.equal(req.bodyUsed, false);
    assert.equal(h.db, 0);
  }
  const h = harness({WRITE_IP_RATE_LIMITER: {limit: async () => {throw Error('must not run');}}});
  assert.equal((await handleRequest(make(), h.env)).status, 503);
});
test('IP uses one trusted-edge budget across UID and path; valid flows reach existing auth/DB', async () => {
  const keys = [];
  const env = {ALLOWED_ORIGINS: origin, MIN_CLIENT_REVISION: '172', __TEST_UID: 'owner',
    WRITE_IP_RATE_LIMITER: {limit: async ({key}) => {keys.push(key); return {success: true};}},
    PB_NOTIFY_RATE_LIMITER: {limit: async ({key}) => {assert.equal(key, 'owner'); return {success: true};}},
    __TEST_FIRESTORE: async () => null};
  for (const revision of [undefined, '172', '177']) {
    const response = await handleRequest(make('/v1/profile/notify', {body: JSON.stringify({accountId: 'a'.repeat(64)}), headers: {'CF-Connecting-IP': '192.0.2.1', 'X-Forwarded-For': 'spoof', ...(revision ? {'X-PolyTrack-Revision': revision} : {})}}), env);
    assert.equal(response.status, 403);
    assert.equal((await response.json()).error, 'profile_not_owned');
  }
  assert.deepEqual(keys, Array(3).fill('ranked-write:192.0.2.1'));
});
test('oversized streamed/declared bodies and non-object JSON reject before auth/DB', async () => {
  const previous = globalThis.fetch; let calls = 0;
  globalThis.fetch = async () => {calls++; throw Error('auth network');};
  try {
    for (const [body, headers] of [['x'.repeat(2049), {}], ['{}', {'Content-Length': '2049'}], ['null', {}], ['[]', {}], ['{', {}]]) {
      const h = harness();
      assert.equal((await handleRequest(make('/v1/profile/notify', {body, headers}), h.env)).status, 400);
      assert.equal(h.db, 0);
    }
    assert.equal(calls, 0);
  } finally {globalThis.fetch = previous;}
});
