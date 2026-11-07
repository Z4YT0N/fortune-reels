"""Fill roar.tpl -> index.html (D fixed at the film's length, WORDS from audio/words.json, beats.js spliced in)."""
import json
w = json.load(open('audio/words.json', encoding='utf-8'))
D = 27.3
t = open('roar.tpl', encoding='utf-8').read().replace('/*BEATS*/', open('beats.js', encoding='utf-8').read()).replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
