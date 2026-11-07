"""STT check of a take with ElevenLabs scribe_v1: python stt.py B1 -> audio/stt-B1.txt (transcript) and a word diff vs script.txt."""
import sys, os, json, uuid, urllib.request, difflib
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'engine', 'tools'))
from common import secret
name = sys.argv[1]; f = f'audio/vo-{name}.mp3'; ref = sys.argv[2] if len(sys.argv) > 2 else 'script.txt'
b = uuid.uuid4().hex
body = (f'--{b}\r\nContent-Disposition: form-data; name="model_id"\r\n\r\nscribe_v1\r\n'
        f'--{b}\r\nContent-Disposition: form-data; name="language_code"\r\n\r\nara\r\n'
        f'--{b}\r\nContent-Disposition: form-data; name="file"; filename="a.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n').encode() + open(f, 'rb').read() + f'\r\n--{b}--\r\n'.encode()
req = urllib.request.Request('https://api.elevenlabs.io/v1/speech-to-text', data=body, headers={'xi-api-key': secret('ELEVENLABS_API_KEY'), 'Content-Type': f'multipart/form-data; boundary={b}'})
r = json.loads(urllib.request.urlopen(req, timeout=300).read())
txt = r['text']; open(f'audio/stt-{name}.txt', 'w', encoding='utf-8').write(txt)
norm = lambda s: [w.strip('،.؟,?!') for w in s.split()]
a, c = norm(open(ref, encoding='utf-8').read()), norm(txt)
out = [f'{op}: script={a[i1:i2]} heard={c[j1:j2]}' for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, c).get_opcodes() if op != 'equal']
open(f'audio/stt-{name}.diff.txt', 'w', encoding='utf-8').write('\n'.join(out) or 'MATCH')
print(name, 'diffs:', len(out))
