#!/usr/bin/env bash
# usage: sheet.sh out.jpg in1.png in2.png ... (4 per row, 405x720 each, with a time label)
out="$1"; shift; n=$#; args=(); f=""; i=0
for x in "$@"; do args+=(-i "$x"); f+="[$i:v]scale=405:720[v$i];"; i=$((i+1)); done
cols=4; rows=$(( (n+cols-1)/cols )); L=""; for ((k=0;k<n;k++)); do L+="[v$k]"; done
ffmpeg -v error -y "${args[@]}" -filter_complex "${f}${L}xstack=inputs=$n:layout=$(python -c "
n=$n;c=4
print('|'.join(f'{(k%c)*405}_{(k//c)*720}' for k in range(n)))"):fill=gray" "$out"
