"""Fill roar.tpl -> index.html (D = voice + 2.0 s end card, WORDS from audio/words.json, POS from shots.json, beats.js)."""
import json, subprocess
w = json.load(open('audio/words.json', encoding='utf-8'))
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/vo.mp3'], capture_output=True, text=True).stdout) + 2.0, 2)
pos = json.load(open('shots.json', encoding='utf-8'))['pos']
t = (open('roar.tpl', encoding='utf-8').read().replace('/*BEATS*/', open('beats.js', encoding='utf-8').read())
     .replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False)).replace('/*POS*/{}', json.dumps(pos)))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
