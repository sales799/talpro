# NIRANTAR Constitution Completion Queue

Date: 2026-07-17  
Authority: `TALPRO_WEBSITE_CONSTITUTION_v2.1.md`  
Release state: **WIP — paid marketing and the production certificate are blocked**

This queue is the controlling record for the Talpro website Constitution programme. A task may be marked complete only when its implementation and required evidence both pass. Local code completion does not mean production completion.

## Status meanings

- `COMPLETE`: implemented and verified with repository evidence.
- `IN PROGRESS`: safe autonomous work is actively available.
- `WAITING EVIDENCE`: code cannot truthfully publish or certify the control without approved records.
- `WAITING RELEASE`: verified work exists on a protected branch but is not live.
- `BLOCKED`: a mandatory external decision or protected production action is required.

## Queue

| ID | Priority | Control | Status | Completion evidence / exit condition |
|---|---:|---|---|---|
| NIR-P0-001 | P0 | P0 route, metadata, robots, sitemap and stability restoration | WAITING RELEASE | Commits `0706441b05` and `d952f68d94`; deploy reviewed SHA through approved release path and pass post-deploy checks. |
| NIR-P0-002 | P0 | Remove upstream CSP `unsafe-eval` and duplicate response headers | BLOCKED | Production proxy/hosting configuration must be changed by an approved operator; live header proof must show one effective policy without `unsafe-eval`. |
| NIR-P1-001 | P1 | Positioning, offer architecture and proof-claim governance | WAITING RELEASE | Commit `295e9c7501`; six governed offers and claim gates pass locally; deploy and verify live copy. |
| NIR-P2-001 | P2 | Lead capture, consent, attribution, deduplication and ownership | WAITING RELEASE | Commit `132cfd65c8`; API tests pass; approved non-production database migration and end-to-end record still required. |
| NIR-P2-002 | P2 | Durable CRM outbox, retry/backoff and exhausted-retry escalation | WAITING EVIDENCE | Durable fields, lease, idempotency key, five-attempt backoff, recovery worker and escalation state pass 5 synthetic tests; approved non-production end-to-end evidence remains. |
| NIR-P2-003 | P2 | Opportunity feedback from CRM to source/offer reporting | WAITING EVIDENCE | Authenticated bounded feedback contract and durable opportunity fields implemented; approved non-production CRM callback proof remains. |
| NIR-P2-004 | P2 | Approved non-production Talpro integration boundary | WAITING EVIDENCE | Named sandbox endpoint/database, confirmation it cannot write to production, approved synthetic/redacted test records and expected outcomes. |
| NIR-P2-005 | P2 | Governed job publication and expiry proof | WAITING EVIDENCE | Approved current vacancy pack, mandate owner, hiring organisation, HTTPS application URL, verification date and expiry; migration and route proof in sandbox. |
| NIR-P2-006 | P2 | Verified case studies and leadership proof | WAITING EVIDENCE | Approved case-study records with attribution, permission, methodology, metric period and expiry; accountable leadership approval. |
| NIR-P2-007 | P2 | Trust, procurement, workforce, subprocessor and legal evidence | WAITING EVIDENCE | Approved current packs with owners, review dates, evidence links and qualified legal/privacy review where required. |
| NIR-P3-001 | P3 | Content governance registry | IN PROGRESS | Executable registry covers new P3 buyer journeys and withholds unapproved intelligence; remaining public routes still need final owners/reviewers and legal/privacy approval. |
| NIR-P3-002 | P3 | Buyer-specific journeys and conversion paths | WAITING RELEASE | Five role-specific buyer journeys plus the candidate route answer outcome, method, evidence, risk and action; 31/31 governed routes and release verification pass locally; live proof remains. |
| NIR-P3-003 | P3 | Original India/GCC research and authority content | WAITING EVIDENCE | Approved underlying dataset, documented methodology, named qualified authors/reviewers and claim-registry approval. |
| NIR-P3-004 | P3 | Regional journeys and `hreflang` | WAITING EVIDENCE | Real regional delivery capability, locale ownership and approved regional content; technical implementation and crawler proof. |
| NIR-P4-001 | P4 | WCAG accessibility verification | PENDING | Automated checks plus human keyboard/screen-reader/contrast review; zero mandatory failures. |
| NIR-P4-002 | P4 | Performance and Core Web Vitals readiness | PENDING | Repeatable lab budgets and post-release field observation at governed routes. |
| NIR-P4-003 | P4 | Security, privacy and dependency closure | PENDING | Security tests, single production header policy, vulnerability disposition, privacy/retention review and no high/critical open issue. |
| NIR-P4-004 | P4 | Analytics KPI dictionary and event taxonomy | PENDING | Consent-respecting event contract for qualified lead, job, trust and offer journeys; owner and data-quality checks. |
| NIR-P4-005 | P4 | Backup, restore, rollback and incident exercise | BLOCKED | Approved non-production/production operators must run and evidence restore/rollback without exposing secrets or data. |
| NIR-P4-006 | P4 | Legal, privacy and public-claim approvals | BLOCKED | Qualified approvers sign the current public policies, claims, records and retention boundaries. |
| NIR-P4-007 | P4 | Governed merge and production release | BLOCKED | WIP removed after review; approved human operator merges the exact verified SHA and deploys under rollback controls. |
| NIR-P4-008 | P4 | Seven-day production stability observation | BLOCKED | Seven consecutive days of route, error, lead-delivery, job, security and performance evidence after the governed release. |
| NIR-P4-009 | P4 | Constitution completion certificate | BLOCKED | Every mandatory row above is complete with durable evidence; no exception, paid marketing or premature certificate. |

## Exact PROVE boundaries

These statements authorise only the stated non-production or governed-release boundary. They never disclose or bypass credentials.

### PROVE NIR-P2-OPS-001

`PROVE NIR-P2-OPS-001: I confirm the connected Talpro sandbox is non-production, cannot write to production, and authorize Codex to run migration and approved synthetic test records through it. Production is excluded.`

### PROVE NIR-P2-EVID-001

`PROVE NIR-P2-EVID-001: I approve the attached redacted buyer and vacancy test records for non-production P2 verification and confirm their expected owners, SLA, attribution and expiry fields.`

### PROVE NIR-P4-RELEASE-001

`PROVE NIR-P4-RELEASE-001: I authorize the approved human release operator to merge the verified Forgejo PR and deploy its exact reviewed SHA to Talpro production under the rollback runbook. Codex must not merge or deploy.`

Legal, privacy, employment, case-study permission and certification approvals must come from their qualified accountable owners. A founder PROVE statement cannot substitute for those approvals.

## Operating rule

NIRANTAR continues safe branch implementation, testing, evidence capture and review preparation automatically. It stops only at protected production actions, secrets, real-data access, qualified approvals, or a business/legal decision that cannot be truthfully inferred.
