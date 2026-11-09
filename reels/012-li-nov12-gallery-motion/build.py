"""Fill showreel.tpl -> index.html. No voice: D is fixed and the beat clock lives in the template."""
D = 18.5
t = open('showreel.tpl', encoding='utf-8').read().replace('__D__', str(D))
open('index.html', 'w', encoding='utf-8').write(t)
print('index.html D =', D)
