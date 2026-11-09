"""Write keys/jobs-<stage>.json for fd.mjs. python keys/make_jobs.py <stage> [refK=mediaId ...]
Style = reel 006 bible with the ink swapped to Alum Aman teal. Refs B + C (Flow media) for the medium and the man."""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
B, C = 'df6199eb-27d8-45df-9e7e-e6e49172640d', '68fd185e-69c9-46db-9c78-a5b15756d963'
BIBLE = open(os.path.join(HERE, 'bible-teal.txt'), encoding='utf-8').read().strip()
SCENE = ("One continuous world: the inside of a villa majlis room in Al-Ahsa, Saudi Arabia, a plain plastered wall with ONE tall window opening, "
         "seen frontally from inside the room; outside the window, palm trees and a desert dust storm.")
K = {
 'K0': "KEYFRAME 0 (the problem): the window opening holds a tired old yellowed aluminium sliding window with bent frames and visible gaps at the edges; "
       "a dust storm is blowing THROUGH the gaps into the room, the blowing dust printed as coarse halftone dots in teal riso ink (the one teal object). "
       "The same Saudi man from the second reference (same face, moustache, white thobe, red-and-white shemagh) stands on the right of the window, "
       "covering his nose and mouth with the end of his shemagh, eyes squinting. Window in the left-centre, lower two thirds of the frame.",
 'K1': "KEYFRAME 1 (the measure): same wall, same frontal framing, a little closer. The old window has been torn out like paper: torn paper edges around "
       "an EMPTY opening, the storm and palms visible through it. A hand-drawn teal marker dashed selection box with four square corner handles fits the "
       "opening exactly, a teal marker dimension line with arrow ends runs across the top edge of the opening, and a black mouse cursor sits on the "
       "lower-right handle. No man in this frame. A few teal halftone dust dots still drift in.",
 'K2': "KEYFRAME 2 (the slam): same wall, same framing as keyframe 1. A brand-new slim black aluminium window (very thin modern profiles, two large "
       "double-glazed sliding panes) has just slammed into the opening: teal marker impact lines and speed strokes burst outward from its four corners, "
       "a puff of grey halftone dust is pushed out at the edges, the wall paper slightly cracked around it. The new frame is black and grey; its rubber "
       "seal outline is traced in teal ink. Through the clean glass the storm is outside.",
 'K3': "KEYFRAME 3 (the seal, macro): extreme close-up on the lower corner of the same slim black aluminium window: the edge of the double glass shows two "
       "panes with the spacer between them, a neat silicone bead, a black rubber gasket in the profile. Outside the glass, teal halftone dust grains hit "
       "the pane and bounce off. A hand-drawn teal marker circle around the corner seal and a small teal arrow pointing at the gasket. Black mouse cursor.",
 'K4': "KEYFRAME 4 (the calm): pull back to the room: the same new slim black window, closed, the dust storm raging OUTSIDE the glass (palms bending, "
       "halftone), the room clean. The same slim black two-pane window as in keyframe 2, same wall. The same Saudi man sits relaxed on a floor cushion beside the window, leaning back, holding "
       "a small Arabic coffee cup, calm half-smile. A hand-drawn teal marker doodle of a screwdriver next to the window's hinge and handle. "
       "Window on the left, man lower right, top quarter empty paper.",
 'K5': "KEYFRAME 5 (night, end): the same window and wall at night: the paper is printed almost entirely in deep charcoal ink #1d1d1d, the slim window "
       "frame is a thin teal ink outline glowing softly, the storm is gone, a calm palm silhouette outside. Large calm dark area in the upper two thirds "
       "for an end card. Grain and halftone still visible.",
}
TAIL = ("Use the two attached reference images ONLY for the medium (halftone cut-out collage on paper, grain, tape, hand marker marks). "
        "Recolour every accent: NO green anywhere, the only accent ink is teal #0199a2. Paper is cool neutral light grey #F0F1F2, NOT beige, NOT warm. "
        "Generate exactly 1 vertical 9:16 image, Nano Banana, no questions.")


def job(name, k, att, n):
    note = (' The attached images after the first two are EARLIER KEYFRAMES of this same film: keep exactly the same slim black two-pane window, '
            'the same wall, paper, camera height and the same man, so the film is continuous.') if len(att) > 2 else ''
    return {'name': f'{k}{"abc"[n]}', 'prompt': f'{BIBLE}\nVertical 9:16. {SCENE} {K[k]} {TAIL}{note}', 'att': att,
            'out': os.path.join(HERE, 'gen', k).replace('\\', '/')}


stage = sys.argv[1]; extra = dict(a.split('=') for a in sys.argv[2:])
keys = stage.split(',')
jobs = []
for k in keys:
    att = [B, C] + [extra[r] for r in extra]  # chosen earlier keyframes as continuity refs
    for n in range(int(os.environ.get('NC', 2))):
        jobs.append(job(stage, k, att, n))
json.dump(jobs, open(os.path.join(HERE, f'jobs-{stage.replace(",", "")}{len(extra)}.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(jobs), 'jobs')
