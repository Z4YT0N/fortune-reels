# Brand system for reels (FORTUNE CODE REEL RULES v2)

Source: the team's UI/UX v3 edits, saved 27 Oct 2026, and the brand guidelines PDF
(`E:\Library\01-Workspace\Fortune\WhatSaas\Fortune Code - Brand Guidlines V.2.2.pdf`). If the
PDF and this file ever disagree, the PDF wins and this file gets fixed. The older navy palette
(#0B1220 / #22C55E / Tajawal) from the first hallucination prompt is retired.

## Format
- Vertical 9:16, 1080x1920, 30 fps, H.264 MP4.
- Length 35-50 s (sweet spot ~45 s). Voice-over is the master timeline.

## Colours (only these)
| token | hex | use |
|---|---|---|
| Fortune Black | `#121416` | World A background (default) |
| Forest | `#006A39` | World B background (full-bleed, for a proof or number beat) |
| Light Gray | `#F0F1F2` | World C background: ONE scene per reel only (usually the analogy) |
| Fortune Green | `#00DB33` | the one accent: highlight word, hero number, success, 3D saturated parts |
| Dark Gray | `#BBBDBF` | details, secondary text, "wrong / false / old way" states |

- Never red, blue, purple or rainbow gradients. "Wrong" = Dark Gray, strike-through, dim, glitch.
- Never green text on a green ground (World B captions are Light Gray; the highlight goes Light Gray bold or the ground changes).
- No home-made gradients or glows as decoration. When the owner supplies gradients, mockups or 3D packs, use those.
- Optional texture: the cropped logo curve (`assets/brand/mark.svg`) at ~7% in World A, or the
  Dark Gray pattern at 5-7%.

## Type
- Arabic: IBM Plex Sans Arabic (500/700). Latin, digits, English terms: Inter (700/800).
- Arabic is never letter-spaced and never typed letter by letter (it breaks the joins). Reveal a
  word at a time, or with a stepped clip-path.
- Spoken numbers are shown as digits on screen (2024, 800, 53%).

## Logo
- Official file only (`assets/brand/logo-white.png`, Arabic horizontal, white). No glow, shadow,
  3D, rotation, recolour, outline. Clear space = icon height.
- It appears small and flat at the top during the CTA scene. No end card, no logo sting.

## Character
- Clover (the green 3D mascot) appears only when its render files are attached. Then it is a
  small recurring companion pointing at the key UI, never a talking head.

## Visual language
- 2.5D: real 3D models (3dicons, recoloured to the palette by `lib/brand-models.js`) lit with a
  key light, a green rim light and soft shadows, over the flat world colour.
- UI on screen is large (70-85% of frame width), generic and believable: real-looking content,
  no third-party logos, no real brand names, no lorem.
- A "website" shown on screen must look like a real premium website (navbar, headline, buttons,
  sections, cursor, scroll). Never a physical metaphor (paper, clay, origami) for a website.
- Human figures: clean faceless figures (the 3dicons `boy` model or line figures). No photoreal
  people, no memes, no emoji.
