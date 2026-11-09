#!/bin/bash
# usage: batch.sh name aspect [name aspect ...]
cd E:/Library/01-Workspace/Fortune/fortune-reels/posts/2026-11-test
while [ $# -gt 0 ]; do
  n=$1; a=$2; shift 2
  for try in 1 2; do
    before=$(ls gen/*.png 2>/dev/null | sort)
    node gen.mjs prompts/$n.txt $a > gen/$n.log 2>&1
    new=$(comm -13 <(echo "$before") <(ls gen/*.png | sort) | grep -v -E '/(post_|g[0-9])' | head -1)
    if [ -n "$new" ]; then mv "$new" gen/$n.png; echo "OK $n"; break; else echo "FAIL $n try $try"; fi
  done
done
echo DONE
