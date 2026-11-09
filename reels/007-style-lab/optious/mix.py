"""SFX mix for the Optious segment: one designed hit per real visual event, voice on top, loudnorm -14 LUFS."""
import subprocess
# (file, time_s, gain_dB, trim_s or None) - times are the visual events in index.html
EV = [
    ("swoosh.mp3", 0.00, -14, None),   # centre row slides in
    ("soft.mp3", 0.05, -12, None),      # thumbnail grows into the card
    ("impact.mp3", 1.48, -15, 0.6),     # «كبيرة» slam, card swells
    ("glitch2.mp3", 1.86, -16, 0.22),   # card breaks into pixel blocks
    ("sharp.mp3", 2.03, -14, 0.4),      # hard cut to white, «حجمه» pops
    ("stretch.mp3", 2.41, -17, 0.4),    # «٣٤» unfolds from a line
    ("fight.mp3", 3.17, -12, None),     # «ميجا» chip slams in
    ("velocity.mp3", 3.40, -15, 0.34),  # zoom-through into the ink
    ("glitch.mp3", 3.70, -18, None),    # phone pulls back, glitch edges
    ("tap.wav", 4.12, -12, None),       # «يفتحه»: tap ring on the phone
    ("swoosh.mp3", 5.25, -15, None),    # «ويستنى» rows rush in
    ("soft.mp3", 6.16, -12, None),      # second «ويستنى»: rows swap, start slowing
    ("whoosh.mp3", 7.12, -10, None),    # giant «ويطلع» sweeps across, street wipes in
    ("bubble.mp3", 7.97, -12, None),    # eyes doodle pops on «تدور»
    ("thud.mp3", 9.20, -14, None),      # «أقل» drops off the baseline
]
ins = ["-i", "assets/vo.mp3"]; fl = []
for i, (f, t, g, tr) in enumerate(EV, 1):
    ins += ["-i", "assets/sfx/" + f]
    trim = f"atrim=0:{tr},afade=t=out:st={tr*0.6:.3f}:d={tr*0.4:.3f}," if tr else ""
    fl.append(f"[{i}:a]{trim}aresample=48000,volume={g}dB,adelay={int(t*1000)}|{int(t*1000)}[s{i}]")
n = len(EV)
fl.append("[0:a]aresample=48000,volume=0dB[v]")
fl.append("".join(f"[s{i}]" for i in range(1, n + 1)) + f"amix=inputs={n}:normalize=0[fx]")
fl.append("[fx]volume=-2dB[fx2];[v][fx2]amix=inputs=2:normalize=0,apad=whole_dur=9.8,atrim=0:9.8,loudnorm=I=-14:TP=-1.5:LRA=11[out]")
subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", ";".join(fl), "-map", "[out]", "-ar", "48000", "-b:a", "192k", "renders/mix.mp3"], check=True)
print("renders/mix.mp3")
