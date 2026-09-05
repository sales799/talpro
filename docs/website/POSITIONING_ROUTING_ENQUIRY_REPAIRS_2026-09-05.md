# Talpro positioning, routing and enquiry repairs

Date: 2026-09-05. Verdict: **implementation complete for review; release blocked**.

This increment completes the safely reversible repairs requested before content
expansion. It builds on `codex/nirantar-release-hardening-20260717` at
`d3db45162c686cbbd782dde8403f8ec3998e926d`, associated with protected Forgejo
PR #2. The owned branch is
`codex/talpro-positioning-routing-enquiry-20260905`. The original checkout
remained clean and unchanged. No merge or deployment occurred.

## Resulting behavior

- Homepage and employer service labels and destinations use the existing
  six-service registry. The approved India technology talent/GCC positioning
  remains, while internal approval terminology is removed from key buyer copy.
  Hire Talent links explicitly select Technology Talent Solutions.
- Contact links accept approved service slugs, display names and existing
  legacy aliases. For example, `Sales Staffing` follows the established mapping
  to Permanent Hiring, and `Technology Talent Solutions` selects `it-staffing`.
  Unknown values leave the selector blank. General legacy enquiries select Other.
- Query-only navigation respects deliberate service/email edits, including an
  email deliberately cleared to blank. A new campaign query replaces the complete
  five-field UTM bundle; service-only navigation retains it. A fresh enquiry
  retains attribution and requires fresh consent. Failed requests retain the brief.
- Legacy and canonical redirects preserve the original encoded query, including
  repeated parameters. Employer and service URLs return their own initial HTML,
  titles, headings and canonicals. Missing static prerenders return 503 instead
  of successful homepage content. Unknown routes and direct SPA HTML return real
  noindex 404s; known `index.html` aliases redirect to canonical routes.
- An incomplete prerender now fails the build. Verified dynamic job statuses and
  the existing policy withholding unapproved content are preserved.

## Reuse and scope evidence

The existing Constitution, controlling NIRANTAR queue, service registry, legacy
redirect mapping, enquiry API, consent/attribution contract, prerender and release
checks were inspected and reused. Repository origin is the canonical
`https://git.talpro.in/talpro/talpro.git`. No new platform, CMS, publishing lane,
scheduler or CRM was proposed or built. This increment requires no VPS capability
change. Future content publishing remains subject to DOOT and the existing
evidence controls. No services, jobs, case studies or new pages were added.

## Verification and limits

Dependencies were installed from the unchanged lockfile in the isolated worktree
using bundled Node 24.19.0. Commands ran with a minimal environment excluding
application credentials and external database configuration. Local Chrome was
used for the repository's browser checks. No production/provider test submission
or database migration occurred.

| Check | Result |
|---|---|
| `npm run check` | Pass after correcting an unsupported test query option |
| `npm test -- --maxWorkers=2` | 149/149 tests, 23 files; pass |
| Enquiry subset | 47 cases: 32 normalization/query helpers and 15 form journeys |
| `npm run build:full` | 31/31 prerendered routes; pass |
| `npm run verify:release` | 31 governed routes; pass |
| `npm run verify:accessibility` and `npm run verify:accessibility:browser` | Pass automated checks; 52 incomplete route/rule checks still need review |
| Performance, structured-data, publication-governance, isolated runtime-security and P2 record-manifest commands | Pass |
| `actionlint` | Pass |
| Built HTTP smoke | 19 request cases, 70 assertions, zero failures |
| `npm audit --audit-level=high` | FAIL: 10 high, 11 moderate, 1 low finding in unchanged dependencies |
| `git diff --check` | Pass |

The full `npm run verify:constitution-local` command exited 1 with three failed
gates: typecheck, tests and dependency audit. Typecheck passed after its test-only
correction. The first real-form test exceeded the overall time budget while many
test/browser workers competed; its bounded timeout was set to 10 seconds without
changing assertion deadlines. The final complete two-worker suite passed, with
that case taking 1.195 seconds. No product assertion failure remains reproduced.
The dependency failure is unresolved. The original aggregate report is retained;
the consolidated receipt records later successful targeted reruns separately.

An independent read-only review found two enquiry edge cases (cleared-email
restoration and mixed campaign fields). Both were repaired, regression-tested,
and re-reviewed with no further actionable finding.

The Mac was locked during the attempted manual visual walkthrough. Automated
browser evidence is available, but manual visual/device/assistive-technology
signoff is pending. Mocked form delivery does not establish real CRM receipt,
ownership, retries, SLA or opportunity feedback. Existing provider, legal,
claim-approval and seven-day production evidence remain open.

Evidence:

- `evidence/POSITIONING_ROUTING_ENQUIRY_LOCAL_GATES_2026-09-05.json`
- `evidence/POSITIONING_ROUTING_HTTP_2026-09-05.json`
- Existing generated details under `dist/release-evidence/` in the tested worktree.

## Review, deployment and rollback

Keep this increment in a WIP review against the existing candidate branch and
keep PR #2 protected. Review the exact committed repair and evidence, remediate
the dependency gate under `NIR-P4-003`, complete the existing CRM/qualified/manual
approval requirements, and rerun the aggregate gate before release. The workflow
was inspected: deployment requires a push to `main`; this branch does not meet
that condition. Workflow and deployment settings were not changed.

`RELEASE_ROLLBACK_RUNBOOK.md` remains authoritative: production merge, deployment
and rollback belong to the approved human operator. No new production rollback
exercise or backup was performed. Locally the increment can be reverted as a
single reviewed commit; the previous candidate is preserved at the base SHA above.
Content expansion is not the next release action while these controls are open.
