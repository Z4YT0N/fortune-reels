"""Fill campfire.tpl -> index.html (D from the shared VO, WORDS from shared/words.json)."""
import json, subprocess
w = json.load(open('../shared/words.json', encoding='utf-8'))
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', '../shared/vo.mp3'], capture_output=True, text=True).stdout) + 0.05, 2)
t = open('campfire.tpl', encoding='utf-8').read().replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
