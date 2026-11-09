import sys, glob
from PIL import Image
fs = sorted(glob.glob('carousel/slide_*.png')); n = len(fs); g = 16; w1, h1 = 360, 450
sheet = Image.new('RGB', (n*w1 + (n+1)*g, h1 + 2*g), (40,40,40))
for i, f in enumerate(fs): sheet.paste(Image.open(f).convert('RGB').resize((w1, h1), Image.LANCZOS), (g + i*(w1+g), g))
sheet.save('carousel/contact-sheet.png'); print('sheet', n)
