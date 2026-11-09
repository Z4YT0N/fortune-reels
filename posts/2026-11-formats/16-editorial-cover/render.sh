#!/bin/bash
# usage: render.sh page.html out.png width height
cd "$(dirname "$0")"; D=$(pwd -W 2>/dev/null || pwd)
S="--session plexB"
agent-browser $S set viewport $3 $4 > .ab.log 2>&1 < /dev/null
agent-browser $S open "file:///$D/$1" >> .ab.log 2>&1 < /dev/null
agent-browser $S set viewport $3 $4 >> .ab.log 2>&1 < /dev/null
agent-browser $S wait --load networkidle >> .ab.log 2>&1 < /dev/null
agent-browser $S wait 1200 >> .ab.log 2>&1 < /dev/null
agent-browser $S screenshot "$D/$2" >> .ab.log 2>&1 < /dev/null
agent-browser $S close >> .ab.log 2>&1 < /dev/null
python -c "from PIL import Image; print('$2', Image.open('$2').size)"
