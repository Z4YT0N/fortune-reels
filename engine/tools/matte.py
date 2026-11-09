"""Foreground matte for "text behind the subject" (depth layer).
  python engine/tools/matte.py <video> <start_s> <dur_s> <out.webm> [--model u2net_human_seg|isnet-general-use] [--feather 1.5]
Cuts the frames [start, start+dur) at 30 fps, keys the subject with rembg, and writes a VP9 WebM with alpha.
Place it in HyperFrames ABOVE the text that must pass behind the subject, as
  <video src="assets/video/fg.webm" data-start="<start>" data-duration="<dur>" data-media-start="0" muted>,
so the subject occludes the words. Check a few RGBA frames over a dark card before use."""
import os, subprocess, sys, tempfile
import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

src, start, dur, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
model = sys.argv[sys.argv.index('--model') + 1] if '--model' in sys.argv else 'u2net_human_seg'
feather = float(sys.argv[sys.argv.index('--feather') + 1]) if '--feather' in sys.argv else 1.5
tmp = tempfile.mkdtemp(prefix='matte-')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(start), '-t', str(dur), '-i', src, '-vf', 'fps=30', os.path.join(tmp, 'f%04d.png')], check=True)
sess = new_session(model)
frames = sorted(f for f in os.listdir(tmp) if f.startswith('f'))
for i, f in enumerate(frames):
    im = Image.open(os.path.join(tmp, f)).convert('RGB')
    m = remove(im, session=sess, only_mask=True).filter(ImageFilter.GaussianBlur(feather))
    a = np.asarray(m).astype(np.float32) / 255.0
    a = np.clip((a - 0.08) / 0.84, 0, 1)  # crush the soft halo a little
    rgba = np.dstack([np.asarray(im), (a * 255).astype(np.uint8)])
    Image.fromarray(rgba, 'RGBA').save(os.path.join(tmp, 'o' + f[1:]))
    if i % 20 == 0:
        print(f'{i + 1}/{len(frames)}', flush=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', '30', '-i', os.path.join(tmp, 'o%04d.png'), '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p',
                '-b:v', '6M', '-auto-alt-ref', '0', '-g', '30', out], check=True)
print('wrote', out, len(frames), 'frames; temp', tmp)
