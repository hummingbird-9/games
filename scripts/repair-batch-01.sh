#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cd "$ROOT"

clone_at_commit() {
  local repo="$1"
  local sha="$2"
  local dest="$3"
  git clone --quiet "https://github.com/${repo}.git" "$dest"
  git -C "$dest" checkout --quiet --detach "$sha"
  local actual
  actual="$(git -C "$dest" rev-parse HEAD)"
  if [[ "$actual" != "$sha" ]]; then
    echo "Pinned source mismatch for $repo: expected $sha, got $actual" >&2
    exit 1
  fi
}

echo "=== Fetch pinned, license-cleared source builds ==="
clone_at_commit "NANTI34/baldis-basics" "cb3dc94b41450983f87bfb7b4003ba03f512928d" "$TMP/baldi"
clone_at_commit "iliagrigorevdev/bowlingonline2" "4c57de11ba4d2013fbbbc0443be8de9999edbd5e" "$TMP/bowling"

echo "=== Stage complete local game files ==="
mkdir -p "Baldi's Basics" "3D Bowling"
rsync -a --exclude='.git' "$TMP/baldi/" "Baldi's Basics/"
rsync -a --exclude='.git' "$TMP/bowling/" "3D Bowling/"

# Remove social-preview metadata URLs from the bowling page; runtime files remain upstream.
python3 - <<'PY'
from pathlib import Path
p = Path("3D Bowling/index.html")
s = p.read_text()
s = s.replace('content="https://iliagrigorevdev.github.io/bowlingonline2/"', 'content="./"')
s = s.replace('content="https://iliagrigorevdev.github.io/bowlingonline2/icon.png"', 'content="icon.png"')
p.write_text(s)
PY

echo "=== Remove empty or non-redistributable remote-only entries ==="
git rm -r --ignore-unmatch --   "Bowmasters"   "Basketball Stars"   "Bank Robbery"   "Lazy Jumper"   "Racing Limits"   "Slice it All"

echo "=== Run offline browser and source tests ==="
mkdir -p artifacts
node scripts/verify-batch-01.mjs > "$TMP/verification.json" || true
if [[ ! -s "$TMP/verification.json" ]]; then
  printf '{"baldi":{"ok":false,"notes":["No verification output"]},"bowling":{"ok":false,"notes":["No verification output"]},"harness":{"ok":false}}\n' > "$TMP/verification.json"
fi
cp "$TMP/verification.json" artifacts/verification.json

BALDI_OK="$(python3 - "$TMP/verification.json" <<'PY'
import json, sys
try:
    print("1" if json.load(open(sys.argv[1])).get("baldi", {}).get("ok") else "0")
except Exception:
    print("0")
PY
)"
BOWLING_OK="$(python3 - "$TMP/verification.json" <<'PY'
import json, sys
try:
    print("1" if json.load(open(sys.argv[1])).get("bowling", {}).get("ok") else "0")
except Exception:
    print("0")
PY
)"

if [[ "$BALDI_OK" != "1" ]]; then
  echo "Baldi's Basics failed verification; removing the unverified replacement."
  rm -rf "Baldi's Basics"
fi
if [[ "$BOWLING_OK" != "1" ]]; then
  echo "Precise Bowling failed verification; removing the unverified replacement."
  rm -rf "3D Bowling"
fi

BALDI_FILES="$(find "Baldi's Basics" -type f 2>/dev/null | wc -l | tr -d ' ')"
BOWLING_FILES="$(find "3D Bowling" -type f 2>/dev/null | wc -l | tr -d ' ')"

python3 - "$TMP/verification.json" "$BALDI_OK" "$BOWLING_OK" "$BALDI_FILES" "$BOWLING_FILES" <<'PY'
import json, sys
from pathlib import Path

verification_path, baldi_ok, bowling_ok, baldi_files, bowling_files = sys.argv[1:]
try:
    v = json.loads(Path(verification_path).read_text())
except Exception as e:
    v = {"baldi": {"notes": [f"Could not parse verification output: {e}"]},
         "bowling": {"notes": [f"Could not parse verification output: {e}"]},
         "harness": {"ok": False}}

def notes(key):
    return v.get(key, {}).get("notes", ["No test evidence recorded"])

lines = [
    "# Offline game repair — batch 01 (2026-11-16)",
    "",
    "This batch was limited to eight folders whose index files were empty or whose entries had no runnable local game build. No other game folders were changed.",
    "",
    "## Replacements and verification",
    "",
]
if baldi_ok == "1":
    lines += [
        "### Baldi's Basics — verified fixed",
        "- Source: https://github.com/NANTI34/baldis-basics",
        "- Source commit: cb3dc94b41450983f87bfb7b4003ba03f512928d (2026-08-17)",
        "- License: MIT. The upstream README identifies this as an unofficial fan recreation, states its code/art/audio are original recreations, and disclaims affiliation with mystman12.",
        f"- Files: complete upstream project copied ({baldi_files} files in the resulting folder, including the pre-existing cover).",
        "- Verification:",
    ] + [f"  - {n}" for n in notes("baldi")] + [""]
else:
    lines += [
        "### Baldi's Basics — removed after failed verification",
        "- Source candidate: https://github.com/NANTI34/baldis-basics (MIT, unofficial fan recreation).",
        "- The candidate did not pass the required offline browser and gameplay checks, so the unverified replacement was removed rather than left in the collection.",
        "- Verification evidence:",
    ] + [f"  - {n}" for n in notes("baldi")] + [""]

if bowling_ok == "1":
    lines += [
        "### 3D Bowling entry — replaced with Precise Bowling; verified fixed",
        "- Source: https://github.com/iliagrigorevdev/bowlingonline2",
        "- Source commit: 4c57de11ba4d2013fbbbc0443be8de9999edbd5e (2026-01-07)",
        "- License: GPL-3.0; upstream LICENSE included.",
        "- Important: this is the upstream game's distinct title, Precise Bowling, used as an offline bowling replacement; it is not represented as the original commercial 3D Bowling release.",
        f"- Files: complete upstream web build copied ({bowling_files} files in the resulting folder, including the pre-existing cover).",
        "- External Open Graph preview URLs were changed to local metadata; runtime code and assets were not replaced with a launcher.",
        "- Verification:",
    ] + [f"  - {n}" for n in notes("bowling")] + [""]
else:
    lines += [
        "### 3D Bowling — removed after failed verification",
        "- Source candidate: https://github.com/iliagrigorevdev/bowlingonline2 (GPL-3.0).",
        "- The candidate did not pass the required offline browser and gameplay checks, so the unverified replacement was removed.",
        "- Verification evidence:",
    ] + [f"  - {n}" for n in notes("bowling")] + [""]

lines += [
    "## Removed as unrecoverable",
    "",
    "- Bowmasters — empty index file; no license-cleared source build or authorized offline web port found.",
    "- Basketball Stars — empty index file; GitHub search surfaced only an unrelated aggregator, not a licensed source build.",
    "- Bank Robbery — empty index file; the browser release is attributed to justaliendev, but no redistributable source/build was found.",
    "- Lazy Jumper — empty index file; the browser release is attributed to Seryas Games, but no redistributable source/build was found.",
    "- Racing Limits — empty index file; the GitHub candidate found was a Python/Pygame desktop project, not a browser port of the original game.",
    "- Slice it All — empty index file; the only source candidate found was an unlicensed prototype, not a redistributable browser build.",
    "",
    "## Protected entries",
    "",
    "Do-Not-Take-This-Cat-Home and 20 Minutes Till Dawn were absent from the current main tree at the start of this run; neither path was created, edited, or deleted.",
    "",
    "## Remaining unresolved candidates",
    "",
    "The next source/offline audit should prioritize 1v1.LoL, 8 Ball Pool, 99 Balls, Achievement Unlocked, Achievement Unlocked 2, Adventure Capatalist, Ages of Conflict, Angry Birds, Angry Birds Chrome, Angry Birds Showdown, Aquapark.io, Attack Hole, Aviamasters, Awesome Tanks, Backrooms, Bank Robbery 2, Basketball Frvr, BitLife, Block Blast, BlockPost, Blocky Snakes, Bloons TD 2, Bloons TD 4, and Bloxorz.",
    "",
    "Static inspection shows remote CDN/base-URL dependencies, missing SWF/Unity payloads, or incomplete local launchers in these candidates. They were not changed in this batch because each needs an individual source/license review and offline verification.",
    "",
    "## Batch scope",
    "",
    "- One non-empty batch processed: 8 game folders.",
    "- Batches 2 and 3 were not run; they are not reported as completed.",
    "- No game is counted as fixed unless its offline browser and basic gameplay checks passed.",
    "",
]
Path("repair-reports").mkdir(exist_ok=True)
Path("repair-reports/2026-11-16-batch-01.md").write_text("\n".join(lines))
PY

echo "=== Commit one batch directly to main ==="
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A --   "3D Bowling"   "Baldi's Basics"   "Bowmasters"   "Basketball Stars"   "Bank Robbery"   "Lazy Jumper"   "Racing Limits"   "Slice it All"   repair-reports

if git diff --cached --quiet; then
  echo "No batch changes to commit."
  exit 0
fi

git commit -m "Repair offline game batch 1 — 2026-11-16"
git fetch origin main
if [[ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]]; then
  git rebase origin/main
fi
git push origin HEAD:main
echo "BATCH_01_COMMIT=$(git rev-parse HEAD)"
echo "BALDI_VERIFIED=$BALDI_OK"
echo "BOWLING_VERIFIED=$BOWLING_OK"
