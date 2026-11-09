"""20 fps strips around every entrance: python qa_strips.py <render.mp4> -> renders/qa/strip-<name>.jpg (14 frames from t-0.2).
Fill E with (name, t, x, y, w, h) crops on 1080x1920. While E is empty, every word start in audio/vo.json gets a full-frame strip.
Look at every strip: a word must never show before its entrance (no flash), and joins must stay intact."""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
src = sys.argv[1]; out = os.path.join(HERE, 'renders', 'qa'); os.makedirs(out, exist_ok=True)
E = [
    # ('01-hook', 0.0, 300, 200, 780, 260),
]
if not E:
    w = json.load(open(os.path.join(HERE, 'audio', 'vo.json'), encoding='utf-8'))
    E = [(f'{i:02d}-w', t, 0, 0, 1080, 1920) for i, (_, t, _e) in enumerate(w)]
for n, t, x, y, w, h in E:
    sc = 'scale=%d:-1' % (180 if h > 900 else 260 if h > 400 else 340)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(max(0, t - 0.2)), '-i', src, '-frames:v', '1',
                    '-vf', f'fps=20,crop={w}:{h}:{x}:{y},{sc},tile=7x2', os.path.join(out, f'strip-{n}.jpg')], check=True)
print('ok', len(E), '->', out)
