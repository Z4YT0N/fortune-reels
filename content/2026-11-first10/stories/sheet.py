"""Contact sheet of all story frames (7 per row) + stories.zip."""
import os, zipfile
from PIL import Image, ImageDraw, ImageFont
os.chdir(os.path.dirname(os.path.abspath(__file__)))
L = {'1107-sat-1': 'Sat Nov 7 · reel repost + slider', '1108-sun-1': 'Sun Nov 8 · poll 1/2', '1108-sun-2': 'Sun Nov 8 · answer 2/2',
     '1109-mon-1': 'Mon Nov 9 · behind the scenes', '1110-tue-1': 'Tue Nov 10 · quiz 1/2', '1110-tue-2': 'Tue Nov 10 · answer 2/2',
     '1111-wed-1': 'Wed Nov 11 · this or that', '1112-thu-1': 'Thu Nov 12 · ask the team', '1113-fri-1': 'Fri Nov 13 · recap + link',
     '1114-sat-1': 'Sat Nov 14 · reel repost + slider', '1115-sun-1': 'Sun Nov 15 · poll 1/2', '1115-sun-2': 'Sun Nov 15 · answer 2/2',
     '1116-mon-1': 'Mon Nov 16 · behind the scenes'}
W, H, C = 432, 768, 7
f = ImageFont.truetype('assets/IBMPlexSansArabic-SemiBold.ttf', 22)
rows = (len(L) + C - 1) // C
s = Image.new('RGB', (C * (W + 16) + 16, rows * (H + 56) + 16), '#0b0c0d')
d = ImageDraw.Draw(s)
for i, k in enumerate(L):
    x, y = 16 + (i % C) * (W + 16), 16 + (i // C) * (H + 56)
    d.text((x, y), L[k], font=f, fill='#00DB33')
    s.paste(Image.open(f'out/{k}.png').convert('RGB').resize((W, H), Image.LANCZOS), (x, y + 40))
s.save('stories-contact-sheet.jpg', quality=90)
with zipfile.ZipFile('stories.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for k in L:
        z.write(f'out/{k}.png', f'story-{k}.png')
print(s.size, os.path.getsize('stories.zip'))
