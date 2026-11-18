import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeSearchText,searchMatches,searchAliases,TRACK_SEARCH_ALIASES} from './search-text.mjs';
test('stylized letters, accents, invisible marks and punctuation have plain text search forms',()=>{
 assert.equal(normalizeSearchText('𝓦𝓲𝓷𝓭𝓸𝔀 Ｃｌｅａｎｅｒ'),'window cleaner');
 assert.ok(searchMatches('nurburgring','Nürburgring'));
 assert.ok(searchMatches('foo bar','foo\u200b','BAR!'));
 assert.ok(searchMatches('','any'));assert.equal(searchMatches('nope','track'),false);
});
test('explicit aliases remain bounded and do not change displayed input',()=>{
 for(const group of TRACK_SEARCH_ALIASES)for(const alias of group)assert.ok(searchMatches(alias,group[0]));
 assert.ok(searchMatches('boxed in','B⛶XED IN'));assert.ok(searchMatches('atlantis','𐌀𐌕𐌋𐌀𐌍𐌕𐌉𐌔'));assert.ok(searchMatches('season','ѕєαѕση'));assert.ok(searchMatches('a09','AO9-race'));
 assert.deepEqual(searchAliases('unrelated'),[]);
});

test('every built-in plain catalog name matches its actual decorative metadata',async()=>{
 const {readFile}=await import('node:fs/promises');
 const records=JSON.parse(await readFile(new URL('../tracks/search-metadata.json',import.meta.url),'utf8'));
 const catalog=JSON.parse(await readFile(new URL('../tracks/catalog.json',import.meta.url),'utf8')).tracks;
 assert.equal(records.length,catalog.length);
 for(const row of records){const track=catalog.find(item=>item.thumbnail===row.thumbnail);assert.ok(track);assert.equal(row.plainName,track.name);assert.ok(searchMatches(track.name,row.name),'Plain name: '+track.name);}
});

// Human-readable expectations are independent of the implementation's normalizer.
test('all decorative community and extra names accept their plain reading', async()=>{
 const {readFile}=await import('node:fs/promises');
 const metadata=JSON.parse(await readFile(new URL('../tracks/search-metadata.json',import.meta.url),'utf8'));
 const extras=JSON.parse(await readFile(new URL('../extra-tracks/catalog.json',import.meta.url),'utf8'));
 const expected=new Map([
  ['𝔚𝔦𝔫𝔱𝔢𝔯𝔱𝔦𝔡𝔢','wintertide'],['݁˖.˚ Evanescent Bliss. ݁₊˚ .','evanescent bliss'],
  ['𐌀𐌕𐌋𐌀𐌍𐌕𐌉𐌔','atlantis'],['𝔖𝔱𝔢𝔦𝔫𝔴𝔞𝔩𝔩𝔟𝔲𝔯𝔤','steinwallburg'],
  ['𝕻𝖆𝖗𝖆𝖉𝖎𝖘𝖊 𝕻𝖆𝖑𝖆𝖈𝖊','paradise palace'],['Frosted Fjords 寒い','frosted fjords'],
  ['〜✧〜Ḽevitation〜✧〜','levitation'],['⚙︎Cogware⚙︎','cogware'],['Natsujō','natsujo'],
  ['ice run(hard)🥵','ice run hard'],['B⛶XED IN','boxed in'],['Nürburgring Nordschleife','nurburgring nordschleife'],
  ['Muy difícil','muy dificil']
 ]);
 for(const row of [...metadata,...extras]) {
  if(/[^\x00-\x7f]/.test(row.name))assert.ok(expected.has(row.name),'Add an independent plain reading: '+row.name);
  assert.ok(searchMatches(expected.get(row.name)||row.name,row.name,row.codeName),'Plain lookup: '+row.name);
  if(row.codeName)assert.ok(searchMatches(normalizeSearchText(row.codeName),row.name,row.codeName));
 }
 const winter=metadata.find(row=>expected.get(row.name)==='wintertide');
 for(const query of ['Wintertide','winterrtibe'])assert.ok(searchMatches(query,winter.name));
 for(const query of ['a05','void','vold'])assert.ok(searchMatches(query,query==='a05'?'AO5':'VØłĐ'));
 assert.equal(searchMatches('winterrtibe','Winterfell'),false,'no broad fuzzy matching');
});
