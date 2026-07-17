-- P2 governance controls. This migration is intentionally not executed by Codex.

ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS utm_term TEXT;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS landing_page TEXT;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS privacy_notice_version VARCHAR(40);
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS submission_fingerprint VARCHAR(64);
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS duplicate_of VARCHAR;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS lead_owner VARCHAR(120) NOT NULL DEFAULT 'Unassigned';
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS lead_score INTEGER NOT NULL DEFAULT 0;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS acknowledgement_at TIMESTAMP;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_delivery_status VARCHAR(30) NOT NULL DEFAULT 'not_configured';
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_delivery_attempted_at TIMESTAMP;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_delivered_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_contact_submission_fingerprint
  ON contact_inquiries (submission_fingerprint, created_at DESC);

ALTER TABLE jobs ADD COLUMN IF NOT EXISTS hiring_organization TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS verified_by VARCHAR(160);

-- Previously seeded or imported roles cannot remain public without an owner,
-- expiry, verified application URL, and current mandate confirmation.
UPDATE jobs
SET is_active = false,
    updated_date = NOW()
WHERE verified_at IS NULL
   OR expires_at IS NULL
   OR application_url IS NULL
   OR application_url NOT LIKE 'https://%'
   OR verified_by IS NULL
   OR hiring_organization IS NULL;

CREATE INDEX IF NOT EXISTS idx_jobs_publication_gate
  ON jobs (is_active, verified_at, expires_at, posted_date DESC);
