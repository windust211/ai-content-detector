"""AI 内容检测服务 — 纯规则检测。"""

import re
import time
import uuid
from datetime import datetime, timezone

from app.schemas.detect import DetectionResult, ParagraphResult, HighlightSpan
from app.config import settings

# AI 文本常见模式及其权重
_AI_PATTERNS = [
    (r"\b(?:Additionally|Furthermore|Moreover|Nevertheless|Consequently)\b", 15),
    (r"\b(?:In conclusion|To summarize|In summary|Overall|Thus)\b", 12),
    (r"\b(?:It is important to note that|It is worth noting that)\b", 18),
    (r"\b(?:As previously mentioned|As discussed earlier|As stated above)\b", 16),
    (r"\b(?:In order to|Due to the fact that|In the event that)\b", 14),
    (r"\b(?:This suggests that|This indicates that|This implies that)\b", 12),
    (r"\b(?:A wide range of|A variety of|A number of)\b", 10),
    (r"\b(?:It is essential that|It is crucial that|It is imperative that)\b", 14),
    (r"\b(?:On the other hand|In contrast|On the contrary)\b", 8),
    (r"\b(?:For instance|For example|Such as|In particular)\b", 6),
]

_AI_TRANSITIONS = [
    "however", "therefore", "furthermore", "moreover", "nevertheless",
    "consequently", "additionally", "subsequently", "conversely", "accordingly",
]


# 单次处理的最大字符数，超过则分块处理以控制内存
_MAX_CHUNK_CHARS = 50000


def analyze_text(text: str) -> DetectionResult:
    """纯规则检测：句式分析、过渡词检测、句子长度分析。"""
    start_time = time.time()

    if len(text) > _MAX_CHUNK_CHARS:
        return _analyze_text_chunked(text, start_time)

    paragraphs = _split_paragraphs(text)
    paragraph_results = [_analyze_paragraph_rule(p) for p in paragraphs]

    avg_score = (
        sum(p.score for p in paragraph_results) / len(paragraph_results)
        if paragraph_results
        else 0.0
    )

    processing_time = round(time.time() - start_time, 2)

    return DetectionResult(
        id=str(uuid.uuid4()),
        ai_score=round(avg_score, 2),
        risk_level=_determine_risk_level(avg_score),
        processing_time=processing_time,
        paragraphs=paragraph_results,
        suggestions=_generate_suggestions(avg_score, paragraph_results),
        created_at=datetime.now(timezone.utc).isoformat(),
    )


def _analyze_text_chunked(text: str, start_time: float) -> DetectionResult:
    """分块分析超长文本，最后合并结果。"""
    chunks = [text[i:i + _MAX_CHUNK_CHARS] for i in range(0, len(text), _MAX_CHUNK_CHARS)]

    all_paragraphs = []
    total_score = 0.0
    total_weight = 0

    for chunk in chunks:
        for p_text in _split_paragraphs(chunk):
            result = _analyze_paragraph_rule(p_text)
            all_paragraphs.append(result)
            total_score += result.score * len(p_text)
            total_weight += len(p_text)

    avg_score = (total_score / total_weight) if total_weight > 0 else 0.0
    processing_time = round(time.time() - start_time, 2)

    return DetectionResult(
        id=str(uuid.uuid4()),
        ai_score=round(avg_score, 2),
        risk_level=_determine_risk_level(avg_score),
        processing_time=processing_time,
        paragraphs=all_paragraphs,
        suggestions=_generate_suggestions(avg_score, all_paragraphs),
        created_at=datetime.now(timezone.utc).isoformat(),
    )


def _split_paragraphs(text: str) -> list[str]:
    """将文本按空行分割为段落列表。"""
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    return paragraphs if paragraphs else [text]


def _split_sentences(text: str) -> list[tuple[str, int, int]]:
    """将文本按句号/问号/感叹号分割为句子，返回 (句子文本, 起始位置, 结束位置)。"""
    pattern = re.compile(r"[^.!?]*[.!?]+")
    sentences = []
    for match in pattern.finditer(text):
        start, end = match.start(), match.end()
        sentence = text[start:end].strip()
        if sentence:
            sentences.append((sentence, start, end))
    # 剩余文本
    remaining = text[text.rfind(".") + 1:].strip() if sentences else text.strip()
    if remaining and not any(s[0] == remaining for s in sentences):
        pos = text.rfind(remaining)
        sentences.append((remaining, pos, pos + len(remaining)))
    return sentences if sentences else [(text, 0, len(text))]


def _score_sentence(sentence: str) -> float:
    """计算单个句子的 AI 相似度分数（0-100）。"""
    score = 0.0
    lower = sentence.lower()

    # 检测 AI 常用模式
    for pattern, weight in _AI_PATTERNS:
        matches = re.findall(pattern, sentence, re.IGNORECASE)
        if matches:
            score += weight * len(matches)

    # 检测过渡词密度
    words = lower.split()
    if words:
        transition_count = sum(
            1 for w in words if w.strip(".,;:!?") in _AI_TRANSITIONS
        )
        transition_ratio = transition_count / len(words)
        if transition_ratio > 0.05:
            score += transition_ratio * 100

    # 句子长度分析
    if 15 <= len(words) <= 30:
        score += 5
    elif 30 < len(words) <= 50:
        score += 10

    # 以 This/These/The/It 开头的句式
    if re.search(r"^(This|These|The|It)\b", sentence):
        score += 5

    return min(100, max(0, score))


def _get_suggestion(text: str, score: float) -> str:
    """根据文本和分数生成修改建议。"""
    for pattern, _ in _AI_PATTERNS:
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            return f'将 "{m.group()}" 替换为更自然的表达'

    for t in _AI_TRANSITIONS:
        if t in text.lower():
            return f'减少过渡词 "{t}" 的使用频率'

    if score >= 70:
        return "添加具体例子或个人见解，使内容更真实"
    elif score >= 40:
        return "考虑调整句式结构，使其更自然"
    return "建议微调以改善流畅度"


def _analyze_paragraph_rule(paragraph: str) -> ParagraphResult:
    """使用规则引擎分析单个段落，生成分数和高亮片段。"""
    sentences = _split_sentences(paragraph)

    sentence_scores = []
    highlights = []
    total_score = 0.0

    for sentence, start, end in sentences:
        score = _score_sentence(sentence)
        sentence_scores.append(score)
        total_score += score

        if score >= 40:
            highlights.append(
                HighlightSpan(
                    start=start,
                    end=end,
                    text=sentence.strip(),
                    score=round(score, 2),
                    risk=_determine_risk_level(score),
                    suggestion=_get_suggestion(sentence, score),
                )
            )

    avg_score = total_score / len(sentence_scores) if sentence_scores else 0.0
    avg_score = min(100, max(0, avg_score))

    return ParagraphResult(
        text=paragraph,
        score=round(avg_score, 2),
        risk=_determine_risk_level(avg_score),
        highlights=highlights,
    )


def _determine_risk_level(score: float) -> str:
    if score >= 70:
        return "high"
    elif score >= 40:
        return "medium"
    return "low"


def _generate_suggestions(
    score: float, paragraphs: list[ParagraphResult] | None = None
) -> list[str]:
    """根据检测结果生成改进建议列表。"""
    suggestions = []

    if paragraphs:
        high_count = sum(1 for p in paragraphs if p.risk == "high")
        med_count = sum(1 for p in paragraphs if p.risk == "medium")
        if high_count:
            suggestions.append(
                f"{high_count} 个段落被标记为高风险 — 请查看高亮部分并添加更多原创分析。"
            )
        if med_count:
            suggestions.append(
                f"{med_count} 个段落存在中风险 — 建议调整措辞使其更自然。"
            )

    if score >= 70:
        suggestions.append("增加个人经验和独特见解。")
        suggestions.append("变换句式结构，避免重复的模板化表达。")
    elif score >= 40:
        suggestions.append("添加具体例子来支撑你的论点。")

    if not suggestions:
        suggestions.append("文本看起来是真实的，未检测到明显的 AI 生成模式。")

    return suggestions
