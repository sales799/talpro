import { describe, expect, it } from 'vitest';
import {
  CERTIFICATE_CONTROL_ID,
  evaluateCertificateEligibility,
  REQUIRED_APPROVAL_ROLES,
} from '../../scripts/lib/certificate-eligibility';

const now = new Date('2026-07-17T12:00:00.000Z');
const sha = 'a'.repeat(40);
const requiredControlIds = [
  'NIR-P0-001',
  'NIR-P1-001',
  'NIR-P2-001',
  'NIR-P4-008',
  CERTIFICATE_CONTROL_ID,
  'NIR-P4-014',
];

function completeManifest(): any {
  const evidence = (id: string) => [{
    reference: `https://evidence.invalid/${id}`,
    approvedBy: 'Synthetic qualified fixture',
    approvedAt: '2026-07-16T10:00:00.000Z',
  }];
  return {
    schemaVersion: '1.0',
    constitutionVersion: '2.1',
    template: false,
    candidateSha: sha,
    productionSha: sha,
    paidMarketingLaunched: false,
    certificateIssued: false,
    productionMonitor: {
      status: 'passed',
      checkedAt: '2026-07-17T10:00:00.000Z',
      approvedBy: 'Synthetic release operator fixture',
      reportReference: 'https://evidence.invalid/production-monitor',
    },
    restoreRollback: {
      status: 'exercised',
      exercisedAt: '2026-07-16T10:00:00.000Z',
      approvedBy: 'Synthetic release operator fixture',
      evidenceReference: 'https://evidence.invalid/rollback',
    },
    controls: requiredControlIds.map((id) => id === CERTIFICATE_CONTROL_ID
      ? { id, status: 'pending_certificate', evidence: [] }
      : { id, status: 'complete', evidence: evidence(id) }),
    approvals: REQUIRED_APPROVAL_ROLES.map((role) => ({
      role,
      status: 'approved',
      name: `Synthetic ${role} fixture`,
      approvedAt: '2026-07-16T10:00:00.000Z',
      evidenceReference: `https://evidence.invalid/approval/${role}`,
    })),
    stabilityDays: Array.from({ length: 7 }, (_, index) => ({
      date: `2026-07-${String(index + 10).padStart(2, '0')}`,
      status: 'passed',
      criticalFailures: 0,
      evidenceReference: `https://evidence.invalid/stability/day-${index + 1}`,
      approvedBy: 'Synthetic monitoring fixture',
      approvedAt: '2026-07-17T10:00:00.000Z',
    })),
  };
}

function failuresFor(manifest: ReturnType<typeof completeManifest>): string[] {
  return evaluateCertificateEligibility({ manifest, currentSha: sha, requiredControlIds, now }).failures;
}

describe('Constitution certificate eligibility decision', () => {
  it('accepts a structurally complete synthetic fixture without issuing a certificate', () => {
    expect(failuresFor(completeManifest())).toEqual([]);
  });

  it('rejects template, marketing, and already-issued states', () => {
    const manifest = completeManifest();
    manifest.template = true;
    manifest.paidMarketingLaunched = true;
    manifest.certificateIssued = true;
    expect(failuresFor(manifest)).toEqual(expect.arrayContaining([
      expect.stringContaining('template'),
      expect.stringContaining('paid marketing'),
      expect.stringContaining('already issued'),
    ]));
  });

  it('rejects duplicate and unknown controls', () => {
    const manifest = completeManifest();
    manifest.controls.push({ ...manifest.controls[0] });
    manifest.controls.push({ id: 'NIR-UNKNOWN', status: 'complete', evidence: [] });
    expect(failuresFor(manifest)).toEqual(expect.arrayContaining([
      expect.stringContaining('duplicate control record'),
      expect.stringContaining('unknown control'),
    ]));
  });

  it('requires the certificate control to remain pending_certificate', () => {
    const manifest = completeManifest();
    const certificate = manifest.controls.find((control: any) => control.id === CERTIFICATE_CONTROL_ID)!;
    certificate.status = 'complete';
    expect(failuresFor(manifest)).toContain(
      `${CERTIFICATE_CONTROL_ID}: status must be pending_certificate before eligibility is proven`,
    );
  });

  it('rejects incomplete and future-dated evidence', () => {
    const manifest = completeManifest();
    const first = manifest.controls[0].evidence[0];
    first.reference = '';
    first.approvedAt = '2026-07-18T00:00:00.000Z';
    expect(failuresFor(manifest)).toContain(
      `${manifest.controls[0].id}: evidence 1 lacks a valid reference/approver/date`,
    );
  });

  it('rejects duplicate, unknown, and future-dated approvals', () => {
    const manifest = completeManifest();
    manifest.approvals[0].approvedAt = '2026-07-18T00:00:00.000Z';
    manifest.approvals.push({ ...manifest.approvals[1] });
    manifest.approvals.push({ ...manifest.approvals[1], role: 'founder_override' });
    expect(failuresFor(manifest)).toEqual(expect.arrayContaining([
      expect.stringContaining('qualified approval is incomplete'),
      expect.stringContaining('duplicate approval record'),
      expect.stringContaining('unknown approval role'),
    ]));
  });

  it('rejects invalid, nonconsecutive, duplicated, and failed stability days', () => {
    const manifest = completeManifest();
    manifest.stabilityDays[0].date = '2026-02-31';
    manifest.stabilityDays[1].date = manifest.stabilityDays[2].date;
    manifest.stabilityDays[3].criticalFailures = 1;
    expect(failuresFor(manifest)).toEqual(expect.arrayContaining([
      'stability record contains duplicate dates',
      'stability record contains an invalid UTC date',
      expect.stringContaining('stability dates are not seven consecutive UTC days'),
      expect.stringContaining('stability evidence is incomplete or failed'),
    ]));
  });

  it('rejects mismatched release SHAs and future-dated operational proof', () => {
    const manifest = completeManifest();
    manifest.productionSha = 'b'.repeat(40);
    manifest.productionMonitor.checkedAt = '2026-07-18T00:00:00.000Z';
    manifest.restoreRollback.exercisedAt = '2026-07-18T00:00:00.000Z';
    expect(failuresFor(manifest)).toEqual(expect.arrayContaining([
      'productionSha does not match candidateSha',
      'production monitor has not passed with accountable dated evidence',
      'restore/rollback exercise is incomplete',
    ]));
  });
});
