# Frontend Change Log

## [Unreleased]
### Wired
- Admin dashboard KPI cards, metric signals, and activity feed now consume live analytics when `API_DASHBOARD` is enabled, falling back to existing mocks otherwise.
- Reports & Analytics page summary tiles, donation trend visuals, category breakdown, and contribution split use backend analytics data with graceful fallbacks.

### Added
- React Query integration for admin analytics across dashboard/report pages.
- Formatters for currency, number, and datetime formatting shared by analytics views.
- Jest/RTL tests for admin dashboard and reports pages covering feature flag on/off scenarios.

### Updated
- `ActivityFeed` component formats ISO timestamps from backend audit logs.
- `mapAdminAnalyticsToUi` adapter exposes donation timeline, summary, financial overview, and activity metadata for UI consumption.
