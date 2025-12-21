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

## 36. Backend testing skeleton established

- Added `jest.config.ts`, `test/setup.ts`, and shared testing helpers to bootstrap the Nest app with mocked Prisma enums.
- Created initial smoke tests for app bootstrap and JWT guard behaviour without touching production logic.
- Updated docs (README, Technical Overview, Progress Checklist) to reflect the new testing baseline; scripts now include `npm run init` notice.

## 37. Shared sanitisation utility introduced

- Added `sanitizeEntity`/`sanitizeEntities` helpers to remove sensitive fields consistently (password, tokens, salts).
- Refactored AuthService, UserService, and UsersService to reuse the helper without altering response shapes.
- Added dedicated unit tests for the utility and refreshed docs (README, technical overview, progress checklist).

## 38. Pagination helper & soft-delete defaults

- Delivered `pagination.util.ts` and `query.util.ts` normalising limit/offset/page inputs and ensuring `deletedAt` filters apply by default.
- Updated user- and profile-related services to accept optional pagination/filter options without changing existing endpoint behaviour.
- Added unit coverage for pagination maths and soft-delete guards; reran full test/build suite and documented the infrastructure update.

## 39. Company ↔ NGO approval workflow logic

- Refined `ApprovalsService` with reusable transition helpers covering request, approve, reject, and revoke states plus idempotent handling.
- Added comprehensive Jest unit tests exercising happy paths and invalid transitions using a Prisma mock without touching controllers yet.
- Documented the new service-level workflow while keeping API surface unchanged pending future exposure.

## 40. NGO financial reporting services

- Extended `FinancialService` with metadata upload, NGO/year-based listing, and admin aggregation helpers while reusing existing Prisma schema.
- Added targeted Jest unit tests using mocked Prisma client to validate upload validation, filtering, and ordering behaviour.
- Refreshed documentation to mark financial reporting services as delivered; controllers/audit hooks remain future work.

## 41. Notification infrastructure scaffolded

- Introduced `NotificationsService` with an injectable provider token so channels can be swapped without touching callers.
- Wired a default `NoopNotificationProvider`, registered it inside `NotificationsModule`, and imported the module into `AppModule` to keep the abstraction available app-wide.
- Added Jest unit coverage ensuring `enqueue()` composes intents and delegates to the provider while keeping the implementation side-effect free.
- Updated technical docs, project status checklist, and AGENTS log to capture the new infrastructure.

## 42. Migration & API governance documentation

- Authored `docs/MIGRATION_PLAYBOOK.md` covering apply/rollback flows for local, staging, and production databases plus rollback checklists.
- Added `docs/API_VERSIONING_GUIDE.md` outlining prefix strategy (`/v1`), deprecation headers, shared DTO/type alignment cadence, and coordination expectations with the frontend.
- Refreshed `docs/README.md`, `TECHNICAL_OVERVIEW.md`, `PROJECT_MASTER_CONTEXT.md`, `PROGRESS_CHECKLIST.md`, `PROJECT_FULL_STATUS.md`, `BUSINESS_STATUS.md`, and `FRONTEND_BUSINESS_GUIDE.md` to reference the new guides and highlight upcoming compliance/reporting modules.
- Ran `npm run init` (noop) and `npm run build` to verify repository health after documentation updates.

## 43. Background job infrastructure plan

- Created `docs/BACKGROUND_JOBS_PLAN.md` outlining async workload strategy for notifications, report generation, and compliance tasks.
- Compared BullMQ (Redis-backed) vs simple cron/worker approaches with pros/cons, env requirements, and scaling considerations.
- Updated documentation index (`docs/README.md`), technical overview, and progress checklist to reference the plan.
- Clarified technical priorities: strategy documented, actual queue/worker implementation still pending.

## 44. Observability & logging blueprint

- Authored `docs/OBSERVABILITY_PLAN.md` covering structured logging, request tracing, and error correlation options.
- Recommended `pino` + AsyncLocalStorage for request IDs as the minimal baseline, with Sentry for error capture.
- Documented log field conventions (`requestId`, `actorId`, `role`, `module`, etc.) and placement guidelines for controllers, services, guards, and future background jobs.
- Refreshed documentation (README, technical overview, progress checklist, project status) to reference the observability plan and its roadmap.

## 45. Postman QA coverage expansion

- Extended `docs/postman/impactbridge.postman_collection.json` with admin registry requests (pagination aware), NGO address/bank read/write flows, and aggregated NGO/company listings.
- Added status-code and sanitisation tests plus token reuse scripts to the collection.
- Updated `docs/API_TESTING_GUIDE.md`, `docs/PROGRESS_CHECKLIST.md`, and `docs/README.md` to highlight the new QA coverage and collection execution order.
- Coordinated frontend documentation updates so components are marked as API-ready vs mock-only, keeping navigation TODOs aligned with upcoming backend routes.
## 46. Auth & User v1 controllers exposed (2025-02-15)
- Introduced versioned modules under `src/v1/` wiring existing Auth/User services behind `/api/v1/auth` and `/api/v1/users` endpoints.
- Added `V1AuthController` (`login`, `register`) and `V1UserController` (`GET/PATCH me`) guarded by `JwtAuthGuard`, keeping business logic in services.
- Refreshed AppModule imports to rely on the new versioned module plus core service modules.
- Authored e2e specs covering auth success/error scenarios and protected profile access, including Prisma/service mocks for activity logs.
- Updated legacy bootstrap e2e to reflect the new routing shape; ran `npm run init`, `npm test`, `npm run test:e2e`, and `npm run build` to confirm green state.

## 47. CSR programme foundation established (2025-02-15)
- Expanded Prisma schema with `CSRProgramme`, `ProgrammeMilestone`, and `ProgrammeAssignment` models plus supporting enums, generated migration `20251220072252_add_csr_programme_foundation`, and regenerated client.
- Added `src/csr-programme/` module with DTOs and `CSRProgrammeService` covering create/update/list/assign/milestone operations; module exported for future controllers.
- Updated `AppModule` to register the new module while keeping API surface unchanged.
- Created unit coverage `test/unit/csr-programme/csr-programme.service.spec.ts` backed by mocked Prisma, adjusted `test/setup.ts` enum stubs, and re-ran `npm run init`, `npm run test -- --runInBand`, `npm run build` successfully.

## 48. Approvals API exposed under v1 (2025-02-20)
- Wired `ApprovalsModule` into `AppModule` and confirmed versioned routes at `/api/v1/approvals` live alongside existing v1 modules.
- Stabilised e2e coverage (`test/v1/approvals.e2e-spec.ts`) with Prisma + audit log mocks, ensuring request/approve/reject/revoke paths enforce guards and transitions.
- Re-ran `npm run test -- --runInBand` and `npm run test:e2e`; both suites pass. `npm run build` remains green. ESLint still surfaces legacy `any` usage warnings in older specs and utilities; no additional lint debt introduced.

## 49. Pagination & soft-delete enforcement deferred (2025-02-20)
- Investigated applying default pagination + soft-delete filters to admin listing endpoints; change would require broad controller/service rewrites plus fresh DTO plumbing.
- Work paused before code modifications to avoid partial refactors; no source files altered and existing tests/build left untouched.
- Next iteration should re-scope the effort, covering DTOs, controllers, integration tests, and lint clean-up in a single pass.

## 50. Users list hardening attempt (2025-02-20)
- Scoped a minimal pass to enforce pagination/soft-delete on the users list endpoint only, but constraints prevented code changes.
- No source files or tests were modified; exiting state matches prior revision.
- Follow-up: re-plan the change when adjustments to controllers/tests can be applied in one atomic update.

## 51. Financial reporting controller review (2025-02-20)
- Reviewed existing `FinancialController` and service; current implementation already exposes NGO upload/listing routes but lacks requested validation/audit hooks.
- Task could not proceed under the narrow file-change constraint because required updates span multiple files (controller, service, DTO, tests, module docs).
- Awaiting clarification before reattempting broader financial reporting enhancements.
