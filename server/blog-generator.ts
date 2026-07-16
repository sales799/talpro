/**
 * TalPro Auto Blog Poster — Content Generation Engine
 *
 * This module generates blog posts using Claude API and publishes them
 * via the existing /api/blog/webhook endpoint.
 *
 * Can be called from:
 * 1. N8N workflow (via HTTP Request node → POST /api/blog/generate)
 * 2. Manual trigger (POST /api/blog/generate with optional topic)
 * 3. Cron job (see blog-cron.ts)
 *
 * Content Pipeline:
 * 1. Select topic from editorial calendar or generate from themes
 * 2. Generate article via Claude API (Sonnet)
 * 3. Score content quality
 * 4. Publish via webhook endpoint or save as draft
 */

import Anthropic from '@anthropic-ai/sdk';

// ── Content Themes (aligned with TalPro positioning) ──

const CONTENT_PILLARS = [
  {
    pillar: 'GCC Hiring & Expansion',
    topics: [
      'GCC growth in Tier-2 cities beyond Bangalore and Hyderabad',
      'How GCCs are building AI/ML teams in India — hiring patterns and challenges',
      'GCC vs traditional outsourcing: why companies are choosing captive centres',
      'Retention strategies that work for GCC engineering teams in India',
      'Setting up a GCC compliance checklist — DPDPA, labour codes, and entity requirements',
    ],
  },
  {
    pillar: 'Labour Code Compliance',
    topics: [
      'India\'s 4 new Labour Codes: what IT employers need to know in 2026',
      'EPF and ESI compliance for contract staffing — employer obligations explained',
      'Professional Tax rates across Indian states — a complete reference',
      'DPDPA (Digital Personal Data Protection Act) compliance for HR and recruitment',
      'Gratuity calculations under the new Code on Social Security — practical examples',
    ],
  },
  {
    pillar: 'IT Staffing Operations',
    topics: [
      'Billing rate structures for IT contract staffing in India — what\'s market standard',
      'How to reduce time-to-hire from 45 days to under 20 days',
      'The hidden costs of bad hiring: calculating the real impact of wrong hires',
      'Building an internal referral programme that actually works',
      'RPO vs traditional recruitment: when to choose each model',
    ],
  },
  {
    pillar: 'City-wise Talent Intelligence',
    topics: [
      'Pune\'s emerging tech talent pool — specializations and salary benchmarks',
      'Chennai vs Hyderabad for data engineering talent — a comparison',
      'NCR (Gurgaon/Noida) fintech hiring landscape in 2026',
      'Bangalore talent market saturation: strategies for competitive hiring',
      'Tier-2 tech hubs: Jaipur, Kochi, and Ahmedabad as emerging talent sources',
    ],
  },
  {
    pillar: 'Technology Hiring Trends',
    topics: [
      'AI/ML hiring in India — which roles are in demand and what they pay',
      'Platform engineering vs DevOps — the hiring shift',
      'Rust and Go adoption in Indian companies — developer supply vs demand',
      'Cybersecurity hiring surge: filling the 40,000-role gap in India',
      'Low-code/no-code impact on traditional developer hiring',
    ],
  },
  {
    pillar: 'Compensation & Benefits',
    topics: [
      'ESOP taxation changes in India — what tech employees need to know',
      'Notice period buyouts: when they make sense and how to negotiate',
      'Structuring competitive compensation packages for senior engineers in India',
      'Contract-to-hire conversion: fair pricing models and best practices',
      'Remote work compensation: should location-based pay apply in India?',
    ],
  },
];

// ── Internal pages for linking ──

const INTERNAL_LINKS = [
  { url: '/services/it-staffing', anchor: 'IT contract staffing' },
  { url: '/services/engineering-staffing', anchor: 'engineering staffing' },
  { url: '/services/direct-hiring-it', anchor: 'permanent IT hiring' },
  { url: '/services/executive-search', anchor: 'executive search' },
  { url: '/services/gcc-accelerator', anchor: 'GCC Accelerator' },
  { url: '/salary-guide', anchor: 'salary benchmarks' },
  { url: '/salary-calculator', anchor: 'salary calculator' },
  { url: '/industries/fintech-financial-services', anchor: 'fintech staffing' },
  { url: '/how-we-work', anchor: 'our recruitment process' },
  { url: '/contact', anchor: 'get in touch' },
  { url: '/for-candidates', anchor: 'explore opportunities' },
  { url: '/case-studies', anchor: 'client success stories' },
  { url: '/staffing-quiz', anchor: 'staffing model quiz' },
];

// ── Topic Selection ──

export function selectTopic(dayIndex?: number): { pillar: string; topic: string } {
  const allTopics = CONTENT_PILLARS.flatMap((p) =>
    p.topics.map((t) => ({ pillar: p.pillar, topic: t }))
  );

  // Use day index for deterministic rotation, or random if not provided
  const idx = dayIndex !== undefined
    ? dayIndex % allTopics.length
    : Math.floor(Math.random() * allTopics.length);

  return allTopics[idx];
}

// ── Content Generation ──

export async function generateArticle(
  topic: string,
  pillar: string,
  apiKey?: string
): Promise<{
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}> {
  const anthropicKey = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    throw new Error('ANTHROPIC_API_KEY is required for content generation');
  }

  const client = new Anthropic({ apiKey: anthropicKey });

  // Select 3-4 random internal links to weave in
  const shuffled = [...INTERNAL_LINKS].sort(() => Math.random() - 0.5);
  const linksToInclude = shuffled.slice(0, 4);
  const linkInstructions = linksToInclude
    .map((l) => `- Link to "${l.anchor}" at ${l.url}`)
    .join('\n');

  const prompt = `You are the content engine for TalPro India (talproindia.com). Talpro is India’s Technology Talent and GCC Workforce Partner. Write a comprehensive blog article on the following topic.

TOPIC: ${topic}
CONTENT PILLAR: ${pillar}

BRAND VOICE:
- Authoritative but approachable — like an experienced recruiter sharing insights over coffee
- Data-driven — cite specific numbers, percentages, salary ranges where relevant
- India-specific — all context is Indian IT industry, Indian labour law, Indian cities
- Practical — give actionable advice, not generic platitudes
- Treat every statistic, salary figure, client outcome, service level, guarantee, and industry capability as unverified unless it is supplied in the topic with an evidence source. Do not invent or imply Talpro performance claims.
- Never use the words "leverage", "synergy", "paradigm shift", or "game-changer"
- Write in British English spelling (organisation, specialisation, etc.)

STRUCTURE REQUIREMENTS:
- Title: compelling, under 65 characters, includes primary keyword
- Article: 1,200–1,800 words
- Use H2 and H3 headings to break up content
- Include at least one bulleted or numbered list
- Include specific Indian salary figures in INR (Lakhs Per Annum) where relevant
- End with a call-to-action referencing TalPro's services

INTERNAL LINKS (weave these naturally into the article — use HTML anchor tags):
${linkInstructions}

SEO REQUIREMENTS:
- Primary keyword should appear 3-5 times naturally
- Use related LSI keywords throughout
- First paragraph should hook the reader with a surprising stat or insight

OUTPUT FORMAT (return as valid JSON):
{
  "title": "...",
  "content": "<p>...</p><h2>...</h2>...",
  "excerpt": "...(150-200 chars)...",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],
  "metaTitle": "...(under 60 chars)...",
  "metaDescription": "...(150-160 chars)...",
  "keywords": ["primary keyword", "secondary keyword 1", "secondary keyword 2"]
}

Return ONLY the JSON object. No markdown code fences, no explanation.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Parse the JSON response
  try {
    // Try to extract JSON from the response (handle cases where Claude wraps in code fences)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error(`Failed to parse Claude response as JSON: ${(e as Error).message}`);
  }
}

// ── Content Quality Scoring ──

export function scoreContent(article: {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  // Word count (target: 1200-1800)
  const plainText = article.content.replace(/<[^>]+>/g, '');
  const wordCount = plainText.split(/\s+/).length;
  if (wordCount < 800) {
    score -= 25;
    issues.push(`Word count too low: ${wordCount} (minimum 800)`);
  } else if (wordCount < 1200) {
    score -= 10;
    issues.push(`Word count below target: ${wordCount} (target 1200+)`);
  }

  // Heading structure
  const h2Count = (article.content.match(/<h2/gi) || []).length;
  const h3Count = (article.content.match(/<h3/gi) || []).length;
  if (h2Count < 2) {
    score -= 10;
    issues.push(`Too few H2 headings: ${h2Count} (minimum 2)`);
  }
  if (h2Count + h3Count < 3) {
    score -= 5;
    issues.push('Needs more heading structure for readability');
  }

  // Internal links
  const linkCount = (article.content.match(/href=["']\/[^"']+["']/gi) || []).length;
  if (linkCount < 2) {
    score -= 15;
    issues.push(`Only ${linkCount} internal links (minimum 2)`);
  }

  // Meta description length
  if (article.metaDescription.length < 120) {
    score -= 5;
    issues.push(`Meta description too short: ${article.metaDescription.length} chars`);
  } else if (article.metaDescription.length > 160) {
    score -= 5;
    issues.push(`Meta description too long: ${article.metaDescription.length} chars`);
  }

  // Meta title length
  if (article.metaTitle.length > 70) {
    score -= 5;
    issues.push(`Meta title too long: ${article.metaTitle.length} chars`);
  }

  // Excerpt length
  if (article.excerpt.length < 100 || article.excerpt.length > 300) {
    score -= 5;
    issues.push(`Excerpt length not ideal: ${article.excerpt.length} chars`);
  }

  // Tags
  if (article.tags.length < 3) {
    score -= 5;
    issues.push(`Too few tags: ${article.tags.length} (minimum 3)`);
  }

  // Keywords
  if (article.keywords.length < 2) {
    score -= 5;
    issues.push('Need at least 2 target keywords');
  }

  // Check for lists (ul/ol)
  const hasList = /<(ul|ol)/i.test(article.content);
  if (!hasList) {
    score -= 5;
    issues.push('No bulleted or numbered list found');
  }

  return { score: Math.max(0, score), issues };
}

// ── Full Pipeline: Generate + Score + Publish ──

export async function generateAndPublish(options: {
  topic?: string;
  pillar?: string;
  dayIndex?: number;
  apiKey?: string;
  publishUrl?: string;
  qualityThreshold?: number;
  dryRun?: boolean;
}): Promise<{
  success: boolean;
  title: string;
  slug?: string;
  score: number;
  issues: string[];
  published: boolean;
  url?: string;
  error?: string;
}> {
  const {
    qualityThreshold = 60,
    dryRun = false,
    publishUrl = process.env.TALPRO_PUBLISH_URL || 'https://talproindia.com/api/blog/webhook',
  } = options;

  // 1. Select topic
  const selected = options.topic && options.pillar
    ? { topic: options.topic, pillar: options.pillar }
    : selectTopic(options.dayIndex);

  console.log(`[BlogGen] Topic: "${selected.topic}" (Pillar: ${selected.pillar})`);

  // 2. Generate article
  let article;
  try {
    article = await generateArticle(selected.topic, selected.pillar, options.apiKey);
    console.log(`[BlogGen] Generated: "${article.title}" (${article.content.replace(/<[^>]+>/g, '').split(/\s+/).length} words)`);
  } catch (error) {
    return {
      success: false,
      title: selected.topic,
      score: 0,
      issues: [(error as Error).message],
      published: false,
      error: (error as Error).message,
    };
  }

  // 3. Score quality
  const { score, issues } = scoreContent(article);
  console.log(`[BlogGen] Quality score: ${score}/100 (${issues.length} issues)`);

  if (score < qualityThreshold) {
    console.log(`[BlogGen] Score ${score} below threshold ${qualityThreshold} — holding as draft`);
    return {
      success: true,
      title: article.title,
      score,
      issues,
      published: false,
    };
  }

  // 4. Publish (or dry run)
  if (dryRun) {
    console.log('[BlogGen] Dry run — skipping publish');
    return {
      success: true,
      title: article.title,
      score,
      issues,
      published: false,
    };
  }

  try {
    const response = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: article.title,
        content_markdown: article.content,
        excerpt: article.excerpt,
        tags: article.tags,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Publish failed (${response.status}): ${err}`);
    }

    const result = await response.json();
    console.log(`[BlogGen] Published: ${result.post?.url}`);

    return {
      success: true,
      title: article.title,
      slug: result.post?.slug,
      score,
      issues,
      published: true,
      url: result.post?.url,
    };
  } catch (error) {
    return {
      success: false,
      title: article.title,
      score,
      issues,
      published: false,
      error: (error as Error).message,
    };
  }
}
