# ImpactBridge Frontend

ImpactBridge is a CSR collaboration platform connecting NGOs, companies, donors, and administrators. This workspace contains the Next.js 14 App Router frontend that powers the role-based workspace experience.

## ✨ Features
- **App Router + TypeScript**: Type-safe client architecture powered by Next.js 14 and React Query for server-state management.
- **Modern UI & Design System**: Accessible UI primitives styled with Tailwind CSS v3, Lucide icons, and responsive layouts.
- **Admin Settings & Keys Console (`/dashboard/admin/settings`)**: Super Admin interface for configuring Cloud Storage, Email gateways, Payment providers, CSR rules, and live Feature Flags with network credential masking.
- **Interactive Approvals Hub (`/dashboard/admin/modules/approvals`)**: Dynamic review workflow allowing Super Admins and Approvers to approve, reject (with required audit remarks), or revoke CSR initiatives.
- **NGO Statutory Compliance Vault (`/dashboard/ngo/documents`)**: Upload and tracking interface for statutory certificates (12A, 80G, FCRA, CSR-1, and Audited Financial Statements).
- **Persistent Auth & Session Guards**: Context-driven `AuthProvider` synchronizing JWT tokens, roles, and route authorization.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server on http://localhost:3400
npm run dev

# Run quality checks
npm test             # Executes 27 test suites (99 tests passing)
npm run lint         # Runs ESLint checks
npm run build        # Verifies production build (81 static & dynamic routes)
```

The application runs on `http://localhost:3400`. Unauthenticated visitors are guided to `/login`.

## 🗂️ Key Routes & Architecture

```
apps/frontend/
  app/                 # App Router pages and layouts
    dashboard/
      admin/           # Super Admin dashboards, modules, approvals, and system settings
      company/         # Corporate CSR planning, programme creation, and vendor management
      ngo/             # NGO profile, campaigns, statutory documents, and finance reports
      donor/           # Donor history, saved campaigns, and receipts
    login/             # Authenticated user entry
    register/          # Onboarding with role selection
  components/          # Reusable UI primitives, cards, dialogs, and navigation
  lib/                 # API client, React Query hooks, and feature flag utilities
  docs/                # Engineering documentation
```

### Key Dashboard Endpoints:
- `/dashboard/admin` – Analytics overview, donation totals, and live platform KPIs.
- `/dashboard/admin/settings` – Central configuration hub for external API keys and regulatory rules.
- `/dashboard/admin/modules/approvals` – Approval decision console with live mutation wiring.
- `/dashboard/ngo/documents` – Statutory document submission with file validation.

## 📚 Documentation Index

Refer to the documents in `docs/` for specific architecture and frontend guidelines:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Frontend architecture, routing layers, and state boundaries.
- [FEATURE_FLAGS.md](docs/FEATURE_FLAGS.md) — Active feature flags and fallback behaviors.
- [ANALYTICS_DASHBOARD.md](docs/ANALYTICS_DASHBOARD.md) — Admin dashboard data flow, query adapters, and fallback strategies.
- [CSR_PROGRAMME_DATA_FLOW.md](docs/CSR_PROGRAMME_DATA_FLOW.md) — Data flow between CSR hooks, cache invalidation, and UI states.
- [STYLE_GUIDE.md](docs/STYLE_GUIDE.md) — Design tokens, color palette, and component conventions.
- [TESTING.md](docs/TESTING.md) — Unit testing best practices, Jest/RTL mocks, and accessibility standards.
- [OPERATIONS.md](docs/OPERATIONS.md) — Operational notes and dashboard maintenance.
- [CHANGELOG.md](docs/CHANGELOG.md) — Changelog of frontend changes.

