# Frontend Business Guide – Auth, Profiles & Compliance

This guide clarifies how frontend apps interact with backend services across authentication, profile management, and compliance modules.

## Auth Flow Overview
1. **User Registration** – POST `/auth/register` with name, email, password, role (`SUPER_ADMIN|NGO|COMPANY|DONOR`). Returns user (no password).
2. **User Login** – POST `/auth/login` with email/password. Returns sanitized user + `accessToken` (1-day JWT). Store securely (HttpOnly cookie or in-memory + refresh token approach).
3. **Authenticated Requests** – Include header `Authorization: Bearer <token>`. Guards:
   - `JwtAuthGuard` verifies JWT.
   - `RolesGuard` enforces role access via `@Roles(...)`.
   - `CurrentUser` exposes decoded payload for services.

## Role-Based Views
- `NGO` dashboards use `/users/me`, `/address/ngo`, `/bank/ngo`, and `/users/ngos-with-campaigns` for self/impact data.
- `COMPANY` dashboards use `/users/companies-with-reports`, `/users/ngos/:id`, `/users/admin/companies` for CSR monitoring.
- `SUPER_ADMIN` has access to all admin insights (`/users/admin/*`).
- `DONOR` dashboards rely on `/users/admin/donors` and donation data once wired.

## Compliance Modules
- **Address Management** – NGOs must maintain a registered address via POST `/address/ngo`.
- **Bank Details** – NGOs provide verified bank info via POST `/bank/ngo` (masked on response).
- **Profiles** – NGO/Company/Donor profiles auto-create during registration; frontend should load them via admin endpoints for review when necessary.

## Payload Patterns
- Address DTO: `{ line1, line2?, district, state, pincode, country }`
- Bank DTO: `{ accountHolder, accountNumber, ifscCode, bankName, branchName? }`
- Profile updates (self-service): subset of user fields (name, phone, etc.).

## UX Considerations
- Show field-specific validation messages from backend.
- Gracefully handle 401/403 scenarios (expired token, insufficient role).
- Provide inline cues when addresses/bank details are missing or pending verification.

## Security Notes
- Always use HTTPS in production and secure storage for JWT.
- Mask bank account numbers client-side too if necessary.
- Prepare for refresh tokens / MFA in future sprints.

## Future Improvements
- Campaign CRUD for NGOs/Companies.
- Donor-facing analytics and donation receipts.
- Enhanced audit trails surfaced via admin UI.

Use these guidelines to align frontend flows with backend expectations and compliance requirements.
