"""Check an audio track for a regular tick (an SFX repeating at a fixed interval over the timeline).
  python engine/tools/tick_check.py <audio-or-video> [label]
Onset envelope = positive change of 10 ms high-passed energy; prints the strongest autocorrelation peak for
lags 0.12-2.0 s (normalised) and the share of onsets that fall on that period. A clean mix shows peak < ~0.25."""
import subprocess, sys
import numpy as np
src = sys.argv[1]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-ac', '1', '-ar', '16000', '-af', 'highpass=f=2000', '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
hop = 160
e = np.sqrt(np.convolve(x * x, np.ones(hop) / hop, 'same')[::hop] + 1e-12)
on = np.maximum(0, np.diff(np.log(e + 1e-4)))
on -= on.mean()
ac = np.correlate(on, on, 'full')[len(on) - 1:]
ac /= ac[0]
lags = np.arange(len(ac)) * hop / 16000
m = (lags >= 0.12) & (lags <= 2.0)
i = np.argmax(ac[m]); peak, lag = ac[m][i], lags[m][i]
print(f'{sys.argv[2] if len(sys.argv) > 2 else src}: strongest periodic peak {peak:.3f} at {lag:.3f} s ({1 / lag:.2f} Hz)')
