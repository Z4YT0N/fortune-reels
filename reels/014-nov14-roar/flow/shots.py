"""Chained Flow Omni shots S1..S6 (Ki first frame, Ki+1 last frame) through the shared lock.
usage: python flow/shots.py S1 [S2 ...]   -> flow/S*.mp4 (log in flow/S*.log)"""
import json, os, re, subprocess, sys, glob, shutil
R = 'E:/Library/01-Workspace/Fortune/fortune-reels'
H = R + '/reels/014-nov14-roar'
P0 = '12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36'
ids = json.load(open(H + '/flow/ids.json'))
KEEP = ('One continuous camera move, no cut, no scene change. Keep the exact look of the frames: real photograph, light grey paper studio set, '
        'the same Saudi man, the same concrete pedestal and silver laptop, Kodak Portra film grain, matte colours. Realistic physics and weight. '
        'No text, no letters, no logos appear at any time.')
S = {
 'S1': ('K0', 'K1', 5, 'Frames-to-video: the first image is the FIRST frame, the second image is the LAST frame. In the dark, the magnifying glass glides slowly across the laptop and the pedestal and its bright circular beam sweeps over small paper notes; then the magnifier slides out of frame to the right and the studio lights switch on, revealing the man standing proudly with arms crossed beside the pedestal; the paper notes are no longer visible in the light. Slow push-in.'),
 'S2': ('K1', 'K2', 4, 'Frames-to-video: the first image is the FIRST frame, the second image is the LAST frame. A giant heavy steel padlock falls from above the frame and slams down onto the laptop with a small bounce; the man flinches, steps back half a step and puts his hand on his chin, worried. Slight camera shake on impact, then steady.'),
 'S3': ('K2u', 'K3u', 5, 'Frames-to-video: the first image is the FIRST frame, the second image is the LAST frame. The studio lights dim to darkness; the magnifying glass enters from the right and its bright circular beam sweeps down the concrete pedestal, revealing small paper notes taped all over it, one after another. Slow camera drift.'),
 'S4': ('K3', 'K4', 5, 'Frames-to-video: the first image is the FIRST frame, the second image is the LAST frame. In the dark, the magnifying glass slowly glides from the upper right down to the left side of the pedestal, its bright beam sliding down over the paper notes taped on the concrete, with a gentle slow camera push-in.'),
 'S5': ('K4', 'K5', 4, 'Frames-to-video: the first image is the FIRST frame, the second image is the LAST frame. The magnifying glass slides out of frame and the studio lights switch back on; strips of bright green tape are pressed onto the paper notes one after another; the man stands beside the pedestal with arms crossed and smiles with relief.'),
 'S6': ('K5', 'K6', 5, 'Frames-to-video: the first image is the FIRST frame, the second image is the LAST frame. The padlock shackle springs open with a jolt and the padlock tumbles off the laptop onto the paper floor; the green tape notes fall away; the laptop screen lights up bright green; the man raises his fist in celebration with a big smile.'),
}

def shot(name, maxc=16):
    a, b, dur, p = S[name]
    d = f'{H}/flow/{name}'; os.makedirs(d, exist_ok=True)
    arg = json.dumps({'project_id': P0, 'kind': 'video', 'prompt': p + ' ' + KEEP, 'aspect': '9:16', 'start_image_id': ids[a], 'end_image_id': ids[b],
                      'duration_sec': dur, 'resolution': '720p', 'max_credits': maxc, 'wait': False})
    out = subprocess.run(['bash', R + '/vendor/flow-locked.sh', 'flow_agent_generate', arg], capture_output=True, text=True, encoding='utf-8', errors='ignore').stdout
    open(f'{d}.log', 'w', encoding='utf-8').write(out)
    m = [x for x in dict.fromkeys(re.findall(r'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', out)) if x not in (ids[a], ids[b], P0)]
    jobs = json.load(open(H + '/flow/jobs.json')) if os.path.exists(H + '/flow/jobs.json') else {}
    if m: jobs[name] = m; json.dump(jobs, open(H + '/flow/jobs.json', 'w'), indent=1); print(name, 'SUBMITTED', m)
    else: print(name, 'SUBMIT FAILED', out[:600].replace('\n', ' '))

def call(tool, arg):
    return subprocess.run(['bash', H + '/flow/fl.sh', tool, json.dumps(arg)], capture_output=True, text=True, encoding='utf-8', errors='ignore').stdout

def fetch():
    jobs = json.load(open(H + '/flow/jobs.json')); left = 0
    for name, m in jobs.items():
        if os.path.exists(f'{H}/flow/{name}.mp4'): continue
        st = call('flow_video_status', {'media_ids': m})
        open(f'{H}/flow/{name}.status', 'w', encoding='utf-8').write(st)
        if 'videoUrl' not in st and 'SUCCE' not in st.upper(): print(name, 'pending', st[-160:].replace('\n', ' ')); left += 1; continue
        out = call('flow_download_media', {'media_id': m[0], 'out_dir': f'{H}/flow/{name}'})
        f = glob.glob(f'{H}/flow/{name}/*.mp4')
        if f: shutil.copy(f[0], f'{H}/flow/{name}.mp4'); print(name, 'DOWNLOADED')
        else: print(name, 'download failed', out[:300].replace('\n', ' ')); left += 1
    return left

if __name__ == '__main__':
    if sys.argv[1:] == ['fetch']: print('left', fetch())
    else:
        for n in sys.argv[1:]: shot(n)
