"""Text-overlap gate (owner 2026-11-06: «والمعرض يفـ» sat half-hidden on a photo and a phone). HARD FAIL when:
  - a visible text glyph overlaps a visible data-key image (photo, phone, face, cut-out) by > 5 % of the glyph, or
  - a text glyph at full opacity, not moving, is clipped (< 85 % shown) for longer than 0.3 s.
  python engine/tools/overlap_check.py <reel>
Sampled every 0.1 s; items in transit (moving pieces, running text tweens) are skipped. Writes renders/qa/overlap.json."""
import json, os, shutil, socket, subprocess, sys, tempfile, time, types
from common import reel_dir

rd = reel_dir(sys.argv[1])
qa = os.path.join(rd, 'renders', 'qa'); os.makedirs(qa, exist_ok=True)
probe = open(os.path.join(os.path.dirname(__file__), 'overlap_probe.js'), encoding='utf-8').read()

s = socket.socket(); s.bind(('127.0.0.1', 0)); port = s.getsockname()[1]; s.close()
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1', '--directory', rd],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
AB = [shutil.which('agent-browser') or shutil.which('agent-browser.cmd') or 'agent-browser', '--session', f'overlap-{port}']

def ab(*a, timeout=600, stdin_text=None):
    # Windows: never pipe agent-browser (its daemon keeps the pipe open); redirect to a file
    fd, path = tempfile.mkstemp(suffix='.txt'); os.close(fd)
    with open(path, 'w', encoding='utf-8') as f:
        try:
            if stdin_text is None:
                subprocess.run(AB + list(a), stdout=f, stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL, timeout=timeout)
            else:
                subprocess.run(AB + list(a), stdout=f, stderr=subprocess.STDOUT, input=stdin_text.encode('utf-8'), timeout=timeout)
        except subprocess.TimeoutExpired:
            pass
    out = open(path, encoding='utf-8', errors='replace').read()
    try:
        os.remove(path)
    except OSError:
        pass
    return types.SimpleNamespace(stdout=out)

try:
    time.sleep(0.8)
    ab('open', f'http://127.0.0.1:{port}/index.html')
    ab('set', 'viewport', '1080', '1920')
    ab('wait', '--load', 'networkidle')
    for _ in range(40):
        if 'true' in ab('eval', '!!(window.__timelines && window.__timelines.main)').stdout:
            break
        time.sleep(0.5)
    r = ab('eval', '--stdin', timeout=1200, stdin_text=probe)
finally:
    ab('close'); srv.terminate()

lines = [l.strip() for l in r.stdout.splitlines() if l.strip().startswith(('"{', '{'))]
txt = lines[-1] if lines else r.stdout.strip()
try:
    res = json.loads(json.loads(txt)) if txt.startswith('"') else json.loads(txt)
except Exception:
    print('FAIL motion: probe returned', r.stdout[-600:]); sys.exit(2)
if 'error' in res:
    print('FAIL motion:', res['error']); sys.exit(2)
json.dump(res, open(os.path.join(qa, 'overlap.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
def spans(items, key):
    out = {}
    for it in items:
        k = key(it); out.setdefault(k, []).append(it['t'])
    res = []
    for k, ts in out.items():
        ts.sort(); s0 = prev = ts[0]
        for t in ts[1:] + [None]:
            if t is None or t - prev > 0.15:
                res.append((k, s0, prev)); s0 = t
            if t is not None: prev = t
    return res
ov = spans(res['overlaps'], lambda it: it['text'] + ' over ' + it['key'])
cl = [s for s in spans(res['clips'], lambda it: it['text']) if s[2] - s[1] >= 0.3 - 1e-6]
for k, a, b in ov: print(f'  overlap {a:6.2f}-{b:6.2f}s  {k}')
for k, a, b in cl: print(f'  clipped {a:6.2f}-{b:6.2f}s  {k}')
bad = len(ov) + len(cl)
print(f"{'PASS' if bad == 0 else 'FAIL'} overlap: {len(ov)} text-over-image spans, {len(cl)} clipped-text spans (> 0.3 s) over {res['samples']} samples every 0.1s")
sys.exit(1 if bad else 0)
