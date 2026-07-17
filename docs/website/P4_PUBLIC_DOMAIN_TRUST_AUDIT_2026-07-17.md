# P4 Public Domain and Email Trust Audit — 2026-07-17

Scope: read-only public DNS and live HTTP evidence for `talproindia.com`.
No provider configuration, credentials, secrets or production state were
opened or changed.

## Observed controls

| Control | Observation | Verdict |
|---|---|---|
| MX | Microsoft 365 protection endpoint is published | Present |
| SPF | Microsoft 365 include with hard fail (`-all`) | Pass |
| DMARC | Published with quarantine policy and aggregate reporting | Pass, monitoring evidence still required |
| DKIM | No record resolved for the common `google`, `selector1` or `selector2` selectors | Not proven; provider owner must confirm the active selector and signing result |
| CAA | No CAA record observed | Optional hardening gap, not a substitute for certificate monitoring |
| HSTS | Present on live responses | Present |
| CSP | Live upstream policy still includes `unsafe-eval` | Mandatory failure |
| Route integrity | `/trust`, `/jobs`, `/candidate-safety` and a random invalid route return the same homepage body fingerprint | Mandatory failure |

## Required closure evidence

- A redacted delivered-message header proving aligned SPF, DKIM and DMARC.
- Provider evidence for administration MFA and authorised sender inventory.
- Impersonation/domain monitoring owner and incident escalation proof.
- One effective live CSP without `unsafe-eval` and without duplicated headers.
- Post-release route/body-fingerprint checks from CDN and origin viewpoints.

DNS or provider changes require the authorised domain/email operator and are
outside autonomous repository work.
