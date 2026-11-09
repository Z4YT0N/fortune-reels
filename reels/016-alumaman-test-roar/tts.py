"""python tts.py <name> <textfile> -> audio/vo-<name>.mp3 + .json (clone hKxOF1e0PGHjtctJDcOl, eleven_v3, stability 0.5 = take B settings)."""
import sys, os, json, base64, urllib.request
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'engine', 'tools'))
from common import secret
name, tf = sys.argv[1], sys.argv[2]
text = open(tf, encoding='utf-8').read().strip()
req = urllib.request.Request('https://api.elevenlabs.io/v1/text-to-speech/hKxOF1e0PGHjtctJDcOl/with-timestamps?output_format=mp3_44100_128',
    data=json.dumps({'text': text, 'model_id': 'eleven_v3', 'voice_settings': {'stability': 0.5}}).encode(),
    headers={'xi-api-key': secret('ELEVENLABS_API_KEY'), 'Content-Type': 'application/json'})
r = json.loads(urllib.request.urlopen(req, timeout=300).read())
open(f'audio/vo-{name}.mp3', 'wb').write(base64.b64decode(r['audio_base64']))
al = r['alignment']; words, cur, st, end = [], '', None, 0
for ch, s, e in zip(al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']):
    if ch.isspace():
        if cur: words.append([cur, round(st, 2), round(end, 2)]); cur, st = '', None
    else:
        if st is None: st = s
        cur += ch; end = e
if cur: words.append([cur, round(st, 2), round(end, 2)])
json.dump(words, open(f'audio/vo-{name}.json', 'w', encoding='utf-8'), ensure_ascii=False)
print(name, f'{words[-1][2]:.2f}s', len(words), 'words')
