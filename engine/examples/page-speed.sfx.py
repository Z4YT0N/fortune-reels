"""Sound effects (ElevenLabs sound generation) and the final mix: voice + effects placed on the timeline.
Usage: python sfx.py gen   -> assets/sfx/*.mp3
       python sfx.py mix   -> assets/audio/mix.mp3"""
import json, os, subprocess, sys, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, 'assets', 'sfx'); os.makedirs(OUT, exist_ok=True)
KEY = next(l.split('=', 1)[1].strip().strip('"') for l in open(r'E:\Library\01-Workspace\Fortune\fortune-next\.env.local', encoding='utf-8') if l.startswith('ELEVENLABS_API_KEY='))
SPEED = 1.12
FX = {
    'alarm': ('Short bright alarm clock bell ringing, metallic, cartoony, clean', 1.0),
    'whoosh': ('Fast clean airy whoosh swipe transition, modern motion graphics', 0.6),
    'whoosh2': ('Deep smooth cinematic whoosh passing by, clean', 0.8),
    'bell': ('Single hotel reception service desk bell ding, clean', 0.6),
    'pop': ('Soft cute bubble pop, UI sound, clean', 0.4),
    'tick': ('Clock ticking, tick tock, crisp, close', 1.6),
    'zap': ('Short electric lightning zap, energetic, clean', 0.7),
    'error': ('Soft computer error bloop, short, minimal UI', 0.5),
    'riser': ('Fast digital counter rolling up, ticking numbers rising, clean UI', 1.2),
    'drop': ('Cartoon falling whistle then soft thump', 1.0),
    'cash': ('Cash register ka-ching, clean, short', 0.8),
    'thud': ('Heavy deep cartoon thud of something big landing, punchy', 0.7),
    'clatter': ('Small plastic pieces dropping and bouncing on a desk', 1.0),
    'swipe': ('Quick marker strike-through swipe sound, short', 0.4),
    'boing': ('Short springy boing bounce, playful, clean', 0.6),
    'chime': ('Bright positive success chime, modern UI, clean', 1.0),
    'rocket': ('Small rocket launching whoosh, fast, clean', 1.2),
}
# (original voice-over second, effect, volume)
CUES = [(0.0, 'alarm', 0.45), (1.88, 'whoosh', 0.6), (2.62, 'whoosh2', 0.5), (4.35, 'bell', 0.6), (4.6, 'bell', 0.5), (4.85, 'bell', 0.45),
        (6.5, 'pop', 0.5), (7.0, 'tick', 0.45), (8.65, 'whoosh', 0.6), (10.0, 'whoosh2', 0.45), (11.6, 'zap', 0.45), (13.3, 'whoosh', 0.6),
        (14.1, 'pop', 0.45), (15.7, 'error', 0.55), (16.4, 'whoosh2', 0.45), (17.85, 'riser', 0.4), (19.2, 'riser', 0.4), (20.9, 'pop', 0.4),
        (22.1, 'drop', 0.5), (23.5, 'pop', 0.45), (24.0, 'alarm', 0.35), (25.1, 'whoosh2', 0.45), (27.45, 'riser', 0.35), (29.3, 'pop', 0.45),
        (30.0, 'cash', 0.5), (30.8, 'riser', 0.4), (33.05, 'whoosh2', 0.45), (37.6, 'whoosh', 0.4), (37.95, 'thud', 0.65), (38.5, 'clatter', 0.45),
        (40.7, 'swipe', 0.5), (41.45, 'boing', 0.5), (42.6, 'chime', 0.5), (43.4, 'rocket', 0.45), (45.4, 'pop', 0.5), (46.3, 'pop', 0.4),
        (47.0, 'chime', 0.45), (49.5, 'whoosh2', 0.45), (50.1, 'alarm', 0.4)]

if sys.argv[1] == 'gen':
    for name, (text, dur) in FX.items():
        dst = os.path.join(OUT, name + '.mp3')
        if os.path.exists(dst): continue
        req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation', data=json.dumps({'text': text, 'duration_seconds': max(0.5, dur), 'prompt_influence': 0.6}).encode(),
                                     headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
        try: open(dst, 'wb').write(urllib.request.urlopen(req, timeout=120).read()); print('ok', name)
        except urllib.error.HTTPError as e: print(name, 'HTTP', e.code, e.read().decode('utf-8', 'replace')[:200])
else:
    inputs, filt = ['-i', os.path.join(HERE, 'assets', 'audio', 'vo.mp3')], []
    for k, (t, name, vol) in enumerate(CUES):
        inputs += ['-i', os.path.join(OUT, name + '.mp3')]
        ms = int(t / SPEED * 1000)
        filt.append(f'[{k + 1}:a]volume={vol},adelay={ms}|{ms}[s{k}]')
    mix = '[0:a]' + ''.join(f'[s{k}]' for k in range(len(CUES)))
    filt.append(f'{mix}amix=inputs={len(CUES) + 1}:duration=first:normalize=0,alimiter=limit=0.95[out]')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(filt), '-map', '[out]', '-b:a', '192k', os.path.join(HERE, 'assets', 'audio', 'mix.mp3')], check=True)
    print('mixed', len(CUES), 'cues')
