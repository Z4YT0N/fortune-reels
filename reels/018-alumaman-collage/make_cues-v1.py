"""cues.json from the event list below: [event_time, effect, peak_dB, align]. Times = visual events on the voice clock (see reel.tpl)."""
import json, os
O = 'owner-pack-2026-11/'
C = [
 # S1 hook: label wipe + dust
 (0.00, 'paper_slide', -14, 'start'), (0.04, 'dust_gust', -8, 'start'),
 (0.30, 'marker', -15, 'start'), (0.47, O + 'soft-pop-sfx-433612.mp3', -17, 'peak'),
 (1.00, 'dust_gust', -9, 'peak'),                              # cut S1A->S1B + «والغبار» rides the dust
 (1.66, O + 'swoosh-014-383768.mp3', -17, 'peak'),            # echo stack collapses
 (1.72, O + 'creatorshome-sharp-pop-328170.mp3', -13, 'peak'), # «داخل؟» lands
 (1.95, 'paper_rip', -10, 'peak'),                            # the old window is ripped off the wall
 (2.30, O + 'simple-whoosh-02-433006.mp3', -15, 'peak'),       # dust words blown out right
 (2.90, O + 'flipcard-91468.mp3', -16, 'peak'),               # paper reframes to the opening
 (3.13, 'marker', -15, 'start'),                              # strike through «بالغبار»
 (3.22, O + 'minimal-pop-click-ui-11-198311.mp3', -17, 'peak'),# dimension pill
 (3.70, O + 'mouse-click-290204.mp3', -19, 'peak'), (4.05, O + 'mouse-click-290204.mp3', -20, 'peak'),
 # S2 the slam
 (4.30, O + 'whoosh-arrow-start-243483.mp3', -15, 'peak'),     # label knocked off
 (4.66, O + 'swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3', -11, 'peak'),  # frame falling
 (4.75, 'frame_slam', -6, 'peak!'), (4.75, 'iron_impact', -9, 'peak!'), (4.78, 'ink_splash', -14, 'peak'),
 (5.10, 'glass_tick', -24, 'start'),                          # debris settles
 (6.40, O + 'swoosh-06-351021.mp3', -18, 'peak'),             # «نصنع بالأحساء» flies in
 (7.05, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -19, 'peak'), # hl
 (7.45, O + 'swoosh-015-383769.mp3', -18, 'peak'),            # «ونركب بالشرقية» flies in
 (8.45, 'paper_slide', -14, 'peak'), (8.58, 'tape_strip', -16, 'peak'),  # contract scrap taped
 (9.10, 'stamp', -9, 'peak!'),
 (9.80, O + 'pop-2-269283.mp3', -21, 'peak'),
 # S3 dive + macro
 (10.70, O + 'whoosh-velocity-383019.mp3', -10, 'peak'),      # the dive swallows S2
 (11.29, 'stretch', -16, 'start'),                            # kashida grows
 (11.60, 'paper_tear', -14, 'peak'),                          # paper-tear cut into the macro
 (11.55, 'marker', -18, 'start'), (11.75, 'glass_tick', -17, 'start'),
 (13.11, 'marker', -18, 'start'),
 (14.43, 'glass_tick', -11, 'peak'), (14.50, O + 'soft-pop-sfx-433612.mp3', -15, 'peak'),  # rubber line hits the glass and bounces
 (14.55, 'marker', -18, 'start'),
 (15.95, O + 'quick-double-swish-sfx-230502.mp3', -16, 'peak'),
 # the tag
 (16.11, 'tag_drop', -10, 'peak'), (16.25, O + 'rope-creak-01-sound-effect-340131.mp3', -19, 'start'),
 (16.33, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -20, 'peak'),
 (17.17, O + 'creatorshome-sharp-pop-328170.mp3', -12, 'peak'),
 (17.25, O + 'swoosh-2-359826.mp3', -18, 'peak'),             # pull back into the room
 (18.63, O + 'creatorshome-sharp-pop-328170.mp3', -12, 'peak'),
 (19.59, O + 'creatorshome-sharp-pop-328170.mp3', -12, 'peak'),
 (21.12, O + 'whoosh-end-384629.mp3', -16, 'peak'),           # the tag drops out
 # the room
 (21.0, 'feather', -15, 'start'),
 (21.85, 'screwdriver', -14, 'start'),
 (22.21, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -20, 'peak'),
 (23.10, O + 'simple-whoosh-382724.mp3', -20, 'peak'),
 (23.30, 'coffee_pour', -15, 'start'), (23.28, O + 'benkirb-shine-1-268902.mp3', -22, 'peak'),
 (24.40, O + 'simple-whoosh-382724.mp3', -14, 'peak'),        # «والغبار» leaves through the window
 (24.83, O + 'creatorshome-plop-333525.mp3', -15, 'peak'),    # «برا.» lands on the glass
 # night + end
 (25.28, O + 'whoosh-velocity-383019.mp3', -13, 'peak'), (25.40, 'paper_slide', -11, 'peak!'),
 (25.55, 'tape_strip', -17, 'peak'),
 (25.75, O + 'shine-6-268910.mp3', -22, 'peak'),
 (27.10, O + 'whoosh-arrow-start-243483.mp3', -16, 'peak'), (27.20, O + 'ui-pop-up-2-197887.mp3', -15, 'peak'),
 (28.02, O + 'mouse-click-290204.mp3', -9, 'peak'), (28.10, O + 'confirm-tap-394001.mp3', -14, 'peak'),
 (27.65, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -24, 'peak'), (27.77, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -24, 'peak'),
 (27.89, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -24, 'peak'),
 (28.80, O + 'benkirb-shine-1-268902.mp3', -20, 'peak'),
]
json.dump([list(c) for c in sorted(C)], open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cues.json'), 'w', encoding='utf-8'), indent=0)
print(len(C), 'cues')
