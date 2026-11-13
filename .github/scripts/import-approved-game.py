#!/usr/bin/env python3
"""Safely import a reviewed community game archive into the games repository."""
from __future__ import annotations

import io
import os
import re
import shutil
import subprocess
import sys
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path, PurePosixPath

MAX_ARCHIVE_BYTES = 25 * 1024 * 1024
MAX_EXPANDED_BYTES = 100 * 1024 * 1024
MAX_FILES = 3000
ALLOWED_COVER_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"}

def fail(message: str) -> None:
    print(message, file=sys.stderr)
    raise SystemExit(1)

def find_archive_url(body: str) -> str:
    candidates = re.findall(
        r"https://github\.com/user-attachments/files/[^\s)\]>]+",
        body or "",
        flags=re.IGNORECASE,
    )
    archives = []
    for candidate in candidates:
        candidate = candidate.rstrip(".,;")
        if urllib.parse.urlsplit(candidate).path.lower().endswith(".zip"):
            archives.append(candidate)
    if len(archives) != 1:
        fail("Expected exactly one attached .zip game archive in the issue body.")
    parsed = urllib.parse.urlsplit(archives[0])
    if parsed.scheme != "https" or parsed.hostname != "github.com":
        fail("The game archive must be attached directly to the GitHub issue.")
    return archives[0]

def download_archive(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Hummingbird-Game-Submission-Importer", "Accept": "application/octet-stream"},
    )
    try:
        with urllib.request.urlopen(request, timeout=90) as response:
            data = response.read(MAX_ARCHIVE_BYTES + 1)
    except Exception as exc:
        fail("Could not download the attached game archive: " + str(exc))
    if len(data) > MAX_ARCHIVE_BYTES:
        fail("The game ZIP is larger than GitHub's 25 MB attachment limit.")
    return data

def safe_parts(raw_name: str) -> tuple[str, ...]:
    if not raw_name or "\\" in raw_name or "\x00" in raw_name:
        fail("The ZIP contains an invalid file path.")
    path = PurePosixPath(raw_name)
    if path.is_absolute() or any(part in ("", ".", "..") for part in path.parts):
        fail("The ZIP contains an unsafe file path.")
    if any(part.lower() in (".git", ".github") for part in path.parts):
        fail("The ZIP contains a reserved repository path.")
    return path.parts

def make_slug(title: str) -> str:
    name = re.sub(r"^Game submission:\s*", "", title or "", flags=re.IGNORECASE).strip()
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:64]
    return slug or "community-game"

def extract_game(data: bytes, destination: Path) -> None:
    try:
        archive = zipfile.ZipFile(io.BytesIO(data))
    except zipfile.BadZipFile:
        fail("The attached file is not a valid ZIP archive.")

    with archive:
        infos = [item for item in archive.infolist() if not item.is_dir()]
        if not infos or len(infos) > MAX_FILES:
            fail("The ZIP must contain between 1 and 3,000 files.")
        total_size = sum(item.file_size for item in infos)
        if total_size > MAX_EXPANDED_BYTES:
            fail("The expanded game is larger than the 100 MB safety limit.")

        normalized: list[tuple[zipfile.ZipInfo, tuple[str, ...]]] = []
        seen: set[str] = set()
        for info in infos:
            parts = safe_parts(info.filename)
            key = "/".join(parts).casefold()
            if key in seen:
                fail("The ZIP contains duplicate file paths.")
            seen.add(key)
            mode = (info.external_attr >> 16) & 0o170000
            if mode == 0o120000:
                fail("The ZIP contains a symbolic link, which is not allowed.")
            if parts[0] == "__MACOSX" or parts[-1] in (".DS_Store", "Thumbs.db"):
                continue
            normalized.append((info, parts))

        if not any(parts == ("index.html",) for _, parts in normalized):
            fail("The ZIP must contain index.html at its root.")
        if not any(
            len(parts) == 1 and Path(parts[0]).suffix.lower() in ALLOWED_COVER_EXTENSIONS
            and parts[0].lower().startswith("community-cover.")
            for _, parts in normalized
        ):
            fail("The ZIP must include the selected cover image as community-cover.<extension> at its root.")

        destination.mkdir(parents=False, exist_ok=False)
        try:
            for info, parts in normalized:
                target = destination.joinpath(*parts)
                target.parent.mkdir(parents=True, exist_ok=True)
                with archive.open(info, "r") as source, target.open("xb") as output:
                    shutil.copyfileobj(source, output, length=1024 * 1024)
        except Exception:
            shutil.rmtree(destination, ignore_errors=True)
            raise

def main() -> None:
    issue_title = os.environ.get("ISSUE_TITLE", "")
    issue_body = os.environ.get("ISSUE_BODY", "")
    if not issue_title.lower().startswith("game submission:"):
        fail("This workflow only imports Game submission issues.")

    archive_url = find_archive_url(issue_body)
    archive_data = download_archive(archive_url)
    slug = make_slug(issue_title)
    suffix = 2
    # Sparse checkout omits the game folders from disk, so check the Git tree
    # rather than relying only on Path.exists() when avoiding folder collisions.
    existing = subprocess.run(
        ["git", "ls-tree", "-d", "--name-only", "HEAD"],
        check=True, capture_output=True, text=True,
    ).stdout.splitlines()
    existing_names = set(existing)
    while slug in existing_names or Path(slug).exists():
        slug = make_slug(issue_title) + "-" + str(suffix)
        suffix += 1

    destination = Path(slug)
    extract_game(archive_data, destination)

    output_path = os.environ.get("GITHUB_OUTPUT")
    if not output_path:
        fail("GitHub Actions output file is unavailable.")
    with open(output_path, "a", encoding="utf-8") as output:
        output.write("game_slug=" + slug + "\n")
    print("Imported validated game into " + slug)

if __name__ == "__main__":
    main()
