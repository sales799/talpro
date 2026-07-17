# P4 Release Pack Automation — 2026-07-17

Candidate branch: `codex/nirantar-release-hardening-20260717`

## Automated evidence

| Command | Durable build artifact | Current result |
|---|---|---|
| `npm run verify:release` | `route-and-soft-404-report.json` | 31/31 pass |
| `npm run verify:structured-data` | `structured-data-report.json` | 31/31 pass |
| `npm run verify:publication` | `publication-governance-report.json` | Pass |
| `npm run verify:accessibility` | `automated-accessibility-report.json` | 31/31 pass |
| `npm run verify:accessibility:browser` | `browser-accessibility-report.json` | Zero violations; 31 incomplete dynamic-control checks retained for manual review |
| `npm run verify:performance` | `performance-budget-report.json` | Pass |
| `npm run verify:security` | `runtime-security-report.json` | Pass in isolated production mode |
| `npm run monitor:production` | `live-production-monitor-report.json` | Fails with 149 differences/failures because production is still the old release |
| `npm run verify:certificate-eligibility` | `certificate-eligibility-report.json` | Intentionally fails closed with the template manifest; only a completed exact-SHA release manifest can pass |

The CI quality job runs every local pass/fail gate above except the production
monitor and certificate-eligibility gate. The monitor is intentionally a
post-release/read-only gate and cannot pass before the exact candidate is live.
The certificate gate must be run from the exact released SHA with a completed
copy of `docs/website/evidence/CONSTITUTION_RELEASE_MANIFEST.template.json`.

## Non-automatable mandatory evidence

- Approved sandbox CRM/jobs records and accountable operational owners.
- Qualified legal, privacy, employment, claim and content approval.
- Human keyboard, screen-reader, zoom, reflow, motion and device/browser review.
- Production 75th-percentile Core Web Vitals.
- Approved restore/rollback exercise and exact-SHA release evidence.
- Seven consecutive stable production days.

Human accessibility and seven-day stability evidence templates are stored in
`docs/website/evidence/`. They are controlled blanks, not proof of completion.

Automated evidence narrows risk; it does not authorise production or the
Constitution completion certificate.
