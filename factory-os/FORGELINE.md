# FORGELINE — A Demand-Locked Factory

**OS version:** 2.0.0 (supersedes the unnamed v1 "build-first" factory)
**Owner:** Justin / Agavi
**Purpose:** Turn ideas into client-deployed, revenue-generating skills, agents, and sites — where *shipping to an external human is the structural default*, not an act of willpower.

---

## Part 1 — Audit of the current system (v1)

### 1.1 The v1 pipeline as it actually runs

```
[Idea: client talk / personal friction / inspiration]
        │  (no gate — enthusiasm is the filter)
        ▼
[Build: Claude architecture → Ollama iteration → n8n integration]
        │  (strong loop — PLAN/ACCEPTANCE pattern where used)
        ▼
[Working prototype / finished site]
        │
        ▼   ← THE CLIFF: no artifact, agent, or trigger exists past this point
[nothing: no pitch, no package, no pilot, no telemetry, no revenue]
```

Evidence: one live client site (81 Precision), **three finished sites never pitched**, ~6 internal tools (BOK Portfolio Radar, Call Prep, schedule-organizer, agavi-ai-growth-engine, skill-creator) that reached "works for me" and stopped. Even this repo demonstrates the pattern: the only quality gates in it (PLAN.md, ACCEPTANCE.md) govern code correctness. Nothing anywhere asks "who pulls this, and when do they see it?"

### 1.2 Real strengths (keep these)

1. **Fast idea→prototype cycle.** Genuinely rare. Do not slow it down; redirect it.
2. **The PLAN/ACCEPTANCE multi-model pattern.** Interrogate-then-plan (Fable), implement-in-increments (Sonnet), review-against-criteria (Fable) is a real gate that works. v1's mistake is deploying it only downstream, on code.
3. **Proven production capability.** 81 Precision proves the full path exists.
4. **Real infrastructure.** n8n, Claude (Fable + Sonnet), Gmail/Calendar, Obsidian — a factory-grade toolchain currently used only *inside products*, never *on the factory itself*.

### 1.3 Root-cause diagnosis (challenging the brain dump)

The brain dump asks for "a stronger filter or scoring system before investing build time." **That is the wrong fix, and it would fail.** Four challenges:

**Challenge 1 — The problem is sequencing, not filtering.**
The three unpitched sites are not filtering failures; they are *spec work* — built before any buyer existed, in the hope of pitching later. A scoring rubric applied by the same person who wants to build the thing is self-graded homework: you will score what excites you a 9. The only honest score for a client idea is **an external human's calendar**. The fix is inverting the sequence (pitch-shaped artifact first, build second), not scoring the queue harder.

**Challenge 2 — Building is the reward; every later stage is punishment.**
The v1 loop optimizes for the dopamine of a working prototype. Pitching carries rejection risk, packaging is chores, follow-up is boring. Any redesign that adds validation as *willpower checkpoints* ("remember to validate before building") will be routed around within a month. Gates must be **structural**: the build literally cannot open because the token required to open it can only be minted by an external event.

**Challenge 3 — "No validation steps" is misstated.**
v1 has excellent validation — for code (ACCEPTANCE.md, manual testing, review logs). What's missing is a *different loop entirely*: demand validation. These use different muscles, and automation in v1 is aimed at the strong muscle (building) instead of the weak one (pitching). The redesign points the automation at the avoided step: **the factory drafts the pitch and reduces the operator's job to one tap.**

**Challenge 4 — The three sites are inventory, not sunk cost.**
v1 accounting treats them as embarrassing dead weight. They are finished goods sitting in a warehouse with no sales channel. The redesign's *first output* should be revenue motion on existing inventory — not new process documents.

### 1.4 Hidden weaknesses, enumerated

| # | Weakness | Consequence |
|---|----------|-------------|
| W1 | No demand artifact anywhere in the pipeline | Spec work by default; 3 orphaned sites |
| W2 | "Works for me" is a terminal state | Internal tools never cross to pilots/revenue |
| W3 | Operator is the sole pitching engine — and the role is unstaffed | Single point of failure at exactly the weakest muscle |
| W4 | No inventory ledger | Finished assets invisible; nothing forces a decision on them |
| W5 | No WIP limit | New builds always available as escape hatch from pitching |
| W6 | Only the inner feedback loop exists (does the code work?) | Middle loop (does anyone want it?) and outer loop (is the factory improving?) never fire |
| W7 | n8n/Ollama automate products, never the factory | Stalls are undetected; follow-ups don't happen; the factory is artisanal |
| W8 | Docs written (inconsistently) at the end | Obsidian reuse is unreliable; components get rebuilt |
| W9 | No packaging standard | "Done" varies per build; nothing is client-handable without fresh work |
| W10 | Killing has no ritual or output | Zombie projects accumulate; sunk cost never converts to anything |

### 1.5 Where output quality varies and why

- **Client sites:** quality high at build, zero at delivery — because delivery has no defined artifact set (proposal, price, handoff runbook).
- **Internal tools:** quality varies with mood because there is no external DoD; a tool is "done" when interest fades.
- **Documentation:** varies because it is an output (written when energy is lowest) rather than an input (required to start).

---

## Part 2 — The redesigned system: FORGELINE

### 2.0 The core inversion

v1 is a **push factory**: ideas are pushed into builds, builds pile up as inventory.
FORGELINE is a **pull factory**: a build slot can only be opened by a **Demand Ticket** — a token minted exclusively by an external event (a scheduled conversation, a written expression of interest, money) or, for internal tools, a measured baseline of the factory metric the tool will improve. No ticket, no build. The gate is structural, not motivational.

Everything else in the design serves that inversion, plus one meta-principle: **the factory's own automation (n8n, scheduled Claude sessions, Gmail) is aimed at the operator's weakest muscle — outreach, follow-up, and forced decisions — not the strongest one.**

### 2.1 Lifecycle states

```
SPARK ──► PROOF ──► PULL ──► BUILD ──► PACKAGE ──► PILOT ──► PRODUCTION ──► HARVEST
   │         │        │                                          │
   └► PARK   └► PARK  └► PARK                                    └► KILL (with Kill Note)
```

Every transition right of SPARK requires an **external event**, never internal completion. "The code works" promotes nothing.

### 2.2 The two tracks

- **CLIENT track:** anything meant to be sold or piloted (sites, client agents, skills-as-service).
- **LEVER track:** internal tools. A LEVER build ticket requires naming **which factory metric it improves** (see §4) and a baseline measurement of that metric. An internal tool that can't name its metric is a hobby — it goes to the Conviction Slot (§2.9) or PARK. *This closes the escape hatch where "internal tooling" becomes avoidance of client work.*

### 2.3 Station map

#### Station 0 — THE LEDGERS (memory substrate; always on)

Two folders of markdown notes with strict YAML frontmatter (schema in `templates/LEDGER-SCHEMA.md`), living **in the factory-os git repo** (`ledger/demand/`, `ledger/assets/`) so scheduled Claude sessions and n8n can both read and write them; mirror into Obsidian if you want the graph view:

- **Demand Ledger:** every prospect, conversation, signal, expression of interest. Entries are minted from SPARK capture or calendar events.
- **Asset Ledger:** every build, its lifecycle state, its linked demand entries, its harvested components.

**The reconciliation invariant:** every Asset must link ≥1 Demand entry; every warm Demand entry should link an Asset or a next action. A weekly n8n job (Sunday night) diffs the two ledgers and produces the **Orphan Report**:
- *Orphaned assets* (built, no demand link) — after 7 days: Herald escalation (§2.4); after 21 days: forced trichotomy — **pitch it this week, package it as content, or kill it with a Kill Note.** No fourth option.
- *Starved demand* (warm signal, no asset/action) — surfaced as the week's highest-priority work.

This is the factory's balance sheet. It is what makes the three-unpitched-sites failure mode *impossible to not see*.

- **Tools:** weekly scheduled Claude session or n8n cron (ledger diff), Sonnet (digest drafting), git repo (storage), **the Monday email** (delivery — one email to yourself, Sunday night, containing the Orphan Report and the Monday number).

#### Station 1 — INTAKE (Gatekeeper agent)

- **Input:** raw idea, captured in ≤30 seconds by emailing yourself with subject `SPARK: <idea>` (auto-labeled in Gmail), or dropping a note in `ledger/inbox/`.
- **Process:** a Sonnet-powered Gatekeeper (scheduled Claude session or n8n workflow; this is triage, not judgment) replies to the SPARK email with exactly three questions:
  1. Who is the named human who would use or buy this? (A segment — "plumbers" — is not a name.)
  2. What would they do differently in the week after getting it?
  3. CLIENT or LEVER? If LEVER: which factory metric, and what's today's baseline?
- **Output:** a SPARK entry in the Demand Ledger. Unanswerable question 1 → auto-PARK (parked, not dead; a name can arrive later and revive it).
- **Decision rule:** a healthy gate **kills or parks ≥50% of sparks**. If everything passes, the gate is theater.
- **Quality bar:** capture-to-triaged in under 5 minutes, entirely from the phone.

#### Station 2 — PROOF (the Sales Prototype)

The single biggest structural change to daily work. For CLIENT sparks that pass intake, the *first buildable artifact is not the product* — it is a **Sales Prototype**, hard-budgeted at **4 hours**:
- a 2–3 minute Loom-style demo (screen recording over a mock or thin slice),
- a one-pager: problem, what it does, pilot price, 14-day pilot offer,
- optionally a fake-door demo (clickable shell, canned data).

- **The 72-hour rule:** a completed Proof must be **in front of a named external human within 72 hours** of completion, or it auto-orphans and the Herald starts escalating. This converts "momentum drop after prototype" from a silent failure into a loud one.
- **Tools:** Fable drafts the one-pager and demo script (high-stakes persuasion writing); Sonnet builds the fake door; the existing site-scaffold pattern (this repo) becomes the fake-door template.
- **Redirects the build dopamine:** you still get to build something in hours — but the thing you build is inherently pitch-shaped and expires if unshown.

#### Station 3 — PULL GATE (mints Demand Tickets)

- **Input:** a shown Proof.
- **A Demand Ticket is minted by exactly one of:**
  - **(a)** a scheduled follow-up conversation on the Google Calendar (the calendar is the source of truth — a vague "sounds cool" in a hallway mints nothing);
  - **(b)** a written expression of interest (email/text/DM, pasted into the Demand Ledger);
  - **(c)** money or a signed pilot agreement (skips straight to BUILD with priority);
  - **(d)** LEVER track: metric named + baseline measured (from Station 1).
- **Decision rule:** no ticket within 14 days of showing → PARK the spark, log the outcome against the Proof (this trains the Gatekeeper's scoring over time). Parked ≠ failed: the Proof and one-pager are permanent sales inventory.
- **Expected economics:** most Proofs die here. That is the point — they die at 4 hours of cost instead of 40.

#### Station 4 — BUILD CELL (WIP-locked)

- **Hard WIP limit: 2 slots** — at most 1 CLIENT + 1 LEVER, or 2 CLIENT. A third build cannot open until a slot clears. Enforced socially by the ledger and mechanically by the Herald (a `/spark` promoted while slots are full goes to a ranked queue, not to work).
- **Process:** the existing multi-model pattern, generalized and extended **upstream**:
  1. **DEMAND.md** (new, template provided) — copied from the ledger: who pulled this, what they said, pilot terms, the date of the scheduled next conversation. *Sits above PLAN.md in every repo. A repo without a DEMAND.md is by definition a Conviction Slot build.*
  2. **PLAN.md** — Fable, after interrogating requirements (existing pattern).
  3. **ACCEPTANCE.md** — Fable; every criterion pass/fail testable (existing pattern). **New mandatory criteria in every build:** telemetry hook present (§ Station 6), Pilot Kit complete (§ Station 5).
  4. **Implementation** — Sonnet in small increments, checking off criteria.
  5. **Review** — Fable reviews diffs against ACCEPTANCE.md; verdicts in the Review log (existing pattern).
- **Quality bar:** build scoped to *pilot-sized*, not product-sized — the smallest thing that honors the Demand Ticket. Target ≤2 weeks per slot.

#### Station 5 — PACKAGE (the Pilot Kit)

"Done" is redefined: **a build is done when its Pilot Kit exists**, not when the code works. The Pilot Kit (template provided) is four artifacts:
1. **Demo script** — the 10-minute walkthrough you'd give the client.
2. **Pricing one-pager** — pilot price, production price, what's included.
3. **Deploy/handoff runbook** — how it gets into *their* environment (or hosted for them), written for a stranger.
4. **Telemetry plan** — what the embedded ping measures and what "the pilot worked" means, as a number, agreed before the pilot starts.

- **Tools:** Fable drafts 1–2 (persuasion), Sonnet drafts 3–4 from the repo, Packager checklist enforced as ACCEPTANCE criteria.
- **Why this matters:** W9 dies here. Every finished build is permanently one-conversation away from a pilot — including retroactively packaging the three existing sites (see migration).

#### Station 6 — DEPLOY & INSTRUMENT

- Every deployed skill/agent/site embeds a **lightweight telemetry ping** — an n8n webhook hit on meaningful use (form submit, agent run, workflow completion). No dashboards required in v1: a scheduled Sonnet job summarizes pings into one line per active pilot in the Monday email ("81P site: 4 form submits this week").
- **Pilot protocol:** 14-day window; the **end-of-pilot call is booked on day 0** (the calendar again as commitment device); the success number from the Telemetry plan is the agenda.
- **Decision rule at pilot end:** convert to paid production, extend once (max once), or kill with a Kill Note. Silence from the client for 7 days past pilot end = kill, politely.

#### Station 7 — HARVEST / KILL

Both are first-class *outputs*, not aftermaths:
- **HARVEST (on success):** (a) case study written within 7 days while fresh — feeds the future content pipeline and the next pitch; (b) **component harvest** — reusable prompts, n8n subflows, scaffold pieces extracted into a Component Registry note in Obsidian with a one-line "when to reuse" trigger. Reuse rate becomes measurable (§4).
- **KILL (on failure/park-timeout):** a **Kill Note** (template provided): what was built, what the demand signal was, why it died, what was harvested, what would revive it. 15 minutes, cathartic, and it converts sunk cost into (a) registry components and (b) raw material for build-in-public content. Zombie projects become structurally impossible: everything is in a named state, and PARK/KILL are respectable states.

#### Meta-Station — FACTORY RETRO (the outer loop)

- **Monthly, 45 minutes, run as a Fable session** with three inputs: the month's Orphan Reports, the metrics table (§4), and the ledgers. Fable's job is adversarial: *find where the factory was routed around this month* (gates skipped, tickets back-dated, WIP violated) and propose ≤2 OS changes.
- Accepted changes are committed to the factory-os repo with a CHANGELOG entry and a version bump (semver: gate changes = minor, station changes = major). **The OS itself is a versioned artifact under the same review discipline as the code it produces.**

### 2.4 The agent roster (roles as staffed positions)

v1's SPOF (W3) is that "salesperson" and "operations manager" are unstaffed roles. FORGELINE staffs them with agents:

| Agent | Role | Model / runtime | Trigger |
|---|---|---|---|
| **Gatekeeper** | Intake triage, 3-question interrogation, PARK routing | Sonnet — scheduled Claude session or n8n | new `SPARK:` email / inbox note |
| **Producer** | DEMAND.md interrogation, PLAN.md, ACCEPTANCE.md | Fable (interactive session) | Demand Ticket minted |
| **Builder** | Implementation in increments | Sonnet | PLAN.md exists |
| **Examiner** | Diff review vs ACCEPTANCE.md, review log | Fable | PR / increment complete |
| **Packager** | Pilot Kit assembly, checklist enforcement | Sonnet drafts, Fable polishes persuasion pieces | Build passes review |
| **Herald** | *The anti-stall daemon.* Watches ledgers + repo heartbeats; on stall, **writes the actual pitch/follow-up as a ready-to-send Gmail draft** in your Drafts folder — approval is pressing Send | n8n cron / scheduled Claude session + Sonnet drafting, Fable for high-stakes drafts | 72-hour rule, orphan rules, pilot-end silence |
| **Auditor** | Monthly retro, gate-evasion detection, OS change proposals | Fable | Monthly cron |

The Herald is the keystone. Note the asymmetry with v1: the automation does the *emotionally expensive* work (writing the outreach message, remembering the follow-up) and leaves the human a binary act. Activation energy for pitching drops from "compose a pitch from scratch while feeling awkward" to "open Drafts, press Send."

### 2.5 Tool/model assignment doctrine

- **Claude Sonnet (API / scheduled sessions):** everything high-frequency and low-stakes on a schedule — intake triage, telemetry digests, ledger diffs, first-draft nudges — plus implementation volume and mechanical drafting (runbooks, telemetry wiring). At factory volumes (a few dozen calls/week) the cost is trivial; do not re-add local-model complexity to save pennies.
- **Claude Fable/Mythos:** everything where judgment or persuasion quality compounds — requirement interrogation, plans, acceptance criteria, diff review, client-facing pitch/one-pager drafts, monthly retro. Low frequency, high stakes.
- **n8n + scheduled Claude sessions:** the factory's nervous system — every cron, webhook, heartbeat, and ledger job. Rule of thumb: *any process step described with "remember to" must become a trigger.* Prefer a scheduled Claude session when the job reads/writes the ledger repo or drafts prose; prefer n8n when it's webhooks and glue.
- **Gmail:** the factory's control surface. Sparks go in as `SPARK:` self-emails; the Monday email brings the Orphan Report, the Monday number, and telemetry digests out; and the Herald's outreach lands as **pre-written drafts in the Drafts folder** — approval is pressing Send.
- **Git repo (factory-os):** system of record — ledgers, registry, kill notes, the OS itself — with machine-parseable frontmatter. Mirror to Obsidian for browsing if desired.
- **Google Calendar:** the demand oracle. A conversation exists iff it is on the calendar (a Calendly link in every outreach email is how prospects mint Demand Tickets themselves). Automation reads it to verify tickets and pilot-end calls.

### 2.6 The Conviction Slot (pressure valve)

One build per month may bypass the Pull Gate entirely — pure exploration, no demand artifact. Two conditions: it occupies a normal WIP slot, and **it must ship publicly within 14 days** (repo + demo post/video). Exploration stays alive but is converted from private inventory accumulation into demand generation (public work mints inbound Demand Ledger entries). This is the honest home for things like the road-trip app.

---

## Part 3 — Implementation & migration plan

Ordered so that **revenue motion precedes process construction**, every step is additive (nothing to roll back destructively), and each step validates before the next begins.

### Phase 0 (Week 1) — Reconcile existing inventory. No new builds.
1. Backfill the **Asset Ledger**: the 3 unpitched sites + all internal tools, each with an honest state.
2. Backfill the **Demand Ledger**: every warm human from client conversations, BOK contacts, 81 Precision adjacents.
3. Run the trichotomy on each of the 3 sites *this week*: pitch, package-as-content, or Kill Note. **Success test for the entire redesign: at least one of the three sites is in front of a named human within 7 days.** If the OS can't move existing finished inventory, it won't move future inventory.

### Phase 1 (Weeks 1–2) — Herald v0. *Build the weakest-muscle automation first.*
- Weekly scheduled Claude session (or n8n cron): ledger diff → Orphan Report → the Monday email.
- Sonnet/Fable: pitch-draft-on-stall, delivered as ready-to-send Gmail drafts.
- **Validation:** the Herald successfully causes ≥1 outreach message to be sent that would not otherwise have been sent. That single event proves the core thesis.
- **Rollback:** it's a notifier — disable the cron.

### Phase 2 (Weeks 2–3) — Gatekeeper + the Demand Ticket rule goes live.
- `SPARK:` self-email (or `ledger/inbox/` note) → Sonnet triage → Demand Ledger entry.
- From here on: **no new repo without a DEMAND.md** (or explicit Conviction Slot label).
- **Validation:** 2 weeks of sparks captured; ≥50% parked at gate without resentment.
- **Rollback risk & mitigation:** if the gate kills all momentum and building stops entirely, that signals the gate is too heavy — the documented fallback is widening the Conviction Slot to 2/month, *not* removing the gate.

### Phase 3 (Weeks 3–4) — PROOF station + Pilot Kit standard.
- Turn this scaffold repo into the fake-door/Proof template (DEMAND.md added above PLAN.md).
- Write the Pilot Kit for **81 Precision retroactively** — it's live, so it's the cheapest place to prove the packaging standard and telemetry ping (Phase 3.5: first telemetry webhook on the 81P site).
- **Validation:** one full Proof produced in ≤4 hours and shown within 72 hours.

### Phase 4 (Week 5+) — Full loop + first Retro.
- First monthly Auditor retro; OS bumped to 2.1.0 with whatever the month taught.
- Component Registry seeded from the harvest of Phases 0–3.

**Global rollback posture:** FORGELINE is a set of additive gates and daemons around the existing (kept) build loop. Any single mechanism can be disabled independently. The only rule that must never be rolled back silently is the Demand Ticket — if it's removed, that removal must appear in the CHANGELOG with a reason (the Auditor checks).

---

## Part 4 — Metrics

### North star
**External pull events per month** — meetings booked + written interest + pilots started + invoices sent. (Not builds completed. Builds completed was v1's implicit north star and it produced a warehouse.)

### Leading indicators (weekly, auto-collected by n8n where possible)
| Metric | Target | Source |
|---|---|---|
| Pitch latency (proof/prototype ready → first external showing) | ≤72h | Ledger timestamps |
| Time-to-proof (spark passes gate → proof shown) | ≤5 days | Ledger |
| Orphaned assets count | trending → 0 | Orphan Report |
| Gate kill/park rate | ≥50% of sparks | Gatekeeper log |
| Proof → Demand Ticket conversion | measure, then baseline | Ledger |
| Herald drafts: drafted → sent rate | ≥60% sent or edited-and-sent | Gmail Drafts vs Sent |
| WIP compliance (builds open ≤2) | 100% | Ledger |

### Lagging indicators (monthly)
| Metric | Meaning |
|---|---|
| Pilot → paid conversion | Is the packaging honest? |
| Revenue per month vs. W2 replacement target | The actual goal |
| Reuse rate (% of new builds using ≥2 registry components) | Compounding |
| LEVER ROI (metric improvement vs. baseline per internal tool) | Are internal tools levers or hobbies? |
| Kill Notes written / zombies existing | Hygiene (zombies should be 0 by definition) |
| OS changelog entries + retro completion | Is the outer loop alive? |

### The one-number weekly check
If only one thing is glanced at: **days since the last external human saw something new from the factory.** This number tops the Monday email. It should never exceed 7.

---

## Part 5 — Continuous improvement & OS versioning

- The OS lives in a `factory-os` repo (this document + templates + CHANGELOG).
- **Semver:** patch = wording/template tweaks; minor = decision-rule or threshold changes; major = station added/removed.
- **Monthly Auditor retro (Fable):** adversarial by charter — its first question is always "where was the OS routed around this month?" Gate evasion (builds without tickets, back-dated demand entries, WIP>2) is the primary failure signal, because evasion marks exactly where the OS fights the operator's nature and needs redesign rather than more discipline.
- **≤2 changes per retro.** An OS that changes faster than monthly is itself a build-avoidance hobby.
- Every change entry records: what changed, which metric it is expected to move, and the review date to check whether it did.

---

## Part 6 — Next connected operating systems

1. **Client Delivery & Pilot Operations OS (next, and urgent).** FORGELINE is designed to start producing pilots within weeks — and there is currently nothing to catch them: no onboarding sequence, support channel norms, invoicing rhythm, or production-hosting standard. The Pilot Kit's runbook is the seam where the two systems will join. Redesign this second, before pilot #2 exists, or FORGELINE's output becomes the next cliff.
2. **Proof-of-Work Content Pipeline (after that).** FORGELINE already manufactures its raw material as by-products: Kill Notes, case studies, Conviction Slot public ships, Proof demos. A thin pipeline (Fable rewrite → post → inbound routed to the Demand Ledger) turns the factory's exhaust into its fuel — inbound demand mints Demand Tickets, which is the single most compounding loop available.
3. *(Later)* **Build Lab Orchestration OS** (model routing, eval harness, scheduled-session fleet). Deliberately third: it improves build speed, which is already the strongest link. Optimizing it first would be v1 behavior — polishing the fun part.

---

*Companion templates: `templates/DEMAND.md`, `templates/PILOT-KIT.md`, `templates/KILL-NOTE.md`, `templates/LEDGER-SCHEMA.md`.*
