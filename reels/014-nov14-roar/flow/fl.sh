#!/usr/bin/env bash
# same slot locks as vendor/flow-locked.sh, but an untruncated client (fcall.mjs)
D="E:/Library/01-Workspace/Fortune/fortune-reels/vendor"; N="${FLOW_SLOTS:-3}"; H="$(dirname "$0")"
while :; do
  for s in $(seq 0 $((N-1))); do
    [ "$s" = 0 ] && [ -d "$D/.flow.lock" ] && continue
    if mkdir "$D/.flow.lock.$s" 2>/dev/null; then
      trap 'rmdir "$D/.flow.lock.'"$s"'" 2>/dev/null' EXIT
      FLOW_TAB_SLOT=$s node "$H/fcall.mjs" "$@"; exit $?
    fi
  done
  sleep 2
done
