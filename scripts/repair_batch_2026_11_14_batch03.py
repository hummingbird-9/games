#!/usr/bin/env python3
import hashlib
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path.cwd()
REPORT = ROOT / "repair-reports" / "2026-11-14-batch-03.md"
SOURCE = {
    "game": "n-gon",
    "repo": "https://github.com/landgreen/n-gon.git",
    "commit": "530f1ed70d845149cb5070888834d69c4737a8d8",
    "license": "GPL-3.0",
    "paths": ["LICENSE", "README.md", "favicon.ico", "index.html", "img", "js", "lib", "style.css"],
}
UNRECOVERABLE = [
    ("sandboxels", "https://github.com/R74nCom/sandboxels/blob/main/license.txt",
     "The upstream R74n Content License reserves all rights and prohibits commercial use without explicit permission. The current collection page includes advertising scripts, so commercial redistribution cannot be assumed permitted; no permission was found."),
    ("myteardrop", "https://github.com/whatthezip/myTeardrop",
     "The only public repository is explicitly unofficial, says the game is not planned to be open source, and contains no redistribution license. Publicly visible files are not permission to rehost the game."),
    ("celeste-pico", "https://github.com/jackz3/ccleste_wasm",
     "A community Celeste Classic WebAssembly port exists, but the repository has no license file and does not grant permission to redistribute the port or the original game's assets."),
    ("spacebar-clicker", "https://github.com/CrociDB/spacebar-clicker",
     "The author explicitly states that all rights belong to them and copying the code or game name is prohibited without express authorization."),
    ("ice-dodo", "https://www.numuki.com/game/ice-dodo/",
     "The repository contains only a remote iframe launcher. Searches found hosted play pages but no maintained source repository or authorized offline build."),
    ("choppy-orc", "https://github.com/or321/choppy-orc-autosplitter ; https://store.steampowered.com/app/2105000/",
     "The GitHub source found is an autosplitter/TAS project, not a complete redistributable web build. The commercial game is published by its developer; no web-port redistribution permission was found."),
    ("sonicexe-original", "GitHub and web search for Sonic.EXE original browser source",
     "Only a remote launcher is present. No maintained source build with redistribution permission was found for this fan game."),
    ("64-in-1-nes", "GitHub and web search for 64-in-1 NES web build",
     "The folder is a remote launcher for a multi-game NES ROM compilation. No authorized redistribution rights for the copyrighted ROM collection or an offline web build were found."),
    ("pizza-tower", "https://github.com/burnedpopcorn/Pizza-Tower-1.1.0-Web-Port",
     "A community browser port exists, but it is based on decompiled proprietary game files and provides no license or authorization from Tour de Pizza to redistribute the build."),
    ("final-earth-2", "GitHub and web search for The Final Earth 2 source",
     "The folder is only a remote launcher. No maintained source repository or authorized offline build was found for this proprietary game."),
    ("99-balls", "GitHub and web search for 99 Balls HTML5 source",
     "The folder is only a remote launcher. No maintained source repository or authorized offline build with redistribution permission was found."),
    ("ovo-2", "GitHub and web search for OVO 2 browser source",
     "The folder is only a remote launcher. No maintained source repository or authorized offline build with redistribution permission was found."),
]

def run(cmd, cwd=None, check=True, capture=False):
    return subprocess.run(cmd, cwd=cwd, check=check, text=True,
                          stdout=subprocess.PIPE if capture else None,
                          stderr=subprocess.PIPE if capture else None)

def digest_tree(path):
    path = Path(path)
    if not path.exists():
        return None
    return tuple((str(f.relative_to(path)), hashlib.sha256(f.read_bytes()).hexdigest())
                 for f in sorted(x for x in path.rglob("*") if x.is_file()))

def is_broken_launcher(folder):
    folder = Path(folder)
    if not folder.is_dir():
        return False
    files = [p for p in folder.rglob("*") if p.is_file()]
    index = folder / "index.html"
    if len(files) > 2 or not index.is_file():
        return False
    text = index.read_text(encoding="utf-8", errors="ignore").lower()
    return "iframe" in text or "genizymath.github.io/iframe" in text or ".r2.dev" in text

def clone_exact(source, dest):
    run(["git", "init", str(dest)])
    run(["git", "remote", "add", "origin", source["repo"]], cwd=dest)
    run(["git", "fetch", "--depth=1", "origin", source["commit"]], cwd=dest)
    run(["git", "checkout", "--detach", "FETCH_HEAD"], cwd=dest)
    actual = run(["git", "rev-parse", "HEAD"], cwd=dest, capture=True).stdout.strip()
    if actual != source["commit"]:
        raise RuntimeError("Source commit mismatch: expected " + source["commit"] + ", got " + actual)
    return actual

def copy_source(src, dst, paths):
    dst.mkdir(parents=True, exist_ok=True)
    for rel in paths:
        source = src / rel
        target = dst / rel
        if not source.exists():
            raise FileNotFoundError("Required upstream path missing: " + str(source))
        if source.is_dir():
            shutil.copytree(source, target, dirs_exist_ok=True)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)

def clear_launcher_keep_cover(folder):
    for item in list(folder.iterdir()):
        if item.is_file() and item.name.lower().startswith("cover."):
            continue
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()

def patch_ngon(folder):
    path = folder / "js" / "index.js"
    text = path.read_text(encoding="utf-8")
    pattern = r'document\.getElementById\("updates"\)\.addEventListener\("toggle", function \(\) \{[\s\S]*?\n\}\)\n(?=const sound = \{)'
    replacement = '''document.getElementById("updates").addEventListener("toggle", function () {
    document.getElementById("updates-div").textContent =
        "n-gon offline snapshot. Upstream commit: 530f1ed70d845149cb5070888834d69c4737a8d8.";
})
'''
    text, count = re.subn(pattern, replacement, text)
    if count != 1:
        raise RuntimeError("Could not replace n-gon's online changelog request")
    if "loadJSON('https://api.github.com/repos/landgreen/n-gon/commits'" in text:
        raise RuntimeError("n-gon still contains its remote changelog request")
    path.write_text(text, encoding="utf-8")

def file_count(folder):
    return sum(1 for p in Path(folder).rglob("*") if p.is_file())

def main():
    protected = ["do-not-take-this-cat-home", "20-minutes-till-dawn"]
    before = {name: digest_tree(ROOT / name) for name in protected}
    fixed, removed, skipped, unresolved = [], [], [], []
    with tempfile.TemporaryDirectory(prefix="offline-game-batch03-") as temp:
        temp = Path(temp)
        target = ROOT / SOURCE["game"]
        if is_broken_launcher(target):
            backup = temp / "n-gon-original"
            shutil.copytree(target, backup)
            try:
                src = temp / "n-gon-source"
                clone_exact(SOURCE, src)
                if not (src / "LICENSE").is_file():
                    raise RuntimeError("Pinned upstream GPL-3.0 license file missing")
                clear_launcher_keep_cover(target)
                copy_source(src, target, SOURCE["paths"])
                patch_ngon(target)
                test = run(["node", "tests/offline-game-smoke.mjs", "n-gon"], cwd=ROOT,
                           check=False, capture=True)
                output = (test.stdout or "") + (test.stderr or "")
                if test.returncode == 0 and '"result":"PASS"' in output:
                    fixed.append({
                        "game": "n-gon",
                        "source": SOURCE["repo"],
                        "commit": SOURCE["commit"],
                        "license": SOURCE["license"],
                        "files": file_count(target),
                        "bytes": sum(p.stat().st_size for p in target.rglob("*") if p.is_file()),
                        "test": output.strip().splitlines()[-1],
                    })
                    print("PASS n-gon " + fixed[-1]["test"])
                else:
                    shutil.rmtree(target, ignore_errors=True)
                    removed.append({
                        "game": "n-gon",
                        "files": 0,
                        "source": SOURCE["repo"] + "@" + SOURCE["commit"],
                        "reason": "The complete pinned build failed offline Chromium gameplay verification; removed rather than leaving an unverified replacement. " + output[-1800:].replace("\n", " "),
                    })
                    print("REMOVED n-gon after failed offline verification")
            except Exception as exc:
                shutil.rmtree(target, ignore_errors=True)
                shutil.copytree(backup, target)
                unresolved.append(("n-gon", str(exc)))
                print("UNRESOLVED n-gon: " + str(exc))
        elif target.exists():
            skipped.append(("n-gon", "Existing folder is not a two-file remote launcher; preserved without overwrite."))
        else:
            skipped.append(("n-gon", "Folder absent from main; no change."))

    for name, source, reason in UNRECOVERABLE:
        folder = ROOT / name
        if is_broken_launcher(folder):
            count = file_count(folder)
            shutil.rmtree(folder)
            removed.append({"game": name, "files": count, "source": source, "reason": reason})
            print("REMOVED " + name + ": " + reason)
        elif folder.exists():
            skipped.append((name, "Existing content is not a two-file remote launcher; preserved."))

    after = {name: digest_tree(ROOT / name) for name in protected}
    if before != after:
        raise RuntimeError("Protected game folder changed; aborting commit")

    remaining = []
    for folder in sorted(ROOT.iterdir(), key=lambda p: p.name.lower()):
        if folder.is_dir() and folder.name not in protected and is_broken_launcher(folder):
            remaining.append(folder.name)

    lines = [
        "# Offline repair batch 3 — 2026-11-14",
        "",
        "This batch replaced one eligible remote launcher with a pinned, maintained GPL-3.0 upstream build and removed remote-only launchers for which no authorized redistributable offline build was found.",
        "",
        "## Verified fixed",
        "",
    ]
    if fixed:
        for item in fixed:
            lines.append("- **" + item["game"] + "** — " + str(item["files"]) + " files, " + str(item["bytes"]) + " bytes; source " + item["source"] + " at " + item["commit"] + " (" + item["license"] + "). Complete index.html, CSS, JavaScript, Matter.js, level images, favicon and license copied. Online changelog XHR removed. Test: " + item["test"] + ".")
    else:
        lines.append("- None. No candidate passed offline gameplay verification.")
    lines += ["", "## Removed as unrecoverable", ""]
    if removed:
        for item in removed:
            lines.append("- **" + item["game"] + "** — removed " + str(item["files"]) + " launcher files. Source/research: " + item["source"] + ". Reason: " + item["reason"].replace("\n", " "))
    else:
        lines.append("- None.")
    lines += ["", "## Preserved without overwrite", ""]
    if skipped:
        for name, reason in skipped:
            lines.append("- **" + name + "** — " + reason)
    else:
        lines.append("- None.")
    lines += ["", "## Source retrieval or preparation issues", ""]
    if unresolved:
        for name, reason in unresolved:
            lines.append("- **" + name + "** — " + reason)
    else:
        lines.append("- None.")
    lines += ["", "## Remaining unresolved remote-launcher folders", ""]
    lines.append("Repository evidence: these folders still contain only a cover image and an HTML page whose game frame points to a remote host. They were not overwritten or counted as fixed in this batch; their source/license review remains outstanding.")
    for name in remaining[:50]:
        lines.append("- **" + name + "** — remote iframe/R2 launcher only; local game assets are absent and a licensed offline replacement has not yet been verified.")
    if len(remaining) > 50:
        lines.append("- Plus " + str(len(remaining) - 50) + " additional remote-launcher folders not listed here.")
    if not remaining:
        lines.append("- None.")
    lines += [
        "",
        "## Protected games",
        "",
        "- do-not-take-this-cat-home: excluded and unchanged (SHA-256 tree comparison passed).",
        "- 20-minutes-till-dawn: untouched (SHA-256 tree comparison passed).",
        "",
        "## Verification rules",
        "",
        "n-gon was counted fixed only if Chromium passed with network requests outside the local test server blocked, the local HTML/CSS asset graph had no missing files, the title screen initialized, the Start button entered gameplay, ArrowRight moved the player, opening the updates panel made no external request, and there were zero failed local requests, local HTTP errors, or page exceptions. A static import or file copy alone does not count as a repair.",
    ]
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    run(["git", "config", "user.name", "github-actions[bot]"], cwd=ROOT)
    run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], cwd=ROOT)
    run(["git", "fetch", "origin", "main"], cwd=ROOT)
    local = run(["git", "rev-parse", "HEAD"], cwd=ROOT, capture=True).stdout.strip()
    remote = run(["git", "rev-parse", "origin/main"], cwd=ROOT, capture=True).stdout.strip()
    if local != remote:
        raise RuntimeError("main moved during batch; refusing to push over newer changes")
    run(["git", "add", "-A"], cwd=ROOT)
    staged = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT)
    if staged.returncode == 0:
        print("No repository changes to commit.")
        return
    run(["git", "commit", "-m", "Repair offline game batch 3"], cwd=ROOT)
    sha = run(["git", "rev-parse", "HEAD"], cwd=ROOT, capture=True).stdout.strip()
    run(["git", "push", "origin", "HEAD:main"], cwd=ROOT)
    print("BATCH_COMMIT=" + sha)
    print("BATCH_URL=https://github.com/hummingbird-9/games/commit/" + sha)
    print("FIXED=" + ", ".join(x["game"] for x in fixed))
    print("REMOVED=" + ", ".join(x["game"] for x in removed))
    print("REMAINING_UNRESOLVED=" + str(len(remaining)))

if __name__ == "__main__":
    main()
