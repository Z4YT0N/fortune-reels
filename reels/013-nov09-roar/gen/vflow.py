"""python gen/vflow.py <shot> <start_id> <end_id> [dur] : submits a Flow Omni frames-to-video job (wait false), prompt gen/<shot>.txt"""
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__)); name, s, e = sys.argv[1:4]; dur = int(sys.argv[4]) if len(sys.argv) > 4 else 5
p = open(os.path.join(here, name + '.txt'), encoding='utf-8').read().strip()
out = os.path.join(here, name).replace(os.sep, '/'); os.makedirs(out, exist_ok=True)
a = {"project_id": "12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36", "kind": "video", "prompt": p, "aspect": "9:16", "count": 1, "start_image_id": s, "end_image_id": e,
     "duration_sec": dur, "max_credits": 15, "wait": False, "download_dir": out}
r = subprocess.run(['bash', '../../../vendor/flow-locked.sh', 'flow_agent_generate', json.dumps(a)], cwd=here, capture_output=True, text=True, encoding='utf-8', errors='replace')
print(r.stdout[-3000:], r.stderr[-1500:])
open(os.path.join(here, name + '.submit.json'), 'w', encoding='utf-8').write(r.stdout)
