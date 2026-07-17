# P2 Non-Production Verification Record — 2026-07-17

Authority: Talpro Global Marketing Website Constitution v2.1, frozen 2026-07-16.

Candidate under review:

- Branch: `codex/nirantar-release-hardening-20260717`
- P2 baseline commit: `132cfd65c8814838f6151648b22fe185f52c19b0`
- Operational recovery implementation: current branch, migration `003_p2_lead_delivery_recovery.sql`
- P1 baseline: `295e9c7501f754c0503e2d7811a27dd65ee64ba4`

## Verdict

P2 operational verification did not pass. No approved Talpro non-production
database, CRM destination, vacancy record pack, case-study record pack, or
operational approval manifest is connected or tracked in the workspace.

Local tests and fixtures are not substitutes for real-integration evidence.
No production system was used as a fallback.

## Inventory evidence

The following safe checks were completed without opening secret-like files or
reading runtime credential values:

- Confirmed the candidate branch is clean at the stated P2 commit.
- Enumerated local and remote Forgejo/GitHub branch names. Neither source has a
  tracked staging or sandbox branch.
- Searched tracked source and current CTO control documentation for an approved
  Talpro non-production endpoint, database, CRM destination, vacancy pack,
  case-study pack, migration transcript, or approval record.
- Checked the Talpro repository for a local non-production database artifact.
  None is present outside excluded runtime and secret paths.
- Reviewed the P2 contact, job, schema, migration, and evidence contracts.

References to other companies' or products' test environments are not Talpro
approvals and were not used. Historical build backups, repository archives,
sample job content, and public production endpoints were also rejected as
authoritative evidence.

## Mandatory operational gate

| Verification | Required evidence | Result |
| --- | --- | --- |
| Non-production target identity | Named environment, owner, HTTPS base URL, database identity, written non-production confirmation | Not supplied |
| Migration safety | Backup/restore confirmation, migration transcript, before/after schema and row counts | Not run; no approved database |
| CRM happy path | Approved test record, created CRM record ID, mapped owner, timestamps, attribution fields | Not run; no approved CRM destination |
| CRM duplicate path | Same approved record submitted inside the deduplication window, one CRM record only | Not run |
| CRM failure and retry | Forced non-production failure, durable retry attempt, eventual delivery, timestamps | Local lease/idempotency/backoff/recovery tests pass; real non-production proof not run |
| CRM escalation | Failed-delivery alert/escalation with accountable owner and timing | Exhausted-retry escalation state passes locally; accountable operational alert proof not run |
| Opportunity feedback | CRM opportunity/stage result returned to the attribution record | Authenticated bounded contract implemented; real non-production callback not run |
| Acknowledgement/SLA | Approved SLA plus measured acknowledgement and service-capacity evidence | Not supplied |
| Governed vacancies | Employer-authorized vacancy records with owner, expiry, HTTPS application route, consent and acknowledgement | Not supplied |
| Job route behaviour | Real approved current job returns 200; expired/unverified/unknown job returns 404; database failure returns 503 | Not run; no approved database or vacancy records |
| Case-study publication | Client authorization, calculation method, delivery/finance/legal/marketing approvals and review expiry | Not supplied; publication remains blocked |

## Engineering finding and remediation

The original P2 candidate recorded a failed webhook delivery as `failed` and
returned the label `held_for_retry`, but had no recovery mechanism. The current
NIRANTAR branch now adds durable attempt, next-attempt, lease, non-sensitive
error-code, escalation and opportunity fields; atomic delivery claims; a stable
idempotency key; five-attempt backoff; a due-record worker; and authenticated
opportunity-stage feedback. Synthetic tests cover delivery, failure, escalation,
concurrent-worker suppression, endpoint policy and feedback validation.

This closes the local engineering finding. It does not create operational proof:
the migration, delivery, retry, escalation owner and callback still have to run
against the named approved Talpro sandbox and approved records.

This finding does not invalidate the local capture, consent, attribution,
deduplication, deterministic owner, score, acknowledgement, or one-attempt
delivery controls. It does keep the Constitution section 10 conversion gate
open.

## Safety decision

No migration, lead submission, vacancy publication, CRM write, webhook call,
production request, deployment, or environment change was performed. No
synthetic record was presented as an approved business record.

Paid marketing, P2 completion, production release, and the production
certificate remain blocked. Safe P3/P4 branch work may continue in parallel.

## Exact evidence needed to resume

Revenue Operations and Candidate Operations must provide one redacted approval
manifest, stored outside secret paths, containing:

1. Non-production environment name, owner, base URL/host, and explicit statement
   that it cannot write to production.
2. Confirmation that database and webhook credentials have been injected through
   the approved secure runtime path; no values belong in the repository or chat.
3. One approved test buyer record with a non-sensitive test identity, expected
   owner, expected score band, expected account match, and expected campaign
   attribution.
4. At least one employer-authorized test vacancy plus expired and unverified
   negative-control records, each with owner and approval reference.
5. Approved acknowledgement/SLA target and accountable escalation owner.
6. CRM field mapping and the required opportunity-stage feedback event.
7. Approval to execute migrations `002_p2_lead_job_governance.sql` and
   `003_p2_lead_delivery_recovery.sql` only against
   the named non-production database, including backup/restore confirmation.

After that manifest is connected, the entire matrix above must be rerun against
the named non-production environment. No synthetic result may be promoted as
approved operational evidence.
