"""Copy the finished render to the Desktop and mark the reel delivered in reel.json.
  python engine/tools/deliver.py <reel>
Run only after qa.py passes and NOTE.md is written. Then add the reel to memory/REELS_LOG.md."""
import datetime, os, shutil
import sys
from common import load_cfg, reel_dir, save_cfg

rd = reel_dir(sys.argv[1]); cfg = load_cfg(rd)
src = os.path.join(rd, 'renders', cfg['slug'] + '.mp4')
dst = os.path.join(os.path.expanduser('~'), 'Desktop', f"FortuneCode - {cfg['title']}.mp4")
shutil.copy2(src, dst)
cfg['delivered'] = datetime.date.today().isoformat(); cfg['status'] = 'delivered'; save_cfg(rd, cfg)
print(dst)
