# agavi-site-scaffold — Local-business site generator

## What this is
A static-site generator for small local-business marketing sites (one page per
business, e.g. a nail salon, a barbershop, a taco stand). Each site is
described by a JSON config; a set of reusable components render that config
into a single static HTML page. Output must be indistinguishable from a
hand-built site — this is a production tool, not a demo.

## Stack and constraints (binding — do not relitigate)
- Zero npm dependencies. Node >=20 built-ins only (`node:fs`, `node:path`,
  `node:os`). No `package.json` dependencies section, no Tailwind in any
  form, no CDN `<script>` tags anywhere in generated output.
- The Google Fonts `<link>` is the *only* permitted external resource in
  generated output. No other remote scripts, styles, iframes, or fonts.
- Components are plain JS functions with the signature
  `(config, preset) => htmlString`. No classes, no framework, no JSX.
- The generator itself has no build step — it's run directly with `node`.
- No half-written output: every build writes to a temp directory first and
  only moves it into place (`dist/<slug>/`) once it's complete.
- Config validation failures must exit non-zero and name the specific
  missing or invalid field (e.g. `business.phone`), not just "invalid
  config".
- Heavy comments in the generator code: state shape, config schema, and any
  non-obvious logic. Assume a competent human will hand-edit config and
  preset JSON files without reading the generator source.

## Repo conventions
- `generator/build.js` is the CLI entry point.
- `generator/lib/` holds validation, rendering, and CSS/font helpers.
- `generator/components/` holds the plain-function components.
- `generator/presets/` holds visual presets (colors, fonts) as JSON.
- `configs/<slug>.json` is one business's site config. `configs/assets/<slug>/`
  holds that business's images, if any exist yet — a missing or empty assets
  directory must never fail the build.
- `dist/` is generated output; it is not committed.
- Commit style: short imperative subject, body explains why if non-obvious.

## Workflow (multi-model)
- Claude Fable (Mythos-class model) writes PLAN.md and ACCEPTANCE.md before
  any code is written, interrogating the user on requirements first.
- Claude Sonnet implements against PLAN.md in small increments, checking off
  acceptance criteria as it goes.
- Fable reviews diffs against ACCEPTANCE.md before anything is considered
  done. Review verdicts go in a `## Review log` section at the bottom of
  ACCEPTANCE.md.
- Neither model expands scope beyond PLAN.md without asking the user.

## Definition of done (v1)
Every item in ACCEPTANCE.md passes: `node generator/build.js <config>` exits
0 and produces a valid, complete `dist/<slug>/index.html`, or exits non-zero
naming the bad field.
</content>
</invoke>
