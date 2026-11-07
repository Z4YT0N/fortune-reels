"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS, TP -1.5). Cues: (time_s, file, gain_dB). No music bed, no loops."""
import subprocess, os, json
w = json.load(open('audio/words.json', encoding='utf-8')); V = lambda i: w[i][1]
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/vo.mp3'], capture_output=True, text=True).stdout) + 1.3, 2)
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../006-gallery-continuity/assets/sfx/'
LD = V(15) - 0.05; B4 = V(20) - 0.15; B7 = V(44) - 0.1; OP = V(50); PR = 21.0
cues = [
 (0.00, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -13),   # dark, the beam is already moving
 (0.10, S6 + 'scan.mp3', -18),                                  # magnifier beam
 (V(1) - 0.05, S6 + 'paper_slide.mp3', -13),                    # tag «موقع قبل إطلاقه» drops
 (V(4) - 0.1, S6 + 'drop.mp3', -11),                            # counter note drops
 (V(4) + 0.15, S6 + 'tape_strip.mp3', -16),
 (1.85, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -16),          # flags found
 (2.12, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -16),
 (V(5) + 0.35, O + 'creatorshome-sharp-pop-328170.mp3', -11),   # ١٤
 (2.80, M + 'Clicks/mouse-click-198485.wav', -9),               # lights switch on (film 2.83 s)
 (2.85, R + 'vint/Special Effect, Flash, Fast Swoosh 16.wav', -15),
 (V(8) - 0.04, S6 + 'feather.mp3', -14),                        # «شكله جاهز»
 (V(10) - 0.05, S6 + 'paper_slide.mp3', -13),                   # «والزر جاهز» tag
 (V(11) - 0.15, S6 + 'marker.mp3', -12),                        # arrow to the button
 (V(12), S6 + 'whoosh2.mp3', -13),                              # «بس» hit frame
 (LD - 0.4, O + 'swoosh-06-351021.mp3', -12),                   # padlock falls
 (LD, S6 + 'iron_impact.mp3', -6),                              # padlock lands
 (LD + 0.03, S6 + 'thud.mp3', -11),
 (V(17) - 0.05, S6 + 'paper_tear.mp3', -14),                    # «قبل ما نفحصه» scrap
 (B4 - 0.1, R + 'vint/LFE Whoosh, Low Pitch, Rumble_2.wav', -12),  # lights go down
 (V(20) - 0.06, O + 'swoosh-sound-effect-for-fight-scenes-or-transitions-2-149890.mp3', -13),  # question slams
 (V(20) + 0.3, S6 + 'scan.mp3', -18),                           # magnifier beam returns
 (V(23) - 0.12, S6 + 'paper_slide.mp3', -11),                   # example notes drop one on another
 (V(23) + 0.2, S6 + 'tape_strip.mp3', -16),
 (V(25) - 0.12, S6 + 'drop.mp3', -12),
 (V(27) - 0.12, S6 + 'paper_slide.mp3', -11),
 (V(27) + 0.2, S6 + 'tape_strip.mp3', -16),
 (V(29) - 0.12, S6 + 'drop.mp3', -12),
 (V(31) - 0.12, S6 + 'paper_slide.mp3', -11),
 (V(33) - 0.12, S6 + 'drop.mp3', -12),
 (V(35), S6 + 'marker.mp3', -12),                               # marker under «تفضح»
 (V(40) - 0.05, S6 + 'impact.mp3', -8),                         # stamp «أمثلة»
 (V(40), O + 'creatorshome-plop-333525.mp3', -11),
 (V(41), S6 + 'feather.mp3', -16),
 (B7, O + 'quick-double-swish-sfx-230502.mp3', -11),            # notes slide away
 (B7 + 0.12, M + 'Clicks/mouse-click-198485.wav', -9),          # lights on
 (V(44) + 0.15, S6 + 'stretch.mp3', -13),                       # «صلحـــنا» kashida
 (V(45), S6 + 'tape_strip.mp3', -14),                           # green tape lands (video) + counter
 (V(46) - 0.1, S6 + 'tape_strip.mp3', -15),
 (V(47) - 0.1, S6 + 'tape_strip.mp3', -15),
 (W := w[47][2] - 0.1, O + 'success-340660.mp3', -13),          # ١٤ of ١٤
 (V(48), O + 'simple-whoosh-382724.mp3', -15),
 (OP - 0.02, O + 'App Click 1.wav', -6),                        # shackle springs open
 (OP, S6 + 'zap.mp3', -12),                                     # invert flash
 (OP + 0.45, S6 + 'clatter.mp3', -11),
 (20.73, O + 'benkirb-shine-1-268902.mp3', -14),                 # the screen glows green (film)                          # padlock tumbles to the floor
 (V(51) - 0.05, S6 + 'paper_slide.mp3', -14),                   # «زر الإطلاق» tag
 (PR - 0.35, R + 'vint/Ascend, Static 12.wav', -15),            # launch
 (PR + 0.15, O + 'swoosh-015-383769.mp3', -11),                 # button swells into the end ground
 (PR + 0.55, O + 'shine-6-268910.mp3', -15),                    # logo
 (V(53) + 0.05, O + 'soft-pop-sfx-433612.mp3', -14),
 (V(57) - 0.12, S6 + 'paper_slide.mp3', -10),                   # CTA note drops
 (V(57) + 0.15, S6 + 'tape_strip.mp3', -15),
 (V(58) - 0.4, O + 'swoosh-06-351021.mp3', -15),                # magnifier returns
 (V(58) + 0.05, S6 + 'marker.mp3', -12),
 (V(60), O + 'pop-2-269283.mp3', -16),
 (V(62), O + 'bubble-pops-272427.mp3', -18),
]
inp = ['-i', 'audio/vo.mp3']; fl = []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(max(0, t) * 1000)
    fl.append(f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.6,afade=t=out:st=1.2:d=0.4,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0dB[vo]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append(f'[sfx]acompressor=threshold=-20dB:ratio=3[sfxc];[vo][sfxc]amix=inputs=2:normalize=0,apad,atrim=0:{D},afade=t=out:st={D - 0.6}:d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3', len(cues), 'cues, D =', D)
