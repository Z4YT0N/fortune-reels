"""Retime the Flow shots to the voice and concat -> assets/video/bg.mp4 (1080x1920, 30 fps, -g 30).
SHOTS: (file, src_in, src_out, target_seconds). The last frame is held until D."""
import json, subprocess
SHOTS = json.load(open('shots.json', encoding='utf-8'))
dur = lambda f: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
D = round(dur('audio/vo.mp3') + 2.0, 2)
inp, fl, k = [], [], 0
for f, a, b, tgt in SHOTS['shots']:
    b = b or dur(f)
    sp = (b - a) / tgt
    inp += ['-i', f]
    fl.append(f'[{k}:v]trim={a}:{b},setpts=(PTS-STARTPTS)/{sp:.5f},fps=30,scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[v{k}]'); k += 1
total = sum(s[3] for s in SHOTS['shots'])
fl.append(''.join(f'[v{i}]' for i in range(k)) + f'concat=n={k}:v=1:a=0,tpad=stop_mode=clone:stop_duration={max(0, D - total) + 0.2:.2f},trim=0:{D}[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-r', '30', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-g', '30', '-keyint_min', '30', '-pix_fmt', 'yuv420p', '-an', 'assets/video/bg.mp4'], check=True)
print('bg.mp4', dur('assets/video/bg.mp4'), 'D', D, 'shots', total)
