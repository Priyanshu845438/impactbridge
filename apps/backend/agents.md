# ImpactBridge Backend Progress Log

## 1. Initial NestJS scaffolding and Prisma wiring

- Generated baseline `app.module.ts`, `main.ts`, and placeholder controller/service to verify Nest CLI output.
- Added Prisma Client dependency, created `prisma.module.ts`, and confirmed basic `npm run start:dev` bootstrap.

## 2. Auth module foundation with DTO validation

- Created `auth.module.ts`, `auth.controller.ts`, and `auth.service.ts` using Nest generators.
- Introduced `RegisterDto` and `LoginDto` with `class-validator` decorators to enforce payload constraints.
- Stubbed service methods to keep controllers free of business logic.

## 3. PrismaService shared provider

- Implemented `src/prisma/prisma.service.ts` extending `PrismaClient` with graceful shutdown hooks.
- Exported `PrismaModule` so feature modules can inject the client without recreating connections.

## 4. User module shell with role enum

- Added `user.module.ts`, `user.service.ts`, and `user.controller.ts` placeholders.
- Authored `user-role.enum.ts` defining `SUPER_ADMIN`, `NGO`, `COMPANY`, and `DONOR` roles for RBAC checks.

## 5. Core DTOs and password utility

- Added `CreateUserDto` plus `LoginDto`/`RegisterDto` with email/password constraints.
- Built `auth/utils/password.util.ts` wrapping bcrypt hash/compare with 10 salt rounds.
- Confirmed DTOs compile without enabling `emitDecoratorMetadata` hacks.

## 6. Registration flow with Prisma create & sanitisation

- Updated `AuthService.register()` to check duplicate emails, hash passwords, persist via `prisma.user.create`, and omit the password in responses.
- Ensured controllers defer to service layer (no logic directly in route handlers).

## 7. Login flow with placeholder JWT response

- Implemented `AuthService.login()` to fetch by email, validate password, and return a temporary success payload while JWT helper was pending.
- Added consistent `BadRequestException('Invalid credentials')` handling for both missing user and password mismatch.

## 8. Auth controller endpoints

- Wired `/auth/register` and `/auth/login` POST endpoints, delegating to the service methods.
- Confirmed DTO validation triggers automatically through Nest pipes.

## 9. JWT signing utility

- Added `auth/utils/jwt.util.ts` leveraging `jsonwebtoken` with 1-day expiry and environment-driven secret.
- Guarded against missing `JWT_SECRET` by throwing descriptive errors.

## 10. AuthService login issuing real JWTs

- Replaced placeholder response with `signToken({ sub, role })`, returning `{ user, accessToken }` while stripping the password.
- Maintained clean service logic and reused password utilities.

## 11. Auth module imports and guards

- Registered `JwtModule` (global scope) and imported `PrismaModule` for DB access.
- Exposed `AuthService` and guard providers for downstream modules.

## 12. Global validation pipe

- Updated `src/main.ts` to enable `ValidationPipe` with `{ whitelist: true, forbidNonWhitelisted: true }` ensuring strict DTO enforcement.

## 13. Backend fixes and documentation pass

- Resolved JWT_SECRET runtime guard, aligned DTO imports, and adjusted Prisma role casting to match generated types.
- Added API testing, business, and technical overview docs under `docs/` while logging work in AGENTS.md.

## 14. JWT auth guard and CurrentUser decorator

- Created `JwtAuthGuard` verifying bearer tokens via `jsonwebtoken.verify` and attaching payload to `request.user`.
- Added `CurrentUser` decorator to access the decoded payload inside controllers.

## 15. Protected user endpoint

- Scaffolded `/users/me` protected by the new guard, returning the decoded token payload for verification.

## 16. Roles decorator and guard

- Delivered `Roles` decorator (`SetMetadata`) plus `RolesGuard` using `Reflector` to enforce per-route role arrays.

## 17. User profile endpoints & service

- Implemented `UsersService.findById` with sanitisation and exposed `/users/:id` alongside guard-protected `/users/me` that resolves from the database.
- Added `UserModule` importing `PrismaModule`.

## 18. User update & delete with RBAC

- Authored `UpdateUserDto` (optional name/email) and extended `UsersService` with `updateUser`/`deleteUser` helpers returning sanitised data.
- Added SUPER_ADMIN-only PATCH/DELETE endpoints guarded by JWT + RolesGuard.

## 19. Admin user listing endpoint

- Added `/users` (SUPER_ADMIN only) returning sanitised user list via new `UsersService.findAll()`.

## 20. Update-me endpoint

- Introduced PATCH `/users/me` allowing authenticated users to update their own name/email/phone/address via `UsersService.update`.

## 21. Change password flow

- Added `ChangePasswordDto`, service method comparing old hash/new hash, and `/users/change-password` endpoint under JWT guard.

## 22. Admin NGO & company profile views

- Implemented `getNGOById` and `getCompanyById` services with role-restricted routes returning sanitised profiles.

## 23. Admin NGO listing with campaigns, docs updates

- Added `getNGOsWithCampaigns()` including related campaigns and sanitising password fields.
- Updated documentation suite to describe new admin views.

## 24. Company donation reports listing

- Created `getCompaniesWithDonations()` including nested campaign data and exposed via SUPER_ADMIN route.

## 25. Government-compliant Prisma schema migration

- Reworked `prisma/schema.prisma` to include NGO/Company/Donor profiles, campaigns, donations, documents, bank details, addresses, and audit logs with enums (`Role`, `NGORegistrationType`, `DocumentType`, `CampaignCategory`).
- Ran `npx prisma migrate dev --name add_government_compliant_models` confirming schema sync.

## 26. NGO profile auto-creation

- Updated registration flow to auto-create empty `NGOProfile` when role is NGO, ensuring relational integrity.

## 27. Company profile auto-creation

- Added `UsersService.createCompanyProfile` and invoked it during registration for company role.

## 28. Donor profile auto-creation

- Parity for donor role: `createDonorProfile` invoked post user creation.

## 29. Admin NGO profiles registry

- Delivered `/users/admin/ngos` listing detailed NGO profiles with bank details, documents, and addresses (sanitised user object).

## 30. Admin company profiles registry

- Added `/users/admin/companies` exposing company profiles with associated documents/bank/address under SUPER_ADMIN guard.

## 31. Admin donor profiles registry

- Implemented `/users/admin/donors` returning donor profiles with addresses and sanitised user data.

## 32. NGO address management module

- Created Address module (controller/service/DTO) allowing NGOs to upsert their registered address with JWT + RolesGuard (NGO only).

## 33. NGO bank details management

- Added Bank module providing `/bank/ngo` endpoint for NGOs to create/update bank details securely.

## 34. Admin NGO listing with campaigns (RBAC)

- Extended UsersService with `getNGOsWithCampaigns()` including related campaigns and sanitised fields.
- Exposed SUPER_ADMIN/COMPANY guarded route `/users/ngos-with-campaigns` and refreshed documentation.

## 35. Company listings with donation reports

- Implemented `getCompaniesWithDonations()` returning companies with nested donations + campaign info.
- Added SUPER_ADMIN-only `/users/companies-with-reports` endpoint.
