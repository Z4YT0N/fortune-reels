"""Six film-grain tiles (1080x1920 overlay, soft-light) for a collage reel: python make_grain.py <out_dir>.
Same recipe as reels/006-gallery-continuity/make_textures.py (fixed seed, so every reel gets identical grain) without committing 2.7 MB of PNG."""
import os, sys
import numpy as np
from PIL import Image, ImageFilter

out = sys.argv[1] if len(sys.argv) > 1 else 'assets/img'
os.makedirs(out, exist_ok=True)
rng = np.random.default_rng(404)
W, H = 1080, 1920
for i in range(6):
    g = rng.normal(0, 1, (H // 2, W // 2)).astype(np.float32)
    g = np.asarray(Image.fromarray(((g * 38) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5))).astype(np.uint8)
    Image.fromarray(g, 'L').save(os.path.join(out, f'grain{i}.png'))
print('grain x6 ->', out)
