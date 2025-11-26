# ImpactBridge Frontend Guide

## Project Layout
- `app/` — Next.js App Router routes
  - `public/login`, `public/register` — auth screens
  - `dashboard/` — shell for protected routes
- `components/` — shared UI primitives (shadcn-based)
- `context/`, `providers/` — React context providers (auth, React Query)
- `lib/` — API client + utilities
- `public/images` — static assets (CSR background)

## Styling & Theme
- TailwindCSS + custom `globals.css` for brand colors (navy #0A2540, purple #5b2bea)
- Glassmorphism cards via `backdrop-blur`, frost overlays
- Responsive tweaks using Tailwind breakpoints and `max-[480px]` utilities

## Auth Flow
1. User visits `/public/login` or `/public/register`
2. Forms use `react-hook-form` + `zod` validation
3. Submit via `apiClient` (fetch wrapper with base URL from `NEXT_PUBLIC_API_BASE_URL`)
4. Successful auth stores JWT in `AuthProvider` state and redirects by role

## API Client
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```
- `lib/api-client.ts` handles token injection
- Use `setApiClientToken` post-login

## Running Locally
```bash
npm install
npm run dev -- --port 3400
```
Prod build
```bash
npm run lint
npx next build
```

## Assets
- Background: `public/images/login_signup_bg.webp`
- Update new images under `public/images` and reference via `/images/...`

## Notes
- Avoid duplicating route groups; single `app` directory only
- Keep config at `next.config.js` with `experimental.appDir`, `output: "standalone"`
- Clear `.next` when adjusting config or assets
