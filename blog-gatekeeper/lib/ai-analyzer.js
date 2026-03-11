import OpenAI from 'openai';
import pRetry from 'p-retry';

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

function isRateLimitError(error) {
  const errorMsg = error?.message || String(error);
  return (
    errorMsg.includes('429') ||
    errorMsg.includes('RATELIMIT_EXCEEDED') ||
    errorMsg.toLowerCase().includes('quota') ||
    errorMsg.toLowerCase().includes('rate limit')
  );
}

export async function analyzeContent(title, body, options = {}) {
  const {
    recentTitles = [],
    brandVoice = 'professional, authoritative, technology-focused',
    minQualityScore = 6
  } = options;

  const prompt = `You are a content quality analyst for TalPro, a professional software development company.

Analyze this blog post and provide a comprehensive evaluation:

**Title:** ${title}

**Content:** ${body.slice(0, 4000)}

**Recent Posts (for context):** ${recentTitles.length > 0 ? recentTitles.join(', ') : 'None'}

**Brand Voice:** ${brandVoice}

Provide your analysis in the following JSON format:
{
  "quality_score": <1-10, where 10 is excellent>,
  "quality_reason": "<brief explanation>",
  "is_duplicate": <true/false - semantically similar to recent posts?>,
  "duplicate_reason": "<if is_duplicate is true, explain why>",
  "brand_voice_match": <1-10, how well does it match the brand voice?>,
  "brand_voice_notes": "<suggestions for improvement>",
  "recommended_tags": ["tag1", "tag2", "tag3"],
  "seo_title": "<optimized version of the title (max 60 chars)>",
  "seo_meta_description": "<compelling meta description (max 155 chars)>",
  "readability_score": <1-10, how easy to read?>,
  "fact_check_needed": <true/false - contains claims that need verification?>,
  "fact_check_items": ["<specific claim to verify>"],
  "decision": "<publish|review|reject>",
  "decision_reason": "<why this decision was made>",
  "improvements": ["<specific suggestion 1>", "<specific suggestion 2>"]
}

Guidelines:
- quality_score < ${minQualityScore} should result in "review" or "reject"
- is_duplicate: true should result in "review" decision
- brand_voice_match < 6 should result in "review" decision
- decision: "publish" only if quality_score >= ${minQualityScore}, is_duplicate = false, brand_voice_match >= 6`;

  try {
    const analysisResult = await pRetry(
      async () => {
        try {
          const completion = await openai.chat.completions.create({
            model: 'gpt-5', // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
            messages: [
              {
                role: 'system',
                content: 'You are an expert content analyst specializing in software development and technology content. Always respond with valid JSON.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            response_format: { type: 'json_object' },
            max_completion_tokens: 8192
          });

          const result = completion.choices[0]?.message?.content || '{}';
          return JSON.parse(result);
        } catch (error) {
          if (isRateLimitError(error)) {
            throw error;
          }
          throw new pRetry.AbortError(error);
        }
      },
      {
        retries: 3,
        minTimeout: 2000,
        maxTimeout: 16000,
        factor: 2
      }
    );

    return {
      success: true,
      analysis: analysisResult
    };
  } catch (error) {
    console.error('[AI Analyzer] Error:', error.message);
    
    return {
      success: false,
      error: error.message,
      analysis: {
        quality_score: 5,
        quality_reason: 'AI analysis failed - manual review recommended',
        is_duplicate: false,
        duplicate_reason: '',
        brand_voice_match: 5,
        brand_voice_notes: 'Unable to analyze due to AI error',
        recommended_tags: [],
        seo_title: title.slice(0, 60),
        seo_meta_description: body.slice(0, 155),
        readability_score: 5,
        fact_check_needed: true,
        fact_check_items: ['Manual review needed due to AI analysis failure'],
        decision: 'review',
        decision_reason: 'AI analysis unavailable - defaulting to manual review',
        improvements: ['Manual content review required']
      }
    };
  }
}

export async function batchAnalyzeRecent(posts, options = {}) {
  const analyses = [];
  
  for (const post of posts.slice(0, 10)) {
    try {
      const result = await analyzeContent(post.title, post.body, {
        ...options,
        recentTitles: []
      });
      
      analyses.push({
        post_id: post.id,
        title: post.title,
        ...result.analysis
      });
      
      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.error(`[Batch Analyze] Error on post ${post.id}:`, error.message);
    }
  }
  
  return analyses;
}

export function combineDecisions(minhashDecision, aiAnalysis) {
  const decisions = {
    minhash: minhashDecision,
    ai: aiAnalysis.decision
  };

  if (minhashDecision === 'skip') {
    return {
      final_decision: 'skip',
      reason: 'Duplicate source detected by idempotency check',
      decisions
    };
  }

  if (minhashDecision === 'review' || aiAnalysis.decision === 'review' || aiAnalysis.decision === 'reject') {
    const reasons = [];
    if (minhashDecision === 'review') reasons.push('High MinHash similarity');
    if (aiAnalysis.decision === 'review') reasons.push(aiAnalysis.decision_reason);
    if (aiAnalysis.decision === 'reject') reasons.push('AI rejected: ' + aiAnalysis.decision_reason);

    return {
      final_decision: 'review',
      reason: reasons.join('; '),
      decisions,
      ai_analysis: aiAnalysis
    };
  }

  if (aiAnalysis.quality_score < 6 || aiAnalysis.brand_voice_match < 6) {
    return {
      final_decision: 'review',
      reason: `Quality concerns: score=${aiAnalysis.quality_score}, brand_voice=${aiAnalysis.brand_voice_match}`,
      decisions,
      ai_analysis: aiAnalysis
    };
  }

  return {
    final_decision: 'publish',
    reason: 'Passed all quality gates',
    decisions,
    ai_analysis: aiAnalysis
  };
}
