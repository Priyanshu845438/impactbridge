# ImpactBridge — Open-Source CSR & Non-Profit Governance Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

**ImpactBridge** is an open-source Digital Public Infrastructure (DPI) platform designed to eliminate fraud, administrative friction, and opacity in Corporate Social Responsibility (CSR) partnerships and statutory non-profit governance.

---

## 🎯 Purpose & Mission

In jurisdictions like India (**Section 135 of the Companies Act, 2013**), qualifying enterprises are legally mandated to allocate **at least 2% of their average net profit** to social development and CSR initiatives. However, corporate CSR divisions and Non-Governmental Organisations (NGOs) face significant challenges:

- **Verification Bottlenecks**: Verifying NGO legal identities, tax exemptions (12A, 80G in India), PAN, and statutory registration numbers is manual and error-prone.
- **Fund Leakage & Greenwashing**: Middlemen and lack of milestone tracking obscure where corporate capital actually goes.
- **Reporting Overhead**: NGOs spend excessive resources compiling ad-hoc reports rather than executing their ground mission.

**ImpactBridge provides an open, auditable, and neutral platform** where:
1. **Companies** discover verified NGOs, plan CSR budgets, disburse milestone-gated funding, and generate MCA-compliant statutory filings.
2. **NGOs** maintain compliance profiles, manage project milestones, and submit verifiable utilisation certificates.
3. **Auditors & Reviewers** inspect project progress and expenditure proofs with immutable audit logging.
4. **Donors & Public** inspect direct impact metrics and download verifiable receipts.

---

## 🏗️ Architecture Overview

ImpactBridge is structured as a TypeScript monorepo with strict contract parity:

- **`packages/api-contracts`**: Single source of truth for DTOs, interfaces, and enums shared between the frontend and backend.
- **`apps/backend`**: Modular NestJS backend powered by Prisma ORM. Includes authentication (RBAC), user profiles, approvals, CSR programme lifecycle, notifications, financial reconciliation, and activity audit logging.
- **`apps/frontend`**: Next.js 14 App Router client with Tailwind CSS, accessible Radix primitives, React Query server-state caching, and feature flag gating.

```text
├── apps/
│   ├── backend/         # NestJS server (Prisma ORM, SQLite in dev, MySQL in prod)
│   └── frontend/        # Next.js 14 client (App Router, Tailwind CSS, Shadcn)
├── packages/
│   └── api-contracts/   # Shared DTOs and Enums (cross-app parity)
├── docker-compose.yml   # Optional MySQL service for production parity
├── package.json         # Monorepo root workspace configuration
└── tsconfig.json        # Unified TypeScript project references
```

---

## 🚀 Quick Start (Zero External Database Required)

ImpactBridge features an **embedded in-code SQLite database** (`file:./dev.db`) for frictionless local development. You can clone the repo and begin developing without running external database servers.

### 1. Prerequisites
- **Node.js**: v18 or v20+
- **npm**: v9 or v10+

### 2. Setup & Database Seeding

Run the setup commands:
```bash
# 1. Build the shared API contracts
cd packages/api-contracts
npm install
npm run build

# 2. Set up the backend with embedded SQLite database
cd ../../apps/backend
npm install
npm run prisma:generate
npm run db:push     # Automatically creates and syncs apps/backend/prisma/dev.db
npm run db:seed     # Seeds Super Admin: admiin@acadifysolution.com / Acadify@2026!

# 3. Set up the frontend
cd ../frontend
npm install
```

### 3. Running Locally

Open two terminal windows:
- **Backend API**: `cd apps/backend && npm run start:dev` (Runs on `http://localhost:3000`)
- **Frontend App**: `cd apps/frontend && npm run dev` (Runs on `http://localhost:3400`)

Super Admin login credentials:
- **Email**: `admiin@acadifysolution.com`
- **Password**: `Acadify@2026!`

---

## 🧪 Testing & Validation

All test suites and production builds can be executed per workspace or repository-wide:

```bash
# From repository root:
npm test                   # Runs backend and frontend test suites
npm run lint:frontend      # Runs frontend ESLint checks
npm run build              # Builds contracts, backend, and frontend production bundles

# Individual workspaces:
cd apps/backend && npm test
cd apps/frontend && npm test
```

---

## 🔌 Switching to Production Database (MySQL)

When deploying to staging or production:
1. In `apps/backend/prisma/schema.prisma`, set `provider = "mysql"`.
2. In `apps/backend/.env`, set `DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"`.
3. Run `npm run prisma:generate && npm run db:push` in `apps/backend`.

You can also spin up the production-parity MySQL 8 container using Docker Compose:
```bash
docker-compose up -d
```

---

## 📄 License

ImpactBridge is licensed under the [MIT License](LICENSE).
