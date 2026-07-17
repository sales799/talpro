# P2 Control Evidence

Authority: Talpro Global Marketing Website Constitution v2.1, frozen 2026-07-16.

Branch baseline: commit `295e9c7501f754c0503e2d7811a27dd65ee64ba4`.

This record distinguishes implemented local controls from operational evidence
that cannot be created or assumed in the source repository.

## Local controls implemented

| Control | Evidence | Status |
| --- | --- | --- |
| Trust and Procurement Centre | `/trust`, `shared/trust-registry.ts` | Implemented locally |
| Candidate fee/fraud/data-rights notice | `/candidate-safety`, approved claim registry record | Implemented locally |
| Accessibility statement and feedback route | `/accessibility` | Implemented locally |
| Real job publication architecture | `/jobs`, `/jobs/:slug`, evidence-gated API, expiry and HTTPS requirements | Implemented locally |
| Stale/sample job suppression | Public API filters plus migration deactivation gate | Implemented locally |
| Buyer form consent and notice version | Contact UI and server schema | Implemented locally |
| Lead attribution | Landing page, referrer, and five UTM fields | Implemented locally |
| Lead ownership and qualification | Deterministic route and score functions | Implemented locally |
| Deduplication | SHA-256 submission fingerprint and 24-hour recent-inquiry check | Implemented locally |
| Acknowledgement and delivery monitoring | Reference ID, owner, acknowledgement timestamp, CRM delivery state | Implemented locally |
| Unsafe webhook fallback removal | CRM forwarding only when an HTTPS destination is explicitly configured | Implemented locally |
| Newsletter suppression | Public signup removed and API gated until consent, suppression, unsubscribe, and provider evidence exist | Implemented locally |
| Unpublished content suppression | Blog read/write APIs and RSS gated; blog sitemap removed from the index and returns no URLs | Implemented locally |
| Universal SLA removal | Unsupported contact, privacy, security, DPO, and grievance durations removed | Implemented locally |
| Case-study publication gate | Trust registry plus case-study evidence register | Implemented locally |

## Evidence still required

| Mandatory evidence | Accountable owner | Current state |
| --- | --- | --- |
| Client-authorized case study with calculation method | Marketing / Legal / Delivery | Missing; publication blocked |
| Approved accountable-leadership identity pack | CEO / Legal | Existing public baseline only; approval pack missing |
| Live CRM destination, record creation, owner assignment, retry, escalation, and opportunity feedback proof | Revenue Operations | Not connected or exercised |
| Tested acknowledgement and service capacity with an approved public SLA | Revenue Operations / Delivery | No universal SLA approved |
| Production database migration evidence | Engineering / Database owner | Migration authored but not executed |
| Verified live vacancies with employer, owner, expiry, and application route | Candidate Operations | No approved vacancy pack in repository |
| DPA, SLA, vendor onboarding, subprocessors, insurance, and certification evidence | Legal / Security / Finance | Consolidated pack missing |
| Legal review of privacy, candidate, grievance, accessibility, and procurement wording | Legal counsel | Pending P4 gate |
| Dynamic job-page server status verification against the live database | Engineering | Status resolver implemented; live 200/404/503 proof still requires live job data and release environment |

## Release decision

P2 source implementation may be reviewed on its branch. It is not production
certified. Paid marketing and the production certificate remain blocked until
every mandatory control has current evidence and the required operational tests pass.

## Local verification

- TypeScript: passed.
- Automated tests: 45 passed across 12 files.
- Production build: passed.
- Dependency audit at the required high threshold: passed with zero high or
  critical findings; four moderate esbuild findings remain in the development
  toolchain and the available automated fix is breaking.
- Local production-mode route smoke with database and lead-webhook connections
  deliberately disabled:
  - `/trust`, `/candidate-safety`, `/accessibility`, `/jobs`: `200`.
  - unknown route: `404`.
  - unavailable dynamic job and job API detail: `503`.
  - legacy refund and shipping pages: `301` to terms.
  - blocked blog and RSS APIs: `410`.
  - sitemap index excludes the blog sitemap; the legacy blog sitemap contains
    zero URLs.
- No production deploy, database migration, live CRM submission, external
  webhook delivery, DNS change, or production configuration change was performed.
