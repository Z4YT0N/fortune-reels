"""Keyframes K0..K6 via Flow (Nano Banana Pro) through the shared lock. K1 is the master set; the others use K1 as reference.
usage: python flow/kf.py [K1 K0 ...]   -> flow/K*.png + flow/ids.json"""
import json, os, re, subprocess, sys, glob, shutil
R = 'E:/Library/01-Workspace/Fortune/fortune-reels'
H = R + '/reels/014-nov14-roar'
P0 = '12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36'
IDS = H + '/flow/ids.json'
ids = json.load(open(IDS)) if os.path.exists(IDS) else {}

def plate(k):
    t = open(f'{H}/assets/cut/gen/{k}.log', encoding='utf-8', errors='ignore').read()
    m = re.search(r'mediaIds[^\[]*\[\s*\\?"?\\n?\s*\\"([0-9a-f-]{36})', t) or re.search(r'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', t)
    return m.group(1)

LOOK = ('Real editorial photograph, vertical 9:16, full-frame camera, 35mm lens at f/5.6, Kodak Portra 400 film look, fine film grain, '
        'natural skin and fabric texture, matte muted colours, soft contrast, real concrete texture. No HDR, no glossy plastic look, no CGI look, '
        'no teal-orange grade. Absolutely no text, no letters, no numbers, no logos, no watermark anywhere, including on the laptop screen.')
SET = ('A seamless studio set made of light grey textured paper (#F0F1F2) with visible paper grain and a few soft creases, the same paper on the wall and the floor. '
       'Right of centre: a tall square pedestal column of raw grey cast concrete; on its flat top an open silver laptop faces the camera; '
       'the laptop screen is plain light grey with ONE rounded bright green (#00DB33) button shape in its centre (no text on it). '
       'Left of the pedestal: the SAME Saudi businessman as in the reference images (white thobe, red-and-white shemagh, black agal, trimmed black beard), full body, feet on the paper floor. '
       'The upper third of the frame is empty paper. Soft contact shadows on the paper.')
K = {
 'K1': (['man-proud', 'pedestal', 'laptop'], SET + ' The studio lights are fully on, soft key light from the upper left. The man stands tall and proud with arms crossed, a confident satisfied smile, next to the pedestal.'),
 'K0': (['K1', 'prop-magnifier'], 'The SAME scene, set, camera and framing as the first reference image, but the studio lights are OFF: the whole room is near-black (#121416). '
        'A large vintage magnifying glass with a brass ring and wooden handle floats in front of the laptop, and through its lens a bright warm circular flashlight beam lights the laptop and the top of the pedestal. '
        'Inside the beam, three or four small torn off-white paper notes are visible taped to the laptop and the pedestal. Outside the beam everything is dark; the man is only a faint silhouette.'),
 'K2': (['K1', 'lock-closed', 'man-worry'], 'The SAME scene, set, camera and framing as the first reference image, lights on. A giant heavy old dark steel padlock, closed, now sits on top of the open laptop keyboard in front of the screen, '
        'as big as the laptop itself, covering the green button. The man has stepped back half a step, one hand on his chin, worried, looking at the padlock.'),
 'K3': (['K1', 'lock-closed', 'prop-magnifier'], 'The SAME scene, set, camera and framing as the first reference image, but the lights are dimmed: the room is dark (#121416). '
        'The large vintage magnifying glass hovers beside the pedestal and its bright circular beam reveals about a dozen small torn off-white paper notes taped all over the concrete pedestal and the laptop, each with a strip of plain paper tape. '
        'A giant heavy old dark steel padlock, closed, sits on the laptop keyboard in front of the screen. The man is a dim silhouette. The upper third of the frame is dark and empty.'),
 'K4': (['K3'], 'The SAME dark scene as the reference image, the camera pushed in closer on the laptop with the padlock and the top half of the concrete pedestal, '
        'the magnifier beam wider and softer, the many small paper notes taped on the pedestal clearly visible. The upper third of the frame is dark and empty.'),
 'K5': (['K1', 'lock-closed', 'man-proud'], 'The SAME scene, set, camera and framing as the reference image, studio lights fully on. About a dozen small torn off-white paper notes are taped all over the concrete pedestal and the laptop, '
        'and every one of them is fixed with a strip of bright green (#00DB33) tape across it. A giant heavy old dark steel padlock, closed, still sits on the laptop keyboard in front of the screen. The man stands beside the pedestal with a relieved smile.'),
 'K6': (['K1', 'lock-open', 'man-cheer'], 'The SAME scene, set, camera and framing as the first reference image, lights on. The padlock now lies OPEN on the paper floor at the foot of the pedestal, its shackle popped up. '
        'The paper notes are gone. The laptop screen glows bright green (#00DB33) with a soft green light spill on the paper. The man raises his right fist in celebration with a big genuine smile.'),
}

def gen(name, count=1, norefs=False):
    refs, s = K[name]
    if norefs: refs = []
    rid = [ids[r] if r in ids else plate(r) for r in refs if r != 'prop-magnifier'] + ([ids['mag']] if 'prop-magnifier' in refs and 'mag' in ids else [])
    d = f'{H}/flow/{name}'; os.makedirs(d, exist_ok=True)
    arg = json.dumps({'project_id': P0, 'kind': 'image', 'prompt': s + ' ' + LOOK, 'aspect': '9:16', 'count': count, 'download_dir': d, **({'reference_image_ids': rid} if rid else {})})
    out = subprocess.run(['bash', R + '/vendor/flow-locked.sh', 'flow_agent_generate', arg], capture_output=True, text=True, encoding='utf-8', errors='ignore').stdout
    open(f'{d}.log', 'w', encoding='utf-8').write(out)
    m = re.findall(r'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', out)
    f = glob.glob(d + '/*.png')
    if not m or not f: print(name, 'FAILED', out[:300].replace(chr(10), ' ')); return False
    files = sorted(f, key=os.path.getmtime)
    for j, ff in enumerate(files): shutil.copy(ff, f'{H}/flow/{name}{"abcd"[j]}.png')
    mids = [x for x in dict.fromkeys(m) if x not in rid]
    cur = json.load(open(IDS)); cur[name + '_all'] = mids; cur[name] = mids[0]; ids.update(cur); shutil.copy(files[0], f'{H}/flow/{name}.png'); json.dump(cur, open(IDS, 'w'), indent=1)
    print(name, mids, [os.path.basename(x) for x in files])
    return True

if __name__ == '__main__':
    for n in sys.argv[1:] or ['K1', 'K0', 'K2', 'K3', 'K4', 'K5', 'K6']:
        if n == 'mag':
            out = subprocess.run(['bash', R + '/vendor/flow-locked.sh', 'flow_upload_images', json.dumps({'project_id': P0, 'paths': [H + '/assets/cut/prop-magnifier-plate.png']})], capture_output=True, text=True, encoding='utf-8', errors='ignore').stdout
            print(out[:600]); m = re.findall(r'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', out)
            if m: ids['mag'] = m[0]; json.dump(ids, open(IDS, 'w'), indent=1)
        else:
            nm, _, c = n.partition(':'); c = int(c or 1)
            if not gen(nm, c) and nm == 'K1': gen(nm, c, norefs=True)
