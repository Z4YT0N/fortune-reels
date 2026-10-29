"""Scaffold a new reel: reels/NNN-<slug>/ with the template, shared lib, brand assets, models and SFX.
Usage: python engine/tools/new_reel.py <slug> "<working title>"
The reel folder is self-contained (lib and template are copied, so later engine changes never
break an old reel); big binaries are hard-linked from assets/."""
import datetime, glob, os, shutil, sys
from common import ASSETS, ENGINE, HF, REELS, die, link_or_copy, save_cfg

if len(sys.argv) < 3:
    die('usage: new_reel.py <slug> "<title>"')
slug, title = sys.argv[1].lower(), sys.argv[2]
os.makedirs(REELS, exist_ok=True)
n = 1 + max([int(d[:3]) for d in os.listdir(REELS) if d[:3].isdigit()] or [0])
rd = os.path.join(REELS, f'{n:03d}-{slug}')
if os.path.exists(rd):
    die(f'{rd} exists')

for sub in ['audio', 'assets/audio', 'assets/fonts', 'assets/brand', 'assets/models', 'assets/sfx', 'assets/img', 'lib', 'renders', 'snap']:
    os.makedirs(os.path.join(rd, sub), exist_ok=True)
shutil.copy2(os.path.join(ENGINE, 'template', 'template.tpl'), os.path.join(rd, 'template.tpl'))
for f in glob.glob(os.path.join(ENGINE, 'lib', '*.js')):
    shutil.copy2(f, os.path.join(rd, 'lib'))
for f in glob.glob(os.path.join(ASSETS, 'brand', 'fonts', '*.woff2')):
    shutil.copy2(f, os.path.join(rd, 'assets', 'fonts'))
for f in ['logo-white.png', 'mark.svg']:
    shutil.copy2(os.path.join(ASSETS, 'brand', f), os.path.join(rd, 'assets', 'brand', f))
for f in glob.glob(os.path.join(ASSETS, 'models', '*.fbx')):
    link_or_copy(f, os.path.join(rd, 'assets', 'models', os.path.basename(f)))
for f in glob.glob(os.path.join(ASSETS, 'sfx', '*.mp3')):
    link_or_copy(f, os.path.join(rd, 'assets', 'sfx', os.path.basename(f)))

open(os.path.join(rd, 'package.json'), 'w', encoding='utf-8').write(f'''{{
  "name": "reel-{slug}",
  "private": true,
  "type": "module",
  "scripts": {{
    "dev": "npx --yes {HF} preview",
    "check": "npx --yes {HF} check",
    "render": "npx --yes {HF} render --output renders/{slug}.mp4"
  }}
}}
''')
open(os.path.join(rd, 'hyperframes.json'), 'w', encoding='utf-8').write('''{
  "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
  "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  "paths": { "blocks": "compositions", "components": "compositions/components", "assets": "assets" },
  "media": { "autoProxy": true }
}
''')
save_cfg(rd, {
    'slug': slug, 'title': title, 'created': datetime.date.today().isoformat(), 'status': 'script',
    'speed': 1.0, 'voice': {'id': 'KfYUTAF49N2CPU3iKuMi', 'pick': None},
    'keyword': None, 'sources': [], 'delivered': None,
})
for name, body in {
    'script.txt': '',
    'captions.json': '{\n  "merge": {},\n  "chunks": []\n}\n',
    'cues.json': '[]\n',
    'BRIEF.md': f'# {title}\n\nTopic:\nService it sells:\nHook (picked, with score):\nKeyword CTA:\nSources (opened URLs):\n',
    'SHOTS.md': f'# Shot list: {title}\n\n| # | VO time (orig s) | world | shot | motion | sfx |\n|---|---|---|---|---|---|\n',
    'NOTE.md': f'# QA note: {title}\n\nqa.py numbers, frames looked at, what was fixed, open flags.\n',
}.items():
    open(os.path.join(rd, name), 'w', encoding='utf-8').write(body)
print(rd)
