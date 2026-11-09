# usage: strip.sh video out.jpg t1 t2 ... (frames at given times, 270 wide)
v=$1; o=$2; shift 2; i=0; args=""; fl=""
for t in "$@"; do args="$args -ss $t -i $v"; fl="$fl[$i:v]trim=end_frame=1,scale=270:-1[f$i];"; i=$((i+1)); done
cat=""; for ((k=0;k<i;k++)); do cat="$cat[f$k]"; done
ffmpeg -v error -y $args -filter_complex "$fl${cat}hstack=$i" -frames:v 1 $o
