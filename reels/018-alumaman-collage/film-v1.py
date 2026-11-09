"""Cut, retime and join the Flow shots to the voice -> assets/video/bg.mp4 (1080x1920, 30 fps, keyframe every 30).
Each segment: [shot, src_in, src_out, dst_in, dst_out]; speed = (src_out-src_in)/(dst_out-dst_in).
Clean ranges were picked from 12/24 fps strips (shots/*-strip.jpg); reasons inline."""
import glob, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
D = float(sys.argv[1]) if len(sys.argv) > 1 else 30.45
SEG = [
    ['S1', 0.00, 0.50, 0.00, 1.00],    # hook: K0 face holds; at 0.58 the face swaps (morph) -> cut
    ['S1', 1.04, 5.03, 1.00, 4.15],    # man gone; window tears off like paper; box + dimension draw (paper reframe pop at src 3.45)
    ['S2', 0.98, 2.40, 4.15, 5.57],    # frame drops, IMPACT at src 1.58 -> dst 4.75 («ألمنيوم» 4.68)
    ['S2', 2.40, 5.03, 5.57, 10.58],   # debris settles (slow)
    ['S3', 0.00, 2.00, 10.58, 11.58],  # fast dive into the frame; paper-tear cut at src 2.00
    ['S3', 2.00, 5.03, 11.58, 17.20],  # macro: double glass, spacer, gasket; circle draws; holds for the warranty tag
    ['S4', 2.25, 5.03, 17.20, 21.20],  # pull back into the room. src 0-2.2 has the model's handwriting «#0199a2» -> cut (re-roll returned nothing twice)
    ['S5', 0.00, 2.85, 21.20, 25.40],  # the room, the man relaxed; stops before the double-exposure dissolve at src ~2.9
]
K5 = os.path.join(HERE, 'keys', 'K5.jpg')
tmp = os.path.join(HERE, 'shots', 'seg'); os.makedirs(tmp, exist_ok=True)
VF = 'scale=1080:1920:flags=lanczos,setsar=1,fps=30,format=yuv420p'
parts = []
for i, (s, a, b, c, d) in enumerate(SEG):
    src = sorted(glob.glob(os.path.join(HERE, 'shots', s, '*.mp4')))[0]
    sp = (b - a) / (d - c); out = os.path.join(tmp, f'{i:02d}.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', f'trim={a}:{b},setpts=(PTS-STARTPTS)/{sp:.5f},{VF},trim=duration={d - c:.4f}',
                    '-an', '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', out], check=True)
    parts.append(out)
# night paper (K5) under the end card; HyperFrames drops the same sheet over the room at 25.4
out = os.path.join(tmp, 'end.mp4'); dur = D - SEG[-1][4]
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-loop', '1', '-i', K5, '-vf', f"scale=1188:2112,zoompan=z='1+0.03*on/{int(dur * 30)}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps=30,format=yuv420p",
                '-t', f'{dur:.3f}', '-c:v', 'libx264', '-crf', '14', out], check=True)
parts.append(out)
lst = os.path.join(tmp, 'list.txt'); open(lst, 'w').write(''.join(f"file '{p.replace(os.sep, '/')}'\n" for p in parts))
bg = os.path.join(HERE, 'assets', 'video', 'bg.mp4')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c:v', 'libx264', '-crf', '15', '-g', '30', '-keyint_min', '30', '-pix_fmt', 'yuv420p', '-r', '30', bg], check=True)
print('bg.mp4', subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', bg], capture_output=True, text=True).stdout.strip())
