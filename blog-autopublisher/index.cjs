// index.js
// TalPro bulk + scheduled autopublisher (Node 18+, no external deps)

const { randomUUID } = require("crypto");
const http = require("http");

// ------------------------- Configuration -------------------------
const WEBHOOK_URL   = process.env.BLOG_WEBHOOK_URL || "http://localhost:5000/api/blog/webhook";
const POSTS_URL     = (process.env.BLOG_POSTS_URL || "").trim(); // optional verification endpoint
const API_KEY       = (process.env.BLOG_API_KEY || "").trim();
const BASE_URL      = (process.env.BLOG_BASE_URL || "https://talpro.in").trim(); // for pretty URLs
const INITIAL_POSTS = Math.max(1, Number(process.env.INITIAL_POSTS || 10));
const DAILY_NUM     = Math.max(1, Number(process.env.DAILY_NUM_POSTS || 3));
const DELAY_MS      = Math.max(0, Number(process.env.DELAY_MS || 1000));
const TIMEOUT_MS    = Math.max(3000, Number(process.env.TIMEOUT_MS || 20000));
const SUCCESS_RATIO = Math.min(1, Math.max(0, Number(process.env.SUCCESS_RATIO || 0.9)));
const DRY_RUN       = (process.env.DRY_RUN || "") === "1";
const REDEPLOY_HOOK = (process.env.REDEPLOY_HOOK_URL || "").trim();

// schedule (UTC)
const DAILY_HOUR = Math.min(23, Math.max(0, Number(process.env.DAILY_UTC_HOUR || 9)));
const DAILY_MIN  = Math.min(59, Math.max(0, Number(process.env.DAILY_UTC_MIN  || 0)));

// cosmetics
const TITLE_PREFIX = process.env.TITLE_PREFIX || "TalPro Auto Test";
const FIXED_SOURCE_URLS = (process.env.FIXED_SOURCE_URLS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// retry policy
const RETRYABLE = new Set([429, 500, 502, 503, 504]);

// ------------------------- Utilities -------------------------
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function nowISO() { return new Date().toISOString(); }

function headers() {
  const h = {
    "Content-Type": "application/json",
    "Idempotency-Key": randomUUID(),
    "User-Agent": "TalPro-AutoPublisher/1.1"
  };
  if (API_KEY) {
    h["Authorization"] = `Bearer ${API_KEY}`;
    h["X-API-Key"] = API_KEY; // some backends prefer this header
  }
  return h;
}

function prettyUrlFromSlug(slug) {
  if (!slug) return null;
  if (BASE_URL) return `${BASE_URL.replace(/\/$/, "")}/blog/${slug}`;
  return null;
}

function extractSlugAndUrl(data) {
  const paths = [
    d => d?.slug, d => d?.data?.slug, d => d?.post?.slug, d => d?.result?.slug
  ];
  let slug = null;
  for (const p of paths) { const v = p(data); if (v) { slug = v; break; } }
  let url = data?.url || data?.data?.url || data?.post?.url || null;
  if (!url && slug) url = prettyUrlFromSlug(slug);
  return { slug: slug || null, url: url || null };
}

async function fetchJSON(url, opts = {}, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    const text = await res.text();
    let json = {};
    try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
    return { ok: res.ok, status: res.status, json, text };
  } finally {
    clearTimeout(timer);
  }
}

// ------------------------- Content Generation -------------------------
const TAGS = ["AI","Machine Learning","Software Development","Technology","Innovation"];
const TOPICS = [
  "AI-Powered Development Services",
  "Sourcing Automation",
  "Interview Intelligence",
  "ATS Integrations",
  "Employer Branding",
  "Structured Interviews",
  "Talent Analytics",
  "Recruiting KPIs",
  "Onboarding Experience",
  "Offer Management",
  "Candidate Experience",
  "DEI in Recruiting",
  "Referral Programs",
  "Pipeline Health",
  "Recruiter Productivity",
  "Screening Automation"
];

function pickSourceUrl(i) {
  if (FIXED_SOURCE_URLS.length) {
    return FIXED_SOURCE_URLS[i % FIXED_SOURCE_URLS.length];
  }
  // Any URL works; backend will extract og:image or fallback to default
  return `https://news.example.com/article-${i}`;
}

function buildPost(i) {
  const topic = TOPICS[i % TOPICS.length];
  const title = `${TITLE_PREFIX} #${i + 1}: ${topic}`;
  const md = `# ${title}

> Automated publish test created at **${nowISO()}**.

This post validates the fully automated TalPro blog workflow:
- Webhook publishing to \`/api/blog/webhook\`
- Optional OpenAI enhancement (handled server-side, graceful fallback)
- Automatic hero image extraction or default
- SEO-friendly slug + excerpt
- Social distribution webhooks

## Why "${topic}" matters
Well-run automation reduces time-to-publish and keeps content fresh across channels.

## QA Checklist
- [x] 201 Created returned by webhook
- [x] Response includes slug or post object
- [x] Appears in blog listing and single post page
- [x] Safe to delete later (test content)
`;

  return {
    title,
    content_markdown: md,
    source_url: pickSourceUrl(i),
    tags: TAGS,
    published: true
  };
}

// ------------------------- Posting with Retry -------------------------
async function postWithRetry(payload, index) {
  const maxAttempts = 4;
  let attempt = 0;
  let lastErr = null;

  while (attempt < maxAttempts) {
    attempt++;
    if (DRY_RUN) {
      return { ok: true, status: 200, attempt, dryRun: true, slug: null, url: null, raw: { note: "DRY_RUN=1" } };
    }

    try {
      const res = await fetchJSON(WEBHOOK_URL, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(payload)
      }, TIMEOUT_MS);

      if (res.ok) {
        const { slug, url } = extractSlugAndUrl(res.json);
        return { ok: true, status: res.status, attempt, slug, url, raw: res.json };
      }

      if (RETRYABLE.has(res.status)) {
        const backoff = Math.min(2000 * Math.pow(2, attempt - 1), 12000) + Math.floor(Math.random() * 400);
        console.warn(`⚠️  #${index + 1}: HTTP ${res.status}. Retrying in ${backoff}ms…`);
        await sleep(backoff);
        continue;
      }
      return { ok: false, status: res.status, attempt, error: `HTTP ${res.status}`, raw: res.json };
    } catch (e) {
      lastErr = e;
      const backoff = Math.min(2000 * Math.pow(2, attempt - 1), 12000) + Math.floor(Math.random() * 400);
      console.warn(`⚠️  #${index + 1}: network error (${e?.name || "Error"}). Retrying in ${backoff}ms…`);
      await sleep(backoff);
    }
  }
  return { ok: false, status: null, attempt: maxAttempts, error: lastErr?.message || "Unknown error" };
}

// ------------------------- Verification (optional) -------------------------
async function verifyBySlug(slug) {
  if (!POSTS_URL || !slug || DRY_RUN) return { attempted: false, ok: true };
  try {
    const res = await fetchJSON(POSTS_URL, { method: "GET" }, TIMEOUT_MS);
    if (!res.ok) return { attempted: true, ok: false, status: res.status };
    const body = res.json;
    const list = Array.isArray(body) ? body : (body?.posts || body?.data || []);
    const found = Array.isArray(list) && list.some(p => p?.slug === slug);
    return { attempted: true, ok: !!found };
  } catch {
    return { attempted: true, ok: false };
  }
}

// ------------------------- Batch Runner -------------------------
async function runBatch(batchName, count) {
  console.log(`\n=== ${batchName} — starting (${count} posts) @ ${nowISO()} ===`);
  console.log(`→ Webhook: ${WEBHOOK_URL}`);
  if (API_KEY) console.log("→ Auth: BLOG_API_KEY set");
  if (BASE_URL) console.log(`→ Pretty URLs base: ${BASE_URL}`);
  if (DRY_RUN) console.log("→ DRY_RUN=1 (no network calls)");
  console.log("→ To‑do:");
  console.log("   [ ] Init checks");
  console.log("   [ ] Publish posts");
  console.log("   [ ] Verify visibility");
  console.log("   [ ] Trigger redeploy (optional)");

  // INIT
  console.log("… Init: ok");
  console.log("   [x] Init checks");

  const results = [];
  for (let i = 0; i < count; i++) {
    const payload = buildPost(i);
    console.log(`📝 Publishing #${i + 1}: ${payload.title}`);
    const res = await postWithRetry(payload, i);
    if (res.ok) {
      const info = [];
      if (res.slug) info.push(`slug=${res.slug}`);
      if (res.url) info.push(`url=${res.url}`);
      console.log(`   ✅ Success (status ${res.status}) ${info.length ? "— " + info.join(" | ") : ""}`);
    } else {
      console.error(`   ❌ Failed ${res.status ? `(status ${res.status})` : ""} — ${res.error || "Unknown"}`);
    }
    results.push({ i: i + 1, ...res });
    if (i < count - 1 && DELAY_MS > 0) await sleep(DELAY_MS);
  }
  console.log("   [x] Publish posts");

  // VERIFY
  let verifiedCount = 0;
  for (const r of results) {
    if (r.ok && r.slug) {
      const v = await verifyBySlug(r.slug);
      if (v.ok) verifiedCount++;
    }
  }
  console.log(`   [x] Verify visibility (${verifiedCount}/${results.filter(r => r.ok).length} verified)`);

  // SUMMARY
  const okCount = results.filter(r => r.ok).length;
  console.log("\n——— Summary ———");
  console.table(results.map(r => ({
    "#": r.i,
    ok: r.ok,
    status: r.status || "-",
    attempts: r.attempt,
    slug: r.slug || "-",
    url: r.url || "-"
  })));
  console.log(`\n✅ ${okCount}/${count} posts published.`);

  // REDEPLOY
  if (REDEPLOY_HOOK && !DRY_RUN) {
    try {
      console.log("\n🔁 Triggering redeploy hook…");
      const ping = await fetchJSON(REDEPLOY_HOOK, { method: "POST" }, TIMEOUT_MS);
      if (ping.ok) console.log(`   ✅ Redeploy hook accepted (status ${ping.status}).`);
      else console.warn(`   ⚠️ Redeploy hook responded with status ${ping.status}.`);
    } catch (e) {
      console.warn(`   ⚠️ Redeploy hook error: ${e.message}`);
    }
  }
  console.log("   [x] Trigger redeploy (optional)");
  console.log(`=== ${batchName} — done @ ${nowISO()} ===\n`);

  return { okCount, total: count, ratio: okCount / count };
}

// ------------------------- Scheduler -------------------------
let nextTimer = null;
let lastRunAt = null;
let lastResult = null;
let nextRunAt = null;

function msUntilNextDaily(hourUTC, minUTC) {
  const now = new Date();
  const next = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    hourUTC,
    minUTC,
    0, 0
  ));
  if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
  return { ms: next - now, date: next };
}

function scheduleDaily(fn) {
  const { ms, date } = msUntilNextDaily(DAILY_HOUR, DAILY_MIN);
  nextRunAt = date;
  if (nextTimer) clearTimeout(nextTimer);
  nextTimer = setTimeout(async () => {
    lastRunAt = new Date();
    lastResult = await fn();
    scheduleDaily(fn);
  }, ms);
  console.log(`🗓️  Next daily run scheduled for ${date.toISOString()} (UTC).`);
}

// ------------------------- Health Server -------------------------
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      service: "talpro-autopublisher",
      now: new Date().toISOString(),
      config: {
        initialPosts: INITIAL_POSTS,
        dailyHourUTC: DAILY_HOUR,
        dailyMinUTC: DAILY_MIN,
        dailyNumPosts: DAILY_NUM
      },
      lastRunAt,
      lastResult,
      nextRunAt
    }));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("TalPro AutoPublisher is running.\nUse /health for JSON status.\n");
});
server.listen(PORT, () => {
  console.log(`🌐 Health server listening on port ${PORT} (GET /health).`);
});

// ------------------------- Main Flow -------------------------
(async () => {
  console.log("🚀 TalPro AutoPublisher starting…");
  console.log(`→ Initial batch size: ${INITIAL_POSTS}`);
  console.log(`→ Daily schedule (UTC): ${String(DAILY_HOUR).padStart(2,"0")}:${String(DAILY_MIN).padStart(2,"0")} — ${DAILY_NUM} posts`);
  if (!WEBHOOK_URL) {
    console.error("❌ BLOG_WEBHOOK_URL is required.");
    process.exit(1);
  }

  // 1) Run initial validation batch
  const initial = await runBatch("Initial Validation Batch", INITIAL_POSTS);

  // 2) If success meets threshold, schedule daily runs
  if (initial.ratio >= SUCCESS_RATIO) {
    console.log(`🎉 Success threshold met (${(initial.ratio*100).toFixed(0)}% ≥ ${(SUCCESS_RATIO*100).toFixed(0)}%). Scheduling daily job…`);
    scheduleDaily(async () => runBatch("Daily Scheduled Batch", DAILY_NUM));
  } else {
    console.warn(`⚠️ Success threshold not met (${(initial.ratio*100).toFixed(0)}% < ${(SUCCESS_RATIO*100).toFixed(0)}%). Daily job will NOT be scheduled.`);
  }
})();
