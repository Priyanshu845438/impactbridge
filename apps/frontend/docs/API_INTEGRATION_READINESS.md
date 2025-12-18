# API Integration Readiness (Frontend)

## API-Ready Modules
- Admin registries (NGO/company/donor lists) – tables/forms align with backend pagination schema.
- Address & bank compliance forms – inputs match backend DTOs.
- CSR budget planner – ready to consume finance endpoints.
- Vendor directory, audit center, engagement hub – filters and drawers prepared for server data.

## Mock-Only Modules
- Impact stories analytics + workflow (pending backend analytics service).
- Company programme comparison, impact explorer, forecasting (await analytics endpoints).
- Company ↔ NGO approvals (UI ready; backend workflow not exposed).

## Testing & Tooling
- RTL coverage for impact stories, vendor/audit/engagement, budget planner, analytics widgets.
- Storybook stories ensure TagSelector, StatusBadge, ReportsSummaryCard stable.
- Percy snapshots disabled until Chromium libs available.

## Integration Order (frontend)
1. Admin registries + compliance forms (backend endpoints stable).
2. CSR budget planner + vendor/audit listings.
3. Impact stories once analytics+approvals APIs land.
4. Analytics-heavy views (benchmark, forecast, explorer) after backend services ship.

Keep docs and nav TODOs updated as APIs land.
