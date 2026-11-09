#!/bin/bash
# runs prompts sequentially; renames each new png to <name>.png
cd E:/Library/01-Workspace/Fortune/fortune-reels/posts/2026-11-test/v2
for spec in "$@"; do
  name=${spec%%:*}; rest=${spec#*:}; refs=${rest##*:}; aspect=${rest%:*}
  before=$(ls gen/*.png 2>/dev/null)
  timeout 600 node gen.mjs prompts/$name.txt "$aspect" "$refs" > gen/$name.log 2>&1
  for f in gen/*.png; do echo "$before" | grep -qx "$f" || mv "$f" gen/$name.png; done
  echo "done $name"
done
