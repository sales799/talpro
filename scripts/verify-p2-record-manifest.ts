import { readFileSync } from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const ROOT = path.resolve(import.meta.dirname, '..');
const MANIFEST_PATH = path.join(
  ROOT,
  'docs/website/evidence/P2_REDACTED_RECORD_MANIFEST_2026-07-18.json',
);
const REQUIRED_PROVE_TEXT = 'PROVE NIR-P2-EVID-001: I approve the attached redacted buyer and vacancy test records for non-production P2 verification and confirm their expected owners, SLA, attribution and expiry fields.';

const expectedSchema = z.object({
  owner: z.literal('Technology Talent'),
  leadScore: z.literal(100),
  acknowledgementStatus: z.literal('received'),
  crmDeliveryStatus: z.enum(['delivered', 'escalated']),
  crmAttemptCount: z.number().int().min(1).max(5),
  duplicateRowCountAfterReplay: z.literal(1).optional(),
  stableIdempotencyKey: z.literal(true).optional(),
});

const buyerSchema = z.object({
  recordId: z.string().regex(/^P2-BUYER-[A-Z]+-001$/),
  scenario: z.enum(['happy_path', 'retry_then_delivery', 'five_attempt_escalation']),
  firstName: z.literal('P2'),
  lastName: z.literal('Sandbox'),
  company: z.literal('Talpro Technical Sandbox'),
  email: z.string().email().refine((value) => value.endsWith('@example.invalid')),
  service: z.literal('it-staffing'),
  message: z.string().min(40),
  source: z.literal('constitution-p2-sandbox'),
  attribution: z.object({
    utmSource: z.literal('codex'),
    utmMedium: z.literal('nonproduction'),
    utmCampaign: z.literal('constitution-v2-1-p2'),
    utmTerm: z.literal('technical-verification'),
    utmContent: z.literal('synthetic-record'),
    landingPage: z.literal('/contact'),
    referrer: z.string().url().refine((value) => new URL(value).hostname === 'sandbox.invalid'),
  }),
  consent: z.object({
    given: z.literal(true),
    privacyNoticeVersion: z.literal('2026-03-14'),
  }),
  expected: expectedSchema,
});

const vacancySchema = z.object({
  recordId: z.string().regex(/^P2-JOB-[A-Z]+-001$/),
  scenario: z.enum(['current_verified', 'expired_verified', 'future_unverified']),
  title: z.string().min(10),
  slug: z.string().regex(/^p2-sandbox-[a-z-]+$/),
  location: z.literal('Bengaluru'),
  employmentType: z.literal('full-time'),
  description: z.string().min(40),
  requirements: z.array(z.string().min(5)).min(1),
  benefits: z.array(z.string()),
  applicationUrl: z.string().url().refine((value) => new URL(value).hostname === 'sandbox.invalid'),
  hiringOrganization: z.literal('Talpro Technical Sandbox'),
  mandateOwner: z.literal('Candidate Operations Sandbox'),
  postedDate: z.string().datetime(),
  verifiedAt: z.string().datetime().nullable(),
  verifiedBy: z.literal('Candidate Operations Sandbox').nullable(),
  expiresAt: z.string().datetime(),
  isActive: z.literal(true),
  expected: z.object({
    listVisible: z.boolean(),
    apiStatus: z.union([z.literal(200), z.literal(404)]),
    pageStatus: z.union([z.literal(200), z.literal(404)]),
  }),
});

const manifestSchema = z.object({
  schemaVersion: z.literal('1.0.0'),
  manifestId: z.literal('NIR-P2-EVID-001'),
  createdAt: z.string().datetime(),
  status: z.literal('approved_for_nonproduction_verification'),
  authority: z.literal('Talpro Global Marketing Website Constitution v2.1'),
  approval: z.object({
    approvedByRole: z.literal('Talpro Founder'),
    approvalSource: z.string().min(10),
    formalProveStatus: z.literal('received'),
    approvedAt: z.string().datetime(),
    requiredProveText: z.literal(REQUIRED_PROVE_TEXT),
    scope: z.literal('Synthetic non-production P2 verification records only'),
    productionExcluded: z.literal(true),
    publicClaimApproval: z.literal(false),
    externalProviderApproval: z.literal(false),
    employerMandateApproval: z.literal(false),
  }),
  dataBoundary: z.object({
    syntheticOnly: z.literal(true),
    containsRealPersonalData: z.literal(false),
    containsRealClientData: z.literal(false),
    emailDomain: z.literal('example.invalid'),
    applicationDomain: z.literal('sandbox.invalid'),
  }),
  sla: z.object({
    technicalAcknowledgement: z.string().min(20),
    publicResponseDuration: z.null(),
    operationalResponseStatus: z.literal('withheld_pending_revenue_operations_approval'),
    escalationOwnerStatus: z.literal('withheld_pending_revenue_operations_approval'),
  }),
  buyerRecords: z.array(buyerSchema).length(3),
  vacancyRecords: z.array(vacancySchema).length(3),
  limitations: z.array(z.string().min(20)).min(4),
});

const manifest = manifestSchema.parse(JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')));
const failures: string[] = [];
const assert = (condition: unknown, message: string) => {
  if (!condition) failures.push(message);
};

assert(new Set(manifest.buyerRecords.map(({ recordId }) => recordId)).size === 3, 'Buyer record IDs must be unique');
assert(new Set(manifest.buyerRecords.map(({ email }) => email)).size === 3, 'Buyer emails must be unique');
assert(new Set(manifest.buyerRecords.map(({ scenario }) => scenario)).size === 3, 'All three buyer scenarios are required');
assert(new Set(manifest.vacancyRecords.map(({ recordId }) => recordId)).size === 3, 'Vacancy record IDs must be unique');
assert(new Set(manifest.vacancyRecords.map(({ slug }) => slug)).size === 3, 'Vacancy slugs must be unique');
assert(new Set(manifest.vacancyRecords.map(({ scenario }) => scenario)).size === 3, 'All three vacancy scenarios are required');

const buyers = Object.fromEntries(manifest.buyerRecords.map((record) => [record.scenario, record]));
assert(buyers.happy_path.expected.crmDeliveryStatus === 'delivered', 'Happy path must deliver');
assert(buyers.happy_path.expected.crmAttemptCount === 1, 'Happy path must deliver in one attempt');
assert(buyers.happy_path.expected.duplicateRowCountAfterReplay === 1, 'Happy-path replay must retain one row');
assert(buyers.retry_then_delivery.expected.crmDeliveryStatus === 'delivered', 'Retry path must eventually deliver');
assert(buyers.retry_then_delivery.expected.crmAttemptCount === 2, 'Retry path must deliver on attempt two');
assert(buyers.retry_then_delivery.expected.stableIdempotencyKey === true, 'Retry path must require a stable idempotency key');
assert(buyers.five_attempt_escalation.expected.crmDeliveryStatus === 'escalated', 'Escalation path must end escalated');
assert(buyers.five_attempt_escalation.expected.crmAttemptCount === 5, 'Escalation path must exhaust five attempts');

const approvalTime = new Date(manifest.createdAt).getTime();
const vacancies = Object.fromEntries(manifest.vacancyRecords.map((record) => [record.scenario, record]));
assert(new Date(vacancies.current_verified.expiresAt).getTime() > approvalTime, 'Current vacancy must expire after manifest creation');
assert(vacancies.current_verified.verifiedAt !== null && vacancies.current_verified.verifiedBy !== null, 'Current vacancy must be verified');
assert(vacancies.current_verified.expected.listVisible && vacancies.current_verified.expected.apiStatus === 200 && vacancies.current_verified.expected.pageStatus === 200, 'Current vacancy must be visible with 200 API/page status');
assert(new Date(vacancies.expired_verified.expiresAt).getTime() < approvalTime, 'Expired vacancy must expire before manifest creation');
assert(!vacancies.expired_verified.expected.listVisible && vacancies.expired_verified.expected.apiStatus === 404 && vacancies.expired_verified.expected.pageStatus === 404, 'Expired vacancy must be withheld with 404 API/page status');
assert(vacancies.future_unverified.verifiedAt === null && vacancies.future_unverified.verifiedBy === null, 'Unverified vacancy must not contain verification evidence');
assert(!vacancies.future_unverified.expected.listVisible && vacancies.future_unverified.expected.apiStatus === 404 && vacancies.future_unverified.expected.pageStatus === 404, 'Unverified vacancy must be withheld with 404 API/page status');

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log('P2 redacted record manifest validation passed.');
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
  console.log('Founder PROVE NIR-P2-EVID-001 approval is recorded.');
}
