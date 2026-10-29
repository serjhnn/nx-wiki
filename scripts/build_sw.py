"""Generate sw.js for the built site.

Lists every file the site needs (pages, search index, styles, scripts, fonts,
images) for the service worker to precache, and derives a version from their
contents so installed copies update whenever the site changes.

Usage: python scripts/build_sw.py site
"""

import hashlib
import json
import sys
from pathlib import Path

# Files that are not needed to read the wiki
EXCLUDE_NAMES = {"sw.js", "sitemap.xml", "nx-wiki-offline.zip", "LICENSE"}
EXCLUDE_SUFFIXES = {".gz", ".map", ".zip"}
EXCLUDE_DIRS = ("assets/stylesheets/classic/",)  # unused with the modern variant


def main(site: Path) -> None:
    files = []
    digest = hashlib.sha256()
    for path in sorted(site.rglob("*")):
        if not path.is_file() or path.name in EXCLUDE_NAMES or path.suffix in EXCLUDE_SUFFIXES:
            continue
        rel = path.relative_to(site).as_posix()
        if rel.startswith(EXCLUDE_DIRS):
            continue
        digest.update(rel.encode())
        digest.update(path.read_bytes())
        # Pages are requested by directory URL (mechanics/euler-equations/)
        if rel == "index.html":
            rel = "./"
        elif rel.endswith("/index.html"):
            rel = rel[: -len("index.html")]
        files.append(rel)

    template = (Path(__file__).parent / "sw.template.js").read_text()
    sw = template.replace("__VERSION__", digest.hexdigest()[:12]).replace(
        "__PRECACHE__", json.dumps(files, indent=2)
    )
    (site / "sw.js").write_text(sw)
    print(f"sw.js: {len(files)} files, version {digest.hexdigest()[:12]}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
