#!/usr/bin/env bash
# Flow MCP calls across parallel agents. Owner 2026-11-07: «ولد اكتر من حاجه فنفس الوقت».
# FLOW_SLOTS tabs (default 3) in the same Flow browser; each call takes a free slot (own tab, own agent session).
# Usage: flow-locked.sh <tool> '<json>'
D="$(dirname "$0")"; N="${FLOW_SLOTS:-3}"
while :; do
  for s in $(seq 0 $((N-1))); do
    [ "$s" = 0 ] && [ -d "$D/.flow.lock" ] && continue  # an old-style call still holds tab 0
    if mkdir "$D/.flow.lock.$s" 2>/dev/null; then
      trap 'rmdir "$D/.flow.lock.'"$s"'" 2>/dev/null' EXIT
      FLOW_TAB_SLOT=$s node "$D/flow-call.mjs" "$@"; exit $?
    fi
  done
  sleep 2
done
