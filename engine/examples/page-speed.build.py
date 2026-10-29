"""Builds index.html for the Page Speed reel: caption chunks from the voice-over word timings
(audio sped up 1.12x, so every time is divided by SPEED) + template.tpl."""
import json, os, sys
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
SPEED = 1.12
W = json.load(open(os.path.join(HERE, 'audio', 'vo-B.json'), encoding='utf-8'))
W = [[w, s / SPEED, e / SPEED] for w, s, e in W]
D = round(W[-1][2] + 0.35, 2)

# spoken numbers shown as digits: first word index -> (display, last word index)
MERGE = {0: ('3', 0), 38: ('10,000', 39), 43: ('53%', 45), 55: ('3', 55), 63: ('0.1', 63), 71: ('8.4%.', 74), 115: ('3', 115)}
CHUNKS = [
    (0, 5, ['3', 'ثواني']),
    (6, 11, ['مطعم،']),
    (12, 16, ['ومحد']),
    (17, 21, ['وتطلع']),
    (22, 24, ['موقعك']),
    (25, 29, ['Page', 'Speed،']),
    (30, 33, ['سرعة']),
    (34, 40, ['10,000']),
    (41, 48, ['53%']),
    (49, 52, ['يطلعون']),
    (53, 56, ['3', 'ثواني.']),
    (57, 62, ['ديلويت']),
    (63, 66, ['0.1']),
    (67, 74, ['8.4%.']),
    (75, 81, ['يعرفونه:']),
    (82, 88, ['ثقيلة']),
    (89, 95, ['الاستضافة.']),
    (96, 100, ['فورتشن', 'كود']),
    (101, 104, ['خفيفة']),
    (105, 108, ['"سرعة"']),
    (109, 113, ['ببلاش.']),
    (114, 121, ['3', 'ثواني']),
]

def words(a, b):
    out, i = [], a
    while i <= b:
        if i in MERGE:
            text, last = MERGE[i]; out.append([text, W[i][1]]); i = last + 1
        else:
            out.append([W[i][0], W[i][1]]); i += 1
    return out

caps = []
for n, (a, b, hl) in enumerate(CHUNKS):
    ws = words(a, b)
    nxt = W[CHUNKS[n + 1][0]][1] if n + 1 < len(CHUNKS) else D + 1
    caps.append({'w': [[t, round(s, 2), t in hl] for t, s in ws], 'end': round(nxt - 0.05, 2)})

tpl = open(os.path.join(HERE, 'template.tpl'), encoding='utf-8').read()
html = tpl.replace('/*CAPS*/[]', json.dumps(caps, ensure_ascii=False)).replace('__D__', str(D))
open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8').write(html)
print('duration', D, 'chunks', len(caps))
