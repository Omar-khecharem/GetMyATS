# GetMyATS

ATS CV Analysis Platform — analysez, optimisez et préparez vos candidatures avec l'aide de l'IA.

## Features

- **ATS Score Analysis** — Analyse votre CV et calcule un score de compatibilité ATS avec des mots-clés trouvés/manquants et des conseils personnalisés.
- **AI-Powered Analysis** — Analyse boostée par Cloudflare Workers AI (Llama 3.1) pour des recommandations plus pertinentes.
- **Job Match** — Comparez votre CV à une description de poste et obtenez un score de matching, les compétences matching/missing, et des recommandations.
- **Bullet Enhancer** — Transformez des points faibles en accomplishments percutants avec l'IA.
- **Interview Chatbot** — Entraînez-vous avec un interviewer IA qui pose des questions basées sur votre CV et le poste visé. Support vocal (Speech-to-Text + Text-to-Speech).
- **Save Report as PDF** — Exportez votre rapport d'analyse au format PDF.
- **Cookie Consent** — Bannière de consentement GDPR.
- **Pricing & Payment** — Pages de tarifs avec plans (Free / Pro / Enterprise) et page de paiement simulée.

## Stack

| Layer | Technologie |
|---|---|
| Frontend | React 19, React Router 7, Tailwind CSS v4, Vite |
| Backend | Node.js, Express |
| AI | Cloudflare Workers AI (Llama 3.1 8B Fast) via Worker dédié |
| PDF | html2canvas + jsPDF |
| 3D | Three.js (page d'accueil) |
| Animations | GSAP, CSS animations |

## Getting Started

### Prérequis

- Node.js >= 18
- Compte Cloudflare avec Workers AI activé
- Wrangler CLI (pour déployer le worker AI)

### 1. Cloner et installer

```bash
git clone https://github.com/Omar-khecharem/GetMyATS.git
cd GetMyATS

# Backend
cd backend
cp .env.example .env
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurer Cloudflare

1. Créez un compte sur [Cloudflare](https://dash.cloudflare.com/)
2. Activez Workers AI
3. Créez un token API avec les permissions `workers_scripts:write` et `ai:write`
4. Remplissez les variables dans `backend/.env` :

```env
CLOUDFLARE_ACCOUNT_ID=votre_account_id
CLOUDFLARE_API_TOKEN=votre_api_token
```

### 3. Déployer le Worker AI

```bash
cd workers/ai-worker
npx wrangler deploy
```

Mettez à jour l'URL du worker dans `backend/config/cloudflare.js` si nécessaire.

### 4. Lancer l'application

```bash
# Terminal 1 : Backend
cd backend
npm run dev

# Terminal 2 : Frontend
cd frontend
npm run dev
```

Accédez à [http://localhost:5173](http://localhost:5173)

### Promo Code

Le code promo `isimgien` (configurable dans `.env`) augmente la limite d'analyses gratuites à 10.

| Variable | Default | Description |
|---|---|---|
| `PROMO_CODE` | `isimgien` | Code promo valide |
| `PROMO_BONUS` | `10` | Nombre d'analyses supplémentaires |

## Project Structure

```
GetMyATS/
├── backend/
│   ├── config/              # Cloudflare worker config
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Multer upload config
│   ├── routes/              # Express routes
│   ├── scripts/             # Dev script (auto-kill port)
│   ├── services/            # Business logic (AI + fallback)
│   ├── utils/prompts/       # AI prompt builders
│   ├── uploads/             # Temporary PDF uploads (gitignored)
│   ├── .env                 # Local env (gitignored)
│   └── server.js            # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Route pages
│   │   ├── sections/        # Landing page sections
│   │   ├── services/        # API client (Axios)
│   │   └── utils/           # Usage tracking, helpers
│   └── vite.config.js       # Vite config with proxy
├── workers/
│   └── ai-worker/           # Cloudflare Workers AI
│       ├── src/index.js     # Worker code
│       └── wrangler.toml    # Wrangler config
└── README.md
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/ats/analyze` | Analyse sans IA (fallback keywords) |
| POST | `/api/ats/analyze-ai` | Analyse avec Cloudflare AI |
| POST | `/api/ats/upload-cv` | Upload PDF + extraction texte |
| POST | `/api/ats/match-job` | Match CV vs job description |
| POST | `/api/ats/enhance-bullet` | Amélioration de bullet points |
| POST | `/api/ats/interview-questions` | Génération de questions d'entretien |
| POST | `/api/ats/interview-chat` | Chatbot entretien (avec historique) |
| POST | `/api/ats/validate-promo` | Validation d'un code promo |

## Frontend Routes

| Route | Page |
|---|---|
| `/` | Landing page |
| `/dashboard` | Upload CV + analyse |
| `/result` | Rapport d'analyse |
| `/job-match` | Comparaison CV / offre |
| `/job-match-result` | Résultat du matching |
| `/bullet-enhancer` | Amélioration de bullet points |
| `/interview` | Chatbot entretien |
| `/payment` | Page de paiement simulée |
| `/cookies` | Politique des cookies |
| `/privacy` | Politique de confidentialité |

## AI Fallback

Chaque fonctionnalité AI dispose d'un fallback déterministe (mots-clés, patterns regex, templates). Si Cloudflare Workers AI échoue, le service retourne automatiquement une analyse basée sur des règles sans planter.

## License

MIT
