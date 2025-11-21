# Technical Overview – ImpactBridge Backend

## Stack Overview
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **Auth:** JWT Bearer tokens (1-day expiry)
- **Validation:** global `ValidationPipe`

## Module Architecture
- `auth/` – registration & login; guards (`JwtAuthGuard`, `RolesGuard`); `ActivityLogService` called on register/login.
- `users/` & `user/` – admin CRUD (legacy) + self-service endpoints (`/users/me`).
- `address/` – NGO registered address management.
- `bank/` – NGO bank details management (response masks account number).
- `documents/` – NGO document uploads (CSR policy, PAN, etc.).
- `campaigns/` – campaign creation + public browsing.
- `donations/` – authenticated & anonymous donations, donation history APIs.
- `receipts/` – attach receipt URLs to donations.
- `analytics/` – SUPER_ADMIN aggregated metrics.
- `activity/` – logging helper reused across modules.

## Prisma Schema Highlights
- **Models:** `User`, `NGOProfile`, `CompanyProfile`, `DonorProfile`, `Campaign`, `Donation`, `BankDetail`, `Document`, `Address`, `AuditLog`.
- **Enums:** `Role`, `NGORegistrationType`, `DocumentType`, `CampaignCategory`.
- Profiles auto-created after registration based on role (NGO/Company/Donor).
- `Donation` includes `receiptUrl` for 80G receipts.

## Request Flow
1. **Auth:** `POST /auth/register`, `POST /auth/login` (returns JWT + user). Token payload includes `id`, `role`.
2. **Guarding:** Controllers use `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles(...)` to enforce roles.
3. **Activity Logging:** `ActivityLogService.log()` called after key actions (login, profile update, campaign, donation, receipt).

## Compliance Modules
- Address/bank/documents endpoints require NGO role.
- Admin analytics and profile listings restricted to SUPER_ADMIN.
- Donations update campaign totals and optionally log anonymous info.

## Error Handling
- `JwtAuthGuard` throws 401 for missing/invalid tokens.
- `RolesGuard` returns 403 for insufficient role.
- Prisma `P2002` constraint caught when updating email (`Email already in use`).

## Build & Dev
- `npm run start:dev` – watch mode (requires DB connection).
- `npm run build` – compile TS to JS for deployment.
- Postman collection at `docs/postman/impactbridge.postman_collection.json` aids manual testing.

## Future Roadmap
- Consolidate legacy `users/` module with self-service.
- Campaign CRUD (update/archive) & donation reporting dashboards.
- Donor receipts via email.
- Refresh token rotation & MFA.

