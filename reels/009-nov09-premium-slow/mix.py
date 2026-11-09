"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS). Cues: (time_s, file, gain_dB). Times follow the baked timeline (audio/words.json)."""
import subprocess, os
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../006-gallery-continuity/assets/sfx/'
CLICK = M + 'Clicks/mouse-click-198485.wav'
cues = [
 (0.00, O + 'swoosh-06-351021.mp3', -17),                 # «الموقع» slides in
 (0.20, O + 'soft-pop-sfx-433612.mp3', -11),              # «الفخم» zoom-out
 (0.32, S6 + 'stretch.mp3', -13),                         # its kashida stretches
 (0.62, O + 'marimba-bloop-2-188149.mp3', -16),           # «لازم يكون» inks in
 (1.24, O + 'whoosh-end-384629.mp3', -14),                # «بطيء؟» drops
 (1.45, S6 + 'stretch.mp3', -15),                         # slow kashida
 (1.92, CLICK, -8),                                       # cursor stamps
 (1.95, S6 + 'impact.mp3', -11),                          # «لا.» slab
 (2.20, S6 + 'thud.mp3', -11),                            # cube lands, beam dips
 (2.30, O + 'marimba-bloop-3-188151.mp3', -15),           # tag «ثري دي»
 (2.70, S6 + 'thud.mp3', -11),                            # photo lands
 (2.80, O + 'marimba-bloop-2-188149.mp3', -15),           # tag «صور كبيرة»
 (3.53, S6 + 'thud.mp3', -10),                            # motion badge lands
 (3.63, O + 'multi-pop-2-188167.mp3', -13),               # tag «وحركة»
 (4.08, O + 'simple-whoosh-382724.mp3', -13),             # motion trails
 (4.53, O + 'quick-double-swish-sfx-230502.mp3', -12),    # «مكان.» smear slam
 (4.95, O + 'bubble-pops-272427.mp3', -16),               # speech bubble
 (5.67, O + 'soft-pop-sfx-433612.mp3', -12),              # «لازم تختار»
 (5.95, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -12),  # toggle appears
 (6.70, O + 'App Click 1.wav', -8),                       # click فخم
 (6.75, S6 + 'thud.mp3', -14),                            # beam sinks deeper
 (7.29, O + 'swoosh-010-352856.mp3', -14),                # drag to سريع
 (7.75, S6 + 'boing.mp3', -14),                           # knob springs back
 (7.94, O + 'minimal-pop-click-ui-11-198311.mp3', -12),   # «بس»
 (8.04, O + 'simple-whoosh-02-433006.mp3', -13),          # «الفخامة» zoom-out
 (8.14, CLICK, -9),                                       # grab the selection
 (8.24, S6 + 'riser.mp3', -17),                           # lift
 (9.47, S6 + 'marker.mp3', -11),                          # strike «تبطئ»
 (9.80, S6 + 'marker.mp3', -15),                          # scribble draws
 (10.50, O + 'quick-double-swish-sfx-230502.mp3', -12),   # «الشغل» smear slam
 (10.70, S6 + 'marker.mp3', -15),
 (11.17, S6 + 'drop.mp3', -12),                           # «انضبط.» lands crooked
 (11.74, O + 'rope-creak-01-sound-effect-340131.mp3', -13),  # the tangle tugs
 (11.86, S6 + 'paper_tear.mp3', -11),                     # the string snaps
 (11.98, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -10),  # camera dives into the dark
 (12.45, O + 'soft-pop-sfx-433612.mp3', -11),             # stopwatch pops
 (12.81, CLICK, -8),                                      # start
 (13.52, S6 + 'bell.mp3', -14),                           # 3 s alarm
 (13.56, O + 'simple-whoosh-02-433006.mp3', -14),         # ٥٣٪ zoom-out
 (13.60, M + 'Data Collect/Data Collect.wav', -16),       # counter rolls
 (14.60, O + 'swoosh-06-351021.mp3', -14),                # phone flies in
 (14.75, O + 'bubble-pops-272427.mp3', -16),              # visitor dots
 (15.62, O + 'quick-double-swish-sfx-230502.mp3', -11),   # 53 leave
 (15.70, O + 'swoosh-014-383768.mp3', -12),               # «يطلعون» slam
 (16.10, O + 'swoosh-015-383769.mp3', -13),               # knocked out
 (16.47, S6 + 'iron_impact.mp3', -8),                     # the weight lands
 (17.18, O + 'marimba-bloop-3-188151.mp3', -14),          # number
 (17.48, M + 'Data Collect/Data Collect.wav', -17),
 (17.92, S6 + 'impact.mp3', -10),                         # «ميجا», it sinks
 (18.43, CLICK, -8),                                      # click the weight
 (18.52, S6 + 'stretch.mp3', -12),                        # it morphs
 (18.60, O + 'whoosh-end-384629.mp3', -16),               # old number falls
 (18.74, O + 'soft-pop-sfx-433612.mp3', -12),             # new number
 (19.44, O + 'pop-331049.mp3', -12),                      # «كيلو»
 (19.60, S6 + 'feather.mp3', -11),                        # it floats up
 (19.70, O + 'swoosh-06-351021.mp3', -13),                # video card on a curve
 (20.78, CLICK, -8),                                      # play
 (20.82, O + 'App Click 1.wav', -12),
 (20.97, O + 'marimba-bloop-2-188149.mp3', -14),          # «٢»
 (21.30, O + 'marimba-bloop-3-188151.mp3', -14),          # «ميجا»
 (21.62, S6 + 'marker.mp3', -12),                         # strike
 (21.80, M + 'Data Collect/Data Collect.wav', -16),       # counter to ٦١٣
 (22.90, S6 + 'impact.mp3', -11),                         # «كيلو»
 (23.17, CLICK, -9),                                      # grab the dark world
 (23.27, O + 'quick-double-swish-sfx-230502.mp3', -9),    # flick
 (23.55, O + 'swoosh-010-352856.mp3', -16),               # beam swings level
 (23.75, O + 'bubble-pops-272427.mp3', -16),              # luxury pulses
 (24.23, O + 'multi-pop-2-188167.mp3', -11),              # «ونفس الجودة» pill
 (24.85, O + 'simple-whoosh-382724.mp3', -16),            # push up
 (25.55, O + 'quick-double-swish-sfx-230502.mp3', -11),   # «على طول» slam
 (25.60, O + 'shine-6-268910.mp3', -12),                  # bolt zap + shine
 (26.18, O + 'soft-pop-sfx-433612.mp3', -12),             # «موقعك»
 (26.60, S6 + 'thud.mp3', -9),                            # «ثقيل؟» lands heavy
 (26.75, O + 'swoosh-06-351021.mp3', -15),                # comment bar rises
 (27.32, O + 'iphone-keyboard-typing-sound-effect-336778.mp3', -18),  # types «انطباع»
 (28.43, CLICK, -8),                                      # send
 (28.46, O + 'message-envoye-iphone-apple-391098.mp3', -11),
 (28.57, O + 'simple-whoosh-02-433006.mp3', -12),         # end panel
 (29.20, O + 'shine-6-268910.mp3', -14),                  # «انطباع» highlight
]
D = 30.22
inp = ['-i', 'audio/vo.mp3']; fl = []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(t * 1000)
    fl.append(f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.6,afade=t=out:st=1.2:d=0.4,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0dB[vo]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append(f'[sfx]acompressor=threshold=-20dB:ratio=3[sfxc];[vo][sfxc]amix=inputs=2:normalize=0,apad,atrim=0:{D},afade=t=out:st={D - 0.6}:d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3', len(cues), 'cues')
