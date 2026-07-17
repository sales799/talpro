import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const manifestPath = path.resolve(ROOT, process.env.CONSTITUTION_RELEASE_MANIFEST || 'docs/website/evidence/CONSTITUTION_RELEASE_MANIFEST.template.json');
if (manifestPath !== ROOT && !manifestPath.startsWith(`${ROOT}${path.sep}`)) {
  throw new Error('CONSTITUTION_RELEASE_MANIFEST must resolve inside the Talpro repository');
}
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const queue = readFileSync(path.join(ROOT, 'docs/website/NIRANTAR_COMPLETION_QUEUE.md'), 'utf8');
const requiredControlIds = [...queue.matchAll(/^\| (NIR-[^| ]+) \|/gm)].map((match) => match[1]);
const certificateControlId = 'NIR-P4-009';
const preCertificateControlIds = requiredControlIds.filter((id) => id !== certificateControlId);
const requiredApprovalRoles = ['legal', 'privacy', 'security', 'accessibility', 'revenue_operations', 'candidate_operations', 'release_operator'];
const currentSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
const failures = [];

if (manifest.schemaVersion !== '1.0') failures.push('unsupported manifest schema version');
if (manifest.constitutionVersion !== '2.1') failures.push('manifest does not target Constitution v2.1');
if (manifest.template === true) failures.push('template manifest cannot prove certificate eligibility');
if (!/^[0-9a-f]{40}$/.test(manifest.candidateSha || '')) failures.push('candidateSha is not an exact 40-character commit SHA');
if (manifest.candidateSha !== currentSha) failures.push('candidateSha does not match the checked-out release candidate');
if (manifest.productionSha !== manifest.candidateSha) failures.push('productionSha does not match candidateSha');
if (manifest.paidMarketingLaunched !== false) failures.push('paid marketing was launched before certification');
if (manifest.certificateIssued !== false) failures.push('manifest claims a certificate was already issued');
if (manifest.productionMonitor?.status !== 'passed' || !manifest.productionMonitor?.reportReference) failures.push('production monitor has not passed with evidence');
if (manifest.restoreRollback?.status !== 'exercised' || !manifest.restoreRollback?.exercisedAt || !manifest.restoreRollback?.approvedBy || !manifest.restoreRollback?.evidenceReference) {
  failures.push('restore/rollback exercise is incomplete');
}

const controls = new Map((manifest.controls || []).map((control) => [control.id, control]));
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
    if (!evidence?.reference || !evidence?.approvedBy || !evidence?.approvedAt) failures.push(`${id}: evidence ${index + 1} lacks reference/approver/date`);
  }
}
const certificateControl = controls.get(certificateControlId);
if (!certificateControl || certificateControl.status !== 'pending_certificate') {
  failures.push(`${certificateControlId}: status must be pending_certificate before eligibility is proven`);
}
for (const id of controls.keys()) {
  if (!requiredControlIds.includes(id)) failures.push(`${id}: manifest contains an unknown control`);
}

const approvals = new Map((manifest.approvals || []).map((approval) => [approval.role, approval]));
for (const role of requiredApprovalRoles) {
  const approval = approvals.get(role);
  if (!approval || approval.status !== 'approved' || !approval.name || !approval.approvedAt || !approval.evidenceReference) {
    failures.push(`${role}: qualified approval is incomplete`);
  }
}

const stabilityDays = Array.isArray(manifest.stabilityDays) ? manifest.stabilityDays : [];
if (stabilityDays.length !== 7) failures.push(`stability record has ${stabilityDays.length} days; exactly 7 are required`);
const dates = stabilityDays.map((day) => day.date).sort();
if (new Set(dates).size !== dates.length) failures.push('stability record contains duplicate dates');
if (dates.some((date) => !/^\d{4}-\d{2}-\d{2}$/.test(date || '') || Number.isNaN(new Date(`${date}T00:00:00.000Z`).getTime()))) {
  failures.push('stability record contains an invalid UTC date');
}
for (let index = 1; index < dates.length; index += 1) {
  const previous = new Date(`${dates[index - 1]}T00:00:00.000Z`).getTime();
  const current = new Date(`${dates[index]}T00:00:00.000Z`).getTime();
  if (current - previous !== 86_400_000) failures.push('stability dates are not seven consecutive UTC days');
}
for (const day of stabilityDays) {
  if (day.status !== 'passed' || day.criticalFailures !== 0 || !day.evidenceReference || !day.approvedBy) {
    failures.push(`${day.date || 'unknown day'}: stability evidence is incomplete or failed`);
  }
}

mkdirSync(EVIDENCE_DIR, { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  manifestPath: path.relative(ROOT, manifestPath),
  currentSha,
  requiredControlCount: requiredControlIds.length,
  requiredPreCertificateControlCount: preCertificateControlIds.length,
  eligible: failures.length === 0,
  failureCount: failures.length,
  failures,
};
writeFileSync(path.join(EVIDENCE_DIR, 'certificate-eligibility-report.json'), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error(`Constitution certificate is not eligible (${failures.length} unmet manifest checks).`);
  failures.slice(0, 40).forEach((failure) => console.error(failure));
  if (failures.length > 40) console.error(`...and ${failures.length - 40} more.`);
  process.exitCode = 1;
} else {
  console.log('Constitution certificate eligibility is proven by the supplied manifest.');
  console.log('Evidence: dist/release-evidence/certificate-eligibility-report.json');
}
