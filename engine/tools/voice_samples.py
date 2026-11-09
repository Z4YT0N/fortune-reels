"""Generate one TTS sample per voice. Run inside a folder holding line.txt (the script) and
roster.txt (lines: code|voice_id|name); optional s-*.json shared-voice search results let it add
a refused library voice to "My voices" first. Model eleven_v3, stability 0.5, no tags."""
import json, sys, os, glob, urllib.request, urllib.error
key = [l.split('=',1)[1].strip().strip('"') for l in open(r'E:/Library/01-Workspace/Fortune/reel-studio/.env', encoding='utf8') if l.startswith('ELEVENLABS_API_KEY=')][0]
text = open('line.txt', encoding='utf8').read().strip()
owners = {}
for f in glob.glob('s-*.json'):
    for v in json.load(open(f, encoding='utf8')).get('voices', []):
        owners[v['voice_id']] = v.get('public_owner_id')
def req(url, body=None, method='POST'):
    r = urllib.request.Request(url, data=json.dumps(body).encode() if body is not None else None, method=method,
        headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    return urllib.request.urlopen(r, timeout=120)
roster = [l.split('|') for l in open('roster.txt', encoding='utf8').read().strip().splitlines()]
for num, vid, name in roster:
    out = f'{num}-{name}.mp3'
    if os.path.exists(out): continue
    body = {'text': text, 'model_id': 'eleven_v3', 'voice_settings': {'stability': 0.5}}
    try:
        data = req(f'https://api.elevenlabs.io/v1/text-to-speech/{vid}', body).read()
    except urllib.error.HTTPError as e:
        msg = e.read().decode('utf8', 'ignore')[:200]
        if owners.get(vid):
            try:
                req(f'https://api.elevenlabs.io/v1/voices/add/{owners[vid]}/{vid}', {'new_name': name})
                data = req(f'https://api.elevenlabs.io/v1/text-to-speech/{vid}', body).read()
            except urllib.error.HTTPError as e2:
                print(num, name, 'FAIL', e2.code, e2.read().decode('utf8','ignore')[:200]); continue
        else:
            print(num, name, 'FAIL', e.code, msg); continue
    open(out, 'wb').write(data); print(num, name, 'ok', len(data))
