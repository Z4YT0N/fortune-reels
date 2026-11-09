#!/bin/bash
# usage: render.sh page.html out.png width height
cd E:/Library/01-Workspace/Fortune/fortune-reels/posts/2026-11-test
S="--session pr"
agent-browser $S set viewport $3 $4 > .ab.log 2>&1 < /dev/null
agent-browser $S open "file:///E:/Library/01-Workspace/Fortune/fortune-reels/posts/2026-11-test/$1" >> .ab.log 2>&1 < /dev/null
agent-browser $S set viewport $3 $4 >> .ab.log 2>&1 < /dev/null
agent-browser $S wait --load networkidle >> .ab.log 2>&1 < /dev/null
agent-browser $S wait 600 >> .ab.log 2>&1 < /dev/null
agent-browser $S screenshot "$2" >> .ab.log 2>&1 < /dev/null
python -c "from PIL import Image; print('$2', Image.open('$2').size)"
