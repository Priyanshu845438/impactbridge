# Technical Overview – ImpactBridge Backend

## Architecture Summary
- **Framework:** NestJS with modular architecture & dependency injection.
- **Persistence:** Prisma ORM targeting PostgreSQL.
- **Auth:** JWT bearer tokens (1-day expiry) with role-based guards.
- **Validation:** Global `ValidationPipe` enforcing DTO schemas.

## Module Structure
- `auth/` – registration/login, password utils, JWT helper, guards, DTOs.
- `users/` – legacy CRUD + admin insights (NGO/company/donor listings, campaigns, donations).
- `user/` – public/self-service profile endpoints.
- `address/` – registered address management for NGOs.
- `bank/` – bank details management for NGOs (masked responses).
- `prisma/` – shared Prisma service/module.
- Address/bank modules depend on `UsersService` for profile lookups.

## Prisma Schema Highlights
- Government-compliant schema: `NGOProfile`, `CompanyProfile`, `DonorProfile`, `Campaign`, `Donation`, `Document`, `BankDetail`, `Address`, `AuditLog`.
- Enums: `Role`, `NGORegistrationType`, `DocumentType`, `CampaignCategory`.
- Auto-created profiles: NGO, Company, Donor profiles generated on registration.

## Authentication Flow
1. Register user → hash password, persist user, create role-specific profile.
2. Login → compare password, sign JWT (`{ sub, role }`).
3. Protected routes → apply `JwtAuthGuard` + `RolesGuard`; use `@Roles(...)` decorators.

## Compliance & Admin Modules
- NGO Address: POST `/address/ngo` (NGO role) upserts registered address.
- NGO Bank: POST `/bank/ngo` (NGO role) upserts bank account (masked in responses).
- Admin Insights: `/users/ngos-with-campaigns`, `/users/companies-with-reports`, `/users/admin/*` endpoints.

## Validation & Error Handling
- Controllers defer to services; business logic is service-layer only.
- Nest exceptions thrown for validation (400), auth (401), RBAC (403), not found (404).
- Prisma-specific error handling pending future enhancements.

## Build & Dev Workflow
- `npm run start:dev` – runs Nest in watch mode (requires DB access).
- `npm run build` – compiles TypeScript to `dist/` (used for sanity checks).
- Postman collection at `docs/postman/impactbridge.postman_collection.json` supports manual QA.

## Future Work
- Merge legacy `users/` and `user/` modules.
- Add end-to-end tests & CI automation.
- Implement campaign CRUD, donation reporting UI, audit log surfacing.
- Introduce refresh tokens / MFA for stronger auth flows.
