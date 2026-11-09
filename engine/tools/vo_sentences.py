"""Sentence-by-sentence voice-over with word timings (pronunciation-safe Arabic).
  python engine/tools/vo_sentences.py <reel> <take> <model> <script-file> [--dict] [--gap 0.22] [--only 3,7]
-> <reel>/audio/vo-<take>.mp3 + vo-<take>.json (words with tashkeel stripped, timings on the joined file)
   and audio/sent-<take>/NN.mp3 (one file per line, so one bad line can be regenerated with --only).
Each line of the script file is one sentence. --dict attaches audio/pron-dict.json (alias rules;
supported by eleven_multilingual_v2, not by eleven_v3). The STT check is separate: it verifies words, not harakat
or accent, so the owner still listens."""
import base64, json, os, re, subprocess, sys, urllib.error, urllib.request
from common import die, load_cfg, reel_dir, secret

HARAKAT = re.compile('[ً-ْٰـ]')
SETTINGS = {'eleven_v3': {'stability': 0.5}, 'eleven_multilingual_v2': {'stability': 0.55, 'similarity_boost': 0.9, 'style': 0.2, 'use_speaker_boost': True, 'speed': float(os.environ.get('VO_SPEED', '1.0'))}}


def words_of(al, off):
    out, cur, st, end = [], '', None, 0
    for ch, s, e in zip(al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']):
        if ch.isspace():
            if cur:
                out.append([cur, round(st + off, 3), round(end + off, 3)]); cur, st = '', None
        else:
            if st is None:
                st = s
            cur += ch; end = e
    if cur:
        out.append([cur, round(st + off, 3), round(end + off, 3)])
    return out


args = sys.argv[1:]
if len(args) < 4:
    die(__doc__)
rd, take, model, script = reel_dir(args[0]), args[1], args[2], args[3]
use_dict = '--dict' in args
gap = float(args[args.index('--gap') + 1]) if '--gap' in args else 0.22
only = set(int(x) for x in args[args.index('--only') + 1].split(',')) if '--only' in args else None
cfg = load_cfg(rd); voice = cfg['voice']['id']; key = secret('ELEVENLABS_API_KEY')
lines = [l.strip() for l in open(os.path.join(rd, script), encoding='utf-8') if l.strip()]
sd = os.path.join(rd, 'audio', f'sent-{take}'); os.makedirs(sd, exist_ok=True)
body_extra = {}
if use_dict:
    pd = json.load(open(os.path.join(rd, 'audio', 'pron-dict.json'), encoding='utf-8'))
    body_extra['pronunciation_dictionary_locators'] = [{'pronunciation_dictionary_id': pd['id'], 'version_id': pd['version_id']}]
for i, text in enumerate(lines, 1):
    mp3, js = os.path.join(sd, f'{i:02d}.mp3'), os.path.join(sd, f'{i:02d}.json')
    if os.path.exists(mp3) and (only is None or i not in only):
        continue
    body = {'text': text, 'model_id': model, 'voice_settings': SETTINGS.get(model, {'stability': 0.5})}
    if i > 1:
        body['previous_text'] = lines[i - 2]
    if i < len(lines):
        body['next_text'] = lines[i]
    if model == 'eleven_v3':
        body.pop('previous_text', None); body.pop('next_text', None)
    body.update(body_extra)
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128',
                                 data=json.dumps(body, ensure_ascii=False).encode('utf-8'), headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    try:
        r = json.loads(urllib.request.urlopen(req, timeout=300).read())
    except urllib.error.HTTPError as e:
        die(f'line {i}: HTTP {e.code} {e.read().decode("utf-8", "replace")[:300]}')
    open(mp3, 'wb').write(base64.b64decode(r['audio_base64']))
    json.dump(r['alignment'], open(js, 'w', encoding='utf-8'), ensure_ascii=False)
    print(f'{take} line {i:02d} ok')

# join: trim leading/trailing silence per sentence, add a fixed gap, keep exact offsets for the timings
words, parts, t = [], [], 0.0
for i in range(1, len(lines) + 1):
    al = json.load(open(os.path.join(sd, f'{i:02d}.json'), encoding='utf-8'))
    s0 = max(0.0, al['character_start_times_seconds'][0] - 0.03)
    s1 = al['character_end_times_seconds'][-1] + 0.06
    seg = os.path.join(sd, f'{i:02d}-trim.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(sd, f'{i:02d}.mp3'), '-ss', f'{s0:.3f}', '-to', f'{s1:.3f}',
                    '-ar', '44100', '-ac', '1', seg], check=True)
    for w in words_of(al, t - s0):
        w[0] = HARAKAT.sub('', w[0])
        words.append(w)
    real = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', seg],
                                capture_output=True, text=True).stdout.strip())  # -to past EOF is clamped
    parts.append(seg); t += real + gap
lst = os.path.join(sd, 'list.txt')
with open(lst, 'w', encoding='utf-8') as f:
    for p in parts:
        f.write(f"file '{os.path.basename(p)}'\n")
        f.write("file 'gap.wav'\n")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-t', f'{gap:.3f}', '-i', 'anullsrc=r=44100:cl=mono', os.path.join(sd, 'gap.wav')], check=True)
out = os.path.join(rd, 'audio', f'vo-{take}.mp3')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-b:a', '160k', out], check=True, cwd=sd)
json.dump(words, open(os.path.join(rd, 'audio', f'vo-{take}.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(f'{take} {model}: {t:.2f}s, {len(words)} words -> {out}')
