# AI Content Detector

Detect AI-generated content in academic papers. Upload your paper or paste text to get an instant AI detection report.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 6
- **UI Library**: Ant Design 6
- **Styling**: TailwindCSS 4 + SCSS
- **State Management**: Zustand 5
- **Deployment**: Cloudflare Pages (via `@cloudflare/next-on-pages`)

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
├── cloudflare/
│   └── wrangler.toml              # Cloudflare deployment config
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
npm run build
```

### Deploy to Cloudflare

```bash
npm run pages:build
npm run pages:deploy
```

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
