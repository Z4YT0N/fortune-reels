#!/usr/bin/env bash
# usage: bash snap.sh <prefix> t1 t2 ...  -> snap/<prefix>_<t>.png (agent-browser session r010)
S="--session r010"; cd "$(dirname "$0")"; P=$1; shift
agent-browser $S set viewport 1080 1920 > renders/ab.txt 2>&1 < /dev/null
agent-browser $S open "http://127.0.0.1:8731/index.html" >> renders/ab.txt 2>&1 < /dev/null
agent-browser $S wait --load networkidle >> renders/ab.txt 2>&1 < /dev/null
agent-browser $S eval "window.__hf.buildReady.main.then(()=>'ready')" >> renders/ab.txt 2>&1 < /dev/null
for t in "$@"; do
  agent-browser $S eval "window.__timelines.main.seek($t); 'ok'" >> renders/ab.txt 2>&1 < /dev/null
  agent-browser $S screenshot "snap/${P}_$t.png" >> renders/ab.txt 2>&1 < /dev/null
done
echo done
