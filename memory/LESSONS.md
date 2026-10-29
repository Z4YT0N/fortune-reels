# Lessons (loaded every session; append, never rewrite history)

Each lesson: date, what the owner said or what broke, the rule it became. Newest at the bottom.
When a lesson changes a rule, also edit the rule file and note it here.

- **2026-10-13** Arabic cannot be letter-spaced or typed per letter; `<html dir="rtl">` renders blank. -> rules/tech.md, rules/brand.md
- **2026-10-15** Owner heard Abdulrahman speaking Egyptian: `eleven_v3` + an audio tag drifts the accent. I cannot hear audio. -> send takes, owner picks, never ship an unheard setting; say "accent unverified" on delivery. (rules/voice-and-sound.md)
- **2026-10-16** Pictogram ad rejected: «التحريك مش واقعي خالص ومفيش اي قوانين متطبقه والشخصيات مش فالنص». -> animation principles on every action, figures centred, check 0.2 s strips. Also: an invalid `rgba('#000', a)` made black transition frames -> qa.py blackdetect. (rules/motion.md)
- **2026-10-20** «استخدم الجريدينتس اللي وريتهالك دي... متعملش انت جريدينت من راسك». -> use supplied design assets; never invent gradients/glows. (rules/brand.md)
- **2026-10-21** Pilot reel rejected: near-static opening = no hook; AI-coded HTML website mockups looked «بضان حرفيا سيء». -> frame 1 moves; design quality is the product; showcase real/designer-made work, not quick HTML sites. Show one sample before building a pipeline.
- **2026-10-21** "Website as video" prompt made of origami was called «عبط». -> a website on screen must look like a real website UI; vary concept, never the medium.
- **2026-10-27** Hallucination reel: owner picked take B (eleven_v3, no tag); asked to build with HyperFrames (it already was: say which tool was used up front).
- **2026-10-28** «هو انت تقدر تنزل ايقونات واسيتس حقيقيه بدل ما تقعد ترسم كل حاجه كدا» -> use real 3D models (3dicons FBX) recoloured to the brand instead of hand-drawn shapes. (engine/lib/brand-models.js)
- **2026-10-29** Page Speed reel built in 2.5D with real models + 39-cue SFX mix; voice sped 1.12x. Bugs found on the way: wifi model renders nothing; dropped figures stayed visible (need off-frame AND o:0); a blank gap between two counters (chain counters back to back).
- **2026-10-29** Studio page v1 rejected: «الموقع معقد ومش مفهوم ومفيش صور توضح الاستايلات». -> owner-facing pages are 3 steps max, every choice shown as a picture/video example, plain Egyptian Arabic, advanced options hidden; agent messages to him plain text, no markdown. Also: «عاوزه يعمل الريلز دي من اشتراك حساب كلود بتاعي مش api» -> every Claude call goes through the Claude Code CLI login (no ANTHROPIC_API_KEY); never show $ cost estimates.
