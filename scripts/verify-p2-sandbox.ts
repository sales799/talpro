import express from 'express';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import request from 'supertest';

const ROOT = path.resolve(import.meta.dirname, '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const MANIFEST_PATH = path.join(ROOT, 'docs/website/evidence/P2_REDACTED_RECORD_MANIFEST_2026-07-18.json');
const manifestBytes = readFileSync(MANIFEST_PATH);
const manifest = JSON.parse(manifestBytes.toString('utf8'));
const manifestSha256 = createHash('sha256').update(manifestBytes).digest('hex');

if (manifest.status !== 'approved_for_nonproduction_verification') {
  throw new Error('P2 record manifest is not approved for non-production verification');
}
if (manifest.approval?.formalProveStatus !== 'received' || manifest.approval?.productionExcluded !== true) {
  throw new Error('P2 record manifest lacks the formal founder PROVE or production exclusion');
}

const buyers = Object.fromEntries(manifest.buyerRecords.map((record: any) => [record.scenario, record]));
const vacancies = Object.fromEntries(manifest.vacancyRecords.map((record: any) => [record.scenario, record]));
const rawDatabaseUrl = process.env.P2_SANDBOX_DATABASE_URL;

if (!rawDatabaseUrl) throw new Error('P2_SANDBOX_DATABASE_URL is required');
const databaseUrl = new URL(rawDatabaseUrl);
if (!['127.0.0.1', 'localhost'].includes(databaseUrl.hostname)) {
  throw new Error('P2 sandbox verification is restricted to a loopback database');
}
if (!/sandbox|nonprod|test/i.test(databaseUrl.pathname)) {
  throw new Error('P2 sandbox database name must explicitly identify a sandbox/test boundary');
}
if (process.env.P2_SANDBOX_CONFIRM_NONPRODUCTION !== 'confirmed') {
  throw new Error('P2_SANDBOX_CONFIRM_NONPRODUCTION=confirmed is required');
}
if (process.env.DATABASE_URL !== rawDatabaseUrl) {
  throw new Error('DATABASE_URL must exactly match P2_SANDBOX_DATABASE_URL');
}

process.env.NODE_ENV = 'development';

type MockRecord = {
  email: string;
  idempotencyKey: string;
  inquiryId: string;
};
const mockRecords: MockRecord[] = [];
const attempts = new Map<string, number>();
const mockCrm = createServer((req, res) => {
  const chunks: Buffer[] = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    const email = String(body.email || '');
    const count = (attempts.get(email) || 0) + 1;
    attempts.set(email, count);
    mockRecords.push({
      email,
      idempotencyKey: String(req.headers['idempotency-key'] || ''),
      inquiryId: String(body.inquiry_id || ''),
    });
    const shouldFail = email.includes('escalation') || (email.includes('retry') && count === 1);
    res.statusCode = shouldFail ? 503 : 202;
    res.end();
  });
});

await new Promise<void>((resolve) => mockCrm.listen(0, '127.0.0.1', resolve));
const address = mockCrm.address();
if (!address || typeof address === 'string') throw new Error('Mock CRM did not bind to loopback');
const webhookUrl = `http://127.0.0.1:${address.port}/leads`;
process.env.LEADHUNTER_WEBHOOK_URL = webhookUrl;

const failures: string[] = [];
const assert = (condition: unknown, message: string) => {
  if (!condition) failures.push(message);
};

const { eq, like } = await import('drizzle-orm');
const { contactInquiries, jobs, opportunityFeedbackSchema } = await import('../shared/schema');
const { db, pool } = await import('../server/db');
const { DatabaseStorage } = await import('../server/storage');
const { recoverDueLeadDeliveries } = await import('../server/lead-delivery');
const { registerRoutes } = await import('../server/routes');
const { resolveJobPageStatus } = await import('../server/jobs-routes');
const {
  blockSensitivePaths,
  csrfTokenEndpoint,
  sanitizeInput,
  securityHeaders,
  validateCsrf,
} = await import('../server/security-middleware');

if (!db || !pool) throw new Error('Sandbox database did not initialize');
const storage = new DatabaseStorage();

const app = express();
app.disable('x-powered-by');
app.use(securityHeaders);
app.use(express.json());
app.use(blockSensitivePaths);
app.use(sanitizeInput);
app.get('/api/csrf-token', csrfTokenEndpoint);
app.use('/api', validateCsrf);
await registerRoutes(app);

const pageApp = express();
pageApp.get('/jobs/:slug', resolveJobPageStatus, (_req, res) => res.sendStatus(res.locals.spaStatus));

async function csrf(): Promise<string> {
  const response = await request(app).get('/api/csrf-token').expect(200);
  return response.body.csrfToken;
}

const contactPayload = (record: any) => ({
  firstName: record.firstName,
  lastName: record.lastName,
  company: record.company,
  email: record.email,
  service: record.service,
  message: record.message,
  source: record.source,
  ...record.attribution,
  consentGiven: record.consent.given,
  privacyNoticeVersion: record.consent.privacyNoticeVersion,
});

const approvedBuyerRecords = [buyers.happy_path, buyers.retry_then_delivery, buyers.five_attempt_escalation];
const syntheticEmails = approvedBuyerRecords.map((record) => record.email);
const approvedVacancyRecords = [vacancies.current_verified, vacancies.expired_verified, vacancies.future_unverified];
const jobSlugs = approvedVacancyRecords.map((record) => record.slug);

let report: Record<string, unknown> = {};
try {
  await db.delete(contactInquiries).where(like(contactInquiries.email, 'p2-sandbox-%@example.invalid'));
  await db.delete(jobs).where(like(jobs.slug, 'p2-sandbox-%'));

  const happyPayload = contactPayload(buyers.happy_path);
  const happyResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send(happyPayload)
    .expect(201);
  assert(happyResponse.body.routingStatus === 'delivered', 'CRM happy path was not delivered');

  const [happyRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.email, syntheticEmails[0]));
  assert(Boolean(happyRecord), 'CRM happy-path inquiry was not persisted');
  assert(happyRecord?.leadOwner === buyers.happy_path.expected.owner, 'lead owner mapping did not match the approved expectation');
  assert(happyRecord?.leadScore === buyers.happy_path.expected.leadScore, 'lead score did not match the approved expectation');
  assert(happyRecord?.utmCampaign === buyers.happy_path.attribution.utmCampaign, 'campaign attribution was not persisted');
  assert(happyRecord?.crmDeliveryStatus === buyers.happy_path.expected.crmDeliveryStatus, 'happy-path CRM delivery state did not match the approved expectation');

  const duplicateResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send(happyPayload)
    .expect(202);
  const duplicateRows = await db.select().from(contactInquiries).where(eq(contactInquiries.email, syntheticEmails[0]));
  assert(duplicateResponse.body.duplicate === true, 'duplicate submission was not labelled duplicate');
  assert(duplicateRows.length === buyers.happy_path.expected.duplicateRowCountAfterReplay, 'duplicate submission row count did not match the approved expectation');

  const retryResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send(contactPayload(buyers.retry_then_delivery))
    .expect(201);
  assert(retryResponse.body.routingStatus === 'held_for_retry', 'forced CRM failure was not retained for retry');
  let [retryRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.email, syntheticEmails[1]));
  await storage.updateContactInquiry(retryRecord.id, { crmNextAttemptAt: new Date(0) });
  const retrySummary = await recoverDueLeadDeliveries({ storage, webhookUrl, now: new Date() });
  [retryRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, retryRecord.id));
  assert(retrySummary.delivered === 1, 'retry worker did not deliver the due inquiry');
  assert(retryRecord.crmDeliveryStatus === buyers.retry_then_delivery.expected.crmDeliveryStatus && retryRecord.crmDeliveryAttemptCount === buyers.retry_then_delivery.expected.crmAttemptCount, 'retry state did not match the approved delivery expectation');

  const escalationResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send(contactPayload(buyers.five_attempt_escalation))
    .expect(201);
  assert(escalationResponse.body.routingStatus === 'held_for_retry', 'escalation record did not begin in retry state');
  let [escalationRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.email, syntheticEmails[2]));
  for (let attempt = 2; attempt <= 5; attempt += 1) {
    await storage.updateContactInquiry(escalationRecord.id, {
      crmDeliveryStatus: 'failed',
      crmNextAttemptAt: new Date(0),
      crmDeliveryLeaseUntil: null,
    });
    await recoverDueLeadDeliveries({ storage, webhookUrl, now: new Date(Date.now() + attempt * 1000) });
    [escalationRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, escalationRecord.id));
  }
  assert(escalationRecord.crmDeliveryStatus === buyers.five_attempt_escalation.expected.crmDeliveryStatus, 'fifth failed delivery did not match the approved escalation state');
  assert(escalationRecord.crmDeliveryAttemptCount === buyers.five_attempt_escalation.expected.crmAttemptCount && Boolean(escalationRecord.crmEscalatedAt), 'escalation evidence lacks the approved attempt count or timestamp');

  const feedback = opportunityFeedbackSchema.parse({
    opportunityId: 'opp-p2-sandbox-001',
    stage: 'qualified',
    recordedAt: new Date().toISOString(),
  });
  await storage.updateContactInquiry(happyRecord.id, {
    crmOpportunityId: feedback.opportunityId,
    crmOpportunityStage: feedback.stage,
    crmFeedbackAt: new Date(feedback.recordedAt),
  });
  const [feedbackRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, happyRecord.id));
  assert(feedbackRecord.crmOpportunityStage === 'qualified' && Boolean(feedbackRecord.crmFeedbackAt), 'opportunity feedback was not persisted');

  await db.insert(jobs).values(approvedVacancyRecords.map((record) => ({
    title: record.title,
    slug: record.slug,
    location: record.location,
    employmentType: record.employmentType,
    description: record.description,
    requirements: record.requirements,
    benefits: record.benefits,
    applicationUrl: record.applicationUrl,
    hiringOrganization: record.hiringOrganization,
    postedDate: new Date(record.postedDate),
    expiresAt: new Date(record.expiresAt),
    verifiedAt: record.verifiedAt ? new Date(record.verifiedAt) : null,
    verifiedBy: record.verifiedBy,
    isActive: record.isActive,
    source: 'p2-sandbox',
  })));

  const jobsResponse = await request(app).get('/api/jobs').expect(200);
  assert(jobsResponse.body.total === 1 && jobsResponse.body.jobs[0]?.slug === jobSlugs[0], 'public jobs list did not expose exactly the approved current verified role');
  await request(app).get(`/api/jobs/${jobSlugs[0]}`).expect(vacancies.current_verified.expected.apiStatus);
  await request(app).get(`/api/jobs/${jobSlugs[1]}`).expect(vacancies.expired_verified.expected.apiStatus);
  await request(app).get(`/api/jobs/${jobSlugs[2]}`).expect(vacancies.future_unverified.expected.apiStatus);
  await request(app).get('/api/jobs/p2-sandbox-unknown-role').expect(404);
  await request(pageApp).get(`/jobs/${jobSlugs[0]}`).expect(vacancies.current_verified.expected.pageStatus);
  await request(pageApp).get(`/jobs/${jobSlugs[1]}`).expect(vacancies.expired_verified.expected.pageStatus);
  await request(pageApp).get(`/jobs/${jobSlugs[2]}`).expect(vacancies.future_unverified.expected.pageStatus);

  const happyWebhook = mockRecords.filter((record) => record.email === syntheticEmails[0]);
  const retryWebhooks = mockRecords.filter((record) => record.email === syntheticEmails[1]);
  const escalationWebhooks = mockRecords.filter((record) => record.email === syntheticEmails[2]);
  assert(happyWebhook.length === 1 && happyWebhook[0].idempotencyKey === happyRecord.id, 'happy-path idempotency key did not match inquiry ID');
  assert(retryWebhooks.length === 2 && new Set(retryWebhooks.map((record) => record.idempotencyKey)).size === 1, 'retry did not preserve a stable idempotency key');
  assert(escalationWebhooks.length === 5 && new Set(escalationWebhooks.map((record) => record.idempotencyKey)).size === 1, 'escalation attempts did not preserve a stable idempotency key');

  report = {
    generatedAt: new Date().toISOString(),
    scope: 'Ephemeral loopback-only PostgreSQL and HTTP CRM technical sandbox. No production connectivity or real personal/client data.',
    authorizationReference: manifest.approval.requiredProveText,
    approvedRecordManifest: {
      id: manifest.manifestId,
      path: path.relative(ROOT, MANIFEST_PATH),
      sha256: manifestSha256,
      approvedAt: manifest.approval.approvedAt,
      buyerRecordIds: approvedBuyerRecords.map((record) => record.recordId),
      vacancyRecordIds: approvedVacancyRecords.map((record) => record.recordId),
    },
    environment: {
      name: 'talpro-p2-sandbox-20260718',
      databaseHost: databaseUrl.hostname,
      databaseName: databaseUrl.pathname.slice(1),
      crmHost: '127.0.0.1',
      loopbackOnly: true,
      productionExcluded: true,
      containsRealPersonalData: false,
    },
    results: {
      contactPersistence: 'passed',
      consentAndAttribution: 'passed',
      ownerAndScore: 'passed',
      duplicateSuppression: 'passed',
      crmHappyPath: 'passed',
      crmRetryAndStableIdempotency: 'passed',
      crmFiveAttemptEscalation: 'passed',
      opportunityFeedbackPersistence: 'passed',
      currentJobPublication: 'passed',
      expiredUnverifiedUnknownJobWithholding: 'passed',
    },
    syntheticRecordIds: {
      happyInquiryId: happyRecord.id,
      retryInquiryId: retryRecord.id,
      escalationInquiryId: escalationRecord.id,
      opportunityId: feedback.opportunityId,
    },
    failureCount: failures.length,
    failures,
  };
} finally {
  await db.delete(contactInquiries).where(like(contactInquiries.email, 'p2-sandbox-%@example.invalid'));
  await db.delete(jobs).where(like(jobs.slug, 'p2-sandbox-%'));
  await new Promise<void>((resolve) => mockCrm.close(() => resolve()));
  await pool.end();
}

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'p2-sandbox-integration-report.json'), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log('P2 loopback sandbox integration verification passed.');
  console.log('Evidence: dist/release-evidence/p2-sandbox-integration-report.json');
}
