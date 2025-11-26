# ImpactBridge Frontend

Next.js 14 App Router frontend for the ImpactBridge CSR platform.

## Quick Start
```bash
npm install
npm run dev -- --port 3400
```
Production build:
```bash
npm run lint
npx next build
```

## Folder Structure
```
apps/frontend
├─ app/
│  ├─ public/login
│  └─ public/register
├─ components/
├─ context/
├─ lib/
├─ providers/
├─ public/images
└─ docs/
```

## Auth Screens
- Fully responsive glass panels on top of CSR hero image
- Login/registration use `react-hook-form`, `zod`, and `apiClient`
- Role-based redirect logic handled in `AuthProvider`

## Assets & Theme
- Primary background: `/public/images/login_signup_bg.webp`
- Branding reflects ImpactBridge navy & gradient palette

## Configuration
- `next.config.js` uses `experimental.appDir` and `output: "standalone"`
- Set `NEXT_PUBLIC_API_BASE_URL` to backend URL

## Documentation
- Detailed setup: `docs/FRONTEND_SETUP.md`

## Testing
- Run `npm run lint` before commits
- Build with `npx next build` to ensure static assets resolve
