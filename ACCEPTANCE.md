# ACCEPTANCE CRITERIA

Every item is a concrete pass/fail check. An increment is done when its block passes and
Fable has logged a verdict in the Review log. "Screenshots" always means two viewports:
390px (mobile) and 1280px (desktop).

## A — Increment 1: regenerate Logic Nails (the abstraction proof)

- **A1.** `node generator/build.js configs/logic-nails.json` exits 0 and emits
  `dist/logic-nails/` containing `index.html`, `styles/`, and copied assets. Build makes
  no network requests (verifiable by running offline).
- **A2.** Generated `index.html` contains no runtime framework or CDN script: grep for
  `cdn.tailwindcss.com`, `react`, `vue`, `unpkg`, `jsdelivr` finds nothing. Google Fonts
  `<link>` is the only permitted external resource.
- **A3. Visual quality verdict** (amended 2026-07-02: the hand-built originals are
  unavailable, so the side-by-side is replaced by a two-part check). Part 1, verified by
  Fable from screenshots: (a) typography uses the preset's font pairing with a real
  hierarchy — no default/system fonts, no two adjacent sections with identical visual
  weight; (b) palette is cohesive and body text meets WCAG AA contrast; (c) spacing is
  consistent across sections (one scale, no ad-hoc gaps); (d) imagery is art-directed per
  the preset (consistent aspect ratios/treatment), with no placeholder-looking blocks.
  Part 2, verified by the user: they review the generated site on their phone against
  their memory of the Opus-built originals and log a would-pass-as-one-of-them verdict.
  Both parts + screenshot paths logged below. *Addendum clause: if any original's URL or
  files later surface, the true section-by-section side-by-side is run and logged then.*
- **A4.** Total transfer size of the generated page excluding images is under 150 KB, and
  Lighthouse mobile performance score is ≥ 90.
- **A5.** At 360px width: no horizontal scroll, nav menu opens and closes, primary CTA is
  tappable and resolves to the configured target (`tel:` link for `call`, the configured
  URL for `booking`).
- **A6.** `index.html` includes title, meta description, OG tags, a favicon, and valid
  schema.org `NailSalon` JSON-LD (passes Google's Rich Results test or `schema.org`
  validator without errors).

## B — Increment 2: per-client layer

- **B1.** `configs/example.json` (fictional salon) builds successfully with `git status`
  showing zero modifications outside `configs/` — no source edits were needed.
- **B2.** Example-site screenshots show a visibly different brand (palette + fonts +
  imagery) from Logic Nails with no layout breakage at either viewport.
- **B3.** `configs/example.json` carries `//` annotations on every field and still builds.
- **B4.** Deleting a required field (e.g. `business.name`) makes the build exit non-zero,
  name the missing field, and leave no partial `dist/` output.

## C — Increment 3: per-vertical layer

- **C1.** AAA Grooming regenerated from `configs/` passes the same two-part quality
  verdict as A3 (Fable rubric + user from-memory review).
- **C2. Additive-only proof:** the increment-3 diff adds files (`templates/
  mobile-service.js`, new variants, configs) but modifies no existing component's output:
  rebuilding `logic-nails` before and after the increment yields byte-identical
  `index.html`.
- **C3.** `cta.type` accepts `booking`, `call`, `quote`; `call` (default, `tel:` link)
  and `booking` (plain link-out) render working CTAs, `quote` fails the build with a
  clear "deferred to v2" error (schema anticipates vertical #3, implementation doesn't
  pretend).

## D — Increment 4: operability (definition of done)

- **D1.** An LLM given only `docs/config-schema.md` and a prospect research brief drafts a
  config that validates and builds within two attempts. The transcript or config is kept
  as evidence.
- **D2.** Timed end-to-end run: fresh fictional business in a supported vertical, from
  blank config to deployed pages.dev URL, in under 10 minutes of human effort. Time and
  URL logged below.
- **D3.** `docs/deploy.md` runbook followed verbatim by the user (not its author)
  produces a live site.
- **D4.** `extra.css` and a `rawHtml` section demonstrably work in the example config
  without breaking A4/A5.

## Review log
_(Fable appends review verdicts here: date, diff reviewed, pass/fail per criterion, required fixes.)_
