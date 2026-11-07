"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS, TP -1.5). Cue times use audio/words.json (the same anchors as beats.js)."""
import json, os, subprocess
w = json.load(open('audio/words.json', encoding='utf-8'))
V = lambda i: w[i][1]
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/vo.mp3'], capture_output=True, text=True).stdout) + 2.0, 2)
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../006-gallery-continuity/assets/sfx/'; A = 'assets/sfx/'
ET = V(75) + 0.25
cues = [
 (0.00, S6 + 'paper_slide.mp3', -11),                       # hook scrap drops (frame 0)
 (0.08, S6 + 'tape_strip.mp3', -16),
 (V(2) + 0.22, S6 + 'marker.mp3', -13),                     # «كبيرة» highlight
 (V(6) - 0.06, O + 'creatorshome-sharp-pop-328170.mp3', -12),  # «جوالك» tag
 (V(6) + 0.12, S6 + 'marker.mp3', -12),                     # arrow drawn to the phone
 (V(7), S6 + 'iron_impact.mp3', -12),                       # «حمل»
 (V(7) + 0.12, A + 'creak.mp3', -12),                       # the load creaks
 (V(10) - 0.1, S6 + 'paper_slide.mp3', -12),                # JS tag swings in
 (V(13), M + 'Data Collect/Data Collect.wav', -17),         # counter rolls
 (V(15), S6 + 'impact.mp3', -11),                           # «ميجا»
 (5.96, O + 'swoosh-015-383769.mp3', -14),                  # cut S1 -> S2 + video tag
 (V(18), S6 + 'impact.mp3', -12),                           # «٢ ميجا»
 (V(20), O + 'simple-whoosh-02-433006.mp3', -15),           # tags drop
 (V(21) - 0.04, O + 'quick-double-swish-sfx-230502.mp3', -11),  # «وش يعني هذا؟» slam
 (V(21) + 0.3, S6 + 'marker.mp3', -13),
 (V(24) - 0.05, O + 'swoosh-06-351021.mp3', -14),           # «جوالك» flies in
 (V(26) - 0.1, O + 'pop-2-269283.mp3', -12),                # download pill
 (V(26) + 0.3, O + 'ui-processing-data-sequence-modern-interface-progress-02-230495.mp3', -20),
 (10.95, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -12),  # flashlight beam, lights out
 (V(29) - 0.12, S6 + 'paper_slide.mp3', -12),               # strip drops
 (V(29) + 0.35, S6 + 'tape_strip.mp3', -16),
 (V(32) + 0.1, O + 'ipad_click-99325.mp3', -13),            # page does not move
 (V(33), O + 'soft-subtle-ui-pop-sfx-348820.mp3', -15),     # «قوقل تقول»
 (V(40) - 0.02, O + 'shine-6-268910.mp3', -13),             # «٣ ثواني»
 (V(40), S6 + 'impact.mp3', -13),
 (V(42), O + 'pop-331049.mp3', -15),
 (V(44) - 0.35, O + 'simple-whoosh-382724.mp3', -15),
 (V(44) + 0.05, M + 'Data Collect/Data Collect.wav', -16),  # «٥٣٪»
 (V(47), O + 'swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3', -15),  # visitors leave
 (17.75, S6 + 'riser.mp3', -18),                            # lights come up
 (V(49), A + 'flash.mp3', -10),                             # invert flash «فاشتغلنا»
 (V(49) + 0.02, S6 + 'impact.mp3', -12),
 (V(51) - 0.1, A + 'print.mp3', -13),                       # receipt prints
 (19.9, A + 'snip.mp3', -9),                                # scissors cut the crate
 (20.35, S6 + 'thud.mp3', -12),                             # the half falls
 (V(54) - 0.02, O + 'pop-402324.mp3', -13),                 # «١٫٢ ميجا»
 (V(56) - 0.1, A + 'print.mp3', -14),
 (V(57), S6 + 'marker.mp3', -13),                           # strike «٢ ميجا»
 (V(58) - 0.02, O + 'pop-402324.mp3', -13),                 # «٦١٣ كيلو»
 (V(60), S6 + 'thud.mp3', -11),                             # stamp «أقل من الثلث»
 (V(62) - 0.15, O + 'quick-double-swish-sfx-230502.mp3', -14),  # receipt torn off, pull back
 (V(65) - 0.04, S6 + 'feather.mp3', -11),                   # «اخف»
 (V(65) + 0.05, O + 'marimba-bloop-3-188151.mp3', -15),
 (V(66), S6 + 'marker.mp3', -14),
 (V(67) - 0.15, S6 + 'paper_slide.mp3', -12),               # question note drops
 (V(67) + 0.25, S6 + 'tape_strip.mp3', -16),
 (V(71), S6 + 'thud.mp3', -15),                             # «مثقل»
 (V(73) - 0.25, O + 'swoosh-014-383768.mp3', -15),          # comment bar
 (V(74), O + 'phone-typing-333292.mp3', -21),
 (V(75), O + 'App Click 1.wav', -9),
 (V(75) + 0.05, O + 'message-envoye-iphone-apple-391098.mp3', -13),
 (28.35, O + 'simple-whoosh-382724.mp3', -16),              # note falls away
 (ET, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -13),   # end card rises
 (ET + 0.45, O + 'shine-6-268910.mp3', -15),
]
inp = ['-i', 'audio/vo.mp3']; fl = []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(t * 1000)
    fl.append(f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.6,afade=t=out:st=1.2:d=0.4,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo[vo]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append(f'[sfx]acompressor=threshold=-20dB:ratio=3[sfxc];[vo][sfxc]amix=inputs=2:normalize=0,apad,atrim=0:{D},afade=t=out:st={D - 0.6}:d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11,volume=0.7dB[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3', len(cues), 'cues, D =', D)
