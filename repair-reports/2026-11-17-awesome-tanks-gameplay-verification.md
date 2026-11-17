# Awesome Tanks — gameplay verification addendum (2026-11-17)

The earlier batch 03 report left Awesome Tanks pending because its initial menu-only test was a false positive. This follow-up uses the actual level-1 flow.

## Result

- The MIT Phaser build remains entirely local.
- The browser reached the title screen, difficulty selection, level select, and level 1.
- The controls tutorial was closed, then W and a mouse input were sent during the level.
- The resulting screenshot shows the live map, tank, weapon HUD, and the in-level “destroy these blocks” instruction rather than a menu or loading screen.
- Comparing the post-tutorial screenshot with the gameplay-input screenshot showed a 331,988-pixel visual change, including a changed tank position/orientation and gameplay scene.
- The earlier browser run recorded zero external requests, zero failed local requests, and zero page/console errors.

**Status:** count Awesome Tanks as a verified working offline game. This verifies that level 1 runs and responds visually to input; it is not a full test of every weapon, level, or win condition.

The diagnostic screenshots are retained as the GitHub Actions artifact from run 43940785572: https://github.com/hummingbird-9/games/actions/runs/43940785572
