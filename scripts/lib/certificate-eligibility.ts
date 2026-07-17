export const CERTIFICATE_CONTROL_ID = 'NIR-P4-009';
export const REQUIRED_APPROVAL_ROLES = [
  'legal',
  'privacy',
  'security',
  'accessibility',
  'revenue_operations',
  'candidate_operations',
  'release_operator',
] as const;

type UnknownRecord = Record<string, any>;

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPastOrPresentDate(value: unknown, now: Date): boolean {
  if (!hasText(value)) return false;
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) && timestamp <= now.getTime();
}

function isUtcDay(value: unknown): value is string {
  if (!hasText(value) || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function duplicateValues(values: unknown[]): string[] {
  const seen = new Set<unknown>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(String(value));
    seen.add(value);
  }
  return [...duplicates];
}

export function evaluateCertificateEligibility({
  manifest,
  currentSha,
  requiredControlIds,
  now = new Date(),
}: {
  manifest: UnknownRecord;
  currentSha: string;
  requiredControlIds: string[];
  now?: Date;
}): { failures: string[]; requiredPreCertificateControlCount: number } {
  const failures: string[] = [];
  const preCertificateControlIds = requiredControlIds.filter((id) => id !== CERTIFICATE_CONTROL_ID);

  if (!requiredControlIds.includes(CERTIFICATE_CONTROL_ID)) failures.push(`${CERTIFICATE_CONTROL_ID}: missing from controlling queue`);
  if (manifest.schemaVersion !== '1.0') failures.push('unsupported manifest schema version');
  if (manifest.constitutionVersion !== '2.1') failures.push('manifest does not target Constitution v2.1');
  if (manifest.template !== false) failures.push('template or unspecified manifest cannot prove certificate eligibility');
  if (!/^[0-9a-f]{40}$/.test(manifest.candidateSha || '')) failures.push('candidateSha is not an exact 40-character commit SHA');
  if (manifest.candidateSha !== currentSha) failures.push('candidateSha does not match the checked-out release candidate');
  if (manifest.productionSha !== manifest.candidateSha) failures.push('productionSha does not match candidateSha');
  if (manifest.paidMarketingLaunched !== false) failures.push('paid marketing was launched before certification');
  if (manifest.certificateIssued !== false) failures.push('manifest claims a certificate was already issued');

  const monitor = manifest.productionMonitor || {};
  if (
    monitor.status !== 'passed'
    || !hasText(monitor.reportReference)
    || !hasText(monitor.approvedBy)
    || !isPastOrPresentDate(monitor.checkedAt, now)
  ) failures.push('production monitor has not passed with accountable dated evidence');

  const rollback = manifest.restoreRollback || {};
  if (
    rollback.status !== 'exercised'
    || !isPastOrPresentDate(rollback.exercisedAt, now)
    || !hasText(rollback.approvedBy)
    || !hasText(rollback.evidenceReference)
  ) failures.push('restore/rollback exercise is incomplete');

  const controlRecords = Array.isArray(manifest.controls) ? manifest.controls : [];
  for (const id of duplicateValues(controlRecords.map((control: UnknownRecord) => control?.id))) {
    failures.push(`${id}: duplicate control record`);
  }
  const controls = new Map(controlRecords.map((control: UnknownRecord) => [control?.id, control]));
  for (const id of preCertificateControlIds) {
    const control = controls.get(id);
    if (!control) {
      failures.push(`${id}: missing from manifest`);
      continue;
    }
    if (control.status !== 'complete') failures.push(`${id}: status is not complete`);
    if (!Array.isArray(control.evidence) || control.evidence.length === 0) {
      failures.push(`${id}: no evidence records`);
      continue;
    }
    for (const [index, evidence] of control.evidence.entries()) {
      if (
        !hasText(evidence?.reference)
        || !hasText(evidence?.approvedBy)
        || !isPastOrPresentDate(evidence?.approvedAt, now)
      ) failures.push(`${id}: evidence ${index + 1} lacks a valid reference/approver/date`);
    }
  }
  const certificateControl = controls.get(CERTIFICATE_CONTROL_ID);
  if (!certificateControl || certificateControl.status !== 'pending_certificate') {
    failures.push(`${CERTIFICATE_CONTROL_ID}: status must be pending_certificate before eligibility is proven`);
  }
  for (const id of controls.keys()) {
    if (!requiredControlIds.includes(String(id))) failures.push(`${String(id)}: manifest contains an unknown control`);
  }

  const approvalRecords = Array.isArray(manifest.approvals) ? manifest.approvals : [];
  for (const role of duplicateValues(approvalRecords.map((approval: UnknownRecord) => approval?.role))) {
    failures.push(`${role}: duplicate approval record`);
  }
  const approvals = new Map(approvalRecords.map((approval: UnknownRecord) => [approval?.role, approval]));
  for (const role of REQUIRED_APPROVAL_ROLES) {
    const approval = approvals.get(role);
    if (
      !approval
      || approval.status !== 'approved'
      || !hasText(approval.name)
      || !isPastOrPresentDate(approval.approvedAt, now)
      || !hasText(approval.evidenceReference)
    ) failures.push(`${role}: qualified approval is incomplete`);
  }
  for (const role of approvals.keys()) {
    if (!REQUIRED_APPROVAL_ROLES.includes(role as typeof REQUIRED_APPROVAL_ROLES[number])) {
      failures.push(`${String(role)}: manifest contains an unknown approval role`);
    }
  }

  const stabilityDays = Array.isArray(manifest.stabilityDays) ? manifest.stabilityDays : [];
  if (stabilityDays.length !== 7) failures.push(`stability record has ${stabilityDays.length} days; exactly 7 are required`);
  const dates = stabilityDays.map((day: UnknownRecord) => day?.date).sort();
  if (new Set(dates).size !== dates.length) failures.push('stability record contains duplicate dates');
  if (dates.some((date: unknown) => !isUtcDay(date))) failures.push('stability record contains an invalid UTC date');
  for (let index = 1; index < dates.length; index += 1) {
    if (!isUtcDay(dates[index - 1]) || !isUtcDay(dates[index])) continue;
    const previous = new Date(`${dates[index - 1]}T00:00:00.000Z`).getTime();
    const current = new Date(`${dates[index]}T00:00:00.000Z`).getTime();
    if (current - previous !== 86_400_000) failures.push('stability dates are not seven consecutive UTC days');
  }
  for (const day of stabilityDays) {
    if (
      day.status !== 'passed'
      || day.criticalFailures !== 0
      || !hasText(day.evidenceReference)
      || !hasText(day.approvedBy)
      || !isPastOrPresentDate(day.approvedAt, now)
    ) failures.push(`${day.date || 'unknown day'}: stability evidence is incomplete or failed`);
  }

  return { failures, requiredPreCertificateControlCount: preCertificateControlIds.length };
}

