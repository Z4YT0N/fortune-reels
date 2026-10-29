# Vendored skills (third-party, vetted before copying)

| skill folders | source | commit | licence | vetted |
|---|---|---|---|---|
| gsap-core, gsap-frameworks, gsap-performance, gsap-plugins, gsap-react, gsap-scrolltrigger, gsap-timeline, gsap-utils | github.com/greensock/gsap-skills (official GSAP) | aed9cfd3277740755f6bfc1155c7aa645403b760 | MIT (gsap-core/LICENSE-gsap-skills) | 2026-10-29: markdown only, no scripts |
| motionmaxxing | github.com/Tejashmakwana/motionmaxxing | 8c8ec0f2a6f6c9a0da15cd24f7b1298ab298368c | Apache-2.0 (LICENSE, NOTICE inside) | 2026-10-29: scripts read; network only in brand.mjs/fetch_logo.mjs (brand capture), voice.py (ElevenLabs), imagegen.py (Codex CLI); nothing runs on install. docs/media left out. |

Owner rules (rules/, memory/) override these skills where they disagree. Example: motionmaxxing
bans centred "stat slides"; the owner wants full-screen number counters, so counters stay.

To update: download the repo into an empty scratch folder, diff against this copy, read every
changed script, then copy and update the commit column.
