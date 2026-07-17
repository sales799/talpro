# P4 Local Certification Evidence — 2026-07-17

Candidate branch: `codex/nirantar-release-hardening-20260717`  
Verdict: **local automated gates pass; production certification is not eligible**

## Passing local evidence

| Gate | Result |
|---|---|
| TypeScript | Passed |
| Automated tests | 20 files / 82 tests passed |
| Production build | Passed |
| Governed prerender | 31 of 31 routes passed |
| Release verifier | Titles, H1s, canonicals, body fingerprints, JSON-LD, internal links and retired surfaces passed |
| Automated accessibility semantics | 31 of 31 routes passed for language, landmark/H1 count, skip link, IDs, names, labels and tabindex rules |
| Browser accessibility | axe-core found zero violations across 31 routes; 31 dynamic-control checks remain incomplete/manual |
| Structured data | 31 of 31 routes passed type-specific schema validation; zero unapproved `JobPosting` records |
| Publication governance | Frozen Constitution checksum, claim/content/trust registries, 31 rendered-route blocked-claim checks and client-bundle leakage checks pass |
| Deterministic performance budgets | Largest JS 408,164 B ≤450,000 B; total JS 850,792 B ≤900,000 B; CSS 125,641 B ≤140,000 B; largest HTML 75,508 B ≤100,000 B |
| Security policy | Isolated production-mode runtime passed required headers, CSP without `unsafe-eval`, health/readiness and distinct HTML/API 404 checks |
| Dependency severity | No high/critical finding at the required audit threshold; four moderate development-tool findings remain |
| Analytics privacy | Direct-identifier sanitizer, query-free paths, consent boundary and governed event dictionary implemented; tests pass |

Generated local reports are written to ignored build evidence paths so they cannot be confused with permanent production evidence:

- `dist/release-evidence/route-and-soft-404-report.json`
- `dist/release-evidence/automated-accessibility-report.json`
- `dist/release-evidence/browser-accessibility-report.json`
- `dist/release-evidence/performance-budget-report.json`
- `dist/release-evidence/structured-data-report.json`
- `dist/release-evidence/publication-governance-report.json`
- `dist/release-evidence/runtime-security-report.json`
- `dist/release-evidence/live-production-monitor-report.json` (currently failing because production is not this candidate)
- `dist/release-evidence/certificate-eligibility-report.json` (intentionally failing against the controlled blank manifest)

The prerender gate now starts every route from the immutable SPA shell, waits
for route-specific canonical metadata and fails on browser page exceptions.
This prevents homepage hydration from contaminating later route evidence.
Route head data is applied by the deterministic `DocumentHead` controller;
production bundling can no longer silently switch the former third-party head
library into a server-only path and omit canonical/SEO evidence.

## Mandatory gates still open

- Human WCAG 2.2 AA keyboard, screen-reader, contrast, zoom, reflow, reduced-motion, captions/transcripts and device/browser review.
- 75th-percentile production LCP, INP and CLS evidence.
- Production/upstream header correction and verification.
- Approved non-production and post-release CRM/jobs records.
- Qualified legal, privacy, employment, claim and content approvals.
- Backup/restore and rollback exercise by approved operators.
- Exact-SHA protected merge and production deployment.
- Seven consecutive production days without a Critical availability failure.

Paid marketing and the production certificate remain blocked.

The fail-closed eligibility verifier checks all 27 pre-certificate queue
controls, exact candidate/production SHA identity, production-monitor proof,
restore/rollback proof, seven qualified approvals and seven consecutive stable
UTC days. `NIR-P4-009` must remain `pending_certificate` until that verifier
passes, preventing the certificate from becoming its own prerequisite.
Its pure decision engine has positive structural-fixture coverage and
adversarial coverage for duplicate/unknown controls and approvals, premature
marketing/certificate states, invalid or future evidence dates, broken
stability windows, SHA mismatch and incomplete monitor/rollback proof. Test
fixtures never write an eligibility report or constitute release evidence.
