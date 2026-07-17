import express, { type Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { registerRoutes } from '../../server/routes';
import {
  blockSensitivePaths,
  csrfTokenEndpoint,
  sanitizeInput,
  securityHeaders,
  validateCsrf,
} from '../../server/security-middleware';

async function buildTestApp(): Promise<Express> {
  const app = express();
  app.disable('x-powered-by');
  app.use(securityHeaders);
  app.use(express.json());
  app.use(blockSensitivePaths);
  app.use(sanitizeInput);
  app.get('/api/csrf-token', csrfTokenEndpoint);
  app.use('/api', validateCsrf);
  await registerRoutes(app);
  return app;
}

async function csrf(app: Express): Promise<string> {
  const response = await request(app).get('/api/csrf-token').expect(200);
  return response.body.csrfToken;
}

const validContact = {
  firstName: 'Asha',
  lastName: 'Rao',
  email: 'asha.rao@example.com',
  company: 'Example GCC',
  service: 'IT Staffing',
  message: 'We need help hiring two senior platform engineers in Bengaluru.',
  consentGiven: true,
  privacyNoticeVersion: '2026-03-14',
};

describe('contact endpoint hardening', () => {
  it('uses a CSP without unsafe-eval', async () => {
    const app = await buildTestApp();
    const response = await request(app).get('/api/csrf-token').expect(200);

    expect(response.headers['content-security-policy']).toContain("default-src 'self'");
    expect(response.headers['content-security-policy']).not.toContain("'unsafe-eval'");
  });

  it('keeps marketing subscriptions disabled until consent and suppression controls are proven', async () => {
    const app = await buildTestApp();
    const response = await request(app)
      .post('/api/newsletter')
      .set('X-CSRF-Token', await csrf(app))
      .send({ email: 'reader@example.com' })
      .expect(410);

    expect(response.headers['content-type']).toContain('application/problem+json');
  });

  it('keeps unpublished blog and RSS surfaces closed', async () => {
    const app = await buildTestApp();
    await request(app).get('/api/blog/posts').expect(410);
    await request(app).get('/api/rss').expect(410);
    await request(app)
      .post('/api/blog/webhook')
      .set('X-CSRF-Token', await csrf(app))
      .send({ title: 'Unapproved', content_markdown: 'Unapproved content' })
      .expect(410);
  });

  it('rejects missing CSRF tokens with RFC 7807 problem+json', async () => {
    const app = await buildTestApp();

    const response = await request(app)
      .post('/api/contact')
      .send(validContact)
      .expect(403);

    expect(response.headers['content-type']).toContain('application/problem+json');
    expect(response.body.title).toBe('CSRF validation failed');
  });

  it('rejects invalid contact payloads with field-level messages', async () => {
    const app = await buildTestApp();
    const token = await csrf(app);

    const response = await request(app)
      .post('/api/contact')
      .set('X-CSRF-Token', token)
      .send({
        firstName: '',
        lastName: '',
        email: 'not-an-email',
        message: 'short',
      })
      .expect(400);

    expect(response.headers['content-type']).toContain('application/problem+json');
    expect(response.body.title).toBe('Invalid contact submission');
    expect(response.body.errors.firstName).toBeDefined();
    expect(response.body.errors.lastName).toBeDefined();
    expect(response.body.errors.email).toBeDefined();
    expect(response.body.errors.message).toBeDefined();
    expect(response.body.errors.consentGiven).toBeDefined();
  });

  it('accepts valid contact submissions', async () => {
    const app = await buildTestApp();
    const token = await csrf(app);

    const response = await request(app)
      .post('/api/contact')
      .set('X-CSRF-Token', token)
      .send(validContact)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.id).toBeTruthy();
    expect(response.body.acknowledgementStatus).toBe('received');
    expect(response.body.routingStatus).toBe('captured_locally');
  });

  it('deduplicates the same inquiry without exposing the original record', async () => {
    const app = await buildTestApp();
    const uniqueContact = { ...validContact, email: 'dedupe@example.com' };

    await request(app)
      .post('/api/contact')
      .set('X-CSRF-Token', await csrf(app))
      .send(uniqueContact)
      .expect(201);

    const response = await request(app)
      .post('/api/contact')
      .set('X-CSRF-Token', await csrf(app))
      .send(uniqueContact)
      .expect(202);

    expect(response.body.duplicate).toBe(true);
    expect(response.body.id).toBeUndefined();
  });

  it('rate-limits repeated contact submissions', async () => {
    const app = await buildTestApp();
    const tokens = await Promise.all(Array.from({ length: 6 }, () => csrf(app)));

    for (let index = 0; index < 5; index += 1) {
      await request(app)
        .post('/api/contact')
        .set('X-CSRF-Token', tokens[index])
        .send({ ...validContact, email: `lead${index}@example.com` })
        .expect(201);
    }

    const response = await request(app)
      .post('/api/contact')
      .set('X-CSRF-Token', tokens[5])
      .send({ ...validContact, email: 'lead6@example.com' })
      .expect(429);

    expect(response.headers['content-type']).toContain('application/problem+json');
  });
});
