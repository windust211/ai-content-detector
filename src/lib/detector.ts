import type { DetectionResult, ParagraphResult } from '@/types';

// 火山方舟 DeepSeek API（Responses API 格式）
const ARK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/responses';
const ARK_API_KEY = process.env.ARK_API_KEY || '';
const ARK_MODEL = process.env.ARK_MODEL || '';

interface ArkResponse {
  output: {
    type: string;
    content?: { type: string; text: string }[];
    message?: { content: string };
  }[];
}

/**
 * Call Volcano Ark DeepSeek API to detect AI-generated text.
 * Throws if the API is unavailable.
 */
export async function analyzeText(text: string, fileName: string | null = null): Promise<DetectionResult> {
  const startTime = performance.now();
  const paragraphs = splitIntoParagraphs(text);
  console.log(`[Detector] Analyzing text: ${text.length} chars, ${paragraphs.length} paragraphs`);

  // Call DeepSeek once for overall score
  console.log('[Detector] Calling DeepSeek API...');
  const deepSeekResult = await callDeepSeek(text);
  const overallScore = Math.round(deepSeekResult * 100);
  console.log(`[Detector] Overall score: ${overallScore}%`);

  // Derive per-paragraph scores from overall score + heuristics
  // (avoids inconsistent per-paragraph API calls)
  const paragraphScores = paragraphs.map((p) => {
    const baseScore = overallScore;
    const len = p.trim().length;

    // Short paragraphs get slightly adjusted scores
    if (len < 50) return Math.round(baseScore * 0.6);
    if (len < 100) return Math.round(baseScore * 0.85);

    // Check for AI-like patterns (repetitive words, transition words)
    const words = p.split(/\s+/);
    const uniqueRatio = new Set(words.map((w) => w.toLowerCase())).size / words.length;
    const transitionWords = ['moreover', 'furthermore', 'additionally', 'consequently'];
    const transitionCount = transitionWords.filter((tw) => p.toLowerCase().includes(tw)).length;

    let delta = 0;
    if (uniqueRatio < 0.4) delta += 10;
    if (transitionCount > 1) delta += 8;
    if (words.length / (p.split(/[.!?]+/).length || 1) > 25) delta += 5;

    return Math.max(0, Math.min(100, baseScore + delta));
  });

  const results: ParagraphResult[] = paragraphs.map((paraText, i) => ({
    text: paraText,
    score: paragraphScores[i],
    risk: getRiskLevel(paragraphScores[i]),
    highlights: [],
  }));

  const riskLevel = getRiskLevel(overallScore);
  const suggestions = generateSuggestions(results, overallScore);
  const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

  return {
    id: generateId(),
    file_name: fileName,
    ai_score: overallScore,
    risk_level: riskLevel,
    processing_time: parseFloat(processingTime),
    paragraphs: results,
    suggestions,
    created_at: new Date().toISOString(),
  };
}

/**
 * Call Volcano Ark DeepSeek API for a single text input.
 * Returns the probability of being AI-generated (0-1).
 */
async function callDeepSeek(text: string): Promise<number> {
  const input = text.slice(0, 2000);
  console.log(`[DeepSeek] Sending request (${input.length} chars)...`);

  if (!ARK_API_KEY || ARK_API_KEY === '') {
    console.error('[DeepSeek] API key not configured');
    throw new Error('ARK_API_KEY not configured in .env.local');
  }
  if (!ARK_MODEL) {
    console.error('[DeepSeek] Model not configured');
    throw new Error('ARK_MODEL not configured in .env.local');
  }

  const response = await fetch(ARK_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ARK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: ARK_MODEL,
      stream: false,
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `You are an AI text detection expert. Analyze the following text and determine if it is AI-generated. Return ONLY a single integer between 0 and 100, where 0 = definitely human-written, 100 = definitely AI-generated. Do not include any other text or explanation.\n\nText:\n${input}`,
            },
          ],
        },
      ],
    }),
  });

  console.log(`[DeepSeek] Response status: ${response.status}`);

  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error');
    console.error(`[DeepSeek] Error ${response.status}:`, error);
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  const data: ArkResponse = await response.json();
  // Find the assistant message output (skip reasoning blocks)
  const messageOutput = data.output?.find(
    (o) => o.type === 'message' && o.content?.[0]?.type === 'output_text'
  );
  const content = messageOutput?.content?.[0]?.text?.trim() || '50';
  console.log(`[DeepSeek] Raw response:`, content);

  const score = parseInt(content, 10);
  const clamped = isNaN(score) ? 50 : Math.max(0, Math.min(100, score));
  console.log(`[DeepSeek] AI score: ${clamped}%`);
  return clamped / 100;
}

function splitIntoParagraphs(text: string): string[] {
  // Split by double newline or single newline (for academic papers)
  const raw = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  // If too few paragraphs, try splitting by single newlines
  if (raw.length < 2) {
    const single = text.split('\n').filter((p) => p.trim().length > 20);
    return single.length >= 2 ? single : [text];
  }

  return raw;
}

function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

function generateSuggestions(
  paragraphs: ParagraphResult[],
  overallScore: number
): string[] {
  const suggestions: string[] = [];

  if (overallScore >= 70) {
    suggestions.push(
      'Consider rewriting sections with high AI scores to include more personal insights and unique perspectives.'
    );
  }

  const highRiskParagraphs = paragraphs.filter((p) => p.risk === 'high');
  if (highRiskParagraphs.length > 0) {
    suggestions.push(
      `${highRiskParagraphs.length} paragraph(s) detected with high AI probability. Review and add more original content.`
    );
  }

  if (overallScore >= 40) {
    suggestions.push(
      'Vary sentence structure and length to achieve a more natural writing flow.'
    );
    suggestions.push(
      'Reduce the use of common transition words (e.g., moreover, furthermore, consequently).'
    );
  }

  suggestions.push(
    'Add specific examples, case studies, or personal experiences to strengthen authenticity.'
  );

  return suggestions;
}

function generateId(): string {
  return `det_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}
