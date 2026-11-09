# usage: sheet.sh video start dur out  -> 12 fps strip, 10 per row, frame index = start + n/12
ffmpeg -v error -ss $2 -t $3 -i $1 -vf "fps=12,scale=162:288,pad=166:292:2:2:red,tile=10x3" -frames:v 1 -y $4
