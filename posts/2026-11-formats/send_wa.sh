#!/usr/bin/env bash
# Send finished format pieces to the owner (fc-system → owner only). Usage: send_wa.sh 16-editorial-cover 17-big-statement ...
cd "$(dirname "$0")"
R=E:/Library/01-Workspace/Fortune/fortune-reels
mkdir -p wa
for d in "$@"; do
  if [ -f "$d/post.png" ]; then src="$d/post.png"; label="بوست"; elif [ -f "$d/carousel/contact-sheet.png" ]; then src="$d/carousel/contact-sheet.png"; label="كاروسيل (كل الشرايح)"; elif [ -f "$d/contact-sheet.png" ]; then src="$d/contact-sheet.png"; label="كاروسيل (كل الشرايح)"; else echo "skip $d"; continue; fi
  ffmpeg -v error -y -i "$src" -vf "scale='min(2400,iw)':-2" -q:v 3 "wa/$d.jpg"
  printf '%s\n' "فورمات $d — $label" > "wa/$d.txt"
  python "$R/engine/tools/wa_send.py" "wa/$d.jpg" "wa/$d.txt" 201020901614 image | grep -o '"status": "[A-Z]*"' | head -1
  cp "$src" "C:/Users/Mahmoud/Desktop/format-$d.png"
  sleep 6
done
