# Project Technologies Overview

## Frontend Technology Stack
- **Framework**: Next.js 14 (App Router) with TypeScript for end-to-end type safety.
- **Styling**: Tailwind CSS utility classes complemented by component-scoped CSS modules when finer control is required.
- **State & Data**: React Query manages server-state caching, feature-flag-aware hooks switch between mock data and live APIs, and Context providers handle authentication/session data.
- **Testing**: Jest + React Testing Library for unit/contract tests, MSW for network stubs, and Playwright planned for full E2E coverage.
- **Build & Tooling**: pnpm/npm workspace commands run linting, type-checks, and Next production builds (hybrid static + server rendering bundles).

## Backend Technology Stack
- **Framework**: NestJS with modular architecture (controllers → services → Prisma layer) enforcing separation of concerns.
- **Language & Runtime**: TypeScript targeting Node.js 18+, leveraging decorators, guards, and interceptors.
- **Database Access**: Prisma Client (generated from the workspace Prisma schema) with a shared `PrismaService` exported via `PrismaModule`.
- **Auth & Security**: Bcrypt for password hashing, JSON Web Tokens (JWT) for stateless auth, custom guards (`JwtAuthGuard`, `RolesGuard`) and route-level RBAC decorators.
- **Testing**: Jest-powered unit/integration suites, contract/e2e coverage for CSR programme workflows, and Postman collections for manual verification.
- **Operations**: AsyncLocal-based request context, activity/audit logging utilities, and structured logging middleware.

## High-Level Application Flow
1. **Authentication**: Clients call `/auth/register` or `/auth/login`; passwords are hashed, JWTs issued, and guards validate requests.
2. **Company Experience**: Company users interact with CSR programme list/detail/create/update/status/assignment endpoints. Feature flags ensure the frontend can toggle between mock data and live API without UX changes.
3. **NGO & Donor Modules**: Auto-created profile records capture compliance metadata. Future flows consume shared DTOs to manage campaigns, donations, and reporting.
4. **Activity Logging**: Service methods emit audit entries when actor context is available, enabling traceability without altering business responses.
5. **Frontend Data Fetching**: React Query hooks determine data source (mock vs API) by reading feature flags, normalise payloads to shared DTO shapes, and pass safe data into UI components.

## Architecture Summary
- **Backend Layers**: Controllers accept DTO-validated bodies, delegate to services, which in turn orchestrate Prisma Client operations. Guards and interceptors enforce authentication, RBAC, and request context population.
- **Frontend Layers**: App Router segments isolate role-specific dashboards. Shared hooks (`useCompanyProgrammes`, `useProgrammeDetail`, `useUpdateProgramme`, etc.) encapsulate API/mocks, while UI components focus on rendering consistent experiences regardless of data source.
- **Shared Contracts**: `packages/api-contracts` exports TypeScript DTOs consumed by both apps, ensuring compile-time parity between backend responses and frontend expectations.

## Database Schema Snapshot (Prisma Models)
- **User**: Core identity with email, hashed password, name, and `role` enum (`SUPER_ADMIN`, `NGO`, `COMPANY`, `DONOR`). Relations to specific profile tables.
- **NGOProfile / CompanyProfile / DonorProfile**: Store regulatory, compliance, and contact details linked 1:1 with `User` via `userId`.
- **Campaign**: CSR/NGO campaign metadata including category enum, goal amounts, timeframe, and owning organisation.
- **Donation**: Records donor contributions with amount, currency, linked campaign, and company/NGO references for reporting.
- **BankDetail**: Stores bank verification data tied to organisations for payout compliance.
- **Document**: Tracks uploaded compliance documents with type enum (PAN, registration certificates, etc.) and status fields.
- **Address**: Normalised postal addresses reusable across profiles, campaigns, and compliance artefacts.
- **AuditLog**: Captures actorId, entity references, actions, and metadata for traceability.

## Data Flow & Integration Notes
- Frontend mutations map directly to backend DTOs: create/update/status/assign flows share consistent payload structures.
- Feature flags allow staged rollout: mocks remain default while services mature, ensuring zero downtime when toggling API consumption.
- Prisma migrations maintain government-compliant relations; auto-profile creation at registration guarantees referential integrity across user types.

Keep this document updated alongside schema or architecture changes so onboarding teammates can reference the current technology landscape at a glance.
