"""Scaffold a collage reel (reel-006 / reel-018 style) for a brand in one command.
Usage: python engine/tools/new_collage_reel.py <slug> --brand <id> [--title "..."]
Creates reels/NNN-<slug>/ (next free number) with reel.tpl (loads lib/kinetic.js, brand CSS variables and fonts, one commented
example beat per move), build.py, film.py, make_cues.py, mix.py, sfxgen.py, tts.py, stt.py, qa_strips.py, onset.py,
hyperframes.json, package.json, BRIEF.md, NOTE.md, script.txt, caption.txt, brand.json (local copy) and gen/jobs.keys.json +
gen/jobs.shots.json (fd.mjs templates with the brand style suffix). Fonts and logos are copied from brands/<id>/, the grain is
generated, the kinetic libraries (kinetic.js + fx.js) are copied from engine/kinetic/ (build.py --sync refreshes them)."""
import argparse, datetime, json, os, re, shutil, subprocess, sys
from common import ENGINE, REELS, ROOT, die

HF = 'hyperframes@0.9.20'
# reel 006 style-bible references already uploaded to Flow (project 12f3c7f0): B = the medium, C = the Saudi man. Attach by media ID.
STYLE_REFS = ['df6199eb-27d8-45df-9e7e-e6e49172640d', '68fd185e-69c9-46db-9c78-a5b15756d963']

ap = argparse.ArgumentParser(description='Scaffold a collage reel for a brand.')
ap.add_argument('slug'); ap.add_argument('--brand', required=True); ap.add_argument('--title')
a = ap.parse_args()
slug = re.sub(r'[^a-z0-9-]+', '-', a.slug.lower()).strip('-')
bf = os.path.join(ROOT, 'brands', a.brand + '.json')
if not os.path.exists(bf):
    die(f'no brand file {bf} (see brands/README.md)')
B = json.load(open(bf, encoding='utf-8'))
title = a.title or f'{B["name_en"]}: {slug}'
n = 1 + max([int(d[:3]) for d in os.listdir(REELS) if d[:3].isdigit()] or [0])
nnn = f'{n:03d}'; rd = os.path.join(REELS, f'{nnn}-{slug}')
if os.path.exists(rd):
    die(f'{rd} exists')
for sub in ['audio', 'assets/audio', 'assets/fonts', 'assets/brand', 'assets/img', 'assets/sfx', 'assets/video', 'lib', 'keys', 'gen', 'shots', 'renders', 'snap']:
    os.makedirs(os.path.join(rd, sub), exist_ok=True)

# brand.json: a local copy whose font and logo paths point at the copied files
local = json.loads(json.dumps(B))
for role, f in B['fonts'].items():
    if not f:
        continue
    for k, x in enumerate(f['files']):
        dst = os.path.join('assets', 'fonts', os.path.basename(x['file']))
        shutil.copy2(os.path.join(ROOT, x['file']), os.path.join(rd, dst)); local['fonts'][role]['files'][k]['file'] = dst.replace(os.sep, '/')
for k, p in B['logo'].items():
    dst = os.path.join('assets', 'brand', os.path.basename(p))
    shutil.copy2(os.path.join(ROOT, p), os.path.join(rd, dst)); local['logo'][k] = dst.replace(os.sep, '/')
local['source'] = f'brands/{a.brand}.json (copied {datetime.date.today().isoformat()}); edit the brand file, not this copy, for anything that is not reel-specific'
json.dump(local, open(os.path.join(rd, 'brand.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

for lib in ('kinetic.js', 'fx.js'):
    shutil.copy2(os.path.join(ENGINE, 'kinetic', lib), os.path.join(rd, 'lib', lib))
subprocess.run([sys.executable, os.path.join(ENGINE, 'kinetic', 'make_grain.py'), os.path.join(rd, 'assets', 'img')], check=True, capture_output=True)

TOK = {'{{NNN}}': nnn, '{{SLUG}}': slug, '{{TITLE}}': title, '{{BRAND}}': a.brand, '{{DATE}}': datetime.date.today().isoformat()}
tdir = os.path.join(ENGINE, 'template', 'collage')
for f in sorted(os.listdir(tdir)):
    s = open(os.path.join(tdir, f), encoding='utf-8').read()
    for k, v in TOK.items():
        s = s.replace(k, v)
    open(os.path.join(rd, f), 'w', encoding='utf-8', newline='\n').write(s)

open(os.path.join(rd, 'package.json'), 'w', encoding='utf-8').write(json.dumps({
    'name': f'reel-{nnn}-{slug}', 'private': True, 'type': 'module',
    'scripts': {'build': 'python build.py', 'check': f'npx --yes {HF} check', 'snapshot': f'npx --yes {HF} snapshot -o snap',
                'render': f'npx --yes {HF} render --fps 120 --output renders/final-120.mp4'}}, indent=2) + '\n')
open(os.path.join(rd, 'hyperframes.json'), 'w', encoding='utf-8').write(json.dumps({
    '$schema': 'https://hyperframes.heygen.com/schema/hyperframes.json',
    'registry': 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry',
    'paths': {'blocks': 'compositions', 'components': 'compositions/components', 'assets': 'assets'},
    'media': {'autoProxy': True}}, indent=2) + '\n')
open(os.path.join(rd, 'script.txt'), 'w', encoding='utf-8').write('')
open(os.path.join(rd, 'caption.txt'), 'w', encoding='utf-8').write('')
open(os.path.join(rd, 'cues.json'), 'w', encoding='utf-8').write('[]\n')

# fd.mjs job templates. No hex codes and no words in prompts: Omni paints them into the picture (018 S4).
S = B['style']
BIBLE = (f'{B["name_en"].upper()} COLLAGE STYLE (fixed house look of reel 006, ink: {S["ink_word"]}): a hand-made editorial collage. Real candid black-and-white '
         'documentary photographs (35mm Kodak Tri-X look, heavy natural grain, natural light, real people and real places) are cut out and printed as '
         f'coarse halftone riso prints on {S["paper_word"]} paper, with torn edges, masking tape and paper fibres. A second riso ink layer in {S["ink_word"]} '
         f'(and {S["ink_deep_word"]} for shadows) is slightly mis-registered behind the cut-outs. Over the collage, an art director has drawn by hand with a thick '
         f'{S["ink_word"]} marker: circles, arrows, a dashed selection box with square corner handles, and a black mouse cursor. {S["ink_word"].capitalize()} is used '
         'ONLY on the one object that matters in the moment plus the marker marks; everything else is black, grey and paper. Visible film grain and print noise '
         'over everything. Calm empty paper in the top quarter of the frame for typography. No text, no letters, no numbers, no logos, no watermark. '
         'Never glossy, never CGI, never plastic skin, never a photoreal 3D render.')
TAIL = (f'Use the two attached reference images ONLY for the medium (halftone cut-out collage on paper, grain, tape, hand marker marks) and the man. '
        f'Recolour every accent: the only accent ink is {S["ink_word"]}. Paper is {S["paper_word"]}, NOT beige, NOT warm. '
        'Generate exactly 1 vertical 9:16 image, Nano Banana, no questions.')
SCENE = f'TODO one continuous world, one location, seen the same way in every keyframe ({S["world"]}).'
gen = os.path.join(rd, 'gen').replace('\\', '/')
keys = [{'name': f'K{i}a', 'prompt': f'{BIBLE}\nVertical 9:16. {SCENE} KEYFRAME {i} (TODO: the moment, the thread object, where the type will sit).{" The attached images after the first two are EARLIER KEYFRAMES of this same film: keep the same objects, wall, paper, camera height and the same man." if i else ""} {TAIL}',
         'att': list(STYLE_REFS), 'out': f'{gen}/K{i}'} for i in range(6)]
HEAD = ('Generate ONE video now with Omni Flash, frames-to-video mode, 9:16, 5 seconds, 720p, x1. Use the first attached image as the FIRST frame '
        'and the second attached image as the LAST frame. Do not generate images. ')
VTAIL = (f' One continuous camera move, no cut. Keep the exact look of both frames the whole time: a hand-made collage of black-and-white halftone photo cut-outs '
         f'on {S["paper_word"]} paper, film grain, torn paper edges, tape, hand-drawn {S["ink_word"]} marker marks, {S["ink_word"]} is the only colour. '
         'Never write or draw any text, letters, numbers or codes anywhere. No morphing: people, hands, faces and objects keep their exact shape; natural physics; '
         'nothing melts or changes into something else. No text.')
shots = [{'name': f'S{i + 1}', 'prompt': HEAD + f'TODO the motion from K{i} to K{i + 1} (one camera move, what happens, what stays the same).' + VTAIL,
          'att': [f'TODO K{i} mediaId', f'TODO K{i + 1} mediaId'], 'maxCredits': 16, 'out': f'{rd.replace(os.sep, "/")}/shots/S{i + 1}'} for i in range(5)]
json.dump(keys, open(os.path.join(rd, 'gen', 'jobs.keys.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(shots, open(os.path.join(rd, 'gen', 'jobs.shots.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

print(f'created {rd}')
print(f'  brand {a.brand}: ink {B["colors"]["ink"]}, hero "{B["fonts"]["hero"]["family"]}", label "{B["fonts"]["label"]["family"]}"')
print('  next: write BRIEF.md (story, hooks, transition map) and script.txt -> python tts.py A1 (x3) -> stt.py -> fill gen/jobs.keys.json ->')
print('        node vendor/flow-direct/fd.mjs gen <reel>/gen/jobs.keys.json --par 3 -> GATE 1 (owner OK) -> gen/jobs.shots.json (credits) -> film.py ...')
print(f'  check now: cd {rd} && python build.py && npx --yes {HF} check')
