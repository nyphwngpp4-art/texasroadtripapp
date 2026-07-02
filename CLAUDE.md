# texasroadtripapp — Trip Tracker

## What this is
A family road-trip tracker for a month-long Texas trip (Chandler, AZ → Lake Brownwood, TX and back, plus side trips). Users: two parents, two daughters. Primary device: phones in the car.

## Product intent (v1)
- Route milestones and "are we there yet" progress bar tied to waypoints
- Stop log: where we stopped, when, notes, star rating per family member
- Sightings/moments log (photo-optional, text-first)
- Fast to use one-handed in a moving car

## Stack and constraints
- Vanilla HTML/CSS/JS. Tailwind via CDN. No build step, no framework.
- Deploy target: Cloudflare Pages (static). Keep everything servable as static files.
- Persistence: localStorage for v1. JSON export/import so data survives device swaps.
- Mobile-first. Large touch targets. Must work offline (no runtime API dependencies).

## Repo conventions
- `index.html` is the entry point. Split JS into modules under `/js` (e.g. `state.js`, `ui.js`, `data.js`) — no single 2,000-line file.
- Trip data (waypoints, milestones) lives in `/data` as JSON, never hardcoded in logic.
- Heavy comments on state shape and any non-obvious logic. Assume a competent human will hand-edit data files.
- Commit style: short imperative subject, body explains why if non-obvious.

## Workflow (multi-model)
- Claude Fable (Mythos-class model) writes PLAN.md and ACCEPTANCE.md before any code is written, interrogating the user on requirements first.
- Claude Sonnet implements against PLAN.md in small increments, checking off acceptance criteria as it goes.
- Fable reviews diffs against ACCEPTANCE.md before anything is considered done. Review verdicts go in a `## Review log` section at the bottom of ACCEPTANCE.md.
- Neither model expands scope beyond PLAN.md without asking the user.

## Definition of done (v1)
Every item in ACCEPTANCE.md passes on a real phone browser, offline, with data surviving a page reload.
