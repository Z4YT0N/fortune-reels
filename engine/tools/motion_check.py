"""Smooth-motion gate (owner 2026-11-06, rules/motion.md "Smooth motion"). HARD FAIL when:
  - more than 2 motion events run at once on any frame, or
  - a collage piece rests less than 0.6 s between two moves.
  python engine/tools/motion_check.py <reel>
Needs window.__qaMotion(time) and window.__qaHolds() in the composition (see reels/005-gallery-weight-v2/template.tpl).
A motion event = one text line, or one piece, or several pieces that start the same move within 2 frames.
Accents (squash/nudge <= 5 %) and opacity-only fades are not moves. Writes <reel>/renders/qa/motion.json."""
import json, os, shutil, socket, subprocess, sys, tempfile, time, types
from common import reel_dir

rd = reel_dir(sys.argv[1])
qa = os.path.join(rd, 'renders', 'qa'); os.makedirs(qa, exist_ok=True)
probe = open(os.path.join(os.path.dirname(__file__), 'motion_probe.js'), encoding='utf-8').read()

s = socket.socket(); s.bind(('127.0.0.1', 0)); port = s.getsockname()[1]; s.close()
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1', '--directory', rd],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
AB = [shutil.which('agent-browser') or shutil.which('agent-browser.cmd') or 'agent-browser', '--session', f'motion-{port}']

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
json.dump(res, open(os.path.join(qa, 'motion.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for o in res['over'][:40]:
    print('  >2 at', o)
for h in res['holds']:
    print('  short hold:', h)
bad = len(res['over']) + len(res['holds'])
hist = ', '.join(f'{k} moving: {v}' for k, v in sorted(res['hist'].items(), key=lambda kv: int(kv[0])))
print(f"{'PASS' if bad == 0 else 'FAIL'} motion: {len(res['over'])} frames with >2 events, {len(res['holds'])} short holds, over {res['samples']} frames ({hist})")
sys.exit(1 if bad else 0)
