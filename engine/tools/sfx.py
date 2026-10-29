"""Sound effects and the final mix.
  python engine/tools/sfx.py <reel> gen   -> generates every effect named in cues.json that the shared
                                           library (assets/sfx) lacks, via ElevenLabs, and links it in
  python engine/tools/sfx.py <reel> mix   -> assets/audio/mix.mp3 = voice + effects (+ optional bed)
cues.json: [[<original voice-over second>, "<effect>", <volume 0-1>], ...]
  <effect> is a name from engine/tools/sfx_library.json, or a path under assets/sfx-library/
  (e.g. "motionix/Pop/Pop 3.wav"). Add new names to sfx_library.json (English prompt, seconds).
reel.json may carry "bed": {"file": "<path under assets/>", "volume": 0.08} for a music bed under the voice."""
import json, os, sys, urllib.error, urllib.request
from common import ASSETS, ENGINE, die, link_or_copy, load_cfg, reel_dir, run, secret

rd = reel_dir(sys.argv[1]); cmd = sys.argv[2] if len(sys.argv) > 2 else 'mix'
cfg = load_cfg(rd); speed = cfg.get('speed', 1.0)
LIB = json.load(open(os.path.join(ENGINE, 'tools', 'sfx_library.json'), encoding='utf-8'))
CUES = json.load(open(os.path.join(rd, 'cues.json'), encoding='utf-8'))


def path_of(name):
    if name in LIB:
        return os.path.join(rd, 'assets', 'sfx', name + '.mp3')
    p = os.path.join(ASSETS, 'sfx-library', name)
    if not os.path.exists(p):
        die(f'effect "{name}" is neither in sfx_library.json nor under assets/sfx-library')
    return p


if cmd == 'gen':
    key = None
    for name in sorted({c[1] for c in CUES if c[1] in LIB}):
        shared = os.path.join(ASSETS, 'sfx', name + '.mp3')
        if not os.path.exists(shared):
            key = key or secret('ELEVENLABS_API_KEY')
            text, dur = LIB[name]
            req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation',
                                         data=json.dumps({'text': text, 'duration_seconds': max(0.5, dur), 'prompt_influence': 0.6}).encode(),
                                         headers={'xi-api-key': key, 'Content-Type': 'application/json'})
            try:
                open(shared, 'wb').write(urllib.request.urlopen(req, timeout=120).read()); print('generated', name)
            except urllib.error.HTTPError as e:
                print(name, 'HTTP', e.code, e.read().decode('utf-8', 'replace')[:200]); continue
        link_or_copy(shared, os.path.join(rd, 'assets', 'sfx', name + '.mp3'))
    print('effects ready')
elif cmd == 'mix':
    inputs, filt = ['-i', os.path.join(rd, 'assets', 'audio', 'vo.mp3')], []
    k = 0
    for t, name, vol in CUES:
        inputs += ['-i', path_of(name)]
        ms = max(0, int(t / speed * 1000))
        filt.append(f'[{k + 1}:a]volume={vol},adelay={ms}|{ms}[s{k}]'); k += 1
    labels = ''.join(f'[s{i}]' for i in range(k))
    bed = cfg.get('bed')
    if bed:
        inputs += ['-stream_loop', '-1', '-i', os.path.join(ASSETS, bed['file'])]
        filt.append(f'[{k + 1}:a]volume={bed.get("volume", 0.08)}[bed]'); labels += '[bed]'; k += 1
    filt.append(f'[0:a]{labels}amix=inputs={k + 1}:duration=first:normalize=0,alimiter=limit=0.95[out]')
    out = os.path.join(rd, 'assets', 'audio', 'mix.mp3')
    run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(filt), '-map', '[out]', '-b:a', '192k', out])
    print('mix.mp3:', len(CUES), 'cues', '+ bed' if bed else '')
else:
    die(__doc__)
