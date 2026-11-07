"""Generate the few missing SFX with ElevenLabs sound-generation -> assets/sfx/<name>.mp3"""
import sys, os, json, urllib.request
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'engine', 'tools'))
from common import secret
JOBS = {
 'print': ('a small thermal receipt printer printing a short receipt, fast mechanical whirr and paper feed, dry, close mic', 1.4),
 'snip': ('one big pair of steel scissors snipping shut, a single sharp metallic snip, dry, close mic', 0.6),
 'flash': ('a single punchy camera flash pop with a short bright electric zap, transient hit', 0.5),
 'creak': ('a heavy wooden crate creaking under weight, short wood strain creak', 0.9),
}
for n, (p, d) in JOBS.items():
    out = f'assets/sfx/{n}.mp3'
    if os.path.exists(out): continue
    req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation', data=json.dumps({'text': p, 'duration_seconds': d, 'prompt_influence': 0.6}).encode(),
                                 headers={'xi-api-key': secret('ELEVENLABS_API_KEY'), 'Content-Type': 'application/json'})
    open(out, 'wb').write(urllib.request.urlopen(req, timeout=120).read()); print(n, 'ok')
