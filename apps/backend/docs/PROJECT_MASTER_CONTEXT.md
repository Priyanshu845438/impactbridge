# ImpactBridge – Project Master Context

## Project Summary
ImpactBridge is a compliance-focused CSR platform that connects NGOs, corporates, and donors. The backend centralises onboarding, campaign management, donation tracking, and statutory reporting so every rupee is auditable end to end.

## Tech Stack
- **Backend:** NestJS 11 (TypeScript)
- **ORM:** Prisma Client targeting PostgreSQL
- **Database:** PostgreSQL (Neon serverless in lower environments)
- **Frontend:** Next.js 14 consuming documented REST endpoints
- **Tooling:** ESLint + Prettier, Postman collection, AGENTS.md changelog

## Active Modules
1. Auth
2. Users
3. NGO Profile
4. Company Profile
5. Donor Profile
6. Address
7. Bank
8. Documents
9. Campaigns
10. Donations
11. Receipts
12. CSR Reports
13. Analytics
14. Activity Logs (central audit trail)
15. Milestones (campaign progress tracking)
16. Impact Metrics (campaign & milestone outcomes)
17. Utilization Reports (fund usage with proofs)

## Core Backend Rules
- Follow strict `controller → service → prisma` layering.
- Every request body passes through DTOs with class-validator.
- Controllers must stay lean—no business logic beyond delegation.
- Use `JwtAuthGuard` and `RolesGuard` together for protected routes.
- Sanitize user-related responses to strip passwords and other sensitive fields before returning them.

## Auth Guidelines
- Authentication via JWT (HS256) signed with `JWT_SECRET`.
- Password hashing uses bcrypt with 10 salt rounds.
- Supported roles: `SUPER_ADMIN`, `NGO`, `COMPANY`, `DONOR`.
- Guards extract `{ sub, role }` into `AuthUser`; services consume `sub` as userId.

## Database Overview
- **User** (role, credentials) – one-to-one with **NGOProfile**, **CompanyProfile**, **DonorProfile**.
- **NGOProfile** ↔ **Campaign** ↔ **Donation** (many-to-many via donations).
- **BankDetail**, **Address**, **Document** share polymorphic relations to profiles/campaigns.
- **Donation** ties donors/companies to campaigns and records receipts.
- **CSRReport**, **Analytics**, and **ActivityLog** aggregate transactional data.

## High-Level API Workflow
1. Registration (role mapped to auto-created profile).
2. Login (JWT issuance).
3. Profile enrichment (addresses, bank details, documents).
4. Campaign creation & publishing (NGO roles).
5. Donation lifecycle (internal authenticated donors or public forms).
6. Receipt generation and CSR reporting.

## Developer Workflow Expectations
- Break work into micro-tasks; open loops are forbidden.
- Run lint/tests per task when feasible.
- Record every meaningful change in `AGENTS.md` before handing off.
- Commit frequently with focused diffs (one logical concern per commit).

## Postman Usage Rules
- Base URL stored as `{{base_url}}` environment variable.
- Collection pre-request script injects latest auth token automatically.
- Document required headers, role expectations, and sample payloads for every endpoint.

## Lint & Coding Conventions
- TypeScript strict mode; avoid `any`/`unknown` without type guards.
- ESLint must be clean before final sign-off.
- Prefer named imports; delete unused code immediately.
- Sanitize Prisma results via DTOs or helper sanitizers before returning from services.

## Guidance for Future ChatGPT Agents
- Read `PROJECT_MASTER_CONTEXT.md` before coding.
- Respect the established layering and security patterns.
- Mirror the linting and testing rituals; never ignore build output.
- Update `AGENTS.md` with concise summaries and rationale.
- When in doubt, ask for a micro-task breakdown before large refactors.

## Impact Measurement Modules
- **Milestones Module** – NGOs create milestones per campaign with target dates, budgets, and status updates.
- **Impact Module** – NGOs log outcome metrics (e.g., people served) per campaign or per milestone.
- **Access** – Metrics readable by all roles; creation restricted to owning NGO.

## Utilization Report Module
- NGOs submit fund usage statements including amount used, description, and a proof URL.
- Optional milestone linkage ties spending to specific project phases.
- Campaign/milestone reports are visible to companies, donors, and admins; a global ledger exists for SUPER_ADMIN.

## CSR Summary Builder
- Endpoint: `POST /csr/summary` (COMPANY, SUPER_ADMIN).
- Aggregates budgets, approved projects, disbursed amounts, utilization reports, and impact metrics.
- Outputs CSR-2 style fields: obligation, amount spent, unspent, project list, beneficiary totals, admin notes.
