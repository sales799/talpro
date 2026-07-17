# Talpro Website Claim Registry

Authority: Talpro Global Marketing Website Constitution v2.1, frozen 2026-07-16.

The executable registry is [`shared/claim-registry.ts`](../../shared/claim-registry.ts).
Public copy may use only records whose status is `approved` and that have
explicit `publicWording`. A blocked or review-required record must not be
published until its owner supplies the required evidence and approval.

## Approved at P1

- Master brand position.
- Master brand promise.
- Legal entity name retained from the P0 legal disclosure baseline.
- The six approved offer families and their distinct delivery boundaries.

## Approved at P2

- Candidate no-application-fee wording required by Constitution v2.1 section 11.
- Public trust-control statuses: verified public, published baseline, evidence
  required, or not publicly claimed.

## Blocked at P1

- Years-in-business claims.
- Placement totals.
- Client-retention percentages.
- Universal shortlist timing promises.
- Universal zero-upfront or replacement-guarantee promises.
- Managed software/technology delivery claims.
- Regulated-industry compliance claims.
- Anonymous testimonials and case-study outcomes without authorisation.

Offer-specific commercial terms and service levels belong in the approved
proposal, mandate, or statement of work. They must not be promoted as universal
website promises.

## P1 publication controls

- Public navigation and sitemaps expose only the approved six-offer architecture.
- Legacy offer URLs redirect to the nearest approved offer.
- Industry, case-study, salary-guide, salary-calculator, location, role, comparison,
  staffing-quiz, and legacy insight surfaces remain unpublished until their claims
  have evidence and editorial approval.
- The legacy GCC hub redirects to GCC Advisory and Workforce Launch.
- Salary claims are reconciled by unpublishing the conflicting guides and calculator;
  compensation guidance is mandate-specific until an approved methodology exists.
- Public SLA and replacement wording refers only to the signed engagement; no
  universal duration or remedy is advertised.

## P2 publication controls

- Case studies remain blocked until outcome methodology and client authorization
  are both approved.
- A job is public only when it is active, unexpired, owner-verified, names the
  hiring organization, and has an HTTPS application link.
- Contact submissions require explicit consent and record attribution, a stable
  deduplication fingerprint, qualification score, routing owner, acknowledgement,
  and CRM delivery state.
- The contact service has no default external webhook; delivery occurs only when
  an explicitly configured HTTPS destination exists.
- Certifications, insurance, consolidated procurement packs, and universal SLAs
  remain unclaimed until current evidence and accountable approval exist.

See [`P2_CONTROL_EVIDENCE.md`](./P2_CONTROL_EVIDENCE.md) for implementation and
remaining evidence gates.
