# snap.sh <video> <start> <dur> <out> : 12 fps strip, 6 per row
ffmpeg -v error -y -ss $2 -t $3 -i $1 -vf "fps=12,scale=216:-1,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=16:fontcolor=red:box=1,tile=8x3" -frames:v 1 $4
