# Business Logic Status – ImpactBridge Backend

## Completed Modules
- Authentication (register/login), role-based guards, JWT sessions
- Self-service profile (`/users/me`), password change
- NGO compliance flows: address, bank, documents, campaigns, receipts
- Donation flows (authenticated + public), donation history APIs
- Admin analytics & profile listings
- Activity logging for key events

## Known Gaps / TODOs
- Merge legacy `/users` CRUD with self-service
- Campaign update/archive endpoints
- Detailed company dashboards (currently admin-only)
- Donor receipt emailing automation
- Refresh tokens/MFA implementation
- E2E test coverage and CI automation

## Recommended Next Steps
1. Consolidate user modules + sanitize legacy endpoints
2. Add update/archive for campaigns & campaign reporting
3. Enhance company dashboards for CSR metrics
4. Implement donor receipt email + PDF templating
5. Introduce refresh tokens & MFA
6. Add automated test suites

