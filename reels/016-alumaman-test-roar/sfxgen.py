"""Generate the few missing SFX with ElevenLabs sound-generation -> assets/sfx/<name>.mp3 (print/snip/flash/creak copied from 015)."""
import sys, os, json, urllib.request
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'engine', 'tools'))
from common import secret
JOBS = {
 'sand': ('a short gust of desert wind blowing fine sand against a window pane, hissing grains, dry', 1.8),
 'storm': ('a swirling dust storm whoosh building and then dropping into silence', 2.0),
 'screw': ('a screwdriver turning a small screw in an aluminium window hinge, three short metallic ratchet clicks, close mic', 1.0),
 'glass': ('a thick double glazed glass pane set down on concrete, solid clean glass clink with a low thud', 0.8),
 'stamp': ('a heavy rubber date stamp slammed onto paper on a stone table, one dry thump', 0.5),
}
for n, (p, d) in JOBS.items():
    out = f'assets/sfx/{n}.mp3'
    if os.path.exists(out): continue
    req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation', data=json.dumps({'text': p, 'duration_seconds': d, 'prompt_influence': 0.6}).encode(),
                                 headers={'xi-api-key': secret('ELEVENLABS_API_KEY'), 'Content-Type': 'application/json'})
    open(out, 'wb').write(urllib.request.urlopen(req, timeout=120).read()); print(n, 'ok')
