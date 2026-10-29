"""Voice-over with ElevenLabs (word timings included).
  python engine/tools/vo.py <reel> takes [A B C]   -> audio/vo-<take>.mp3 + .json (default takes: A B)
  python engine/tools/vo.py <reel> pick B [1.12]   -> assets/audio/vo.mp3 (sped up), audio/vo.json, reel.json
  python engine/tools/vo.py <reel> words           -> index, word, start (original seconds) for captions.json
The script is <reel>/script.txt: one paragraph, numbers written as Arabic words.
The owner must LISTEN to the takes and pick one: the accent cannot be verified by text (rules/voice-and-sound.md)."""
import base64, json, os, shutil, sys, urllib.error, urllib.request
from common import die, ffprobe_duration, load_cfg, reel_dir, run, save_cfg, secret

TAKES = {
    'A': ('eleven_multilingual_v2', '', {'stability': 0.55, 'similarity_boost': 0.9, 'style': 0.25, 'use_speaker_boost': True}),
    'B': ('eleven_v3', '', {'stability': 0.5}),  # owner's pick on 2026-10-27 and 2026-10-29
    'C': ('eleven_v3', '[Najdi Saudi accent] ', {'stability': 0.5}),
}


def words_of(alignment):
    words, cur, st, end = [], '', None, 0
    for ch, s, e in zip(alignment['characters'], alignment['character_start_times_seconds'], alignment['character_end_times_seconds']):
        if ch.isspace():
            if cur:
                words.append([cur, round(st, 2), round(end, 2)]); cur, st = '', None
        else:
            if st is None:
                st = s
            cur += ch; end = e
    if cur:
        words.append([cur, round(st, 2), round(end, 2)])
    return words


rd = reel_dir(sys.argv[1]); cmd = sys.argv[2] if len(sys.argv) > 2 else 'takes'
cfg = load_cfg(rd); audio = os.path.join(rd, 'audio')
if cmd == 'takes':
    text = open(os.path.join(rd, 'script.txt'), encoding='utf-8').read().strip()
    if not text:
        die('script.txt is empty')
    key, voice = secret('ELEVENLABS_API_KEY'), cfg['voice']['id']
    for name in (sys.argv[3:] or ['A', 'B']):
        model, prefix, vs = TAKES[name]
        req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128',
                                     data=json.dumps({'text': prefix + text, 'model_id': model, 'voice_settings': vs}).encode(),
                                     headers={'xi-api-key': key, 'Content-Type': 'application/json'})
        try:
            r = json.loads(urllib.request.urlopen(req, timeout=300).read())
        except urllib.error.HTTPError as e:
            print(name, 'HTTP', e.code, e.read().decode('utf-8', 'replace')[:400]); continue
        open(os.path.join(audio, f'vo-{name}.mp3'), 'wb').write(base64.b64decode(r['audio_base64']))
        w = words_of(r['alignment'])
        if prefix:  # drop the audio-tag words from the timings
            w = w[len(prefix.split()):]
        json.dump(w, open(os.path.join(audio, f'vo-{name}.json'), 'w', encoding='utf-8'), ensure_ascii=False)
        print(f'{name} {model}: {w[-1][2]:.2f}s, {len(w)} words, {len(w) / w[-1][2]:.2f} words/s')
elif cmd == 'pick':
    name = sys.argv[3]; speed = float(sys.argv[4]) if len(sys.argv) > 4 else cfg.get('speed', 1.0)
    src = os.path.join(audio, f'vo-{name}.mp3')
    dst = os.path.join(rd, 'assets', 'audio', 'vo.mp3')
    if speed == 1.0:
        shutil.copy2(src, dst)
    else:
        run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-filter:a', f'atempo={speed}', '-b:a', '192k', dst])
    shutil.copy2(os.path.join(audio, f'vo-{name}.json'), os.path.join(audio, 'vo.json'))
    cfg['voice']['pick'] = name; cfg['speed'] = speed; save_cfg(rd, cfg)
    print(f'picked {name} at {speed}x: {ffprobe_duration(dst):.2f}s')
elif cmd == 'words':
    for i, (w, s, e) in enumerate(json.load(open(os.path.join(audio, 'vo.json'), encoding='utf-8'))):
        print(f'{i:3d}  {s:6.2f}  {w}')
else:
    die(__doc__)
