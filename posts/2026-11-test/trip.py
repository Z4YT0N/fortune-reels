import sys
from PIL import Image
tag, a, b, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
ims = [Image.open(f'carousel/{tag}_{i:02d}.png').resize((600, 750)) for i in range(a, b+1)]
W = Image.new('RGB', (len(ims)*600 + (len(ims)-1)*8, 750), (30,30,30))
for k, im in enumerate(ims): W.paste(im, (k*608, 0))
W.save(out)
