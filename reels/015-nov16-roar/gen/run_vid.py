"""Flow Omni frames-to-video shots via the shared lock. python run_vid.py S4 [S5 ...]  (ids + prompts in shots-flow.json)"""
import json, subprocess, os, sys
here = os.path.dirname(os.path.abspath(__file__)).replace(os.sep, '/')
W = f'{here}/../../../vendor/flow-locked.sh'; P = "12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36"
J = json.load(open(f'{here}/shots-flow.json', encoding='utf-8'))
STYLE = (" One continuous camera move, no cut, no scene change, keep the exact look, colours, paper texture and lighting of the two frames; "
         "real photographic studio footage, natural physics, no text, no letters, no morphing faces.")
for s in sys.argv[1:]:
    sh = J[s]; out = f'{here}/{s}'; os.makedirs(out, exist_ok=True)
    a = {"project_id": P, "kind": "video", "prompt": sh['prompt'] + STYLE, "aspect": "9:16", "start_image_id": sh['start'], "end_image_id": sh['end'],
         "duration_sec": sh.get('dur', 5), "resolution": "720p", "max_credits": 16, "wait": False, "download_dir": out}
    r = subprocess.run(['bash', W, 'flow_agent_generate', json.dumps(a)], capture_output=True, text=True, encoding='utf-8', errors='replace')
    print(s, (r.stdout + r.stderr)[-2000:].replace('\n', ' '), flush=True)
