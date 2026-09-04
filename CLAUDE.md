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

**Lesson system** (2026-09-04): the teaching block was broken down into **one deck slide per course** — no overview slide, no 2×2 card grid (user found it ugly; explicit call). Deck order lives in `slideOrder` (content.ts): the four course slugs between `research` and `join`. Each lesson slide (rendered in Home.astro from `src/data/lessons.ts`) shows the user-designed background PNG (absolute layer + left-heavy white scrim), goal, module chips, and a CTA to its detail page. Header nav: **one** 課程/Lesson entry links to the first lesson slide and glows while any lesson slide is active (matched via `data-nav-group`); the deck script selects `.site-nav a` (not `[data-nav]` — the group entry has no data-nav). Detail pages: `src/components/LessonPage.astro` taking `lesson` + `lang` + `heroImage`, wrappers at `src/pages/lessons/<slug>.astro` and `src/pages/en/lessons/<slug>.astro`, rendered `<html class="no-snap">` (normal scrolling pages). Content policy: module overview + one featured clinical case per module (`case` optional — bioinfo/big-data have none), **no operational info** — no textbook/hours/grading, user's explicit call. Per-lesson `accent: 'sky' | 'leaf'`; the clinical-case card stays leaf-green everywhere. Backgrounds in `src/assets/*_Gemini.png` are user-made — don't regenerate. `smart-healthcare-big-data` has a slide (flat sky-wash) but **no detail page yet** — awaiting the user's background.

**Research system** (2026-09-04, 主題研究): the deck's research slide shows **one card per featured research theme** (visual + name + one-liner + 領域標籤 chips, linking to a detail page). The former projects slide, publications slide, interests grid and focus chips were all **removed** (user's explicit calls) — `projects`/`interests`/`focusChips` no longer exist in content.ts; `publications` stays there as the single pub source. Data: `src/data/research.ts` (`ResearchTheme`: slug, accent, name, status, short, desc, metrics, links, tags, **pubDois** — related pubs resolve against content.ts publications by DOI). Detail pages: `src/components/ResearchPage.astro` (figure-framed visual, desc, metrics, tags, related pubs) at `src/pages/<slug>.astro` + `src/pages/en/<slug>.astro` for slugs `virtual-embryo`, `geometricflux`, `federated-learning` (RAFAEL presented by its field name 聯邦式學習), `cdgrn`. Full publication list: `src/components/PublicationsPage.astro` at `/publications/` (+/en/); the 論文 nav item is a **page link** (never glows on the deck; pre-lit via Header's `activeNav` prop on that page). Visuals live in `src/assets/research/` — VE task2.webp from the challenge site (credited on the page), GeometricFlux logo (MIT), RAFAEL logo, CDGRN concept figure rasterized from the user's own diagrams.net SVG (rsvg-convert; Astro cannot parse diagrams.net SVGs).

**Responsive layout is Bootstrap 5** (CSS only, no Bootstrap JS): grids/spacing/display come from `row`/`col-*`/utility classes in the markup; brand colors ride on top via `--bs-*` variable overrides and `.btn-sky`/`.btn-outline-sky` button variants in global.css (imported **after** `bootstrap.min.css` in Home.astro). Caveat learned the hard way: a `.row` that carries its own horizontal padding (like `.footer-inner`) must add `mx-0` to cancel Bootstrap's negative gutters, or it overflows the viewport at every width.

**Deployed under a base path** (`base: '/research'` in astro.config.mjs). All internal links must go through the `base` variable pattern used in each component (`(import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL).replace(/\/$/, '')`), never a raw `/href`.

### Hard design constraints

- **Sky-blue × leaf-green palette** (tokens in global.css: `--sky-deep` #0B57A4 headings/footer, `--sky` #1971C2 buttons/links, `--sky-pale`/`--sky-wash` tints, `--leaf` #40A02B live/green accents, `--ink` #16283C body text). User explicitly rejected the earlier pure black-&-white look — don't revert to monochrome. Slide backgrounds alternate light-blue / light-green / white (`is:global` block in Home.astro). Hero carries a **user-supplied vector leaf** (`src/assets/leaf.svg`, converted from the user's EPS via Inkscape, white bg path stripped — after the user rejected generated art, three CC0 photos and a picked photo, don't swap it), full-color portrait (no grayscale filter).
- **Desktop slides must fit one screen** (1920×1080 is the QA gate for the presentation use-case). `qa-geometry.mjs` enforces this; if a slide grows past the viewport, tighten density (paddings, `--section-pad`, row spacing) rather than cropping content. Tablet/mobile overflow is accepted by design.
- **Highlights ordered first**: the projects array order in content.ts is deliberate (Virtual Embryo → GeometricFlux.jl → RAFAEL → CDGRNs.jl). Projects carry **no serial numbers and no separator rules** — whitespace separates (user preference).
- The portrait (`src/assets/portrait.jpg`) is in color; do not re-apply grayscale.
- **Not a CV** (user's explicit feedback — a friend said the site read like a CV): About is a domain narrative with no year-by-year education/experience timeline; Teaching lists TMU courses only (no credits/type metadata, no past-teaching history); Join CTA is an inline email link, not a button.
- **No page-number counter** (removed by user request); the scroll hint sits fixed bottom-right, cover slide only.

### Bugs already fixed — don't reintroduce

- `global.css` is imported **only** in `Home.astro` frontmatter (after `bootstrap.min.css`). It was lost once during a refactor and the build still succeeded (scoped styles alone produce a plausible-looking but unstyled page). If layout measurements look wildly wrong, check that the CSS bundle contains `.slide` first.
- **Astro scoping pitfall:** selectors in Home.astro's scoped `<style>` compile with `data-astro-cid`, but the `<section>` roots are rendered by `Slide.astro` and never receive Home's cid — so `#hero`/`#teaching`/`#join` rules written there **silently never match**. Slide-level overrides must live in the `<style is:global>` block in Home.astro.
- The footer lives **inside the Join slide** (margin-top: auto, full-bleed negative margins), not after the deck — otherwise mandatory scroll-snap hides it behind an extra scroll.
- Grid items holding images need `min-width: 0` (grid `min-width: auto` let the 900px portrait blow out mobile layout).
- `white-space: nowrap` text inside a `max-width: 100%` box still overflows: the box is capped but the text spills, and spilled inline content expands the page's scrollable area **without any element's bounding rect exceeding the viewport** — `find-overflow.mjs` finds nothing in that case. Long chips/badges must wrap on narrow screens (see the `≤560px .chip` override in global.css).
- Files under `src/pages/` become routes — page-shaped components (like Home.astro) belong in `src/components/`. (A temporary `leaf-picker.astro` page lived there once; it was deleted after use.)
- Verification hierarchy for this codebase: DOM geometry (`qa-geometry.mjs`) > pixel sampling with ImageMagick (`magick img.png -format "%[pixel:p{x,y}]" info:`) > screenshots via puppeteer-core (works; raw `google-chrome --headless --screenshot` CLI blanks frames on this site). Vision/analyze tools hallucinated details on this project — never trust them as the sole verdict.

## Deployment

Automatic via GitHub Actions (`.github/workflows/deploy.yml`): push to `main` in `yuehhua/research` → build → publish `dist/` to `yuehhua.github.io` repo's `research/` directory (peaceiris/actions-gh-pages, `DEPLOY_TOKEN` secret). GitHub Pages serves it within ~1–2 min. Check runs with `gh run list --repo yuehhua/research`.

⚠️ The blog repo is Hexo-deployed by the user. If they run `hexo deploy`, the `research/` directory may be wiped (Hexo cleans non-`public/` files) — the fix is `keep_files: research` in the blog's `_config.yml` deploy section, or re-run this repo's workflow (`gh workflow run deploy.yml --repo yuehhua/research`).

## Reference

- `plan.md` — full spec: content model, design tokens, interaction spec, stage-by-stage build log with verification results.
- Content facts (CV, publication DOIs, course syllabi) were verified against `/run/media/yuehhua/Workbench/Profile/CV/YuehHua Tu_Academic.pdf`, TMU Pure profile, and Crossref at build time (2026-09-02).

claude --resume 9c60bc8a-51b6-42d0-9713-9f2d329a172c
