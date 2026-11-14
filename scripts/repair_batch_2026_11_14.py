#!/usr/bin/env python3
import hashlib
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path.cwd()
REPORT = ROOT / "repair-reports" / "2026-11-14-batch-01.md"

SOURCES = [
    {"game":"2048","repo":"https://github.com/gabrielecirulli/2048.git","commit":"478b6ec346e3787f589e4af751378d06ded4cbbc","license":"MIT","paths":["LICENSE.txt","README.md","favicon.ico","index.html","js","meta","style"]},
    {"game":"flappy-bird","repo":"https://github.com/pyforgedev/flappy-bird.git","commit":"29369e112225c35cd1da77e43cf02aa5ed1408a1","license":"MIT","paths":["LICENSE","README.md","index.html","flappyBird.js","favicon","images","sounds"]},
    {"game":"tetris","repo":"https://github.com/jakesgordon/javascript-tetris.git","commit":"e5c0c42f7dac0f3514a55eff656c6e22e95d68ed","license":"MIT","paths":["LICENSE","README.md","index.html","stats.js","texture.jpg"]},
    {"game":"chess-classic","repo":"https://github.com/nightrider99/webrtc-chess.git","commit":"d205bbe0fd4271e1d8de89cabec247dc17fca3dd","license":"MIT","paths":["LICENSE","README.md","index.html"]},
    {"game":"idle-breakout","repo":"https://github.com/SoBloxsy/idle-breakout.git","commit":"38210ab1e9cf2ec914c6ab11074ab81a1cb606f3","license":"MIT","paths":["LICENSE","README.md","index.html","game.html","html5game","assets","img"]},
]
UNRECOVERABLE = [
    ("we-become-what-we-behold","Upstream ncase/wbwwb source has no redistribution license; only a broken remote launcher exists in this repository."),
    ("hollow-knight","Only an unofficial fan-made browser port was found; no authorized Team Cherry offline source build is available for redistribution."),
]
UNRESOLVED = [
    ("1v1 LOL","Multiplayer/Firebase services; no verified offline-capable source build selected."),
    ("10 Minutes Till Dawn","Prior audit found remote Unity assets; a complete local source build has not been verified."),
    ("BitLife","Proprietary game; no authorized offline source build has been verified."),
    ("DogeMiner","Search results found unrelated Dogecoin mining software; no maintained source build of the game has been verified."),
    ("DogeMiner2","Community Edition candidate has unresolved asset licensing and offline dependency questions."),
    ("Fruit Ninja","Only unofficial clones were found; no maintained, authorized full port has been selected."),
    ("Idle Mining Empire","Prior audit found an external-CDN launcher; no complete offline source build has been verified."),
    ("Little Alchemy 2","Proprietary game; no authorized source build has been verified."),
    ("PolyTrack","No authorized complete offline source build has been verified."),
    ("Polytrackworksnow","No authorized complete offline source build has been verified."),
    ("Sandboxels","Official source exists, but license conditions and remote-feature dependencies still need review."),
]

def run(cmd, cwd=None, check=True, capture=False):
    return subprocess.run(cmd, cwd=cwd, check=check, text=True,
                          stdout=subprocess.PIPE if capture else None,
                          stderr=subprocess.PIPE if capture else None)

def digest_tree(path):
    path = Path(path)
    if not path.exists():
        return None
    values = []
    for f in sorted(x for x in path.rglob("*") if x.is_file()):
        values.append((str(f.relative_to(path)), hashlib.sha256(f.read_bytes()).hexdigest()))
    return tuple(values)

def is_broken_launcher(folder):
    folder = Path(folder)
    if not folder.is_dir():
        return False
    files = [p for p in folder.rglob("*") if p.is_file()]
    index = folder / "index.html"
    if len(files) > 2 or not index.is_file():
        return False
    try:
        text = index.read_text(encoding="utf-8", errors="ignore").lower()
    except Exception:
        return False
    return "iframe" in text or "genizymath.github.io/iframe" in text or ".r2.dev" in text

def clone_exact(source, dest):
    run(["git","init",str(dest)])
    run(["git","remote","add","origin",source["repo"]],cwd=dest)
    run(["git","fetch","--depth=1","origin",source["commit"]],cwd=dest)
    run(["git","checkout","--detach","FETCH_HEAD"],cwd=dest)
    actual = run(["git","rev-parse","HEAD"],cwd=dest,capture=True).stdout.strip()
    if actual != source["commit"]:
        raise RuntimeError("Source commit mismatch: expected "+source["commit"]+", got "+actual)
    return actual

def copy_source(src,dst,paths):
    dst.mkdir(parents=True,exist_ok=True)
    for rel in paths:
        source=src/rel
        target=dst/rel
        if not source.exists():
            raise FileNotFoundError("Required upstream path missing: "+str(source))
        if source.is_dir():
            shutil.copytree(source,target,dirs_exist_ok=True)
        else:
            target.parent.mkdir(parents=True,exist_ok=True)
            shutil.copy2(source,target)

def clear_launcher_keep_cover(folder):
    for item in list(folder.iterdir()):
        if item.is_file() and item.name.lower().startswith("cover."):
            continue
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()

def patch_flappy(folder):
    index=folder/"index.html"
    text=index.read_text(encoding="utf-8")
    text,count=re.subn(
        r'\\s*<link rel="preconnect" href="https://fonts\\.googleapis\\.com">\\s*'
        r'<link rel="preconnect" href="https://fonts\\.gstatic\\.com" crossorigin>\\s*'
        r'<link href="https://fonts\\.googleapis\\.com/css2\\?family=Press\\+Start\\+2P&display=swap" rel="stylesheet">\\s*',
        "\\n",text)
    if count!=1:
        raise RuntimeError("Could not remove Flappy Bird Google Fonts block")
    text=text.replace('"Press Start 2P", monospace','ui-monospace, "Courier New", monospace')
    if "fonts.googleapis.com" in text or "fonts.gstatic.com" in text:
        raise RuntimeError("Flappy Bird still references remote fonts")
    index.write_text(text,encoding="utf-8")

def patch_chess(folder):
    index=folder/"index.html"
    text=index.read_text(encoding="utf-8")
    text,_=re.subn(r'<link href="https://fonts\\.googleapis\\.com/css2\\?family=Cinzel[\\s\\S]*?rel="stylesheet">\\s*',"",text)
    text=text.replace("font-family:'Lora',Georgia,serif;","font-family:Georgia,serif;")
    text=text.replace("font-family:'Cinzel Decorative',serif;","font-family:Georgia,serif;")
    text=text.replace("font-family:'Cinzel',serif;","font-family:Georgia,serif;")
    text=text.replace("iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]","iceServers:[]")
    if "fonts.googleapis.com" in text or "stun:" in text:
        raise RuntimeError("Chess still references Google Fonts or public STUN")
    index.write_text(text,encoding="utf-8")

def patch_idle_breakout(folder):
    js=folder/"html5game"/"Coding_BreakOut1.js"
    text=js.read_text(encoding="utf-8")
    text,n_fb=re.subn(r'function _nB\\(_sq\\) \\{[\\s\\S]*?^\\}',"function _nB(_sq) { return; }",text,flags=re.M)
    text,n_ad=re.subn(r'var _yZ = \\(function\\(_sq, __f\\) \\{[\\s\\S]*?^\\}\\);',"var _yZ = function() {};",text,flags=re.M)
    if n_fb!=1 or n_ad!=1 or "_kK(_yW)" not in text:
        raise RuntimeError("Idle Breakout remote SDK/telemetry code not found as expected")
    text=text.replace("_kK(_yW)","/* offline build: telemetry disabled */")
    text=text.replace('var _yW = "https://ping.yoyogames.com/pingback?data=";','var _yW = "";')
    text,_=re.subn(r'function ads_engagement_launch\\(_uQ, _vQ\\) \\{[\\s\\S]*?^\\}',"function ads_engagement_launch(_uQ, _vQ) { return; }",text,flags=re.M)
    for remote in ["ping.yoyogames.com","jsd.supersonicads.com","a248.e.akamai.net","connect.facebook.net"]:
        if remote in text:
            raise RuntimeError("Idle Breakout still contains remote runtime endpoint: "+remote)
    js.write_text(text,encoding="utf-8")

def file_count(folder):
    return sum(1 for p in Path(folder).rglob("*") if p.is_file())

def main():
    protected=["do-not-take-this-cat-home","20-minutes-till-dawn"]
    before={name:digest_tree(ROOT/name) for name in protected}
    fixed,removed,skipped,unresolved=[],[],[],[]
    with tempfile.TemporaryDirectory(prefix="offline-game-repair-") as temp:
        temp=Path(temp)
        for source in SOURCES:
            game=source["game"]
            target=ROOT/game
            if not is_broken_launcher(target):
                skipped.append((game,"Not a two-file remote launcher; existing local content preserved."))
                continue
            src=temp/game
            try:
                clone_exact(source,src)
                license_path=src/("LICENSE.txt" if game=="2048" else "LICENSE")
                if not license_path.is_file():
                    raise RuntimeError("Upstream license file missing")
                clear_launcher_keep_cover(target)
                copy_source(src,target,source["paths"])
                if game=="flappy-bird":
                    patch_flappy(target)
                elif game=="chess-classic":
                    patch_chess(target)
                elif game=="idle-breakout":
                    patch_idle_breakout(target)
                test=run(["node","tests/offline-game-smoke.mjs",game],cwd=ROOT,check=False,capture=True)
                output=(test.stdout or "")+(test.stderr or "")
                if test.returncode==0 and '"result":"PASS"' in output:
                    fixed.append({"game":game,"source":source["repo"],"commit":source["commit"],"license":source["license"],
                                  "files":file_count(target),"bytes":sum(p.stat().st_size for p in target.rglob("*") if p.is_file()),
                                  "test":output.strip().splitlines()[-1]})
                    print("PASS "+game+" "+output.strip().splitlines()[-1])
                else:
                    reason="Offline Chromium verification failed; candidate removed. "+output[-1800:]
                    shutil.rmtree(target,ignore_errors=True)
                    removed.append((game,reason))
                    print("REMOVED "+game+" after failed offline verification")
            except Exception as exc:
                unresolved.append((game,str(exc)))
                print("UNRESOLVED "+game+": "+str(exc))

    for name,reason in UNRECOVERABLE:
        folder=ROOT/name
        if is_broken_launcher(folder):
            shutil.rmtree(folder)
            removed.append((name,reason))
            print("REMOVED "+name+": "+reason)

    after={name:digest_tree(ROOT/name) for name in protected}
    if before!=after:
        raise RuntimeError("Protected game folder changed; aborting commit")

    lines=["# Offline repair batch 1 — 2026-11-14","","The batch runner copied pinned upstream builds, removed optional remote services, and ran Chromium gameplay tests with all non-local browser requests blocked.","","## Verified fixed",""]
    if fixed:
        for item in fixed:
            lines.append("- **"+item["game"]+"** — "+str(item["files"])+" files, "+str(item["bytes"])+" bytes; source "+item["source"]+" at "+item["commit"]+" ("+item["license"]+"). Test: "+item["test"]+".")
    else:
        lines.append("- None. No candidate passed the offline gameplay tests.")
    lines += ["","## Removed as unrecoverable or failed verification",""]
    if removed:
        for name,reason in removed:
            lines.append("- **"+name+"** — "+reason.replace("\\n"," "))
    else:
        lines.append("- None.")
    lines += ["","## Preserved without overwrite",""]
    if skipped:
        for name,reason in skipped:
            lines.append("- **"+name+"** — "+reason)
    else:
        lines.append("- None.")
    lines += ["","## Source retrieval or preparation issues",""]
    if unresolved:
        for name,reason in unresolved:
            lines.append("- **"+name+"** — "+reason)
    else:
        lines.append("- None.")
    lines += ["","## Remaining unresolved from the prior audit",""]
    for name,reason in UNRESOLVED:
        lines.append("- **"+name+"** — "+reason)
    lines += ["","## Protected games","","- do-not-take-this-cat-home: unchanged (SHA-256 tree comparison passed).","- 20-minutes-till-dawn: unchanged (SHA-256 tree comparison passed).","","## Verification rules","","A game is counted fixed only if the Chromium test passed with zero external requests, zero local asset HTTP errors, zero failed local requests, and zero page exceptions. Candidates whose source could not be fetched are reported unresolved; candidates whose imported build failed verification are removed."]
    REPORT.parent.mkdir(parents=True,exist_ok=True)
    REPORT.write_text("\\n".join(lines)+"\\n",encoding="utf-8")

    run(["git","config","user.name","github-actions[bot]"],cwd=ROOT)
    run(["git","config","user.email","41898282+github-actions[bot]@users.noreply.github.com"],cwd=ROOT)
    run(["git","fetch","origin","main"],cwd=ROOT)
    local=run(["git","rev-parse","HEAD"],cwd=ROOT,capture=True).stdout.strip()
    remote=run(["git","rev-parse","origin/main"],cwd=ROOT,capture=True).stdout.strip()
    if local!=remote:
        raise RuntimeError("main moved during repair run; refusing to push over newer changes")
    run(["git","add","-A"],cwd=ROOT)
    staged=subprocess.run(["git","diff","--cached","--quiet"],cwd=ROOT)
    if staged.returncode==0:
        print("No repository changes to commit.")
        return
    run(["git","commit","-m","Repair offline game batch 1"],cwd=ROOT)
    sha=run(["git","rev-parse","HEAD"],cwd=ROOT,capture=True).stdout.strip()
    run(["git","push","origin","HEAD:main"],cwd=ROOT)
    print("BATCH_COMMIT="+sha)
    print("BATCH_URL=https://github.com/hummingbird-9/games/commit/"+sha)
    print("FIXED="+", ".join(x["game"] for x in fixed))
    print("REMOVED="+", ".join(x[0] for x in removed))

if __name__=="__main__":
    main()
