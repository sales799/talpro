# P2 CRM Sandbox Connection Record — 2026-07-18

Authority: Talpro Global Marketing Website Constitution v2.1, frozen 2026-07-16.

## Verdict

**Blocked: the authenticated portal fails the non-production gate.** The
repository identifies HubSpot as the intended CRM. Founder authentication opened
Talpro HubSpot account `244059903`, but the account presents active operational
CRM activity and no sandbox designation. It must not receive P2 test records.

Only one account is visible in the account switcher. Its home screen reports
6,079 open tasks and current activity against real contacts. Settings exposes no
`Sandboxes` entry under Account Management. These observations do not prove that
the account is formally production, but they conclusively prevent Codex from
treating it as non-production under the Constitution's fail-closed rule.

This is a hard security boundary, not a technical implementation choice. Codex
will not click an OAuth identity approval, request or handle a password or OTP,
inspect browser credential storage, create a private-app token, or infer that a
portal is non-production merely from its account identity.

## Discovery evidence

| Check | Evidence | Result |
| --- | --- | --- |
| Intended provider | `CLAUDE.md` declares `CRM | HubSpot` | Identified |
| Existing application adapter | `server/mcp/tools.ts` labels `hubspot_contact_search` as a stub and describes a future private-app-token integration | Not connected |
| Existing browser session | Founder completed direct Google authentication in the retained Talpro Chrome tab | Authenticated |
| Authenticated portal | Account `Talpro`, HubSpot account ID `244059903` | Identified |
| Operational-data boundary | Home reports 6,079 open tasks plus current real contact/email activity | Fails sandbox gate |
| Account switcher | Only account `Talpro` / `244059903` is visible | No separate sandbox found |
| Sandbox identity | No visible sandbox label and no `Sandboxes` Settings entry | Not verified; write prohibited |
| Current HubSpot entitlement requirement | HubSpot's 2026 documentation lists standard sandboxes for Enterprise subscriptions and requires Super Admin creation | External business/admin action required |
| External writes | No contact, deal, callback, provider setting or credential was created or changed | Passed safety gate |

Initial login evidence was observed at 2026-07-18 12:32 IST. Authenticated
read-only inspection was completed at 12:36 IST. The HubSpot tab was retained for
founder handoff. No real contact details, sign-in data, browser credential data
or protected field values are recorded in repository evidence.

Provider reference: [Create a sandbox and deploy changes to production](https://knowledge.hubspot.com/account-management/deploy-sandbox-changes-to-production).

## Safe continuation contract

Portal `244059903` is explicitly excluded from P2 provider testing. A separate
HubSpot sandbox/test portal must be opened before Codex can continue. Read-only
discovery must then verify all of the following before any synthetic write:

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

Creating or purchasing a HubSpot Enterprise sandbox, changing account
permissions, configuring OAuth/private apps, or choosing another CRM is outside
safe autonomous authority. The founder or accountable HubSpot administrator must
provide an already-created non-production portal and open it in Chrome.

## Formal approval validation — 2026-07-18 12:40 IST

The founder sent the complete `PROVE NIR-P2-CRM-002` boundary. At receipt, the
only open HubSpot tab was still portal `244059903`, which the approval text itself
explicitly excludes as production. No different portal or sandbox designation
was visible. The approval therefore failed its portal-identity precondition and
was not executed. External write count remains zero.

Machine-readable evidence:
`docs/website/evidence/P2_CRM_PROVIDER_APPROVAL_2026-07-18.json`.

To resume, an accountable operator must switch the open HubSpot tab to a distinct
visibly designated sandbox/test portal and resend the unchanged approval sentence
while that portal is current. The sentence alone cannot reclassify operational
portal `244059903` as non-production.

### Repeat validation — 2026-07-18 13:06 IST

The founder resent the complete approval after the full Constitution audit. The
only open HubSpot tab remained portal `244059903`, now visibly in its operational
Tasks area. No separate portal or sandbox designation was present. The second
attempt was rejected for the same portal mismatch; authorization remains
unexecuted and external write count remains zero.

### Autonomous administrator check — 2026-07-18 15:42 IST

Codex reopened HubSpot through the authenticated Chrome session and followed the
administrator path without making changes. The HubSpot account selector again
listed only `Talpro` portal `244059903`. Inside that portal, Account Management
again exposed no `Sandboxes` entry. Current official HubSpot documentation says
the sandbox control requires a qualifying Enterprise subscription and Super
Admin permission; this session cannot determine which entitlement or permission
is missing without crossing the billing/permission guardrails.

No sandbox was opened because no separate sandbox is available to this login.
No sandbox was created, no subscription or permission was changed, and external
write count remains zero. The existing approval text is already recorded; it
does not need to be copied again. Provider verification resumes automatically
after an accountable HubSpot administrator makes an already-created, visibly
designated sandbox available to this login and opens it.
