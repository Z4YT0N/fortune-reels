"""Designed SFX only (no voice, no music bed) -> audio/mix.mp3 at -14 LUFS. Cues: (time_s, file, gain_dB), one per visual event."""
import subprocess, os
D = 18.5
R = '../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../006-gallery-continuity/assets/sfx/'
drops = [(2.2 + k * 0.27, S6 + ('thud.mp3' if k % 2 == 0 else 'drop.mp3'), -10 - (k % 3)) for k in range(8)]
hops = [(7.25 + k * 0.17, O + 'soft-subtle-ui-pop-sfx-348820.mp3', -14) for k in range(8)]
cues = [
 (0.00, O + 'swoosh-015-383769.mp3', -11),               # window rises
 (0.04, O + 'simple-whoosh-02-433006.mp3', -16),         # hook words travel in
 (0.15, O + 'keyboard-typing-fast-371229.mp3', -24),     # address types itself
 (0.20, M + 'Data Collect/Data Collect.wav', -15),       # counter 0 -> 34
 (0.30, S6 + 'marker.mp3', -12),                         # marker arrow draws
 (0.72, S6 + 'iron_impact.mp3', -8),                     # "MB" slams, window sags
 (0.80, O + 'rope-creak-01-sound-effect-340131.mp3', -15),  # tag swings
 *drops,                                                 # photos pile up
 (3.30, O + 'rope-creak-01-sound-effect-340131.mp3', -17),
 (4.09, O + 'quick-double-swish-sfx-230502.mp3', -12),   # "Still loading..." flies in
 (4.51, O + 'creatorshome-plop-333525.mp3', -10),        # sticker slaps
 (4.95, O + 'ipad_click-99325.mp3', -10), (5.25, O + 'ipad_click-99325.mp3', -12),  # impatient taps
 (5.70, O + 'swoosh-06-351021.mp3', -15),                # sticker leaves
 (5.85, O + 'swoosh-010-352856.mp3', -13),               # toolbar arrives
 (6.50, M + 'Clicks/mouse-click-198485.wav', -8),        # click "Compress every image"
 (6.53, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -12),
 (6.62, O + 'simple-whoosh-382724.mp3', -12),            # pile flies into the grid
 *hops,                                                  # each photo squeezed
 (8.61, O + 'success-340660.mp3', -13),                  # every image compressed
 (8.66, O + 'swoosh-014-383768.mp3', -15),               # toolbar leaves
 (8.75, S6 + 'marker.mp3', -11),                         # 34 MB struck
 (9.00, O + 'pop-2-269283.mp3', -9),                     # string snaps
 (9.05, S6 + 'whoosh.mp3', -14),                         # old tag falls
 (9.32, O + 'marimba-bloop-2-188149.mp3', -11),          # 140 KB hangs
 (9.36, M + 'Data Collect/Data Collect.wav', -17),       # counter 0 -> 140
 (9.80, O + 'marimba-bloop-3-188151.mp3', -13),          # "KB"
 (10.10, O + 'swoosh-06-351021.mp3', -14),               # hero line travels in
 (10.15, O + 'App Click 1.wav', -8),                     # reload
 (10.20, O + 'bubble-pops-272427.mp3', -15),             # photos snap in at once
 (10.33, O + 'pop-up-notify-smooth-modern-332448.mp3', -11),  # Loaded 100%
 (10.70, O + 'multi-pop-2-188167.mp3', -13),             # "instantly." settles
 (12.55, M + 'Clicks/mouse-click-198485.wav', -8),       # click the window
 (12.61, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -10),  # window swells into the end card
 (12.96, O + 'swoosh-015-383769.mp3', -13),              # "34 MB" in
 (13.46, S6 + 'marker.mp3', -11),                        # strike
 (13.51, O + 'swoosh-014-383768 (2).mp3', -13),          # tag flies to the line
 (13.61, O + 'simple-whoosh-02-433006.mp3', -15),        # arrow
 (14.12, O + 'creatorshome-sharp-pop-328170.mp3', -10),  # 140 KB lands
 (14.51, O + 'soft-pop-sfx-433612.mp3', -11),            # "Same photos."
 (14.91, O + 'pop-331049.mp3', -12),                     # "Same quality."
 (15.26, O + 'bubble-pops-272427.mp3', -17),             # photo row
 (15.71, O + 'shine-6-268910.mp3', -12),                 # logo
 (16.01, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -14),  # contact
]
inp, fl = [], []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(t * 1000)
    fl.append(f'[{k}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.6,afade=t=out:st=1.2:d=0.4,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append(f'[sfx]acompressor=threshold=-20dB:ratio=3,apad,atrim=0:{D},afade=t=out:st={D-0.6}:d=0.6[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', 'audio/raw.wav'], check=True)
# two-pass loudnorm (single pass lands ~2 LU short on sparse SFX)
import json, re
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', 'audio/raw.wav', '-af', 'loudnorm=I=-13.7:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', m).group(0))
ln = f"loudnorm=I=-13.7:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'audio/raw.wav', '-af', 'alimiter=limit=0.8:level=false,' + ln, '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3', len(cues), 'cues')
