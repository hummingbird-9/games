const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../polytrack_062_patch.js'), 'utf8');

test('Extra Tracks tile restores its label after loading and cancels an old error reset on retry', async () => {
  const makeNode = () => ({
    children: [], attributes: new Map(), listeners: new Map(),
    append(...nodes) { this.children.push(...nodes); },
    prepend(node) { this.children.unshift(node); },
    querySelector() { return null; },
    setAttribute(key, value) { this.attributes.set(key, value); },
    removeAttribute(key) { this.attributes.delete(key); },
    addEventListener(type, handler) { this.listeners.set(type, handler); }
  });
  const wrapper = makeNode(), timers = new Map();
  let resolveOpen, rejectOpen, timerId = 0;
  const context = vm.createContext({
    document: { createElement: makeNode, querySelectorAll: () => [{querySelector: () => wrapper}] },
    isElementVisible: () => true,
    loadExtraTracksCatalog: async () => [{}, {}, {}],
    openExtraTracks: () => new Promise((resolve, reject) => { resolveOpen = resolve; rejectOpen = reject; }),
    setTimeout: callback => { timers.set(++timerId, callback); return timerId; },
    clearTimeout: id => timers.delete(id)
  });
  const start = source.indexOf('  function ensureExtraTracksEntryContents(');
  const end = source.indexOf('  function __pt062WebpackRequire(', start);
  vm.runInContext(source.slice(start, end), context);
  context.ensureExtraTracksEntryContents();
  const button = wrapper.children[0].children[0], label = button.children[2];
  const settle = () => new Promise(setImmediate);
  await settle();
  assert.equal(label.textContent, '3 tracks');
  button.listeners.get('click')();
  assert.equal(label.textContent, 'Loading tracks...');
  assert.equal(button.attributes.get('aria-busy'), 'true');
  resolveOpen(); await settle();
  assert.equal(label.textContent, '3 tracks');
  assert.equal(button.disabled, false);
  assert.equal(button.attributes.has('aria-busy'), false);
  button.listeners.get('click')();
  rejectOpen(Error('Try again')); await settle();
  assert.equal(label.textContent, 'Try again');
  assert.equal(timers.size, 1);
  button.listeners.get('click')();
  assert.equal(timers.size, 0, 'the previous error cannot overwrite the pending retry');
  assert.equal(label.textContent, 'Loading tracks...');
  resolveOpen(); await settle();
  assert.equal(label.textContent, '3 tracks');
});

test('category movements survive repeat views and reset only with changed standings', () => {
  const start = source.indexOf('  function annotateCategoryRanks(');
  const end = source.indexOf('  function sortedOverallEntries(', start);
  const storage = new Map();
  const context = vm.createContext({Date, cleanUserId: value => value,
    readJsonStorage: (key, fallback) => storage.get(key) || fallback,
    writeJsonStorage: (key, value) => storage.set(key, value)});
  vm.runInContext(source.slice(start, end), context);
  const run = ids => context.annotateCategoryRanks(ids.map(userId => ({userId})), 'wins');
  run(['a', 'b']);
  assert.equal(run(['b', 'a'])[0].categoryMovement, 1);
  assert.equal(run(['b', 'a'])[0].categoryMovement, 1);
  assert.equal(run(['a', 'b'])[0].categoryMovement, 1);
});

test('filter labels, notices, and profile actions keep explicit personal context', () => {
  assert.match(source, /const label=active\?'Filters \+':'Filters'/);
  assert.doesNotMatch(source, /\['Only this racer'/);
  assert.match(source, /Racer profile · Filtered Results/);
  assert.match(source, /showNotice===false/);
  assert.match(source, /getRuleCounts:\(rows,filter\)/);
  assert.match(source, /groupScoreIncomplete\)return '<p class="profile-guide-empty">Not enough saved group results/);
});

test('native filter button exposes active and inactive states accessibly', () => {
  const start = source.indexOf('  function refreshPersonalFilterButtons(){');
  const end = source.indexOf('  function personalFilterButton(', start);
  assert.ok(start >= 0 && end > start);
  let active = true;
  let filter = {color:'#123456', colorLevel:'everywhere'};
  const button = {textContent:'Filters', title:'', attributes:{}, classes:{},
    setAttribute(name,value){this.attributes[name]=value;},
    classList:{toggle(name,value){button.classes[name]=value;}}};
  const body = {variables:{}, classes:{}, style:{setProperty(name,value){body.variables[name]=value;}},
    classList:{toggle(name,value){body.classes[name]=value;}}};
  const context = vm.createContext({personalFilterRuntime:{active:()=>active,getFilter:()=>filter},
    document:{querySelectorAll:()=>[button],body}});
  vm.runInContext(source.slice(start,end),context);
  context.refreshPersonalFilterButtons();
  assert.equal(button.textContent,'Filters +');
  assert.equal(button.attributes['aria-label'],'Edit active personal filters');
  assert.equal(button.attributes['aria-pressed'],'true');
  assert.equal(button.classes.selected,true);
  assert.equal(body.variables['--personal-filter-color'],'#123456');
  assert.equal(body.classes['personal-filters-active'],true);
  assert.equal(body.classes['personal-filters-colored'],true);

  active=false;filter=null;context.refreshPersonalFilterButtons();
  assert.equal(button.textContent,'Filters');
  assert.equal(button.attributes['aria-label'],'Edit personal filters');
  assert.equal(button.attributes['aria-pressed'],'false');
  assert.equal(button.classes.selected,false);
  assert.equal(body.classes['personal-filters-active'],false);
  assert.equal(body.classes['personal-filters-colored'],false);
});

test('the website update notice and entry-point cache revision match the published release', () => {
  const revision = JSON.parse(fs.readFileSync(require('node:path').join(__dirname, '../site-version.json'), 'utf8')).revision;
  const index = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
  assert.ok(Number.isSafeInteger(revision));
  assert.ok(source.includes(`installSiteUpdates({revision:${revision}`));
  assert.ok(index.includes(`polytrack_062_patch.js?v=${revision}`));
});

test('track rule statistics use loaded times and distinguish partial fields', () => {
  const start = source.indexOf('  function personalFilterTracks(');
  const end = source.indexOf('  async function editPersonalRacer(', start);
  const context = vm.createContext({
    activeRankedAccountId: () => 'me',
    personalFilterDataSource: () => ({boards:[{trackId:'track',entries:[
      {accountId:'me',timeMs:3000},{accountId:'other',timeMs:1000},
      {accountId:'third',timeMs:2000}],complete:false,weight:2}]}),
    TRACK_CATALOG:new Map([['track',{name:'Track'}]]), extraTrackInfoById:new Map(),
    canonicalRaceTimeMs:row => row.timeMs
  });
  vm.runInContext(source.slice(start,end),context);
  const track=context.personalFilterTracks()[0];
  assert.equal(track.racerCount,3);
  assert.equal(track.bestTimeMs,1000);
  assert.equal(track.pbTimeMs,3000);
  assert.equal(track.meanTimeMs,2000);
  assert.equal(track.medianTimeMs,2000);
  assert.equal(track.complete,false);
});
