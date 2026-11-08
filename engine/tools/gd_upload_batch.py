"""Upload a whole local folder tree into Google Drive (owner's account, through the Flow browser on CDP 9333).
usage: python gd_upload_batch.py <local_dir> <drive_folder_id>
Files in <local_dir> go into <drive_folder_id>; each subfolder needs a Drive folder made first with the Drive MCP
(create_file, contentMimeType application/vnd.google-apps.folder) and passed as  --map sub=ID  (repeatable).
Paths are built here in Python on purpose: bash/sed mangles Windows backslashes."""
import os, sys, subprocess
T = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]; maps = {}
while '--map' in args:
    i = args.index('--map'); k, v = args[i + 1].split('=', 1); maps[k] = v; del args[i:i + 2]
root, fid = os.path.abspath(args[0]), args[1]
jobs = [(fid, [os.path.join(root, n) for n in sorted(os.listdir(root)) if os.path.isfile(os.path.join(root, n))])]
for sub, sid in maps.items():
    d = os.path.join(root, sub); jobs.append((sid, [os.path.join(d, n) for n in sorted(os.listdir(d)) if os.path.isfile(os.path.join(d, n))]))
for i, fl in jobs:
    if not fl: continue
    print('==', i, len(fl), 'files', flush=True)
    r = subprocess.run(['node', os.path.join(T, 'gd_upload.mjs'), i, *fl], capture_output=True, text=True, encoding='utf8', errors='replace')
    print((r.stdout + r.stderr)[-400:], flush=True)
subprocess.run('agent-browser --cdp 9333 --session gd tab close', shell=True, stdin=subprocess.DEVNULL, capture_output=True)
