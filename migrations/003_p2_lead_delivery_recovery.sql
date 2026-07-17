-- Durable P2 lead-delivery recovery. This migration is intentionally not
-- executed by Codex without an approved non-production database boundary.

ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_delivery_attempt_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_next_attempt_at TIMESTAMP;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_delivery_lease_until TIMESTAMP;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_last_error_code VARCHAR(80);
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_escalated_at TIMESTAMP;
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_opportunity_id VARCHAR(160);
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_opportunity_stage VARCHAR(120);
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS crm_feedback_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_contact_crm_delivery_recovery
  ON contact_inquiries (crm_next_attempt_at, created_at)
  WHERE crm_delivery_status IN ('pending', 'failed');

CREATE INDEX IF NOT EXISTS idx_contact_crm_opportunity
  ON contact_inquiries (crm_opportunity_id)
  WHERE crm_opportunity_id IS NOT NULL;
