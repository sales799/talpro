# Talpro Governed Release and Rollback Runbook

Status: procedure authored; execution requires the approved release operator.  
Production deployment by Codex is prohibited.

## Preconditions

1. The reviewed branch has an exact immutable commit SHA.
2. TypeScript, tests, full build, governed prerender, route verification, automated accessibility semantics, performance budgets, workflow syntax and high-severity dependency gates pass for that SHA.
3. P2 migrations have passed against the named approved non-production database with backup and restore evidence.
4. Required content, claim, legal, privacy, security, candidate, revenue-operations and release approvals are attached to the release record.
5. The current production release identifier and previous known-good release are recorded.
6. The rollback owner, incident owner and monitoring window are named.

## Release procedure

The approved human operator uses the protected Forgejo review and production environment. The operator must:

1. remove WIP only after mandatory evidence is attached;
2. merge the exact reviewed SHA without bypassing required review;
3. verify the deployed release resolves to that SHA;
4. run application and independent-origin health checks;
5. verify the homepage positioning, all governed route families, robots, sitemaps, contact API, real 404/503 behaviour, security headers and current verified job behaviour;
6. submit approved post-release test records and confirm CRM owner, retry, escalation and opportunity feedback;
7. start the seven-day stability record.

Database migrations are a separately approved operation. A website release does not authorise a production migration.

## Stop and rollback conditions

Rollback is mandatory for a Critical availability failure, wrong release SHA, broken contact capture, evidence-gated content becoming public, security-header regression, route-wide soft 404, unexpected production write, or privacy/consent failure.

The approved operator restores the previously recorded known-good release using the existing release mechanism, restarts only the authorised service, verifies independent and origin health, freezes further changes, and opens an incident record. Codex may analyse evidence and prepare a branch fix; it must not execute the production rollback.

## Evidence record

Record timestamps, operator, reviewed SHA, prior SHA, release identifier, test matrix, screenshots/log references, CRM test record IDs, job record IDs, security-header result, rollback decision, and incident reference. Do not copy credentials, private keys, tokens, environment values or personal data into the record.

## Seven-day stability matrix

For each UTC/IST day after release, capture independent availability, origin availability, governed-route sample, genuine 404, robots/sitemap, contact capture/delivery, job freshness, security headers, error rate, Core Web Vitals availability and open Critical/High issues. Any Critical availability failure restarts the seven-day certification window after remediation.
