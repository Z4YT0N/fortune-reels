"""Fill minimal.tpl -> index.html (D and WORDS from ../shared)."""
import json
w = json.load(open('../shared/words.json', encoding='utf-8'))
D = 9.75
t = open('minimal.tpl', encoding='utf-8').read().replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
