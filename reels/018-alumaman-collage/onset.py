"""Print duration, onset (first 5 ms window above peak-24 dB) and peak dB of each effect file."""
import subprocess, sys, numpy as np
for f in sys.argv[1:]:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '22050', '-f', 's16le', '-'], capture_output=True).stdout
    a = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    w = 110; e = np.sqrt(np.convolve(a * a, np.ones(w) / w, 'same')) + 1e-9
    db = 20 * np.log10(e); pk = db.max(); on = np.argmax(db > pk - 24) / 22050; pkt = db.argmax() / 22050
    print(f'{len(a)/22050:5.2f}s onset {on:4.2f} peak@{pkt:4.2f} {pk:5.1f}dB  {f.split("/")[-1]}')
