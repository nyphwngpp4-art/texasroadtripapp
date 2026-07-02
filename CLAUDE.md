# agavi-site-scaffold — Config-Driven Spec-Site Generator

## What this is
An internal Agavi AI tool that turns a JSON config (business name, vertical, palette, copy blocks, contact info) into a complete, Cloudflare Pages-ready spec site. Purpose: compress every future spec-site from a day of hand-building to under an hour of config + review. This replaces the hand-built pattern used for Logic Nails, AAA Mobile Dog Grooming, and 81 Precision Machine — those three sites are the reference corpus for what the templates must be able to produce.

## Why this exists (design pressure)
Spec sites are Agavi's outreach wedge: build a site a prospect didn't ask for, show it, open the conversation. The economics only work if marginal cost per site is near zero. Every abstraction decision should be judged against: "does this make site #10 faster without making site #4 uglier?"

## Product intent (v1)
- One command / one action: config JSON in → deployable static site out
- 2 vertical templates in v1 (service-trade and one other, chosen from the reference corpus), architected so a third is additive, not a refactor
- Shared component library: hero, services grid, about, testimonials/social proof, CTA/contact, footer — composable per vertical
- Config schema documented well enough that a config can be drafted by an LLM from a prospect research brief
- Output must be indistinguishable in quality from the hand-built sites — this is a sales asset, not a demo

## OPEN ARCHITECTURE DECISIONS — resolve before writing PLAN.md
1. **Build-time vs runtime:** static generator script (emits plain HTML/CSS per site) vs single runtime app reading config. Default lean: build-time — output stays dependency-free, hostable anywhere, and matches the current hand-built deliverable.
2. **Generator stack:** Node script with a templating approach (which one), or plain string-template JS. Keep the toolchain minimal — this runs on a Mac mini, not CI.
3. **Template abstraction boundary:** what is per-vertical (section order, imagery style, copy tone) vs per-client (name, palette, copy, photos) vs fixed (grid, typography scale, component markup). Reverse-engineer this from the three reference sites before deciding.
4. **Repo-per-site vs monorepo output:** does the generator emit into a /dist per client for manual deploy, or scaffold a new repo per client?

Fable must resolve all four with the user and record decisions at the top of PLAN.md.

## Stack and constraints
- Generated sites: static HTML/CSS/JS only, no runtime framework, no build step required to serve. Tailwind decision belongs to Fable's planning pass (CDN vs compiled vs vanilla CSS) — judged on output quality and page weight.
- Generator tooling: Node.js acceptable; keep dependencies minimal and pinned.
- Deploy target for generated sites: Cloudflare Pages.
- Brand baseline: Agavi's own site (agaviai.com) uses an editorial cream/Newsreader design system — generated spec sites are client-branded, not Agavi-branded, but should carry the same level of typographic care.
- Mobile-first; spec sites get viewed on a prospect's phone during a call.

## Repo conventions
- Suggested layout (Fable may revise in PLAN.md): /templates (per-vertical), /components (shared), /configs (one JSON per client, gitignore real prospects if needed), /generator (build script), /docs (config schema reference), /dist (output, gitignored).
- Heavy comments in the generator and one fully-annotated example config committed as /configs/example.json.
- Commit style: short imperative subject; body explains why if non-obvious.

## Workflow (multi-model)
- Claude Fable (Mythos-class model) resolves the four open decisions, then writes PLAN.md and ACCEPTANCE.md before any code. The template abstraction (decision 3) is the highest-stakes call in this repo — getting it wrong means a rebuild when vertical #3 arrives.
- Claude Sonnet implements against PLAN.md incrementally.
- Fable reviews diffs against ACCEPTANCE.md; verdicts appended to ## Review log at the bottom of ACCEPTANCE.md.
- No scope expansion beyond PLAN.md without asking the user.

## Definition of done (v1)
A new config JSON for a fictional business in a supported vertical produces a deploy-ready site in under 10 minutes of human effort, and that site would pass as hand-built next to Logic Nails / AAA / 81 Precision. All ACCEPTANCE.md items pass.
