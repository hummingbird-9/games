import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {loadSnapshotAuditInputs,renameCheckpointWithRetry} from './snapshot-audit.mjs';
import {compareControls} from './similarity.mjs';

const {decodeReplay} = createRequire(import.meta.url)('./replay.cjs');
const DEFAULT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SCHEMA = 'polytrack-snapshot-pair-ledger-v1';
const HASH = /^[a-f0-9]{64}$/;
const SOURCE_FILES = ['snapshot-pair-ledger.mjs', 'similarity.mjs', 'replay.cjs', 'input-rate.mjs', 'segment-similarity.mjs'];

const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const runKey = row => digest(JSON.stringify(row));
const pairKey = (fingerprint, left, right) => digest(JSON.stringify([fingerprint, ...[left, right].sort()]));
const within = (root, target) => { const relative = path.relative(root, target); return relative === '' || relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative); };

export async function comparisonCodeFingerprint() {
 const hash = crypto.createHash('sha256');
 for (const name of SOURCE_FILES) {
  hash.update(name); hash.update('\0');
  hash.update(await fs.readFile(new URL(name, import.meta.url)));
  hash.update('\0');
 }
 return hash.digest('hex');
}

async function privateFile(file, root) {
 if (typeof file !== 'string' || !path.isAbsolute(file)) throw Error('Private output path must be absolute');
 const repo = await fs.realpath(root), parent = await fs.realpath(path.dirname(file));
 const result = path.join(parent, path.basename(file));
 if (within(repo, result)) throw Error('Pair ledger outputs must be outside the Git repository');
 try { if ((await fs.lstat(result)).isSymbolicLink()) throw Error('Private output must not be a symlink'); }
 catch (error) { if (error.code !== 'ENOENT') throw error; }
 return result;
}

async function atomicWrite(file, value) {
 const temp = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
 const handle = await fs.open(temp, 'wx', 0o600);
 try { await handle.writeFile(value); await handle.sync(); }
 finally { await handle.close(); }
 try { await renameCheckpointWithRetry(temp, file); }
 catch (error) { await fs.rm(temp, {force:true}); throw error; }
}

async function acquireLock(file) {
 for (let attempt=0;attempt<2;attempt++) {
  const nonce=crypto.randomUUID(), value=JSON.stringify({pid:process.pid,nonce});
  try {
   const handle=await fs.open(file,'wx',0o600);
   try {await handle.writeFile(value);await handle.sync();}
   catch(error){await handle.close();await fs.rm(file,{force:true});throw error;}
   return {handle,value};
  } catch(error) {
   if(error.code!=='EEXIST') throw error;
   const previous=await fs.readFile(file,'utf8');
   let owner;
   try {owner=JSON.parse(previous);} catch {throw Error('Pair ledger is locked; inspect the private lock file');}
   if(!Number.isSafeInteger(owner?.pid)||owner.pid<1) throw Error('Pair ledger lock has no valid owner');
   try {process.kill(owner.pid,0);throw Error('Pair ledger is already running');}
   catch(check) {if(check.code!=='ESRCH') throw check;}
   if(await fs.readFile(file,'utf8')!==previous) throw Error('Pair ledger lock changed during recovery');
   await fs.rm(file);
  }
 }
 throw Error('Could not acquire pair ledger lock');
}

function emptyLedger() { return {schema:SCHEMA, cliques:[], completedPairs:{}, findings:{}}; }
function validState(state) {
 if (state?.schema !== SCHEMA || !Array.isArray(state.cliques) || !state.completedPairs || !state.findings ||
     typeof state.completedPairs !== 'object' || typeof state.findings !== 'object') return false;
 if (!state.cliques.every(row => HASH.test(row?.trackId) && HASH.test(row?.fingerprint) && Array.isArray(row?.runs) &&
     row.runs.every(key => HASH.test(key)) && new Set(row.runs).size === row.runs.length)) return false;
 for (const [key, row] of Object.entries(state.completedPairs)) {
  if (!HASH.test(row?.fingerprint) || !HASH.test(row?.trackId) || !HASH.test(row?.left) || !HASH.test(row?.right) ||
      key !== pairKey(row.fingerprint, row.left, row.right)) return false;
 }
 for (const [key, row] of Object.entries(state.findings)) {
  if (!HASH.test(row?.fingerprint) || !HASH.test(row?.trackId) || !row?.left || !row?.right ||
      key !== pairKey(row.fingerprint, runKey(row.left), runKey(row.right))) return false;
 }
 return true;
}

function descriptor(job) {
 if (!HASH.test(job?.trackId) || !HASH.test(job?.accountId) || !HASH.test(job?.replayHash) ||
     !Number.isSafeInteger(job?.timeMs) || job.timeMs <= 0 || typeof job?.kind !== 'string' ||
     typeof job?.source !== 'string' || typeof job?.replay !== 'string') throw Error('Invalid snapshot pair job');
 return {trackId:job.trackId, kind:job.kind, source:job.source, recordId:job.recordId,
  accountId:job.accountId, timeMs:job.timeMs, replayHash:job.replayHash};
}

function cliqueIndex(ledger, fingerprint) {
 const index = new Map();
 for (const clique of ledger.cliques.filter(row => row.fingerprint === fingerprint)) {
  for (const key of clique.runs) {
   if (!index.has(key)) index.set(key, new Set());
   index.get(key).add(clique);
  }
 }
 return index;
}

function inClique(index, left, right) {
 const first = index.get(left), second = index.get(right);
 return first && second && [...first].some(clique => second.has(clique));
}

function recordClique(ledger, index, trackId, fingerprint, keys, generation) {
 if (keys.length < 2) return;
 const members = new Set(keys);
 if (ledger.cliques.some(row => row.trackId === trackId && row.fingerprint === fingerprint && keys.every(key => row.runs.includes(key)))) return;
 ledger.cliques = ledger.cliques.filter(row => row.trackId !== trackId || row.fingerprint !== fingerprint || !row.runs.every(key => members.has(key)));
 const clique = {trackId, fingerprint, runs:[...keys].sort(), firstCompletedGeneration:generation};
 ledger.cliques.push(clique);
 for (const key of keys) { if (!index.has(key)) index.set(key, new Set()); index.get(key).add(clique); }
 for (const [key, row] of Object.entries(ledger.completedPairs)) {
  if (row.fingerprint === fingerprint && row.trackId === trackId && members.has(row.left) && members.has(row.right)) delete ledger.completedPairs[key];
 }
}

export async function runSnapshotPairLedger({ledger, report, root=DEFAULT_ROOT, maxPairs=Infinity,
 loadInputs=loadSnapshotAuditInputs, fingerprint:providedFingerprint, onProgress=()=>{}}={}) {
 if (maxPairs !== Infinity && (!Number.isSafeInteger(maxPairs) || maxPairs < 1)) throw Error('maxPairs must be a positive integer');
 const ledgerFile = await privateFile(ledger, root), reportFile = await privateFile(report, root);
 const findingsFile = await privateFile(`${ledgerFile}.findings.jsonl`, root);
 if (new Set([ledgerFile, reportFile, findingsFile]).size !== 3) throw Error('Private output paths must be distinct');
 const lockFile=`${ledgerFile}.lock`, lock=await acquireLock(lockFile);
 try {
  const audit = await loadInputs({root});
  const fingerprint = providedFingerprint ?? await comparisonCodeFingerprint();
  if (!HASH.test(fingerprint)) throw Error('Invalid comparison fingerprint');
  let state;
  try { state = JSON.parse(await fs.readFile(ledgerFile, 'utf8')); }
  catch (error) {
   if (error.code !== 'ENOENT') throw error;
   try { await fs.access(findingsFile); throw Error('Findings exist without a matching pair ledger'); }
   catch (check) { if (check.code !== 'ENOENT') throw check; }
   state = emptyLedger();
  }
  if (!validState(state)) throw Error('Invalid private pair ledger');
  const grouped = new Map(), currentKeys = new Map(), seenKeys = new Set(), sourceCounts = new Map();
  let decodeUnavailable=0;
  for (const job of audit.jobs) {
   const identity = descriptor(job), key = runKey(identity);
   if (seenKeys.has(key)) throw Error('Duplicate snapshot pair identity');
   seenKeys.add(key);
   sourceCounts.set(job.trackId,(sourceCounts.get(job.trackId)||0)+1);
   try {
    const controls = decodeReplay(job.replay, job.timeMs);
    currentKeys.set(key, identity);
    const row = {key, identity, controls, controlHash:digest(JSON.stringify(controls.lists))};
    if (!grouped.has(job.trackId)) grouped.set(job.trackId, []);
    grouped.get(job.trackId).push(row);
   } catch { decodeUnavailable++; }
  }
  const index = cliqueIndex(state, fingerprint);
  const totalPairs = [...grouped.values()].reduce((sum, rows) => sum + rows.length*(rows.length-1)/2, 0);
  const sourcePairs = [...sourceCounts.values()].reduce((sum, count) => sum + count*(count-1)/2, 0);
  let comparedPairs=0, reusedPairs=0, processedPairs=0, exactPairs=0, similarPairs=0, tracksCompleted=0, stopped=false;
  for (const [trackId, rows] of [...grouped.entries()].sort(([a],[b])=>a.localeCompare(b))) {
   rows.sort((a,b)=>a.key.localeCompare(b.key));
   for (let i=0;i<rows.length && !stopped;i++) for (let j=i+1;j<rows.length;j++) {
    const left=rows[i], right=rows[j], key=pairKey(fingerprint,left.key,right.key);
    const reused = Boolean(state.completedPairs[key] || inClique(index,left.key,right.key));
    if (!reused && comparedPairs >= maxPairs) { stopped=true; break; }
    const exactInput = left.identity.timeMs === right.identity.timeMs && left.controlHash === right.controlHash;
    if (exactInput) exactPairs++;
    if (reused) reusedPairs++;
    else {
     const similarity = compareControls(left.controls,right.controls,left.identity.timeMs,right.identity.timeMs);
     state.completedPairs[key] = {trackId, fingerprint, left:left.key, right:right.key};
     comparedPairs++;
     if (similarity) state.findings[key] = {trackId, fingerprint, left:left.identity, right:right.identity,
      exactInput, sameAccount:left.identity.accountId===right.identity.accountId, reviewOnly:true,
      inputSimilarity:similarity.inputSimilarity, transitionSimilarity:similarity.transitionSimilarity,
      informativeMs:similarity.informativeMs, firstSeenGeneration:audit.manifest.generation};
     if (comparedPairs % 64 === 0) await atomicWrite(ledgerFile, `${JSON.stringify(state)}\n`);
    }
    if (state.findings[key]) similarPairs++;
    processedPairs++;
   }
   if (stopped) break;
   tracksCompleted++;
   recordClique(state,index,trackId,fingerprint,rows.map(row=>row.key),audit.manifest.generation);
   await atomicWrite(ledgerFile, `${JSON.stringify(state)}\n`);
   onProgress({trackId, tracksCompleted, comparedPairs, reusedPairs, totalPairs});
  }
  await atomicWrite(ledgerFile, `${JSON.stringify(state)}\n`);
  const findingRows = Object.entries(state.findings).sort(([a],[b])=>a.localeCompare(b)).map(([key,row])=>({pairKey:key,...row,
   presentInCurrentSnapshot:row.fingerprint===fingerprint && currentKeys.has(runKey(row.left)) && currentKeys.has(runKey(row.right))}));
  await atomicWrite(findingsFile, findingRows.map(row=>JSON.stringify(row)+'\n').join(''));
  const summary = {schema:SCHEMA, advisoryOnly:true, noVerdictOrPublication:true,
   generation:audit.manifest.generation, comparisonFingerprint:fingerprint,
   complete:!stopped && decodeUnavailable===0 && audit.coverage?.complete===true,
   pairsComplete:!stopped, totalPairs, sourcePairs, skippedInputInvalid:sourcePairs-totalPairs,
   processedPairs, comparedPairs, reusedPairs,
   remainingPairs:totalPairs-processedPairs, exactPairs, similarPairs, tracksCompleted,
   inputDecodeUnavailable:decodeUnavailable, sourceCoverage:audit.coverage,
   sourceIssues:audit.issues.length, ledgerCliques:state.cliques.length,
   explicitCompletedPairs:Object.keys(state.completedPairs).length,
   historicalFindings:findingRows.length, currentFindings:findingRows.filter(row=>row.presentInCurrentSnapshot).length,
   findingsFile};
  await atomicWrite(reportFile, `${JSON.stringify(summary,null,2)}\n`);
  return summary;
 } finally {
  await lock.handle.close();
  if(await fs.readFile(lockFile,'utf8').catch(()=>null)===lock.value) await fs.rm(lockFile,{force:true});
 }
}

function parseArgs(args) {
 const options={};
 for(let i=0;i<args.length;i++) {
  if(args[i]==='--ledger'&&args[i+1]) options.ledger=args[++i];
  else if(args[i]==='--report'&&args[i+1]) options.report=args[++i];
  else if(args[i]==='--max-pairs'&&/^\d+$/.test(args[i+1]||'')) options.maxPairs=Number(args[++i]);
  else throw Error('Usage: node snapshot-pair-ledger.mjs --ledger <absolute-private-json> --report <absolute-private-json> [--max-pairs N]');
 }
 if(!options.ledger||!options.report) throw Error('Usage: node snapshot-pair-ledger.mjs --ledger <absolute-private-json> --report <absolute-private-json> [--max-pairs N]');
 return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
 runSnapshotPairLedger({...parseArgs(process.argv.slice(2)),onProgress:progress=>console.error(JSON.stringify(progress))})
  .then(summary=>console.log(JSON.stringify(summary))).catch(error=>{console.error(String(error?.message||error));process.exitCode=1;});
}
