"""Fill stomp.tpl -> index.html (WORDS from ../shared/words.json, D = voice length)."""
import json
w = json.load(open('../shared/words.json', encoding='utf-8'))
D = 9.73
t = open('stomp.tpl', encoding='utf-8').read().replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
