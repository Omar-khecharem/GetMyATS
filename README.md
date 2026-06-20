# GetMyATS

**AI-Powered ATS CV Analysis Dashboard** — Upload your CV (PDF), get an instant ATS compatibility score, keyword analysis, and actionable improvement tips.

## Features

- **PDF Upload** — Drag & drop or click to upload your CV
- **ATS Score** — Instant compatibility score from 0 to 100
- **Keyword Detection** — See which common ATS keywords your CV matches and which are missing
- **Improvement Tips** — Actionable suggestions to optimize your CV
- **Dashboard Report** — Clean, structured analysis results with match rate visualization
- **Free Tier** — 3 free analyses, then a static payment demo page

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | React 19, React Router 7, Tailwind CSS v4  |
| Backend  | Node.js, Express                           |
| PDF      | pdf-parse                                  |
| 3D       | Three.js (decorative scene)                |
| AI       | Cloudflare Workers AI (LLaMA 3)            |

## Project Structure

```
getmyats/
├── backend/
│   ├── controllers/       # Route handlers
│   ├── middleware/         # Error handler, Multer upload
│   ├── routes/            # Express routes
│   ├── services/          # ATS analysis & PDF parsing
│   ├── utils/prompts/     # AI prompt builder
│   ├── config/            # Cloudflare AI client
│   ├── app.js             # Express app setup
│   └── server.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, Footer, ScoreCircle, etc.
│   │   ├── pages/         # Landing, Dashboard, Result, Payment
│   │   ├── sections/      # Hero, Features, Pricing, etc.
│   │   ├── services/      # Axios API client
│   │   ├── utils/         # Usage tracker (localStorage)
│   │   ├── App.jsx        # Router setup
│   │   └── index.css      # Tailwind theme + geometric styles
│   ├── public/            # Static assets
│   └── index.html
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Backend Setup

```bash
cd backend
npm install

# Create .env file with your Cloudflare AI credentials:
#   ACCOUNT_ID=your_account_id
#   API_TOKEN=your_api_token
#   PORT=3000

npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server proxies `/api` requests to `localhost:3000`.

### Build for Production

```bash
cd frontend
npm run build
```

Output is written to `frontend/dist/`.

## Branches

- `main` — Stable production-ready code
- `develop` — Active development
- `feature/ai-analysis` — AI-powered analysis integration
- `feature/payment` — Payment & usage limiting
- `feature/design-v2` — Black & white geometric redesign

## Usage

1. Navigate to `/dashboard`
2. Upload your CV as a PDF file
3. Wait for the analysis (PDF extraction + keyword matching)
4. View your ATS Score, found/missing keywords, and improvement tips
5. Click **Save report** to download a `.txt` summary

After 3 free analyses, you'll be prompted to the payment page (static demo — no real charge).

## API Endpoints

| Method | Path              | Description                          |
| ------ | ----------------- | ------------------------------------ |
| POST   | `/api/ats/analyze`      | Analyze CV text against common ATS keywords |
| POST   | `/api/ats/analyze-ai`   | AI-powered analysis via Cloudflare    |
| POST   | `/api/ats/upload-cv`    | Upload PDF and extract text           |

## License

MIT
