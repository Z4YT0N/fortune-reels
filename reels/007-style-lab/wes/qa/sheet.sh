# usage: sheet.sh video out.jpg t1 t2 ...  -> one row of frames at given times (each 270x480)
v=$1; o=$2; shift 2; i=0; rm -f qa/_f*.png
for t in "$@"; do ffmpeg -v error -ss $t -i $v -frames:v 1 -vf scale=360:640 qa/_f$(printf %02d $i).png; i=$((i+1)); done
ffmpeg -v error -y -i qa/_f%02d.png -vf tile=${i}x1 $o; rm -f qa/_f*.png
