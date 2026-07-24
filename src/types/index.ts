/**
 * 高亮标注片段
 */
export interface HighlightSpan {
  start: number;
  end: number;
  text: string;
  score: number;
  risk: 'low' | 'medium' | 'high';
  suggestion: string;
}

/**
 * 段落检测结果
 */
export interface ParagraphResult {
  text: string;
  score: number;
  risk: 'low' | 'medium' | 'high';
  highlights: HighlightSpan[];
}

/**
 * 检测结果
 */
export interface DetectionResult {
  id: string;
  file_name: string | null;
  ai_score: number;
  risk_level: 'low' | 'medium' | 'high';
  processing_time: number;
  paragraphs: ParagraphResult[];
  suggestions: string[];
  created_at: string;
}
