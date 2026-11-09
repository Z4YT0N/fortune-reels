#!/usr/bin/env bash
# usage: bash sheet.sh <prefix> -> snap/<prefix>-sheet.jpg (4 columns, sorted by time)
cd "$(dirname "$0")"; P=$1
ls snap/${P}_*.png | sort -t_ -k2 -g > renders/list.txt
args=(); while read f; do args+=(-i "$f"); done < renders/list.txt
n=$(wc -l < renders/list.txt); fl=""; for ((i=0;i<n;i++)); do fl+="[$i:v]scale=405:720,drawtext=text='$(basename $(sed -n "$((i+1))p" renders/list.txt) .png)':x=10:y=10:fontsize=28:fontcolor=red[v$i];"; done
cols=4; rows=$(( (n+cols-1)/cols )); lay=""; for ((i=0;i<n;i++)); do lay+="[v$i]"; done
ffmpeg -v error -y "${args[@]}" -filter_complex "${fl}${lay}xstack=inputs=$n:layout=$(python -c "print('|'.join(f'{(i%$cols)*405}_{(i//$cols)*720}' for i in range($n)))"):fill=gray" snap/${P}-sheet.jpg && echo snap/${P}-sheet.jpg
