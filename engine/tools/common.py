"""Shared paths and helpers for the reel tools. Every tool takes the reel as its first argument:
a folder name under reels/ (or a unique prefix of one, e.g. "003"), or a path."""
import json, os, shutil, subprocess, sys

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ENGINE = os.path.join(ROOT, 'engine')
ASSETS = os.path.join(ROOT, 'assets')
REELS = os.path.join(ROOT, 'reels')
HF = 'hyperframes@0.8.152'  # pinned: upgrade deliberately (see rules/tech.md)
ENV_FILES = [os.path.join(ROOT, '.env'), r'E:\Library\01-Workspace\Fortune\fortune-next\.env.local']


def die(msg):
    print('ERROR:', msg); sys.exit(1)


def reel_dir(arg):
    if os.path.isdir(arg):
        return os.path.abspath(arg)
    hits = [d for d in sorted(os.listdir(REELS)) if d.startswith(arg) or arg in d] if os.path.isdir(REELS) else []
    if len(hits) != 1:
        die(f'reel "{arg}" matches {hits or "nothing"} under {REELS}')
    return os.path.join(REELS, hits[0])


def load_cfg(rd):
    return json.load(open(os.path.join(rd, 'reel.json'), encoding='utf-8'))


def save_cfg(rd, cfg):
    json.dump(cfg, open(os.path.join(rd, 'reel.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)


def secret(name):
    """Read a key from the environment, then fortune-reels/.env, then fortune-next/.env.local. Never print it."""
    if os.environ.get(name):
        return os.environ[name]
    for f in ENV_FILES:
        if os.path.exists(f):
            for line in open(f, encoding='utf-8'):
                if line.startswith(name + '='):
                    return line.split('=', 1)[1].strip().strip('"')
    die(f'{name} not found in env, .env or fortune-next/.env.local')


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, **kw)


def ffprobe_duration(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout
    return float(out.strip())


def link_or_copy(src, dst):
    """Hard-link big shared files into a reel (no extra disk on the same drive); copy if linking fails."""
    if os.path.exists(dst):
        return
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    try:
        os.link(src, dst)
    except OSError:
        shutil.copy2(src, dst)
