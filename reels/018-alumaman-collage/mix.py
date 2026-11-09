"""Sound design mix -> assets/audio/mix.wav (+ mix.mp3).
cues.json: [[t, file, peak_dB, align], ...]
  t      = the visual event (s, voice clock)
  file   = name in assets/sfx/ (this reel), or a path under assets/sfx-library/ or the shared assets/sfx/
  peak_dB = the level the effect's peak hits before the duck (dBFS)
  align  = "peak" (the file's loudest 5 ms lands on t; impacts) or "start" (the onset lands on t; beds, pours)
Storm bed: full and harsh until SLAM (the window goes in), then low-passed and quiet (we are inside), fading at NIGHT.
The effects bus ducks under the voice (sidechain), then the whole mix goes to -14 LUFS, TP -1.5."""
import json, os, subprocess, sys
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
D = float(sys.argv[1]) if len(sys.argv) > 1 else 30.4
from warp import warp
SLAM, NIGHT0, NIGHT1 = 4.66, warp(24.6), warp(27.2)  # v2: night times on the new voice clock


def find(name):
    for p in (os.path.join(HERE, 'assets', 'sfx', name + '.mp3'), os.path.join(ROOT, 'assets', 'sfx', name + '.mp3'), os.path.join(ROOT, 'assets', 'sfx-library', name)):
        if os.path.exists(p):
            return p
    sys.exit('missing effect ' + name)


def stats(f):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '22050', '-f', 's16le', '-'], capture_output=True).stdout
    a = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    e = np.sqrt(np.convolve(a * a, np.ones(110) / 110, 'same')) + 1e-9; db = 20 * np.log10(e)
    pk = db.max(); return pk, np.argmax(db > pk - 24) / 22050, db.argmax() / 22050


cues = json.load(open(os.path.join(HERE, 'cues.json'), encoding='utf-8'))
inp = ['-i', os.path.join(HERE, 'assets', 'audio', 'vo.mp3'), '-i', find('storm_a'), '-i', find('storm_b'), '-i', find('wind_settle')]
flt = [
    # storm bed: a then b, crossfaded, trimmed to D
    '[1:a][2:a]acrossfade=d=1.5,atrim=0:%.2f,asetpts=N/SR/TB,aformat=channel_layouts=stereo,asplit=2[bf][bm]' % D,
    # outside: full and harsh, cut on the slam
    '[bf]highpass=f=60,volume=0dB,afade=t=out:st=%.2f:d=0.06[full]' % SLAM,
    # inside: muffled through double glass, quiet, gone by night
    '[bm]lowpass=f=420,lowpass=f=420,volume=-11dB,afade=t=in:st=%.2f:d=0.04,afade=t=out:st=%.2f:d=%.2f[muff]' % (SLAM, NIGHT0, NIGHT1 - NIGHT0),
    '[3:a]lowpass=f=900,volume=-8dB,adelay=%d|%d,aformat=channel_layouts=stereo[settle]' % (NIGHT0 * 1000, NIGHT0 * 1000),
]
labels = '[full][muff][settle]'; hero = ''
for k, (t, name, pk_db, align) in enumerate(cues):
    f = find(name); pk, on, pkt = stats(f)
    nod = align.endswith('!'); align = align.rstrip('!')
    start = t - (pkt if align == 'peak' else on)
    if start < 0:
        trim = -start; start = 0
    else:
        trim = 0
    ms = int(round(start * 1000)); i = len(inp) // 2
    inp += ['-i', f]
    flt.append(f'[{i}:a]atrim=start={trim:.3f},asetpts=N/SR/TB,aformat=channel_layouts=stereo,volume={pk_db - pk:.2f}dB,adelay={ms}|{ms}[c{k}]')
    if nod:
        hero += f'[c{k}]'
    else:
        labels += f'[c{k}]'
n = labels.count('[')
flt += [
    f'{labels}amix=inputs={n}:duration=longest:normalize=0,atrim=0:{D:.2f}[fx]',
    '[0:a]aformat=channel_layouts=stereo,apad=whole_dur=%.2f,asplit=2[vo][key]' % D,
    '[fx][key]sidechaincompress=threshold=0.04:ratio=3.5:attack=8:release=280:makeup=1[fxd0]',
    (f'[fxd0]{hero}amix=inputs={hero.count("[") + 1}:duration=first:normalize=0[fxd]' if hero else '[fxd0]anull[fxd]'),
    '[vo][fxd]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]' if not os.environ.get('STEM') else '[vo]anullsink;[fxd]anull[out]',
]
out = os.path.join(HERE, 'assets', 'audio', 'mix.wav' if not os.environ.get('STEM') else 'stem-fx.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(flt), '-map', '[out]', '-ar', '48000', out], check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', out, '-b:a', '256k', out.replace('.wav', '.mp3')], check=True) if not os.environ.get('STEM') else None
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', out, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
print(len(cues), 'cues;', ' '.join(l.strip() for l in r.splitlines()[-12:] if l.strip().startswith(('I:', 'Peak:', 'LRA:'))))
