# NIRANTAR CTO Session Recap and Constitution Completion Plan

Audit time: 2026-07-18 12:50 IST  
Authority: Talpro Global Marketing Website Constitution v2.1  
Repository: `talpro/talpro`  
Branch: `codex/nirantar-release-hardening-20260717`  
Audited source SHA: `a709136b9d695a63b07ba958b6f0f553f7600d8f`

## Executive Summary

The Constitution is frozen and the primary Forgejo source is mounted. P0 and P1
are locally implemented; P2 application, database and recovery controls pass a
real loopback PostgreSQL/HTTP sandbox with the approved six-record manifest; P3
has five governed buyer journeys; and every automatable P4 branch gate passes.

The website is not production-certified. Production still serves the older
architecture and differs from the verified candidate in 149 route/content
checks. It continues to publish unsupported claims and old IT-services
positioning, lacks `/trust`, `/jobs` and `/candidate-safety`, and has an upstream
CSP containing `unsafe-eval` plus duplicated security headers.

The authenticated HubSpot portal `244059903` contains active operational data
and is explicitly excluded from testing. A complete founder PROVE was received
but rejected because that same excluded portal remained the only open portal.
No CRM write occurred.

The completion certificate correctly fails with 67 unmet manifest checks. Paid
marketing, merge, production deployment and the certificate remain blocked.

## Requested Tasks

1. Freeze Constitution v2.1 and begin P0-P4 sequential implementation.
2. Place the Constitution inside `/Users/bhaskar_universe/CTO` and connect the
   primary Forgejo `talpro/talpro` repository.
3. Recheck P0 and continue P1 safely.
4. Start P2 from commit `295e9c7`.
5. Verify P2 through real non-production integrations and approved records.
6. Operate continuously in CTO/Chief Architect/Release Manager mode.
7. Attach the redacted buyer/vacancy manifest and record
   `PROVE NIR-P2-EVID-001`.
8. Securely connect and verify the selected CRM sandbox.
9. Record and validate `PROVE NIR-P2-CRM-002` without touching production.
10. Re-audit the complete repository, build, tests, routes, deployment state,
    environment gaps, live URL, risks and Constitution gap.
11. Maintain a complete NIRANTAR queue and autonomous execution plan.
12. Commit and push safe verified work, but do not bypass security, approvals,
    secrets, production safety or qualified-owner gates.

## Progress Table

| Task | Status | Evidence |
| --- | --- | --- |
| Constitution v2.1 frozen and mounted | Completed | `docs/website/TALPRO_WEBSITE_CONSTITUTION_v2.1.md`; frozen SHA-256 `eacde5f3...` |
| Primary Forgejo source connected | Completed | `/Users/bhaskar_universe/CTO/repos/talpro`; `origin=https://git.talpro.in/talpro/talpro.git` |
| P0 local restoration and route integrity | Completed locally / pending release | `0706441`; 31/31 current route verification passed |
| P1 positioning and offer governance | Completed locally / pending release | `295e9c7`; claim and offer tests pass |
| P2 application/database controls | Completed locally | `132cfd6`, `672d807`; 10/10 sandbox integration controls pass |
| Approved P2 record manifest | Completed | `b4975f5`; SHA-256 `b7c651117aad490ad05f22e849153e1982ca3433a06b8c712be2e94b1fb8b6b8` |
| Real external CRM sandbox | Blocked | Portal `244059903` fails non-production gate; zero external writes |
| P2 operational owner/SLA/vacancy/case-study/legal evidence | Pending | NIR-P2-001/002/003/005/006/007 |
| P3 buyer journeys and publication controls | Completed locally / evidence pending | `d81e3f5`; five governed audience journeys |
| Original research and regional variants | Pending | Qualified datasets, authors, reviewers and regional proof absent |
| P4 automatable local gates | Completed locally | 82 tests; 31 routes; zero automated accessibility violations; all dedicated gates pass |
| Human, legal, operational and production evidence | Blocked/pending | Queue items NIR-P4-001/002/005/006/008/010/012/013/014 |
| Production release | Blocked | Branch is unmerged; production is old release; no Codex deploy authority |
| Seven-day stability window | Blocked | Starts only after governed exact-SHA production release |
| Completion certificate | Blocked by design | Eligibility verifier reports 67 unmet checks |

## Live URLs

| URL | Current observation |
| --- | --- |
| `https://talproindia.com/` | `200`; old enterprise IT-services positioning and unsupported claims remain |
| `https://talproindia.com/about` | `301` to trailing-slash legacy route; differs from candidate |
| `https://talproindia.com/services` | `301` to trailing-slash legacy route; differs from candidate |
| `https://talproindia.com/contact` | `301` to trailing-slash legacy route; differs from candidate |
| `https://talproindia.com/trust` | `404`; required candidate route not deployed |
| `https://talproindia.com/jobs` | `404`; required candidate route not deployed |
| `https://talproindia.com/candidate-safety` | `404`; required candidate route not deployed |
| `https://talproindia.com/robots.txt` | `200`; old crawler/API policy |
| `https://talproindia.com/sitemap.xml` | `200`; old/evidence-gated route inventory |
| `https://talproindia.com/api/health` | `200`; application healthy but not the governed candidate |
| `https://git.talpro.in/talpro/talpro/compare/main...codex/nirantar-release-hardening-20260717` | Forgejo review comparison |
| `https://git.talpro.in/talpro/talpro/pulls/2` | WIP/draft Constitution review; merge remains blocked |

## Constitution vs Current Build Gap Table

| Phase | Verified branch | Live/operational gap | Verdict |
| --- | --- | --- | --- |
| P0 | 31 governed routes, genuine local HTML/API 404s, canonical/redirect/metadata/robots/sitemap controls pass | Old production release; 149 candidate differences; upstream CSP/header defects | Local complete; live pending |
| P1 | Six approved offer families and fail-closed claim registry | Old IT-services positioning and unsupported metrics/SLA/guarantee claims remain live | Local complete; live pending |
| P2 | Consent, attribution, dedupe, owner/score, durable CRM retry/escalation, feedback and governed jobs pass local integration | No approved real provider sandbox, operational owners/SLA, employer mandates, verified case studies or qualified legal packs | Partial |
| P3 | Five buyer journeys and content withholding controls | No approved original research, regional capability proof or `hreflang` variants | Partial |
| P4 | All automatable local build, route, security, accessibility, performance, structured-data and publication gates pass | Human WCAG, production CWV, qualified approvals, rollback exercise, protected release and seven-day observation absent | Partial |
| Certificate | Fail-closed decision engine works | 67 checks unmet; exact production SHA and 27 pre-certificate controls incomplete | Ineligible |

## Technical Audit

- Git: clean protected branch before this evidence update; 20 commits ahead of
  `origin/main`; local and Forgejo branch heads matched at audited SHA.
- Change scope from `main`: 150 files, 12,799 insertions and 10,831 deletions.
- TypeScript: passed.
- Lint: no package lint script exists; TypeScript, workflow `actionlint`,
  publication and release verifiers are the repository's lint-equivalent gates.
- Tests: 20 files / 82 tests passed.
- Build: production bundle passed; 31/31 routes prerendered.
- Release/soft-404: 31/31 passed with zero failures.
- Accessibility: static 31/31 passed; browser 31/31 passed with zero automated
  violations and 44 manual/incomplete checks retained.
- Structured data: 31/31 passed.
- Performance: deterministic build budgets passed; production field CWV absent.
- Runtime security: 12 isolated production-mode checks passed.
- Publication governance: passed.
- Workflow syntax: passed.
- Dependency audit: zero high/critical; four moderate esbuild development-chain
  findings. The automated fix is breaking, so it was not applied blindly.
- P2: approved manifest passed; real disposable PostgreSQL 16 plus loopback HTTP
  rerun passed 10/10 controls; container removed after verification.
- Certificate: correctly failed with 67 unmet controlled-manifest checks.
- Live monitor: 31 candidate routes checked; 149 differences/failures.
- Deployment: no merge or production deploy occurred. The repository workflow
  requires the `production` environment and self-hosted `talpro-india-deploy`
  runner, which are protected operator boundaries.
- Environment contracts, values deliberately unread: database, lead webhook,
  admin/MCP auth, email provider, analytics, AI generation and blog/webhook
  configuration names exist. No `.env*`, token, credential, key or secret file
  was opened.
- Tool gap: no callable SSH, VPS, Forgejo, HubSpot, CRM, PM2, Cloudflare or vault
  connector is installed. Git push to the mounted Forgejo remote works.

## Bugs/Risks

| ID | Severity | Risk | Current control |
| --- | ---: | --- | --- |
| TAL-R01 | Critical | Production publishes unsupported claims and old positioning | Governed branch withholds them; release blocked |
| TAL-R02 | High | Required trust/jobs/candidate routes are not live | Candidate routes pass; exact-SHA release required |
| TAL-R03 | High | Live CSP contains `unsafe-eval`; security headers duplicated | Candidate app policy passes; upstream operator fix required |
| TAL-R04 | Critical | HubSpot portal `244059903` contains operational data and was presented as sandbox | Fail-closed portal check prevented all writes |
| TAL-R05 | High | No genuine selected-provider sandbox or accountable CRM SLA evidence | Loopback proof retained; external gate blocked |
| TAL-R06 | High | No employer-authorized job pack or verified case-study permission | Publication gates withhold unapproved records |
| TAL-R07 | High | Qualified legal/privacy/employment approvals absent | Production certificate and claims remain blocked |
| TAL-R08 | High | No human WCAG/device/assistive-technology evidence | 44 findings retained for human review |
| TAL-R09 | High | No production 75th-percentile CWV or seven-day stability evidence | Observation begins only after release |
| TAL-R10 | Medium | Four moderate esbuild dev-chain advisories | High/critical gate passes; breaking auto-fix rejected |
| TAL-R11 | Medium | Node 26 emits `module.register()` deprecation during tooling | Non-fatal; track compatible `tsx`/toolchain update |
| TAL-R12 | Critical | Premature merge/deploy/certificate would bypass evidence gates | Protected workflow and fail-closed verifier |

## Completion Queue

The authoritative queue is `docs/website/NIRANTAR_COMPLETION_QUEUE.md`.

| State | Count | Meaning |
| --- | ---: | --- |
| Complete | 1 | P2 loopback technical integration boundary |
| Waiting release | 5 | Verified branch work requiring governed live release/proof |
| Waiting evidence | 14 | Operational, qualified, provider, human or production data required |
| Blocked | 8 | Provider/admin, upstream, legal, release, observation or certificate gates |
| Total | 28 | Every Constitution control remains explicitly tracked |

## CTO Autonomous Plan

1. Keep the branch and paid marketing locked while any queue item is open.
2. Continue local branch maintenance, dependency monitoring, tests, evidence
   generation and safe bug fixes automatically without founder involvement.
   The repeatable entrypoint is `npm run verify:constitution-local`.
3. Resume selected-provider P2 verification automatically when a distinct
   HubSpot sandbox portal is visible; submit only checksum-bound synthetic data.
4. Prepare Revenue Operations, Candidate Operations, case-study, legal/privacy,
   accessibility and release evidence packs; qualified owners supply facts and
   signatures that Codex cannot invent.
5. Keep the Forgejo comparison review-ready and rerun every local gate on the
   exact landing SHA after review changes.
6. The approved human operator fixes upstream headers, merges and deploys the
   exact reviewed SHA under the rollback runbook.
7. Immediately rerun the 31-route live monitor, provider/job tests, headers,
   structured data, accessibility and performance checks after deployment.
8. Execute and evidence rollback/restore with the approved operator.
9. Collect seven consecutive stable UTC days with independent origin/CDN,
   routes, conversion, jobs, security and field CWV evidence.
10. Populate the real controlled release manifest and run the fail-closed
    certificate verifier. Issue the certificate and unblock paid marketing only
    when it returns eligible with zero mandatory gaps.

## Founder PROVE Inputs Needed

Routine technical work requires no founder input. The current provider blocker
requires an already-created separate HubSpot sandbox/test portal to be open; then
the founder sends:

`PROVE NIR-P2-CRM-002: I confirm the currently open HubSpot portal is a Talpro non-production sandbox, cannot sync or automate records into production portal 244059903, and authorize Codex to submit only the approved NIR-P2-EVID-001 synthetic records for P2 verification.`

Later, only after every pre-release evidence gate is complete, the protected
release boundary is:

`PROVE NIR-P4-RELEASE-001: I authorize the approved human release operator to merge the verified Forgejo PR and deploy its exact reviewed SHA to Talpro production under the rollback runbook. Codex must not merge or deploy.`

Founder PROVE cannot replace qualified legal/privacy/accessibility/employment
approvals, provider identity controls, payment/subscription decisions, MFA/OAuth,
or the seven-day production evidence window.

## Git/Deploy Status

- Branch: `codex/nirantar-release-hardening-20260717`.
- Audited SHA: `a709136b9d695a63b07ba958b6f0f553f7600d8f`.
- Primary remote: Forgejo `talpro/talpro`.
- Draft review: Forgejo pull request `#2`, protected by a `WIP` title.
- `main`: `8e8ebef3c21708fa367a2cf9ad874e9c0fd2427e`.
- Branch ahead: 20 commits before this evidence update.
- Production: old release; 149 differences from candidate.
- Merge: not performed.
- Deployment: not performed.
- Production database/provider configuration/secrets: untouched.

## Final Close/Archive Decision

**Do not close or archive the Constitution programme.** The current session's
safe audit and branch implementation work is complete, but the overall objective
is materially incomplete. The certificate, paid marketing and production close
remain blocked until all 28 queue items have passed with exact evidence.

## Next 1 Founder Action

Have the HubSpot administrator open an already-created, visibly designated
non-production HubSpot portal in Chrome that is not portal `244059903`. No
password, token or environment value should be sent to Codex. Once open, send the
unchanged `PROVE NIR-P2-CRM-002` sentence above.
