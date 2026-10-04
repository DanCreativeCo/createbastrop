#!/usr/bin/env python3
"""Stamp local CSS/JS links in every page with a content hash (?v=...).

GitHub Pages lets browsers cache assets for 10 minutes, so after a deploy a
visitor can get new HTML with an old stylesheet. Run this before committing
whenever css/ or js/ changes:

    python3 tools/version-assets.py
"""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_RE = re.compile(r'((?:href|src)="((?:css|js)/[^"?]+\.(?:css|js)))(?:\?v=[0-9a-f]+)?"')


def fingerprint(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()[:8]


for page in sorted(ROOT.glob('*.html')):
    html = page.read_text()
    stamped = ASSET_RE.sub(lambda m: f'{m.group(1)}?v={fingerprint(m.group(2))}"', html)
    if stamped != html:
        page.write_text(stamped)
        print(f'updated {page.name}')
