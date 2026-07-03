# ACCEPTANCE CRITERIA

_See PLAN.md's note on this document's history: written directly by Sonnet
from the assignment brief, in the absence of a prior Fable interrogation
pass. Fable should treat these criteria themselves as reviewable, not just
the implementation against them._

## A-block — Increment 0 (generator skeleton + smoke test)
- A1. `node generator/build.js configs/smoke-test.json` exits 0.
- A2. After A1, `dist/smoke-test/index.html` exists and is a complete,
  well-formed HTML5 document (`<!doctype html>` ... `</html>`).
- A3. The rendered document contains exactly one `<link>` to
  `fonts.googleapis.com` and no other cross-origin `<script>`, `<link>`,
  or `<iframe>` tag.
- A4. Removing a required field from a copy of `configs/smoke-test.json`
  (e.g. `business.phone`) and running the build against that copy exits
  non-zero and prints an error naming that exact field path.
- A5. Running the build twice in a row succeeds both times and leaves
  `dist/smoke-test/` fully intact after the second run (no leftover partial
  state from run 1, no leftover temp directories under `dist/.tmp/`).
- A6. `generator/`, `configs/`, `dist/` contain no `node_modules`, no
  `package.json` with a `dependencies` or `devDependencies` key, and no file
  importing a package via `require`/`import` other than Node built-ins
  (`node:fs`, `node:path`, `node:os`).

## B-block — Increment 1 (full component set + Logic Nails site)
- B1. `node generator/build.js configs/logic-nails.json` exits 0 with
  `configs/assets/logic-nails/` present but empty.
- B2. `dist/logic-nails/index.html` contains the business name, the phone
  number as both display text and a `tel:` link, the full street address,
  and at least one heading per service (manicures, pedicures, acrylic
  nails, waxing, lash extensions).
- B3. The primary call-to-action in the hero and in the CTA banner is a
  `tel:` link — no `<form>` element and no booking-widget markup appears
  anywhere in the output.
- B4. Hours are rendered as a table or list, not a single unlabeled string.
- B5. Deleting `configs/assets/logic-nails/` entirely (no directory at all)
  and rebuilding still exits 0 and produces the same `index.html`.
- B6. The generated copy reads as a real business's site (specific to
  Logic Nails, its address, and its services) — not placeholder/lorem-ipsum
  text and not obviously templated boilerplate.

## Review log
_(Fable appends review verdicts here: date, diff reviewed, pass/fail per
criterion, required fixes.)_
</content>
</invoke>
