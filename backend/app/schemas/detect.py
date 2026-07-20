"""Detection 相关的请求和响应 Pydantic 模型。"""

from pydantic import BaseModel, Field


class HighlightSpan(BaseModel):
    """高亮标注片段 — 标识段落中需要修改的部分。"""

    start: int = Field(..., description="在段落中的起始字符位置")
    end: int = Field(..., description="在段落中的结束字符位置")
    text: str = Field(..., description="高亮文本内容")
    score: float = Field(..., ge=0, le=100, description="该片段的 AI 相似度分数")
    risk: str = Field(..., description="风险等级: low, medium, high")
    suggestion: str = Field(..., description="修改建议")


class ParagraphResult(BaseModel):
    """段落级检测结果。"""

    text: str = Field(..., description="段落全文")
    score: float = Field(..., ge=0, le=100, description="段落 AI 相似度分数")
    risk: str = Field(..., description="风险等级: low, medium, high")
    highlights: list[HighlightSpan] = Field(
        default_factory=list, description="需要高亮的片段列表"
    )


class DetectionResult(BaseModel):
    """完整检测结果。"""

    id: str = Field(..., description="检测唯一 ID")
    file_name: str | None = Field(None, description="原始文件名")
    ai_score: float = Field(..., ge=0, le=100, description="整体 AI 相似度分数")
    risk_level: str = Field(..., description="整体风险等级")
    processing_time: float = Field(..., description="处理耗时（秒）")
    paragraphs: list[ParagraphResult] = Field(
        default_factory=list, description="段落级分析"
    )
    suggestions: list[str] = Field(
        default_factory=list, description="改进建议"
    )
    created_at: str = Field(..., description="ISO 8601 时间戳")


class ApiResponse(BaseModel):
    """通用 API 响应包装。"""

    code: int = 200
    message: str = "Success"
    data: DetectionResult | None = None
