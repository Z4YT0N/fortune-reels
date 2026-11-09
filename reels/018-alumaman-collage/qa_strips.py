"""20 fps strips around every entrance: python qa_strips.py <render.mp4> -> renders/qa/strip-<name>.jpg (14 frames from t-0.2)."""
import os, subprocess, sys
from warp import warp  # v2: entrance times on the new voice clock
src = sys.argv[1]; out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'renders', 'qa'); os.makedirs(out, exist_ok=True)
# name, t, x, y, w, h (crop on 1080x1920)
E = [('01-label', 0.0, 300, 200, 780, 260), ('02-shubbak', 0.30, 300, 200, 780, 260), ('03-dust', 1.0, 0, 380, 1080, 420),
     ('04-dakhil', 1.45, 300, 330, 780, 400), ('05-aib', 2.15, 200, 420, 880, 200), ('06-pill', 3.15, 280, 480, 560, 200),
     ('07-brand', 4.45, 150, 200, 930, 260), ('08-made', 6.1, 60, 400, 1020, 300), ('09-contract', 8.3, 80, 1050, 700, 380),
     ('10-stamp', 9.0, 80, 1050, 700, 380), ('11-jawda', 10.55, 150, 200, 930, 220), ('12-glass', 11.5, 40, 460, 1000, 460),
     ('13-rubber', 14.2, 300, 1080, 780, 260), ('14-tag', 15.75, 480, 180, 560, 640), ('15-ten', 17.05, 480, 180, 560, 640),
     ('16-maint', 20.8, 200, 0, 880, 760), ('17-rest', 23.2, 0, 200, 1080, 1300), ('18-out', 24.15, 0, 380, 1080, 700),
     ('19-night', 25.0, 0, 0, 1080, 1920), ('20-q', 25.3, 60, 420, 960, 300), ('21-cta', 26.9, 100, 200, 880, 900), ('22-end', 27.5, 0, 200, 1080, 900)]
for n, t, x, y, w, h in E:
    sc = 'scale=%d:-1' % (180 if h > 900 else 260 if h > 400 else 340)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(max(0, warp(t) - 0.2)), '-i', src, '-frames:v', '1',
                    '-vf', f'fps=20,crop={w}:{h}:{x}:{y},{sc},tile=7x2', os.path.join(out, f'strip-{n}.jpg')], check=True)
print('ok', len(E))
