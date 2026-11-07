"""Retime the chained Flow shots to the voice and concat -> assets/video/bg.mp4 (1080x1920, 30 fps, -g 30).
Segments: (shot, src_a, src_b, reverse, t0, t1) on the voice clock. S3 (K2->K3) could not be submitted (Flow's ingredient picker
matches truncated captions); the overlay closes a flashlight darkness over the S2->S4 cut instead, and S4 plays forward then back.
Warm "lights switching on" frames (S1 2.8-3.5 s, S5 middle) are pulled to the neutral grey paper (no beige)."""
import json, subprocess, os
w = json.load(open('audio/words.json', encoding='utf-8')); V = lambda i: w[i][1]
B7 = V(44) - 0.1
SEG = [('S1', 0.0, 5.03, 0, 0.0, V(12) - 0.04),
       ('S2', 0.6, 4.03, 0, V(12) - 0.04, 7.6),
       ('S4', 0.0, 5.03, 0, 7.6, 12.6),
       ('S4', 0.6, 5.03, 1, 12.6, B7),
       ('S5', 0.04, 4.03, 0, B7, 19.6),
       ('S6', 0.45, 3.4, 0, 19.6, 21.75)]
NEUTRAL = 'selectivecolor=neutrals=0 0 -0.10 0:whites=0 0 -0.12 0:yellows=0 0 -0.25 0:reds=0 0 -0.15 0'
parts = []
for k, (s, a, b, rev, t0, t1) in enumerate(SEG):
    tgt = t1 - t0; sp = (b - a) / tgt
    vf = f'trim={a}:{b},setpts=PTS-STARTPTS' + (',reverse' if rev else '') + f',setpts=PTS/{sp:.5f},scale=1080:1920:flags=lanczos,fps=30'
    if k == 0: vf += ",eq=saturation=0.45:enable='between(t,2.7,3.75)'"
    if s == 'S5': vf += ",eq=saturation=0.5:enable='between(t,0.15,1.75)'"
    o = f'flow/r{k}.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'flow/{s}.mp4', '-vf', vf + ',format=yuv420p', '-an', '-t', f'{tgt:.3f}',
                    '-c:v', 'libx264', '-crf', '16', '-g', '30', '-keyint_min', '30', o], check=True)
    parts.append(o); print(f'{s}{" rev" if rev else ""}: src {a:.2f}-{b:.2f} -> {t0:.2f}-{t1:.2f} (x{sp:.2f})')
open('flow/concat.txt', 'w').write(''.join(f"file '{os.path.basename(p)}'\n" for p in parts))
os.makedirs('assets/video', exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'flow/concat.txt', '-c:v', 'libx264', '-crf', '16', '-g', '30', '-keyint_min', '30', '-pix_fmt', 'yuv420p', 'assets/video/bg.mp4'], check=True)
print('bg.mp4', subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'assets/video/bg.mp4'], capture_output=True, text=True).stdout.strip())
