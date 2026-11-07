#!/usr/bin/env bash
# usage: snap.sh prefix t1 t2 ...  -> snap/<prefix>_<t>.png (session r013, page already open); also seeks the bg video
p="$1"; shift
for t in "$@"; do
  agent-browser --session r013 eval "(async()=>{window.__timelines.main.seek($t);const v=document.getElementById('bg');v.pause();v.currentTime=$t;await new Promise(r=>v.addEventListener('seeked',r,{once:true}));return 1})()" > "$TEMP/ab013s.txt" 2>&1 < /dev/null
  agent-browser --session r013 screenshot "snap/${p}_$t.png" >> "$TEMP/ab013s.txt" 2>&1 < /dev/null
done
