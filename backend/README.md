# AI Content Detector Backend

FastAPI 后端服务，提供 AI 内容检测接口。

## 快速开始

```bash
# 安装依赖
uv sync

# 启动服务
uv run dev
```

访问 http://localhost:8000/docs 查看 Swagger 文档。

## 项目结构

```
backend/
├── app/
│   ├── api/              # API 路由
│   │   ├── detect.py     # 检测接口（上传文件 / 粘贴文本）
│   │   └── health.py     # 健康检查
│   ├── schemas/          # 请求/响应模型
│   │   └── detect.py
│   ├── services/         # 业务逻辑
│   │   ├── detector.py   # AI 相似度检测
│   │   └── parser.py     # 文档解析（PDF/DOCX/TXT）
│   ├── config.py         # 配置管理
│   ├── main.py           # FastAPI 入口
│   └── utils.py          # 工具函数
├── .env                  # 环境变量
├── pyproject.toml        # 项目配置
└── README.md
```

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/upload` | 上传文件（PDF/DOCX/TXT），保存并返回文件信息 |
| `POST` | `/api/v1/detect/file` | 上传文件并立即检测 AI 相似度 |
| `POST` | `/api/v1/detect/text` | 粘贴文本检测 AI 相似度（50-30000 字符） |
