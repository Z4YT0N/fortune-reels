"""Generate the reel's missing effects with ElevenLabs sound-generation into assets/sfx/<name>.mp3 (skips existing).
python sfxgen.py [name ...]. Use the owner pack (assets/sfx-library/owner-pack-2026-11/) first; generate only what it lacks.
Prompt = what the picture shows, physically ("a heavy aluminium frame slammed into a concrete opening: one deep metal thud"), never music."""
import json, os, sys, urllib.error, urllib.request
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'engine', 'tools'))
from common import secret
FX = {
    # 'paper_rip': ("A large sheet of thick paper ripped off a wall in one fast loud tear", 1.2),
    # 'stamp': ("A rubber stamp pressed hard onto a paper contract on a wooden desk, one firm thump", 0.8),
}
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'sfx'); os.makedirs(out, exist_ok=True)
todo = [n for n in (sys.argv[1:] or FX) if not os.path.exists(os.path.join(out, n + '.mp3'))]
if not todo:
    sys.exit('nothing to generate (FX empty or all present)')
key = secret('ELEVENLABS_API_KEY')
for name in todo:
    text, dur = FX[name]
    req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation', data=json.dumps({'text': text, 'duration_seconds': dur, 'prompt_influence': 0.6}).encode(),
                                 headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    try:
        open(os.path.join(out, name + '.mp3'), 'wb').write(urllib.request.urlopen(req, timeout=180).read()); print('ok', name)
    except urllib.error.HTTPError as e:
        print(name, 'HTTP', e.code, e.read().decode('utf-8', 'replace')[:200])
