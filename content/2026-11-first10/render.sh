#!/bin/bash
# usage: render.sh <dir> <w> <h> name1 name2 ...  (renders <dir>/<name>.html -> <dir>/out/<name>.png)
D="E:/Library/01-Workspace/Fortune/fortune-reels/content/2026-11-first10/$1"; W=$2; H=$3; shift 3
S="--session first10static"; mkdir -p "$D/out"
agent-browser $S set viewport $W $H > "$D/.ab.log" 2>&1 < /dev/null
for n in "$@"; do
  agent-browser $S open "file:///$D/$n.html" >> "$D/.ab.log" 2>&1 < /dev/null
  agent-browser $S set viewport $W $H >> "$D/.ab.log" 2>&1 < /dev/null
  agent-browser $S wait --load networkidle >> "$D/.ab.log" 2>&1 < /dev/null
  agent-browser $S wait 700 >> "$D/.ab.log" 2>&1 < /dev/null
  agent-browser $S screenshot "$D/out/$n.png" >> "$D/.ab.log" 2>&1 < /dev/null
done
agent-browser $S close >> "$D/.ab.log" 2>&1 < /dev/null
python -c "import sys;from PIL import Image;[print(f, Image.open(f).size) for f in sys.argv[1:]]" $(for n in "$@"; do echo "$D/out/$n.png"; done)
