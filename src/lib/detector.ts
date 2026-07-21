import type { DetectionResult, ParagraphResult, HighlightSpan } from '@/types';

/**
 * Simulate AI detection analysis on the given text content.
 * In a production environment, this would call an external AI model API.
 */
export function analyzeText(text: string, fileName: string | null = null): DetectionResult {
  const paragraphs = splitIntoParagraphs(text);
  const results: ParagraphResult[] = paragraphs.map((paraText) =>
    analyzeParagraph(paraText)
  );

  const overallScore = calculateOverallScore(results);
  const riskLevel = getRiskLevel(overallScore);
  const suggestions = generateSuggestions(results, overallScore);

  return {
    id: generateId(),
    file_name: fileName,
    ai_score: overallScore,
    risk_level: riskLevel,
    processing_time: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
    paragraphs: results,
    suggestions,
    created_at: new Date().toISOString(),
  };
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

function analyzeParagraph(text: string): ParagraphResult {
  const score = computeParagraphScore(text);
  const risk = getRiskLevel(score);
  const highlights = findHighlights(text, score);

  return {
    text,
    score,
    risk,
    highlights,
  };
}

function computeParagraphScore(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length < 20) return Math.random() * 30;

  let score = 50; // baseline

  // Feature 1: Repetitive word patterns
  const words = trimmed.split(/\s+/);
  const uniqueRatio = new Set(words.map((w) => w.toLowerCase())).size / words.length;
  if (uniqueRatio < 0.4) score += 20;
  else if (uniqueRatio < 0.55) score += 10;
  else if (uniqueRatio > 0.8) score -= 10;

  // Feature 2: Transition word frequency (common in AI text)
  const transitionWords = [
    'moreover', 'furthermore', 'additionally', 'consequently',
    'nevertheless', 'nonetheless', 'accordingly', 'importantly',
    'specifically', 'particularly', 'notably', 'significantly',
  ];
  const transitionCount = transitionWords.filter((tw) =>
    trimmed.toLowerCase().includes(tw)
  ).length;
  if (transitionCount > 3) score += 15;
  else if (transitionCount > 1) score += 5;

  // Feature 3: Average sentence length
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length > 0) {
    const avgSentenceLength =
      words.length / sentences.length;
    if (avgSentenceLength > 30) score += 10;
    else if (avgSentenceLength > 22) score += 5;
    else if (avgSentenceLength < 12) score -= 5;
  }

  // Feature 4: Vocabulary richness (simple heuristic)
  const longWords = words.filter((w) => w.length > 8).length;
  const longWordRatio = longWords / words.length;
  if (longWordRatio > 0.35) score += 10;
  else if (longWordRatio > 0.25) score += 5;

  // Add some randomness for realistic variation
  score += (Math.random() - 0.5) * 10;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function findHighlights(text: string, score: number): HighlightSpan[] {
  const highlights: HighlightSpan[] = [];
  const words = text.split(/\s+/);

  if (score < 30) return highlights;

  // Find sentences with high AI indicators
  const sentences = text.split(/(?<=[.!?])\s+/);
  let globalOffset = 0;

  for (const sentence of sentences) {
    const sentenceScore = computeParagraphScore(sentence);
    if (sentenceScore > 60) {
      const start = text.indexOf(sentence, globalOffset);
      if (start >= 0) {
        const end = start + sentence.length;
        highlights.push({
          start,
          end,
          text: sentence,
          score: sentenceScore,
          risk: getRiskLevel(sentenceScore),
          suggestion: getSuggestion(sentenceScore),
        });
        globalOffset = end;
      }
    }
  }

  // Limit to at most 5 highlights
  return highlights.slice(0, 5);
}

function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

function calculateOverallScore(paragraphs: ParagraphResult[]): number {
  if (paragraphs.length === 0) return 0;
  const total = paragraphs.reduce((sum, p) => sum + p.score, 0);
  return Math.round(total / paragraphs.length);
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

function getSuggestion(score: number): string {
  if (score >= 70) {
    return 'Consider rewriting this sentence in your own words.';
  }
  if (score >= 40) {
    return 'Try to vary the sentence structure.';
  }
  return 'This appears authentic.';
}

function generateId(): string {
  return `det_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}
