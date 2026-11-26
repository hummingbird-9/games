# Hummingbird games CDN Worker

Source for the `hummingbird-games-cdn` Cloudflare Worker.

## Routing

- `/GTA-San-Andreas/*` is served from the root of `hummingbird-9/GTA-San-Andreas` on `main`.
  - `/GTA-San-Andreas/` maps to that repository's `index.html`.
  - `/GTA-San-Andreas/game/game-index.json` maps to `game/game-index.json`.
  - Split data paths under `game/.parts/` are passed through unchanged after the prefix is removed.
- Every other path is served from `hummingbird-9/games` on `main`.

The Worker preserves the existing MIME overrides, GET/HEAD/OPTIONS support, CORS and range request forwarding, and cache policy. It does not copy the San Andreas files into the games repository.

## Production endpoint

`https://hummingbird-games-cdn.humming6ird-9.workers.dev/`

Example San Andreas entry:

`https://hummingbird-games-cdn.humming6ird-9.workers.dev/GTA-San-Andreas/index.html`

## Storage note

This revision reads files from GitHub's raw-content origin. It has no R2 binding. The dedicated San Andreas origin is intentional so its multi-gigabyte data does not need to be duplicated into `hummingbird-9/games`. A later R2 migration can replace the GitHub origin for either repository without changing the public URL structure.
