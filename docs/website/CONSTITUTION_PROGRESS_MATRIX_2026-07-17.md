# Talpro Website Constitution v2.1 Progress Matrix

Audit date: 2026-07-17  
Repository: `talpro/talpro`  
Working branch: `codex/nirantar-release-hardening-20260717`  
Production baseline observed: `8e8ebef3c21708fa367a2cf9ad874e9c0fd2427e`

## Executive verdict

The repository has verified P0 and P1 implementation, the safe local P2 recovery controls, five governed P3 buyer journeys and the automatable P4 quality gates on an unmerged branch. Production still serves the older architecture. Real P2 operational evidence, original research, regional proof, human/qualified approvals, protected release evidence, the seven-day observation window and the completion certificate remain open.

| Constitution phase | Repository state | Live state | Evidence | Verdict |
|---|---|---|---|---|
| P0 restoration | Route governance, truthful fallback shells, metadata, robots/sitemap and release checks implemented | Old titles/routes/sitemap remain live; several governed routes return the homepage fingerprint | `0706441b05`, `d952f68d94`; 25/25 prerender and release verification passed | LOCAL COMPLETE / LIVE PENDING |
| P1 positioning | Six approved offers, legacy redirects and claim governance implemented | Old enterprise IT-services positioning remains live | `295e9c7501`; offer and claim-registry tests pass | LOCAL COMPLETE / LIVE PENDING |
| P2 trust and conversion | Consent, attribution, dedupe, lead owner/score, acknowledgement, trust/job gates, durable CRM retry/escalation and opportunity feedback implemented | New trust/jobs/candidate controls are not live; real integration evidence is absent | `132cfd65c8`, `1572000723`, `672d807`; migration `003_p2_lead_delivery_recovery.sql`; recovery tests pass | PARTIAL |
| P3 authority and regional depth | Five buyer journeys, a governed audience index, executable P3 content registry and transparent research withholding are implemented; original research and regional variants remain evidence-gated | Old broad sitemap/content remains live | `d81e3f5`; `P3_CONTENT_GOVERNANCE.md`; content and route tests | PARTIAL |
| P4 quality and release governance | Typecheck, 82 tests, 31-route build/release/static-and-browser-accessibility/structured-data gates, checksum/rendered-claim/client-leakage publication governance, isolated runtime security, deterministic performance budgets, analytics privacy rules, positive and adversarial certificate-gate tests, workflow lint and high-severity audit pass locally | Production header duplication, `unsafe-eval`, old release, no human accessibility/qualified review or observation window | `P4_LOCAL_CERTIFICATION_EVIDENCE_2026-07-17.md`; generated build evidence | PARTIAL |
| Certificate | Certificate intentionally withheld | Not eligible | Mandatory queue has open items | BLOCKED BY DESIGN |

## Current verified technical evidence

- TypeScript: passed.
- Tests: 20 files, 82 tests passed.
- Full build: passed.
- Prerender: 31 of 31 governed routes passed, including the P3 audience index and five buyer journeys.
- Release verifier: 31 governed routes have no duplicate titles/H1s/body fingerprints, canonical mismatches, invalid JSON-LD or broken governed links.
- Workflow syntax: passed with the declared self-hosted deployment runner label.
- Dependency gate: no high or critical vulnerability; four moderate development-tool findings remain documented.
- Git: P0 through P3 commits are pushed to primary Forgejo; the P4 candidate is committed only after every local gate in this matrix passes.
- P2 recovery: durable due-record lookup, atomic lease, idempotency key, bounded retry policy, exhausted-retry escalation state and opportunity feedback validation pass synthetic local tests. This is not a substitute for the required approved sandbox evidence.

## Live observations requiring closure

- Homepage still presents the earlier enterprise IT-services title and message.
- `/trust`, `/jobs` and `/candidate-safety` return HTTP 404 with the old homepage document fingerprint.
- Live `robots.txt` and sitemap publish the earlier route inventory, including surfaces now evidence-gated.
- Live content-security policy still contains `unsafe-eval` and multiple security headers are duplicated between application and upstream layers.
- `/api/health` is healthy, but this does not prove the governed release or its mandatory controls.

## Release boundary

No production merge or deployment was performed. Paid marketing and the Constitution completion certificate remain prohibited until `NIRANTAR_COMPLETION_QUEUE.md` has no mandatory open item and the resulting evidence is independently reviewable.
