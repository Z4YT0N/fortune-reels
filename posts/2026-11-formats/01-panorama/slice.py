import sys, os
from PIL import Image
# usage: slice.py wide.png outdir
im = Image.open(sys.argv[1]).convert('RGB'); out = sys.argv[2]; os.makedirs(out, exist_ok=True); n = im.width // 1080
for i in range(n): im.crop((i*1080, 0, (i+1)*1080, 1350)).save(f'{out}/slide_{i+1:02d}.png')
g = 16; w1, h1 = 360, 450; th = im.resize((n*w1, h1), Image.LANCZOS)
sheet = Image.new('RGB', (n*w1 + (n+1)*g, h1 + 2*g), (40,40,40))
for i in range(n): sheet.paste(th.crop((i*w1, 0, (i+1)*w1, h1)), (g + i*(w1+g), g))
sheet.save(f'{out}/contact-sheet.png'); print('slices', n)
