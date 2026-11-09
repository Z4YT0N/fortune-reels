"""Fill test.tpl -> index.html (D from the background film, WORDS from audio/vo.json)."""
import json, subprocess
w = json.load(open('audio/vo.json', encoding='utf-8'))
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'assets/video/bg.mp4'], capture_output=True, text=True).stdout) - 0.02, 2)
t = open('test.tpl', encoding='utf-8').read().replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
