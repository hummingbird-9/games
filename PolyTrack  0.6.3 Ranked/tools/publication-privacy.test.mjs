import {test} from 'node:test';
import assert from 'node:assert/strict';
import {privatePublicationPaths} from './publication-privacy.mjs';

test('private rules and security evidence are never publication inputs', () => {
  const paths=['docs/security/release-178/school-safe-backend.rules','docs/security/release-177/README.md','workers/ranked/test/quota-rules-candidate.test.js','firestore.rules','firestore.rules.backup','config\\firestore.rules'];
  assert.deepEqual(privatePublicationPaths(paths),paths);
});
test('private credentials and local environment files are rejected', () => {
 const paths=['private/firebase-adminsdk-sample.json','service-account.json','secrets/my-service_account.json','config/credentials.json','.env','.env.production','.dev.vars','private/key.pem','private/key.p12','private/key.key','firebase-config.local.json'];
 assert.deepEqual(privatePublicationPaths(paths),paths);
});
test('public game data, source and credential-free examples remain allowed', () => {
 const paths=['index.html','main.bundle.js','public-snapshots46/index.json','tools/verifier/firestore.mjs','tools/publication-privacy.test.mjs','workers/ranked/.env.example','docs/events/README.md','site-version.json'];
 assert.deepEqual(privatePublicationPaths(paths),[]);
});
