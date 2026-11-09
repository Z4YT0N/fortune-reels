"""Old voice clock (W1, audio/vo-v1.json) -> new voice clock (X3, audio/vo.json). Old word i maps to new word i (i<=13) or i+2 (i>=14:
«في مصنعنا» inserted after «نصنع»). Piecewise linear between word starts (and ends of the last word)."""
import json, os, bisect
H = os.path.dirname(os.path.abspath(__file__))
o = json.load(open(os.path.join(H, 'audio', 'vo-v1.json'), encoding='utf-8')); n = json.load(open(os.path.join(H, 'audio', 'vo.json'), encoding='utf-8'))
A = [(0.0, 0.0)] + [(o[i][1], n[i if i <= 13 else i + 2][1]) for i in range(len(o))] + [(o[-1][2], n[-1][2]), (o[-1][2] + 10, n[-1][2] + 10)]
A = sorted(set(A))
X = [a for a, _ in A]; Y = [b for _, b in A]
def warp(t):
    k = max(1, min(len(X) - 1, bisect.bisect_right(X, t)))
    x0, x1, y0, y1 = X[k - 1], X[k], Y[k - 1], Y[k]
    return round(y0 + (t - x0) * (y1 - y0) / (x1 - x0), 3)
if __name__ == '__main__':
    for t in [0, 1.0, 4.15, 4.75, 5.57, 10.58, 11.58, 17.2, 21.2, 25.4, 28.64, 30.28]: print(t, '->', warp(t))
