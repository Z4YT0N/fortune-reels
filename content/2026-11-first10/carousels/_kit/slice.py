import sys, os, zipfile
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB'); n = im.width // 1080
os.makedirs('slides', exist_ok=True)
for i in range(n): im.crop((i*1080, 0, (i+1)*1080, 1350)).save(f'slides/slide_{i+1:02d}.png')
g = 20; w1, h1 = 432, 540; cols = 4 if n > 4 else n; rows = (n + cols - 1)//cols
sheet = Image.new('RGB', (cols*w1 + (cols+1)*g, rows*h1 + (rows+1)*g), (34,36,38))
for i in range(n):
    t = im.crop((i*1080, 0, (i+1)*1080, 1350)).resize((w1, h1), Image.LANCZOS)
    sheet.paste(t, (g + (i%cols)*(w1+g), g + (i//cols)*(h1+g)))
sheet.save('contact-sheet.jpg', quality=90)
with zipfile.ZipFile('slides.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for i in range(n): z.write(f'slides/slide_{i+1:02d}.png', f'slide_{i+1:02d}.png')
print('slices', n, im.size)
