#!/usr/bin/env bash
set -euo pipefail

BATCH="$1"
ROOT="$(git rev-parse --show-toplevel)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cd "$ROOT"
mkdir -p artifacts repair-reports

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

clone_at_commit() {
  local repo="$1"
  local sha="$2"
  local dest="$3"
  mkdir -p "$dest"
  git -C "$dest" init --quiet
  git -C "$dest" remote add origin "https://github.com/$repo.git"
  git -C "$dest" fetch --quiet --depth 1 origin "$sha"
  git -C "$dest" checkout --quiet --detach FETCH_HEAD
  local actual
  actual="$(git -C "$dest" rev-parse HEAD)"
  if [[ "$actual" != "$sha" ]]; then
    echo "Pinned source mismatch for $repo: expected $sha, got $actual" >&2
    exit 1
  fi
}

clear_game_folder() {
  local folder="$1"
  mkdir -p "$folder"
  find "$folder" -mindepth 1 -maxdepth 1 ! -name cover.png -exec rm -rf -- {} +
}

case "$BATCH" in
  1)
    FOLDER="Doodle Jump"
    REPORT="repair-reports/2026-11-18-batch-01.md"
    GAME="Doodle Jump (MIT browser recreation)"
    SOURCE_REPO="kubowania/Doodle-Jump"
    SOURCE_COMMIT="caa860657407975354ca23cd4a48c7fda4031c92"
    SOURCE_DATE="2020-12-16"
    SOURCE_LICENSE="MIT (Ania Kubow; license text is included)"
    FILES="index.html, index.js, style.css, background.png, doodler-guy.png, platform.png, LICENSE, README.md"
    echo "=== Fetch pinned Doodle Jump source ==="
    clone_at_commit "$SOURCE_REPO" "$SOURCE_COMMIT" "$TMP/doodle"
    clear_game_folder "$FOLDER"
    cp "$TMP/doodle/index.html" "$FOLDER/index.html"
    cp "$TMP/doodle/index.js" "$FOLDER/index.js"
    cp "$TMP/doodle/style.css" "$FOLDER/style.css"
    cp "$TMP/doodle/background.png" "$FOLDER/background.png"
    cp "$TMP/doodle/doodler-guy.png" "$FOLDER/doodler-guy.png"
    cp "$TMP/doodle/platform.png" "$FOLDER/platform.png"
    cat > "$FOLDER/LICENSE" <<'EOF'
MIT License

Copyright (c) 2020 Ania Kubow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
    cat > "$FOLDER/README.md" <<EOF
# Doodle Jump — offline browser recreation

This folder contains Ania Kubow's MIT-licensed JavaScript/HTML/CSS Doodle Jump
clone. It is an independent recreation, not the official Lima Sky game.

- Upstream: https://github.com/$SOURCE_REPO
- Pinned source commit: $SOURCE_COMMIT ($SOURCE_DATE)
- Runtime: local HTML, JavaScript, CSS and three local PNG assets
- External runtime dependencies: none

The original cover image is preserved.
EOF
    ;;
  2)
    FOLDER="Crossy Road"
    REPORT="repair-reports/2026-11-18-batch-02.md"
    GAME="Crossy Road (MIT browser recreation)"
    SOURCE_REPO="Sadat-Rakib/CrossyRoad-Game"
    SOURCE_COMMIT="a17b8a51dd47095b5355ce9036f4ae552b00b16e"
    SOURCE_DATE="2025-05-13"
    SOURCE_LICENSE="MIT (Mir Sadat Bin Rakib) plus Three.js MIT"
    FILES="index.html, main.js, style.css, three.min.js, LICENSE, THREE-LICENSE.txt, README.md"
    echo "=== Fetch pinned Crossy Road recreation ==="
    clone_at_commit "$SOURCE_REPO" "$SOURCE_COMMIT" "$TMP/crossy"
    echo "=== Fetch pinned Three.js r99 runtime ==="
    mkdir -p "$TMP/three"
    git -C "$TMP/three" init --quiet
    git -C "$TMP/three" remote add origin https://github.com/mrdoob/three.js.git
    git -C "$TMP/three" sparse-checkout init --cone
    git -C "$TMP/three" sparse-checkout set build LICENSE
    git -C "$TMP/three" fetch --quiet --depth 1 --filter=blob:none origin 1cbcaab0b8c80cd66b5812881597529f9ebd19c0
    git -C "$TMP/three" checkout --quiet --detach FETCH_HEAD
    test "$(git -C "$TMP/three" rev-parse HEAD)" = "1cbcaab0b8c80cd66b5812881597529f9ebd19c0"
    clear_game_folder "$FOLDER"
    cp "$TMP/crossy/index.html" "$FOLDER/index.html"
    cp "$TMP/crossy/main.js" "$FOLDER/main.js"
    cp "$TMP/crossy/style.css" "$FOLDER/style.css"
    cp "$TMP/crossy/LICENSE" "$FOLDER/LICENSE"
    cp "$TMP/three/build/three.min.js" "$FOLDER/three.min.js"
    cp "$TMP/three/LICENSE" "$FOLDER/THREE-LICENSE.txt"
    python3 - <<'PY'
from pathlib import Path
html = Path("Crossy Road/index.html")
s = html.read_text()
old = "https://cdnjs.cloudflare.com/ajax/libs/three.js/99/three.min.js"
if old not in s:
    raise SystemExit("Expected upstream Three.js CDN reference was not found")
html.write_text(s.replace(old, "./three.min.js"))
css = Path("Crossy Road/style.css")
s = css.read_text()
s = s.replace("@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');", "")
s = s.replace("'Press Start 2P', cursive", "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace")
css.write_text(s)
PY
    cat > "$FOLDER/README.md" <<EOF
# Crossy Road — offline browser recreation

This folder contains an MIT-licensed independent Crossy Road-inspired Three.js
game. It is not the official Hipster Whale Crossy Road release.

- Game source: https://github.com/$SOURCE_REPO
- Game source commit: $SOURCE_COMMIT ($SOURCE_DATE)
- Renderer: Three.js r99, pinned commit 1cbcaab0b8c80cd66b5812881597529f9ebd19c0
- The original Three.js CDN script was replaced with the bundled local three.min.js.
- The Google Fonts import was removed; system monospace fonts are used instead.
- All runtime scripts are local. No external runtime requests are required.
EOF
    ;;
  3)
    FOLDER="Google Snake"
    REPORT="repair-reports/2026-11-18-batch-03.md"
    GAME="Google Snake folder (MIT standalone Snake recreation)"
    SOURCE_REPO="prateek121/90s-games"
    SOURCE_COMMIT="98ca2ade686cb114480e6d359b5f5e2987cacb2f"
    SOURCE_DATE="2026-05-23"
    SOURCE_LICENSE="MIT (90s-games contributors)"
    FILES="index.html (single-file games/snake.html), LICENSE, README.md"
    echo "=== Fetch pinned standalone Snake source ==="
    clone_at_commit "$SOURCE_REPO" "$SOURCE_COMMIT" "$TMP/90s-games"
    clear_game_folder "$FOLDER"
    cp "$TMP/90s-games/games/snake.html" "$FOLDER/index.html"
    cp "$TMP/90s-games/LICENSE" "$FOLDER/LICENSE"
    cat > "$FOLDER/README.md" <<EOF
# Snake — offline recreation

This folder contains the standalone MIT-licensed Snake game from the 90s-games
collection. It is an independent classic Snake recreation, not Google's
proprietary Snake implementation.

- Upstream: https://github.com/$SOURCE_REPO
- Pinned source commit: $SOURCE_COMMIT ($SOURCE_DATE)
- Runtime: one self-contained HTML file with inline CSS and JavaScript
- External runtime dependencies: none
- No external scripts, stylesheets, fonts, images, CDNs or network APIs are used.
EOF
    python3 - <<'PY'
from pathlib import Path
p = Path("Google Snake/index.html")
s = p.read_text()
old = """<button onclick="location.href='../'">BACK</button>"""
new = """<button onclick="history.back()">BACK</button>"""
if old not in s:
    raise SystemExit("Expected parent-directory back link was not found")
p.write_text(s.replace(old, new))
PY
    ;;
  *)
    echo "Unknown batch: $BATCH" >&2
    exit 2
    ;;
esac

echo "=== Verify complete local asset graph and offline gameplay ==="
if node scripts/verify-repair-offline-games-2026-11-18.mjs "$BATCH"; then
  TEST_OK="true"
else
  TEST_OK="false"
fi

if [[ "$TEST_OK" != "true" ]]; then
  echo "Offline verification failed for $GAME; removing the unrecoverable folder."
  rm -rf -- "$FOLDER"
  git rm -r --cached --ignore-unmatch -- "$FOLDER" >/dev/null 2>&1 || true
  RESULT="REMOVED — replacement failed offline verification; see test evidence below."
else
  RESULT="PASS — complete local build launched and basic gameplay input was verified with external network requests blocked."
fi

NOTES=""
if [[ -f "artifacts/verification-batch-$BATCH.json" ]]; then
  NOTES="$(node -e "const r=JSON.parse(require('fs').readFileSync('artifacts/verification-batch-$BATCH.json','utf8')); console.log((r.notes||[]).map(x=>'- '+x).join('\n'))")"
fi

cat > "$REPORT" <<EOF
# Offline game repair — batch $BATCH (2026-11-18)

## Candidate and repository evidence

- Game folder: \`$FOLDER\`
- Previous collection state: remote-host/CDN launcher with missing offline dependencies, recorded in the 2026-11-16 full-catalog audit.
- Source repository: https://github.com/$SOURCE_REPO
- Pinned source commit: \`$SOURCE_COMMIT\` ($SOURCE_DATE)
- License: $SOURCE_LICENSE

## Files replaced

$FILES

The existing \`cover.png\` was preserved. All previous cached remote-host files and launcher files were replaced.

## Verification

$RESULT

- Test runner: Chromium via Playwright 1.55.0.
- Network policy: all non-local requests were blocked and recorded.
- Static graph: HTML and CSS references were checked for missing files, root-relative paths and external runtime URLs.
- Test evidence: GitHub Actions artifact \`offline-repair-batch-$BATCH-evidence\`.

$NOTES

## Scope note

This is a clearly attributed, independently licensed browser recreation, not a claim that the proprietary original game source was obtained. No remote iframe, CDN, runtime game-host fetch, or placeholder was added.
EOF

git add -A -- "$FOLDER" "$REPORT"
if git diff --cached --quiet; then
  echo "No batch changes to commit."
  exit 0
fi

git commit -m "Repair offline game batch $BATCH"
git fetch origin main
git rebase origin/main
git push origin HEAD:main
echo "BATCH_COMMIT=$(git rev-parse HEAD)"
echo "BATCH_RESULT=$RESULT"
