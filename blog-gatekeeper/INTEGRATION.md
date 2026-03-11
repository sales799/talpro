# 🔗 Integrating Blog Gatekeeper with Autopublisher

This guide shows you how to integrate the AI-powered Blog Gatekeeper with your existing TalPro blog autopublisher system.

## 🎯 Architecture Overview

```
Blog Autopublisher
      ↓
      ↓ (sends posts)
      ↓
Blog Gatekeeper AI
      ↓
      ├─→ MinHash Similarity Check
      ├─→ AI Content Analysis (GPT-5)
      ├─→ Quality Scoring
      └─→ Decision: PUBLISH / REVIEW / SKIP
           ↓
           ├─→ PUBLISH → Your Blog Platform (/api/blog/webhook)
           ├─→ REVIEW → Review Queue (/api/blog/review-webhook)
           └─→ SKIP → (not forwarded, logged only)
```

## 🚀 Quick Setup (2 Minutes)

### Step 1: Start the Gatekeeper

In a **separate terminal** (or use Replit's workflow system):

```bash
cd blog-gatekeeper
PORT=3000 \
PLATFORM_WEBHOOK_URL=http://localhost:5000/api/blog/webhook \
AI_ANALYSIS_ENABLED=true \
MIN_QUALITY_SCORE=6 \
node index.js
```

You should see:
```
✅ Blog Gatekeeper AI listening on http://localhost:3000
   AI Analysis: ENABLED
   Similarity Threshold: 0.85
   Min Quality Score: 6
```

### Step 2: Configure Autopublisher

Update your blog-autopublisher environment variables:

```bash
# Instead of sending directly to your blog:
# BLOG_WEBHOOK_URL=http://localhost:5000/api/blog/webhook

# Send to the gatekeeper first:
BLOG_WEBHOOK_URL=http://localhost:3000/ingest
```

### Step 3: Test the Integration

Run a test post:

```bash
cd blog-autopublisher
node test-single-post.cjs
```

The gatekeeper will:
1. ✅ Check for duplicate sources
2. ✅ Run MinHash similarity analysis
3. ✅ Analyze content with AI (quality, brand voice, SEO)
4. ✅ Make a publish/review decision
5. ✅ Forward approved posts to your blog platform

## 📊 Environment Variables

### Gatekeeper Configuration

```env
# Server
PORT=3000

# Platform endpoints
PLATFORM_WEBHOOK_URL=http://localhost:5000/api/blog/webhook
PLATFORM_REVIEW_WEBHOOK_URL=http://localhost:5000/api/blog/review-webhook

# AI Analysis
AI_ANALYSIS_ENABLED=true
MIN_QUALITY_SCORE=6

# MinHash similarity
SIMILARITY_THRESHOLD=0.85
SIMILARITY_WINDOW_DAYS=365

# Security (optional but recommended)
WEBHOOK_SECRET=your-secret-key
```

### Autopublisher Configuration

```env
# Point to gatekeeper instead of platform
BLOG_WEBHOOK_URL=http://localhost:3000/ingest

# Rest of your normal settings
INITIAL_POSTS=10
DAILY_NUM_POSTS=3
BLOG_BASE_URL=https://talpro.in
```

## 🎭 Running Both Services

### Option 1: Manual (Development)

**Terminal 1 - Main Blog Platform:**
```bash
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Gatekeeper:**
```bash
cd blog-gatekeeper
node index.js
# Runs on http://localhost:3000
```

**Terminal 3 - Autopublisher:**
```bash
cd blog-autopublisher
BLOG_WEBHOOK_URL=http://localhost:3000/ingest node index.cjs
```

### Option 2: Using Replit Workflows

Create a new workflow for the gatekeeper:

1. Open Replit Shell
2. Add to your workflows:

```bash
# Add gatekeeper workflow
cd blog-gatekeeper && node index.js
```

Then configure your autopublisher to use `http://localhost:3000/ingest`

## 🔍 Monitoring

### Check Gatekeeper Status

```bash
curl http://localhost:3000/
```

### View Recent Decisions

```bash
curl http://localhost:3000/_recent | jq
```

### Get Statistics

```bash
curl http://localhost:3000/_stats | jq
```

Example output:
```json
{
  "total": 45,
  "by_decision": {
    "publish": 32,
    "review": 11,
    "skip": 2
  },
  "avg_quality_score": 7.8
}
```

## 📝 Understanding Decisions

### PUBLISH ✅
Posts that pass all gates are forwarded to `PLATFORM_WEBHOOK_URL`

**Criteria:**
- ✅ Not a duplicate source
- ✅ MinHash similarity < 0.85
- ✅ AI quality score ≥ 6
- ✅ AI brand voice score ≥ 6
- ✅ Not flagged as semantic duplicate

### REVIEW ⚠️
Posts needing manual review are forwarded to `PLATFORM_REVIEW_WEBHOOK_URL`

**Reasons:**
- ⚠️ MinHash similarity ≥ 0.85
- ⚠️ AI quality score < 6
- ⚠️ AI brand voice mismatch
- ⚠️ Flagged as semantic duplicate
- ⚠️ Fact-checking needed

### SKIP ⏭️
Exact duplicates are logged but not forwarded

**Reasons:**
- 🔁 Same source URL (even with different UTM params)
- 🔁 Same source + GUID combination
- 🔁 Identical content fingerprint

## 🎨 Customizing AI Analysis

The gatekeeper enriches your posts with AI-generated metadata:

```json
{
  "title": "Your Original Title",
  "body": "Your content...",
  "gatekeeper": {
    "decision": "publish",
    "ai_analysis": {
      "quality_score": 8.5,
      "recommended_tags": ["AI", "Software Development", "Enterprise"],
      "seo_title": "AI-Powered Development: Transform Enterprise Workflows",
      "seo_meta_description": "Discover how AI revolutionizes software development..."
    }
  }
}
```

Your platform can use these suggestions when creating blog posts!

## 🔐 Security: HMAC Verification

Set the same secret in both systems:

**Gatekeeper:**
```env
WEBHOOK_SECRET=supersecret123
```

**Your Platform (server/routes.ts):**
```typescript
import crypto from 'crypto';

app.post('/api/blog/webhook', async (req, res) => {
  // Verify HMAC signature
  const sig = req.headers['x-gatekeeper-signature'];
  const secret = process.env.WEBHOOK_SECRET;
  
  if (secret) {
    const body = JSON.stringify(req.body);
    const expected = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
    
    if (sig !== expected) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  }
  
  // Process the post...
  const { title, body, gatekeeper } = req.body;
  
  // Use AI-generated SEO data
  const seoTitle = gatekeeper?.ai_analysis?.seo_title || title;
  const tags = gatekeeper?.ai_analysis?.recommended_tags || [];
  
  // Create blog post...
});
```

## 📈 Production Deployment

When deploying to production:

1. **Deploy Gatekeeper First**
   - Set up as a separate service or microservice
   - Use environment secrets for API keys
   - Enable WEBHOOK_SECRET

2. **Update Autopublisher**
   - Point to gatekeeper's public URL
   - Keep existing configuration

3. **Monitor Performance**
   - Check `/_stats` endpoint daily
   - Review flagged posts in your review queue
   - Adjust thresholds based on results

## 🐛 Troubleshooting

### Posts Not Forwarded

**Check gatekeeper logs:**
```bash
# Look for forwarding errors
cd blog-gatekeeper
node index.js
# Watch for [forward] error messages
```

**Verify URLs:**
```bash
# Test connectivity
curl -X POST http://localhost:5000/api/blog/webhook \
  -H "Content-Type: application/json" \
  -d '{"title":"test","body":"test"}'
```

### AI Analysis Failures

If AI analysis fails, the system **gracefully falls back**:
- Decision defaults to "REVIEW"
- MinHash similarity still works
- Post is not lost

Check AI integration:
```bash
# Verify OpenAI env vars are set
echo $AI_INTEGRATIONS_OPENAI_BASE_URL
echo $AI_INTEGRATIONS_OPENAI_API_KEY
```

### High Review Rate

If too many posts go to review:

**Lower quality threshold:**
```env
MIN_QUALITY_SCORE=5  # Instead of 6
```

**Lower similarity threshold:**
```env
SIMILARITY_THRESHOLD=0.82  # Instead of 0.85
```

### Slow Performance

**Disable AI temporarily:**
```env
AI_ANALYSIS_ENABLED=false
```

**Reduce comparison window:**
```env
SIMILARITY_WINDOW_DAYS=180  # Instead of 365
```

## 💡 Best Practices

1. **Start with defaults** - They're pre-tuned
2. **Monitor for 1 week** - Check `/_stats` daily
3. **Review flagged content** - Verify AI decisions
4. **Tune thresholds** - Adjust based on your content
5. **Use HMAC** - Always in production
6. **Check logs** - Watch for patterns

## 🎯 Next Steps

1. Run the test suite: `npm test`
2. Monitor `/_stats` for first week
3. Review posts in review queue
4. Fine-tune thresholds
5. Deploy to production
6. Celebrate! 🎉

---

Need help? Check the main [README](./README.md) for detailed documentation.
