"""SFX mix for the stomp segment: one designed hit per real visual event, voice on top, -14 LUFS."""
import subprocess
S = '../../006-gallery-continuity/assets/sfx/'
O = '../../../assets/sfx-library/'
# (file, start_in_reel, trim_from, length, gain_dB)
EV = [
    (S+'pop.mp3', 0.00, 0, 0.45, -12),            # «معرض» pops
    (S+'whoosh.mp3', 0.33, 0, 0.5, -14),          # light panel pushes up
    (S+'type.mp3', 0.66, 0.04, 0.42, -14),        # «في موقع» typed
    (S+'swipe.mp3', 1.00, 0, 0.45, -8),           # cursor bar becomes the green panel
    (S+'thud.mp3', 1.13, 0, 0.5, 4),              # «شركة» slam
    (S+'whoosh2.mp3', 1.36, 0, 0.6, -14),         # «كبيرة» pushes in
    (O+'owner-pack-2026-11/quick-double-swish-sfx-230502.mp3', 1.81, 0.5, 0.6, -14),  # bars wipe
    (S+'impact.mp3', 2.46, 0, 0.9, -9),           # «٤» stomps
    (S+'iron_impact.mp3', 2.73, 0, 0.9, -9),      # «٣» stomps
    (S+'glitch.mp3', 3.41, 0, 0.45, 2),           # slice glitch
    (S+'thud.mp3', 3.72, 0, 0.5, 4),              # «عميلك»
    (O+'owner-pack-2026-11/flipcard-91468.mp3', 3.83, 0.45, 0.45, -2),  # drum roll 1
    (O+'owner-pack-2026-11/flipcard-91468.mp3', 4.24, 0.45, 0.45, -2),  # drum roll 2
    (O+'owner-pack-2026-11/flipcard-91468.mp3', 4.40, 0.45, 0.45, -2),  # drum roll 3
    (S+'marker.mp3', 4.80, 0, 0.45, 6),           # strike line through «جواله»
    (O+'vint/LFE Whoosh, Low Pitch, Rumble.wav', 4.73, 0.6, 1.0, -9),  # line -> black band
    (S+'impact.mp3', 5.22, 0, 0.8, -12),          # «ويستنى»
    (S+'thud.mp3', 6.20, 0, 0.5, 4),              # second «ويستنى» scrolls the stack
    (O+'vint/Special Effect, Flash, Fast Swoosh 16.wav', 7.02, 0, 1.0, -10),  # giant «ويطلع» drag
    (S+'impact.mp3', 7.82, 0, 0.7, -11),          # «لا» stomps
    (S+'glitch.mp3', 8.48, 0, 0.45, 2),           # «صور» slices in
    (S+'iron_impact.mp3', 8.77, 0, 0.9, -9),      # «أقل» stomps
    (S+'swipe.mp3', 8.92, 0, 0.45, -8),           # strike line
]
args = ['ffmpeg', '-v', 'error', '-y', '-i', '../shared/vo.mp3']
fl = []
for i, (f, t, a, d, g) in enumerate(EV):
    args += ['-i', f]
    ms = int(t * 1000)
    fl.append(f'[{i+1}:a]atrim={a}:{a+d},asetpts=PTS-STARTPTS,aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st={max(0,d-0.12)}:d=0.12,volume={g+3}dB,adelay={ms}|{ms}[s{i}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo[vo]')
fl.append('[vo]' + ''.join(f'[s{i}]' for i in range(len(EV))) + f'amix=inputs={len(EV)+1}:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
args += ['-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'renders/mix.mp3']
subprocess.run(args, check=True)
print('renders/mix.mp3')
