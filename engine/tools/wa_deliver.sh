#!/usr/bin/env bash
# Deliver one finished piece to the owner (fc-system -> owner only), the way he asked on 2026-11-07:
# first as MEDIA (to watch/see in the chat), then as DOCUMENT (full-quality file to download).
# usage: wa_deliver.sh <file.mp4|png|jpg|pdf> <caption.txt>
set -e
T="$(cd "$(dirname "$0")" && pwd)"; f="$1"; cap="$2"; ext="${f##*.}"; ext="${ext,,}"
tmp="$(mktemp -d)"
case "$ext" in
  mp4) kind=video; m="$f"; sz=$(stat -c %s "$f"); if [ "$sz" -gt 15000000 ]; then m="$tmp/preview.mp4"; ffmpeg -v error -y -i "$f" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$m"; fi ;;
  png|jpg|jpeg) kind=image; m="$tmp/preview.jpg"; ffmpeg -v error -y -i "$f" -vf "scale='min(2400,iw)':-2" -q:v 3 "$m" ;;
  *) kind=""; m="" ;;
esac
if [ -n "$kind" ]; then python "$T/wa_send.py" "$m" "$cap" 201020901614 "$kind" | grep -o '"status": "[A-Z]*"' | head -1; sleep 5; fi
# Evolution drops uploads around 45+ MB (reel 015, 2026-11-07): send a CRF 21 copy (same name) as the document
d="$f"; if [ "$ext" = mp4 ] && [ "$(stat -c %s "$f")" -gt 40000000 ]; then mkdir -p "$tmp/doc"; d="$tmp/doc/$(basename "$f")"; ffmpeg -v error -y -i "$f" -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -g 30 -c:a copy -movflags +faststart "$d"; fi
python "$T/wa_send.py" "$d" "$cap" 201020901614 document | grep -o '"status": "[A-Z]*"' | head -1
rm -rf "$tmp"
