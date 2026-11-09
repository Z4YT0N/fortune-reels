# Send a video to the owner's WhatsApp via Evolution sendMedia on the system line (fc-system).
# Reads the service role from fortune-next/.env.local; secrets are never printed.
import base64, json, sys, urllib.request
env = {}
for l in open(r'E:/Library/01-Workspace/Fortune/fortune-next/.env.local', encoding='utf8'):
    if '=' in l and not l.startswith('#'):
        k, v = l.split('=', 1); env[k.strip()] = v.strip().strip('"').strip("'")
SU = env.get('SUPABASE_URL') or env['NEXT_PUBLIC_SUPABASE_URL']; SR = env['SUPABASE_SERVICE_ROLE_KEY']
def rest(path):
    r = urllib.request.Request(SU + '/rest/v1/' + path, headers={'apikey': SR, 'Authorization': 'Bearer ' + SR})
    return json.load(urllib.request.urlopen(r, timeout=30))
key = None
for t, col in [('app_integration_secrets', 'value'), ('app_integration_secrets', 'secret')]:
    try:
        rows = rest(f'{t}?name=eq.whatsapp_api_key&select=*')
        if rows:
            row = rows[0]; key = row.get('value') or row.get('secret') or row.get('key_value'); break
    except Exception as e:
        print('secret lookup', t, type(e).__name__)
inst = rest('whatsapp_lines?role=eq.system&select=instance')
inst = inst[0]['instance'] if inst else None
print('key found:', bool(key), '| instance:', inst)
if not key or not inst: sys.exit(1)
# usage: wa_send.py <file> <caption.txt> <number> [video|audio|document]
import os
video, caption, to = sys.argv[1], open(sys.argv[2], encoding='utf8').read().strip(), sys.argv[3]
kind = sys.argv[4] if len(sys.argv) > 4 else 'video'
mime = {'video': 'video/mp4', 'audio': 'audio/mpeg', 'image': 'image/jpeg', 'document': 'application/octet-stream'}[kind]
if kind == 'document': import mimetypes; mime = mimetypes.guess_type(video)[0] or mime
b64 = base64.b64encode(open(video, 'rb').read()).decode()
body = {'number': to, 'mediatype': 'document' if kind == 'audio' else kind, 'mimetype': mime, 'media': b64, 'fileName': os.path.basename(video), 'caption': caption, 'delay': 1200}
req = urllib.request.Request(f'https://cs.fortunecode.org/api/message/sendMedia/{inst}', data=json.dumps(body).encode(), headers={'Content-Type': 'application/json', 'apikey': key, 'User-Agent': 'fortunecode-reels/1.0'}, method='POST')
try:
    res = json.load(urllib.request.urlopen(req, timeout=300))
    print('sent:', json.dumps({k: res.get(k) for k in ('key', 'status', 'messageTimestamp')}, ensure_ascii=False)[:400])
except urllib.error.HTTPError as e:
    print('HTTP', e.code, e.read()[:400])
