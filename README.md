# AI Content Detector

Detect AI-generated content in academic papers. Upload your paper or paste text to get an instant AI detection report.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 6
- **UI Library**: Ant Design 6
- **Styling**: TailwindCSS 4 + SCSS
- **State Management**: Zustand 5
- **Deployment**: Cloudflare Workers (via `@opennextjs/cloudflare`)

## Project Structure

```
ai-content-detector/
├── .env.local                     # Environment variables
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # TailwindCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── public/                        # Static assets
├── src/
│   ├── app/                       # App Router pages
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page (SSR)
│   │   ├── detection/page.tsx     # Detection page (client)
│   │   ├── result/page.tsx        # Result page (client)
│   │   ├── not-found.tsx          # 404 page
│   │   └── globals.css            # Global styles
│   ├── app/api/detect/            # API routes
│   │   ├── file/route.ts          # POST /api/detect/file
│   │   └── text/route.ts          # POST /api/detect/text
│   ├── components/
│   │   ├── ui/                    # UI components
│   │   └── business/              # Business components
│   ├── lib/                       # Core logic
│   │   ├── detector.ts            # AI detection algorithm
│   │   └── parser.ts              # File parser (PDF/DOCX/TXT)
│   ├── stores/                    # Zustand stores
│   └── types/                     # TypeScript types
├── wrangler.jsonc                 # Cloudflare Workers 配置（自动生成）
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions 自动部署
├── cloudflare/
│   └── wrangler.toml              # Cloudflare 旧 Pages 配置（参考）
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build (Cloudflare)

```bash
npm run pages:build
```

> 注意：部署到 Cloudflare 必须使用 `pages:build`，不能用 `build`。  
> `pages:build` 会先执行 Next.js 构建，再转换为 Cloudflare Workers 兼容格式。

### Deploy to Cloudflare

#### 方式一：手动部署

```bash
npm run pages:build
npm run pages:deploy
```

#### 方式二：GitHub CI/CD 自动部署

项目已配置 GitHub Actions，每次推送代码到 `main` 分支自动构建部署。

**首次配置步骤：**

1. 在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 进入 **Workers & Pages**
2. 进入项目 **ai-content-detector** → **Settings** → **Environment Variables**
3. 添加环境变量：
   - `ARK_API_KEY` — 火山方舟 API Key
   - `ARK_MODEL` — 模型 ID
4. 在 GitHub 仓库 **Settings** → **Secrets and variables** → **Actions** 中添加：
   - `CLOUDFLARE_API_TOKEN` — Cloudflare API Token（需具有 Workers & Pages 部署权限）
   - `ARK_API_KEY` — 火山方舟 API Key
   - `ARK_MODEL` — 模型 ID

之后每次 `git push` 到 `main` 分支，GitHub Actions 会自动构建并部署到 Cloudflare。

## API

### POST /api/detect/text

Analyze text content for AI-generated patterns.

**Request Body:**
```json
{
  "text": "Your academic text here..."
}
```

**Response:**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "ai_score": 45,
    "risk_level": "medium",
    "paragraphs": [...],
    "suggestions": [...]
  }
}
```

### POST /api/detect/file

Upload a file (PDF, DOCX, TXT) for AI detection.

**Form Data:**
- `file`: File attachment (max 10MB)

## Features

- 📄 Support for PDF, DOCX, and TXT files
- 📝 Paste text directly for analysis
- 📊 Per-paragraph AI scoring with highlights
- 💡 Improvement suggestions
- 🔒 Privacy-first: files are processed in-memory, never stored
