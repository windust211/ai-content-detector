"""FastAPI 应用入口。"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.utils import setup_logger
from app.api.detect import router as detect_router

logger = setup_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting server...")
    logger.info("Debug: %s | Port: %d", settings.debug, settings.app_port)
    yield
    logger.info("Shutting down...")


app = FastAPI(
    title="AI Content Detector API",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(detect_router, prefix=settings.api_prefix)


@app.get("/")
async def root():
    return {
        "name": "AI Content Detector API",
        "version": "0.1.0",
        "docs": "/docs",
    }


def main():
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.app_port,
        reload=settings.debug,
    )


if __name__ == "__main__":
    main()
