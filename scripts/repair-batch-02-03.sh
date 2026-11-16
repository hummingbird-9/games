#!/usr/bin/env bash
set -euo pipefail

BATCH="${BATCH:-2}"
ROOT="$(git rev-parse --show-toplevel)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cd "$ROOT"

clone_at_commit() {
  local repo="$1"
  local sha="$2"
  local dest="$3"
  git clone --quiet --depth 1 "https://github.com/${repo}.git" "$dest"
  git -C "$dest" checkout --quiet --detach "$sha"
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
  find "$folder" -mindepth 1 -maxdepth 1 ! -name cover.png -exec rm -rf {} +
}

mkdir -p artifacts repair-reports

if [[ "$BATCH" == "2" ]]; then
  echo "=== Fetch four pinned MIT offline game builds ==="
  clone_at_commit "aussiescupper/backrooms" "fca4090c5e84aad98511e013e0b32b64076a0fee" "$TMP/backrooms"
  clone_at_commit "fraternebahirwe/pool-game-2026" "c789f518f227e7ecdd49d7dab8ed9245089fee84" "$TMP/pool"
  clone_at_commit "dslord/Angry-Birds" "20c6b6c84e8d5a7dbd87212571ee4db46a49ef26" "$TMP/angry"
  clone_at_commit "opengames-dev/opengames-dev.github.io" "930244aaaf13e029aae4dfd6900dee38a55af5d5" "$TMP/opengames"

  echo "=== Stage complete local builds ==="
  clear_game_folder "Backrooms"
  cp "$TMP/backrooms/backrooms-standalone.html" "Backrooms/index.html"
  cp "$TMP/backrooms/LICENSE" "Backrooms/LICENSE"

  clear_game_folder "8 Ball Pool"
  cp "$TMP/pool/index.html" "8 Ball Pool/index.html"
  cp "$TMP/pool/LICENSE" "8 Ball Pool/LICENSE"
  cp "$TMP/pool/README.md" "8 Ball Pool/README.md"

  clear_game_folder "Angry Birds"
  rsync -a --exclude='.git' "$TMP/angry/" "Angry Birds/"
  cp "$TMP/angry/assets/Preview1.png" "Angry Birds/cover.png"

  clear_game_folder "Blocky Snakes"
  mkdir -p "Blocky Snakes/shared"
  cp "$TMP/opengames/snake/index.html" "Blocky Snakes/index.html"
  cp "$TMP/opengames/snake/game.js" "Blocky Snakes/game.js"
  cp "$TMP/opengames/snake/logic.js" "Blocky Snakes/logic.js"
  cp -a "$TMP/opengames/shared/." "Blocky Snakes/shared/"
  cp "$TMP/opengames/LICENSE" "Blocky Snakes/LICENSE"
  python3 - <<'PY'
from pathlib import Path
p = Path("Blocky Snakes/index.html")
s = p.read_text()
s = s.replace("../shared/", "./shared/")
s = s.replace('href="../index.html"', 'href="#main"')
p.write_text(s)
PY

  echo "=== Remove entries with no licensed offline-capable build ==="
  git rm -r --ignore-unmatch -- \
    "1v1.LoL" \
    "99 Balls" \
    "Achievement Unlocked" \
    "Achievement Unlocked 2" \
    "Adventure Capatalist"

elif [[ "$BATCH" == "3" ]]; then
  echo "=== Fetch pinned MIT Awesome Tanks HTML5 build ==="
  clone_at_commit "d4vucat/AwesomeTanks" "9382b746dc23d6af13c432c0b921320858d0e724" "$TMP/awesome"

  echo "=== Stage complete local game files ==="
  clear_game_folder "Awesome Tanks"
  rsync -a --exclude='.git' "$TMP/awesome/" "Awesome Tanks/"

  # Remove the portal analytics beacon and parent-frame keyboard bridge.
  python3 - <<'PY'
import re
from pathlib import Path
p = Path("Awesome Tanks/index.html")
s = p.read_text()
s = re.sub(
    r'<script[^>]+src=["\']https://static\.cloudflareinsights\.com/[^"\']+["\'][^>]*>\s*</script>',
    '',
    s,
    flags=re.I | re.S,
)
s = re.sub(r'<script>\s*function fnSendMsg\(evt\)\s*\{.*?</script>', '', s, flags=re.I | re.S)
p.write_text(s)
PY

  echo "=== Remove entries without an authorized offline source build ==="
  git rm -r --ignore-unmatch -- \
    "Ages of Conflict" \
    "Angry Birds Showdown" \
    "Aquapark.io" \
    "Attack Hole" \
    "Aviamasters" \
    "Bank Robbery 2" \
    "Basketball Frvr"
else
  echo "BATCH must be 2 or 3, got: $BATCH" >&2
  exit 2
fi

echo "=== Run local asset graph and offline browser/gameplay tests ==="
node scripts/verify-batch-02-03.mjs "$BATCH" > "$TMP/verification.stdout" || true
VERIFICATION="artifacts/batch-$(printf '%02d' "$BATCH")-verification.json"
if [[ ! -s "$VERIFICATION" ]]; then
  printf '{"harness":{"ok":false,"notes":["Verifier produced no result"]}}\n' > "$VERIFICATION"
fi

get_ok() {
  python3 - "$VERIFICATION" "$1" <<'PY'
import json, sys
try:
    data = json.load(open(sys.argv[1]))
    print("1" if data.get(sys.argv[2], {}).get("ok") else "0")
except Exception:
    print("0")
PY
}

if [[ "$BATCH" == "2" ]]; then
  BACKROOMS_OK="$(get_ok backrooms)"
  POOL_OK="$(get_ok pool)"
  ANGRY_OK="$(get_ok angryBirds)"
  SNAKE_OK="$(get_ok snake)"
  [[ "$BACKROOMS_OK" == "1" ]] || rm -rf "Backrooms"
  [[ "$POOL_OK" == "1" ]] || rm -rf "8 Ball Pool"
  [[ "$ANGRY_OK" == "1" ]] || rm -rf "Angry Birds"
  [[ "$SNAKE_OK" == "1" ]] || rm -rf "Blocky Snakes"
else
  TANKS_OK="$(get_ok awesomeTanks)"
  [[ "$TANKS_OK" == "1" ]] || rm -rf "Awesome Tanks"
fi

echo "=== Write per-game provenance and verification report ==="
python3 - "$BATCH" "$VERIFICATION" <<'PY'
import json, sys
from pathlib import Path

batch = int(sys.argv[1])
verification_path = Path(sys.argv[2])
try:
    v = json.loads(verification_path.read_text())
except Exception as e:
    v = {"harness": {"ok": False, "notes": ["Could not parse verifier output: " + str(e)]}}

def count_files(folder):
    p = Path(folder)
    return sum(1 for x in p.rglob("*") if x.is_file()) if p.exists() else 0

def game_result(key):
    return v.get(key, {}) if isinstance(v, dict) else {}

def notes(key):
    value = game_result(key).get("notes", [])
    if isinstance(value, list):
        return value
    return [str(value)]

def add_replacement(lines, folder, key, source, commit, date, license_name, files_note):
    result = game_result(key)
    ok = bool(result.get("ok")) and Path(folder).exists()
    lines += [
        "### " + folder + (" — verified fixed" if ok else " — not accepted"),
        "- Source: " + source,
        "- Source commit: " + commit + " (" + date + ")",
        "- License: " + license_name,
        "- Files: " + files_note + " (" + str(count_files(folder)) + " files in the resulting folder, including any retained cover).",
    ]
    if ok:
        lines += ["- Verification:"] + ["  - " + str(x) for x in notes(key)]
    else:
        lines += ["- The replacement did not pass the required offline browser/gameplay checks and was removed rather than left as a broken entry."]
        lines += ["- Verification evidence:"] + ["  - " + str(x) for x in notes(key)]
    lines.append("")

if batch == 2:
    lines = [
        "# Offline game repair — batch 02 (2026-11-16)",
        "",
        "This batch processed nine existing folders. Four complete, license-cleared offline game builds were staged; five remote-only or unlicensed entries were removed. A replacement counts as fixed only if its browser/gameplay test passed.",
        "",
        "## Replacements and verification",
        "",
    ]
    add_replacement(lines, "Backrooms", "backrooms", "https://github.com/aussiescupper/backrooms", "fca4090c5e84aad98511e013e0b32b64076a0fee", "2026-08-22", "MIT", "single-file standalone HTML game plus upstream LICENSE; the standalone file contains its gameplay code, procedural art and synthesized audio")
    add_replacement(lines, "8 Ball Pool", "pool", "https://github.com/fraternebahirwe/pool-game-2026", "c789f518f227e7ecdd49d7dab8ed9245089fee84", "2026-09-27", "MIT", "single-file HTML5 Canvas/JavaScript game, README and LICENSE; no runtime libraries or external assets")
    add_replacement(lines, "Angry Birds", "angryBirds", "https://github.com/dslord/Angry-Birds", "20c6b6c84e8d5a7dbd87212571ee4db46a49ef26", "2026-08-29", "MIT", "complete p5.js/Matter.js game, local libraries, Game scripts, sprites, sounds-capable runtime and LICENSE; source preview image used as cover")
    add_replacement(lines, "Blocky Snakes", "snake", "https://github.com/opengames-dev/opengames-dev.github.io", "930244aaaf13e029aae4dfd6900dee38a55af5d5", "2026-10-09", "MIT", "complete OpenGames Snake replacement: page, gameplay and logic modules, shared local UI/input/audio/styles/favicon, and LICENSE; relative paths adjusted for this folder")
    lines += [
        "## Removed as unrecoverable",
        "",
        "- 1v1.LoL — existing launcher loads Unity WebGL and Firebase authentication/Firestore code from jsDelivr; its multiplayer/account services require network access, and no license-cleared offline source build was found.",
        "- 99 Balls — existing entry is a Flash/SWF wrapper with third-party Ruffle/game scripts; no redistribution license or authorized offline source build for the original game was found.",
        "- Achievement Unlocked — the entry points to an extracted SWF in a third-party game aggregator; no license-cleared source/build for redistribution was found.",
        "- Achievement Unlocked 2 — same issue as Achievement Unlocked: extracted Flash payload, no authorized source or redistribution license.",
        "- Adventure Capatalist — cached Unity WebGL files originate from an archived game collection; the commercial AdVenture Capitalist game has no license-cleared offline source build in the candidate sources.",
        "",
        "## Remaining unresolved candidates",
        "",
        "- Ages of Conflict — commercial Unity game; the local folder contains a third-party cached WebGL wrapper, not a redistributable source build.",
        "- Angry Birds Chrome — original Rovio game; the available HTML5 source candidate is unofficial and has no verified redistribution license.",
        "- Angry Birds Showdown — extracted YouTube Playables assets; no source license or authorized offline build found.",
        "- Aquapark.io — commercial game assets cached from a YouTube Playable; no redistribution license.",
        "- Attack Hole — extracted PlayCanvas/YouTube Playables payload; no redistribution license.",
        "- Aviamasters — BGaming demo uses remote API and WebSocket services and cannot run offline.",
        "- Awesome Tanks — queued for batch 03 source/license review and offline testing.",
        "- Bank Robbery 2 — third-party cached Unity payload with no source license or authorized redistribution terms.",
        "- Basketball Frvr — extracted YouTube Playable assets without a redistribution license.",
        "- BitLife — commercial title; cached Unity build has no authorized offline source license.",
        "- Block Blast — proprietary title; the folder contains only a Unity template and cover, not an authorized game build.",
        "- BlockPost — commercial multiplayer shooter with portal/CDN and online-service dependencies; no authorized offline build found.",
        "- Bloons TD 2 and Bloons TD 4 — commercial Ninja Kiwi games; the entries use third-party Flash/Ruffle assets without redistribution permission.",
        "- Bloxorz — original commercial Flash game; the MIT candidate found is a Raylib desktop project, not an offline browser port.",
        "",
        "## Protected entries",
        "",
        "Do-Not-Take-This-Cat-Home and 20 Minutes Till Dawn were not included in this batch checkout and were not created, edited or deleted.",
        "",
        "## Batch scope",
        "",
        "- Existing game folders processed: 9.",
        "- Batch 01 was completed separately; this is one separate commit for batch 02.",
        "- No imported-but-untested build is counted as fixed.",
        "",
    ]
    Path("repair-reports/2026-11-16-batch-02.md").write_text("\n".join(lines))
else:
    lines = [
        "# Offline game repair — batch 03 (2026-11-16)",
        "",
        "This batch processed eight existing folders. One complete, license-cleared HTML5 build was staged; seven unlicensed or online-only entries were removed. A replacement counts as fixed only if its browser/gameplay test passed.",
        "",
        "## Replacement and verification",
        "",
    ]
    add_replacement(lines, "Awesome Tanks", "awesomeTanks", "https://github.com/d4vucat/AwesomeTanks", "9382b746dc23d6af13c432c0b921320858d0e724", "2026-07-03", "MIT", "complete Phaser HTML5 game bundle, sprite atlases/JSON, fonts, shaders, all local audio, styles, README and LICENSE; Cloudflare beacon and parent-frame portal messaging removed")
    lines += [
        "## Removed as unrecoverable",
        "",
        "- Ages of Conflict — commercial Unity game; the existing folder contains third-party cached WebGL assets without a redistribution license. The open-source alternative found is an Electron desktop project, not a browser build.",
        "- Angry Birds Showdown — the existing payload is extracted from a YouTube Playable; no source license or authorized redistribution permission was found.",
        "- Aquapark.io — commercial game payload cached from a YouTube Playable; no authorized offline source build or redistribution license found.",
        "- Attack Hole — extracted PlayCanvas/YouTube Playables files; no redistribution license or authorized offline source build found.",
        "- Aviamasters — BGaming demo configuration requires a remote API, WebSocket, game session and server-side balance; it cannot operate offline.",
        "- Bank Robbery 2 — cached Unity WebGL files from a third-party repository without a source license or redistribution permission.",
        "- Basketball Frvr — extracted YouTube Playable payload without a redistribution license or legitimate source build.",
        "",
        "## Remaining unresolved candidates",
        "",
        "- Angry Birds Chrome — original Rovio title; available HTML5 source candidate has no verified redistribution license.",
        "- BitLife — commercial title; the cached Unity build has no authorized offline source license.",
        "- Block Blast — proprietary title; only template files and a cover are present, with no authorized game build.",
        "- BlockPost — commercial multiplayer shooter with external portal/CDN and online-service dependencies; no authorized offline build found.",
        "- Bloons TD 2 and Bloons TD 4 — commercial Ninja Kiwi titles; current folders rely on third-party Flash/Ruffle payloads without redistribution permission.",
        "- Bloxorz — commercial Flash game; the MIT source candidate is a Raylib desktop project, not a browser build.",
        "",
        "## Protected entries",
        "",
        "Do-Not-Take-This-Cat-Home and 20 Minutes Till Dawn were not included in this batch checkout and were not created, edited or deleted.",
        "",
        "## Batch scope",
        "",
        "- Existing game folders processed: 8.",
        "- This is one separate commit for batch 03, following the batch 02 workflow.",
        "- No imported-but-untested build is counted as fixed.",
        "",
    ]
    Path("repair-reports/2026-11-16-batch-03.md").write_text("\n".join(lines))
PY

echo "=== Commit this non-empty batch directly to main ==="
rm -rf node_modules
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
if [[ "$BATCH" == "2" ]]; then
  git add -A -- "1v1.LoL" "8 Ball Pool" "99 Balls" "Achievement Unlocked" "Achievement Unlocked 2" "Adventure Capatalist" "Angry Birds" "Backrooms" "Blocky Snakes" "repair-reports/2026-11-16-batch-02.md"
else
  git add -A -- "Ages of Conflict" "Angry Birds Showdown" "Aquapark.io" "Attack Hole" "Aviamasters" "Awesome Tanks" "Bank Robbery 2" "Basketball Frvr" "repair-reports/2026-11-16-batch-03.md"
fi
git commit -m "Repair offline game batch ${BATCH} — 2026-11-16"
git fetch origin main
if [[ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]]; then
  git rebase origin/main
fi
git push origin HEAD:main
echo "BATCH_${BATCH}_COMMIT=$(git rev-parse HEAD)"
