/* Automatically generated split-asset adapter. */
(function () {
  "use strict";
  var script = document.currentScript;
  if (!script || !script.src) return;
  var GAME_ROOT = new URL("./", script.src);
  var FILES = {"Build/webgl.data":{"size":98225382,"sha256":"514e7272ae2f318bf2dffc1e31ec2b7f2794477a3b888f17d1ef56e6ff8b91a8","mime":"application/octet-stream","parts":[{"path":"Build/webgl.data.part0000","size":47185920,"sha256":"7543266d997bfebe1badaf381813e7ab0a1c4f30c9e095f13c9168aeb6762cfb"},{"path":"Build/webgl.data.part0001","size":47185920,"sha256":"1f56df28643826f7b87d67e8c0e379ed1ad85b9d44ccc94b78a9201d78e7060e"},{"path":"Build/webgl.data.part0002","size":3853542,"sha256":"8cdc2aae2389af86aabb2bc46638f38de3259425f29dfc8f6b287d66041c156a"}]}};
  var nativeFetch = window.fetch.bind(window);

  function findAsset(input) {
    try {
      var raw = input && input.url ? input.url : String(input);
      var u = new URL(raw, location.href);
      var rootPath = GAME_ROOT.pathname;
      var path = decodeURIComponent(u.pathname);
      var rootDecoded = decodeURIComponent(rootPath);
      var key = null;
      if (u.origin === GAME_ROOT.origin && path.indexOf(rootDecoded) === 0) {
        key = path.slice(rootDecoded.length).replace(/^\/+/, "");
      }
      if (key && FILES[key]) return FILES[key];
      // Also tolerate a page's stale <base href> while requiring the full relative asset path.
      for (var candidate in FILES) {
        if (path.endsWith("/" + candidate) || path === candidate) return FILES[candidate];
      }
    } catch (_) {}
    return null;
  }

  function parseRange(value, size) {
    if (!value) return { start: 0, end: size - 1, partial: false };
    var m = /^bytes=(\d*)-(\d*)$/i.exec(value.trim());
    if (!m) return null;
    var start, end;
    if (!m[1]) {
      var suffix = Number(m[2]);
      if (!suffix) return null;
      start = Math.max(0, size - suffix);
      end = size - 1;
    } else {
      start = Number(m[1]);
      end = m[2] ? Math.min(size - 1, Number(m[2])) : size - 1;
    }
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start >= size || end < start) return null;
    return { start: start, end: end, partial: true };
  }

  function makeResponse(request, asset) {
    var range = parseRange(request.headers.get("Range"), asset.size);
    if (!range) {
      return Promise.resolve(new Response(null, {
        status: 416,
        headers: { "Content-Range": "bytes */" + asset.size, "Accept-Ranges": "bytes" }
      }));
    }
    var length = range.end - range.start + 1;
    var headers = new Headers({
      "Content-Type": asset.mime || "application/octet-stream",
      "Content-Length": String(length),
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
      "ETag": '"' + asset.sha256 + '"'
    });
    if (range.partial) headers.set("Content-Range", "bytes " + range.start + "-" + range.end + "/" + asset.size);
    if (request.method === "HEAD") return Promise.resolve(new Response(null, { status: range.partial ? 206 : 200, headers: headers }));
    if (request.method !== "GET") return nativeFetch(request);

    var body = new ReadableStream({
      async start(controller) {
        var offset = 0;
        var emitted = 0;
        try {
          for (var i = 0; i < asset.parts.length; i++) {
            var part = asset.parts[i];
            var partStart = offset;
            var partEnd = offset + part.size - 1;
            offset += part.size;
            if (partEnd < range.start || partStart > range.end) continue;
            var res = await nativeFetch(new URL(part.path, GAME_ROOT).href, {
              method: "GET", credentials: "same-origin", cache: "no-store", signal: request.signal
            });
            if (!res.ok || !res.body) throw new Error("Chunk fetch failed: " + part.path + " (HTTP " + res.status + ")");
            var reader = res.body.getReader();
            var skip = Math.max(0, range.start - partStart);
            var allowedEnd = Math.min(part.size - 1, range.end - partStart);
            var remaining = allowedEnd - skip + 1;
            while (remaining > 0) {
              var next = await reader.read();
              if (next.done) break;
              var bytes = next.value;
              if (skip) {
                var skipped = Math.min(skip, bytes.byteLength);
                bytes = bytes.subarray(skipped);
                skip -= skipped;
              }
              if (bytes.byteLength > remaining) bytes = bytes.subarray(0, remaining);
              if (bytes.byteLength) {
                controller.enqueue(bytes);
                remaining -= bytes.byteLength;
                emitted += bytes.byteLength;
              }
            }
            try { await reader.cancel(); } catch (_) {}
            if (remaining !== 0) throw new Error("Short chunk read: " + part.path);
          }
          if (emitted !== length) throw new Error("Split asset length mismatch: " + emitted + " != " + length);
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      }
    });
    return Promise.resolve(new Response(body, { status: range.partial ? 206 : 200, headers: headers }));
  }

  window.fetch = function (input, init) {
    try {
      var request = input instanceof Request ? new Request(input, init) : new Request(input, init);
      var asset = findAsset(request.url);
      if (asset && (request.method === "GET" || request.method === "HEAD")) return makeResponse(request, asset);
    } catch (err) {
      console.warn("Split asset adapter fell back to native fetch:", err);
    }
    return nativeFetch(input, init);
  };

  // XMLHttpRequest fallback for engines that use XHR instead of fetch.
  var NativeXHR = window.XMLHttpRequest;
  if (NativeXHR) {
    function SplitXHR() {
      var xhr = new NativeXHR();
      var open = xhr.open.bind(xhr);
      var send = xhr.send.bind(xhr);
      var setHeader = xhr.setRequestHeader.bind(xhr);
      var target = null, method = "GET", url = "", async = true, capturedHeaders = [];
      xhr.open = function (m, u, a) {
        method = String(m || "GET").toUpperCase();
        url = new URL(String(u), location.href).href;
        target = findAsset(url);
        async = a !== false;
        capturedHeaders = [];
        return open.apply(xhr, arguments);
      };
      xhr.setRequestHeader = function (name, value) {
        if (target) { capturedHeaders.push([name, value]); return; }
        return setHeader(name, value);
      };
      xhr.send = function (body) {
        if (!target || !async || method !== "GET" || (body !== null && body !== undefined)) return send(body);
        var responseType = xhr.responseType;
        var timeout = xhr.timeout;
        var credentials = xhr.withCredentials;
        var aborter = new AbortController();
        xhr.addEventListener("abort", function () { aborter.abort(); }, { once: true });
        window.fetch(url, {
          method: "GET", headers: capturedHeaders,
          credentials: credentials ? "include" : "same-origin", signal: aborter.signal
        }).then(function (response) { return response.blob(); }).then(function (blob) {
          if (aborter.signal.aborted) return;
          var blobURL = URL.createObjectURL(blob);
          xhr.addEventListener("loadend", function () { URL.revokeObjectURL(blobURL); }, { once: true });
          open("GET", blobURL, true);
          xhr.responseType = responseType;
          xhr.timeout = timeout;
          xhr.withCredentials = credentials;
          send();
        }).catch(function (err) {
          if (aborter.signal.aborted) return;
          console.error("Split XHR asset failed:", err);
          try {
            xhr.dispatchEvent(new ProgressEvent("error"));
            xhr.dispatchEvent(new ProgressEvent("loadend"));
          } catch (_) {}
        });
      };
      return xhr;
    }
    SplitXHR.prototype = NativeXHR.prototype;
    Object.setPrototypeOf(SplitXHR, NativeXHR);
    window.XMLHttpRequest = SplitXHR;
  }
})();
