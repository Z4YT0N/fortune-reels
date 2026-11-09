# strip.sh video t0 dur out  -> 12 fps contact sheet, 8 per row, 200 px wide
ffmpeg -v error -y -ss $2 -t $3 -i $1 -vf "fps=12,scale=200:-1,tile=8x${5:-3}" -frames:v 1 $4
