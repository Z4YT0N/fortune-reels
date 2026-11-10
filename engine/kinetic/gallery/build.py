"""Gallery of every kinetic move: gallery.tpl + slots.json -> index.html (+ schedule.json for sheet.py).
python build.py   copies lib/kinetic.js + lib/fx.js from engine/kinetic/, the Fortune fonts from brands/fortune/, makes the grain,
                  writes the brand CSS variables (brands/fortune.json) and the slot schedule into index.html.
Then: npx --yes hyperframes@0.9.20 render --output gallery.mp4  and  python sheet.py  (contact sheet, one frame per move peak)."""
import json, os, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); KIN = os.path.dirname(HERE); ROOT = os.path.abspath(os.path.join(KIN, '..', '..'))
os.chdir(HERE); sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('lib', exist_ok=True)
for f in ('kinetic.js', 'fx.js'):
    shutil.copy2(os.path.join(KIN, f), os.path.join('lib', f))
B = json.load(open(os.path.join(ROOT, 'brands', 'fortune.json'), encoding='utf-8'))
os.makedirs('assets/fonts', exist_ok=True)
css, root = '', []
for role, var in (('hero', '--font-hero'), ('label', '--font-label'), ('latin', '--font-latin')):
    f = B['fonts'][role]
    for x in f['files']:
        dst = 'assets/fonts/' + os.path.basename(x['file'])
        shutil.copy2(os.path.join(ROOT, x['file']), dst)
        css += f'@font-face {{ font-family: "{f["family"]}"; font-weight: {x["weight"]}; src: url("{dst}"); }}\n      '
    root.append(f'{var}: "{f["family"]}";')
fh, fl = B['fonts']['hero']['files'], B['fonts']['label']['files']
c = B['colors']
root += [f'--hero-weight: {fh[0]["weight"]};', f'--label-weight: {fl[0]["weight"]};', f'--label-weight-m: {fl[-1]["weight"]};',
         f'--ink: {c["ink"]};', f'--ink-deep: {c["ink_deep"]};', f'--ink-soft: {c["ink_soft"]};', f'--paper: {c["paper"]};', f'--dark: {c["dark"]};', f'--on-ink: {c["on_ink"]};']
css += ':root { ' + ' '.join(root) + ' }'
if not os.path.exists('assets/img/grain5.png'):
    subprocess.run([sys.executable, os.path.join(KIN, 'make_grain.py'), 'assets/img'], check=True, capture_output=True)

slots, t = json.load(open('slots.json', encoding='utf-8')), 0.3
for s in slots:
    s['start'] = round(t, 3); s['peak_at'] = round(t + s['peak'], 3); t += s['dur']
D = round(t + 0.3, 2)
json.dump([{k: s[k] for k in ('id', 'name', 'fam', 'src', 'start', 'dur', 'peak_at')} for s in slots], open('schedule.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
tpl = open('gallery.tpl', encoding='utf-8').read()
for tok in ('__D__', '/*SLOTS*/[]', '/*BRAND_CSS*/'):
    if tok not in tpl:
        sys.exit(f'gallery.tpl lost the {tok} token')
tpl = tpl.replace('__D__', str(D)).replace('/*SLOTS*/[]', json.dumps(slots, ensure_ascii=False)).replace('/*BRAND_CSS*/', css)
open('index.html', 'w', encoding='utf-8').write(tpl)
print(f'index.html D = {D} s, {len(slots)} moves')
