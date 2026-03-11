// test-single-post.js
// Quick test to publish a single post to the webhook

const { randomUUID } = require("crypto");

const WEBHOOK_URL = process.env.BLOG_WEBHOOK_URL || "http://localhost:5000/api/blog/webhook";
const BASE_URL = "https://talpro.in";
const TIMEOUT_MS = 20000;

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

function extractSlugAndUrl(data) {
  const paths = [
    d => d?.slug, d => d?.data?.slug, d => d?.post?.slug, d => d?.result?.slug
  ];
  let slug = null;
  for (const p of paths) { const v = p(data); if (v) { slug = v; break; } }
  let url = data?.url || data?.data?.url || data?.post?.url || null;
  if (!url && slug) url = `${BASE_URL}/blog/${slug}`;
  return { slug: slug || null, url: url || null };
}

const testPost = {
  title: "TalPro AutoPublisher Test Post",
  content_markdown: `# TalPro AutoPublisher Test Post

> Test post created at **${new Date().toISOString()}**.

This is a test post to validate the TalPro blog autopublisher system.

## Features Tested
- Webhook endpoint connection
- Post creation with markdown content
- Tag assignment
- Source URL handling
- Automatic slug generation
- Hero image extraction

This post can be safely deleted after verification.`,
  source_url: "https://example.com/test-article",
  tags: ["Testing", "Automation", "Blog"],
  published: true
};

(async () => {
  console.log("🧪 Testing blog autopublisher...");
  console.log(`→ Webhook: ${WEBHOOK_URL}\n`);

  console.log("📝 Publishing test post...");
  console.log(`   Title: ${testPost.title}`);
  
  try {
    const res = await fetchJSON(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
        "User-Agent": "TalPro-AutoPublisher-Test/1.0"
      },
      body: JSON.stringify(testPost)
    });

    console.log(`\n📊 Response: HTTP ${res.status}`);
    
    if (res.ok) {
      console.log("✅ Post published successfully!\n");
      const { slug, url } = extractSlugAndUrl(res.json);
      
      if (slug) {
        console.log(`   Slug: ${slug}`);
      }
      if (url) {
        console.log(`   URL: ${url}`);
      }
      
      console.log("\n📋 Response data:");
      console.log(JSON.stringify(res.json, null, 2));
      
      process.exit(0);
    } else {
      console.error("❌ Failed to publish post\n");
      console.error("Response:", res.json);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
})();
