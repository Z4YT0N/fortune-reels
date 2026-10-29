"""Measure a rendered reel. Prints PASS / WARN / FAIL lines and writes <reel>/renders/qa/:
contact sheet (one frame a second), first and last frame, report.json. Quote the numbers in NOTE.md.
  python engine/tools/qa.py <reel> [path/to/render.mp4]
A FAIL is fixed before delivery, never argued. Checks (rules/quality-gates.md):
  format 1080x1920 ~30fps, length 30-60 s, audio present, loudness ~-14 LUFS,
  no black frames, no frozen picture longer than 2.5 s, no dead air at the end,
  last frame close to the first frame (the loop)."""
import json, os, re, subprocess, sys
from common import load_cfg, reel_dir

rd = reel_dir(sys.argv[1]); cfg = load_cfg(rd)
film = sys.argv[2] if len(sys.argv) > 2 else os.path.join(rd, 'renders', cfg['slug'] + '.mp4')
out = os.path.join(rd, 'renders', 'qa'); os.makedirs(out, exist_ok=True)
R, bad = {}, []


def sh(args):
    return subprocess.run(args, capture_output=True, text=True, encoding='utf-8', errors='replace')


def verdict(level, name, msg):
    print(f'{level:4s} {name}: {msg}'); R[name] = {'level': level, 'msg': msg}
    if level == 'FAIL':
        bad.append(name)


p = json.loads(sh(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', film]).stdout)
v = next(s for s in p['streams'] if s['codec_type'] == 'video')
a = [s for s in p['streams'] if s['codec_type'] == 'audio']
dur = float(p['format']['duration']); num, den = map(int, v['avg_frame_rate'].split('/')); fps = num / den
verdict('PASS' if (v['width'], v['height']) == (1080, 1920) else 'FAIL', 'format', f"{v['width']}x{v['height']} @ {fps:.2f} fps")
verdict('PASS' if 30 <= dur <= 60 else 'WARN', 'length', f'{dur:.2f} s (target 35-50)')
if not a:
    verdict('FAIL', 'audio', 'no audio stream')
else:
    ln = sh(['ffmpeg', '-hide_banner', '-nostats', '-i', film, '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr
    I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', ln)[-1]); TP = float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS', ln)[-1])
    verdict('PASS' if -16.5 <= I <= -11.5 else 'WARN', 'loudness', f'{I} LUFS integrated, true peak {TP} dBFS (target -14, peak <= -1)')
    sil = sh(['ffmpeg', '-hide_banner', '-nostats', '-i', film, '-af', 'silencedetect=n=-45dB:d=0.8', '-f', 'null', '-']).stderr
    ends = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', sil)]
    tail = [s for s in ends if s > dur - 1.5]
    verdict('FAIL' if tail else 'PASS', 'end-silence', f'silence starts at {tail[0]:.2f}s' if tail else 'no dead air at the end')

bl = sh(['ffmpeg', '-hide_banner', '-nostats', '-i', film, '-vf', 'blackdetect=d=0.05:pix_th=0.06', '-an', '-f', 'null', '-']).stderr
blacks = re.findall(r'black_start:([\d.]+) black_end:([\d.]+)', bl)
verdict('FAIL' if blacks else 'PASS', 'black-frames', f'{blacks}' if blacks else 'none')
fz = sh(['ffmpeg', '-hide_banner', '-nostats', '-i', film, '-vf', 'freezedetect=n=0.002:d=2.5', '-an', '-f', 'null', '-']).stderr
fr = re.findall(r'freeze_start: ([\d.]+)', fz)
verdict('FAIL' if fr else 'PASS', 'held-frames', f'picture frozen > 2.5 s from {fr}' if fr else 'nothing held longer than 2.5 s')

first, last = os.path.join(out, 'first.png'), os.path.join(out, 'last.png')
sh(['ffmpeg', '-v', 'error', '-y', '-i', film, '-frames:v', '1', first])
sh(['ffmpeg', '-v', 'error', '-y', '-sseof', '-0.05', '-i', film, '-frames:v', '1', '-update', '1', last])
ss = sh(['ffmpeg', '-hide_banner', '-i', first, '-i', last, '-lavfi', 'ssim', '-f', 'null', '-']).stderr
m = re.search(r'All:([\d.]+)', ss); s = float(m.group(1)) if m else 0
verdict('PASS' if s >= 0.85 else 'WARN', 'loop', f'first vs last frame SSIM {s:.3f} (>= 0.85 reads as a loop)')

cols = 8; rows = -(-int(dur) // cols)
sh(['ffmpeg', '-v', 'error', '-y', '-i', film, '-vf', f'fps=1,scale=216:384,tile={cols}x{rows}:padding=4:color=white', '-frames:v', '1', os.path.join(out, 'sheet.jpg')])
json.dump(R, open(os.path.join(out, 'report.json'), 'w', encoding='utf-8'), indent=1)
print('sheet:', os.path.join(out, 'sheet.jpg'), '(look at it, every frame)')
print('RESULT:', 'FAIL ' + ', '.join(bad) if bad else 'gates pass (now judge the sheet and stills by eye)')
sys.exit(1 if bad else 0)
