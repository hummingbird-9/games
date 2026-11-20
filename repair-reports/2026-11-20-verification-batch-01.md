# Offline verification batch 01 — 2026-11-20

## Scope
Static review of two existing complete local game builds. No replacements or deletions were made in this commit.

## 8 Ball Pool
- `index.html`: 88,815 bytes; single-file canvas game with inline CSS/JavaScript.
- README describes single-file HTML5, vanilla JS, no dependencies.
- LICENSE is MIT, copyright 2026 Fraterne Bahirwe.
- Static scan found no external URL strings, script src, stylesheet links, or iframe dependencies.
- README calls the project in-progress, so it needs gameplay test rather than being assumed fully polished.
- Test plan: menu -> bot mode -> room -> ball-in-hand -> placement -> aim -> keyboard power -> shot, under network blocking.

## 3D Bowling
- Local files include `BowlingOnline2.data` (1,505,051 bytes), `BowlingOnline2.js` (162,650 bytes), `BowlingOnline2.wasm` (2,589,399 bytes), and local HTML, icon, and screenshot files.
- HTML loads JavaScript relatively. Static inspection of the JS found no external URL strings; Emscripten fetches the data package by its local filename and extracts game assets from the package.
- LICENSE is GPL-3.0.
- Prior catalog audit recorded one local request error, but its exact request was not retained. This test isolates the game with external requests blocked.
- Test plan: verify Unity canvas renders, local .data and .wasm return HTTP 200, attempt mouse drag/Space input. Startup pass is not full gameplay certification.

## Verification status at commit time
- Browser tests: pending GitHub Actions.
- No game counted fixed.
- No game removed.
- No game folder files changed.
- Test harness is verification-only.

## Protected paths
- `Do-Not-Take-This-Cat-Home`: absent from the current root tree; not touched.
- `20 Minutes Till Dawn`: absent from the current root tree; not touched.

## CI evidence
Workflow: [verify-offline-existing-games-2026-11-20](../.github/workflows/verify-offline-existing-games-2026-11-20.yml)
