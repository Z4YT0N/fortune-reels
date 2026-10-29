"""Build <reel>/index.html from template.tpl + caption chunks.
  python engine/tools/captions.py <reel>
captions.json:
  "merge":  { "<first word index>": ["<display text>", <last word index>] }  spoken number words shown as digits
  "chunks": [ [<first idx>, <last idx>, ["<highlight word as displayed>", ...]], ... ]  max 2 lines, ~6 words a line
Indexes come from `vo.py <reel> words`. Times are divided by the reel's speed so they match assets/audio/vo.mp3.
Chunks must cover every word once, in order; the tool refuses gaps and overlaps."""
import json, os, sys
from common import die, load_cfg, reel_dir

rd = reel_dir(sys.argv[1]); cfg = load_cfg(rd); speed = cfg.get('speed', 1.0)
W = json.load(open(os.path.join(rd, 'audio', 'vo.json'), encoding='utf-8'))
W = [[w, s / speed, e / speed] for w, s, e in W]
D = round(W[-1][2] + 0.35, 2)
C = json.load(open(os.path.join(rd, 'captions.json'), encoding='utf-8'))
merge = {int(k): v for k, v in C.get('merge', {}).items()}
chunks = C['chunks']
if not chunks:
    die('captions.json has no chunks yet')
expect = 0
for a, b, _ in chunks:
    if a != expect:
        die(f'chunk starting at {a} leaves a gap or overlap (expected {expect})')
    expect = b + 1
if expect != len(W):
    die(f'chunks end at word {expect - 1}, voice has {len(W)} words')


def words(a, b):
    out, i = [], a
    while i <= b:
        if i in merge:
            text, last = merge[i]; out.append([text, W[i][1]]); i = last + 1
        else:
            out.append([W[i][0], W[i][1]]); i += 1
    return out


caps = []
for n, (a, b, hl) in enumerate(chunks):
    ws = words(a, b)
    nxt = W[chunks[n + 1][0]][1] if n + 1 < len(chunks) else D + 1
    caps.append({'w': [[t, round(s, 2), t in hl] for t, s in ws], 'end': round(nxt - 0.05, 2)})
    missing = [h for h in hl if h not in [t for t, _ in ws]]
    if missing:
        print(f'WARN chunk {n}: highlight {missing} not found in {[t for t, _ in ws]}')
    if len(ws) > 12:
        print(f'WARN chunk {n}: {len(ws)} words, more than two lines')

tpl = open(os.path.join(rd, 'template.tpl'), encoding='utf-8').read()
html = (tpl.replace('/*CAPS*/[]', json.dumps(caps, ensure_ascii=False)).replace('__D__', str(D))
        .replace('__SPEED__', str(speed)).replace('__TITLE__', 'FortuneCode | ' + cfg['title']))
open(os.path.join(rd, 'index.html'), 'w', encoding='utf-8').write(html)
print('index.html: duration', D, 's,', len(caps), 'chunks')
