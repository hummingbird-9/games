# Daily HTML audit — 2026-11-23

## Scope and method
- Audited **19 active HTML files** that were modified or added on `main` since the 2026-11-22 audit branch; the comparison also shows 10 HTML removals.
- `main` currently has **676 top-level game folders**.
- Inspected HTML structure, static local references, game-folder root contents, selected nested folders, and linked CSS (plus selected JS). GitHub API checks confirmed exact missing paths.
- **Limitations:** the recursive tree response was too large and failed; shell cloning could not resolve github.com. This is not a full 676-folder audit. No HTML5 parser/browser runtime was available, so structure checks were regex/manual static checks, not parser/runtime certification.

## Safe fixes prepared on this branch
1. **Google Gnomes/index.html:** corrected 19 root-absolute asset paths to game-relative paths. Verified the icons, CSS and JS directories/files exist.
2. **Google Gnomes/manifest.json:** corrected 6 manifest icon paths to local `icons/`; all six icon files exist.
3. **Angry Birds Chrome/index.html:** changed the loading image from root-absolute `/images/loading_image_bird.png` to `images/loading_image_bird.png`. Verified the image exists in the upstream repository reached by the page's CDN base.
4. **12 Mini Battles/index.html:** added the missing page title. Its missing doctype was left alone to avoid changing quirks-mode rendering.
5. **Amaze/index.html:** added missing title metadata.
6. **An Ordinary Sonic ROM Hack/index.html:** added missing title metadata. Its missing doctype and explicit opening `<html>` were not changed.

## Confirmed missing references
- **Moto X3M Pool, Moto X3M Winter, Moto X3M, moto-x3m-spooky-land:** each `assets/css/app.css` references `assets/images/rotate.png`, which is absent (404). Each HTML also references `../js/all.js`, absent from this repository. The helper's role is unclear; no functionality removed.
- **Paper.io 2:** `css/fonts.css` references four WOFF2 files under `css/fonts/`; the directory and sampled file are absent (404). The game's JS, CSS, images and manifest directories exist.
- **10 Minutes Till Dawn:** `../../images/ico.ico` and `../../storage/js/cloak.js` resolve to website-root paths not present in the website repository. The game folder only contains its cover and HTML; Unity loader is external.
- **Amazing Rope Police:** root-relative `/assets/js/geoblocker.js`, `/assets/js/settings.js`, `/assets/js/script.js`, and `/img/canvas.ico` are missing from the website repo. The game itself is embedded from an external iframe.
- **Andy’s Apple Farm:** `favicon.png` is absent. Its local `index.js`, `runner.js`, runner data/WASM and nine `game.unx.part` chunks exist; the split-loading logic was not runtime-tested.

## External/offline warnings
Remote game code/assets or iframes remain in **10 Minutes Till Dawn, 12 Mini Battles, Amaze, Amazing Rope Police, Among Us, An Ordinary Sonic ROM Hack, Angry Birds Chrome, Aviamasters, Kindergarten 3, and Smash Karts**. These are not classified as malformed HTML. They require network access; Aviamasters also uses a remote game/server API. No game is certified offline or working.

## Branch review
- Requested `html-error-audit-fixes-2026-11-10`: **not found**.
- Existing `html-error-audit-fixes-2026-11-22`: diverged (**main ahead 26; branch ahead 4**). I ported only the Google Gnomes path corrections.
- The old branch's Brotato local-base change was **not ported**: its local mirror contains `index.js`, `main.js`, icons and PNG, but not `index.pck` or `index.wasm`; changing the base to that incomplete mirror would break game loading.

## Verification and safety
- Google Gnomes: 19 root-path matches reduced to 0; manifest's six stale path prefixes reduced to 0.
- Angry Birds Chrome: corrected relative image path confirmed; upstream image exists.
- The three added titles are each present exactly once.
- Branch was based on current `main`; all updates were branch-scoped. **No main changes, game deletions, or backup overwrites.**
- Runtime/browser testing remains unresolved.
