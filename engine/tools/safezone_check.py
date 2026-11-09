"""Safe-zone gate (Instagram + TikTok, 1080x1920). HARD FAIL on any violation.
  python engine/tools/safezone_check.py <reel> [--step 0.2] [--sheet path/to/render.mp4]
Zone for all text and key visuals: x 60-960, y 230-1440 (rules/motion.md, rules/quality-gates.md).
Mark faces, numbers, stamps, logos, product cut-outs and screens with data-key="..." in the template;
every text glyph (.tk .w) is checked automatically. Elements with effective opacity < 0.5, or in
transit (a moving collage segment: data-transit="1", or under a running text tween) are skipped.
Writes <reel>/renders/qa/safezone.json and, with --sheet, renders/qa/safezone-sheet.jpg
(one frame a second from the render, with the zone drawn: green inside, red outside)."""
import json, os, shutil, socket, subprocess, sys, time
from common import reel_dir

rd = reel_dir(sys.argv[1])
step = float(sys.argv[sys.argv.index('--step') + 1]) if '--step' in sys.argv else 0.2
sheet_src = sys.argv[sys.argv.index('--sheet') + 1] if '--sheet' in sys.argv else None
qa = os.path.join(rd, 'renders', 'qa'); os.makedirs(qa, exist_ok=True)
probe = open(os.path.join(os.path.dirname(__file__), 'safezone_probe.js'), encoding='utf-8').read()

s = socket.socket(); s.bind(('127.0.0.1', 0)); port = s.getsockname()[1]; s.close()
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1', '--directory', rd],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
sess = f'safezone-{port}'
AB = [shutil.which('agent-browser') or shutil.which('agent-browser.cmd') or 'agent-browser', '--session', sess]  # .cmd shim on Windows
import tempfile, types
def ab(*a, timeout=600, stdin_text=None):
    # Windows: never pipe agent-browser (its daemon keeps the pipe open and the call hangs); redirect to a file
    fd, path = tempfile.mkstemp(suffix='.txt'); os.close(fd)
    with open(path, 'w', encoding='utf-8') as f:
        try:
            if stdin_text is None:
                subprocess.run(AB + list(a), stdout=f, stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL, timeout=timeout)
            else:  # code goes through stdin: a .cmd shim would mangle newlines and < > | & in an argument
                subprocess.run(AB + list(a), stdout=f, stderr=subprocess.STDOUT, input=stdin_text.encode('utf-8'), timeout=timeout)
        except subprocess.TimeoutExpired:
            pass
    out = open(path, encoding='utf-8', errors='replace').read()
    try:
        os.remove(path)
    except OSError:
        pass  # the agent-browser daemon may still hold the file it was started with
    return types.SimpleNamespace(stdout=out, stderr='')
try:
    time.sleep(0.8)
    ab('open', f'http://127.0.0.1:{port}/index.html')
    ab('set', 'viewport', '1080', '1920')
    ab('wait', '--load', 'networkidle')
    for _ in range(40):  # wait for the composition to finish building (fonts, images)
        r = ab('eval', '!!(window.__timelines && window.__timelines.main)')
        if 'true' in r.stdout:
            break
        time.sleep(0.5)
    code = probe.replace('parseFloat(window.__szStep || 0.2)', str(step))
    r = ab('eval', '--stdin', timeout=1200, stdin_text=code)  # one expression; agent-browser returns its awaited value
finally:
    ab('close'); srv.terminate()
txt = r.stdout.strip()
# agent-browser may print status lines; the probe result is the last JSON string line
lines = [l for l in txt.splitlines() if l.strip().startswith('"{') or l.strip().startswith('{')]
txt = lines[-1].strip() if lines else txt
try:
    res = json.loads(json.loads(txt)) if txt.startswith('"') else json.loads(txt)
except Exception:
    print('FAIL safezone: probe failed:', (r.stdout + r.stderr)[-600:]); sys.exit(2)
if not isinstance(res, dict):
    print('FAIL safezone: probe returned', repr(res), '| raw:', r.stdout[-400:]); sys.exit(2)
if 'error' in res:
    print('FAIL safezone:', res['error']); sys.exit(2)
V = res['violations']
json.dump(res, open(os.path.join(qa, 'safezone.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
# group consecutive samples of the same element + edges into spans
spans = {}
for v in V:
    k = (v['el'], ','.join(v['edges']))
    spans.setdefault(k, []).append(v)
for (el, edges), vs in sorted(spans.items(), key=lambda kv: kv[1][0]['t']):
    worst = vs[0]['box']
    print(f"  {vs[0]['t']:6.2f}-{vs[-1]['t']:6.2f}s  {el:32s} {edges:14s} box {worst}")

if sheet_src:
    from PIL import Image, ImageDraw
    import tempfile
    tmp = tempfile.mkdtemp()
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', sheet_src], capture_output=True, text=True).stdout)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', sheet_src, '-vf', 'fps=1,scale=270:480', os.path.join(tmp, 'f%03d.png')], check=True)
    frames = sorted(f for f in os.listdir(tmp) if f.endswith('.png'))
    k = 270 / 1080; cols = 8; rows = (len(frames) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * 274, rows * 504), (20, 20, 20)); d0 = ImageDraw.Draw(sheet)
    for i, f in enumerate(frames):
        im = Image.open(os.path.join(tmp, f)).convert('RGBA')
        ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
        zx0, zy0, zx1, zy1 = 60 * k, 230 * k, 960 * k, 1440 * k
        for box in [(0, 0, 270, zy0), (0, zy1, 270, 480), (0, zy0, zx0, zy1), (zx1, zy0, 270, zy1)]:
            d.rectangle(box, fill=(255, 0, 0, 70))
        d.rectangle((zx0, zy0, zx1, zy1), outline=(0, 219, 51, 255), width=2)
        for v in V:
            if abs(v['t'] - i) <= step / 2 + 0.5 and int(v['t']) == i:
                x0, y0, x1, y1 = [c * k for c in v['box']]; d.rectangle((x0, y0, x1, y1), outline=(255, 0, 0, 255), width=2)
        im = Image.alpha_composite(im, ov).convert('RGB')
        x, y = (i % cols) * 274, (i // cols) * 504
        sheet.paste(im, (x, y)); d0.text((x + 4, y + 484), f'{i}s', fill=(255, 255, 255))
    sheet.save(os.path.join(qa, 'safezone-sheet.jpg'), quality=86)
    print('sheet:', os.path.join(qa, 'safezone-sheet.jpg'))

n = len(V)
print(f"{'PASS' if n == 0 else 'FAIL'} safezone: {n} violating samples ({len(spans)} element spans) over {res['samples']} samples every {step}s")
sys.exit(0 if n == 0 else 1)
