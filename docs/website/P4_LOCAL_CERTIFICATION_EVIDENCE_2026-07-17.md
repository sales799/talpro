# P4 Local Certification Evidence — 2026-07-17

Candidate branch: `codex/nirantar-release-hardening-20260717`  
Verdict: **local automated gates pass; production certification is not eligible**

## Passing local evidence

| Gate | Result |
|---|---|
| TypeScript | Passed |
| Automated tests | 18 files / 64 tests passed |
| Production build | Passed |
| Governed prerender | 31 of 31 routes passed |
| Release verifier | Titles, H1s, canonicals, body fingerprints, JSON-LD, internal links and retired surfaces passed |
| Automated accessibility semantics | 31 of 31 routes passed for language, landmark/H1 count, skip link, IDs, names, labels and tabindex rules |
| Deterministic performance budgets | Largest JS 408,071 B ≤450,000 B; total JS 854,330 B ≤900,000 B; CSS 125,281 B ≤140,000 B; largest HTML 75,508 B ≤100,000 B |
| Security policy | Application CSP contains no `unsafe-eval`; protected admin APIs and RFC problem responses pass tests |
| Dependency severity | No high/critical finding at the required audit threshold; four moderate development-tool findings remain |
| Analytics privacy | Direct-identifier sanitizer, query-free paths, consent boundary and governed event dictionary implemented; tests pass |

Generated local reports are written to ignored build evidence paths so they cannot be confused with permanent production evidence:

- `dist/release-evidence/route-and-soft-404-report.json`
- `dist/release-evidence/automated-accessibility-report.json`
- `dist/release-evidence/performance-budget-report.json`

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
