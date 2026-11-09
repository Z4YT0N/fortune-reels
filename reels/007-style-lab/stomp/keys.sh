# keys.jpg: 6 key frames side by side from the final
V=stomp-final.mp4; i=0; for t in 0.98 3.47 4.30 6.60 7.35 9.40; do ffmpeg -v error -y -ss $t -i $V -frames:v 1 -vf scale=360:640 snap/k$i.png; i=$((i+1)); done
ffmpeg -v error -y -i snap/k0.png -i snap/k1.png -i snap/k2.png -i snap/k3.png -i snap/k4.png -i snap/k5.png -filter_complex "hstack=inputs=6" -q:v 3 keys.jpg
