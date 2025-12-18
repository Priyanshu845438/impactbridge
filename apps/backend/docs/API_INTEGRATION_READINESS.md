# API Integration Readiness

This document confirms the backend and frontend are aligned for the upcoming API wiring phase.

## Frontend Readiness
- **Testing**: RTL suites cover impact stories, vendor directory, audit center, engagement hub, budget planner, analytics widgets; Storybook stories available for TagSelector, StatusBadge, ReportsSummaryCard.
- **Mock boundaries**: Impact stories analytics, approvals, compliance exports, vendor data remain mock-only; UI labelled accordingly.
- **Docs**: Dashboard, component catalog, TODO list reflect API-ready vs mock-only surfaces; nav menu annotated with TODOs.

## Backend Readiness
- **Services**: Auth, users, NGO/company/donor registries, address/bank modules, aggregated listings, CSR summary services complete with sanitisation helpers.
- **Infrastructure**: Notifications service scaffold with injectable provider; pagination + soft-delete helpers available; background jobs and observability plans documented.
- **Testing**: Unit tests for auth guards, approvals workflow, sanitisation, pagination; Postman collection extended with admin registries, compliance flows, aggregated listings.

## High-Risk Areas
1. Company ↔ NGO approvals (service logic ready; endpoints pending exposure).
2. NGO financial reporting controllers & CSR-2 exports (service layer complete, no routes yet).
3. Notification delivery providers (currently no-op).

## Recommended Integration Order
1. Wire admin registries + compliance endpoints (already in Postman collection).
2. Expose NGO/company aggregated listings and CSR summary.
3. Deliver company ↔ NGO approval endpoints.
4. Publish financial report APIs and CSR-2 export.
5. Implement notification providers + background job workers.

Keep this checklist updated as modules move from service-only to fully exposed APIs.
