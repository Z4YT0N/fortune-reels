#!/usr/bin/env bash
# poll the six shots, download each when it succeeds
V=../../../vendor; declare -A M=([S1]=aff85103-4cc1-4da3-a4aa-ff2e003ce0e4 [S2]=0752271c-72a4-4c09-b125-981301c4e659 [S3]=fbdde43d-c831-4e8f-a1af-d6620b3dd41b [S4]=ff3ac6af-089c-4396-ab95-9ee449c49fae [S5]=fa9e15d3-9840-48dd-ad3d-44849ee4d618 [S6]=9b59cc8d-3eb6-4df6-ae97-9f2c84e3beb0)
for i in $(seq 1 80); do
  left=0
  for s in S1 S2 S3 S4 S5 S6; do
    ls $s/*.mp4 >/dev/null 2>&1 && continue
    st=$(bash $V/flow-locked.sh flow_video_status "{\"media_ids\":[\"${M[$s]}\"]}" | grep -o 'state\\": \\"[a-z]*' | head -1 | sed 's/.*"//')
    echo "$s $st"
    if [ "$st" = succeeded ]; then mkdir -p $s; bash $V/flow-locked.sh flow_download_media "{\"media_id\":\"${M[$s]}\",\"out_dir\":\"$(pwd -W)/$s\"}" | grep -o 'mp4[^"]*' | head -1; fi
    [ "$st" = failed -o "$st" = unknown ] && echo "$s FAILED"
    ls $s/*.mp4 >/dev/null 2>&1 || left=$((left+1))
  done
  [ $left = 0 ] && { echo ALLDONE; exit 0; }
  sleep 20
done
