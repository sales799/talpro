import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidenceDirectory = path.join(root, "dist", "release-evidence");
const reportPath = path.join(evidenceDirectory, "constitution-local-gate-summary.json");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const environment = { ...process.env };
if (!environment.PUPPETEER_EXECUTABLE_PATH && existsSync(chromePath)) {
  environment.PUPPETEER_EXECUTABLE_PATH = chromePath;
}

const gates = [
  { id: "typecheck", command: npmCommand, args: ["run", "check"] },
  { id: "tests", command: npmCommand, args: ["test"] },
  { id: "production_build", command: npmCommand, args: ["run", "build:full"] },
  { id: "release", command: npmCommand, args: ["run", "verify:release"] },
  { id: "accessibility_static", command: npmCommand, args: ["run", "verify:accessibility"] },
  { id: "accessibility_browser", command: npmCommand, args: ["run", "verify:accessibility:browser"] },
  { id: "performance_budgets", command: npmCommand, args: ["run", "verify:performance"] },
  { id: "structured_data", command: npmCommand, args: ["run", "verify:structured-data"] },
  { id: "publication_governance", command: npmCommand, args: ["run", "verify:publication"] },
  { id: "runtime_security", command: npmCommand, args: ["run", "verify:security"] },
  { id: "p2_record_manifest", command: npmCommand, args: ["run", "verify:p2-record-manifest"] },
  { id: "dependency_high", command: npmCommand, args: ["audit", "--audit-level=high"] },
];

const actionlintProbe = spawnSync("actionlint", ["--version"], {
  cwd: root,
  env: environment,
  stdio: "ignore",
});
if (actionlintProbe.status === 0) {
  gates.push({ id: "workflow_syntax", command: "actionlint", args: [] });
}

const generatedAt = new Date().toISOString();
const results = [];

for (const gate of gates) {
  const startedAt = new Date().toISOString();
  const started = performance.now();
  const execution = spawnSync(gate.command, gate.args, {
    cwd: root,
    env: environment,
    stdio: "inherit",
  });
  const durationMs = Math.round(performance.now() - started);
  results.push({
    id: gate.id,
    status: execution.status === 0 ? "passed" : "failed",
    exitCode: execution.status,
    signal: execution.signal,
    startedAt,
    durationMs,
  });
}

const failures = results.filter((result) => result.status === "failed");
const report = {
  generatedAt,
  completedAt: new Date().toISOString(),
  scope: "Safe local Constitution gates only; production, provider, secrets, qualified approvals and certificate issuance are excluded.",
  gateCount: results.length,
  failureCount: failures.length,
  results,
  excludedMandatoryBoundaries: [
    "selected external CRM sandbox and operational evidence",
    "qualified legal, privacy, accessibility, security and employment approvals",
    "production merge, deployment, database and provider configuration",
    "production Core Web Vitals and seven-day stability observation",
    "completion certificate issuance",
  ],
};

mkdirSync(evidenceDirectory, { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

if (failures.length > 0) {
  console.error(`Constitution local verification failed: ${failures.map((failure) => failure.id).join(", ")}`);
  console.error(`Evidence: ${path.relative(root, reportPath)}`);
  process.exit(1);
}

console.log(`Constitution local verification passed ${results.length}/${results.length} gates.`);
console.log(`Evidence: ${path.relative(root, reportPath)}`);
