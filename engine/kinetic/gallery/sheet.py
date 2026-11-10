"""Contact sheet of the gallery: one frame per move, at its peak (schedule.json from build.py).
python sheet.py [gallery.mp4]  ->  contact-sheet.jpg (all moves, 8 columns) + contact-1.jpg.. (16 per page, 4x4, for a close look)."""
import json, os, subprocess, sys, tempfile
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
mp4 = sys.argv[1] if len(sys.argv) > 1 else 'gallery.mp4'
S = json.load(open('schedule.json', encoding='utf-8'))
tmp = tempfile.mkdtemp()
TW, TH = 270, 480
thumbs = []
for i, s in enumerate(S):
    out = os.path.join(tmp, f'{i:02d}.png')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{s["peak_at"]:.3f}', '-i', mp4, '-frames:v', '1', out], check=True)
    thumbs.append(Image.open(out).convert('RGB').resize((TW, TH), Image.LANCZOS))


def grid(ims, cols, path):
    rows = (len(ims) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * TW + (cols + 1) * 6, rows * TH + (rows + 1) * 6), (40, 42, 44))
    for k, im in enumerate(ims):
        sheet.paste(im, (6 + (k % cols) * (TW + 6), 6 + (k // cols) * (TH + 6)))
    sheet.save(path, quality=88)
    print(path, sheet.size)


grid(thumbs, 8, 'contact-sheet.jpg')
for p in range(0, len(thumbs), 16):
    grid(thumbs[p:p + 16], 4, f'contact-{p // 16 + 1}.jpg')
