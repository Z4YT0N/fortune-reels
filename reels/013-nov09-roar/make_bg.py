"""Retime the six Flow shots to the voice and concat -> assets/video/bg.mp4 (1080x1920, 30 fps, -g 30).
Each row: shot, clip in, clip out, reel start, reel end. The last shot's final frame is held to D."""
import glob, subprocess, json
D = 28.3
W = json.load(open('audio/words.json', encoding='utf-8')); V = lambda i: W[i][1]
rows = [('S1', 0.0, 5.0, 0.0, V(14) - 0.04),
        ('S2', 0.0, 5.0, V(14) - 0.04, V(27) - 0.04),
        ('S3', 0.0, 3.2, V(27) - 0.04, 12.6),
        ('S4', 1.4, 4.4, 12.6, 14.9),
        ('S5', 0.0, 5.0, 14.9, V(49) - 0.03),
        ('S6', 0.0, 5.0, V(49) - 0.03, V(61) + 0.05)]
inp, fl = [], []
for k, (s, a, b, t0, t1) in enumerate(rows):
    fs = glob.glob(f'gen/{s}/*.mp4') or glob.glob('gen/S1/*.mp4'); inp += ['-i', fs[0]]; print(s, fs[0])
    sp = (b - a) / (t1 - t0)
    pad = f',tpad=stop_mode=clone:stop_duration={D - t1:.3f}' if k == len(rows) - 1 else ''
    fl.append(f'[{k}:v]trim={a}:{b},setpts=(PTS-STARTPTS)/{sp:.5f},fps=30,scale=1080:1920:flags=lanczos,setsar=1{pad},trim=0:{(t1 - t0) if not pad else D - t0:.4f},setpts=PTS-STARTPTS[v{k}]')
    print(s, f'{t0:.2f}-{t1:.2f}', f'speed {sp:.2f}')
fl.append(''.join(f'[v{k}]' for k in range(len(rows))) + f'concat=n={len(rows)}:v=1:a=0,trim=0:{D}[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-r', '30', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', '-g', '30', '-keyint_min', '30', '-an', 'assets/video/bg.mp4'], check=True)
print('assets/video/bg.mp4')
