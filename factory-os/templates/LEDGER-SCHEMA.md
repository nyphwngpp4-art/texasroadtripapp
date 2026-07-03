# LEDGER SCHEMA — Obsidian frontmatter contracts

_One note per entry. YAML frontmatter is the machine contract: n8n parses these fields for the weekly Orphan Report, heartbeats, and the Monday number. Prose below the frontmatter is for humans._

## Demand Ledger entry (`ledger/demand/<slug>.md`)

```yaml
---
type: demand
id: dem-2026-07-brownwood-hvac        # dem-YYYY-MM-slug
person: ""                             # named human — required; a segment is not a name
org: ""
source: client-talk | referral | inbound | bok | outreach
signal: spark | conversation | written-interest | money
signal_evidence: ""                    # calendar event link, pasted quote, invoice #
warmth: hot | warm | cold | parked
linked_assets: []                      # asset ids
next_action: ""                        # required while warmth != cold/parked
next_action_date:                      # Herald escalates when this passes
created:
updated:
---
```

## Asset Ledger entry (`ledger/assets/<slug>.md`)

```yaml
---
type: asset
id: ast-2026-07-81p-site               # ast-YYYY-MM-slug
track: client | lever | conviction
state: spark | proof | pull | build | package | pilot | production | harvest | parked | killed
repo: ""                               # git URL
linked_demand: []                      # demand ids — EMPTY = ORPHAN (Orphan Report flags this)
demand_ticket: none | scheduled-conversation | written-interest | money | lever-baseline
proof_shown_date:                      # 72-hour rule measured from proof completion
pilot_start:
pilot_end:
success_number: ""                     # from DEMAND.md / Pilot Kit
telemetry_webhook: ""                  # n8n webhook URL, if deployed
components_harvested: []               # registry note links
last_external_event:                   # date any outside human last saw/used this — the stall clock
created:
updated:
---
```

## n8n contracts built on these fields

| Job | Cadence | Reads | Emits |
|---|---|---|---|
| Orphan Report | Sun night | assets where `linked_demand` empty or `last_external_event` > 7d | Telegram report; 21d → forced pitch/package/kill trichotomy |
| Starved-demand check | Sun night | demand where warmth ∈ {hot,warm} and `next_action_date` passed | Telegram, top of week's priorities |
| The Monday number | Mon morning | max(`last_external_event`) across all assets | one line: "N days since an external human saw something new" |
| Heartbeat | daily | repos of assets in `state: build` with no commits 5d | Herald nudge |
| Pilot watch | daily | assets in `state: pilot` past `pilot_end` + 7d silence | Herald drafts the polite kill/convert message |
