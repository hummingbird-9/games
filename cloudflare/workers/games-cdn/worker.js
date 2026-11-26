const OWNER = "hummingbird-9";
const REPO = "games";
const BRANCH = "main";
const SAN_ANDREAS_REPO = "GTA-San-Andreas";

const MIME = {
  html: "text/html; charset=utf-8", htm: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8", mjs: "text/javascript; charset=utf-8",
  cjs: "text/javascript; charset=utf-8", css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8", map: "application/json; charset=utf-8",
  wasm: "application/wasm", xml: "application/xml; charset=utf-8",
  svg: "image/svg+xml", txt: "text/plain; charset=utf-8",
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif",
  webp: "image/webp", avif: "image/avif", ico: "image/x-icon", bmp: "image/bmp",
  mp3: "audio/mpeg", ogg: "audio/ogg", wav: "audio/wav",
  mp4: "video/mp4", webm: "video/webm", mov: "video/quicktime",
  pdf: "application/pdf", zip: "application/zip",
  woff: "font/woff", woff2: "font/woff2", ttf: "font/ttf",
  otf: "font/otf", eot: "application/vnd.ms-fontobject"
};

export default {
  async fetch(request) {
    const incoming = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Allow-Headers": "Range, Content-Type",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { "Allow": "GET, HEAD, OPTIONS" }
      });
    }

    const path = incoming.pathname;
    const segments = path.split("/").filter(Boolean);

    if (!segments.length) {
      return new Response("Hummingbird games CDN", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store"
        }
      });
    }

    // Reject traversal and encoded path separators before building the origin URL.
    let decodedSegments;
    try {
      decodedSegments = segments.map(segment => decodeURIComponent(segment));
      for (const segment of decodedSegments) {
        if (
          segment === "." ||
          segment === ".." ||
          segment.includes("/") ||
          segment.includes("\\") ||
          segment.includes(String.fromCharCode(0))
        ) {
          return new Response("Invalid path", { status: 400 });
        }
      }
    } catch {
      return new Response("Invalid path encoding", { status: 400 });
    }

    // GTA San Andreas is stored in its own repository. Strip the public
    // /GTA-San-Andreas/ prefix and serve its repository root directly.
    // All other paths continue to come from hummingbird-9/games.
    const isSanAndreas = decodedSegments[0] === "GTA-San-Andreas";
    const upstreamRepo = isSanAndreas ? SAN_ANDREAS_REPO : REPO;
    const originSegments = isSanAndreas ? decodedSegments.slice(1) : decodedSegments;
    const upstreamPath = "/" + (
      originSegments.length
        ? originSegments.map(segment => encodeURIComponent(segment)).join("/")
        : "index.html"
    );

    const upstreamUrl =
      "https://raw.githubusercontent.com/" +
      OWNER + "/" + upstreamRepo + "/" + BRANCH + upstreamPath + incoming.search;

    const upstreamHeaders = new Headers(request.headers);
    upstreamHeaders.delete("cookie");
    upstreamHeaders.delete("authorization");
    upstreamHeaders.delete("host");
    upstreamHeaders.delete("origin");

    let upstream;
    try {
      upstream = await fetch(upstreamUrl, {
        method: request.method,
        headers: upstreamHeaders,
        redirect: "follow"
      });
    } catch {
      return new Response("The GitHub file origin could not be reached.", {
        status: 502,
        headers: { "Cache-Control": "no-store" }
      });
    }

    const headers = new Headers(upstream.headers);
    const filename = isSanAndreas && originSegments.length === 0
      ? "index.html"
      : (decodedSegments[decodedSegments.length - 1] || "index.html");
    const extension = filename.includes(".")
      ? filename.split(".").pop().toLowerCase()
      : "";

    if (MIME[extension]) headers.set("Content-Type", MIME[extension]);

    headers.delete("Content-Security-Policy");
    headers.delete("Content-Security-Policy-Report-Only");
    headers.delete("X-Frame-Options");
    headers.delete("Content-Disposition");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    headers.set(
      "Access-Control-Expose-Headers",
      "Accept-Ranges, Content-Length, Content-Range, ETag, Last-Modified"
    );
    headers.set("Cross-Origin-Resource-Policy", "cross-origin");

    const isHtml = extension === "html" || extension === "htm";
    if (upstream.status >= 200 && upstream.status < 300) {
      if (isHtml) {
        // Keep launcher documents fresh after edits to game entry code.
        headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
        headers.set("CDN-Cache-Control", "no-store");
        headers.set("Cloudflare-CDN-Cache-Control", "no-store");
        headers.set("Pragma", "no-cache");
        headers.set("Expires", "0");
      } else {
        headers.set(
          "Cache-Control",
          "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400"
        );
      }
    } else if (upstream.status === 404) {
      headers.set("Cache-Control", "public, max-age=15, s-maxage=30");
    } else {
      headers.set("Cache-Control", "no-store");
    }

    return new Response(request.method === "HEAD" ? null : upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers
    });
  }
};
