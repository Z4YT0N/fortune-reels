"""Sound design mix -> assets/audio/mix.wav (+ mix.mp3). python mix.py [D]   (STEM=1 writes the effects stem only: stem-fx.wav)
cues.json: [[t, file, peak_dB, align], ...] from make_cues.py
  t       = the visual event (s, voice clock)
  file    = name in assets/sfx/ (this reel), or the shared assets/sfx/, or a path under assets/sfx-library/
  peak_dB = the level the effect's peak hits before the duck (dBFS)
  align   = "peak" (the loudest 5 ms lands on t; impacts) or "start" (the onset lands on t; beds, pours); "!" = hero hit, skips the duck
BED: ambience that tells the story (018: the storm full and harsh until the slam, then low-passed and quiet "inside", fading at night).
  (name, start, end, gain_dB, lowpass_Hz or None, fade_in_s, fade_out_s)
The effects bus ducks under the voice (sidechain), then the whole mix goes to -14 LUFS, TP -1.5."""
import json, os, subprocess, sys
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..')
VO = os.path.join(HERE, 'assets', 'audio', 'vo.mp3')
D = float(sys.argv[1]) if len(sys.argv) > 1 else float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(HERE, 'assets', 'video', 'bg.mp4')], capture_output=True, text=True).stdout) - 0.02
BED = [
    # ('storm_a', 0.0, 4.66, 0, None, 0.0, 0.06),        # outside: full and harsh, cut on the slam
    # ('storm_b', 4.66, 27.2, -11, 420, 0.04, 2.6),      # inside: muffled through double glass
]


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
inp = ['-i', VO]; flt = []; labels = ''; hero = ''
for k, (name, st, en, g, lp, fi, fo) in enumerate(BED):
    i = len(inp) // 2; inp += ['-i', find(name)]
    lpf = f'lowpass=f={lp},lowpass=f={lp},' if lp else ''
    flt.append(f'[{i}:a]atrim=0:{en - st:.2f},asetpts=N/SR/TB,aformat=channel_layouts=stereo,{lpf}volume={g}dB,afade=t=in:st=0:d={max(fi, 0.01)},'
               f'afade=t=out:st={max(0, en - st - fo):.2f}:d={max(fo, 0.01)},adelay={int(st * 1000)}|{int(st * 1000)}[b{k}]')
    labels += f'[b{k}]'
for k, (t, name, pk_db, align) in enumerate(cues):
    f = find(name); pk, on, pkt = stats(f)
    nod = align.endswith('!'); align = align.rstrip('!')
    start = t - (pkt if align == 'peak' else on)
    trim = -start if start < 0 else 0; start = max(0, start)
    ms = int(round(start * 1000)); i = len(inp) // 2
    inp += ['-i', f]
    flt.append(f'[{i}:a]atrim=start={trim:.3f},asetpts=N/SR/TB,aformat=channel_layouts=stereo,volume={pk_db - pk:.2f}dB,adelay={ms}|{ms}[c{k}]')
    if nod:
        hero += f'[c{k}]'
    else:
        labels += f'[c{k}]'
flt.append('[0:a]aformat=channel_layouts=stereo,apad=whole_dur=%.2f,asplit=2[vo][key]' % D)
if labels:
    flt += [f'{labels}amix=inputs={labels.count("[")}:duration=longest:normalize=0,apad=whole_dur={D:.2f},atrim=0:{D:.2f}[fx]',
            '[fx][key]sidechaincompress=threshold=0.04:ratio=3.5:attack=8:release=280:makeup=1[fxd0]']
else:
    flt.append(f'anullsrc=r=44100:cl=stereo,atrim=0:{D:.2f}[fxd0];[key]anullsink')
flt.append(f'[fxd0]{hero}amix=inputs={hero.count("[") + 1}:duration=first:normalize=0[fxd]' if hero else '[fxd0]anull[fxd]')
stem = os.environ.get('STEM')
flt.append('[vo]anullsink;[fxd]anull[out]' if stem else '[vo][fxd]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]')
out = os.path.join(HERE, 'assets', 'audio', 'stem-fx.wav' if stem else 'mix.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(flt), '-map', '[out]', '-ar', '48000', out], check=True)
if not stem:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', out, '-b:a', '256k', out.replace('.wav', '.mp3')], check=True)
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', out, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
print(len(cues), 'cues,', len(BED), 'beds;', ' '.join(l.strip() for l in r.splitlines()[-12:] if l.strip().startswith(('I:', 'Peak:', 'LRA:'))))
