import sys, glob, os
from PIL import Image, ImageDraw
out = sys.argv[1]; files = sys.argv[2:]
W, H = 360, 300; cols = 5
rows = (len(files) + cols - 1) // cols
S = Image.new('RGB', (W * cols, (H + 24) * rows), 'white'); d = ImageDraw.Draw(S)
for i, f in enumerate(files):
    try:
        im = Image.open(f).convert('RGB'); im.thumbnail((W, H))
    except Exception as e:
        continue
    x, y = (i % cols) * W, (i // cols) * (H + 24)
    S.paste(im, (x + (W - im.width) // 2, y)); d.text((x + 4, y + H + 4), os.path.basename(os.path.dirname(f)) + '/' + os.path.basename(f) + f' {Image.open(f).size}', fill='black')
S.save(out, quality=85)
