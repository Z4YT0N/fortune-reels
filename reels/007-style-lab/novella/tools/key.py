"""Green-hue keyer for Gemini sprites whose backdrop is not exactly #00FF00 (gradient greens).
python -I tools/key.py in.png out.png [--rembg] ; crops to content bbox, despills."""
import sys, numpy as np
from PIL import Image, ImageFilter
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32) / 255
r, g, b = a[..., 0], a[..., 1], a[..., 2]
mx, mn = a.max(-1), a.min(-1); sat = (mx - mn) / (mx + 1e-6)
lead = g - np.maximum(r, b)
# background: green leads by a lot, relative to brightness
score = lead / (g + 1e-6)          # 0..1
alpha = 1 - np.clip((score - 0.18) / 0.22, 0, 1)
if '--rembg' in sys.argv:
    from rembg import new_session, remove
    m = np.asarray(remove(im, session=new_session('isnet-general-use'), only_mask=True)).astype(np.float32) / 255
    alpha = np.maximum(alpha, m) * (m > 0.02)
al = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
alpha = np.asarray(al).astype(np.float32) / 255
# despill: clamp green to max(r,b) where it leads
g2 = np.where(lead > 0, np.maximum(r, b) + 0.15 * np.clip(lead, 0, 0.1), g)
out = Image.fromarray((np.dstack([r, g2, b, alpha]) * 255).clip(0, 255).astype(np.uint8), 'RGBA')
if "--nocrop" not in sys.argv: bb = out.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
if "--nocrop" not in sys.argv: out = out.crop(bb)
out.save(dst); print(dst, out.size)
pv = Image.new('RGBA', out.size, (0, 106, 57, 255)); pv.alpha_composite(out); pv.convert('RGB').save(dst.replace('.png', '_pv.jpg'))
