# ImpactBridge Frontend & Backend Progress Checklist

_Last updated: 2025-11-28_

This checklist consolidates everything that has been delivered so far across the **frontend (Next.js)** and **backend (NestJS + Prisma)** along with outstanding gaps, open suggestions, and upcoming milestones. Use it as the single reference when planning sprints or handing over workstreams.

---

## 1. Frontend Delivery Snapshot

### 1.1 Core Platform & Navigation
- [x] App Router baseline with shared layout wrappers (`app/layout.tsx`, `app/dashboard/layout.tsx`).
- [x] Role-aware sidebar with grouped navigation, mobile drawer, and route prefetch (`next/link` + `router.prefetch`).
- [x] Header shell featuring search, activity notifications popover/sheet, command palette (⌘/Ctrl + K), top progress bar, and profile drawer.
- [x] Authentication flow (login, register, forgot/reset password) with form validation, toasts, and responsive treatments.
- [x] Global Suspense + skeleton loading system to smooth route transitions.
- [x] Accessibility polish (focus rings, aria-labels, keyboard activation for table rows/cards).

### 1.2 Dashboard Experiences (per role)
- [x] **Super Admin** dashboard with analytics hero chart, KPI cards, CSR submissions chart, quick actions, Smart Suggestions side panel, and recent activity feed.
- [x] **NGO/Company/Donor** dashboard stubs updated with production copy and consistent section headers.
- [x] Notifications center (page + header) with mark-as-read controls and unread badge sync.
- [x] Profile page with editable form, skeleton loader, and toasts.
- [x] User directory (list + detail tabs) including filters, pagination UI, and responsive table/card layout.

### 1.3 Admin Modules – NGOs
- [x] NGO management list with search + multi filter bar (registration/compliance/region), responsive tables/cards, pagination, keyboard support.
- [x] NGO detail drawer with overview/documents/activity tabs and action toasts.
- [x] NGO document review room: split preview, metadata/tags board, lifecycle status dropdown, timeline activity feed, Access & Permissions modal, collaboration sidebar (comments, filters, status-aware disables), Timeline & Status panel, status badge & dropdown, header status controls.

### 1.4 Admin Modules – Companies & CSR Programmes
- [x] Companies index page with search, filter dropdowns (status, industry), add-company modal, responsive table/cards, pagination.
- [x] Company profile detail page with overview card, CSR snapshot metrics, linked NGOs section, timeline.
- [x] CSR programmes list for a company with filters, cards (status badge, budget, progress, actions), modal scaffold, empty state.
- [x] CSR programme detail view with:
  - [x] Section header actions (edit, archive, download).
  - [x] Insight cards (overall progress, total milestones, completed/pending counts).
  - [x] Animated milestone completion bar with colour thresholds.
  - [x] Programme summary card (budget, timeline, compliance note).
  - [x] Progress & milestones list, documents tab, comments tab.
  - [x] Assigned NGOs tab with card layout, Assign NGO modal workflow (search, select, confirm).
  - [x] Milestones tab with list + timeline toggle, add/edit/delete modal, responsive timeline visualization.
  - [x] Milestone timeline view (horizontal desktop, vertical mobile) with animations.
  - [x] **New** Action Center sidebar with quick action buttons (add milestone, request update, upload compliance doc) & mobile collapse logic.
  - [x] Programme progress insights (KPI strip + animated bar) and dynamic tones.

### 1.5 Command Palette & Search Enhancements
- [x] Command palette overlay with filtering, keyboard navigation, and responsive modal/sheet behavior.
- [x] Route prefetch + useTransition to speed navigation.
- [x] Toast fallback when search submitted without backend integration.

### 1.6 Theming, Typography, and Micro-interactions
- [x] Tailwind tokens for heading/body scales, spacing, and brand palette.
- [x] Components updated to use shared tokens (stat cards, quick actions, section headers, forms).
- [x] Unified empty state component applied to notifications and other pages.
- [x] Hover/press animations on cards, dropdowns, and buttons.
- [x] Responsive adjustments (scrollable sidebar/content separation, timeline panel breakpoints, suggestion panel placement).

### 1.7 Frontend Documentation Coverage
- [x] `docs/FRONTEND_DASHBOARD.md` – architecture overview kept current.
- [x] `docs/COMPONENT_CATALOG.md` – component reference updated with latest helpers (ActionItem, Milestone timeline, etc.).
- [x] `docs/FRONTEND_TODO.md` – roadmap with completion markers.
- [x] `docs/PROGRESS_REPORT.md` – narrative status log.
- [x] `agents.md` – change log entries (#1–#86) for traceability.

---

## 2. Frontend Backlog & Missing Pieces

### 2.1 Awaiting Backend Wiring (High Priority once APIs arrive)
- [ ] Replace mock analytics, cards, and tables with real data (React Query + API hooks).
- [ ] Connect command palette search results to live navigation/actions.
- [ ] Wire notifications, Smart Suggestions, and Action Center actions to real backend events.
- [ ] Persist milestone/NGO assignments via API once endpoints exist.
- [ ] Implement real auth guard middleware for `/dashboard/*` routes using Next middleware.

### 2.2 UX Enhancements / Medium Priority
- [ ] Dark mode toggle leveraging shared tokens.
- [ ] Global localization/i18n scaffold.
- [ ] Additional charts for impact/donation metrics (co-ordinate with backend schema).
- [ ] Component-level tests (React Testing Library) for command palette, Action Center, milestone timeline interactions.
- [ ] Visual regression strategy (Storybook/Percy) post data wiring.

### 2.3 Tech Debt / Low Priority Clean-up
- [ ] Investigate Node warning about `MODULE_TYPELESS_PACKAGE_JSON` (consider adding `"type": "module"` or convert config). 
- [ ] Remove legacy commented code & unused assets once backend integration begins.
- [ ] Expand icon sizing utilities to enforce 16/20/24 standard everywhere.

### 2.4 Suggested Improvements
- [ ] Provide offline/optimistic UI states for Mutation-heavy flows (e.g., assign NGO, milestones) to keep UX snappy with backend latency.
- [ ] Introduce breadcrumb trail for deep routes (`/dashboard/admin/company/...`) to aid navigation.
- [ ] Build programmatic QA checklist in docs with viewport screenshots when the UI stabilises.

---

## 3. Backend Delivery Snapshot

_Reference: `/apps/docs/PROJECT_FULL_STATUS.md`, `README.md`, and team change logs._

### 3.1 Authentication & Security
- [x] User registration & login with bcrypt hashing & JWT issuance.
- [x] Register DTOs (`RegisterDto`, `LoginDto`) with validation.
- [x] AuthService.register/login with duplicate email guard, password hashing, token generation.
- [x] AuthController endpoints `/auth/register`, `/auth/login`.
- [x] JWT utility (`signToken`) with env-driven secret.
- [x] Password utility (`hashPassword`, `comparePassword`).
- [x] Global ValidationPipe in `main.ts` (whitelist + forbid non-whitelisted).
- [x] PrismaService module exported for dependency injection.
- [x] JWT guard & current user decorator.
- [x] Roles decorator + RolesGuard for RBAC.
- [x] Fix for AuthModule importing UsersModule & exporting UsersService.

### 3.2 User & Profile Modules
- [x] User module (controller/service/module) with find/list/update/delete endpoints.
- [x] User role enum + DTOs (`CreateUserDto`, `UpdateUserDto`).
- [x] `/users/me`, `/users/:id`, `/users` (admin list) endpoints.
- [x] Role-protected update/delete endpoints for SUPER_ADMIN.
- [x] Auto creation of NGO, Company, Donor profiles upon registration (role check in AuthService).
- [x] Donor/Company/NGO profile service helpers (`createNGOProfile`, etc.).

### 3.3 NGO Compliance
- [x] Address module (service/controller/DTO) for NGO address create/update under JWT + roles guard.
- [x] Bank module for NGO bank details with create/update semantics and sanitization.
- [x] Documents module for NGO document uploads (PAN, 80G, 12A, CSR Policy, FCRA).
- [x] Admin endpoints for listing NGO profiles with documents/bank/address (sanitize password).
- [x] Admin listing for company profiles (documents/bank/address) & donor profiles.

### 3.4 CSR / Company Features
- [x] Company listing with donation reports for admins (NGO campaign relation + donations include).
- [x] CSR programmes dataset (mock; actual endpoints to align with schema later).
- [x] Company/NGO/donor profile auto-creation ensures compliance data ready.

### 3.5 Donations & Campaigns (Schema level)
- [x] Prisma schema expanded to government-compliant models (User, NGOProfile, CompanyProfile, DonorProfile, Campaign, Donation, BankDetail, Document, Address, AuditLog, plus enums).
- [x] Migration executed: `add_government_compliant_models`.
- [x] Campaign/Donation/Document relations wired via Prisma (pending service & controller wiring for new operations beyond existing ones).

### 3.6 RBAC & Guards
- [x] JWTAuthGuard + RolesGuard integrated into controllers (users, address, bank, admin listings).
- [x] Roles decorator utilities stored in auth module.

### 3.7 Admin Utilities
- [x] Admin endpoints for retrieving NGOs with campaigns, companies with donation reports, donors list.
- [x] Audit log model created; logging strategy documented (implementation partially pending where not yet triggered).

### 3.8 Documentation & Tooling
- [x] `/apps/docs/PROJECT_FULL_STATUS.md` – non-technical guide explaining modules.
- [x] API testing guides, Postman automation scripts, Postman collection with auto-token injection.
- [x] Business context docs (BUSINESS_STATUS.md, FRONTEND_BUSINESS_GUIDE.md).
- [x] Scripts for running Postman automation.

---

## 4. Backend Backlog & Missing Pieces

### 4.1 Features in Progress / Planned
- [ ] Company ↔ NGO project approval workflow (schema prepared, services pending).
- [ ] NGO financial reporting endpoints (quarterly/annual uploads & audit trail).
- [ ] Automated pagination/search across list endpoints.
- [ ] Soft delete (replace hard deletes with `deletedAt`).
- [ ] Email/SMS notifications (invitations, password updates, receipts).
- [ ] Reviewer/Auditor read-only dashboards.
- [ ] Automated tests (unit/integration/E2E) + CI pipeline.
- [ ] ActivityLog service exposure (endpoints to fetch audit logs).
- [ ] CSR programme endpoints (APIs to pair with frontend programme detail & milestones UI).
- [ ] Milestone/impact/utilization API wiring (many endpoints described in docs are specified but may need final implementation verification).

### 4.2 Technical Improvements
- [ ] Refine Prisma service error handling & transaction usage (especially for multi-step onboarding flows).
- [ ] Evaluate background jobs for heavy tasks (report generation, notifications).
- [ ] Security hardening: consider HTTP-only cookies for JWT, rate limiting, audit log export controls.
- [ ] Observability: structured logging + request tracing (pino, OpenTelemetry).

### 4.3 Documentation Enhancements
- [ ] Keep `PROJECT_FULL_STATUS.md` timestamps in sync with latest agents entry.
- [ ] Add API migration playbook (for future schema changes & rollbacks).
- [ ] Document test coverage expectations once automated tests land.

### 4.4 Suggestions / Future Considerations
- [ ] Create service-level metrics dashboard (success/failure counts) to mirror UI analytics.
- [ ] Introduce feature flags to toggle new workflows (approvals, financial reporting) during rollout.
- [ ] Align DTOs with potential GraphQL schema if future real-time dashboards require subscriptions.

---

## 5. Shared Cross-Cutting Items
- [ ] Align frontend Action Center, timeline, and programme UI with backend milestone/utilization endpoints (once completed) to ensure end-to-end flow.
- [ ] Consolidate auth/session handling across apps (consider shared package for DTOs & enums).
- [ ] Maintain consistent release notes linking frontend `agents.md` and backend status updates.
- [ ] Prepare onboarding playbook referencing this checklist for new engineers.

---

## 6. Next Steps (Suggested Sequencing)
1. **Backend**: Finalise company↔NGO approval + milestone/impact/utilization endpoints, including tests.
2. **Frontend**: Wire programme detail UI to real APIs (Action Center -> service calls) and implement optimistic updates.
3. **QA**: Draft component/integration tests and align Postman suites with new endpoints.
4. **Operations**: Address Node module-type warning (frontend) and improve logging/observability (backend).
5. **Documentation**: Keep this checklist updated alongside `PROJECT_FULL_STATUS.md` and `agents.md` when new work lands.

---

> **Reminder:** Do **not** modify backend/frontend source files when updating this document. Track future progress by checking the corresponding docs (`/apps/frontend/docs`, `/apps/docs`) and the agents logs before editing.
