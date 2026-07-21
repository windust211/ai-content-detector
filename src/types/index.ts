/**
 * 通用 API 响应格式
 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/**
 * 通用错误响应
 */
export interface ApiError {
  code: number;
  message: string;
  data: null;
}

/**
 * 用户信息
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

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
