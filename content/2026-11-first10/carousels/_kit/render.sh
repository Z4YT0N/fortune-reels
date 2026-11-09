#!/bin/bash
# usage: render.sh <slug> <n-slides>   (renders <slug>/carousel.html -> <slug>/slides/slide_XX.png, contact-sheet.jpg, slides.zip)
set -e
B=E:/Library/01-Workspace/Fortune/fortune-reels/content/2026-11-first10/carousels
cd $B/$1; W=$((1080*$2)); S="--session c3-$1"
agent-browser $S set viewport $W 1350 > .ab.log 2>&1 < /dev/null
agent-browser $S open "file:///$B/$1/carousel.html" >> .ab.log 2>&1 < /dev/null
agent-browser $S set viewport $W 1350 >> .ab.log 2>&1 < /dev/null
agent-browser $S wait --load networkidle >> .ab.log 2>&1 < /dev/null
agent-browser $S wait 1200 >> .ab.log 2>&1 < /dev/null
agent-browser $S screenshot "$B/$1/_pano.png" >> .ab.log 2>&1 < /dev/null
agent-browser $S close >> .ab.log 2>&1 < /dev/null || true
python $B/_kit/slice.py _pano.png
