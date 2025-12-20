# ImpactBridge Pending Work & Recommendations (Audit: 2025-02-14)

## Backend

### High-Priority Gaps
- Auth + Users controllers not yet wired to services despite readiness plan; no public API surface.
- CSR Programme service implemented, but controllers/routes/tests missing; frontend blocked from live data.
- Approval workflow controller lacks revoke endpoint, error handling uses generic Error instead of Nest exceptions; needs audit logging & comments.
- Pagination helper integrated but list endpoints still default to full fetch; soft delete not enforced (hard deletes remain).
- Notification service no-op: no queue/store, no persistence of intents; integrate with future job framework.
- Financial reporting service lacks controller exposure, audit trail, and DTO validation for upload metadata.
- Address/Bank controllers rely on `usersService.getNGOProfileByUserId` returning `null`; no explicit NotFound exception.
- No API validation for `companyId` in approval flow (ensuring company belongs to campaign or allowed partner).
- Guards/Decorators exist, but no integration tests verifying RBAC across modules.
- Prisma seed/migration pipeline for new schema not documented beyond playbook; no staging migration plan.

### Medium-Priority Work
- Implement soft-delete (`deletedAt`) across user/profile entities with query helper defaults and tests.
- Extend pagination helper to support cursor-based strategy for large data sets.
- Build auditing hooks for key service transitions (approvals, programme updates, assignments).
- Add event logging/notifications integration points (e.g., call NotificationsService enqueue when approvals change).
- Ensure services sanitize sensitive nested data consistently (e.g., `getNGOsWithCampaigns` includes nested campaigns without sanitisation).
- Expand unit tests: ApprovalsService edge cases, FinancialService failure modes, NotificationsService fallback scenarios.
- Provide Postman collection coverage for new services (approvals, CSR programmes, addresses/banks) once API exposed.
- Document RBAC matrix per endpoint (currently only controller-level notes).

### Low-Priority Enhancements
- Introduce config-driven rate limiting and request logging middleware ahead of production traffic.
- Migrate shared enums/DTOs to dedicated package for frontend/back-end alignment.
- Add data consistency checks (e.g., triggers to ensure NGO profile exists before approval request).
- Provide CLI or scripts for generating mock data for demos/testing.
- Review assumed enums (`NGORegistrationType.OTHER` default) and add constant definitions for compliance categories.

## Frontend

### High-Priority Gaps
- Entire dashboard still mock-only: no API wiring for NGO/company dashboards, programmes, vendors, audits, compliance, budget planner, impact stories, etc.
- API client scaffold exists but not used; `AuthProvider` still depends on legacy `ky` client; duplication needs consolidation.
- No route guards/middleware enforcing auth at server level (client-only guard).
- Missing React Query integration for data fetching; need service hooks for future API calls.
- Form submission actions (login/register) using mock endpoints; integration with backend auth pending.
- Storybook/percy not fully enabled: Percy disabled due to missing system deps; re-enable after dependencies installed.
- Tests cover only subsets (impact stories, budget planner, vendor/audit/engagement); major dashboards & tables lack coverage (NGO finance, company programmes, etc.).
- Accessibility testing not automated; no axe/pa11y integration despite complex UI.

### Medium-Priority Work
- Replace local storage token persistence with secure storage (httpOnly cookie) once backend supports it.
- Implement server-driven navigation: fetch nav items based on role from backend.
- Add skeleton loading states tied to API query progress (currently manual toggles).
- Expand analytics widget tests to cover interactions (simulator slider, CTA states).
- Build integrations for Postman collection parity (use same endpoints in Storybook mocks).
- Document performance budgets and track via Next.js metrics.
- Implement error boundaries and fallback UIs for failed fetches.
- Create consistent API layer using React Query + typed responses from shared package.

### Low-Priority Enhancements
- Add RTL tests for mobile/responsive behaviours (drawer toggles, filters) across modules.
- Integrate linting for accessibility (eslint-plugin-jsx-a11y rules) with targeted overrides.
- Add Figma/Design token documentation to align with future design system.
- Provide UI toggles for enabling/disabling experimental features (feature flags).
- Automate Storybook build in CI once Percy ready, even if snapshots disabled.

## Suggested New Features

### Backend
- Webhook ingestion endpoints for external compliance or donor systems.
- Audit log query API with filtering & CSV export.
- Background job scheduling for periodic compliance reminders.
- Analytics aggregation service feeding dashboards with cached metrics.
- Real-time notifications channel (websocket) for approvals/status updates.
- Data retention policies & purge jobs for GDPR compliance.

### Frontend
- Admin control center for feature flags and system status.
- In-app guided tours/onboarding checklists per role.
- Downloadable CSR report builders using new backend endpoints.
- Offline mode for data entry with sync (especially NGO field usage).
- Real-time collaboration cues (presence indicators, comment threads).

---

_Update pending_works.md as items evolve or are completed._
