# brands: one profile per brand for collage reels

Each brand is `brands/<id>.json` plus a `brands/<id>/` folder that holds its fonts and logos, so the repo is self-contained (`.gitignore` whitelists `brands/**`).

The profile feeds three tools:
- `engine/tools/new_collage_reel.py <slug> --brand <id>` copies the brand into a new reel (`brand.json`, fonts, logos), writes the CSS variables and the Flow style suffix.
- `build.py` (in each reel) turns `brand.json` into `@font-face` rules, `:root` variables and the end card (name, CTA, contact, logos).
- `engine/tools/brand_lint.py <reel>` checks the script, the captions and the on-screen text against the banned words, the allowed facts and the required phrases.

Profiles today: `fortune` (FortuneCode, our own) and `alumaman` (Alum Aman, a client).

## Schema
| Key | Type | Meaning |
|---|---|---|
| `id` | string | Same as the file name. |
| `name_ar`, `name_en` | string | Brand name. `name_ar` is used by the template's demo beat; keep it whole words. |
| `client` | bool | true for a client brand (their reel never carries FortuneCode's logo or contact). |
| `source` | string | Where the values came from, and when. |
| `colors` | object | `ink` (the ONE accent), `ink_deep` (shadows), `ink_soft`, `paper` (light ground), `dark` (text / dark ground), `on_ink` (text on an ink chip or highlight: paper on a dark ink, dark on a bright ink). |
| `style` | object | Words for Flow prompts, which must never contain hex codes: `ink_word`, `ink_deep_word`, `paper_word`, `world` (the kind of place the brand's films live in). |
| `fonts.hero` | `{family, files:[{file, weight}]}` | Hero and stress words. `files[0]` sets the weight. |
| `fonts.label` | same | Labels, connectors, UI, CTA, contact. `files[0]` = the bold label (`.sans`), the last = the medium one (`.sansm`). |
| `fonts.latin` | same, or `null` | Latin runs (URL, phone, @handle); `null` falls back to the label font. |
| `logo` | `{on_dark, on_light, icon}` | Paths under `brands/<id>/`. |
| `contact` | string[] | The end-card lines, in order. Latin runs are isolated LTR automatically. Their digits count as allowed numbers. |
| `cta` | string | The end-card button text. |
| `voice` | `{voice_id, model, stability}` | Used by the reel's `tts.py`. |
| `allowed_facts` | string[] | Each fact written with its exact numbers. Any number in the script, captions or on-screen text that is not here or in `contact` fails the lint. |
| `banned_words` | `{word: replacement or null}` | Matched inside words after light normalisation (alef forms, tashkeel), so «شباك» also catches «الشباك», «بالشباك». `null` means remove it. Latin keys match case-insensitively. |
| `required_phrases` | string[] | Must appear in `script.txt` (punctuation ignored). |
| `never` | string[] | Rules a machine cannot check (colours to avoid, unconfirmed claims). The lint prints them as a manual checklist. |

## Add a client in 5 minutes
1. **Read their repo** (read only): the brand tokens (`globals.css` / tailwind config), the fonts folder, the logos folder and the facts file (for example `lib/business.js`). Never guess a colour or a fact.
2. **Copy the files:**
   - fonts: hero, label bold, label medium; plus Latin if they have one;
   - logos: on dark, on light, icon.
   - Put them in `brands/<id>/`, for example `mkdir brands/acme && cp <repo>/public/fonts/X-Black.otf brands/acme/`.
3. **Copy `brands/alumaman.json` to `brands/<id>.json`** and fill every key. Write `allowed_facts` only from what the owner or the client confirmed; put unconfirmed stats in `never`. Write the Arabic in the file with an editor, never through a shell argument.
4. **Check it:**
   - `python engine/tools/new_collage_reel.py brand-check --brand <id>`
   - `cd reels/NNN-brand-check && python build.py && npx --yes hyperframes@0.9.20 check && npx --yes hyperframes@0.9.20 snapshot --at 0.5,6.2 --no-end`
   - Look at the stills: the fonts load, the joins are intact, the logo and contact are right, and the CTA fits.
   - Then delete the test reel: `git clean -fdx -- reels/NNN-brand-check`. A `warmCheck` node process from `hyperframes check` keeps the folder busy for about 5 minutes; wait, or stop that process.
5. **Commit** `brands/<id>.json` and `brands/<id>/`.
