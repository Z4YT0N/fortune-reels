"""Fill showreel.tpl -> index.html (D from the voice, WORDS from audio/words.json)."""
import json, subprocess
w = json.load(open('audio/words.json', encoding='utf-8'))
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/vo.mp3'], capture_output=True, text=True).stdout) + 1.3, 2)
t = open('showreel.tpl', encoding='utf-8').read().replace('/*EXT*/', open('ext.js', encoding='utf-8').read()).replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
