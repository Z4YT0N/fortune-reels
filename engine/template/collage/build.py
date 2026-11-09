"""Fill reel.tpl -> index.html: __D__ (from assets/video/bg.mp4), WORDS (audio/vo.json) and the brand tokens (brand.json).
python build.py [--d SECONDS] [--sync]
  --d     duration when there is no bg.mp4 yet (default: last word end + 2 s, at least 7 s); a paper-coloured PLACEHOLDER bg.mp4
          is then written so the page can be checked and snapshotted before the film exists. film.py overwrites it.
  --sync  re-copy lib/kinetic.js from engine/kinetic/kinetic.js (the reel keeps its own copy so engine changes never break it)."""
import argparse, json, os, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
os.chdir(HERE); sys.stdout.reconfigure(encoding='utf-8')
ap = argparse.ArgumentParser(); ap.add_argument('--d', type=float); ap.add_argument('--sync', action='store_true'); a = ap.parse_args()
if a.sync:
    shutil.copy2(os.path.join(ROOT, 'engine', 'kinetic', 'kinetic.js'), os.path.join('lib', 'kinetic.js')); print('lib/kinetic.js synced')

B = json.load(open('brand.json', encoding='utf-8'))
w = json.load(open('audio/vo.json', encoding='utf-8')) if os.path.exists('audio/vo.json') else []
if not w:
    print('WARNING: no audio/vo.json yet: WORDS is empty, the template runs on its fallback times')
bg = 'assets/video/bg.mp4'
probe = lambda f: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
if not os.path.exists(bg):
    d = a.d or max(7.0, (w[-1][2] + 2.0) if w else 0)
    os.makedirs(os.path.dirname(bg), exist_ok=True)
    c = B['colors']['paper'].lstrip('#')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', f'color=c=0x{c}:s=1080x1920:r=30:d={d + 0.02:.2f}', '-c:v', 'libx264', '-crf', '18',
                    '-g', '30', '-keyint_min', '30', '-pix_fmt', 'yuv420p', bg], check=True)
    print(f'WARNING: no bg.mp4: wrote a PLACEHOLDER paper film of {d:.2f} s (film.py replaces it)')
D = round(probe(bg) - 0.02, 2)


def font_css(role, var):
    f = B['fonts'].get(role)
    if not f:
        return '', None
    fam = f['family']
    faces = ''.join(f'@font-face {{ font-family: "{fam}"; font-weight: {x["weight"]}; src: url("{x["file"]}"); }}\n      ' for x in f['files'])
    return faces, fam


css, root = '', []
for role, var in (('hero', '--font-hero'), ('label', '--font-label'), ('latin', '--font-latin')):
    faces, fam = font_css(role, var)
    css += faces
    if fam:
        root.append(f'{var}: "{fam}";')
fh, fl = B['fonts']['hero']['files'], B['fonts']['label']['files']
root += [f'--hero-weight: {fh[0]["weight"]};', f'--label-weight: {fl[0]["weight"]};', f'--label-weight-m: {fl[-1]["weight"]};']
col = B['colors']
root += [f'--ink: {col["ink"]};', f'--ink-deep: {col["ink_deep"]};', f'--ink-soft: {col["ink_soft"]};', f'--paper: {col["paper"]};',
         f'--dark: {col["dark"]};', f'--on-ink: {col.get("on_ink", col["paper"])};']
css += ':root { ' + ' '.join(root) + ' }'
# only what the page shows: never the banned words or the facts (brand_lint reads brand.json itself)
show = {k: B[k] for k in ('id', 'name_ar', 'name_en', 'cta', 'contact')}
show.update(logo_on_dark=B['logo']['on_dark'], logo_on_light=B['logo']['on_light'])
t = open('reel.tpl', encoding='utf-8').read()
for tok in ('__D__', '/*WORDS*/[]', '/*BRAND*/{}', '/*BRAND_CSS*/'):
    if tok not in t:
        sys.exit(f'reel.tpl lost the {tok} token')
t = t.replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False)).replace('/*BRAND*/{}', json.dumps(show, ensure_ascii=False)).replace('/*BRAND_CSS*/', css)
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D, '| words', len(w), '| brand', B['id'])
