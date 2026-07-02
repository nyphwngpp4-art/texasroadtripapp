# PLAN

## Resolved architecture decisions (2026-07-02, Fable + user)

**D1 — Build-time, not runtime.** A Node script emits plain HTML/CSS/JS per site into
`/dist/<client-slug>/`. Output is dependency-free static files — identical in kind to the
hand-built deliverable, hostable anywhere, clean under view-source (prospects' web people
will look).

**D2 — Plain JS template literals, zero npm dependencies.** Each component is a plain JS
function `(config, preset) → HTML string`. Template literals give composition, loops, and
conditionals without a templating engine — no second syntax for a human or LLM to trip on,
nothing to install on the Mac mini beyond Node (≥20, built-ins only).
Sub-decision (delegated to this planning pass by CLAUDE.md) — **no Tailwind**: one
hand-tuned shared stylesheet (`assets/site.css`) plus a generated per-site
`tokens.css` of CSS custom properties (palette, font pairing). CDN Tailwind fails the
"passes as hand-built" bar (page weight, console warning, generic utility-soup markup);
compiled Tailwind adds a toolchain step for no output benefit at ~9 components. A single
hand-crafted stylesheet is tuned once and every site inherits that care — this is the
mechanism that keeps site #4 from getting uglier.

**D3 — Template abstraction boundary: skeleton + presets, three layers.**
Reverse-engineered from the reference corpus (single-page sites, "pretty much the same,"
variants here and there; the two salons near-identical, grooming slightly different):
- **Fixed (code, hand-tuned once):** grid, spacing scale, typography scale, component
  markup, mobile nav behavior, breakpoints. Not configurable. Quality lives here.
- **Per-vertical (a small declarative preset module in `/templates`):** which sections
  appear and in what order, per-section variant picks, imagery treatment (aspect ratios,
  overlay style), copy-tone notes for config drafting, schema.org business subtype.
  Vertical #3 = one new preset file + at most a couple of new section *variants* —
  additive, never a refactor of existing components.
- **Per-client (pure data in one JSON config):** business name, palette seeds, font
  pairing (from a curated list), copy blocks, photos, services list, testimonials,
  contact info, hours, CTA target.
- **Escape hatch (per-client, optional):** an `extra.css` appended after tokens, and one
  `rawHtml` section slot. Cheap to support, prevents template rigidity from forcing forks.

**D4 — Monorepo with `/dist/<client-slug>/` output, gitignored; manual deploy** via
`wrangler pages deploy` or dashboard drag-drop. Spec sites are speculative and most die;
repo-per-prospect is ceremony. If a prospect converts, promote that one dist to its own
repo then (a `promote` helper is post-v1).

**Scope corollaries** (recorded here so Sonnet doesn't relitigate them):
- Reference corpus is **four** sites: Logic Nails and BeauT Nails (salons), AAA Mobile
  Dog Grooming, 81 Precision Machine (CNC).
- v1 verticals: **salon** and **mobile-service** (both use the proven book-online CTA).
  81 Precision / an industrial vertical is #3, post-v1.
- The config schema anticipates CTA divergence now: `cta.type: "booking" | "call" |
  "quote"`. v1 implements `call` (tap-to-call, the default) and `booking` (plain link-out
  when a URL exists — no provider widget embeds); `quote` needs a form backend on static
  hosting and is explicitly deferred.

## Reference-material status (resolved 2026-07-02)
The hand-built originals are **not available** — the user is remote and cannot retrieve
them. Known facts: all four were one-off Claude Opus builds in separate projects; no
booking-provider integration existed (CTA was call/contact, not a widget); the grooming
site differed from the salons only minimally. Consequences:
- Increment 1 still regenerates Logic Nails (config drafted from public business facts +
  the user's memory), but the fidelity check is amended — see ACCEPTANCE A3: an objective
  quality rubric Fable verifies, plus the user's from-memory verdict on their phone.
- `/reference/` stays in the file map; if original URLs or files ever surface, the true
  side-by-side is run then and logged as an addendum.
- The mobile-service preset should diverge from salon only where the vertical demands it
  (service-area emphasis over street address, van/before-after imagery treatment) — the
  corpus says the differences were small, so don't invent big ones.

## Architecture

Config JSON → validate → merge with vertical preset → render section list through the
component registry → emit `dist/<slug>/` (index.html, styles/, assets/).

- `generator/build.js` — CLI entry: `node generator/build.js configs/<name>.json`.
  Loads config (comment-tolerant JSON), validates, renders, writes dist atomically
  (build to temp, move into place — never leave a half-written dist).
- `generator/lib/validate.js` — schema checks with actionable errors (field name + what
  a valid value looks like). Exit non-zero on failure.
- `generator/lib/render.js` — walks the preset's `sections` array, calls each section's
  component function, assembles the page (head, body, structured data).
- `generator/lib/jsonc.js` — ~20-line comment stripper so configs can carry `//`
  annotations while staying zero-dependency.
- `components/*.js` — one file per section, pure functions returning HTML strings.
  `components/registry.js` maps section id → function.
- `templates/salon.js`, `templates/mobile-service.js` — vertical presets (data modules,
  no logic beyond defaults).
- `assets/site.css` — the shared design system. `tokens.css` is generated per site from
  config (palette seeds expanded to a constrained set of custom properties; font pairing
  from `assets/font-pairings.js`, loaded via Google Fonts link).
- Structured data: schema.org subtype from preset (e.g. `NailSalon`), plus meta/OG tags
  and a generated initial-letter SVG favicon when none is supplied.

## File map

```
CLAUDE.md  PLAN.md  ACCEPTANCE.md
generator/
  build.js              CLI entry; pipeline orchestration
  lib/validate.js       config validation, actionable errors
  lib/render.js         preset → page assembly
  lib/jsonc.js          comment-tolerant JSON loader
components/
  registry.js           section id → component fn
  head.js nav.js hero.js services.js about.js gallery.js
  testimonials.js contact-cta.js footer.js raw-html.js
templates/
  salon.js              vertical preset (increment 1)
  mobile-service.js     vertical preset (increment 3)
assets/
  site.css              shared hand-tuned stylesheet
  font-pairings.js      curated font pairings (data)
configs/
  example.json          fully-annotated fictional business (committed)
  logic-nails.json      increment-1 config (gitignore if needed)
docs/
  config-schema.md      every field: type, required?, example, which layer consumes it
  deploy.md             wrangler / dashboard runbook
reference/              hand-built originals + screenshots (gitignored)
dist/                   generated output (gitignored)
```

## Build sequence

**Increment 0 — skeleton.** Repo layout above, .gitignore (dist/, reference/,
real-prospect configs), empty registry, build.js that validates and errors cleanly on a
stub config. No visual output claims.

**Increment 1 — regenerate Logic Nails from a config. This is the proof the abstraction
works; nothing else proceeds until it passes review.** Salon preset + only the components
that site actually needs + `configs/logic-nails.json` + `assets/site.css`. Done when the
A-block passes: quality rubric verified by Fable plus the user's from-memory verdict
against the Opus-built original (ACCEPTANCE A3).

**Increment 2 — prove the per-client layer.** `configs/example.json` (fictional salon,
different palette/fonts/copy/photos) builds with zero source-code changes and produces a
visibly distinct site of equal quality. This is the moment "config in → site out" becomes
true rather than aspirational.

**Increment 3 — prove the per-vertical layer.** `templates/mobile-service.js` +
regenerate the AAA Grooming reference from a config. Additive-only rule enforced by
acceptance check (existing salon output must not change).

**Increment 4 — make it operable.** Complete `docs/config-schema.md` (good enough that an
LLM drafts a valid config from a prospect research brief), validation hardening, deploy
runbook, escape hatches (`extra.css`, `rawHtml`) demonstrated, end-to-end timing run
against the under-10-minutes definition of done.

Out of scope for v1 (listed so nobody "helpfully" adds them): quote-form CTA backend,
booking-widget embeds, repo-per-client promotion, industrial/CNC preset, multi-page
sites, CMS of any kind.
