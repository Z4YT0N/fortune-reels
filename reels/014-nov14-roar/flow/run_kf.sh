#!/bin/bash
cd E:/Library/01-Workspace/Fortune/fortune-reels/reels/014-nov14-roar
python flow/kf.py K0:2 > flow/K0.out 2>&1 &
sleep 3; python flow/kf.py K2:2 > flow/K2.out 2>&1 &
sleep 3; python flow/kf.py K3:2 > flow/K3.out 2>&1 &
sleep 3; python flow/kf.py K5:2 > flow/K5.out 2>&1 &
sleep 3; python flow/kf.py K6:2 > flow/K6.out 2>&1 &
wait; cat flow/K?.out
