"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """应用配置，从 .env 文件加载。"""

    # Server
    debug: bool = False
    app_port: int = 8000

    # API
    api_prefix: str = "/api/v1"

    # File upload
    upload_dir: str = "uploads"
    max_file_size_mb: int = 10
    max_file_size_bytes: int = max_file_size_mb * 1024 * 1024
    allowed_extensions: list[str] = [".pdf", ".docx", ".txt"]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
