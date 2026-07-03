# FORGELINE OS — Changelog

Semver: patch = wording/template tweaks · minor = decision-rule/threshold changes · major = station added/removed.
Every entry records: what changed, which metric it should move, and the review date to check whether it did.

## 2.1.0 — 2026-07-03
- Tool swap per operator feedback: Ollama retired — Sonnet handles all daemon/triage work (cost trivial at factory volume). Telegram retired — Gmail is the control surface: `SPARK:` self-emails in, the Monday email out, Herald outreach as ready-to-send Gmail drafts.
- Ledgers moved from Obsidian-only to the factory-os git repo (`ledger/`), so scheduled Claude sessions can read/write them; Obsidian becomes an optional mirror.
- Added `playbooks/SITE-OUTREACH.md` (remote outreach for the three pre-built sites) and seeded `ledger/assets/` with the three sites as tracked orphans.
- Metric expected to move: orphaned-asset count (3 → 0) and first external pull events. Review: 2026-08-03 retro.

## 2.0.0 — 2026-07-03
- Initial FORGELINE release, superseding the unnamed v1 build-first factory.
- Core inversion: pull-based Demand Tickets; no build slot opens without an external event (or LEVER baseline).
- Stations 0–7 + Factory Retro defined; agent roster (Gatekeeper, Producer, Builder, Examiner, Packager, Herald, Auditor).
- Metric expected to move: external pull events/month (from ~0 baseline) and orphaned-asset count (from 3+).
- Review date: 2026-08-03 (first Auditor retro).
