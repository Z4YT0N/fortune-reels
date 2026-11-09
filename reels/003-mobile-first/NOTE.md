# QA note: Mobile-first indexing

qa.py (2026-10-31): 1080x1920 @ 30 fps; 45.10 s; -14.4 LUFS, TP -1.5 dBFS; no end silence; no black frames;
nothing held > 2.5 s; loop SSIM 0.859.
Looked at: renders/qa/sheet.jpg (all beats), snap/ contact sheets 1-4, snap0 (frame 0 hook caption).
Fixed on the way: mockup black boxes (mix-blend lighten needs #bg inside the same stacking context as #cam);
first caption word invisible at t=0 (reel lib/captions.js: chunk 0 static from frame 1); layout tweens -> transforms.
Build: HyperFrames 0.8.152, pure DOM + GSAP (no 3dicons, that look is retired).
Flags: accent unverified (take B, eleven_v3, no tag, 1.1x); CTA «جوال» free mobile check is a new promise.
