"""Brand lint for a reel: python engine/tools/brand_lint.py <reel_dir> [--brand <id>] [--captions FILE ...]
Checks the spoken script (script.txt), the captions and the text the page shows (string literals and text nodes of reel.tpl / index.html,
comments excluded) against the brand file:
  FAIL  a banned word (brand.banned_words, e.g. «شباك» -> «نافذة»), matched inside words after light normalisation (prefixes like ال/و/ب);
  FAIL  a number written in digits (Western or Arabic-Indic) that is not in brand.allowed_facts or brand.contact;
  FAIL  a required phrase (brand.required_phrases) missing from the script;
  WARN  a spoken number word (عشر، خمس، سنتين…): ear-check it and confirm it matches a fact.
Brand: <reel>/brand.json, else --brand, else a brand id found in the folder name. Captions: caption*.txt, captions.json, wa-cap.txt
(internal WhatsApp notes to the owner such as cap.txt are not captions). Exit code 1 on any FAIL."""
import argparse, glob, json, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

TASHKEEL = re.compile(r'[ؐ-ًؚ-ٰٟۖ-ۭـ]')
AR = re.compile(r'[ء-ي]')
AR_DIGITS = str.maketrans('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹٫٬', '01234567890123456789.,')
NUM = re.compile(r'\d+(?:[.,]\d+)?')
# spoken number words (Gulf / MSA spellings, after normalisation) -> value
SPOKEN = {'واحد': 1, 'اثنين': 2, 'اثنان': 2, 'ثنين': 2, 'سنتين': 2, 'سنتان': 2, 'ثلاث': 3, 'ثلاثه': 3, 'تلات': 3, 'اربع': 4, 'اربعه': 4, 'خمس': 5, 'خمسه': 5,
          'ست': 6, 'سته': 6, 'سبع': 7, 'سبعه': 7, 'ثمان': 8, 'ثمانيه': 8, 'تسع': 9, 'تسعه': 9, 'عشر': 10, 'عشره': 10, 'عشرين': 20, 'ثلاثين': 30,
          'اربعين': 40, 'خمسين': 50, 'ستين': 60, 'سبعين': 70, 'ثمانين': 80, 'تسعين': 90, 'ميه': 100, 'ميت': 100, 'مئه': 100, 'الف': 1000, 'مليون': 10 ** 6,
          'اربعتعش': 14, 'اربعطعش': 14, 'خمستعش': 15}
PREFIX = ('وال', 'بال', 'فال', 'كال', 'لل', 'ال', 'و', 'ب', 'ف', 'ل')


def norm(s):
    s = TASHKEEL.sub('', s)
    return re.sub('[أإآٱ]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه')


def bare(w):
    w = norm(w).strip('.,،؛:؟?!«»"\'()[]{}<>-_#')
    for p in PREFIX:
        if w.startswith(p) and len(w) - len(p) >= 2 and w[len(p):] in SPOKEN:
            return w[len(p):]
    return w


def strip_tags(s):
    return re.sub(r'<[^>]+>', ' ', s).replace('&nbsp;', ' ')


def page_texts(src):
    """Text the page can show: JS string literals + HTML text nodes. HTML, CSS and JS comments are dropped."""
    src = re.sub(r'<!--.*?-->', ' ', src, flags=re.S)
    out = []
    for m in re.finditer(r'<script[^>]*>(.*?)</script>', src, flags=re.S):
        js, i, n = m.group(1), 0, len(m.group(1))
        while i < n:
            c = js[i]
            if js.startswith('//', i):
                i = js.find('\n', i); i = n if i < 0 else i
            elif js.startswith('/*', i):
                j = js.find('*/', i + 2)
                # keep build tokens like /*WORDS*/[] out of the way, drop real comments
                i = n if j < 0 else j + 2
            elif c in '"\'`':
                j, buf = i + 1, []
                while j < n and js[j] != c:
                    if js[j] == '\\':
                        buf.append(js[j:j + 2]); j += 2; continue
                    buf.append(js[j]); j += 1
                out.append(''.join(buf)); i = j + 1
            else:
                i += 1
    html = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', src, flags=re.S)
    out += [t for t in re.split(r'<[^>]+>', html) if t.strip()]
    return [strip_tags(t) for t in out if AR.search(t) or re.search('[٠-٩]', t)]


def numbers(text):
    return [x.replace(',', '.') for x in NUM.findall(text.translate(AR_DIGITS))]


def as_num(x):
    try:
        return float(x)
    except ValueError:
        return None


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('reel'); ap.add_argument('--brand'); ap.add_argument('--captions', nargs='*')
    a = ap.parse_args()
    rd = os.path.abspath(a.reel if os.path.isdir(a.reel) else os.path.join(ROOT, 'reels', a.reel))
    if not os.path.isdir(rd):
        sys.exit(f'no reel folder {a.reel}')
    if os.path.exists(os.path.join(rd, 'brand.json')) and not a.brand:
        bsrc = os.path.join(rd, 'brand.json')
    else:
        bid = a.brand or next((os.path.basename(f)[:-5] for f in glob.glob(os.path.join(ROOT, 'brands', '*.json')) if os.path.basename(f)[:-5] in os.path.basename(rd)), None)
        if not bid:
            sys.exit('no brand.json in the reel, no --brand, and no brand id in the folder name')
        bsrc = os.path.join(ROOT, 'brands', bid + '.json')
    B = json.load(open(bsrc, encoding='utf-8'))
    allowed = {as_num(x) for f in B['allowed_facts'] + B['contact'] for x in numbers(f)}
    banned = {norm(k): (k, v) for k, v in B['banned_words'].items()}

    src = {}
    p = os.path.join(rd, 'script.txt')
    if os.path.exists(p):
        src['script.txt'] = ('spoken', [open(p, encoding='utf-8').read()])
    caps = a.captions if a.captions is not None else sorted({os.path.basename(f) for pat in ('caption*.txt', 'captions.json', 'wa-cap.txt') for f in glob.glob(os.path.join(rd, pat))})
    for c in caps:
        f = c if os.path.isabs(c) else os.path.join(rd, c)
        if os.path.exists(f):
            src[os.path.basename(f)] = ('caption', [open(f, encoding='utf-8').read()])
    for f in ('reel.tpl', 'index.html'):
        p = os.path.join(rd, f)
        if os.path.exists(p):
            src[f] = ('screen', page_texts(open(p, encoding='utf-8').read()))

    fails, warns = [], []
    for name, (kind, texts) in src.items():
        for t in texts:
            nt = norm(t)
            for k, (orig, rep) in banned.items():
                hit = re.search(re.escape(k), nt, flags=re.I) if not AR.search(k) else None
                words = [w for w in re.split(r'\s+', nt) if k in w] if AR.search(k) else ([hit.group(0)] if hit else [])
                for w in words:
                    fails.append(f'{name}: banned «{orig}» in «{w.strip(".,،؛:؟?!«»")}»' + (f' -> use «{rep}»' if rep else ' -> remove it'))
            for x in numbers(t):
                if as_num(x) not in allowed:
                    ctx = re.sub(r'\s+', ' ', t.translate(AR_DIGITS)); i = max(0, ctx.find(x) - 25)
                    fails.append(f'{name}: number {x} is not in allowed_facts  (…{ctx[i:i + 60].strip()}…)')
            if kind == 'spoken':
                for w in t.split():
                    b = bare(w)
                    if b in SPOKEN:
                        v = SPOKEN[b]
                        warns.append(f'{name}: spoken number «{w.strip(".,،؛:؟?!")}» = {v}' + ('' if v in allowed else '  (NOT in allowed_facts)') + ': ear-check it')
    script = norm(' '.join(src.get('script.txt', ('', ['']))[1]))
    flat = lambda s: re.sub(r'[^\w\s]', ' ', s).split()
    for ph in B.get('required_phrases', []):
        if ' '.join(flat(norm(ph))) not in ' '.join(flat(script)):
            fails.append(f'script.txt: required phrase «{ph}» is missing')

    print(f'brand_lint {os.path.relpath(rd, ROOT)}  brand={B["id"]} ({os.path.relpath(bsrc, ROOT)})')
    print('  checked: ' + ', '.join(f'{n} [{k}, {len(t)} text{"s" if len(t) != 1 else ""}]' for n, (k, t) in src.items()))
    print(f'  allowed numbers: {sorted(x for x in allowed if x is not None)}')
    print(f'  required phrases: {B.get("required_phrases") or "none"}')
    seen = set()
    for f in fails:
        if f not in seen:
            print('  FAIL', f); seen.add(f)
    for w in dict.fromkeys(warns):
        print('  WARN', w)
    if B.get('never'):
        print('  manual (not machine-checked): ' + ' | '.join(B['never']))
    print(f'RESULT: {"FAIL" if fails else "PASS"} ({len(seen)} fail, {len(set(warns))} warn)')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
