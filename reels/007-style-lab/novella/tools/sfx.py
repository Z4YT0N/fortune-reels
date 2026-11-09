"""Synth a few foley hits the libraries lack (porcelain tok, keys jingle, felt shush, wood click). 48 kHz mono wav."""
import numpy as np, wave
SR = 48000
rng = np.random.default_rng(7)
def save(name, x):
    x = x / (np.abs(x).max() + 1e-9) * 0.9
    with wave.open(f'audio/{name}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes())
def t(d): return np.arange(int(SR * d)) / SR
def lp(x, a):  # one-pole lowpass
    y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x): s += a * (v - s); y[i] = s
    return y
# porcelain tok: a few inharmonic partials, fast decay + click
T = t(0.35); tok = sum(a * np.sin(2 * np.pi * f * T) * np.exp(-T * k) for f, a, k in [(2310, 1, 38), (3890, .6, 55), (5620, .35, 70), (1180, .5, 30)])
tok[:200] += rng.normal(0, .8, 200) * np.linspace(1, 0, 200); save('tok', tok)
# soft felt tok (cup set on felt): low thump + muted partial
T = t(0.25); felt = np.sin(2 * np.pi * 160 * T) * np.exp(-T * 30) + .25 * np.sin(2 * np.pi * 2310 * T) * np.exp(-T * 70)
felt[:300] += lp(rng.normal(0, 1, 300), .2); save('felt', felt)
# keys jingle: many short metal pings over 0.45 s
T = t(0.6); keys = np.zeros_like(T)
for _ in range(14):
    st = int(rng.uniform(0, .38) * SR); f = rng.uniform(3500, 9000); n = len(T) - st; tt = np.arange(n) / SR
    keys[st:] += rng.uniform(.3, 1) * np.sin(2 * np.pi * f * tt) * np.exp(-tt * rng.uniform(25, 60))
    keys[st:st + 60] += rng.normal(0, .5, min(60, n))
save('keys', keys)
# felt shush (object pushed on felt): band-limited noise swell
T = t(0.45); n = rng.normal(0, 1, len(T)); n = lp(n, .25) - lp(n, .03)
env = np.minimum(T / .05, 1) * np.exp(-np.maximum(T - .2, 0) * 14); save('shush', n * env)
# wood click (letter-board letter pressed in)
T = t(0.12); wc = np.sin(2 * np.pi * 900 * T) * np.exp(-T * 90) + .5 * np.sin(2 * np.pi * 1800 * T) * np.exp(-T * 120)
wc[:80] += rng.normal(0, .6, 80); save('wood', wc)
# low soft end hit
T = t(1.2); lo = np.sin(2 * np.pi * 55 * T) * np.exp(-T * 3.5) + .3 * np.sin(2 * np.pi * 110 * T) * np.exp(-T * 5); save('low', lo)
print('ok')
