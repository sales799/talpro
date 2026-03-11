# TalPro Blog AutoPublisher

Automated blog post publishing system for TalPro's blog with bulk publishing, scheduled daily posts, retries, and health monitoring.

## Features

- ✅ **Bulk Publishing**: Publish 10 posts immediately to validate end-to-end workflow
- ✅ **Daily Scheduling**: Automatically publish new posts daily at a configured time (UTC)
- ✅ **Retry Logic**: Exponential backoff for 429/5xx errors and network failures
- ✅ **Idempotency**: UUID-based idempotency keys for each request
- ✅ **Health Monitoring**: Built-in `/health` endpoint for uptime checks
- ✅ **Verification**: Optional endpoint to verify published posts appear in the blog
- ✅ **Pretty URLs**: Generates readable blog URLs (e.g., `https://talpro.in/blog/slug`)
- ✅ **Dry Run Mode**: Test the workflow without making actual API calls
- ✅ **Zero Dependencies**: Uses only Node.js built-ins (no npm packages required)

## Quick Start

### 1. Configuration

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
BLOG_WEBHOOK_URL=http://localhost:5000/api/blog/webhook
BLOG_BASE_URL=https://talpro.in
INITIAL_POSTS=10
DAILY_NUM_POSTS=3
DAILY_UTC_HOUR=9
DAILY_UTC_MIN=0
```

### 2. Run the AutoPublisher

```bash
cd blog-autopublisher
node index.cjs
```

**Note**: The script uses `.cjs` extension for CommonJS compatibility with the ES module project.

### 3. What Happens

1. **Initial Batch**: Publishes 10 test posts immediately
2. **Success Check**: If 90%+ succeed, enables daily scheduling
3. **Daily Posts**: Publishes 3 new posts every day at 09:00 UTC
4. **Health Server**: Runs on port 3000 with status at `/health`

## Configuration Options

### Required

- `BLOG_WEBHOOK_URL` - Your blog webhook endpoint (default: `http://localhost:5000/api/blog/webhook`)

### Optional

- `BLOG_API_KEY` - API key for authentication (if required)
- `BLOG_BASE_URL` - Base URL for pretty blog links (default: `https://talpro.in`)
- `BLOG_POSTS_URL` - GET endpoint to verify published posts
- `INITIAL_POSTS` - Posts to publish on startup (default: `10`)
- `DAILY_NUM_POSTS` - Posts per daily batch (default: `3`)
- `DAILY_UTC_HOUR` - Hour for daily run in UTC (default: `9`)
- `DAILY_UTC_MIN` - Minute for daily run in UTC (default: `0`)
- `DELAY_MS` - Delay between posts in ms (default: `1000`)
- `TIMEOUT_MS` - Request timeout in ms (default: `20000`)
- `SUCCESS_RATIO` - Success threshold for scheduling (default: `0.9`)
- `REDEPLOY_HOOK_URL` - Webhook to trigger after batch completion
- `DRY_RUN` - Set to `1` to test without API calls (default: `0`)
- `TITLE_PREFIX` - Prefix for test post titles (default: `TalPro Auto Test`)
- `FIXED_SOURCE_URLS` - CSV list of source URLs to cycle through
- `PORT` - Health server port (default: `3000`)

## Webhook Payload

Each post is sent with this structure:

```json
{
  "title": "TalPro Auto Test #1: AI-Powered Development Services",
  "content_markdown": "# Post content in Markdown...",
  "source_url": "https://news.example.com/article-1",
  "tags": ["AI", "Machine Learning", "Software Development", "Technology", "Innovation"],
  "published": true
}
```

The server handles:
- Content enhancement with OpenAI (graceful fallback)
- Slug generation
- Hero image extraction from og:image or default
- SEO optimization
- Social media distribution

## Health Monitoring

Access `http://localhost:3000/health` for JSON status:

```json
{
  "service": "talpro-autopublisher",
  "now": "2025-11-02T17:30:00.000Z",
  "config": {
    "initialPosts": 10,
    "dailyHourUTC": 9,
    "dailyMinUTC": 0,
    "dailyNumPosts": 3
  },
  "lastRunAt": "2025-11-02T09:00:00.000Z",
  "lastResult": {
    "okCount": 3,
    "total": 3,
    "ratio": 1
  },
  "nextRunAt": "2025-11-03T09:00:00.000Z"
}
```

## Testing

### Quick Test

Test with a single post:

```bash
node test-single-post.cjs
```

### Dry Run Mode

Test the workflow without making API calls:

```bash
DRY_RUN=1 node index.cjs
```

### Single Post Test

Publish just 1 post to test:

```bash
INITIAL_POSTS=1 SUCCESS_RATIO=0 node index.cjs
```

### Custom Schedule

Test daily posts at specific time (e.g., 15:30 UTC):

```bash
DAILY_UTC_HOUR=15 DAILY_UTC_MIN=30 node index.cjs
```

## Output Example

```
🚀 TalPro AutoPublisher starting…
→ Initial batch size: 10
→ Daily schedule (UTC): 09:00 — 3 posts
🌐 Health server listening on port 3000 (GET /health).

=== Initial Validation Batch — starting (10 posts) @ 2025-11-02T17:00:00.000Z ===
→ Webhook: http://localhost:5000/api/blog/webhook
→ Pretty URLs base: https://talpro.in
→ To‑do:
   [ ] Init checks
   [ ] Publish posts
   [ ] Verify visibility
   [ ] Trigger redeploy (optional)
… Init: ok
   [x] Init checks
📝 Publishing #1: TalPro Auto Test #1: AI-Powered Development Services
   ✅ Success (status 201) — slug=talpro-auto-test-1-ai-powered-development-services | url=https://talpro.in/blog/talpro-auto-test-1-ai-powered-development-services
...

——— Summary ———
┌─────────┬───┬──────┬────────┬──────────┬─────────────────────────────────────────┬────────────────────────────────────────────────────┐
│ (index) │ # │ ok   │ status │ attempts │ slug                                    │ url                                                │
├─────────┼───┼──────┼────────┼──────────┼─────────────────────────────────────────┼────────────────────────────────────────────────────┤
│ 0       │ 1 │ true │ 201    │ 1        │ 'talpro-auto-test-1-ai-powered-...'     │ 'https://talpro.in/blog/talpro-auto-test-1-...'   │
│ ...     │   │      │        │          │                                         │                                                    │
└─────────┴───┴──────┴────────┴──────────┴─────────────────────────────────────────┴────────────────────────────────────────────────────┘

✅ 10/10 posts published.
   [x] Verify visibility (10/10 verified)
   [x] Trigger redeploy (optional)
=== Initial Validation Batch — done @ 2025-11-02T17:00:30.000Z ===

🎉 Success threshold met (100% ≥ 90%). Scheduling daily job…
🗓️  Next daily run scheduled for 2025-11-03T09:00:00.000Z (UTC).
```

## Keeping It Running

For daily scheduling to work, the script must stay active:

1. **Replit Always On**: Enable in deployment settings
2. **External Uptime Monitor**: Use services like UptimeRobot to ping `/health`
3. **Process Manager**: Use PM2 or similar for production deployments

## Integration with TalPro Blog

This script works with your existing blog infrastructure:

- **Webhook**: Posts to `/api/blog/webhook`
- **Database**: PostgreSQL with Drizzle ORM (persistent storage)
- **OpenAI**: Server-side content enhancement (with fallback)
- **Hero Images**: Automatic og:image extraction or default
- **Social Media**: Webhook distribution to LinkedIn, Facebook, X
- **SEO**: Canonical tags, meta descriptions, slugs

## Troubleshooting

### Posts not appearing?

Check the webhook endpoint is accessible:
```bash
curl -X POST http://localhost:5000/api/blog/webhook -H "Content-Type: application/json" -d '{"title":"Test","content_markdown":"# Test","source_url":"https://example.com","tags":[],"published":true}'
```

### Daily scheduler not running?

Ensure the script stays active (see "Keeping It Running" section above).

### Authentication errors?

Set `BLOG_API_KEY` if your webhook requires authentication.

## License

Part of the TalPro website codebase.
