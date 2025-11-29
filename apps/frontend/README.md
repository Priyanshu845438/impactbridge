# ImpactBridge Frontend

ImpactBridge is a CSR collaboration platform connecting NGOs, companies, donors, and administrators. This repository contains the Next.js 14 App Router frontend that powers the role-based workspace experience.

## ✨ Features
- **App Router + TypeScript** foundation with TailwindCSS + shadcn/ui design system.
- **Persistent authentication** via custom `AuthProvider` (JWT + localStorage) with role-aware routing.
- **Polished dashboards** featuring analytics widgets, NGO management tooling, skeleton loaders, and profile/notification UX.
- **Documentation suite** under `docs/` covering setup, routing, components, style guide, and progress reports.

## 🚀 Getting Started
```bash
# install dependencies
npm install

# run dev server on http://localhost:3400
default: npm run dev -- --port 3400

# lint & build checks
npm run lint
npm run build
```
The dashboard shell lives at `http://localhost:3400/dashboard/admin`. Brand logo and `/dashboard` automatically redirect here.

## 🗂️ Project Structure
```
apps/frontend/
  app/                 # App Router entries (auth pages, dashboard, notifications, profile)
  components/          # Reusable UI + dashboard components (quick cards, section headers, skeletons, etc.)
  providers/           # Auth + React Query providers
  lib/                 # Utility helpers (API client, nav menu config, chart helpers)
  public/              # Static assets (fonts, images, favicon)
  docs/                # Living documentation / knowledge base
  agents.md            # Running change log per instructions
```
Key dashboard routes:
- `/dashboard/admin` – analytics overview with stat cards, charts, quick actions
- `/dashboard/admin/modules/ngos` – NGO management UI (filters, table, drawer)
- `/dashboard/profile` – editable super admin profile with skeleton loading + toast feedback
- `/dashboard/notifications` – mock notifications hub with mark-read actions and header badge sync

## 🔐 Authentication Flow
- Login/register forms use React Hook Form + Zod validation and call backend via `lib/api-client`.
- `AuthProvider` stores `{ token, user }` in memory + localStorage, restores on refresh, and redirects unauthenticated users to `/login`.
- Role redirects: `SUPER_ADMIN → /dashboard/admin`, `NGO → /dashboard/ngo`, `COMPANY → /dashboard/company`, `DONOR → /dashboard/donor`.
- Notification badge state also persists through `AuthProvider` (`impactbridge:notifications:unread`).

## 🛠️ Tooling & Docs
- Tailwind theme + global styles defined in `tailwind.config.js` and `app/globals.css`.
- Sonner Toaster mounted at root for cross-app notifications.
- Extensive documentation:
  - `docs/FRONTEND_SETUP.md`
  - `docs/FRONTEND_DASHBOARD.md`
  - `docs/AUTH_FLOW.md`
  - `docs/COMPONENT_CATALOG.md`
  - `docs/PROGRESS_REPORT.md`
  - ...and more under `docs/`

## ✅ Quality Checklist
- `npm run lint` for ESLint checks
- `npm run build` to ensure Next.js produces a clean production build
- Update `agents.md` with brief change summaries when contributing

## 🔮 Next Steps
- Wire dashboards, profile editor, and notifications to real backend APIs
- Add middleware for server-side route guarding
- Introduce E2E/Playwright tests for critical flows
- Expand NGO/Programme modules with live data and bulk actions

For detailed progress updates, refer to `docs/PROGRESS_REPORT.md` and the activity log in `agents.md`.
