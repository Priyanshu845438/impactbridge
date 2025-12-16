# ImpactBridge Frontend & Backend Progress Checklist

_Last updated: 2025-02-14_

This master checklist captures everything that currently exists in the ImpactBridge platform and everything that still needs attention. It is organised so new engineers (or auditors) can immediately understand:
- ✅ what has been delivered
- ⏳ what remains open (by priority)
- 💡 suggestions and follow-ups

Use it alongside `PROJECT_FULL_STATUS.md`, `agents.md`, and the module-specific documentation when planning new work.

---

## 0. Snapshot Table

| Area | Delivered Highlights | In Progress / Outstanding |
| --- | --- | --- |
| Frontend (Next.js) | Dashboard shells, CSR programme workspace, theming + dark mode, Action Center | Real data wiring, automated a11y testing, design system docs expansion |
| Backend (NestJS + Prisma) | Auth, user lifecycle, RBAC, compliance profiles, NGO/company listings | CSR programme APIs, audit surfacing, pagination/search, soft delete |
| Tooling & Docs | Postman automation, business/tech guides, progress logs | Keep docs synced with future releases, testing playbooks |

---

## 1. Frontend Delivery Checklist

### 1.1 Core Platform & Navigation
- [x] App Router baseline with shared layout wrappers (`app/layout.tsx`, `app/dashboard/layout.tsx`) and Suspense fallbacks.
- [x] Role-aware sidebar: grouped navigation, independent scroll regions, mobile drawer, and `<Link prefetch>` + `router.prefetch` for instant transitions.
- [x] Header shell: search + toast fallback, notifications popover/sheet, command palette (⌘/Ctrl + K), top progress bar, profile drawer, theme toggle.
- [x] Authentication flow: login/register/forgot/reset with validation, toasts, and responsive behaviour.
- [x] Keyboard accessibility: focus rings, `aria-*` labels, tabbable data rows, command palette shortcuts.
- [x] Dark/light/system theming via `next-themes`, stored preference, colour tokens in Tailwind, and toast acknowledgement.

### 1.2 Dashboard Experiences
- [x] Super Admin dashboard: analytics hero chart, KPI cards, CSR submissions bar chart, smart suggestions panel, activity feed, empty states.
- [x] NGO/Company/Donor dashboards: production copy, consistent section headers, graph placeholders aligned with theme tokens.
- [x] Notifications center (page + header) with unread badge sync and mark-as-read affordances.
- [x] Profile page: editable form shell, skeleton, toasts, validation feedback.
- [x] User directory: filters, pagination UI, responsive table/cards, keyboard navigation.

### 1.3 NGO Admin Workbench
- [x] NGO management list: search, multi-filter bar, responsive layout, accessible rows, pagination.
- [x] NGO detail drawer: overview, documents, activity timeline, contextual actions.
- [x] Document review workspace: split preview, metadata board, tag filters, access & permission modal, collaboration sidebar (comments, timeline, filters), status controls, timeline panel, smart hints, command palette integration.

### 1.4 Company & CSR Programme Suite
- [x] Company index page: search, status/industry filters, add-company modal scaffold, responsive table/cards, pagination.
- [x] Company profile detail page: overview card (logo placeholder, status badge), CSR snapshot metrics, linked NGOs table, notes & activity timeline, edit CTA.
- [x] CSR programme list: header actions, filters, cards with status badges + progress bars, empty state, modal scaffold.
- [x] CSR programme detail view:
  - [x] Header actions (Edit, Archive, Download summary) + breadcrumb.
  - [x] KPI strip (overall progress %, total milestones, completed vs pending) with animated bar and tone thresholds (<30% danger, 30–70% warning, >70% success).
  - [x] Programme summary card (budget, timeline, compliance note) and progress block with milestones.
  - [x] Tabs: Overview, Timeline, Documents, Assigned NGOs, Comments, Milestones.
  - [x] Assigned NGOs tab: cards with status badges, remove chip, Assign NGO modal workflow (search, select, confirm).
  - [x] Milestones tab: list view with inline edit/delete UI, "Add milestone" modal, timeline toggle (horizontal desktop, vertical mobile) with animations and status-based colour palettes.
  - [x] Documents tab: empty state messaging, document metadata placeholders.
  - [x] Action Center sidebar: collapsible, mobile-friendly, toast-driven actions (Add milestone, Request update, Upload compliance doc) with notification badge.

### 1.5 Platform Utilities & Enhancements
- [x] Command palette overlay with live filtering, keyboard navigation, and responsive modal/sheet.
- [x] Smart Suggestions card with scrollable actions and CTA buttons.
- [x] Activity notifications UI with badge, dropdown, mobile sheet, mark-all-as-read button.
- [x] Global loading micro-interactions: skeletons, top progress bar, smooth transitions.
- [x] Consistent typography + spacing tokens defined in Tailwind and applied across layouts/components.
- [x] Unified empty state component reused for notifications, lists, and document preview gaps.
- [x] Accessibility polish: focus outlines, ARIA tags, keyboard traps avoided in modals.

### 1.6 Documentation (Frontend)
- [x] `docs/FRONTEND_DASHBOARD.md` – architecture + latest UI sections.
- [x] `docs/COMPONENT_CATALOG.md` – includes command palette, timeline, action center, empty states.
- [x] `docs/FRONTEND_TODO.md` – backlog annotated with completion states.
- [x] `docs/PROGRESS_REPORT.md` – chronological summary through entry #86.
- [x] `docs/STYLE_GUIDE.md` – typography, spacing, colour hierarchy.
- [x] `agents.md` (frontend) – log entries kept current up to dark mode implementation (#87 pending).

---

## 2. Frontend Backlog & Suggestions

### 2.1 High Priority (awaiting backend or next sprint)
- [ ] Replace mock dashboards, tables, and programme data with live API integrations (React Query/SWR caching). 
- [ ] Wire command palette results to navigate to actual entities.
- [ ] Connect notifications, smart suggestions, and Action Center buttons to backend endpoints once available.
- [ ] Implement CSR programme milestone CRUD once API exists (optimistic updates + error handling).
- [ ] Add automated accessibility checks (Playwright axe / Jest axe) for critical pages.

### 2.2 Medium Priority
- [ ] Expand design system docs to include Action Center patterns, modal standards, and timeline styling rules.
- [ ] Add component stories/Storybook for visual regression coverage.
- [ ] Build reusable analytics widgets (mini charts, sparklines) for future dashboards.
- [ ] Introduce reviewer/auditor dashboard variants using existing layout shell.

### 2.3 Nice to Have / Future Ideas
- [ ] Feature flag support for gradually rolling out Action Center automation.
- [ ] Offline-ready caching for dashboard insights (PWA direction).
- [ ] Inline commenting for CSR programme timeline items.
- [ ] Notification preference management UI.

---

## 3. Backend Delivery Checklist

### 3.1 Core Architecture
- [x] NestJS modules scaffolded: `auth`, `user`, `prisma`, `address`, `bank`, `documents` plus utilities.
- [x] PrismaService configured and exported via dedicated module; Prisma Client sourced from `prisma/generated`.
- [x] DTO layer with `class-validator` decorators for auth/user/address/bank/document flows.
- [x] Global validation pipe (`ValidationPipe` with whitelist + forbidNonWhitelisted) applied in `main.ts`.
- [x] JWT utilities (`hashPassword`, `comparePassword`, `signToken`, guards, decorators).

### 3.2 Authentication & User Lifecycle
- [x] Register endpoint: validation, duplicate check, password hashing, role-based profile auto-creation (NGO, Company, Donor), sanitized response.
- [x] Login endpoint: credential validation, JWT issuance, sanitized payload.
- [x] Auth module imports `UsersModule` + `PrismaModule`, exports `AuthService`.
- [x] Password change service/controller for authenticated users.
- [x] AuthController providing `/auth/register` and `/auth/login` endpoints.

### 3.3 Profiles & Compliance Automation
- [x] NGOProfile/CompanyProfile/DonorProfile auto-creation on registration.
- [x] Address service/controller for NGOs (create or update official address).
- [x] Bank service/controller for NGOs (create/update bank details with validation and sanitisation).
- [x] Document upload DTO/service scaffold for PAN, 80G, 12A, CSR policy, FCRA certificates.

### 3.4 Listings & Admin Tools
- [x] Admin endpoints:
  - [x] List NGOs (with campaigns).
  - [x] List companies (with donation reports & campaign includes).
  - [x] List donors (with address/PAN info).
  - [x] Fetch NGO profiles with documents/bank/address (admin only).
  - [x] Fetch company profiles with documents/bank/address (admin only).
  - [x] Fetch donor profiles with address (admin only).
- [x] User service: findById, findAll (sanitised), update, delete with RBAC enforcement.

### 3.5 Schema & Data Layer
- [x] Government-compliant Prisma schema models: User, NGOProfile, CompanyProfile, DonorProfile, Campaign, Donation, BankDetail, Document, Address, AuditLog.
- [x] Enums for Role, NGORegistrationType, DocumentType, CampaignCategory.
- [x] Migration executed (`add_government_compliant_models`).
- [x] Relationships enforced for profile auto-creation and admin listings.

### 3.6 Security & RBAC
- [x] JWTAuthGuard + RolesGuard with `@Roles` decorator applied to protected routes.
- [x] CurrentUser decorator for request payload injection.
- [x] RBAC on update/delete endpoints (SUPER_ADMIN).
- [x] Guards integrated with NGO/company listing endpoints to enforce access policies.

### 3.7 Documentation (Backend & Shared)
- [x] `/apps/backend/AGENTS.md` – activity log maintained through entry #31 (UsersService injection fix) and beyond.
- [x] `/apps/docs/` – includes `TECHNICAL_OVERVIEW.md`, `BUSINESS_STATUS.md`, `PROJECT_FULL_STATUS.md`, Postman guides, Postman collection with auto-token script.
- [x] API testing scripts with base URL and auto Bearer injection documented in `POSTMAN_AUTOMATION.md` & `POSTMAN_TESTING.md`.

---

## 4. Backend Backlog & Suggestions

### 4.1 High Priority Features
- [ ] CSR programme endpoints: create, update, assign NGOs, manage milestones, upload documents (align with frontend UI).
- [ ] NGO financial reporting APIs (quarterly/annual filings, audit log integration).
- [ ] Company ↔ NGO approval workflow (requests, approvals, comments, audit trail).
- [ ] Replace hard deletes with soft delete (`deletedAt`) across user/profile entities.
- [ ] Pagination + search utilities for list endpoints (NGOs, companies, donors).

### 4.2 Technical Improvements
- [ ] Shared sanitisation helper to remove password and sensitive fields consistently.
- [ ] Enhanced error handling (Prisma `try/catch`, domain-specific exceptions, logging).
- [ ] Background job infrastructure for heavy workflows (notifications, report generation).
- [ ] Observability stack (structured logging, tracing, monitoring dashboards).
- [ ] Security hardening: rate limiting, JWT refresh strategy, HTTP-only cookie option.

### 4.3 Testing & Tooling
- [ ] Unit tests for services, guards, DTO validation.
- [ ] Integration tests for auth and user flows (Jest + Supertest).
- [ ] E2E/API smoke tests aligned with Postman suites.
- [ ] CI pipeline to run lint/test/build for backend.

### 4.4 Documentation & Process
- [ ] Migration playbook (how to apply/revert Prisma migrations per environment).
- [ ] API versioning policy once endpoints expand.
- [ ] Shared DTO/types package for frontend-backend sync.

---

## 5. Cross-Cutting Items
- [ ] Align frontend Action Center timelines with backend milestones once APIs land (define payload shapes early).
- [ ] Consolidate release notes linking frontend `agents.md` entries and backend `AGENTS.md` activity log (keep numbering in sync).
- [ ] Create onboarding runbook referencing this checklist for new engineers and product stakeholders.
- [ ] Establish performance budgets (bundle size, API latency) and review at sprint close.
- [ ] Plan for future feature flag framework to roll out compliance features safely.

---

## 6. Suggestions & Opportunities
- [ ] Consider shared analytics instrumentation (frontend events ↔ backend audit log) for compliance reporting.
- [ ] Introduce automated accessibility audits as part of CI once frontend wiring is complete.
- [ ] Evaluate using shared monorepo tooling (Nx/Turbo) to coordinate builds/tests between frontend & backend.
- [ ] Add visual design tokens documentation (Figma or Storybook) to mirror Tailwind tokens.

---

## 7. How to Update This Checklist
1. Review recent commits and `agents.md` entries (frontend and backend).
2. Update relevant sections (tick checkboxes, adjust descriptions, add new backlog items).
3. Amend the "Last updated" date.
4. Cross-update `PROJECT_FULL_STATUS.md`, Postman docs, and sprint planning boards if applicable.
5. Leave a brief note in the applicable `agents.md` entry referencing the update.

> **Reminder:** Do **not** modify application source files when editing this document unless your task explicitly requires it.
- Documented NGO profile/finance listings and address/bank management endpoints in backend checklist.
