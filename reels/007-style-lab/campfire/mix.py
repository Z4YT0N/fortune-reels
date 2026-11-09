"""SFX on real visual events only, then VO + SFX -> -14 LUFS, muxed onto the silent render."""
import subprocess
OP = '../../../assets/sfx-library/owner-pack-2026-11/'
S6 = '../../006-gallery-continuity/assets/sfx/'
# (time s, file, gain dB, max length s)
HITS = [
    (0.00, OP + 'creatorshome-sharp-pop-328170.mp3', -10, 0.5),   # dot opens
    (0.30, OP + 'simple-whoosh-02-433006.mp3', -12, 0.6),          # dot floods the frame
    (0.58, OP + 'swoosh-06-351021.mp3', -14, 0.5),                 # box wipes in
    (1.48, S6 + 'thud.mp3', -12, 0.5),                             # «كبيرة» box punch
    (1.86, OP + 'whoosh-velocity-383019.mp3', -14, 0.5),           # grid rains out
    (2.05, OP + 'swoosh-014-383768.mp3', -13, 0.5),                # line streaks off
    (2.41, OP + 'minimal-pop-click-ui-11-198311.mp3', -14, 0.35),  # «٣٤» outlines pop
    (2.73, OP + 'minimal-pop-click-ui-11-198311.mp3', -16, 0.35),
    (3.17, S6 + 'impact.mp3', -11, 0.7),                           # swap to black, «ميجا»
    (3.44, S6 + 'whoosh2.mp3', -14, 0.4),                          # rows scatter
    (3.70, S6 + 'click.mp3', -12, 0.3),                            # cut to cream, spin
    (4.00, OP + 'swoosh-015-383769.mp3', -14, 0.5),                # ring slides in
    (4.40, S6 + 'marker.mp3', -14, 0.3),                           # line drawn
    (4.66, OP + 'soft-pop-sfx-433612.mp3', -10, 0.2),              # ring swallows disc
    (5.25, S6 + 'thud.mp3', -10, 0.5),                             # «ويستنى» stamp
    (6.16, S6 + 'impact.mp3', -14, 0.6),                           # swap + step
    (7.40, OP + 'quick-double-swish-sfx-230502.mp3', -12, 0.6),    # «ويطلع» whip
    (8.51, S6 + 'zap.mp3', -13, 0.5),                              # neon lights
    (8.77, S6 + 'zap.mp3', -16, 0.4),
]
args = ['ffmpeg', '-v', 'error', '-y', '-i', '../shared/vo.mp3']
for _, f, _, _ in HITS: args += ['-i', f]
fl = []
for i, (t, f, g, L) in enumerate(HITS, 1):
    ms = int(t * 1000)
    fl.append(f'[{i}:a]atrim=0:{L},afade=t=out:st={max(L-0.12,0)}:d=0.12,volume={g}dB,aresample=44100,aformat=channel_layouts=stereo,adelay={ms}|{ms}[s{i}]')
fl.append('[0:a]aresample=44100,aformat=channel_layouts=stereo,volume=0dB[vo]')
fl.append('[vo]' + ''.join(f'[s{i}]' for i in range(1, len(HITS) + 1)) + f'amix=inputs={len(HITS)+1}:normalize=0:duration=first,apad=pad_dur=0.1,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
args += ['-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', 'renders/mix.wav']
subprocess.run(args, check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'renders/campfire-silent.mp4', '-i', 'renders/mix.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', 'campfire-final.mp4'], check=True)
print('ok')
