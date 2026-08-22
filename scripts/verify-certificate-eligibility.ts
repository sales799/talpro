import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { evaluateCertificateEligibility } from './lib/certificate-eligibility';

const ROOT = path.resolve(import.meta.dirname, '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const manifestPath = path.resolve(ROOT, process.env.CONSTITUTION_RELEASE_MANIFEST || 'docs/website/evidence/CONSTITUTION_RELEASE_MANIFEST.template.json');
if (manifestPath !== ROOT && !manifestPath.startsWith(`${ROOT}${path.sep}`)) {
  throw new Error('CONSTITUTION_RELEASE_MANIFEST must resolve inside the Talpro repository');
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const queue = readFileSync(path.join(ROOT, 'docs/website/NIRANTAR_COMPLETION_QUEUE.md'), 'utf8');
const requiredControlIds = [...queue.matchAll(/^\| (NIR-[^| ]+) \|/gm)].map((match) => match[1]);
const currentSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
const { failures, requiredPreCertificateControlCount } = evaluateCertificateEligibility({
  manifest,
  currentSha,
  requiredControlIds,
});

mkdirSync(EVIDENCE_DIR, { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  manifestPath: path.relative(ROOT, manifestPath),
  currentSha,
  requiredControlCount: requiredControlIds.length,
  requiredPreCertificateControlCount,
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

