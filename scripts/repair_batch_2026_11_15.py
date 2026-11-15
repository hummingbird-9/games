#!/usr/bin/env python3
"""Three-batch offline game repair for hummingbird-9/games."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import quote_plus

ROOT = Path(__file__).resolve().parents[1]
RUN_DATE = os.environ.get("REPAIR_DATE", "2026-11-15")
PROTECTED = {"20-minutes-till-dawn", "do-not-take-this-cat-home"}

BATCHES = [
    [
        "1-date-danger", "12-mini-battles", "2048-merge-run", "3d-bolt-master", "3d-bowling",
        "60-seconds-reatomized", "8-ball-classic", "8-ball-pool", "a-bite-at-freddys",
        "a-dance-of-fire-and-ice", "a-difficult-game-about-climbing", "a-game-about-feeding-a-black-hole",
        "a-small-world-cup", "abandoned", "ace-attorney-investigations--miles-edgeworth",
        "achievement-unlocked", "achievement-unlocked-2", "achievement-unlocked-3",
        "adventure-capatalist", "adventure-drivers", "ages-of-conflict", "alien-hominid",
        "amanda-the-adventurer", "amaze", "andys-apple-farm", "angry-birds", "angry-birds-chrome",
        "angry-birds-showdown", "animal-crossing-gamecube", "antonblast"
    ],
    [
        "apes-vs-helium", "apollo-justice--ace-attorney", "aquaparkio", "archery-world-tour",
        "arthurs-nightmare", "attack-hole", "aviamasters", "awesome-tanks", "awesome-tanks-2",
        "azahar-emulator", "backrooms", "bacon-may-die", "bad-ice-cream", "bad-ice-cream-2",
        "bad-ice-cream-3", "bad-monday-simulator", "bad-parenting-1", "bad-piggies",
        "bad-time-simulator", "balatro", "baldis-basics", "baldis-basics-classic-remastered",
        "baldis-basics-plus", "baldis-basics-the-ultra-decompile", "ball-blast", "bank-robbery",
        "bank-robbery-2", "bank-robbery-3", "bart-bash", "bart-blast"
    ],
    [
        "baseball-bros", "basket-battle", "basket-bros", "basket-random", "basketball-frvr",
        "basketball-stars", "bazooka-boy", "beatblock", "bendy-and-the-ink-machine",
        "bendy-and-the-ink-machine-all-chapters", "bergentruck-201x", "bfdi-branches", "bfdia-5b",
        "big-ice-tower-tiny-square", "big-neon-tower-tiny-square", "big-tower-tiny-square",
        "big-tower-tiny-square-2", "binding-of-issac-wrath-of-the-lamb", "bitgunio", "bitplanes",
        "blackjack", "blade-ball", "block-blast", "blockpost", "blocky-snakes", "bloodmoney",
        "bloons-td", "bloons-td-2", "bloons-td-3", "breaklock"
    ]
]

assert all(len(batch) == 30 for batch in BATCHES)
assert not (set().union(*map(set, BATCHES)) & PROTECTED)
assert len(set().union(*map(set, BATCHES))) == 90

SOURCES = {
    "8-ball-classic": {
        "repo": "MarcoBarsotti/8ball",
        "branch": "master",
        "commit": "4c8d399631f6ab49f2432f0995f1323e1a3e0250",
        "license": "GPL-3.0",
        "mode": "copy_all",
        "notes": "Complete local HTML5 billiards game. Box2DWeb is included with its permissive notice in lib/box2dweb.js.",
        "modifications": "Changed the document title to 8 Ball Classic. Gameplay code and local assets retained."
    },
    "8-ball-pool": {
        "repo": "henshmi/Classic-Pool-Game",
        "branch": "master",
        "commit": "f60e9b824648faabe1d931e9116b20333559da2a",
        "license": "MIT; Bossa Antigua music is CC BY 3.0 with attribution in upstream README",
        "mode": "copy_all",
        "notes": "Complete local pool game with local scripts, sprites, sound and music. Upstream README and license retained.",
        "modifications": "No runtime code changes."
    },
    "backrooms": {
        "repo": "SpeeDaily/backrooms-infestation",
        "branch": "main",
        "commit": "bdfb247a6ec2d842ce52387cd5850b95ad3353d7",
        "license": "MIT",
        "mode": "copy_all",
        "notes": "Independent Backrooms-themed browser game, complete local HTML and assets.",
        "modifications": "Rewrote root-relative PWA icon URLs in favicon/site.webmanifest as folder-relative paths."
    },
    "blackjack": {
        "repo": "ryanlew17/Blackjack",
        "branch": "main",
        "commit": "a31a7dd4e79988ea9797130d9d79e567273ccfdf",
        "license": "MIT",
        "mode": "blackjack_build",
        "notes": "Built the pinned upstream Vite single-file release locally in CI; bundled HTML includes its JS and CSS.",
        "modifications": "Committed the generated offline dist output plus upstream README and MIT license."
    },
    "block-blast": {
        "repo": "FariNoveri/block-blast-clone",
        "branch": "main",
        "commit": "9182d0f33d84e8c64b727bd5078fe5da1e9b78a0",
        "license": "Custom non-commercial sharing terms in LICENSE.md; attribution to Fari Noveri and Illyasviel von Einzbern required; do not sell",
        "mode": "copy_all",
        "notes": "Original HTML5 Canvas/JavaScript block puzzle implementation. Its license permits sharing and modification but prohibits sale; attribution retained.",
        "modifications": "No runtime code changes."
    },
    "breaklock": {
        "repo": "maxwellito/breaklock",
        "branch": "main",
        "commit": "8dedd3baccc051928b09605db5cb8dae3702d2f3",
        "build_branch": "gh-pages",
        "build_commit": "8318e0ae07c2bc3608fd388bccf7c982e29d0370",
        "license": "MIT",
        "mode": "breaklock_build",
        "notes": "Used the upstream GitHub Pages build, with source license and README from the pinned main commit.",
        "modifications": "Changed the deployment base from /breaklock/ to ./ so all paths resolve inside this game folder."
    }
}

SPECIAL_NOTES = {
    "12-mini-battles": "The similarly named GitHub repository inspected was empty; no complete authorized offline web build was available.",
    "3d-bowling": "The available MIT Unity project was a desktop Unity source project without a verified WebGL build; it is not a complete offline browser build.",
    "a-bite-at-freddys": "The available browser-port candidate was a fan decompilation of a proprietary game and did not establish redistribution permission.",
    "a-dance-of-fire-and-ice": "The candidate browser clone had no clear redistribution license; the commercial original is not an authorized open web build.",
    "a-game-about-feeding-a-black-hole": "A fan-made JavaScript recreation was found, but it had no explicit redistribution license; it was not copied.",
    "a-small-world-cup": "A Construct export mirror was found, but no redistribution license or rights-holder authorization was established.",
    "achievement-unlocked": "The GitHub project found was a GameMaker project without a redistribution license and not a complete verified web build.",
    "achievement-unlocked-2": "No authorized complete offline web build was found; the folder contained only a remote launcher and cover.",
    "achievement-unlocked-3": "No authorized complete offline web build was found; the folder contained only a remote launcher and cover.",
    "adventure-capatalist": "The candidate GitHub project was an unrelated Minecraft plugin, not an offline browser build.",
    "adventure-drivers": "The source project found was a Python desktop game, not a complete browser build.",
    "awesome-tanks": "A GitHub MIT-labelled project was found, but the repository did not establish rights to the original game's sprites, branding and audio; it was not redistributed.",
    "azahar-emulator": "Azahar is a desktop/mobile 3DS emulator, not a self-contained browser game build.",
    "bad-time-simulator": "The fan game uses Undertale characters and content and no explicit redistribution license was found.",
    "baldis-basics": "The available MIT fan recreation used the original game's named characters/branding without rights-holder authorization; it was not redistributed.",
    "basket-battle": "The repository candidate was a Unity project without a verified WebGL build.",
    "basket-bros": "The repository candidate was a copied compiled game build without a redistribution license.",
    "basket-random": "The candidate repositories were either remote wrappers or unlicensed copies; no authorized complete offline build was found.",
    "baseball-bros": "The similarly named repository contained README/screenshots but not a complete game source build.",
    "bfdia-5b": "The available HTML5 port described copied/decompiled Flash SWF code and assets; no rights-holder redistribution permission was established.",
    "bitplanes": "The source project found was a C++ desktop game, not a browser build."
}

def run_cmd(args, cwd=None, timeout=900, capture=True):
    env = os.environ.copy()
    env["GIT_TERMINAL_PROMPT"] = "0"
    try:
        proc = subprocess.run(
            [str(x) for x in args],
            cwd=str(cwd) if cwd else None,
            env=env,
            text=True,
            capture_output=capture,
            timeout=timeout
        )
    except subprocess.TimeoutExpired as exc:
        command = " ".join(map(str, args)).lower()
        if "git clone" in command or "git fetch" in command or "npm ci" in command:
            raise TransientError(f"Timed out while retrieving source/build dependencies: {command}")
        raise BuildError(f"Build command timed out: {command}") from exc
    if proc.returncode != 0:
        message = (proc.stderr or proc.stdout or "").strip()
        if any(x in message.lower() for x in (
            "could not resolve host", "failed to connect", "connection timed out",
            "connection reset", "502 bad gateway", "503 service unavailable",
            "429 too many requests", "temporary failure in name resolution"
        )):
            raise TransientError(message)
        raise BuildError(f"Command failed: {' '.join(map(str, args))}\n{message}")
    return proc

class TransientError(Exception):
    pass

class BuildError(Exception):
    pass

def clone_exact(repo, branch, expected_commit, parent):
    dest = parent / (repo.replace("/", "__") + "__" + branch.replace("/", "_"))
    if dest.exists():
        shutil.rmtree(dest)
    run_cmd(["git", "clone", "--depth", "1", "--branch", branch, f"https://github.com/{repo}.git", dest], timeout=900)
    head = run_cmd(["git", "rev-parse", "HEAD"], cwd=dest).stdout.strip()
    if head != expected_commit:
        run_cmd(["git", "fetch", "--depth", "1", "origin", expected_commit], cwd=dest, timeout=900)
        run_cmd(["git", "checkout", "--detach", "FETCH_HEAD"], cwd=dest)
        head = run_cmd(["git", "rev-parse", "HEAD"], cwd=dest).stdout.strip()
    if head != expected_commit:
        raise BuildError(f"{repo}: expected {expected_commit}, got {head}")
    return dest

def tracked_files(source):
    raw = run_cmd(["git", "ls-files", "-z"], cwd=source).stdout
    return [x for x in raw.split("\0") if x]

def copy_tracked(source, destination, exclude_prefixes=()):
    count = 0
    for rel in tracked_files(source):
        if any(rel == p or rel.startswith(p.rstrip("/") + "/") for p in exclude_prefixes):
            continue
        src = source / rel
        if not src.is_file():
            continue
        dst = destination / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        count += 1
    return count

def copy_path(source, destination, rel):
    src = source / rel
    if not src.exists():
        raise BuildError(f"Expected upstream path missing: {rel}")
    dst = destination / rel
    if src.is_dir():
        shutil.copytree(src, dst, dirs_exist_ok=True)
    else:
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)

def clear_launcher_keep_cover(folder):
    for item in list(folder.iterdir()):
        if item.is_file() and item.name.lower().startswith("cover."):
            continue
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()

def is_broken_launcher(folder):
    if not folder.is_dir():
        return False
    files = [p for p in folder.rglob("*") if p.is_file()]
    if len(files) != 2 or not (folder / "index.html").is_file():
        return False
    if not any(p.name.lower().startswith("cover.") for p in files):
        return False
    text = (folder / "index.html").read_text(encoding="utf-8", errors="ignore").lower()
    return "<iframe" in text or "<embed" in text or "https://" in text or "http://" in text

def sha256_file(path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def tree_stats(folder):
    files = [p for p in folder.rglob("*") if p.is_file()]
    return len(files), sum(p.stat().st_size for p in files)

def write_source_note(folder, name, source):
    lines = [
        "# Source provenance",
        "",
        f"- Game folder: {name}",
        f"- Upstream repository: https://github.com/{source['repo']}",
        f"- Pinned source commit: {source['commit']}",
        f"- License: {source['license']}",
        f"- Notes: {source['notes']}",
        f"- Modifications: {source['modifications']}",
        "- Runtime: local files only; offline browser test required before this build is retained.",
        ""
    ]
    if name == "breaklock":
        lines.insert(5, f"- Built site commit: {source['build_commit']} on {source['build_branch']}")
    (folder / "SOURCE.md").write_text("\n".join(lines), encoding="utf-8")

def import_source(name, folder, temp_root):
    source = SOURCES[name]
    repo_dir = clone_exact(source["repo"], source["branch"], source["commit"], temp_root)
    mode = source["mode"]

    if mode == "copy_all":
        clear_launcher_keep_cover(folder)
        copy_tracked(repo_dir, folder, exclude_prefixes=(".github", ".gitignore", ".gitattributes"))
        if name == "backrooms":
            manifest = folder / "favicon" / "site.webmanifest"
            if manifest.is_file():
                data = json.loads(manifest.read_text(encoding="utf-8"))
                for icon in data.get("icons", []):
                    src = icon.get("src", "")
                    if src.startswith("/favicon/"):
                        icon["src"] = "./" + Path(src).name
                manifest.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    elif mode == "blackjack_build":
        run_cmd(["npm", "ci"], cwd=repo_dir, timeout=1200)
        run_cmd(["npm", "run", "build"], cwd=repo_dir, timeout=900)
        dist = repo_dir / "dist"
        if not dist.is_dir() or not (dist / "index.html").is_file():
            raise BuildError("Blackjack build did not produce dist/index.html")
        clear_launcher_keep_cover(folder)
        for item in dist.iterdir():
            target = folder / item.name
            if item.is_dir():
                shutil.copytree(item, target, dirs_exist_ok=True)
            else:
                shutil.copy2(item, target)
        for rel in ("LICENSE", "README.md"):
            copy_path(repo_dir, folder, rel)
    elif mode == "breaklock_build":
        build_dir = clone_exact(source["repo"], source["build_branch"], source["build_commit"], temp_root)
        clear_launcher_keep_cover(folder)
        copy_tracked(
            build_dir,
            folder,
            exclude_prefixes=(".gitignore", ".gitattributes", "app.js", "app.css", "manifest.json")
        )
        copy_path(repo_dir, folder, "LICENSE")
        readme = repo_dir / "readme.md"
        if readme.is_file():
            shutil.copy2(readme, folder / "README.md")
        index = folder / "index.html"
        if not index.is_file():
            raise BuildError("Breaklock Pages build did not include index.html")
        text = index.read_text(encoding="utf-8", errors="ignore")
        text = re.sub(r'(<base\b[^>]*href=["\'])/breaklock/(["\'])', r'\1./\2', text, flags=re.I)
        index.write_text(text, encoding="utf-8")
        sw = folder / "service-worker.js"
        if sw.is_file():
            sw_text = sw.read_text(encoding="utf-8", errors="ignore")
            cache_block = """var filesToCache = [
  './',
  './index.html',
  './en/app.css',
  './en/app.js',
  './en/manifest.json',
  './assets/intro.svg',
  './assets/fonts/robotomono-light-webfont.woff2',
  './assets/fonts/robotomono-light-webfont.woff',
  './assets/fonts/robotomono-light-webfont.ttf'
];"""
            sw_text, n = re.subn(r'var\s+filesToCache\s*=\s*\[[\s\S]*?\];', cache_block, sw_text, count=1)
            if n != 1:
                raise BuildError("Could not patch Breaklock service-worker asset cache list")
            sw.write_text(sw_text, encoding="utf-8")
    else:
        raise BuildError(f"Unknown import mode {mode}")

    if name == "8-ball-classic":
        index = folder / "index.html"
        text = index.read_text(encoding="utf-8", errors="ignore")
        text = re.sub(r"<title>[\s\S]*?</title>", "<title>8 Ball Classic</title>", text, count=1, flags=re.I)
        index.write_text(text, encoding="utf-8")

    write_source_note(folder, name, source)

def research_links(name):
    q = quote_plus(name.replace("-", " "))
    return (
        f"https://github.com/search?q={q}&type=repositories",
        f"https://www.google.com/search?q={q}+offline+HTML5+source+license"
    )

def removal_reason(name):
    return SPECIAL_NOTES.get(
        name,
        "The repository folder contained only a cover and a remote launcher. GitHub repository search and official-source searches did not locate a complete, authorized offline-capable browser build."
    )

def run_smoke_test(name):
    test_file = ROOT / "tests" / "offline-game-smoke-2026-11-15.cjs"
    playwright_path = os.environ.get("PLAYWRIGHT_PATH")
    if not playwright_path or not Path(playwright_path).exists():
        raise TransientError("PLAYWRIGHT_PATH is missing; browser verification infrastructure is unavailable.")
    env = os.environ.copy()
    proc = subprocess.run(
        ["node", str(test_file), name],
        cwd=ROOT,
        env=env,
        text=True,
        capture_output=True,
        timeout=180
    )
    if proc.stdout:
        print(proc.stdout, end="")
    if proc.stderr:
        print(proc.stderr, end="", file=sys.stderr)
    result = None
    for line in reversed((proc.stdout or "").splitlines()):
        try:
            obj = json.loads(line)
            if isinstance(obj, dict) and obj.get("game") == name:
                result = obj
                break
        except json.JSONDecodeError:
            continue
    if proc.returncode != 0 or not result or result.get("status") != "PASS":
        raise BuildError((result or {}).get("error", f"Offline browser test failed for {name}"))
    return result

def process_game(name, temp_root):
    folder = ROOT / name
    if name in PROTECTED:
        return {"game": name, "status": "PROTECTED", "reason": "Explicitly protected by user instruction."}
    if not folder.exists():
        return {"game": name, "status": "SKIPPED", "reason": "Folder not present on main."}
    if not is_broken_launcher(folder):
        return {"game": name, "status": "SKIPPED", "reason": "Not a two-file remote launcher; left untouched to avoid overwriting a potentially working entry."}

    original_index = folder / "index.html"
    original_hash = sha256_file(original_index)
    original_cover = next((p.name for p in folder.iterdir() if p.is_file() and p.name.lower().startswith("cover.")), "unknown")

    if name not in SOURCES:
        reason = removal_reason(name)
        shutil.rmtree(folder)
        gh, web = research_links(name)
        return {
            "game": name,
            "status": "REMOVED",
            "reason": reason,
            "original_index_sha256": original_hash,
            "original_cover": original_cover,
            "research": [gh, web]
        }

    source = SOURCES[name]
    backup = temp_root / (name + "-original")
    shutil.copytree(folder, backup)
    try:
        import_source(name, folder, temp_root)
    except TransientError as exc:
        if folder.exists():
            shutil.rmtree(folder)
        shutil.copytree(backup, folder)
        return {
            "game": name,
            "status": "UNRESOLVED",
            "reason": f"Source retrieval/build environment was temporarily unavailable: {exc}",
            "source": source
        }
    except Exception as exc:
        shutil.rmtree(folder, ignore_errors=True)
        return {
            "game": name,
            "status": "REMOVED",
            "reason": f"Upstream import/build failed: {exc}",
            "source": source,
            "original_index_sha256": original_hash,
            "original_cover": original_cover
        }

    try:
        test = run_smoke_test(name)
    except TransientError as exc:
        if folder.exists():
            shutil.rmtree(folder)
        shutil.copytree(backup, folder)
        return {
            "game": name,
            "status": "UNRESOLVED",
            "reason": str(exc),
            "source": source
        }
    except Exception as exc:
        shutil.rmtree(folder, ignore_errors=True)
        return {
            "game": name,
            "status": "REMOVED",
            "reason": f"Offline verification failed; unverified replacement removed: {exc}",
            "source": source,
            "test": {"status": "FAIL", "error": str(exc)},
            "original_index_sha256": original_hash,
            "original_cover": original_cover
        }

    files, size = tree_stats(folder)
    return {
        "game": name,
        "status": "FIXED",
        "source": source,
        "files": files,
        "bytes": size,
        "test": test,
        "original_index_sha256": original_hash,
        "original_cover": original_cover
    }

def render_report(batch_no, results):
    fixed = [x for x in results if x["status"] == "FIXED"]
    removed = [x for x in results if x["status"] == "REMOVED"]
    unresolved = [x for x in results if x["status"] == "UNRESOLVED"]
    skipped = [x for x in results if x["status"] == "SKIPPED"]
    lines = [
        f"# Offline game repair report — {RUN_DATE} / Batch {batch_no:02d}",
        "",
        f"- Candidate folders: {len(results)}",
        f"- Verified fixed: {len(fixed)}",
        f"- Removed as unrecoverable: {len(removed)}",
        f"- Unresolved: {len(unresolved)}",
        f"- Skipped without modification: {len(skipped)}",
        "- Verification: Chromium, local HTTP server, external requests blocked, static asset graph audit, and gameplay input where supported.",
        ""
    ]
    if fixed:
        lines += ["## Verified replacements", ""]
        for x in fixed:
            s = x["source"]
            t = x["test"]
            lines += [
                f"### {x['game']} — PASS",
                f"- Source: https://github.com/{s['repo']}",
                f"- Source commit: {s['commit']}",
                f"- License: {s['license']}",
                f"- Files in committed game folder: {x['files']} ({x['bytes']:,} bytes)",
                "- Replaced files: remote launcher and previous cover; committed complete local build, SOURCE.md, and verified cover.png.",
                f"- Test method: {t.get('method', 'Chromium with external requests blocked; static asset graph and gameplay input')}",
                f"- Test actions: {'; '.join(t.get('actions', []))}",
                f"- Runtime requests: {t.get('requestCount', 'n/a')} local resource entries; external attempts {len(t.get('externalRequests', []))}; failed local requests {len(t.get('failedLocal', []))}; HTTP errors {len(t.get('badResponses', []))}; page errors {len(t.get('pageErrors', []))}.",
                f"- Asset graph: {t.get('graph', {}).get('checked', 'n/a')} local references checked; missing {len(t.get('graph', {}).get('missing', []))}; external {len(t.get('graph', {}).get('external', []))}.",
                f"- Cover: {t.get('cover', x['game'] + '/cover.png')} generated from the successful offline browser session.",
                ""
            ]
    if removed:
        lines += ["## Removed as unrecoverable", ""]
        for x in removed:
            gh, web = x.get("research", research_links(x["game"]))
            lines += [
                f"### {x['game']} — REMOVED",
                f"- Reason: {x['reason']}",
                f"- Original launcher SHA-256: {x.get('original_index_sha256', 'n/a')}",
                f"- Original cover: {x.get('original_cover', 'n/a')}",
                f"- Research: [GitHub repository search]({gh}) · [offline source search]({web})",
                ""
            ]
    if unresolved:
        lines += ["## Unresolved — left untouched", ""]
        for x in unresolved:
            lines += [f"- {x['game']}: {x['reason']}"]
        lines.append("")
    if skipped:
        lines += ["## Skipped — left untouched", ""]
        for x in skipped:
            lines += [f"- {x['game']}: {x['reason']}"]
        lines.append("")
    lines += [
        "## Protected entries",
        "",
        "- 20-minutes-till-dawn was not included or modified.",
        "- do-not-take-this-cat-home was not included or modified.",
        "",
        "No game is counted as fixed unless the offline browser test passed."
    ]
    return "\n".join(lines) + "\n"

def commit_batch(batch_no, names, results):
    report_dir = ROOT / "repair-reports"
    report_dir.mkdir(parents=True, exist_ok=True)
    report_path = report_dir / f"{RUN_DATE}-batch-{batch_no:02d}.md"
    report_path.write_text(render_report(batch_no, results), encoding="utf-8")
    paths = [*names, str(report_path.relative_to(ROOT))]
    run_cmd(["git", "add", "-A", "--", *paths], cwd=ROOT)
    diff = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT)
    if diff.returncode == 0:
        return None
    run_cmd(["git", "config", "user.name", "github-actions[bot]"], cwd=ROOT)
    run_cmd(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], cwd=ROOT)
    run_cmd(["git", "commit", "-m", f"Repair offline games: {RUN_DATE} batch {batch_no:02d}"], cwd=ROOT)
    run_cmd(["git", "push", "origin", "HEAD:main"], cwd=ROOT, timeout=900)
    sha = run_cmd(["git", "rev-parse", "HEAD"], cwd=ROOT).stdout.strip()
    run_cmd(["git", "fetch", "origin", "main"], cwd=ROOT, timeout=900)
    run_cmd(["git", "reset", "--hard", "origin/main"], cwd=ROOT)
    return sha

def main():
    if not (ROOT / ".git").is_dir():
        raise SystemExit("This script must run from a checked-out Git repository.")
    if not os.environ.get("PLAYWRIGHT_PATH"):
        raise SystemExit("PLAYWRIGHT_PATH is required for offline browser verification.")
    all_summaries = []
    commits = []
    for batch_no, names in enumerate(BATCHES, start=1):
        print(f"\n=== BATCH {batch_no:02d}: {len(names)} folders ===", flush=True)
        results = []
        with tempfile.TemporaryDirectory(prefix=f"game-repair-{batch_no}-") as temp:
            temp_root = Path(temp)
            for name in names:
                print(f"\n--- {name} ---", flush=True)
                result = process_game(name, temp_root)
                results.append(result)
                print(json.dumps(result, ensure_ascii=False, default=str), flush=True)
        sha = commit_batch(batch_no, names, results)
        if sha:
            commits.append({"batch": batch_no, "sha": sha, "url": f"https://github.com/hummingbird-9/games/commit/{sha}"})
        all_summaries.append({
            "batch": batch_no,
            "fixed": [x["game"] for x in results if x["status"] == "FIXED"],
            "removed": [x["game"] for x in results if x["status"] == "REMOVED"],
            "unresolved": [x["game"] for x in results if x["status"] == "UNRESOLVED"],
            "skipped": [x["game"] for x in results if x["status"] == "SKIPPED"],
            "commit": sha
        })
    summary = {
        "date": RUN_DATE,
        "commits": commits,
        "batches": all_summaries,
        "fixed_total": sum(len(x["fixed"]) for x in all_summaries),
        "removed_total": sum(len(x["removed"]) for x in all_summaries),
        "unresolved_total": sum(len(x["unresolved"]) for x in all_summaries),
        "skipped_total": sum(len(x["skipped"]) for x in all_summaries)
    }
    print("\n=== FINAL SUMMARY ===")
    print(json.dumps(summary, indent=2))
    if summary["unresolved_total"]:
        print("Some source retrieval or build operations were temporarily unavailable; those folders were left unchanged.")

if __name__ == "__main__":
    main()
