# NIRANTAR Constitution Completion Queue

Date: 2026-09-05 (targeted positioning, routing and enquiry update)
Authority: `TALPRO_WEBSITE_CONSTITUTION_v2.1.md`  
Frozen SHA-256: `eacde5f3ea4c70b49b21ba4e5b4e440cde6cb05cb500b761fe5916a7c3f088dd`
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
| NIR-P0-001 | P0 | P0 route, metadata, robots, sitemap and stability restoration | WAITING RELEASE | September repair candidate passes 31-route build/metadata checks and 70 built-HTTP assertions. Redirects retain encoded queries; missing static prerenders fail with 503; direct HTML cannot bypass route status. Deploy reviewed SHA through the approved release path and repeat live checks. |
| NIR-P0-002 | P0 | Remove upstream CSP `unsafe-eval` and duplicate response headers | BLOCKED | Production proxy/hosting configuration must be changed by an approved operator; live header proof must show one effective policy without `unsafe-eval`. |
| NIR-P1-001 | P1 | Positioning, offer architecture and proof-claim governance | WAITING RELEASE | Six governed offers remain; homepage/employer service names and destinations now derive from the same registry. Buyer-facing copy is clearer, approved positioning is retained, and all 31 rendered routes pass publication checks. Deploy and verify live copy. |
| NIR-P2-001 | P2 | Lead capture, consent, attribution, deduplication and ownership | BLOCKED | `PROVE NIR-P2-EVID-001` is recorded and exact buyer records passed loopback verification. Complete `PROVE NIR-P2-CRM-002` was received but failed validation because excluded operational portal `244059903` remained the only open HubSpot portal. A distinct visibly designated non-production portal, selected-provider execution and operational SLA proof remain. |
| NIR-P2-002 | P2 | Durable CRM outbox, retry/backoff and exhausted-retry escalation | WAITING EVIDENCE | Real loopback HTTP/PostgreSQL verification passed happy path, forced failure, attempt-two recovery, stable idempotency and five-attempt escalation; selected CRM provider and accountable escalation-owner proof remain. |
| NIR-P2-003 | P2 | Opportunity feedback from CRM to source/offer reporting | WAITING EVIDENCE | Bounded feedback and durable PostgreSQL persistence passed in the technical sandbox; authenticated selected-provider callback proof remains. |
| NIR-P2-004 | P2 | Approved non-production Talpro technical integration boundary | COMPLETE | Founder-authorized loopback sandboxes passed the original migration/backup/restore proof and the 2026-07-18 full-audit rerun. The current `talpro_p2_audit_sandbox` executed all 10 checksum-bound controls with zero failures, used only synthetic `.invalid` records and was removed afterward. |
| NIR-P2-005 | P2 | Governed job publication and expiry proof | WAITING EVIDENCE | `PROVE NIR-P2-EVID-001` is recorded. The approved manifest's exact current `200`, expired `404` and unverified `404` records passed real sandbox API/page checks; Candidate Operations-approved employer mandates remain. |
| NIR-P2-006 | P2 | Verified case studies and leadership proof | WAITING EVIDENCE | Approved case-study records with attribution, permission, methodology, metric period and expiry; accountable leadership approval. |
| NIR-P2-007 | P2 | Trust, procurement, workforce, subprocessor and legal evidence | WAITING EVIDENCE | Approved current packs with owners, review dates, evidence links and qualified legal/privacy review where required. |
| NIR-P3-001 | P3 | Content governance registry | WAITING EVIDENCE | Executable registry covers new P3 buyer journeys and withholds unapproved intelligence; remaining public routes still need final owners/reviewers and legal/privacy approval. |
| NIR-P3-002 | P3 | Buyer-specific journeys and conversion paths | WAITING RELEASE | Five role-specific buyer journeys plus the candidate route answer outcome, method, evidence, risk and action; 31/31 governed routes and release verification pass locally; live proof remains. |
| NIR-P3-003 | P3 | Original India/GCC research and authority content | WAITING EVIDENCE | Approved underlying dataset, documented methodology, named qualified authors/reviewers and claim-registry approval. |
| NIR-P3-004 | P3 | Regional journeys and `hreflang` | WAITING EVIDENCE | Real regional delivery capability, locale ownership and approved regional content; technical implementation and crawler proof. |
| NIR-P4-001 | P4 | WCAG accessibility verification | WAITING EVIDENCE | September static semantics and axe-core pass 31/31 routes with zero automated violations. The current report has 52 incomplete route/rule checks; these and human keyboard, screen-reader, zoom, motion and device review remain. This is not accessibility certification. |
| NIR-P4-002 | P4 | Performance and Core Web Vitals readiness | WAITING EVIDENCE | Deterministic JS/CSS/HTML budgets pass; 75th-percentile production LCP/INP/CLS observation remains. |
| NIR-P4-003 | P4 | Security, privacy and dependency closure | WAITING EVIDENCE | September isolated runtime security and admin/API tests pass. The unchanged dependency lock now reports 22 findings: 10 high, 11 moderate, 1 low; the required dependency gate FAILS. Dependency remediation, live upstream policy and qualified privacy review remain release blockers. |
| NIR-P4-004 | P4 | Analytics KPI dictionary and event taxonomy | WAITING RELEASE | Consent-gated, identifier-free event contract and KPI dictionary implemented; provider receipt/data-quality proof requires governed release. |
| NIR-P4-005 | P4 | Backup, restore, rollback and incident exercise | BLOCKED | P2 PostgreSQL sandbox backup/restore passed with matching schema/index/row counts; governed application rollback and production incident exercise still require approved release operators. |
| NIR-P4-006 | P4 | Legal, privacy and public-claim approvals | BLOCKED | Qualified approvers sign the current public policies, claims, records and retention boundaries. |
| NIR-P4-007 | P4 | Governed merge and production release | BLOCKED | WIP removed after review; approved human operator merges the exact verified SHA and deploys under rollback controls. |
| NIR-P4-008 | P4 | Seven-day production stability observation | BLOCKED | Seven consecutive days of route, error, lead-delivery, job, security and performance evidence after the governed release. |
| NIR-P4-009 | P4 | Constitution completion certificate | BLOCKED | Typed fail-closed verifier, positive structural-fixture test and seven adversarial tamper scenarios pass; the real blank manifest still refuses eligibility until the other 27 controls, exact production SHA, accountable dated approvals/monitoring/rollback proof and seven stable days pass. No exception, paid marketing or premature certificate. |
| NIR-P4-010 | P4 | Domain, email and administration trust | WAITING EVIDENCE | SPF and DMARC are publicly present; active DKIM signing, aligned message proof, administration MFA, authorised-sender inventory and impersonation monitoring remain. |
| NIR-P4-011 | P4 | Independent origin/CDN and conversion monitoring | WAITING RELEASE | The 2026-07-18 read-only 31-route production monitor records 149 old-release differences/failures. Live health, robots, sitemap and genuine unknown-route statuses respond, but alert ownership, independent origin/CDN execution and post-release candidate parity remain. |
| NIR-P4-012 | P4 | Search Console, crawl alerts and entity consistency | WAITING EVIDENCE | Search Console/property access, crawl-error alert ownership and verified public-profile reconciliation are required. |
| NIR-P4-013 | P4 | Design-system and device/browser coverage | WAITING EVIDENCE | Repository standard and automated semantics exist; the signed human device/browser/assistive-technology matrix remains. |
| NIR-P4-014 | P4 | Release evidence-pack approval | BLOCKED | Automated route/link, structured-data, static/browser accessibility, performance, runtime-security and publication-governance artifacts are generated; controlled manifest and human/stability templates are present; CRM, legal/privacy, human review and restore/rollback artifacts must reference the exact released SHA and accountable approvers. |

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

Latest full audit: `docs/website/NIRANTAR_CTO_SESSION_RECAP_2026-07-18.md` and
`docs/website/evidence/NIRANTAR_FULL_AUDIT_2026-07-18.json`.

Accountable-owner intake pack:
`docs/website/ACCOUNTABLE_EVIDENCE_INTAKE_2026-07-18.md`.

Safe local verification entrypoint: `npm run verify:constitution-local`.

Latest targeted repair evidence: `docs/website/POSITIONING_ROUTING_ENQUIRY_REPAIRS_2026-09-05.md`.
The September aggregate command exited 1. After a test typing correction and a
resource-bounded full-suite rerun, typechecking and all 149 tests pass; the
dependency gate remains failed. Do not describe the aggregate gate as green.
Enquiry prefill, consent, repeat-submission and campaign behavior are verified
with mocked delivery; this does not close `NIR-P2-001` or prove CRM delivery.
Content expansion remains deferred until these repairs pass governed release
and the existing evidence controls are satisfied.

Protected Forgejo review: pull request `#2`, kept in `WIP`/draft state until the
mandatory queue, qualified approvals, exact-SHA release and stability gates pass.
