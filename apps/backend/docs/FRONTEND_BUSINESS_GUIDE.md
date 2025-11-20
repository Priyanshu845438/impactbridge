# Frontend Business Guide – Auth, Profiles & Compliance

This guide aligns frontend flows with backend capabilities.

## Auth & Session Flow
1. **Register** via `/auth/register` with name/email/password/role.
2. **Login** via `/auth/login`; store JWT securely (HttpOnly cookie or memory + refresh strategy).
3. **Authenticated Requests** require `Authorization: Bearer <token>` and may use `@Roles(...)` RBAC.

## Role-Based Experiences
- **NGO** – manage profile (`/users/me`), address (`/address/ngo`), bank (`/bank/ngo`), campaigns (future), view admin reports when allowed.
- **COMPANY** – monitor CSR reports via `/users/companies-with-reports`, view NGO profiles.
- **SUPER_ADMIN** – full oversight: `/users/admin/*`, campaign/donation reporting.
- **DONOR** – personal profile (auto-created) and donation history (upcoming).

## Compliance Modules
- **Registered Address** – NGOs must keep `/address/ngo` up to date; backend auto-creates profile on registration.
- **Bank Details** – NGOs update `/bank/ngo`; responses mask account numbers to prevent leaks.
- **Admin Profiles** – use `/users/admin/{ngos|companies|donors}` for comprehensive compliance reviews.

## Payload Reference
- Address: `{ line1, line2?, district, state, pincode, country }`
- Bank: `{ accountHolder, accountNumber, ifscCode, bankName, branchName? }`
- Profile update: optional user fields (`name`, `phone`, etc.).

## UX Recommendations
- Display validation errors returned by `ValidationPipe`.
- Surface 401/403 errors with clear messaging (“Session expired”, “Insufficient privileges”).
- Provide indicators for missing compliance data (address/bank).

## Security Notes
- Always use HTTPS in production.
- Consider refresh-token rotation/MFA in future sprints.
- Mask sensitive data client-side even though responses are masked.

## Future Enhancements
- Campaign CRUD and reporting dashboards.
- Donor analytics and donation receipts.
- Enhanced audit log visibility for admins.

