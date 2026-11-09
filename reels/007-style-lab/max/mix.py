"""SFX on real visual events only + VO -> audio/mix.mp3 (-14 LUFS)."""
import subprocess
R = '../../'
S6 = R + '006-gallery-continuity/assets/sfx/'
MX = R + '../assets/sfx-library/motionix/Whooshes/'
OP = R + '../assets/sfx-library/owner-pack-2026-11/'
ev = [  # file, time (s), gain dB, trim length
    (S6 + 'thud.mp3', 0.00, -15, 0.6),          # «معرض» lands
    (S6 + 'thud.mp3', 0.78, -13, 0.6),          # «موقع» heavy line
    (S6 + 'paper_slide.mp3', 1.47, -20, 0.5),   # skyline rises
    (MX + 'Cinematic Fast Whoosh.wav', 2.02, -17, 0.7),  # band wipe + 90° roll
    (S6 + 'iron_impact.mp3', 2.42, -19, 0.6),   # ٤ slam
    (S6 + 'iron_impact.mp3', 2.74, -18, 0.6),   # ٣ slam
    (S6 + 'thud.mp3', 3.17, -17, 0.5),          # ميجا
    (S6 + 'swipe.mp3', 3.60, -17, 0.45),        # whip down to «عميلك»
    (S6 + 'thud.mp3', 3.70, -15, 0.5),          # «عميلك» lands
    (MX + 'Cinematic Low Whoosh.wav', 4.00, -20, 0.7),   # roll back, words become buildings
    (S6 + 'drop.mp3', 4.62, -19, 0.6),          # phone tower rises
    (S6 + 'stretch.mp3', 5.26, -18, 0.85),      # «ويستنى» stretch 1
    (S6 + 'stretch.mp3', 6.17, -21, 0.85),      # «ويستنى» stretch 2
    (MX + 'High And Fast Whoosh.wav', 7.02, -17, 0.6),   # whip roll to -180
    (OP + 'whoosh-velocity-383019.mp3', 7.45, -19, 0.55),  # «ويطلع» shoots off / dive
    (S6 + 'thud.mp3', 7.80, -16, 0.5),          # land on the billboard
    (S6 + 'iron_impact.mp3', 8.50, -19, 0.6),   # «صور»
    (S6 + 'iron_impact.mp3', 8.76, -18, 0.6),   # «أقل»
    (S6 + 'marker.mp3', 9.10, -14, 0.45),       # green strike
]
cmd = ['ffmpeg', '-y', '-v', 'error', '-i', '../shared/vo.mp3']
fl = ['[0:a]aresample=48000,aformat=channel_layouts=stereo,volume=1.0[v]']
for i, (f, t, g, L) in enumerate(ev):
    cmd += ['-i', f]
    d = int(t * 1000)
    fl.append(f'[{i+1}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{L},afade=t=out:st={L-0.12}:d=0.12,volume={g+4}dB,adelay={d}|{d}[s{i}]')
fl.append('[v]' + ''.join(f'[s{i}]' for i in range(len(ev))) + f'amix=inputs={len(ev)+1}:normalize=0:duration=first,apad=whole_dur=9.73,atrim=0:9.73,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
cmd += ['-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3']
subprocess.run(cmd, check=True)
print('ok')
