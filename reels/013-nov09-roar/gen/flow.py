"""python gen/flow.py <name> [ref_media_id] : reads gen/<name>.txt, generates one Flow image into gen/<name>/ via the lock wrapper."""
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__)); name = sys.argv[1]
p = open(os.path.join(here, name + '.txt'), encoding='utf-8').read().strip()
out = os.path.join(here, name).replace(os.sep, '/'); os.makedirs(out, exist_ok=True)
a = {"project_id": "12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36", "kind": "image", "prompt": p, "aspect": sys.argv[3] if len(sys.argv) > 3 else "9:16", "count": 1, "max_credits": 0, "wait": True, "download_dir": out}
if len(sys.argv) > 2 and sys.argv[2] != '-':
    a["reference_image_ids"] = sys.argv[2].split(",")
r = subprocess.run(['bash', '../../../vendor/flow-locked.sh', 'flow_agent_generate', json.dumps(a)], cwd=here, capture_output=True, text=True, encoding='utf-8', errors='replace')
print(r.stdout[-2500:], r.stderr[-1500:])
