const OPFS_MARKER = '_game_ready';

// Cache successful game downloads so repeat visits do not request the same
// files and split-package chunks from GitHub Pages again.
// Bump the version when replacing the hosted game-data files.
const GAME_ASSET_CACHE = 'vcsky-game-assets-v1';
const MAX_CONCURRENT_GAME_REQUESTS = 3;
const MAX_GAME_FETCH_RETRIES = 4;

let activeGameRequests = 0;
let gameRequestQueue = [];
let gameFetchCooldownUntil = 0;

// Request types that make up the app itself; game data is served from OPFS.
const REVALIDATED_DESTINATIONS = new Set(['document', 'script', 'style', 'worker', 'manifest']);

const CONTENT_TYPES = new Map([
    ['.wasm', 'application/wasm'],
    ['.js', 'application/javascript'],
    ['.json', 'application/json'],
    ['.html', 'text/html; charset=utf-8'],
    ['.css', 'text/css; charset=utf-8'],
    ['.txt', 'text/plain; charset=utf-8'],
    ['.png', 'image/png'],
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.gif', 'image/gif'],
    ['.svg', 'image/svg+xml'],
    ['.wav', 'audio/wav'],
    ['.mp3', 'audio/mpeg'],
    ['.ogg', 'audio/ogg'],
    ['.adf', 'application/octet-stream'],
    ['.dat', 'application/octet-stream'],
    ['.dff', 'application/octet-stream'],
    ['.txd', 'application/octet-stream'],
    ['.col', 'application/octet-stream'],
    ['.ipl', 'application/octet-stream'],
    ['.ide', 'application/octet-stream'],
    ['.ifp', 'application/octet-stream'],
    ['.img', 'application/octet-stream'],
    ['.dir', 'application/octet-stream'],
    ['.raw', 'application/octet-stream'],
    ['.bin', 'application/octet-stream'],
]);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
    // Remove only old caches owned by this game's service worker.
    const keys = await caches.keys();
    await Promise.all(keys
        .filter(key => key.startsWith('vcsky-game-assets-') && key !== GAME_ASSET_CACHE)
        .map(key => caches.delete(key)));
    await self.clients.claim();
})()));

const APP_BASE = new URL(self.registration.scope).pathname;

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const path = url.pathname;
    const appPath = path.startsWith(APP_BASE) ? path.slice(APP_BASE.length) : '';
    if ((appPath.startsWith('vcsky/') || appPath.startsWith('vcbr/')) &&
        (event.request.method === 'GET' || event.request.method === 'HEAD')) {
        event.respondWith(serveGameAsset(event.request, appPath));
        return;
    }

    // GitHub Pages lets the browser reuse the page and its scripts for 10
    // minutes without asking, so a deploy can be invisible for that long (or
    // mix an old page with new files). Make the browser check with the server
    // first: an unchanged file costs a 304, a changed one is fetched fresh.
    if (event.request.method === 'GET' && url.origin === self.location.origin &&
        REVALIDATED_DESTINATIONS.has(event.request.destination)) {
        event.respondWith(
            fetch(event.request, { cache: 'no-cache' })
                // offline: fall back to whatever the browser still has
                .catch(() => fetch(event.request, { cache: 'force-cache' }))
        );
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRetryDelay(response, attempt) {
    let delay = NaN;
    const retryAfter = response.headers.get('Retry-After');
    if (retryAfter) {
        const seconds = Number(retryAfter);
        delay = Number.isFinite(seconds)
            ? seconds * 1000
            : Date.parse(retryAfter) - Date.now();
    }

    if (!Number.isFinite(delay) || delay <= 0) {
        const reset = Number(response.headers.get('X-RateLimit-Reset'));
        if (Number.isFinite(reset) && reset > 0) {
            delay = reset * 1000 - Date.now();
        }
    }

    if (!Number.isFinite(delay) || delay <= 0) {
        delay = Math.min(30000, 500 * (2 ** attempt));
    }

    return Math.min(60000, Math.max(250, delay)) + Math.floor(Math.random() * 250);
}

async function fetchWithRetry(request) {
    for (let attempt = 0; attempt <= MAX_GAME_FETCH_RETRIES; attempt++) {
        const cooldown = gameFetchCooldownUntil - Date.now();
        if (cooldown > 0) await sleep(cooldown);

        let response;
        try {
            response = await fetch(request.clone());
        } catch (error) {
            if (attempt === MAX_GAME_FETCH_RETRIES) throw error;
            await sleep(Math.min(10000, 500 * (2 ** attempt)));
            continue;
        }

        const retryable = response.status === 408 || response.status === 429 ||
            response.status === 500 || response.status === 502 ||
            response.status === 503 || response.status === 504;
        if (!retryable || attempt === MAX_GAME_FETCH_RETRIES) {
            return response;
        }

        const delay = getRetryDelay(response, attempt);
        if (response.status === 429) {
            gameFetchCooldownUntil = Math.max(
                gameFetchCooldownUntil,
                Date.now() + delay,
            );
        }

        await response.body?.cancel().catch(() => {});
        await sleep(delay);
    }

    throw new Error('Game asset request retries exhausted');
}

function drainGameRequestQueue() {
    while (activeGameRequests < MAX_CONCURRENT_GAME_REQUESTS && gameRequestQueue.length) {
        const job = gameRequestQueue.shift();
        activeGameRequests++;
        fetchWithRetry(job.request)
            .then(job.resolve, job.reject)
            .finally(() => {
                activeGameRequests--;
                drainGameRequestQueue();
            });
    }
}

function queuedGameFetch(input, init) {
    const request = input instanceof Request ? new Request(input, init) : new Request(input, init);
    return new Promise((resolve, reject) => {
        gameRequestQueue.push({ request, resolve, reject });
        drainGameRequestQueue();
    });
}

async function fetchGameAsset(input, init) {
    const request = input instanceof Request ? new Request(input, init) : new Request(input, init);
    const cacheable = request.method === 'GET' && !request.headers.has('Range');
    let cache = null;

    if (cacheable) {
        try {
            cache = await caches.open(GAME_ASSET_CACHE);
            const cached = await cache.match(request);
            if (cached) return cached;
        } catch (error) {
            console.warn('[sw] game asset cache read failed:', request.url, error);
        }
    }

    const response = await queuedGameFetch(request);

    // Cache only complete successful responses. Quota or cache errors must
    // never stop the game from receiving the network response.
    if (cacheable && cache && response.status === 200 && response.type !== 'opaque') {
        try {
            await cache.put(request, response.clone());
        } catch (error) {
            console.warn('[sw] game asset cache write failed:', request.url, error);
        }
    }

    return response;
}

function getContentType(filename) {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.wasm.br')) return 'application/wasm';
    if (lower.endsWith('.js.br')) return 'application/javascript';
    if (lower.endsWith('.json.br')) return 'application/json';
    if (lower.endsWith('.css.br')) return 'text/css; charset=utf-8';
    if (lower.endsWith('.html.br')) return 'text/html; charset=utf-8';

    for (const [ext, type] of CONTENT_TYPES) {
        if (lower.endsWith(ext)) return type;
    }
    return 'application/octet-stream';
}

function buildHeaders(filename, size) {
    const headers = new Headers();
    headers.set('Content-Type', getContentType(filename));
    headers.set('Content-Length', String(size));
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

    if (filename.toLowerCase().endsWith('.br')) {
        headers.set('Content-Encoding', 'br');
    }

    return headers;
}

function parseRange(rangeHeader, size) {
    const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader || '');
    if (!match) return null;

    let start = match[1] === '' ? null : Number(match[1]);
    let end = match[2] === '' ? null : Number(match[2]);

    if (start === null && end === null) return null;
    if (start === null) {
        start = Math.max(0, size - end);
        end = size - 1;
    } else if (end === null || end >= size) {
        end = size - 1;
    }

    if (start > end || start < 0 || end >= size) return null;
    return { start, end };
}

async function serveFromOPFS(request, pathname) {
    try {
        const root = await navigator.storage.getDirectory();
        const parts = pathname.replace(/^\//, '').split('/').map(decodeURIComponent);
        let dir = root;
        for (let i = 0; i < parts.length - 1; i++) {
            dir = await dir.getDirectoryHandle(parts[i]);
        }
        const filename = parts[parts.length - 1];
        const fileHandle = await dir.getFileHandle(filename);
        const file = await fileHandle.getFile();
        const headers = buildHeaders(filename, file.size);

        if (request.method === 'HEAD') {
            return new Response(null, { status: 200, headers });
        }

        const range = parseRange(request.headers.get('Range'), file.size);
        if (range) {
            headers.set('Content-Range', `bytes ${range.start}-${range.end}/${file.size}`);
            headers.set('Content-Length', String(range.end - range.start + 1));
            return new Response(file.slice(range.start, range.end + 1), {
                status: 206,
                headers,
            });
        }

        return new Response(file, { status: 200, headers });
    } catch (error) {
        return new Response('Not found', { status: 404 });
    }
}


async function serveGameAsset(request, relativePath) {
    // Imported game files in OPFS take priority.
    const local = await serveFromOPFS(request, `/${relativePath}`);
    if (local.status !== 404) return local;

    if (relativePath === 'vcbr/vc-sky-en-v6.data') {
        return serveChunkedPackage(request);
    }

    // Individual fetched assets take priority over the bundled package.
    const localPath = `${APP_BASE}game-data/${relativePath}`;
    const fetched = await fetchGameAsset(new Request(new URL(localPath, self.location.origin), request));
    const canUseBundledFallback = fetched.status === 404 ||
        fetched.status === 429 || fetched.status >= 500;
    if (!canUseBundledFallback || !relativePath.startsWith('vcsky/')) {
        return fetched;
    }

    // Some assets are already inside the split game package, even when they
    // are not duplicated in game-data/vcsky/fetched. Use that copy for both
    // missing files and temporary host rate-limit/server errors.
    const bundled = await serveBundledAsset(request, relativePath.slice('vcsky/'.length));
    if (bundled.ok || fetched.status === 404) return bundled;
    return fetched;
}

let bundledIndexPromise;

async function readBundledIndex() {
    if (!bundledIndexPromise) {
        bundledIndexPromise = fetchGameAsset(
            `${APP_BASE}game-data/vcbr/vc-sky-en-v6.json`,
            { cache: 'no-store' },
        ).then(response => {
            if (!response.ok) throw new Error(`Game package index returned ${response.status}`);
            return response.json();
        }).catch(error => {
            bundledIndexPromise = null;
            throw error;
        });
    }
    return bundledIndexPromise;
}

async function serveBundledAsset(request, relativePath) {
    try {
        const index = await readBundledIndex();
        const wanted = `/vc-assets/local/${relativePath}`.toLowerCase();
        const entry = Object.values(index.files || {}).find(
            file => file.filename?.toLowerCase() === wanted,
        );
        if (!entry || !Number.isSafeInteger(entry.start) ||
            !Number.isSafeInteger(entry.end) || entry.end <= entry.start) {
            return new Response('Not found', { status: 404 });
        }

        const filename = relativePath.split('/').pop();
        const size = entry.end - entry.start;
        const requestedRange = request.headers.get('Range');
        const range = requestedRange ? parseRange(requestedRange, size) : null;
        if (requestedRange && !range) {
            return new Response(null, {
                status: 416,
                headers: { 'Content-Range': `bytes */${size}` },
            });
        }

        if (request.method === 'HEAD') {
            return new Response(null, { status: 200, headers: buildHeaders(filename, size) });
        }

        const selected = range || { start: 0, end: size - 1 };
        const packageRequest = new Request(
            new URL(`${APP_BASE}vcbr/vc-sky-en-v6.data`, self.location.origin),
            {
                method: 'GET',
                headers: {
                    Range: `bytes=${entry.start + selected.start}-${entry.start + selected.end}`,
                },
            },
        );
        const packageResponse = await serveChunkedPackage(packageRequest);
        if (!packageResponse.ok) return packageResponse;

        const headers = buildHeaders(filename, selected.end - selected.start + 1);
        if (range) {
            headers.set('Content-Range', `bytes ${range.start}-${range.end}/${size}`);
        }
        return new Response(packageResponse.body, {
            status: range ? 206 : 200,
            headers,
        });
    } catch (error) {
        console.error('[sw] bundled asset lookup failed:', relativePath, error);
        return new Response('Bundled asset not found', { status: 404 });
    }
}

async function readChunkManifest() {
    const response = await fetchGameAsset(
        `${APP_BASE}game-data/vcbr/chunks/manifest.json`,
        { cache: 'no-store' },
    );
    if (!response.ok) throw new Error(`Chunk manifest returned ${response.status}`);
    const manifest = await response.json();
    const total = manifest.parts?.reduce((sum, part) => sum + part.size, 0);
    if (!Array.isArray(manifest.parts) || !manifest.parts.length || total !== manifest.size) {
        throw new Error('Invalid split game package manifest');
    }
    return manifest;
}

function streamPackageParts(parts, start, end) {
    return new ReadableStream({
        async start(controller) {
            let partStart = 0;
            try {
                for (const part of parts) {
                    const thisPartStart = partStart;
                    const thisPartEnd = thisPartStart + part.size - 1;
                    partStart += part.size;

                    const wantedStart = Math.max(start, thisPartStart);
                    const wantedEnd = Math.min(end, thisPartEnd);
                    if (wantedStart > wantedEnd) continue;

                    const url = `${APP_BASE}game-data/vcbr/chunks/${encodeURIComponent(part.name)}`;
                    const response = await fetchGameAsset(url, { cache: 'no-store' });
                    if (!response.ok) throw new Error(`Could not load ${part.name}: ${response.status}`);

                    const reader = response.body.getReader();
                    let readOffset = 0;
                    while (readOffset <= wantedEnd - thisPartStart) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const valueStart = readOffset;
                        const valueEnd = readOffset + value.byteLength - 1;
                        const from = Math.max(wantedStart - thisPartStart, valueStart);
                        const to = Math.min(wantedEnd - thisPartStart, valueEnd);
                        if (from <= to) {
                            controller.enqueue(value.slice(from - valueStart, to - valueStart + 1));
                        }
                        readOffset += value.byteLength;
                    }
                    if (readOffset <= wantedEnd - thisPartStart) {
                        throw new Error(`${part.name} ended before its expected size`);
                    }
                    await reader.cancel().catch(() => {});
                }
                controller.close();
            } catch (error) {
                controller.error(error);
            }
        },
    });
}

async function serveChunkedPackage(request) {
    try {
        const manifest = await readChunkManifest();
        const headers = buildHeaders(manifest.file || 'vc-sky-en-v6.data', manifest.size);

        if (request.method === 'HEAD') {
            return new Response(null, { status: 200, headers });
        }

        const requestedRange = request.headers.get('Range');
        const range = parseRange(requestedRange, manifest.size);
        if (requestedRange && !range) {
            return new Response(null, {
                status: 416,
                headers: { 'Content-Range': `bytes */${manifest.size}` },
            });
        }

        const start = range ? range.start : 0;
        const end = range ? range.end : manifest.size - 1;
        if (range) {
            headers.set('Content-Range', `bytes ${start}-${end}/${manifest.size}`);
            headers.set('Content-Length', String(end - start + 1));
        }

        return new Response(streamPackageParts(manifest.parts, start, end), {
            status: range ? 206 : 200,
            headers,
        });
    } catch (error) {
        console.error('[sw] local split package failed:', error);
        return new Response('Game package not found', { status: 404 });
    }
}

self.addEventListener('message', async event => {
    if (event.data.type === 'IS_READY') {
        const ready = await isGameReady();
        const port = event.ports[0] || event.source;
        if (port) port.postMessage({ type: 'IS_READY', ready });
    }
});

async function isGameReady() {
    try {
        const root = await navigator.storage.getDirectory();
        await root.getFileHandle(OPFS_MARKER);
        return true;
    } catch {
        return false;
    }
}
