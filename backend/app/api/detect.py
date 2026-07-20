"""内容检测接口 — 上传文件 / 粘贴文本进行 AI 相似度分析。"""

import os
import uuid
import tempfile
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.schemas.detect import ApiResponse
from app.services.parser import extract_text, extract_text_from_file
from app.services.detector import analyze_text
from app.config import settings

router = APIRouter()

# 小于此阈值使用内存解析，否则使用临时文件流式处理
_STREAM_THRESHOLD_BYTES = 5 * 1024 * 1024  # 5MB


def _get_extension(filename: str) -> str:
    """从文件名提取扩展名。"""
    if "." not in filename:
        return ""
    _, ext = filename.rsplit(".", 1)
    return f".{ext.lower()}"


@router.post("/upload", response_model=ApiResponse)
async def upload_file(file: UploadFile = File(...)):
    """上传文件（PDF/DOCX/TXT），保存到服务器并返回文件信息。"""
    ext = _get_extension(file.filename or "")
    if ext not in settings.allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"不支持的文件类型 '{ext}'，允许: {', '.join(settings.allowed_extensions)}",
        )

    content = await file.read()
    if len(content) > settings.max_file_size_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"文件大小超过限制 ({settings.max_file_size_mb}MB)",
        )

    # 保存文件
    file_id = str(uuid.uuid4())
    save_dir = Path(settings.upload_dir)
    save_dir.mkdir(parents=True, exist_ok=True)
    save_path = save_dir / f"{file_id}{ext}"
    save_path.write_bytes(content)

    return ApiResponse(
        code=200,
        message="上传成功",
        data={
            "file_id": file_id,
            "file_name": file.filename,
            "file_size": len(content),
            "file_type": ext,
        },
    )


@router.post("/detect/file", response_model=ApiResponse)
async def detect_from_file(file: UploadFile = File(...)):
    """上传文件（PDF/DOCX/TXT）并检测 AI 相似度。"""
    ext = _get_extension(file.filename or "")
    if ext not in settings.allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"不支持的文件类型 '{ext}'，允许: {', '.join(settings.allowed_extensions)}",
        )

    # 先读一小块判断文件大小，避免全部读入内存
    first_chunk = await file.read(1024)
    remaining_size = file.size or 0

    # 如果文件较小，直接用内存解析
    if remaining_size < _STREAM_THRESHOLD_BYTES and remaining_size > 0:
        content = first_chunk + await file.read()
        if len(content) > settings.max_file_size_bytes:
            raise HTTPException(
                status_code=400,
                detail=f"文件大小超过限制 ({settings.max_file_size_mb}MB)",
            )
        try:
            text = extract_text(content, ext)
        except ImportError as e:
            raise HTTPException(status_code=501, detail=f"缺少依赖库: {e}")
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

        if not text or len(text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="文件内容太少，无法分析（最少 50 个字符）",
            )

        result = analyze_text(text)
        result.file_name = file.filename
        return ApiResponse(code=200, message="检测完成", data=result)

    # 大文件：流式写入临时文件，避免占用大量内存
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp_path = tmp.name
            # 写入已读的第一块
            tmp.write(first_chunk)
            # 继续流式读取剩余内容
            total_size = len(first_chunk)
            while chunk := await file.read(1024 * 1024):  # 1MB 每块
                total_size += len(chunk)
                if total_size > settings.max_file_size_bytes:
                    raise HTTPException(
                        status_code=400,
                        detail=f"文件大小超过限制 ({settings.max_file_size_mb}MB)",
                    )
                tmp.write(chunk)

        text = extract_text_from_file(tmp_path, ext)
    except HTTPException:
        raise
    except ImportError as e:
        raise HTTPException(status_code=501, detail=f"缺少依赖库: {e}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)

    if not text or len(text.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="文件内容太少，无法分析（最少 50 个字符）",
        )

    result = analyze_text(text)
    result.file_name = file.filename

    return ApiResponse(code=200, message="检测完成", data=result)


@router.post("/detect/text", response_model=ApiResponse)
async def detect_from_text(text: str = Form(..., min_length=50, max_length=30000)):
    """粘贴文本并检测 AI 相似度。"""
    result = analyze_text(text)
    return ApiResponse(code=200, message="检测完成", data=result)
