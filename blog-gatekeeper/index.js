import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import Database from 'better-sqlite3';
import { stripHtml, slugify, normalizeUrl, computeUniqueKey, hmac256Hex } from './lib/utils.js';
import { createMinHasher } from './lib/minhash.js';
import { analyzeContent, combineDecisions } from './lib/ai-analyzer.js';

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(morgan('tiny'));

const {
  PORT = 3000,
  DB_PATH = 'gatekeeper.db',
  SIMILARITY_THRESHOLD = '0.85',
  SIMILARITY_WINDOW_DAYS = '365',
  MINHASH_K = '64',
  SHINGLE_SIZE = '3',
  MINHASH_SEED = '1337',
  AI_ANALYSIS_ENABLED = 'true',
  MIN_QUALITY_SCORE = '6',
  PLATFORM_WEBHOOK_URL,
  PLATFORM_REVIEW_WEBHOOK_URL,
  WEBHOOK_SECRET
} = process.env;

const AI_ENABLED = AI_ANALYSIS_ENABLED === 'true';

if (!PLATFORM_WEBHOOK_URL) {
  console.warn('[WARN] PLATFORM_WEBHOOK_URL is not set. Accepted posts will not be forwarded.');
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  unique_key TEXT UNIQUE NOT NULL,
  slug TEXT,
  title TEXT,
  source_url TEXT,
  signature TEXT NOT NULL,
  shingle_count INTEGER DEFAULT 0,
  similarity REAL DEFAULT 0,
  match_post_id INTEGER,
  
  -- AI Analysis Fields
  ai_quality_score REAL,
  ai_brand_voice_match REAL,
  ai_readability_score REAL,
  ai_is_duplicate INTEGER DEFAULT 0,
  ai_fact_check_needed INTEGER DEFAULT 0,
  ai_recommended_tags TEXT,
  ai_seo_title TEXT,
  ai_seo_description TEXT,
  ai_decision TEXT,
  ai_improvements TEXT,
  
  decision TEXT NOT NULL,
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_decision ON posts(decision);
`);

const insertPost = db.prepare(`
  INSERT INTO posts (
    unique_key, slug, title, source_url, signature, shingle_count, 
    similarity, match_post_id, 
    ai_quality_score, ai_brand_voice_match, ai_readability_score,
    ai_is_duplicate, ai_fact_check_needed, ai_recommended_tags,
    ai_seo_title, ai_seo_description, ai_decision, ai_improvements,
    decision, reason
  ) VALUES (
    @unique_key, @slug, @title, @source_url, @signature, @shingle_count,
    @similarity, @match_post_id,
    @ai_quality_score, @ai_brand_voice_match, @ai_readability_score,
    @ai_is_duplicate, @ai_fact_check_needed, @ai_recommended_tags,
    @ai_seo_title, @ai_seo_description, @ai_decision, @ai_improvements,
    @decision, @reason
  )
`);

const selectByKey = db.prepare(`SELECT * FROM posts WHERE unique_key = ? LIMIT 1`);
const selectRecent = db.prepare(`
  SELECT id, signature, title FROM posts
  WHERE decision IN ('publish','review')
    AND created_at >= datetime('now', ?)
  ORDER BY id DESC
  LIMIT 2000
`);

const hasher = createMinHasher({
  K: parseInt(MINHASH_K, 10),
  S: parseInt(SHINGLE_SIZE, 10),
  seed: parseInt(MINHASH_SEED, 10)
});

function ok(res, data) { return res.status(200).json(data); }
function bad(res, msg) { return res.status(400).json({ error: msg }); }

app.get('/', (_req, res) => {
  ok(res, {
    name: 'Blog Gatekeeper AI',
    status: 'ok',
    version: '2.0.0',
    protections: ['idempotency', 'similarity-minhash', 'ai-content-analysis'],
    ai_enabled: AI_ENABLED,
    similarity_threshold: Number(SIMILARITY_THRESHOLD),
    min_quality_score: Number(MIN_QUALITY_SCORE)
  });
});

app.get('/_recent', (_req, res) => {
  const rows = db.prepare(`
    SELECT id, unique_key, slug, title, similarity, 
           ai_quality_score, ai_brand_voice_match, ai_is_duplicate,
           decision, reason, created_at 
    FROM posts 
    ORDER BY id DESC 
    LIMIT 50
  `).all();
  ok(res, { items: rows });
});

app.get('/_stats', (_req, res) => {
  const total = db.prepare(`SELECT COUNT(*) as count FROM posts`).get();
  const byDecision = db.prepare(`
    SELECT decision, COUNT(*) as count 
    FROM posts 
    GROUP BY decision
  `).all();
  
  const avgQuality = db.prepare(`
    SELECT AVG(ai_quality_score) as avg 
    FROM posts 
    WHERE ai_quality_score IS NOT NULL
  `).get();

  ok(res, {
    total: total.count,
    by_decision: byDecision.reduce((acc, row) => {
      acc[row.decision] = row.count;
      return acc;
    }, {}),
    avg_quality_score: avgQuality.avg ? Number(avgQuality.avg.toFixed(2)) : null
  });
});

app.post('/ingest', async (req, res) => {
  const payload = req.body || {};
  const title = String(payload.title || '').trim();
  const bodyRaw = String(payload.body || '').trim();

  if (!title || !bodyRaw) return bad(res, 'title and body are required');

  const unique_key = computeUniqueKey(payload);
  const exists = selectByKey.get(unique_key);
  
  if (exists) {
    return ok(res, { 
      action: 'SKIP', 
      reason: 'duplicate source', 
      unique_key,
      existing_decision: exists.decision
    });
  }

  const body = stripHtml(bodyRaw);
  const { sig, size } = hasher.signature(body);

  const windowExpr = `-${parseInt(SIMILARITY_WINDOW_DAYS, 10)} day`;
  const recent = selectRecent.all(windowExpr);

  let bestSim = 0;
  let bestId = null;

  for (const row of recent) {
    try {
      const sigB = JSON.parse(row.signature);
      const sim = hasher.similarity(sig, sigB);
      if (sim > bestSim) {
        bestSim = sim;
        bestId = row.id;
      }
    } catch {
      // ignore bad rows
    }
  }

  const threshold = Number(SIMILARITY_THRESHOLD);
  let minhashDecision = 'publish';
  let minhashReason = 'passed similarity gate';

  if (bestSim >= threshold) {
    minhashDecision = 'review';
    minhashReason = `similarity ${bestSim.toFixed(3)} ≥ ${threshold}`;
  }

  let aiAnalysis = null;
  let finalDecision = minhashDecision;
  let finalReason = minhashReason;

  if (AI_ENABLED) {
    const recentTitles = recent.slice(0, 20).map(r => r.title).filter(Boolean);
    
    const aiResult = await analyzeContent(title, body, {
      recentTitles,
      brandVoice: 'professional, authoritative, technology-focused for software development company',
      minQualityScore: Number(MIN_QUALITY_SCORE)
    });

    aiAnalysis = aiResult.analysis;

    const combined = combineDecisions(minhashDecision, aiAnalysis);
    finalDecision = combined.final_decision;
    finalReason = combined.reason;
  }

  const slug = payload.slug ? String(payload.slug) : slugify(title);
  const source_url = payload.source_url ? normalizeUrl(payload.source_url) : (payload.canonical_url || payload.link || null);

  insertPost.run({
    unique_key,
    slug,
    title,
    source_url,
    signature: JSON.stringify(sig),
    shingle_count: size,
    similarity: bestSim,
    match_post_id: bestId,
    ai_quality_score: aiAnalysis?.quality_score || null,
    ai_brand_voice_match: aiAnalysis?.brand_voice_match || null,
    ai_readability_score: aiAnalysis?.readability_score || null,
    ai_is_duplicate: aiAnalysis?.is_duplicate ? 1 : 0,
    ai_fact_check_needed: aiAnalysis?.fact_check_needed ? 1 : 0,
    ai_recommended_tags: aiAnalysis?.recommended_tags ? JSON.stringify(aiAnalysis.recommended_tags) : null,
    ai_seo_title: aiAnalysis?.seo_title || null,
    ai_seo_description: aiAnalysis?.seo_meta_description || null,
    ai_decision: aiAnalysis?.decision || null,
    ai_improvements: aiAnalysis?.improvements ? JSON.stringify(aiAnalysis.improvements) : null,
    decision: finalDecision,
    reason: finalReason
  });

  if (finalDecision === 'review' && PLATFORM_REVIEW_WEBHOOK_URL) {
    await forward(PLATFORM_REVIEW_WEBHOOK_URL, payload, 'review', aiAnalysis);
  } else if (finalDecision === 'publish' && PLATFORM_WEBHOOK_URL) {
    await forward(PLATFORM_WEBHOOK_URL, payload, 'publish', aiAnalysis);
  }

  return ok(res, {
    action: finalDecision.toUpperCase(),
    unique_key,
    minhash: {
      similarity: Number(bestSim.toFixed(3)),
      threshold,
      best_match_id: bestId,
      decision: minhashDecision
    },
    ai: AI_ENABLED ? {
      enabled: true,
      quality_score: aiAnalysis?.quality_score,
      brand_voice_match: aiAnalysis?.brand_voice_match,
      is_duplicate: aiAnalysis?.is_duplicate,
      decision: aiAnalysis?.decision,
      seo_title: aiAnalysis?.seo_title,
      recommended_tags: aiAnalysis?.recommended_tags
    } : { enabled: false },
    final_decision: finalDecision,
    reason: finalReason
  });
});

async function forward(url, payload, decision, aiAnalysis = null) {
  const enrichedPayload = {
    ...payload,
    gatekeeper: {
      decision,
      ai_analysis: aiAnalysis ? {
        quality_score: aiAnalysis.quality_score,
        recommended_tags: aiAnalysis.recommended_tags,
        seo_title: aiAnalysis.seo_title,
        seo_meta_description: aiAnalysis.seo_meta_description
      } : null
    }
  };

  const body = JSON.stringify(enrichedPayload);
  const headers = { 'Content-Type': 'application/json' };
  
  if (process.env.WEBHOOK_SECRET) {
    const sig = hmac256Hex(process.env.WEBHOOK_SECRET, body);
    headers['X-Gatekeeper-Signature'] = sig;
  }

  try {
    const resp = await fetch(url, { method: 'POST', headers, body });
    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      console.error(`[forward] ${url} -> HTTP ${resp.status} ${resp.statusText}`, text);
    }
  } catch (error) {
    console.error(`[forward] Error forwarding to ${url}:`, error.message);
  }
}

app.listen(PORT, () => {
  console.log(`✅ Blog Gatekeeper AI listening on http://localhost:${PORT}`);
  console.log(`   AI Analysis: ${AI_ENABLED ? 'ENABLED' : 'DISABLED'}`);
  console.log(`   Similarity Threshold: ${SIMILARITY_THRESHOLD}`);
  console.log(`   Min Quality Score: ${MIN_QUALITY_SCORE}`);
});
