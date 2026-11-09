import sys
from PIL import Image
src, tag = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); n = im.width // 1080
for i in range(n):
    im.crop((i*1080, 0, (i+1)*1080, 1350)).save(f'carousel/{tag}_{i+1:02d}.png')
# contact sheet: slides side by side with a 16px gap
g = 16; th = im.resize((im.width//3, im.height//3)); w1 = 360
sheet = Image.new('RGB', (n*w1 + (n+1)*g, 450 + 2*g), (30,30,30))
for i in range(n):
    sheet.paste(th.crop((i*w1, 0, (i+1)*w1, 450)), (g + i*(w1+g), g))
sheet.save(f'carousel/{tag}_contact.png'); print('slices', n)
