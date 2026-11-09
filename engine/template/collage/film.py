"""Cut, retime and join the Flow shots to the voice -> assets/video/bg.mp4 (1080x1920, 30 fps, keyframe every 30).
python film.py [D]   (D = reel length; default: last word end of audio/vo.json + 1.2 s)
Each segment: [shot, src_in, src_out, dst_in, dst_out]; speed = (src_out-src_in)/(dst_out-dst_in).
Pick clean ranges from 12 fps strips of every shot (shots/<S>-strip.jpg): cut away face swaps, morphs, painted text and dissolves;
cover joins with a paper tear or a camera dive. Keep speeds near x1 (018: S4/S5 at x0.7 stepped "on twos"). Write the reason inline."""
import glob, json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SEG = [
    # ['S1', 0.00, 0.50, 0.00, 1.00],    # hook: K0 holds; cut before the face changes (018 S1)
    # ['S2', 0.98, 2.40, 4.15, 5.57],    # the frame drops, IMPACT at src 1.58 -> dst 4.75 on the brand word
]
END_STILL = None  # e.g. os.path.join(HERE, 'keys', 'K5.jpg'): a slow push on the last keyframe under the end card
if not SEG:
    sys.exit('film.py: SEG is empty. Fill it from the shot strips first.')
vo = os.path.join(HERE, 'audio', 'vo.json')
D = float(sys.argv[1]) if len(sys.argv) > 1 else json.load(open(vo, encoding='utf-8'))[-1][2] + 1.2
tmp = os.path.join(HERE, 'shots', 'seg'); os.makedirs(tmp, exist_ok=True)
VF = 'scale=1080:1920:flags=lanczos,setsar=1,fps=30,format=yuv420p'
parts = []
for i, (s, a, b, c, d) in enumerate(SEG):
    src = sorted(glob.glob(os.path.join(HERE, 'shots', s, '*.mp4')))[0]
    sp = (b - a) / (d - c); out = os.path.join(tmp, f'{i:02d}.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', f'trim={a}:{b},setpts=(PTS-STARTPTS)/{sp:.5f},{VF},trim=duration={d - c:.4f}',
                    '-an', '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', out], check=True)
    parts.append(out); print(f'{s} x{sp:.2f}')
dur = D - SEG[-1][4]
if dur > 0.05 and END_STILL:
    out = os.path.join(tmp, 'end.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-loop', '1', '-i', END_STILL, '-vf', f"scale=1188:2112,zoompan=z='1+0.03*on/{int(dur * 30)}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps=30,format=yuv420p",
                    '-t', f'{dur:.3f}', '-c:v', 'libx264', '-crf', '14', out], check=True)
    parts.append(out)
lst = os.path.join(tmp, 'list.txt'); open(lst, 'w').write(''.join(f"file '{p.replace(os.sep, '/')}'\n" for p in parts))
bg = os.path.join(HERE, 'assets', 'video', 'bg.mp4')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c:v', 'libx264', '-crf', '15', '-g', '30', '-keyint_min', '30', '-pix_fmt', 'yuv420p', '-r', '30', bg], check=True)
print('bg.mp4', subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', bg], capture_output=True, text=True).stdout.strip())
