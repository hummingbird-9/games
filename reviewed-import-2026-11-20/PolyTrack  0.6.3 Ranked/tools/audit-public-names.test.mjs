import test from 'node:test';
import assert from 'node:assert/strict';
import {collectPublicNames,summarizePublicNames} from './audit-public-names.mjs';

test('offline name audit includes identities but excludes track labels',()=>{
  const names=collectPublicNames({name:'Track Label',rows:[
    {accountId:'fixture',name:'Diddy',nickname:'Diddy'},
    {userId:'other',name:'OrdinaryRacer'},
    {displayName:'Nigam'}, {username:'N1GA'}, {publicName:'DiddyKong'}]});
  assert.equal(names.has('Track Label'),false);
  assert.equal(names.get('Diddy'),2);
  const summary=summarizePublicNames(names);
  assert.equal(summary.nameFields,6);
  assert.equal(summary.distinctNames,5);
  assert.equal(summary.blockedFields,3);
  assert.equal(summary.blockedDistinct,2);
  for(const name of names.keys())assert.equal(JSON.stringify(summary).includes(name),false);
});
