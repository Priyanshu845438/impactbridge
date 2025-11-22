# AGENTS.md – ImpactBridge Backend Agent Guide

This document explains the **ImpactBridge platform**, the **backend architecture**, the **development workflow**, and maintains a **detailed activity log** of every task the Agent and developer have completed.

---

# Project Overview: ImpactBridge Platform

ImpactBridge is a full-stack platform designed to connect **NGOs**, **Corporates**, and **Donors** to streamline CSR (Corporate Social Responsibility) activities and impact reporting. The backend is built using **NestJS**, **Prisma**, and **PostgreSQL**.

### Core Goals

* Manage authenticated users with roles: **SUPER_ADMIN**, **NGO**, **COMPANY**, **DONOR**.
* Enable NGO onboarding & verification.
* Provide a corporate donor portal with transparent spending.
* Manage donation campaigns, fund tracking, and impact reports.
* Provide a clean, scalable, auditable backend architecture.

---

# Backend Architecture (Important for the Agent)

The backend strictly follows the NestJS layered pattern:

1. **Controller** → Handles the request and response only.
2. **Service** → Contains business logic.
3. **Prisma Layer** → Communicates with PostgreSQL through Prisma Client.
4. **DTO Layer** → Validates incoming data using class-validator.
5. **Utils** → Pure helper functions (e.g., hashing, token generation).

### Technologies in Use

* **NestJS 11** (modular backend framework)
* **Prisma ORM** (postgres connector, schema-first design)
* **PostgreSQL (Neon serverless)**
* **bcrypt** (password hashing)
* **JWT** (authentication)
* **DevContainer** (isolated development environment)

---

# Agent Operating Rules

The Agent must always:

* Generate code ONLY inside: `impactbridge/apps/backend`.
* Follow NestJS architecture: **controller → service → prisma**.
* Use **DTOs with class-validator**.
* Import Prisma Client only from `prisma/generated`.
* Never write business logic in controllers.
* Use bcrypt for password hashing.
* Generate production-ready, syntactically correct TypeScript.
* Maintain file paths **exactly** as requested.
* Update this AGENTS.md log whenever development progresses.

---

# Activity Log (Detailed Timeline)

This section tracks **everything completed so far**.

---

## **1. Backend Environment Setup**

* DevContainer initialized successfully.
* NestJS backend opened in isolated environment.
* Prisma connected to PostgreSQL (Neon database).
* Verified schema configuration and connection.
* Ran **initial Prisma migration** for the User model.
* Database tables confirmed.

---

## **2. Module Scaffolding Completed**

Generated via Agent using CLI code generator:

* `auth` module with controller, service, and module.
* `user` module with controller, service, and module.
* `prisma` module with PrismaService.
* PrismaService exported globally via module.

This establishes the **base folder structure**.

---

## **3. User Feature Foundations Built**

Created by Agent:

* `UserRole` enum with: **SUPER_ADMIN, NGO, COMPANY, DONOR**.
* `CreateUserDto` for validating user creation input.

DTO includes:

* name
* email
* password
* role

Each with class-validator decorators.

---

## **4. Auth DTOs Implemented**

Created by Agent:

* `LoginDto`
* `RegisterDto`

Validated fields:

* email
* password
* name (for register)
* role (from UserRole enum)

This prepares the Auth module for signup/login implementation.

---

## **5. Password Utility Implemented**

File created:

```
src/auth/utils/password.util.ts
```

Contains:

* `hashPassword(password: string)` → bcrypt.hash with 10 salt rounds
* `comparePassword(password, hash)` → bcrypt.compare

This ensures secure password storage and verification.

---

## **6. User Registration Service Implemented**

Updated `AuthService` to provide `register(dto: RegisterDto)` following the required flow:

1. Check for existing user by email via Prisma.
2. Throw `BadRequestException` if email already exists.
3. Hash incoming password with `hashPassword` utility.
4. Create new user record with Prisma.
5. Return user object without password field.

This completes backend signup handling while respecting NestJS layering.

---

## **7. Auth Login Flow Implemented (Placeholder JWT)**

Enhanced `AuthService.login(dto: LoginDto)` to:

1. Fetch user by email using Prisma.
2. Reject invalid credentials with `BadRequestException`.
3. Verify password using `comparePassword`.
4. Call a placeholder JWT signer (`signJwtPlaceholder`) pending final token implementation.
5. Return sanitized user details (without password) and success message.

Maintains controller → service → prisma responsibilities and prepares for JWT integration.

---

## **8. Auth Controller Endpoints Wired**

Updated `AuthController` with:

* `POST /auth/register` → delegates to `AuthService.register` with `RegisterDto`.
* `POST /auth/login` → delegates to `AuthService.login` with `LoginDto`.

No business logic in controller—aims for clean request routing and validation via DTOs.

---

### **9. JWT Utility Implemented**
- Added jwt.util.ts with signToken() helper.
- Uses environment-based JWT_SECRET.
- Expires tokens in 1 day.
- Prepares the AuthService for real JWT authentication.

---

### **10. Auth Login Updated with Real JWT**
- AuthService.login now signs tokens via signToken().
- Returns accessToken alongside sanitized user profile.
- Removes placeholder message for production readiness.

---

### **11. AuthModule Configured for JWT**
- Imported JwtModule with 1-day expiry and env secret.
- Ensured AuthModule exports AuthService and depends on PrismaModule.
- Prepares NestJS DI for JWT-based authentication flows.
---

### **12. Global Validation Enabled**
- main.ts now applies ValidationPipe globally with whitelist + forbidNonWhitelisted.
- Ensures all incoming DTO payloads are enforced consistently across controllers.

---

### **13. Backend errors fixed, JWT typing patched, Prisma role casting fixed, and all docs generated.**
- Resolved build/runtime issues in JWT util and Prisma role conversions.
- Created auth documentation suite under `docs/` (API testing, frontend business, technical overview).
- Verified build succeeds; runtime DB connection pending due to external Neon availability.
- Auth register/login flows now emit sanitized profiles with JWT tokens.

---

### **14. JWT Guard & CurrentUser Decorator Added**
- Implemented `JwtAuthGuard` to validate bearer tokens and attach decoded payloads.
- Created `@CurrentUser` decorator for convenient access to `request.user`.
- Exported guard via `AuthModule` for use across protected modules.
- Updated documentation to reflect guarded flows and decorator usage.

---

### **15. Protected /users/me Endpoint Added**
- Added `UserController` hosting a JWT-guarded `GET /users/me` route.
- Endpoint returns the decoded token payload via `@CurrentUser` for quick auth checks.
- Documentation updated to mention the self-profile endpoint for testing guards.
- Build verified after controller addition.

---

### **16. Role-Based Access Control (RBAC) Implemented**
- Introduced `@Roles` decorator and `RolesGuard` to enforce metadata-driven access.
- Wired guard into `AuthModule` so routes can stack `@UseGuards(JwtAuthGuard, RolesGuard)`.
- Documentation updated to describe RBAC usage and testing steps.
- Build confirmed to succeed post RBAC integration.

---

### **17. User Profile Endpoints Added**
- Added `UserService` and `UserModule` to expose `/users/:id` (public) and `/users/me` (JWT protected).
- `/users/me` now fetches the user profile by ID instead of returning raw token payload.
- Documentation updated across API testing, frontend guide, and technical overview.
- Build verified after profile endpoint enhancements.

---

### **18. User List Endpoint Added**
- Added `GET /users` restricted to `SUPER_ADMIN` role via JWT + RolesGuard.
- Implemented `UserService.findAll()` returning sanitized user data.
- Build confirmed after RBAC-protected list endpoint.

---

### **19. User Self-Update Endpoint Added**
- Added `PATCH /users/me` allowing authenticated users to update profile fields.
- Introduced `UpdateUserDto` and `UserService.update` with sanitized responses.
- Build verified after new DTO and endpoint enhancements.

---

### **20. Change Password API Added**
- Added `POST /users/change-password` secured by JWT guard.
- Implemented `ChangePasswordDto` and service logic to verify old password and hash the new one.
- Build confirmed after password management updates.

---

### **21. Admin NGO & Company Views Added**
- Added role-restricted endpoints to fetch individual NGO and Company profiles.
- `UsersService` now provides sanitized lookups filtered by role.
- Build verified after RBAC extensions for targeted profile access.

---

### **22. Documentation & QA Assets Updated**
- Overhauled testing docs, added Postman collection, and created business status report.
- API testing guide now lists coverage for each endpoint with success/failure cases.
- Build confirmed after documentation updates.

---

### **23. Admin NGO Listing With Campaigns Added**
- Added service/controller for listing NGOs with attached campaigns (RBAC restricted).
- Responses sanitized using existing helper.
- Build verified post-change.

---

### **24. Company Listing With Donation Reports Added**
- Added RBAC-protected endpoint returning companies with donation + campaign detail.
- Service sanitizes user data while including nested donation info.
- Build confirmed after addition.

---

### **25. Government-Compliant Schema Added**
- Expanded Prisma models for NGO/Company/Donor profiles, documents, banking, campaigns, donations, and audit logs.
- Enums align with CSR and NGO Darpan classifications.
- Migration `add_government_compliant_models` applied successfully.

---

### **26. NGO Profile Auto-Creation Added**
- NGO user registration now creates an empty `NGOProfile` record automatically.
- Ensures new schema relations stay consistent without manual setup.
- Build confirmed after service updates.

---

### **27. Company Profile Auto-Creation Added**
- COMPANY registration now seeds a default `CompanyProfile`.
- Guarantees CSR-ready data structure for corporate accounts.
- Build confirmed after service updates.

---

### **28. Donor Profile Auto-Creation Added**
- DONOR registrations now create baseline `DonorProfile` entries.
- All role-specific profiles (NGO, Company, Donor) are initialized automatically.
- Build confirmed after service updates.

---

### **29. Admin NGO Profiles Listing Added**
- Added SUPER_ADMIN-only endpoint returning NGO profiles plus documents, bank, and address data.
- Service sanitizes embedded user records before returning.
- Build confirmed following enhancement.

---

### **30. Admin Company Profiles Listing Added**
- Added SUPER_ADMIN-only endpoint returning company profiles with documents, bank details, and addresses.
- Sanitization ensures embedded user data never exposes passwords.
- Build confirmed after addition.

---

### **31. Admin Donor Profiles Listing Added**
- Added SUPER_ADMIN-only endpoint returning donor profiles with addresses and PAN data.
- Service sanitizes embedded user records for security.
- Build confirmed after enhancement.

---

### **32. NGO Address Management Added**
- Introduced address controller/service with DTO for NGO registered address updates.
- Endpoint guarded for NGO role via JWT + RolesGuard.
- Build confirmed after module wiring.

---

### **33. NGO Bank Details Management Added**
- Added bank controller/service with DTO for NGO bank info updates.
- Endpoint restricted to NGO role and masks account numbers.
- Build confirmed after module integration.

---

### **34. NGO Document Upload Added**
- Added documents controller/service with DTO for NGO document uploads.
- Endpoint restricted to NGO role via JWT + RolesGuard.
- Build confirmed after module wiring.

---

### **35. NGO Campaign Creation Added**
- Added campaign controller/service/DTO enabling NGOs to publish campaigns.
- Endpoint locked to NGO role; campaigns store category, funding goals, visibility.
- Build confirmed after module integration.

---

### **36. Public Campaign Listing Added**
- Added public endpoints to browse campaigns and view campaign details.
- Service returns sanitized campaign data with NGO info and donation stats.
- Build confirmed after update.

---

### **37. Donation API Added**
- Added donation DTO/service/controller enabling JWT users to donate to campaigns.
- Campaign totals update after each donation; donor/company profiles linked automatically.
- Build confirmed after module wiring.

---

### **38. Donation History Endpoints Added**
- Added endpoints for donors (self), NGOs, and SUPER_ADMIN to review donation history.
- Service returns sanitized records with campaign context.
- Build confirmed after update.

---

### **39. Donation Receipt Generation Added**
- Added receipts DTO/service/controller enabling NGOs to attach receipt URLs to donations.
- Schema updated with `receiptUrl` field; migration applied successfully.
- Build confirmed after changes.

---

### **40. Public Campaign Link & External Donation Added**
- Added public campaign link endpoints and anonymous donation flow.
- Campaign service now provides shareable URLs and donation-ready payloads.
- Build confirmed after updates.

---

### **41. Global Activity Logging Added**
- Introduced ActivityLogService and wired logs into auth, profile updates, donations, campaigns, receipts.
- Prisma audit logs now capture action metadata for compliance.
- Build confirmed after integration.

---

### **42. API Role Fixes & Postman Enhancements**
- Restored self-service profile endpoints, fixed NGO permissions for address/bank/campaign/doc receipt flows.
- Adjusted guards to rely on `req.user.sub`; DTOs accept editable fields.
- Postman collection auto-applies base URL, injects token, and documents roles.
- Build confirmed after fixes.

---

### **43. Admin Analytics Endpoints Added**
- Added analytics service/controller returning donation, campaign, and user stats.
- Endpoint secured for SUPER_ADMIN to support CSR reporting.
- Build confirmed after addition.

---

### **44. Documentation Suite Refreshed**
- Added docs/README.md index and enriched API/business/technical guides.
- Postman collection includes base URL, auto-token, and tester notes.
- Build confirmed; documentation ready for QA/onboarding.

---

### **45. CSR Compliance Reporting Added**
- Implemented CSRReports service/controller for NGO/company compliance snapshots.
- Added SUPER_ADMIN-only endpoints under `/admin/csr/*`.
- Build confirmed after module addition.

---

### **46. Swagger API Docs Added**
- Configured Swagger/OpenAPI at `/api-docs` with bearer auth definition.
- Annotated users controller endpoints for example documentation.
- Build confirmed after installing swagger dependencies.

---

---

### **47. Final lint cleanup applied; all remaining errors resolved.**

---

### **48. PROJECT_MASTER_CONTEXT.md created for future chat**
- Document captures project summary, tech stack, module list, guard/DTO rules, workflows, lint conventions, and agent guidelines.

---

### **49. PROJECT_MASTER_CONTEXT.md refreshed**
- Added detailed project summary, stack, modules, rules, workflows, Postman conventions, and agent guidance.
