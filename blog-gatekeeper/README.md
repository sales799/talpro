# 🛡️ Blog Gatekeeper AI

An **AI-enhanced content gatekeeper** that protects your blog from duplicate and low-quality content using:

1. **Idempotency** - Prevents exact duplicates from the same source
2. **MinHash Similarity** - Fast duplicate detection (≥85% similarity threshold)
3. **AI Content Analysis** - OpenAI-powered quality scoring, SEO optimization, and brand voice checking

## 🚀 Features

### MinHash Protection
- Fast similarity detection using word shingles
- Configurable threshold (default: 0.85)
- Compares against last 365 days of posts
- No external API calls required

### AI-Powered Analysis
✨ **Quality Scoring** (1-10 scale)
- Content depth and value assessment
- Technical accuracy evaluation
- Audience relevance checking

✨ **Semantic Duplicate Detection**
- Goes beyond text matching
- Identifies similar topics and ideas
- Compares against recent post titles

✨ **Brand Voice Consistency**
- Ensures professional, authoritative tone
- Technology-focused content validation
- TalPro brand alignment scoring

✨ **SEO Optimization**
- Auto-generates optimized titles (<60 chars)
- Creates compelling meta descriptions (<155 chars)
- Recommends relevant tags

✨ **Content Quality Gates**
- Readability scoring (1-10 scale)
- Fact-checking flag for verification needs
- Actionable improvement suggestions

## 📦 Installation

```bash
cd blog-gatekeeper
npm install
```

## ⚙️ Configuration

Copy `.env.example` to `.env` (or use Replit Secrets):

```bash
cp .env.example .env
```

### Required Settings

```env
PLATFORM_WEBHOOK_URL=http://localhost:5000/api/blog/webhook
```

### Optional Settings

```env
# Review endpoint for flagged content
PLATFORM_REVIEW_WEBHOOK_URL=http://localhost:5000/api/blog/review-webhook

# HMAC signing (recommended for production)
WEBHOOK_SECRET=your-secret-key-here

# AI Analysis toggle
AI_ANALYSIS_ENABLED=true

# Quality thresholds
MIN_QUALITY_SCORE=6
SIMILARITY_THRESHOLD=0.85
```

## 🏃 Usage

### Start the Server

```bash
npm start
```

You'll see:
```
✅ Blog Gatekeeper AI listening on http://localhost:3000
   AI Analysis: ENABLED
   Similarity Threshold: 0.85
   Min Quality Score: 6
```

### Endpoints

#### `POST /ingest`
Submit content for analysis:

```bash
curl -X POST http://localhost:3000/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI-Powered Development in 2025",
    "body": "<p>Modern software development...</p>",
    "source_url": "https://example.com/ai-dev-2025"
  }'
```

**Response:**
```json
{
  "action": "PUBLISH",
  "unique_key": "url::abc123...",
  "minhash": {
    "similarity": 0.45,
    "threshold": 0.85,
    "decision": "publish"
  },
  "ai": {
    "enabled": true,
    "quality_score": 8.5,
    "brand_voice_match": 9,
    "is_duplicate": false,
    "decision": "publish",
    "seo_title": "AI-Powered Development: Transform Your Workflow in 2025",
    "recommended_tags": ["AI", "Software Development", "Automation"]
  },
  "final_decision": "publish",
  "reason": "Passed all quality gates"
}
```

#### `GET /_recent`
View last 50 decisions:

```bash
curl http://localhost:3000/_recent
```

#### `GET /_stats`
View gatekeeper statistics:

```bash
curl http://localhost:3000/_stats
```

**Response:**
```json
{
  "total": 127,
  "by_decision": {
    "publish": 98,
    "review": 23,
    "skip": 6
  },
  "avg_quality_score": 7.8
}
```

## 🎯 Decision Logic

### Action Types

1. **SKIP** - Exact duplicate (same source URL/GUID)
2. **REVIEW** - Needs manual review due to:
   - High MinHash similarity (≥0.85)
   - Low quality score (<6)
   - Low brand voice match (<6)
   - AI flagged as semantic duplicate
   - Fact-checking needed
3. **PUBLISH** - Passed all quality gates

### Combined Decision Flow

```
Incoming Post
    ↓
┌─────────────────────┐
│ Idempotency Check   │ → SKIP (if exact duplicate)
└─────────────────────┘
    ↓
┌─────────────────────┐
│ MinHash Similarity  │ → REVIEW (if ≥0.85)
└─────────────────────┘
    ↓
┌─────────────────────┐
│ AI Content Analysis │ → Scores quality, brand voice, SEO
└─────────────────────┘
    ↓
┌─────────────────────┐
│ Final Decision      │ → PUBLISH / REVIEW
└─────────────────────┘
    ↓
Forward to Platform
```

## 🔐 HMAC Verification

If you set `WEBHOOK_SECRET`, the gatekeeper signs all forwarded requests:

**Verify on your platform:**

```typescript
import crypto from 'node:crypto';

export default async function handler(req, res) {
  const sig = req.headers['x-gatekeeper-signature'];
  const secret = process.env.WEBHOOK_SECRET;
  const raw = JSON.stringify(req.body);
  
  if (secret) {
    const expected = crypto.createHmac('sha256', secret)
      .update(raw)
      .digest('hex');
    
    if (sig !== expected) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  }
  
  // Process the content...
  const { gatekeeper } = req.body;
  console.log('AI Quality Score:', gatekeeper.ai_analysis.quality_score);
  console.log('Recommended Tags:', gatekeeper.ai_analysis.recommended_tags);
}
```

## 📊 Database Schema

SQLite database (`gatekeeper.db`) stores:

- Unique keys and slugs
- MinHash signatures
- Similarity scores
- AI analysis results:
  - Quality scores
  - Brand voice match
  - SEO recommendations
  - Recommended tags
  - Improvement suggestions
- Final decisions and reasons
- Timestamps

## 🎛️ Tuning

### Similarity Threshold
- **0.90+** - Very strict, may miss some duplicates
- **0.85** - Balanced (recommended)
- **0.80-0.82** - More sensitive, may flag more false positives

### Quality Score
- **8+** - High-quality content only
- **6** - Balanced (recommended)
- **4** - More lenient

### Shingle Size
- **2** - More sensitive to small changes
- **3** - Balanced (recommended)
- **4** - Less sensitive, faster

## 🔗 Integration with Blog Autopublisher

Point your autopublisher to the gatekeeper instead of directly to your platform:

```javascript
// blog-autopublisher/index.cjs
const WEBHOOK_URL = "http://localhost:3000/ingest"; // Gatekeeper endpoint
```

The gatekeeper will:
1. Analyze each post
2. Make publish/review decision
3. Forward approved posts to your platform
4. Send flagged posts to review endpoint (if configured)

## 💡 AI Analysis Details

### Quality Factors
- Content depth and technical accuracy
- Relevance to target audience
- Value proposition clarity
- Professional writing quality

### Brand Voice Check
- Professional, authoritative tone
- Technology-focused content
- Clear, concise communication
- TalPro brand alignment

### SEO Optimization
- Title optimization (keyword placement, length)
- Meta description creation
- Tag recommendations based on content
- Readability improvements

## 🚨 Graceful Fallback

If AI analysis fails:
- System automatically defaults to **REVIEW** decision
- MinHash similarity check still works
- No data loss or service interruption
- Error logged for monitoring

## 📈 Monitoring

Watch the logs for:
```
[AI Analyzer] Error: <error details>
[forward] Error forwarding to <url>: <error details>
```

Check `/_stats` endpoint regularly to monitor:
- Publish vs review ratio
- Average quality scores
- Overall gatekeeper health

## 🎓 Best Practices

1. **Start with defaults** - The system is pre-tuned for balance
2. **Monitor stats** - Check `/_stats` daily for the first week
3. **Review flagged content** - Verify AI decisions are accurate
4. **Adjust thresholds** - Fine-tune based on your content patterns
5. **Use HMAC** - Always enable signing in production
6. **Set up review endpoint** - Don't lose flagged content

## 🛠️ Troubleshooting

**Too many false positives?**
- Lower `SIMILARITY_THRESHOLD` to 0.82
- Lower `MIN_QUALITY_SCORE` to 5

**Duplicates slipping through?**
- Raise `SIMILARITY_THRESHOLD` to 0.88
- Check AI semantic duplicate detection

**AI analysis too slow?**
- Disable with `AI_ANALYSIS_ENABLED=false`
- System falls back to MinHash only

**Need faster processing?**
- Reduce `SIMILARITY_WINDOW_DAYS` to 180
- Reduce shingle comparison limit in code

---

Built with ❤️ for TalPro by Replit Agent
