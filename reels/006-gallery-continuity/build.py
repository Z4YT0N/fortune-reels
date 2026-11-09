"""Fill template.tpl -> index.html (D, WORDS from audio/vo.json)."""
import json
w = json.load(open('audio/vo.json', encoding='utf-8'))
D = round(w[-1][2] + 0.45, 2)
W = lambda i: w[i][1]
clips = {'VH': (W(14) + 0.12, W(17) + 0.1), 'VP': (W(40) - 0.18, W(42) + 0.1), 'VY': (W(62) - 0.12, W(67) + 0.06), 'VC': (W(67) - 0.06, W(73) + 0.06)}
t = open('template.tpl', encoding='utf-8').read().replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
for k, (s, e) in clips.items():
    t = t.replace(f'__{k}_S__', f'{s:.2f}').replace(f'__{k}_D__', f'{e - s:.2f}')
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
