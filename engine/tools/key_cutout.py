"""Key a green-screen still into a clean cut-out (works on muddy/uneven greens too).
  python engine/tools/key_cutout.py in.png out.png [--grain] [--trim]
Alpha = how much greener a pixel is than its red/blue (g - max(r,b)), soft ramp, then the largest
connected subject is kept, edges are eroded 1 px and feathered, green spill on edges is pulled to neutral.
--grain applies the house grade (slight desaturation + midtone film grain) to the subject only.
--trim crops to the subject's bounding box + 12 px."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32) / 255
r, g, b = im[..., 0], im[..., 1], im[..., 2]
greenness = g - np.maximum(r, b)
# background is strongly green-dominant; subject is not. ramp 0.10 .. 0.22
a = 1 - np.clip((greenness - 0.10) / 0.12, 0, 1)
# keep the largest connected opaque region (drops stray specks)
mask = a > 0.5
try:
    from scipy import ndimage
    lab, n = ndimage.label(mask)
    if n > 1:
        sizes = ndimage.sum(mask, lab, range(1, n + 1))
        keep = lab == (1 + int(np.argmax(sizes)))
        keep = ndimage.binary_fill_holes(keep)
        a = a * ndimage.binary_dilation(keep, iterations=2)
except ImportError:
    pass
al = Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
a = np.asarray(al).astype(np.float32) / 255
# spill suppression: limit green to the average of red and blue where it exceeds it
lim = (r + b) / 2 + 0.04
g2 = np.where(g > lim, lim + (g - lim) * 0.15, g)
out = np.dstack([r, g2, b])
if '--grain' in sys.argv:
    lum = out.mean(2, keepdims=True)
    out = lum + (out - lum) * 0.88
    out = 0.03 + out * 0.94
    rng = np.random.default_rng(11)
    gr = rng.normal(0, 1, out.shape[:2]).astype(np.float32)
    gr = np.asarray(Image.fromarray(((gr * 40) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32) / 255 - 0.5
    l2 = out.mean(2)
    out = out + (gr * 0.07 * (1 - np.abs(l2 - 0.5) * 1.2))[..., None]
rgba = np.dstack([np.clip(out, 0, 1), a])
res = Image.fromarray((rgba * 255).astype(np.uint8), 'RGBA')
if '--trim' in sys.argv:
    bb = res.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
    if bb:
        x0, y0, x1, y1 = bb
        res = res.crop((max(0, x0 - 12), max(0, y0 - 12), min(res.width, x1 + 12), min(res.height, y1 + 12)))
res.save(dst)
print(dst, res.size)
