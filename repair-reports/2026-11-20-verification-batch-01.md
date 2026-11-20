# Offline game verification — November 20, 2026

## Summary

- **Game folders changed:** 0
- **New replacements verified fixed:** 0
- **Removed as unrecoverable:** 0
- **Existing offline builds verified:** 1 full gameplay build (8 Ball Pool), plus 1 Unity build verified through offline startup and entry into a single-game frame (3D Bowling).
- **Current root:** 211 game directories (214 root directories including .github, repair-reports, scripts).
- The two protected names were absent from the root listing and were not touched.

No game-repair batches were committed today. The commits below are test infrastructure and diagnostics only, not replacements or deletions.

## 8 Ball Pool — full offline gameplay PASS

### Provenance
- Upstream: https://github.com/fraternebahirwe/pool-game-2026
- Upstream current main commit checked: `c789f518f227e7ecdd49d7dab8ed9245089fee84`
- The repository's 88,815-byte `index.html` matches upstream `index.html` byte-for-byte.
- MIT license. Single-file Canvas/vanilla JavaScript; no dependencies.

### Browser test
Run: https://github.com/hummingbird-9/games/actions/runs/44795987086

With external requests blocked, Chromium/Playwright:
- menu rendered
- bot match reached
- cue ball placement confirmed
- aiming input exercised
- keyboard power set and shot triggered
- canvas changed after shot
- zero external requests, local HTTP errors, request failures, page errors, or console errors

This is an **already-present build newly verified playable offline**, not a game repair or import.

## 3D Bowling — offline startup and basic interaction PASS; full play not certified

### Provenance
- Upstream: https://github.com/iliagrigorevdev/bowlingonline2
- Upstream current main commit checked: `4c57de11ba4d2013fbbbc0443be8de9999edbd5e`
- Exact Git blob SHA comparisons confirmed that `BowlingOnline2.data`, `BowlingOnline2.js`, `BowlingOnline2.wasm`, and `LICENSE` match upstream. The local `index.html` differs.
- GPL-3.0.

### Offline browser evidence
Final test run: https://github.com/hummingbird-9/games/actions/runs/44796763369

- Unity canvas initialized at 1280×800 and rendered a nonblank screenshot.
- Local JS, `.data`, and `.wasm` all returned HTTP 200.
- No external requests, local HTTP errors, or JavaScript page errors.
- Single Game, Play Frame 1, and Skip tutorial were clicked; screenshots reached the bowling lane and showed the ball/pins.
- A drag from the ball area toward the pins and Space were attempted. The after-input screenshot visually shows the camera/ball advancing down the lane.
- The canvas `toDataURL()` comparisons remained unchanged, so no automated pixel-diff or pinfall/score evidence was established. Full gameplay remains **not certified**.

The test initially failed twice because the harness misclassified a canceled duplicate data request and the `pd 0.55.0` engine diagnostic as fatal. The successful runs separated those diagnostics from actual network/page failures. No game files were changed to achieve the pass.

## Test artifacts

- Final successful run and screenshots: https://github.com/hummingbird-9/games/actions/runs/44796763369/artifacts/14657674323
- Pool gameplay screenshot: `8-ball-pool-gameplay.png`
- Bowling screenshots: `3d-bowling-loaded.png`, `3d-bowling-after-single-game.png`, `3d-bowling-frame1.png`, `3d-bowling-after-skip.png`, `3d-bowling-after-input.png`
- Results JSON: `offline-existing-games-results.json`

## Source research — next unresolved candidates

| Game | Finding |
|---|---|
| Fruit Ninja | MIT clones exist, but the checked options either have no license or state that third-party assets are not theirs; not safe to import as a complete build. |
| Bloxorz | Found Apache-2.0 source, but it is a desktop OpenGL/C++ project, not a web build. No replacement imported. |
| The World's Hardest Game | Found an HTML5 recreation, but no license was identified. Original SWF is absent. |
| Recoil | No legitimate redistributable offline build found; current launcher relies on hosted resources. |
| Slope | Missing Unity payload; proprietary game assets. |
| Schoolboy Runaway | Incomplete Unity assets and no licensed offline source identified. |
| Idle Mining Empire | Chrome extension listing claims offline play, but no redistributable source/license found for the game build. |
| Bit Planes | Online multiplayer/service dependency; no authorized standalone offline build identified. |
| BitLife | Proprietary game and online services; no authorized offline source. |
| Bloons TD 2 / 4 | Missing SWF game payloads; no redistribution-cleared sources. |
| Duck Life / Duck Life 2 | Missing SWFs; no redistribution-cleared offline builds. |
| Learn to Fly 1 / 2 / 3 | Missing SWFs; no redistribution-cleared offline builds. |
| Plants vs Zombies | Missing SWF; no redistributable source. |
| Raft Wars / Raft Wars 2 | Missing SWFs; no redistributable sources. |
| Super Mario 63 | Missing SWF and Nintendo-owned assets. |
| This Is The Only Level | Missing SWF; no redistribution-cleared source identified. |

These remain unresolved, not automatically removed. Each will require game-specific review before any deletion.

## Commits to main

These were test-harness/reporting commits; **none are game batches**:

1. `e65f668b` — initial offline verification workflow and report: https://github.com/hummingbird-9/games/commit/e65f668b
2. `61ba1ea7` — corrected verification script syntax: https://github.com/hummingbird-9/games/commit/61ba1ea7
3. `5c3b91ab` — refined Bowling startup diagnostics: https://github.com/hummingbird-9/games/commit/5c3b91ab
4. `c4e18491` — probe Single Game and Play Frame 1: https://github.com/hummingbird-9/games/commit/c4e18491
5. `7f4087c2` — probe tutorial skip and throw input: https://github.com/hummingbird-9/games/commit/7f4087c2

The test workflow is at `.github/workflows/verify-offline-existing-games-2026-11-20.yml`, and the script is at `scripts/verify-offline-existing-games-2026-11-20.mjs`.

## Protected entries
- `Do-Not-Take-This-Cat-Home`: absent from the root listing; not touched.
- `20 Minutes Till Dawn`: absent from the root listing; not touched.

## Conclusion

8 Ball Pool is now confirmed playable offline, and 3D Bowling's complete local package starts and reaches the bowling lane without network access. No game replacement/removal was made because no new eligible repair could be completed with the available source-download and browser-verification constraints.
