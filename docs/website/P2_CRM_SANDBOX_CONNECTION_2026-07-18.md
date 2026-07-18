# P2 CRM Sandbox Connection Record — 2026-07-18

Authority: Talpro Global Marketing Website Constitution v2.1, frozen 2026-07-16.

## Verdict

**Waiting on founder authentication.** The repository identifies HubSpot as the
intended CRM, and the Talpro Chrome profile reaches the HubSpot sign-in flow with
the Talpro sales identity remembered. No authenticated portal or visible sandbox
label is available yet, so no external CRM connection or record write was made.

This is a hard security boundary, not a technical implementation choice. Codex
will not click an OAuth identity approval, request or handle a password or OTP,
inspect browser credential storage, create a private-app token, or infer that a
portal is non-production merely from its account identity.

## Discovery evidence

| Check | Evidence | Result |
| --- | --- | --- |
| Intended provider | `CLAUDE.md` declares `CRM | HubSpot` | Identified |
| Existing application adapter | `server/mcp/tools.ts` labels `hubspot_contact_search` as a stub and describes a future private-app-token integration | Not connected |
| Existing browser session | Talpro Chrome profile opened `https://app-na2.hubspot.com/login` and displayed the remembered Talpro sales identity | Sign-in required |
| Authenticated portal | No authenticated HubSpot portal was available | Not verified |
| Sandbox identity | No portal name, portal ID or visible HubSpot sandbox designation was available | Not verified |
| External writes | No contact, deal, callback, provider setting or credential was created or changed | Passed safety gate |

Browser evidence was observed at 2026-07-18 12:32 IST. The HubSpot sign-in tab
was retained as a handoff tab for direct founder authentication. No sign-in data
is recorded in repository evidence.

## Safe continuation contract

After the founder completes HubSpot sign-in directly in the retained Chrome tab,
Codex will continue read-only discovery first and must verify all of the following
before any synthetic write:

1. The visible portal name and portal ID belong to Talpro.
2. HubSpot explicitly identifies the portal as a sandbox/non-production account,
   or an accountable owner supplies equivalent controlled evidence.
3. The portal cannot forward, synchronize or automate records into production.
4. An existing approved connection path can be exercised without exposing or
   changing credentials, OAuth grants, private apps or provider permissions.
5. The checksum-bound `NIR-P2-EVID-001` synthetic records remain the only allowed
   records; real personal, candidate, client or employer data is excluded.

If any control is absent, provider execution remains blocked and the local
loopback verifier remains the only completed technical P2 integration boundary.
Paid marketing, production deployment, P2 completion and the Constitution
certificate remain blocked.
