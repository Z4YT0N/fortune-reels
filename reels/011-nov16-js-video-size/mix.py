"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS). Cue times come from audio/words.json (same anchors as the template)."""
import json, os, subprocess
w = json.load(open('audio/words.json', encoding='utf-8'))
V = lambda i: w[i][1]; W = lambda i: w[i][2]
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/vo.mp3'], capture_output=True, text=True).stdout) + 1.3, 2)
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../006-gallery-continuity/assets/sfx/'
CK1, CK2 = V(10) + 0.02, V(16) + 0.02
OUT4 = V(24) - 0.12; OUT5 = V(44) - 0.2; OUT6 = V(49) - 0.18
GRAB = V(61) - 0.24; FLICK = V(61) - 0.12; RACE = V(63) - 0.04; OUT8 = V(72) - 0.24; SEND = 28.38; ENDT = SEND + 0.2
cues = [
 (0.00, O + 'soft-pop-sfx-433612.mp3', -10),                 # «موقع» pill
 (V(1), O + 'creatorshome-sharp-pop-328170.mp3', -12),       # «شركة»
 (V(2), O + 'multi-pop-2-188167.mp3', -11),                  # «كبيرة» shoulders
 (V(3) - 0.12, O + 'swoosh-015-383769.mp3', -14),            # pills fly out
 (V(6) - 0.2, O + 'swoosh-06-351021.mp3', -14),              # tag on a curve
 (V(6) + 0.18, S6 + 'marker.mp3', -11),                      # arrow drawn
 (V(7) - 0.2, O + 'simple-whoosh-382724.mp3', -15),          # files fall
 (V(7) + 0.04, S6 + 'iron_impact.mp3', -9),                  # «حمل» lands, scale sinks
 (V(7) + 0.1, O + 'rope-creak-01-sound-effect-340131.mp3', -18),  # needle swings
 (V(8), O + 'soft-subtle-ui-pop-sfx-348820.mp3', -14),       # «ما تشوفه»
 (CK1, M + 'Clicks/mouse-click-198485.wav', -8),             # click the ghost
 (CK1 + 0.06, O + 'swoosh-010-352856.mp3', -13),             # clone flies, card wipes
 (V(10) + 0.3, O + 'iphone-keyboard-typing-sound-effect-336778.mp3', -22),  # title types
 (V(12), O + 'marimba-bloop-2-188149.mp3', -12),             # «لحاله»
 (V(13), M + 'Data Collect/Data Collect.wav', -15),          # counter rolls
 (V(15), S6 + 'impact.mp3', -10),                            # «ميجا» slam
 (CK2, M + 'Clicks/mouse-click-198485.wav', -8),
 (CK2 + 0.06, O + 'swoosh-014-383768.mp3', -13),
 (V(18), M + 'Data Collect/Data Collect.wav', -16),
 (V(19), S6 + 'impact.mp3', -11),
 (V(20), O + 'bubble-pops-272427.mp3', -16),                 # «بعد»
 (V(21) - 0.1, O + 'quick-double-swish-sfx-230502.mp3', -10),  # smear slam «وش»
 (V(23) + 0.06, S6 + 'marker.mp3', -12),                     # highlight wipe
 (OUT4, O + 'simple-whoosh-02-433006.mp3', -13),             # cards leave
 (V(26), O + 'soft-pop-sfx-433612.mp3', -11),                # «ينزل»
 (V(26) + 0.2, S6 + 'drop.mp3', -13),                        # download arrow
 (V(27) + 0.1, O + 'swoosh-2-359826.mp3', -15),              # files into the screen
 (V(29) - 0.3, O + 'swoosh-06-351021.mp3', -15),             # push-through
 (V(31), O + 'ipad_click-99325.mp3', -12), (V(31) + 0.3, O + 'ipad_click-99325.mp3', -14),  # taps, nothing moves
 (V(32) + 0.36, S6 + 'boing.mp3', -16),                      # «تتحرك» jiggles
 (12.18, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -11),  # circle wipe into the dark
 (V(33) - 0.12, O + 'swoosh-015-383769.mp3', -14),           # quote pill
 (12.75, M + 'Data Collect/MA_Tuttkile_Stopwatch_3.wav', -16),  # stopwatch starts
 (V(40), O + 'shine-6-268910.mp3', -13),                     # «٣»
 (V(42), O + 'pop-2-269283.mp3', -12),                       # «على الجوال»
 (OUT5, O + 'simple-whoosh-382724 (1).mp3', -14),            # ring parks
 (V(44) + 0.05, S6 + 'impact.mp3', -12),                     # «٥٣٪»
 (V(45), O + 'bubble-pops-272427.mp3', -17),                 # visitors appear
 (V(48) - 0.05, O + 'swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3', -14),  # 53 leave
 (OUT6, O + 'simple-whoosh-02-433006.mp3', -14),
 (V(49), O + 'creatorshome-plop-333525.mp3', -10),           # «فاشتغلنا»
 (V(49) + 0.25, O + 'ui-pop-up-2-197887.mp3', -15),          # bars grow
 (V(51) + 0.2, O + 'minimal-pop-click-ui-11-198311.mp3', -11),  # selection
 (V(51) + 0.5, S6 + 'marker.mp3', -12),                      # cut line
 (V(52), S6 + 'paper_tear.mp3', -11),                        # slice
 (V(54) + 0.16, O + 'swoosh-010-352856.mp3', -12),           # 1 MB chunk falls
 (V(55), O + 'pop-331049.mp3', -12),
 (V(56) - 0.3, O + 'swoosh-06-351021.mp3', -15),
 (V(57), S6 + 'stretch.mp3', -11),                           # bar squashed
 (V(58), M + 'Data Collect/Data Collect.wav', -15),
 (V(60), S6 + 'impact.mp3', -10),                            # «كيلو»
 (GRAB, M + 'Clicks/mouse-click-198485.wav', -9),
 (FLICK, O + 'quick-double-swish-sfx-230502.mp3', -10),      # dark world swiped away
 (V(61) + 0.1, O + 'marimba-bloop-3-188151.mp3', -13),       # «نفس الموقع»
 (FLICK + 0.3, S6 + 'feather.mp3', -11),                     # platform springs up
 (RACE, O + 'ui-processing-data-sequence-modern-interface-progress-02-230495.mp3', -16),  # bar races
 (RACE + 0.36, O + 'success-340660.mp3', -13),               # 100 %
 (V(64) - 0.06, O + 'soft-pop-sfx-433612.mp3', -11),         # «اخف»
 (V(66) - 0.3, O + 'swoosh-014-383768 (2).mp3', -15),
 (V(70), S6 + 'thud.mp3', -12),                              # «مثقل» needle dips
 (V(71), O + 'pop-402324.mp3', -13),
 (OUT8, O + 'simple-whoosh-382724.mp3', -14),
 (V(73) - 0.02, O + 'creatorshome-sharp-pop-328170.mp3', -12),  # «انطباع»
 (V(73), O + 'phone-typing-333292.mp3', -20),
 (SEND, O + 'App Click 1.wav', -8),
 (SEND + 0.04, O + 'message-envoye-iphone-apple-391098.mp3', -12),  # sent
 (ENDT, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -12),  # end panel rises
 (ENDT + 0.35, O + 'shine-6-268910.mp3', -14),
]
inp = ['-i', 'audio/vo.mp3']; fl = []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(t * 1000)
    fl.append(f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.6,afade=t=out:st=1.2:d=0.4,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0dB[vo]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append(f'[sfx]acompressor=threshold=-20dB:ratio=3[sfxc];[vo][sfxc]amix=inputs=2:normalize=0,apad,atrim=0:{D},afade=t=out:st={D - 0.6}:d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3', len(cues), 'cues, D =', D)
