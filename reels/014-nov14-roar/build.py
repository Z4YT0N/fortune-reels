"""Fill roar.tpl -> index.html (D from the voice, WORDS, bg.mp4 duration, the launch-button box measured on the film)."""
import json, subprocess
dur = lambda f: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
w = json.load(open('audio/words.json', encoding='utf-8'))
D = round(dur('audio/vo.mp3') + 1.3, 2)
b = json.load(open('flow/btn.json'))
t = open('roar.tpl', encoding='utf-8').read().replace('__D__', str(D)).replace('__VD__', f"{dur('assets/video/bg.mp4') - 0.02:.2f}").replace('/*WORDS*/[]', json.dumps(w, ensure_ascii=False))
for k in ('BX', 'BY', 'BW', 'BH'):
    t = t.replace(f'__{k}__', str(b[k]))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
