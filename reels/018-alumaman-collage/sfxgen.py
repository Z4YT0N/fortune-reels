"""Generate the reel's missing effects with ElevenLabs sound-generation into assets/sfx/<name>.mp3 (skips existing).
python sfxgen.py [name ...]"""
import json, os, sys, urllib.error, urllib.request
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'engine', 'tools'))
from common import secret
FX = {
 'storm_a': ("Desert sandstorm outdoors: strong wind howling, sand hissing against a house wall and a window, gusts rising and falling, no music, no voices", 22),
 'storm_b': ("Desert sandstorm wind, steady roar with sand grains hissing, distant palm fronds thrashing, no music, no voices", 22),
 'dust_gust': ("A sudden gust of wind blows sand through the gap of an old window, sharp airy whoosh with sand hiss", 1.6),
 'frame_slam': ("A heavy aluminium window frame slammed hard into a concrete wall opening: one deep metal thud with a short glass rattle, dust puff", 2.0),
 'glass_tick': ("Fine sand grains tapping and ticking against a closed glass window pane from outside, light and crisp", 2.5),
 'stamp': ("A rubber stamp pressed hard onto a paper contract on a wooden desk, one firm thump", 0.8),
 'tag_drop': ("A small cardboard tag on a string drops and bounces twice, light paper flutter and a soft tap", 1.2),
 'coffee_pour': ("Arabic coffee poured from a brass dallah into a small finjan cup, short gentle pour", 2.5),
 'screwdriver': ("A screwdriver tightening a metal window hinge screw, three short squeaky turns", 1.6),
 'paper_rip': ("A large sheet of thick paper ripped off a wall in one fast loud tear", 1.2),
 'wind_settle': ("Wind slowly dying down to a calm quiet evening, soft low air", 3.5),
}
key = secret('ELEVENLABS_API_KEY'); out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'sfx'); os.makedirs(out, exist_ok=True)
for name in (sys.argv[1:] or FX):
    f = os.path.join(out, name + '.mp3')
    if os.path.exists(f):
        continue
    text, dur = FX[name]
    req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation', data=json.dumps({'text': text, 'duration_seconds': dur, 'prompt_influence': 0.6}).encode(),
                                 headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    try:
        open(f, 'wb').write(urllib.request.urlopen(req, timeout=180).read()); print('ok', name)
    except urllib.error.HTTPError as e:
        print(name, 'HTTP', e.code, e.read().decode('utf-8', 'replace')[:200])
