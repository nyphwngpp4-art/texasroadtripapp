# PLAYBOOK — Remote outreach for a pre-built site

_For the three finished, unpitched sites (and any future Proof). This is a fully remote motion: the deliverable is a URL, the delivery is a URL, and the pull event is a reply or a booked call. Physical location is irrelevant — do not wait to "be in town."_

## The rule
A bare link is not outreach. **Link + personalization + one binary ask + an expiry** mints pull events; a bare link mints silence. Every send gets logged as a Demand Ledger entry (with `next_action_date` = send date + 4 days) and linked from the asset — that's what un-orphans the site.

## Before sending (30 min per site, one time)
1. Host the demo at a clean, intentional URL: `<business>.agaviai.com` (a subdomain reads as "built for you"; `agaviai.com/demos/xyz` reads as "one of many").
2. Add the telemetry ping (even just Cloudflare analytics on that subdomain) so you can see whether they visited before you follow up.
3. Find the owner's name and direct email — send person-to-person, never to info@.
4. Have a Calendly link ready so the prospect can mint the Demand Ticket themselves.

## The email

**Subject:** `I built [Business] a new website — it's live, take a look`

> Hi [First name],
>
> I'm Justin — I build websites and AI tools for [industry] businesses through my company, Agavi AI. While looking at [city] [industry] companies, [Business] stood out [one specific, true sentence about why — their reviews, their work, their current site's gap].
>
> Rather than describe what I do, I built you a working homepage:
>
> **[business].agaviai.com**
>
> It's a draft built from your public info — anything on it can change. If you like it, I can have it live on your own domain within a week: [$X one-time, or $Y/mo including hosting and updates].
>
> Want to walk through it for 15 minutes? Grab a time here: [Calendly link] — or just reply with what you'd change.
>
> Justin
> Agavi AI · [phone]

**Why each piece is there:** the specific-reason sentence proves it isn't spam; the live URL is the demo doing the selling; the price removes the "what's the catch" hesitation; the Calendly link + "reply with what you'd change" gives two easy yeses, one of which is literally design feedback (people love giving feedback — it starts the conversation).

## Follow-up cadence (Herald behavior, manual for now)
- **Day 4:** one-liner. "Hi [Name] — any reaction to the site draft? Happy to change anything."
- **Day 10 (final):** "Closing the loop — I take demo sites down at the end of the month, so let me know either way. If it's not a fit, no hard feelings." _(True expiry: actually take it down. Honest urgency, and it keeps the demo namespace clean.)_
- **Day 14, no response:** PARK the asset, write the outcome in its ledger note. The site and this email remain permanent sales inventory for the next same-industry prospect.

## Outcomes → ledger states
| What happens | Demand Ticket | Asset state |
|---|---|---|
| Call booked or substantive reply | scheduled-conversation / written-interest | `pull` → scope the pilot |
| "How much?" only | written-interest | `pull` — answer + re-offer the call |
| Visited site (telemetry), no reply | none yet | stay `package`; day-4 follow-up references nothing (don't reveal tracking) |
| Silence through day 14 | none | `parked` + outcome logged |
