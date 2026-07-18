# P2 Non-Production Verification Record — 2026-07-17

Authority: Talpro Global Marketing Website Constitution v2.1, frozen 2026-07-16.

Candidate under review:

- Branch: `codex/nirantar-release-hardening-20260717`
- P2 baseline commit: `132cfd65c8814838f6151648b22fe185f52c19b0`
- P1 baseline: `295e9c7501f754c0503e2d7811a27dd65ee64ba4`
- Verification command: `npm run verify:p2-sandbox`
- Machine-readable evidence: `dist/release-evidence/p2-sandbox-integration-report.json`
- Redacted record manifest: `docs/website/evidence/P2_REDACTED_RECORD_MANIFEST_2026-07-18.json`
- Manifest SHA-256: `141cf2747a6a24f677c7a4b9f42e0259320b60167f0d35cda917d48945991f03`

## Verdict

The P2 **technical non-production verification passed** in an ephemeral,
loopback-only Talpro sandbox expressly authorized by the founder on 2026-07-17.
The sandbox used PostgreSQL 16 bound only to `127.0.0.1:55432` and a temporary
HTTP CRM receiver bound only to `127.0.0.1`. It had no production route and used
only synthetic `.invalid` records.

This proves the application, database, migrations and recovery controls. It does
not prove delivery into Talpro's selected CRM provider, operational ownership,
real employer-authorized vacancies, SLA capacity, legal approval or real case
studies. Those evidence gates remain open, so P2 is not certified complete.

## Environment and safety boundary

| Control | Evidence | Result |
| --- | --- | --- |
| Named environment | Container `talpro-p2-sandbox-20260717`; database `talpro_p2_sandbox` | Passed |
| Network isolation | PostgreSQL host binding `127.0.0.1:55432`; CRM simulator `127.0.0.1` | Passed |
| Production exclusion | Script rejects non-loopback database hosts and requires an explicit sandbox/test database name and confirmation flag | Passed |
| Data safety | Three synthetic buyer identities under `example.invalid`; three synthetic job records; all removed after the run | Passed |
| Secret safety | PostgreSQL trust authentication inside the disposable loopback container; no secret or environment file read or written | Passed |

## Technical verification matrix

| Verification | Evidence | Result |
| --- | --- | --- |
| Contact persistence | Real `/api/contact` request persisted into PostgreSQL | Passed |
| Consent and attribution | Consent, privacy version, source and UTM fields persisted | Passed |
| Ownership and scoring | Technology Talent owner and expected 100-point score persisted | Passed |
| Duplicate suppression | Second identical request returned `202` and retained one database record | Passed |
| CRM happy path | Real loopback HTTP boundary accepted the lead with the inquiry ID as idempotency key | Passed |
| CRM failure and retry | Forced `503`, durable due-record recovery and eventual delivery on attempt two | Passed |
| CRM escalation | Five forced failures produced durable `escalated` state, attempt count and timestamp | Passed |
| Stable idempotency | Retry and escalation attempts reused the same inquiry ID | Passed |
| Opportunity feedback | Bounded feedback contract accepted `qualified` and persisted opportunity ID, stage and timestamp | Passed |
| Governed jobs | Current verified job returned `200`; expired, unverified and unknown jobs returned `404` in API/page checks | Passed |
| Migration replay | Migrations `002` and `003` ran with `ON_ERROR_STOP=1` against the already-current sandbox without error | Passed |
| Backup and restore | PostgreSQL custom-format dump restored to `talpro_p2_restore_sandbox` with matching 35 contact columns, 27 job columns, four P2 indexes and row counts | Passed |

Machine-readable result: ten integration controls passed, zero failed. Source and
restored databases both reported zero residual contact and job rows after cleanup.

## Stability finding fixed during verification

The CSRF token cleanup interval kept a completed verification process alive.
The timer is now unreferenced, matching the existing background-worker policy,
so completed processes terminate normally without disabling cleanup while the
application is running.

## Remaining operational evidence

The following are not inferable from a technical sandbox and remain mandatory:

1. Revenue Operations approval of the selected Talpro CRM sandbox, field mapping,
   accountable routing owner, acknowledgement SLA and escalation recipient.
2. The redacted synthetic buyer/vacancy manifest is attached and machine-validated;
   the exact founder `PROVE NIR-P2-EVID-001` message and provider-created CRM
   record/callback remain required.
3. Candidate Operations approval of current, expired and unverified vacancy
   records, including mandate owner, hiring organisation, HTTPS application URL
   and expiry.
4. Employer permission, client/legal approval and calculation evidence for every
   case study or public outcome claim.
5. Qualified legal/privacy approval for retention, processor and public-policy
   controls.

No production database, production endpoint, real personal data, deployment,
DNS, provider configuration or credential was touched. Paid marketing, P2
completion, production release and the production certificate remain blocked.
