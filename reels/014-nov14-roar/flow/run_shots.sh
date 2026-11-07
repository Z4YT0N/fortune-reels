#!/bin/bash
cd E:/Library/01-Workspace/Fortune/fortune-reels/reels/014-nov14-roar
for s in S1 S2 S3 S4 S5 S6; do python flow/shots.py $s > flow/$s.out 2>&1 & sleep 4; done
wait; cat flow/S?.out
