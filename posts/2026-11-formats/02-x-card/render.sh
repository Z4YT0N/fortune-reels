#!/bin/bash
# usage: render.sh <folder-abs-path> page.html out.png width height   (agent-browser session fmtA)
cd "$1"
S="--session plexA"
agent-browser $S set viewport $4 $5 > .ab.log 2>&1 < /dev/null
agent-browser $S open "file:///$(cygpath -m "$1")/$2" >> .ab.log 2>&1 < /dev/null
agent-browser $S set viewport $4 $5 >> .ab.log 2>&1 < /dev/null
agent-browser $S wait --load networkidle >> .ab.log 2>&1 < /dev/null
agent-browser $S wait 1000 >> .ab.log 2>&1 < /dev/null
agent-browser $S screenshot "$(cygpath -m "$1")/$3" >> .ab.log 2>&1 < /dev/null
python -c "from PIL import Image; print('$3', Image.open('$3').size)"
