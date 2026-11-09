"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS). Cue times come from audio/words.json (same anchors as the template)."""
import subprocess, os, json
w = json.load(open('audio/words.json', encoding='utf-8')); V = lambda i: w[i][1]; W = lambda i: w[i][2]
D = round(float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/vo.mp3'], capture_output=True, text=True).stdout) + 1.3, 2)
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../006-gallery-continuity/assets/sfx/'
CLICK = M + 'Clicks/mouse-click-198485.wav'
F0 = V(45) + 0.05; FS = (W(47) - 0.05 - F0) / 14
cues = [
 (0.00, O + 'swoosh-015-383769.mp3', -13),                 # window tilts in, «فحصنا» lands
 (0.12, M + 'Data Collect/Data Collect.wav', -16),          # scan line starts
 (0.25, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -15), (0.95, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -15),
 (1.55, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -15), (2.05, O + 'bubble-pops-272427.mp3', -16),   # flags raised by the scan
 (2.33, S6 + 'iron_impact.mp3', -10),                       # counter slams on ١٤
 (V(6), O + 'marimba-bloop-2-188149.mp3', -15),             # «مشكلة»
 (V(7) - 0.06, O + 'simple-whoosh-382724.mp3', -15),         # flags sink, counter to chip
 (V(8) - 0.08, O + 'multi-pop-2-188167.mp3', -12),           # tag «شكله جاهز»
 (V(8) + 0.05, O + 'quick-double-swish-sfx-230502.mp3', -17),# skeleton polishes
 (V(10) - 0.05, O + 'marimba-bloop-3-188151.mp3', -12),      # tag «والزر جاهز»
 (V(10) + 0.05, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -12),  # button goes green
 (V(12), CLICK, -8),                                        # click denied
 (V(12) + 0.12, S6 + 'boing.mp3', -15),                     # button shakes
 (V(13) + 0.25, S6 + 'drop.mp3', -10), (V(13) + 0.28, S6 + 'impact.mp3', -13),   # padlock lands
 (V(13) + 0.12, S6 + 'feather.mp3', -13),                   # hanging tag swings
 (V(17), O + 'bubble-pops-272427.mp3', -14),                # the flags come back
 (V(19), O + 'creatorshome-plop-333525.mp3', -9),           # «نفحصه»
 (V(20) - 0.32, O + 'swoosh-014-383768.mp3', -13),          # scan line splits
 (V(20) - 0.1, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -11),  # report opens
 (V(22) - 0.05, S6 + 'impact.mp3', -12),                    # «الفحص؟» slam
]
for k, a in enumerate([23, 25, 27, 29, 31, 33]):
    cues.append((V(a) - 0.42, O + ('swoosh-06-351021.mp3' if k % 2 else 'swoosh-010-352856.mp3'), -15))   # category card flies in
for key in [24, 26, 28, 30, 32, 35]:
    cues.append((V(key) + 0.06, O + 'minimal-pop-click-ui-11-198311.mp3', -13))   # key word highlight + cursor tap
cues += [
 (V(40) - 0.06, S6 + 'iron_impact.mp3', -9),                # «أمثلة» stamp
 (V(41), O + 'soft-subtle-ui-pop-sfx-348820.mp3', -16),
 (V(44) - 0.3, O + 'quick-double-swish-sfx-230502.mp3', -11),# report folds into the board
 (V(44) - 0.08, O + 'multi-pop-2-188167.mp3', -14),          # flags pop on the board
 (V(44), O + 'swoosh-06-351021.mp3', -15),                   # «صلحنا» slam
]
for k in range(0, 14, 2):
    cues.append((F0 + k * FS + 0.06, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -15 - (0 if k % 4 else 1)))   # flags flip green
cues += [
 (V(46), O + 'marimba-bloop-2-188149.mp3', -14), (V(47), O + 'marimba-bloop-3-188151.mp3', -14),
 (F0 + 13 * FS + 0.08, O + 'success-340660.mp3', -12),      # 14/14
 (V(48) - 0.1, O + 'simple-whoosh-02-433006.mp3', -13),      # board folds into the locked button
 (V(48) + 0.32, O + 'pop-2-269283.mp3', -13),                # padlock pops
 (V(50), O + 'App Click 1.wav', -7),                         # shackle springs
 (V(50) + 0.32, O + 'shine-6-268910.mp3', -13),              # button unlocks, rings
 (V(50) + 0.4, O + 'swoosh-014-383768 (2).mp3', -15),        # padlock falls away
 (V(52) + 0.05, CLICK, -8),                                  # launch click
 (V(52) + 0.1, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -11),   # green wipe
 (V(52) + 0.42, O + 'swoosh-06-351021.mp3', -14),            # end panel rises
 (V(57) - 0.35, O + 'swoosh-010-352856.mp3', -14),           # comment field arrives
 (V(58), O + 'iphone-keyboard-typing-sound-effect-336778.mp3', -20),  # «انطباع» typed
 (V(58) + 0.3, O + 'pop-2-269283.mp3', -13),
 (V(59) + 0.2, CLICK, -8),                                   # send
 (V(59) + 0.28, O + 'pop-up-notify-smooth-modern-332448.mp3', -10),   # reply bubble
 (V(62), O + 'soft-pop-sfx-433612.mp3', -15),                # footer
 (V(66) + 0.12, O + 'pop-331049.mp3', -12),                  # «مجانا»
]
inp = ['-i', 'audio/vo.mp3']; fl = []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(max(0, t) * 1000)
    trim = '0:0.9' if 'typing' in f else '0:1.6'
    fl.append(f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim={trim},afade=t=out:st=0.6:d=0.3,volume={g}dB,adelay={ms}|{ms}[s{k}]' if 'typing' in f else
              f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim={trim},afade=t=out:st=1.2:d=0.4,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0dB[vo]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append(f'[sfx]acompressor=threshold=-20dB:ratio=3[sfxc];[vo][sfxc]amix=inputs=2:normalize=0,apad,atrim=0:{D},afade=t=out:st={D - 0.6}:d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3', len(cues), 'cues, D =', D)
