#!/usr/bin/env bash
# Same slots as vendor/flow-locked.sh, but full output (no 6000-char cut).
D="E:/Library/01-Workspace/Fortune/fortune-reels/vendor"; N="${FLOW_SLOTS:-3}"; H="$(dirname "$0")"
while :; do
  for s in $(seq 0 $((N-1))); do
    [ "$s" = 0 ] && [ -d "$D/.flow.lock" ] && continue
    if mkdir "$D/.flow.lock.$s" 2>/dev/null; then
      trap 'rmdir "$D/.flow.lock.'"$s"'" 2>/dev/null' EXIT
      FLOW_TAB_SLOT=$s node "$H/fq.mjs" "$@"; exit $?
    fi
  done
  sleep 2
done
