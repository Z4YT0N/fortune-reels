"""Measure the green launch button on a keyframe -> 1080x1920 coords. usage: python flow/btn.py flow/K6.png [out.json]"""
import sys, json, numpy as np
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB'); s = 1080 / im.width; im = im.resize((1080, round(im.height * s)))
a = np.asarray(im).astype(int); off = (im.height - 1920) / 2
g = (a[..., 1] > 170) & (a[..., 1] - np.maximum(a[..., 0], a[..., 2]) > 80)
ys, xs = np.nonzero(g)
b = {'BX': round((xs.min() + xs.max()) / 2), 'BY': round((ys.min() + ys.max()) / 2 - off), 'BW': int(xs.max() - xs.min()), 'BH': int(ys.max() - ys.min())}
print(b, 'px', g.sum())
if len(sys.argv) > 2: json.dump(b, open(sys.argv[2], 'w'))
