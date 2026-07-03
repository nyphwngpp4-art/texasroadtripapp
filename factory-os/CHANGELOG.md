# FORGELINE OS — Changelog

Semver: patch = wording/template tweaks · minor = decision-rule/threshold changes · major = station added/removed.
Every entry records: what changed, which metric it should move, and the review date to check whether it did.

## 2.0.0 — 2026-07-03
- Initial FORGELINE release, superseding the unnamed v1 build-first factory.
- Core inversion: pull-based Demand Tickets; no build slot opens without an external event (or LEVER baseline).
- Stations 0–7 + Factory Retro defined; agent roster (Gatekeeper, Producer, Builder, Examiner, Packager, Herald, Auditor).
- Metric expected to move: external pull events/month (from ~0 baseline) and orphaned-asset count (from 3+).
- Review date: 2026-08-03 (first Auditor retro).
