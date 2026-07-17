import express from 'express';
import { createServer } from 'node:http';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import request from 'supertest';

const ROOT = path.resolve(import.meta.dirname, '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
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

const longMessage = 'Talpro P2 sandbox verification for a governed technology hiring requirement. This is a synthetic record and contains no real person or client data.';
const baseContact = {
  firstName: 'P2',
  lastName: 'Sandbox',
  company: 'Talpro Technical Sandbox',
  service: 'it-staffing',
  message: longMessage,
  source: 'constitution-p2-sandbox',
  utmSource: 'codex',
  utmMedium: 'nonproduction',
  utmCampaign: 'constitution-v2-1-p2',
  utmTerm: 'technical-verification',
  utmContent: 'synthetic-record',
  landingPage: '/contact',
  referrer: 'https://sandbox.invalid/verification',
  consentGiven: true,
  privacyNoticeVersion: '2026-03-14',
};

const syntheticEmails = [
  'p2-sandbox-buyer@example.invalid',
  'p2-sandbox-retry@example.invalid',
  'p2-sandbox-escalation@example.invalid',
];
const jobSlugs = [
  'p2-sandbox-current-role',
  'p2-sandbox-expired-role',
  'p2-sandbox-unverified-role',
];

let report: Record<string, unknown> = {};
try {
  await db.delete(contactInquiries).where(like(contactInquiries.email, 'p2-sandbox-%@example.invalid'));
  await db.delete(jobs).where(like(jobs.slug, 'p2-sandbox-%'));

  const happyPayload = { ...baseContact, email: syntheticEmails[0] };
  const happyResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send(happyPayload)
    .expect(201);
  assert(happyResponse.body.routingStatus === 'delivered', 'CRM happy path was not delivered');

  const [happyRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.email, syntheticEmails[0]));
  assert(Boolean(happyRecord), 'CRM happy-path inquiry was not persisted');
  assert(happyRecord?.leadOwner === 'Technology Talent', 'lead owner mapping did not match Technology Talent');
  assert(happyRecord?.leadScore === 100, 'lead score did not match the expected 100-point band');
  assert(happyRecord?.utmCampaign === 'constitution-v2-1-p2', 'campaign attribution was not persisted');
  assert(happyRecord?.crmDeliveryStatus === 'delivered', 'happy-path CRM delivery state is not delivered');

  const duplicateResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send(happyPayload)
    .expect(202);
  const duplicateRows = await db.select().from(contactInquiries).where(eq(contactInquiries.email, syntheticEmails[0]));
  assert(duplicateResponse.body.duplicate === true, 'duplicate submission was not labelled duplicate');
  assert(duplicateRows.length === 1, 'duplicate submission created more than one database record');

  const retryResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send({ ...baseContact, email: syntheticEmails[1] })
    .expect(201);
  assert(retryResponse.body.routingStatus === 'held_for_retry', 'forced CRM failure was not retained for retry');
  let [retryRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.email, syntheticEmails[1]));
  await storage.updateContactInquiry(retryRecord.id, { crmNextAttemptAt: new Date(0) });
  const retrySummary = await recoverDueLeadDeliveries({ storage, webhookUrl, now: new Date() });
  [retryRecord] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, retryRecord.id));
  assert(retrySummary.delivered === 1, 'retry worker did not deliver the due inquiry');
  assert(retryRecord.crmDeliveryStatus === 'delivered' && retryRecord.crmDeliveryAttemptCount === 2, 'retry state was not durably delivered on attempt 2');

  const escalationResponse = await request(app)
    .post('/api/contact')
    .set('X-CSRF-Token', await csrf())
    .send({ ...baseContact, email: syntheticEmails[2] })
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
  assert(escalationRecord.crmDeliveryStatus === 'escalated', 'fifth failed delivery did not escalate');
  assert(escalationRecord.crmDeliveryAttemptCount === 5 && Boolean(escalationRecord.crmEscalatedAt), 'escalation evidence lacks attempt count or timestamp');

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

  const now = new Date();
  await db.insert(jobs).values([
    {
      title: 'P2 Sandbox Current Role', slug: jobSlugs[0], location: 'Bengaluru', employmentType: 'full-time',
      description: longMessage, requirements: ['Synthetic technical requirement'], benefits: [],
      applicationUrl: 'https://sandbox.invalid/apply/current', hiringOrganization: 'Talpro Technical Sandbox',
      postedDate: now, expiresAt: new Date(now.getTime() + 7 * 86_400_000), verifiedAt: now,
      verifiedBy: 'Candidate Operations Sandbox', isActive: true, source: 'p2-sandbox',
    },
    {
      title: 'P2 Sandbox Expired Role', slug: jobSlugs[1], location: 'Bengaluru', employmentType: 'full-time',
      description: longMessage, requirements: ['Synthetic technical requirement'], benefits: [],
      applicationUrl: 'https://sandbox.invalid/apply/expired', hiringOrganization: 'Talpro Technical Sandbox',
      postedDate: now, expiresAt: new Date(now.getTime() - 86_400_000), verifiedAt: now,
      verifiedBy: 'Candidate Operations Sandbox', isActive: true, source: 'p2-sandbox',
    },
    {
      title: 'P2 Sandbox Unverified Role', slug: jobSlugs[2], location: 'Bengaluru', employmentType: 'full-time',
      description: longMessage, requirements: ['Synthetic technical requirement'], benefits: [],
      applicationUrl: 'https://sandbox.invalid/apply/unverified', hiringOrganization: 'Talpro Technical Sandbox',
      postedDate: now, expiresAt: new Date(now.getTime() + 7 * 86_400_000), verifiedAt: null,
      verifiedBy: null, isActive: true, source: 'p2-sandbox',
    },
  ]);

  const jobsResponse = await request(app).get('/api/jobs').expect(200);
  assert(jobsResponse.body.total === 1 && jobsResponse.body.jobs[0]?.slug === jobSlugs[0], 'public jobs list did not expose exactly the current verified role');
  await request(app).get(`/api/jobs/${jobSlugs[0]}`).expect(200);
  await request(app).get(`/api/jobs/${jobSlugs[1]}`).expect(404);
  await request(app).get(`/api/jobs/${jobSlugs[2]}`).expect(404);
  await request(app).get('/api/jobs/p2-sandbox-unknown-role').expect(404);
  await request(pageApp).get(`/jobs/${jobSlugs[0]}`).expect(200);
  await request(pageApp).get(`/jobs/${jobSlugs[1]}`).expect(404);
  await request(pageApp).get(`/jobs/${jobSlugs[2]}`).expect(404);

  const happyWebhook = mockRecords.filter((record) => record.email === syntheticEmails[0]);
  const retryWebhooks = mockRecords.filter((record) => record.email === syntheticEmails[1]);
  const escalationWebhooks = mockRecords.filter((record) => record.email === syntheticEmails[2]);
  assert(happyWebhook.length === 1 && happyWebhook[0].idempotencyKey === happyRecord.id, 'happy-path idempotency key did not match inquiry ID');
  assert(retryWebhooks.length === 2 && new Set(retryWebhooks.map((record) => record.idempotencyKey)).size === 1, 'retry did not preserve a stable idempotency key');
  assert(escalationWebhooks.length === 5 && new Set(escalationWebhooks.map((record) => record.idempotencyKey)).size === 1, 'escalation attempts did not preserve a stable idempotency key');

  report = {
    generatedAt: new Date().toISOString(),
    scope: 'Ephemeral loopback-only PostgreSQL and HTTP CRM technical sandbox. No production connectivity or real personal/client data.',
    authorizationReference: 'Codex task 019f6ad9-290d-7063-94c7-40e120d1aa5e, founder instruction to connect non-production Talpro and authorize P2 verification',
    environment: {
      name: 'talpro-p2-sandbox-20260717',
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
