#!/usr/bin/env bash
# usage: snap.sh prefix t1 t2 ...  -> snap/<prefix>_<t>.png (session r011, page already open)
p="$1"; shift
for t in "$@"; do
  agent-browser --session r011 eval "window.__timelines.main.seek($t); 1" > "$TEMP/ab011s.txt" 2>&1 < /dev/null
  agent-browser --session r011 screenshot "snap/${p}_$t.png" >> "$TEMP/ab011s.txt" 2>&1 < /dev/null
done
