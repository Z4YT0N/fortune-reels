"""python tts.py <take> [textfile=script.txt] -> audio/vo-<take>.mp3 + .json (word timings), with the brand voice from brand.json.
Make 3 takes (A1 A2 A3), check each with stt.py AND the word durations, then copy the pick to audio/vo.json + assets/audio/vo.mp3.
Plain Gulf text, NO tashkeel; about 2.0-2.3 words/s; never time-stretch above x1.05: cut words instead."""
import sys, os, json, base64, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
sys.path.insert(0, os.path.join(HERE, '..', '..', 'engine', 'tools'))
from common import secret
v = json.load(open('brand.json', encoding='utf-8'))['voice']
name = sys.argv[1]; tf = sys.argv[2] if len(sys.argv) > 2 else 'script.txt'
text = open(tf, encoding='utf-8').read().strip()
req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{v["voice_id"]}/with-timestamps?output_format=mp3_44100_128',
    data=json.dumps({'text': text, 'model_id': v['model'], 'voice_settings': {'stability': v['stability']}}).encode(),
    headers={'xi-api-key': secret('ELEVENLABS_API_KEY'), 'Content-Type': 'application/json'})
r = json.loads(urllib.request.urlopen(req, timeout=300).read())
os.makedirs('audio', exist_ok=True)
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
print(name, f'{words[-1][2]:.2f}s', len(words), 'words', f'{len(words) / words[-1][2]:.2f} w/s')
