# bake a riso-green version of a greyscale cut-out: green ink * photo, plus a mis-registered deep-green copy behind
import sys
import numpy as np
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]; dx, dy = 18, 14
im = Image.open(src).convert('RGBA'); a = np.asarray(im).astype(np.float32) / 255
L = (a[..., 0] * .3 + a[..., 1] * .59 + a[..., 2] * .11)
L = np.clip((L - .04) * 1.12, 0, 1)                      # a touch more contrast
G = np.array([0x00, 0xDB, 0x33]) / 255; D = np.array([0x00, 0x6A, 0x39]) / 255
ink = (G[None, None, :] * L[..., None]) + 0.02           # dark stays near-black, light becomes green
h, w = L.shape; H, Wd = h + dy, w + dx
out = np.zeros((H, Wd, 4), np.float32)
out[dy:, :w, :3] = D; out[dy:, :w, 3] = a[..., 3] * .9    # offset plate down-left
fg = np.zeros((H, Wd, 4), np.float32); fg[:h, dx:, :3] = ink; fg[:h, dx:, 3] = a[..., 3]
al = fg[..., 3:4]; out[..., :3] = fg[..., :3] * al + out[..., :3] * (1 - al); out[..., 3] = np.maximum(out[..., 3], fg[..., 3])
Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8), 'RGBA').save(dst); print(dst, Wd, H)
