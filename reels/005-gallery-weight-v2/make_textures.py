# Paper ground + grain tiles for reel 004 (seeded, deterministic).
import numpy as np
from PIL import Image, ImageFilter
rng = np.random.default_rng(404)
W, H = 1080, 1920
def blotch(scale, blur):
    a = Image.fromarray((rng.random((H // scale, W // scale)) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)
    return np.asarray(a.filter(ImageFilter.GaussianBlur(blur))).astype(np.float32) / 255
def paper(base, name, fib=0.05):
    a = np.ones((H, W, 3), np.float32) * np.array(base, np.float32) / 255
    a *= (0.965 + 0.05 * blotch(28, 10))[..., None]
    a *= (0.985 + 0.02 * blotch(6, 1.2))[..., None]
    # fibres: short streaks
    f = Image.fromarray((rng.random((H, W)) > 0.9985).astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(0.8))
    f = np.asarray(f.resize((W, H)).filter(ImageFilter.BoxBlur(2))).astype(np.float32) / 255
    a -= (f * fib)[..., None]
    Image.fromarray((a.clip(0, 1) * 255).astype(np.uint8)).save(f'assets/img/{name}.jpg', quality=92)
paper((240, 241, 242), 'paper')
paper((18, 20, 22), 'paper-dark', fib=-0.03)
paper((0, 106, 57), 'paper-forest', fib=0.02)
for i in range(6):
    g = rng.normal(0, 1, (H // 2, W // 2)).astype(np.float32)
    g = np.asarray(Image.fromarray(((g * 38) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5))).astype(np.uint8)
    Image.fromarray(g, 'L').save(f'assets/img/grain{i}.png')
print('ok')
