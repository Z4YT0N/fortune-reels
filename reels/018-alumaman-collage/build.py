"""Fill reel.tpl -> index.html (D from bg.mp4, WORDS from audio/vo.json)."""
import json, os, subprocess
os.chdir(os.path.dirname(os.path.abspath(__file__)))
w = json.load(open('audio/vo.json', encoding='utf-8'))
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'assets/video/bg.mp4'], capture_output=True, text=True).stdout) - 0.02, 2)
from warp import A
t = open('reel.tpl', encoding='utf-8').read().replace('__D__', str(D)).replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False)).replace('/*WARP*/[]', json.dumps(A))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
