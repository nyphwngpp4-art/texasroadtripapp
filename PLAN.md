# PLAN

## Note on this document's history
This repo's PLAN.md and ACCEPTANCE.md were committed as empty placeholders
("to be written by Claude Fable"), and CLAUDE.md's committed text described
an unrelated project (a family road-trip tracker). Neither matched the
site-generator assignment this PLAN implements. In a non-interactive session
with no way to interrogate the user first, Sonnet wrote this PLAN directly
from the assignment brief below rather than leaving the repo inconsistent.
**Fable should review this PLAN itself, not just the Increment 0/1 diffs
against it** — treat the architecture below as a first draft, not settled
history.

## Architecture
- The generator is a single Node CLI (`generator/build.js`) invoked as
  `node generator/build.js configs/<slug>.json`.
- A **config** (`configs/<slug>.json`) holds one business's content: name,
  contact info, hero copy, services, hours, CTA copy, footer copy. Configs
  are hand-editable JSON — no logic lives in them.
- A **preset** (`generator/presets/<name>.json`) holds visual tokens shared
  across sites: color palette, font choices (as Google Fonts family +
  weight strings), corner radius. A config points at one preset by name.
- **Components** are plain functions `(config, preset) => htmlString` in
  `generator/components/`. Each renders one section (header, hero, services,
  location/hours, call-to-action banner, footer). The `document` component
  wraps all of them into a full HTML5 document (head, Google Fonts link,
  inlined `<style>` generated from the preset, body).
- `generator/lib/validate.js` checks a loaded config/preset against the
  required-field list before anything renders, throwing an `Error` whose
  message names the exact missing/invalid field path (e.g.
  `business.address.zip`). `build.js` catches this, prints it to stderr, and
  exits 1.
- `generator/lib/render.js` composes the components in a fixed order into
  the final document string.
- `generator/lib/css.js` and `generator/lib/google-fonts.js` turn a preset
  into an inline stylesheet and a Google Fonts `<link href>` respectively —
  the only external resource permitted in output.
- Build output: `build.js` writes into a fresh temp directory under
  `dist/.tmp/`, copies `configs/assets/<slug>/` into it if that directory
  exists (skipped silently if it doesn't — missing images never fail a
  build), then does `rm -rf dist/<slug>` + `rename(tmpDir, dist/<slug>)` so
  the final directory only ever appears complete or not at all.

## File map
```
generator/
  build.js                   CLI entry point
  lib/
    validate.js              required-field checks, config + preset
    render.js                assembles components into one document
    css.js                   preset -> inline <style> string
    google-fonts.js           preset -> Google Fonts <link> href
    html-escape.js            escapeHtml() used by every component
  components/
    document.js               full HTML5 shell (head/body wrapper)
    header.js                 business name + call button, top nav
    hero.js                   headline/subhead + primary CTA
    services.js               service list/grid
    location-hours.js         address, hours table, directions link
    cta-banner.js              full-width call-to-action band
    footer.js                 address/phone/hours summary + copyright
  presets/
    warm-modern.json          default preset used by Increment 1
configs/
  smoke-test.json             minimal config proving the pipeline end-to-end
  logic-nails.json            Logic Nails (Chandler, AZ) real site config
  assets/
    logic-nails/              image assets for Logic Nails (empty for now)
dist/                          generated output, gitignored
```

## Build sequence

### Increment 0 — generator skeleton + smoke test
Prove the pipeline end-to-end with the smallest possible surface:
- `generator/lib/validate.js`, `generator/lib/render.js`,
  `generator/lib/css.js`, `generator/lib/google-fonts.js`,
  `generator/lib/html-escape.js`.
- One component: `generator/components/document.js` (full page shell, empty
  body content is fine at this stage).
- One preset: `generator/presets/warm-modern.json`.
- `generator/build.js`: loads config + preset, validates both, renders,
  writes to temp dir, atomically moves into `dist/<slug>/`.
- `configs/smoke-test.json`: minimal valid config exercising every required
  field.
- Validation failure path is exercised (missing required field exits 1 and
  names the field).

### Increment 1 — full component set + Logic Nails site
- Remaining components: `header.js`, `hero.js`, `services.js`,
  `location-hours.js`, `cta-banner.js`, `footer.js`.
- `render.js` updated to assemble all components in order.
- `configs/logic-nails.json`: real config for Logic Nails, a nail salon at
  5025 S Gilbert Rd Suite 5, Chandler, AZ 85249. Services: manicures,
  pedicures, acrylic nails, waxing, lash extensions. CTA is call-first
  (`tel:` link) — no contact form, no booking widget.
- `configs/assets/logic-nails/` directory created (empty); no images
  fabricated or downloaded. Build must succeed with it empty.
- Verify `node generator/build.js configs/logic-nails.json` produces a
  complete `dist/logic-nails/index.html`.

## Out of scope for v1
- Multi-page sites (this generator produces exactly one page per config).
- A config/preset schema file or JSON-schema validation library — validation
  is hand-written field checks per the zero-dependency constraint.
- Image optimization, responsive `srcset`, or any asset pipeline beyond a
  plain recursive copy.
- A CLI flag surface beyond a single positional config-path argument.
- Analytics, forms, or any client-side JS in generated output.
- Booking/scheduling integration for Logic Nails: confirmed with the user
  that no live booking system exists today. This site is a call-first
  teaser; wiring up a real booking widget would be separate, paid follow-on
  work for the business, not part of v1.
- A second preset (only `warm-modern` ships in v1).
</content>
</invoke>
