"""SFX on visual events + VO -> audio/mix.mp3 (-14 LUFS). Cues: (time_s, file, gain_dB)."""
import subprocess, os
R = '../../../assets/sfx-library/'; O = R + 'owner-pack-2026-11/'; M = R + 'motionix/'; S6 = '../../006-gallery-continuity/assets/sfx/'
cues = [
 (0.00, O + 'soft-pop-sfx-433612.mp3', -10),              # «معرض» pops
 (0.40, O + 'creatorshome-sharp-pop-328170.mp3', -12),    # «صور» pops
 (0.44, S6 + 'stretch.mp3', -11),                         # the phrase warps into the flag
 (0.66, O + 'swoosh-015-383769.mp3', -14),                # tiles fly into orbit
 (0.67, O + 'marimba-bloop-2-188149.mp3', -14),           # pill «في موقع»
 (1.18, O + 'marimba-bloop-3-188151.mp3', -14),           # pill «شركة»
 (1.51, O + 'multi-pop-2-188167.mp3', -11),               # pill «كبيرة» shoulders the others
 (2.04, O + 'simple-whoosh-02-433006.mp3', -14),          # tiles sucked into the card
 (2.27, M + 'Clicks/mouse-click-198485.wav', -8),         # cursor clicks the card
 (2.44, M + 'Data Collect/Data Collect.wav', -15),        # counter rolls
 (3.20, S6 + 'iron_impact.mp3', -9),                      # «ميجا» slams, card gets heavy
 (3.40, R + 'vint/LFE Whoosh, Low Pitch, Rumble.wav', -10),  # card swells into the dark world
 (3.62, O + 'swoosh-06-351021.mp3', -15),                 # phone tilts in
 (4.20, O + 'App Click 1.wav', -8),                       # «يفتحه» tapped
 (4.33, O + 'soft-ui-pop-light-minimal-click-451232.mp3', -12),  # button morphs to progress bar
 (6.19, O + 'ipad_click-99325.mp3', -12), (6.47, O + 'ipad_click-99325.mp3', -14),  # impatient taps
 (7.15, O + 'creatorshome-plop-333525.mp3', -9),          # «ويطلع» stamped
 (7.40, O + 'quick-double-swish-sfx-230502.mp3', -9),     # world swiped away
 (7.80, O + 'pop-up-notify-smooth-modern-332448.mp3', -10),  # toast drops
 (8.54, O + 'bubble-pops-272427.mp3', -17),               # photos pulse on «صور»
]
inp = ['-i', 'audio/vo.mp3']; fl = []
for k, (t, f, g) in enumerate(cues):
    assert os.path.exists(f), f
    inp += ['-i', f]; ms = int(t * 1000)
    fl.append(f'[{k+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.6,afade=t=out:st=1.2:d=0.4,volume={g}dB,adelay={ms}|{ms}[s{k}]')
fl.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0dB[vo]')
fl.append(''.join(f'[s{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0[sfx]')
fl.append('[sfx]acompressor=threshold=-20dB:ratio=3[sfxc];[vo][sfxc]amix=inputs=2:normalize=0,apad,atrim=0:9.73,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[out]', '-ar', '48000', '-b:a', '192k', 'audio/mix.mp3'], check=True)
print('audio/mix.mp3')
