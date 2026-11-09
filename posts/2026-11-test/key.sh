#!/bin/bash
cd E:/Library/01-Workspace/Fortune/fortune-reels/posts/2026-11-test
for n in "$@"; do
  python ~/.claude/skills/gemini-image/scripts/chroma.py gen/$n.png cut/$n.full.png --preview cut/_prev_$n.jpg >/dev/null
  python -c "
from PIL import Image
im=Image.open('cut/$n.full.png'); a=im.split()[3].point(lambda v: 255 if v>40 else 0); bb=a.getbbox(); im.crop(bb).save('cut/$n.png'); print('$n', im.crop(bb).size)"
done
