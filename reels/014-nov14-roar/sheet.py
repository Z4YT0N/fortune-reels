"""python sheet.py <prefix> -> snap/<prefix>-sheet.jpg (4 columns, labelled, sorted by time)"""
import sys, glob, os
from PIL import Image, ImageDraw
p = sys.argv[1]; fs = sorted(glob.glob(f'snap/{p}_*.png'), key=lambda f: float(os.path.basename(f)[len(p) + 1:-4]))
w, h, c = 405, 720, 4; r = (len(fs) + c - 1) // c
S = Image.new('RGB', (w * c, h * r), (128, 128, 128)); d = ImageDraw.Draw(S)
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGB').resize((w, h)); S.paste(im, ((i % c) * w, (i // c) * h))
    d.rectangle([(i % c) * w, (i // c) * h, (i % c) * w + 90, (i // c) * h + 22], fill=(255, 0, 0)); d.text(((i % c) * w + 4, (i // c) * h + 4), os.path.basename(f)[len(p) + 1:-4], fill=(255, 255, 255))
    # safe zone frame
    sx = w / 1080; d.rectangle([(i % c) * w + 60 * sx, (i // c) * h + 230 * sx, (i % c) * w + 960 * sx, (i // c) * h + 1440 * sx], outline=(255, 0, 255))
S.save(f'snap/{p}-sheet.jpg', quality=88); print(f'snap/{p}-sheet.jpg')
