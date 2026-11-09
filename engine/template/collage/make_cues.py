"""cues.json from the event list below: [event_time, effect, peak_dB, align]. Times = visual events on the voice clock (see reel.tpl).
effect = a name in assets/sfx/ (this reel, made by sfxgen.py) or the shared assets/sfx/, or a path under assets/sfx-library/ (owner pack first).
align  = "peak" (impacts: the file's loudest 5 ms lands on t) or "start" (beds, pours); a trailing "!" = hero hit, skips the voice duck.
About 2 cues per second, each on a real event in the picture or the type (a drop, a flash, a tear, a print). No loops, no ticking beds."""
import json, os
O = 'owner-pack-2026-11/'
C = [
    # (0.00, 'paper_slide', -14, 'start'),                       # hook label wipes in
    # (0.47, O + 'soft-pop-sfx-433612.mp3', -17, 'peak'),         # snap lands
    # (4.75, 'frame_slam', -6, 'peak!'),                         # hero hit: bypasses the duck
]
json.dump([list(c) for c in sorted(C)], open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cues.json'), 'w', encoding='utf-8'), indent=0)
print(len(C), 'cues')
