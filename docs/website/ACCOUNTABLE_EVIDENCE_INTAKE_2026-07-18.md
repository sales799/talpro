# Talpro Constitution Accountable Evidence Intake

Date: 2026-07-18
Authority: Talpro Global Marketing Website Constitution v2.1

## Purpose

This pack lets accountable operating and qualified-review owners supply the
remaining Constitution evidence without asking the founder to interpret code,
run commands or coordinate technical implementation. Codex consumes redacted
artifacts, validates them against the NIRANTAR queue and keeps unapproved public
content withheld.

Do not include passwords, tokens, private keys, `.env` values, government ID,
financial records, candidate CVs, personal phone numbers or unrestricted client
documents. Use controlled references and redacted screenshots where possible.

## Revenue Operations — NIR-P2-001/002/003

Required evidence:

- Distinct HubSpot sandbox/test portal name and portal ID, visibly designated as
  non-production and different from excluded portal `244059903`.
- Accountable lead-routing owner and role-based escalation recipient.
- Approved field map for consent, privacy version, source, UTM, owner, score,
  acknowledgement, delivery state, attempt count and opportunity stage.
- Approved acknowledgement SLA and evidence that staffing capacity supports it.
- Proof that sandbox automation cannot sync, forward or notify production.
- Approved happy path, retry, exhausted-retry and opportunity-callback record IDs.

Acceptance: the exact `NIR-P2-EVID-001` synthetic records pass end to end with
redacted CRM screenshots/IDs and no production route.

## Candidate Operations — NIR-P2-005

For each approved vacancy provide:

- controlled mandate reference and employer permission;
- accountable mandate owner;
- hiring organisation and role title;
- canonical HTTPS application route;
- publication, review and expiry timestamps;
- candidate acknowledgement and no-fee/fraud route;
- expected current/expired/unverified HTTP behaviour.

Acceptance: current verified records return `200`; expired, unverified and
unknown records return genuine `404`; structured data matches the public record.

## Marketing, Delivery and Legal — NIR-P2-006

For each public case study or testimonial provide:

- client context and permission or verified-anonymous approval;
- Talpro scope, actions and delivery period;
- metric source, calculation, denominator and limitations;
- accountable Marketing, Delivery and Legal approvers;
- approved wording, approval date and expiry date.

Acceptance: the claim registry permits only the exact approved wording. Composite
or illustrative scenarios cannot be presented as verified client outcomes.

## Legal, Privacy and Security — NIR-P2-007, NIR-P4-003/006/010/014

Qualified reviewers provide dated approvals for:

- legal entity, registrations, procurement, DPA/SLA and vendor onboarding;
- privacy purposes, consent, retention, deletion, rights and transfer controls;
- processor/subprocessor inventory and incident escalation;
- candidate fee/fraud, grievance and accessibility wording;
- security claims, insurance/certification wording, responsible disclosure;
- email sender inventory, MFA control, DKIM/alignment and impersonation response.

Acceptance: each approval names the qualified role, reviewed artifact/version,
scope, date, expiry/review date and any limitations. Founder approval cannot
substitute for qualified legal or security review.

## Accessibility Review — NIR-P4-001/013

Use `docs/website/evidence/HUMAN_ACCESSIBILITY_EVIDENCE_TEMPLATE.md` to record:

- keyboard and visible-focus review;
- screen-reader name, role, state and reading order;
- 200%/400% zoom, reflow and responsive layouts;
- reduced motion, contrast, captions/transcripts and error recovery;
- required browser, device and assistive-technology combinations;
- reviewer identity/role, date, findings, remediation and retest result.

Acceptance: every mandatory WCAG 2.2 AA/manual item passes or has a resolved,
retested defect. Automated zero violations do not replace human verification.

## Release and Reliability Operations — NIR-P0-002, NIR-P4-005/007/008/011/014

The approved release operator supplies:

- exact reviewed candidate SHA and production SHA;
- upstream Nginx/hosting header before/after evidence showing one effective CSP
  without `unsafe-eval` and without duplicated security headers;
- database/application backup reference and successful restore proof;
- rollback rehearsal, owner, timings, decision and resulting health evidence;
- post-release route, CRM, job, structured-data, accessibility, security and CWV
  evidence;
- seven consecutive UTC days using the controlled stability template.

Acceptance: exact-SHA production parity, monitor pass, rollback/restore pass and
seven stable days are referenced by the real release manifest.

## Intake Workflow

1. Accountable owner redacts the artifact and records its controlled reference.
2. Codex checks completeness, dates, expiry, owner and task-ID mapping.
3. Missing or contradictory evidence is rejected without public publication.
4. Accepted evidence is committed only when safe and non-sensitive; sensitive
   evidence remains in the approved controlled system and is referenced by ID.
5. The certificate verifier is rerun only after all 27 pre-certificate controls
   have accepted evidence for the exact released SHA.
