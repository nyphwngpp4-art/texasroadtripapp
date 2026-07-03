# The Ledgers

System of record for FORGELINE. Machine-parseable frontmatter (contracts in `../templates/LEDGER-SCHEMA.md`).

- `assets/` — one note per build, in a named lifecycle state. `linked_demand: []` means ORPHAN.
- `demand/` — one note per prospect/signal. Warm entries must always carry a `next_action` + date.
- `inbox/` — raw sparks awaiting Gatekeeper triage. Should be empty most of the time.

Weekly reconciliation (the Monday email) diffs `assets/` against `demand/`:
orphaned assets escalate at 7 days, hit the forced pitch/package/kill trichotomy at 21 days.

The three site stubs in `assets/` are pre-filled as ORPHANS on purpose — the clock on them is already running. Rename the files to the real business slugs and fill in the TODOs.
