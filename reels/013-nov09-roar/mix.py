"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS, no music bed). Cues: (time_s, file, gain_dB)."""
import subprocess, os
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../006-gallery-continuity/assets/sfx/'
D = 27.3
cues = [
 (0.00, O + 'soft-pop-sfx-433612.mp3', -12),               # hook scrap settles
 (0.90, S6 + 'paper_slide.mp3', -12),                      # «لازم يكون بطيء؟» scrap slides in
 (1.10, S6 + 'paper_tear.mp3', -9),                        # the paper starts tearing (film)
 (1.75, S6 + 'stretch.mp3', -14),                          # kashida on «بطيء؟»
 (2.21, S6 + 'impact.mp3', -8),                            # «لا.» stamp
 (2.21, S6 + 'glitch.mp3', -16),                           # invert flash
 (2.40, O + 'simple-whoosh-02-433006.mp3', -14),           # hook blown off
 (2.56, S6 + 'paper_slide.mp3', -13),                      # speech note drops
 (3.93, O + 'creatorshome-plop-333525.mp3', -11),          # «يا فخم» tag
 (4.55, O + 'creatorshome-sharp-pop-328170.mp3', -12),     # «يا سريع» tag
 (5.30, O + 'swoosh-06-351021.mp3', -14),                  # tags swallowed, green half slides away
 (5.36, S6 + 'paper_slide.mp3', -13),                      # «بس الفخامة» note
 (6.14, S6 + 'tape_strip.mp3', -14),                       # second line taped
 (6.90, S6 + 'clatter.mp3', -11),                          # weights + chains drop on the frame (film)
 (7.30, O + 'rope-creak-01-sound-effect-340131.mp3', -16), # chains creak
 (7.62, S6 + 'paper_slide.mp3', -13),                      # cause tag
 (8.75, O + 'creatorshome-plop-333525.mp3', -11),          # «اللي ما انضبط»
 (9.84, S6 + 'iron_impact.mp3', -8),                       # the weights yank it all down
 (9.95, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -12),# fall into the dark world
 (9.76, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -12),  # «جوجل تقول» chip
 (10.62, S6 + 'paper_slide.mp3', -13),                     # «بعد ٣ ثواني» note
 (10.94, S6 + 'tick.mp3', -12), (11.30, S6 + 'tick.mp3', -12), (11.62, S6 + 'tick.mp3', -11),  # 1, 2, 3 seconds
 (11.74, S6 + 'paper_slide.mp3', -13),                     # «٥٣٪» note
 (11.82, M + 'Data Collect/Data Collect.wav', -16),        # counter rolls
 (13.25, O + 'simple-whoosh-382724.mp3', -15),             # notes fly off as he stands
 (13.72, O + 'creatorshome-sharp-pop-328170.mp3', -12),    # «يطلعون»
 (14.58, S6 + 'swipe.mp3', -11),                           # «يطلعون» leaves with him
 (14.60, O + 'minimal-pop-click-ui-11-198311.mp3', -12),   # receipt starts feeding
 (15.35, S6 + 'scan.mp3', -13),                            # flashlight beam wipe (film)
 (15.36, S6 + 'type.mp3', -15),                            # «٣٤ ميجا» line prints
 (16.10, S6 + 'feather.mp3', -12),                         # feather lands (film)
 (16.64, S6 + 'marker.mp3', -11),                          # strike through
 (17.08, S6 + 'cash.mp3', -11),                            # «١٤٠ كيلو» prints
 (18.40, S6 + 'type.mp3', -15),                            # «نفس الفخامة» line
 (19.30, O + 'multi-pop-2-188167.mp3', -14),               # starburst pops (film)
 (19.38, S6 + 'type.mp3', -15),                            # «ونفس الجودة» line
 (20.00, S6 + 'paper_slide.mp3', -12),                     # the man slides in (film)
 (20.20, O + 'quick-double-swish-sfx-230502.mp3', -12),    # receipt torn off, «ويفتح» smears in
 (21.05, S6 + 'stretch.mp3', -13),                         # kashida «طول»
 (21.45, S6 + 'paper_slide.mp3', -13),                     # «يعني تقدر تكون»
 (22.30, O + 'creatorshome-plop-333525.mp3', -10),         # «فخم»
 (22.93, O + 'pop-2-269283.mp3', -10),                     # «وسريع»
 (23.40, O + 'swoosh-015-383769.mp3', -12),                # dark sheet rises
 (23.88, S6 + 'thud.mp3', -12),                            # it lands
 (24.82, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -11),  # comment bar
 (25.07, O + 'App Click 1.wav', -9),                       # «انطباع»
 (25.55, O + 'shine-6-268910.mp3', -14),                   # logo + contact
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
print('audio/mix.mp3', len(cues), 'cues')
