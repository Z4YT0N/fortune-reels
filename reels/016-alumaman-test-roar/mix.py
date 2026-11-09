"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS, TP -1.5). Cue times use audio/words.json (the same anchors as beats.js)."""
import json, os, subprocess
w = json.load(open('audio/words.json', encoding='utf-8'))
V = lambda i: w[i][1]
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/vo.mp3'], capture_output=True, text=True).stdout) + 1.9, 2)
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; S6 = '../006-gallery-continuity/assets/sfx/'; A = 'assets/sfx/'
LFE = R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav'
ET = V(78) + 0.12
cues = [
 (0.00, A + 'sand.mp3', -14),                                # glare + sand at the window (frame 0)
 (0.02, S6 + 'paper_slide.mp3', -11),                        # hook scrap drops
 (0.10, S6 + 'tape_strip.mp3', -16),
 (V(3), S6 + 'impact.mp3', -13),                             # hot
 (V(3) + 0.1, S6 + 'stretch.mp3', -17),                      # kashida stretch
 (V(5) + 0.35, S6 + 'marker.mp3', -13),                      # underline, dust
 (V(6) - 0.12, O + 'swoosh-015-383769.mp3', -12),            # whip pan + scrap leaves
 (V(6) + 0.04, S6 + 'paper_slide.mp3', -12),                 # fitter's note drops
 (V(8) - 0.04, O + 'pop-402324.mp3', -15),                   # cheap fitter
 (V(10) - 0.02, O + 'creatorshome-sharp-pop-328170.mp3', -13),  # installed and left
 (V(11) + 0.05, O + 'quick-double-swish-sfx-230502.mp3', -11),  # yanked off-frame
 (V(12) - 0.06, O + 'pop-2-269283.mp3', -13),                # tag: small gap
 (V(12) + 0.12, S6 + 'marker.mp3', -13),                     # arrow drawn
 (V(13), A + 'sand.mp3', -15),                               # sand pours through the gap
 (V(14) - 0.06, O + 'pop-2-269283.mp3', -13),                # tag: silicone
 (V(14) + 0.14, S6 + 'marker.mp3', -14),
 (V(16) + 0.2, A + 'storm.mp3', -11),                        # dust storm swirls
 (V(17) - 0.08, S6 + 'paper_slide.mp3', -12),                # calendar drops
 (V(17) + 0.1, S6 + 'tape_strip.mp3', -16),
 (V(21) - 0.02, A + 'stamp.mp3', -9),                        # late stamp
 (V(21) + 0.18, S6 + 'thud.mp3', -15),
 (V(22) - 0.36, O + 'swoosh-06-351021.mp3', -14),            # calendar blown away
 (V(22), A + 'flash.mp3', -10),                              # invert flash, the turn
 (V(22) + 0.02, S6 + 'impact.mp3', -12),
 (V(23) - 0.04, O + 'quick-double-swish-sfx-230502.mp3', -13),  # brand smear
 (V(24) - 0.04, O + 'simple-whoosh-02-433006.mp3', -15),
 (V(25), O + 'shine-6-268910.mp3', -15),                     # teal bar
 (V(28) - 0.04, S6 + 'impact.mp3', -14),                     # written
 (V(28) + 0.08, S6 + 'stretch.mp3', -18),
 (V(29) - 0.05, O + 'soft-pop-sfx-433612.mp3', -14),         # contract laid down
 (V(30) - 0.02, O + 'simple-whoosh-382724.mp3', -16),        # installation date
 (12.13, A + 'stamp.mp3', -8),                               # the real stamp presses
 (12.32, S6 + 'thud.mp3', -14),                              # teal imprint
 (V(33), O + 'pop-331049.mp3', -16),                         # we keep it
 (13.0, LFE, -13),                                           # pan through the dark
 (13.95, A + 'print.mp3', -12),                              # receipt header prints
 (V(37) - 0.15, A + 'print.mp3', -13),                       # 10 years
 (V(37), O + 'pop-402324.mp3', -13),
 (V(41) - 0.15, A + 'print.mp3', -13),                       # 5 years
 (V(41), O + 'pop-402324.mp3', -13),
 (V(45) - 0.15, A + 'print.mp3', -13),                       # 2 years
 (V(45), O + 'pop-402324.mp3', -13),
 (17.62, S6 + 'paper_tear.mp3', -10),                        # receipt torn off
 (17.72, O + 'swoosh-014-383768.mp3', -14),                  # camera rises to the window
 (V(48) - 0.04, S6 + 'impact.mp3', -14),                     # maintenance
 (V(49) - 0.04, O + 'shine-6-268910.mp3', -15),              # free
 (V(49) + 0.1, S6 + 'stretch.mp3', -18),
 (19.6, A + 'screw.mp3', -10),                               # screwdriver on the hinge
 (V(53) - 0.06, O + 'pop-2-269283.mp3', -13),                # tag: hinges
 (V(53) + 0.12, S6 + 'marker.mp3', -14),
 (V(54) - 0.06, O + 'pop-2-269283.mp3', -14),                # tag: slides
 (21.2, A + 'screw.mp3', -13),
 (V(55) - 0.02, A + 'stamp.mp3', -10),                       # no cost stamp
 (21.95, O + 'simple-whoosh-02-433006.mp3', -16),            # pull back
 (V(57) - 0.04, S6 + 'impact.mp3', -11),                     # starburst pops
 (V(57) + 0.02, O + 'creatorshome-sharp-pop-328170.mp3', -14),
 (V(58) + 0.05, S6 + 'stretch.mp3', -18),
 (V(59) - 0.08, A + 'glass.mp3', -11),                       # glass tag
 (V(59) + 0.22, S6 + 'marker.mp3', -15),
 (V(61) - 0.08, O + 'pop-331049.mp3', -14),                  # silicone tag
 (V(61) + 0.22, S6 + 'marker.mp3', -15),
 (V(63) - 0.08, O + 'pop-331049.mp3', -14),                  # EPDM tag
 (V(63) + 0.22, S6 + 'marker.mp3', -15),
 (27.05, LFE, -13),                                          # push through the glass
 (V(66) - 0.1, O + 'swoosh-06-351021.mp3', -15),             # strip slides
 (V(66) - 0.05, O + 'flipcard-91468.mp3', -12),              # prints drop
 (V(67) - 0.05, O + 'flipcard-91468.mp3', -13),
 (V(67) + 0.42, O + 'flipcard-91468.mp3', -13),
 (V(68) - 0.02, O + 'flipcard-91468.mp3', -13),
 (V(70) - 0.05, O + 'flipcard-91468.mp3', -13),
 (V(71) - 0.02, O + 'flipcard-91468.mp3', -12),
 (V(70) + 0.1, O + 'soft-pop-sfx-433612.mp3', -16),          # cities line
 (V(71) + 0.25, O + 'quick-double-swish-sfx-230502.mp3', -12),  # prints swept away
 (V(72) - 0.12, S6 + 'paper_slide.mp3', -12),                # the old window sheet slides in
 (V(75) + 0.05, S6 + 'paper_tear.mp3', -9),                  # torn off
 (V(75) + 0.2, O + 'marimba-bloop-3-188151.mp3', -15),       # with Aman tag
 (V(76) - 0.15, O + 'swoosh-014-383768.mp3', -15),           # CTA pill rises
 (V(78) - 0.02, O + 'App Click 1.wav', -10),                 # press
 (ET, LFE, -13),                                             # end card grows
 (ET + 0.45, O + 'shine-6-268910.mp3', -15),
]
inp = ['-i', 'audio/vo.mp3']; fl = []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(t * 1000)
    fl.append(f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:2.0,afade=t=out:st=1.5:d=0.5,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo[vo]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append(f'[sfx]acompressor=threshold=-20dB:ratio=3[sfxc];[vo][sfxc]amix=inputs=2:normalize=0,apad,atrim=0:{D},afade=t=out:st={D - 0.6}:d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11,volume=0.2dB[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3', len(cues), 'cues, D =', D)
