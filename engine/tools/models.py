"""Real 3D models (3dicons.co, ~210 free icons, CC0) for the 2.5D reels.
  python engine/tools/models.py search <word> [...]     -> catalog names/tags matching any word
  python engine/tools/models.py fetch <name> [...]      -> assets/models/<name>.fbx (name = slug of the icon name, e.g. "map-pin")
  python engine/tools/models.py link <reel>             -> hard-link every shared model into the reel
  python engine/tools/models.py list                    -> models already downloaded
Downloaded models are recoloured to the brand at render time by lib/brand-models.js.
Known bad model: wifi (renders nothing). Check every new model on a test sheet before using it."""
import json, os, re, sys, urllib.request
from common import ASSETS, die, link_or_copy, reel_dir

MD = os.path.join(ASSETS, 'models')
CAT = os.path.join(MD, 'catalog.json')


def catalog(refresh=False):
    if refresh or not os.path.exists(CAT):
        open(CAT, 'wb').write(urllib.request.urlopen('https://3dicons.co/api/icons', timeout=60).read())
    return json.load(open(CAT, encoding='utf-8'))['catalog']['icons']


slug = lambda name: re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
cmd = sys.argv[1] if len(sys.argv) > 1 else 'list'
if cmd == 'search':
    words = [w.lower() for w in sys.argv[2:]]
    for ic in catalog():
        hay = ' '.join([ic['name'].lower(), *ic.get('tags', [])])
        if any(w in hay for w in words):
            mark = '*' if os.path.exists(os.path.join(MD, slug(ic['name']) + '.fbx')) else ' '
            print(f"{mark} {slug(ic['name']):22s} {', '.join(ic.get('tags', []))}")
elif cmd == 'fetch':
    by = {slug(ic['name']): ic for ic in catalog()}
    for n in sys.argv[2:]:
        if n not in by:
            print('not in catalog:', n); continue
        dst = os.path.join(MD, n + '.fbx')
        if os.path.exists(dst):
            print('have', n); continue
        r = json.loads(urllib.request.urlopen(f"https://3dicons.co/api/icon/download/{by[n]['icon_id']}?type=fbx&copy=true", timeout=60).read())
        open(dst, 'wb').write(urllib.request.urlopen(r['data'][0]['src']['url'], timeout=120).read())
        print('fetched', n, os.path.getsize(dst) // 1024, 'KB')
elif cmd == 'link':
    rd = reel_dir(sys.argv[2])
    for f in os.listdir(MD):
        if f.endswith('.fbx'):
            link_or_copy(os.path.join(MD, f), os.path.join(rd, 'assets', 'models', f))
    print('linked into', rd)
elif cmd == 'list':
    print(' '.join(sorted(f[:-4] for f in os.listdir(MD) if f.endswith('.fbx'))))
else:
    die(__doc__)
