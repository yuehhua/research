# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ISB Lab (Intelligent Systems Biology Lab, 臺北醫學大學) academic website. A static Astro site doubling as a presentation deck: full-viewport scroll-snap sections act as slides. Bilingual (zh default, en). Live at <https://yuehhua.github.io/research/>

Source repo: **github.com/yuehhua/research** (push to `main` → GitHub Actions builds and publishes `dist/` to the `research/` directory of the `yuehhua.github.io` repo; requires the `DEPLOY_TOKEN` secret). Do not commit directly to the blog repo.

## Commands

```bash
npm run dev          # dev server (note: base path means it serves under /research/)
npm run build        # static build → dist/
npm run preview      # serve dist/ on :4321 (needed by QA scripts)
node scripts/qa-geometry.mjs    # layout QA gate — requires preview running; exit 1 on failure
node scripts/verify.mjs         # screenshots all slides × 3 viewports × 2 languages → /tmp/isbshots (needs preview)
node scripts/measure-slides.mjs # per-element height breakdown for tall slides (debugging)
node scripts/find-overflow.mjs  # lists elements extending past the viewport width (run from project root)
```

## Architecture

**Content is centralized in `src/data/content.ts`** — every piece of copy, project, publication, course, and UI string lives there as bilingual `L<T>` objects (`{ zh, en }`). Content changes never touch components. Components pick strings via `t(x) => x[lang]`.

**One deck component, two thin page wrappers.** `src/components/Home.astro` renders the entire document (head, all 7 slides, deck script) taking `lang: 'zh' | 'en'`. `src/pages/index.astro` and `src/pages/en/index.astro` are one-line wrappers. There is no per-language markup duplication. Route-based i18n (`prefixDefaultLocale: false`): zh at `/`, en at `/en/` — language toggle is a plain link, no JS state.

**Slide system:** `src/layouts/Slide.astro` wraps each section with numbering/eyebrow chrome. Scroll snapping is on the viewport (`html { scroll-snap-type: y mandatory }`), **relaxed to `proximity` below 1024px** because slides legitimately exceed the viewport on tablet/mobile. Keyboard navigation (arrows/PageUp/Down/Space/Home/End) lives in an inline script in Home.astro; it defers to inner scrollables marked `[data-inner-scroll]`.

**Deployed under a base path** (`base: '/research'` in astro.config.mjs). All internal links must go through the `base` variable pattern used in each component (`(import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL).replace(/\/$/, '')`), never a raw `/href`.

### Hard design constraints

- **Sky-blue × leaf-green palette** (tokens in global.css: `--sky-deep` #0B57A4 headings/footer, `--sky` #1971C2 buttons/links, `--sky-pale`/`--sky-wash` tints, `--leaf` #40A02B live/green accents, `--ink` #16283C body text). User explicitly rejected the earlier pure black-&-white look — don't revert to monochrome. Nature elements: hero sky gradient + **CC0 multi-leaf photo** (`src/assets/leaf.png`, rawpixel via Openverse; chosen by the user from 7 candidates on a local picker page — user rejected hand-drawn art, generated line art, and a cherry-leaf photo, don't swap it casually), teaching slide leaf wash, full-color portrait (no grayscale filter).
- **Desktop slides must fit one screen** (1920×1080 is the QA gate for the presentation use-case). `qa-geometry.mjs` enforces this; if a slide grows past the viewport, tighten density (paddings, `--section-pad`, row spacing) rather than cropping content. Tablet/mobile overflow is accepted by design.
- **Highlights ordered first**: the projects array order in content.ts is deliberate (Virtual Embryo → GeometricFlux.jl → RAFAEL → CDGRNs.jl).
- The portrait (`src/assets/portrait.jpg`) is in color; do not re-apply grayscale.

### Bugs already fixed — don't reintroduce

- `global.css` is imported **only** in `Home.astro` frontmatter. It was lost once during a refactor and the build still succeeded (scoped styles alone produce a plausible-looking but unstyled page). If layout measurements look wildly wrong, check that the CSS bundle contains `.slide` first.
- Grid items holding images need `min-width: 0` (grid `min-width: auto` let the 900px portrait blow out mobile layout).
- `white-space: nowrap` text inside a `max-width: 100%` box still overflows: the box is capped but the text spills, and spilled inline content expands the page's scrollable area **without any element's bounding rect exceeding the viewport** — `find-overflow.mjs` finds nothing in that case. Long chips/badges must wrap on narrow screens (see the `≤560px .chip` override in global.css).
- Project cards: the tablet 2-column layout needs explicit `grid-column`/`grid-row` placement for the three children (auto-placement drops the description into the metrics rail), and the ≥900px block must reset that placement. Check both media queries when touching `.project` layout.
- Files under `src/pages/` become routes — page-shaped components (like Home.astro) belong in `src/components/`.
- Verification hierarchy for this codebase: DOM geometry (`qa-geometry.mjs`) > pixel sampling with ImageMagick (`magick img.png -format "%[pixel:p{x,y}]" info:`) > screenshots via puppeteer-core (works; raw `google-chrome --headless --screenshot` CLI blanks frames on this site). Vision/analyze tools hallucinated details on this project — never trust them as the sole verdict.

## Deployment

Automatic via GitHub Actions (`.github/workflows/deploy.yml`): push to `main` in `yuehhua/research` → build → publish `dist/` to `yuehhua.github.io` repo's `research/` directory (peaceiris/actions-gh-pages, `DEPLOY_TOKEN` secret). GitHub Pages serves it within ~1–2 min. Check runs with `gh run list --repo yuehhua/research`.

⚠️ The blog repo is Hexo-deployed by the user. If they run `hexo deploy`, the `research/` directory may be wiped (Hexo cleans non-`public/` files) — the fix is `keep_files: research` in the blog's `_config.yml` deploy section, or re-run this repo's workflow (`gh workflow run deploy.yml --repo yuehhua/research`).

## Reference

- `plan.md` — full spec: content model, design tokens, interaction spec, stage-by-stage build log with verification results.
- Content facts (CV, publication DOIs, course syllabi) were verified against `/run/media/yuehhua/Workbench/Profile/CV/YuehHua Tu_Academic.pdf`, TMU Pure profile, and Crossref at build time (2026-09-02).
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ISB Lab (Intelligent Systems Biology Lab, 臺北醫學大學) academic website. A static Astro site doubling as a presentation deck: full-viewport scroll-snap sections act as slides. Bilingual (zh default, en). Live at <https://yuehhua.github.io/research/>

Source repo: **github.com/yuehhua/research** (push to `main` → GitHub Actions builds and publishes `dist/` to the `research/` directory of the `yuehhua.github.io` repo; requires the `DEPLOY_TOKEN` secret). Do not commit directly to the blog repo.

## Commands

```bash
npm run dev          # dev server (note: base path means it serves under /research/)
npm run build        # static build → dist/
npm run preview      # serve dist/ on :4321 (needed by QA scripts)
node scripts/qa-geometry.mjs    # layout QA gate — requires preview running; exit 1 on failure
node scripts/verify.mjs         # screenshots all slides × 3 viewports × 2 languages → /tmp/isbshots (needs preview)
node scripts/measure-slides.mjs # per-element height breakdown for tall slides (debugging)
node scripts/find-overflow.mjs  # lists elements extending past the viewport width (run from project root)
```

## Architecture

**Content is centralized in `src/data/content.ts`** — every piece of copy, project, publication, course, and UI string lives there as bilingual `L<T>` objects (`{ zh, en }`). Content changes never touch components. Components pick strings via `t(x) => x[lang]`.

**One deck component, two thin page wrappers.** `src/components/Home.astro` renders the entire document (head, all 7 slides, deck script) taking `lang: 'zh' | 'en'`. `src/pages/index.astro` and `src/pages/en/index.astro` are one-line wrappers. There is no per-language markup duplication. Route-based i18n (`prefixDefaultLocale: false`): zh at `/`, en at `/en/` — language toggle is a plain link, no JS state.

**Slide system:** `src/layouts/Slide.astro` wraps each section with numbering/eyebrow chrome. Scroll snapping is on the viewport (`html { scroll-snap-type: y mandatory }`), **relaxed to `proximity` below 1024px** because slides legitimately exceed the viewport on tablet/mobile. Keyboard navigation (arrows/PageUp/Down/Space/Home/End) lives in an inline script in Home.astro; it defers to inner scrollables marked `[data-inner-scroll]`.

**Deployed under a base path** (`base: '/research'` in astro.config.mjs). All internal links must go through the `base` variable pattern used in each component (`(import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL).replace(/\/$/, '')`), never a raw `/href`.

### Hard design constraints

- **Sky-blue × leaf-green palette** (tokens in global.css: `--sky-deep` #0B57A4 headings/footer, `--sky` #1971C2 buttons/links, `--sky-pale`/`--sky-wash` tints, `--leaf` #40A02B live/green accents, `--ink` #16283C body text). User explicitly rejected the earlier pure black-&-white look — don't revert to monochrome. Nature elements: hero sky gradient + **CC0 multi-leaf photo** (`src/assets/leaf.png`, rawpixel via Openverse; chosen by the user from 7 candidates on a local picker page — user rejected hand-drawn art, generated line art, and a cherry-leaf photo, don't swap it casually), teaching slide leaf wash, full-color portrait (no grayscale filter).
- **Desktop slides must fit one screen** (1920×1080 is the QA gate for the presentation use-case). `qa-geometry.mjs` enforces this; if a slide grows past the viewport, tighten density (paddings, `--section-pad`, row spacing) rather than cropping content. Tablet/mobile overflow is accepted by design.
- **Highlights ordered first**: the projects array order in content.ts is deliberate (Virtual Embryo → GeometricFlux.jl → RAFAEL → CDGRNs.jl).
- The portrait (`src/assets/portrait.jpg`) is in color; do not re-apply grayscale.

### Bugs already fixed — don't reintroduce

- `global.css` is imported **only** in `Home.astro` frontmatter. It was lost once during a refactor and the build still succeeded (scoped styles alone produce a plausible-looking but unstyled page). If layout measurements look wildly wrong, check that the CSS bundle contains `.slide` first.
- Grid items holding images need `min-width: 0` (grid `min-width: auto` let the 900px portrait blow out mobile layout).
- `white-space: nowrap` text inside a `max-width: 100%` box still overflows: the box is capped but the text spills, and spilled inline content expands the page's scrollable area **without any element's bounding rect exceeding the viewport** — `find-overflow.mjs` finds nothing in that case. Long chips/badges must wrap on narrow screens (see the `≤560px .chip` override in global.css).
- Project cards: the tablet 2-column layout needs explicit `grid-column`/`grid-row` placement for the three children (auto-placement drops the description into the metrics rail), and the ≥900px block must reset that placement. Check both media queries when touching `.project` layout.
- Files under `src/pages/` become routes — page-shaped components (like Home.astro) belong in `src/components/`.
- Verification hierarchy for this codebase: DOM geometry (`qa-geometry.mjs`) > pixel sampling with ImageMagick (`magick img.png -format "%[pixel:p{x,y}]" info:`) > screenshots via puppeteer-core (works; raw `google-chrome --headless --screenshot` CLI blanks frames on this site). Vision/analyze tools hallucinated details on this project — never trust them as the sole verdict.

## Deployment

Automatic via GitHub Actions (`.github/workflows/deploy.yml`): push to `main` in `yuehhua/research` → build → publish `dist/` to `yuehhua.github.io` repo's `research/` directory (peaceiris/actions-gh-pages, `DEPLOY_TOKEN` secret). GitHub Pages serves it within ~1–2 min. Check runs with `gh run list --repo yuehhua/research`.

⚠️ The blog repo is Hexo-deployed by the user. If they run `hexo deploy`, the `research/` directory may be wiped (Hexo cleans non-`public/` files) — the fix is `keep_files: research` in the blog's `_config.yml` deploy section, or re-run this repo's workflow (`gh workflow run deploy.yml --repo yuehhua/research`).

## Reference

- `plan.md` — full spec: content model, design tokens, interaction spec, stage-by-stage build log with verification results.
- Content facts (CV, publication DOIs, course syllabi) were verified against `/run/media/yuehhua/Workbench/Profile/CV/YuehHua Tu_Academic.pdf`, TMU Pure profile, and Crossref at build time (2026-09-02).


claude --resume 9c60bc8a-51b6-42d0-9713-9f2d329a172c