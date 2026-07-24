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
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions 自动部署
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

### Build

```bash
npm run pages:build
```

> 部署到 Cloudflare 必须使用 `pages:build`，不能用 `build`。  
> `pages:build` 会先执行 Next.js 构建，再转换为 Cloudflare Workers 兼容格式。

### Deploy to Cloudflare

#### 方式一：手动部署

```bash
npm run pages:build
npm run pages:deploy
```

#### 方式二：GitHub Actions 自动部署（推荐）

项目已配置 GitHub Actions（`.github/workflows/deploy.yml`），每次推送代码到 `main` 分支自动构建部署。

**首次配置步骤：**

1. **创建 Cloudflare API Token**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 右上角 **My Profile** → **API Tokens** → **Create Token**
   - 选择 **Edit Cloudflare Workers** 模板
   - 确保权限包含 `Workers Scripts: Edit` 和 `Workers Routes: Edit`
   - 创建后复制 Token

2. **在 GitHub 仓库添加 Secrets**
   - 进入 GitHub 仓库 **Settings** → **Secrets and variables** → **Actions**
   - 添加以下 **Repository secrets**：

   | Secret 名称 | 说明 |
   |---|---|
   | `CLOUDFLARE_API_TOKEN` | 上一步创建的 Cloudflare API Token |
   | `ARK_API_KEY` | 火山方舟 API Key |
   | `ARK_MODEL` | 模型 ID（如 `ep-20260723231141-bhx8p`） |

3. **推送代码触发部署**
   ```bash
   git push origin main
   ```
   在 GitHub 仓库 **Actions** 标签页可以查看部署进度。

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

<!-- trigger auto deployment -->