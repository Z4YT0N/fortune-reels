"""Keyframes K0..K5 in Flow (Nano Banana Pro) via the shared lock. python run_keys.py K0 K1 ... [noref]"""
import json, subprocess, os, re, sys
here = os.path.dirname(os.path.abspath(__file__)).replace(os.sep, '/')
W = f'{here}/../../../vendor/flow-locked.sh'; P = "12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36"
J = json.load(open(f'{here}/keys.json', encoding='utf-8'))
REF = ('K0', 'K1', 'K2', 'K5')


def call(tool, a):
    r = subprocess.run(['bash', W, tool, json.dumps(a)], capture_output=True, text=True, encoding='utf-8', errors='replace')
    return r.stdout + r.stderr


ids = []
idf = f'{here}/ref-id.txt'
if os.path.exists(idf):
    ids = [open(idf).read().strip()]
elif 'noref' not in sys.argv:
    ref = os.path.abspath(f'{here}/../assets/cut/man-happy.png').replace(os.sep, '/')
    o = call('flow_upload_images', {"project_id": P, "paths": [ref]}); print('upload', o[-1500:], flush=True)
    ids = re.findall(r'mediaId\\?"?\s*:\s*\\?"([A-Za-z0-9_\-]+)', o)
    if ids: open(idf, 'w').write(ids[0])
    print('ids', ids, flush=True)
for k in [a for a in sys.argv[1:] if a.startswith('K')]:
    out = f'{here}/{k}'; os.makedirs(out, exist_ok=True)
    a = {"project_id": P, "kind": "image", "prompt": J[k] + '\n\n' + (J['look_dark'] if k == 'K3' else J['look']), "aspect": "9:16", "count": 2, "download_dir": out}
    if ids and k in REF: a["reference_image_ids"] = ids[:1]
    print(k, call('flow_agent_generate', a)[-1500:].replace('\n', ' '), flush=True)
