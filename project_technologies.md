# Project Technologies Overview

## Frontend Technology Stack
- **Framework**: Next.js 14 (App Router) with TypeScript for end-to-end type safety.
- **Styling**: Tailwind CSS v3 utility classes with component-scoped styles and responsive layouts.
- **State & Data**: React Query for server-state caching, optimistic mutations, and custom hooks switching between live API and safe fallbacks.
- **UI & Accessibility**: Accessible Radix UI primitives, Lucide icons, and Sonner toast alerts.
- **Testing**: Jest + React Testing Library for component and hook unit tests with custom accessibility assertion utilities.
- **Build & Tooling**: Root npm workspaces orchestrating multi-project build, lint, and test execution.

## Backend Technology Stack
- **Framework**: NestJS with modular architecture (controllers → services → Prisma ORM) enforcing strict separation of concerns.
- **Language & Runtime**: TypeScript targeting Node.js 18+, utilizing decorators, pipes, filters, and interceptors.
- **Database & ORM**: Prisma ORM with an **embedded SQLite database** (`file:./dev.db`) for zero-dependency local development, with direct compatibility for MySQL / PostgreSQL in staging and production environments.
- **Auth & Security**: Bcrypt for salt-based password hashing, stateless JSON Web Tokens (JWT), custom `JwtAuthGuard`, `RolesGuard`, and strict RBAC decorators.
- **Configuration & Secrets**: Centralized `SystemSettingsModule` for runtime configuration of Cloud Storage (S3/R2/MinIO), Mail gateways (Resend/SendGrid/SES), Payment providers (Razorpay/Stripe), and statutory CSR rules.
- **Testing**: Jest-powered unit suites and Supertest integration suites across auth, approvals, analytics, and financial-reconciliation flows.

## High-Level Application Flow
1. **Authentication & Session**: Clients call `/api/v1/auth/login`; passwords are validated with Bcrypt, signed JWTs issued, and guards enforce role-specific permissions.
2. **Admin Configuration**: Super Admins dynamically configure system credentials (storage, mail, payments, CSR rules, and feature flags) via `/dashboard/admin/settings` without requiring server restarts.
3. **Approvals State Machine**: Pending CSR programmes and grant requests are submitted, reviewed, approved, rejected (with required remarks), or revoked through a managed audit pipeline.
4. **NGO Statutory Compliance**: NGOs upload mandatory statutory certificates (12A, 80G, FCRA, CSR-1) and financial reports with validation and tracking.
5. **CSR Programme Lifecycle**: Corporate donors discover verified NGOs, commit budgets according to Section 135 thresholds, and release tranche disbursements against verified milestones.
6. **Activity & Audit Logging**: High-value state transitions emit structured audit entries capturing the actor, action, timestamp, and metadata.

## Database Schema Snapshot (Prisma Models)
- **User**: Core identity with email, hashed password, name, and `Role` enum (`SUPER_ADMIN`, `NGO`, `COMPANY`, `DONOR`).
- **NGOProfile / CompanyProfile / DonorProfile**: Dedicated domain profiles storing statutory compliance, organization identifiers, and contact details linked 1:1 to `User`.
- **SystemSetting**: Dynamic key-value configuration store with encryption/masking metadata and category groupings.
- **Campaign**: CSR and NGO social initiatives with categorization, financial targets, and execution timeframes.
- **Donation**: Records contributions with amount, currency, linked campaign, donor reference, and audit state.
- **BankDetail**: Financial settlement and IFSC/account verification data for statutory payout compliance.
- **Document**: Tracks compliance documents with verification status, file URLs, and expiration dates.
- **Address**: Postal address representation reusable across profiles and compliance artifacts.
- **AuditLog**: Immutable action log capturing actor ID, entity target, action verb, and event metadata.

## Monorepo Architecture
- **Workspaces**: Managed via npm workspaces (`apps/backend`, `apps/frontend`, `packages/api-contracts`).
- **Shared Contracts**: `@impactbridge/api-contracts` provides single-source-of-truth TypeScript definitions for DTOs and Enums across client and server.

