# ImpactBridge Backend (NestJS + Prisma)

ImpactBridge is a compliance-focused CSR platform that connects NGOs, companies, donors, and administrators. The backend provides authentication, profile management, CSR programme lifecycles, approval workflows, statutory financial reconciliation, activity audit logging, and dynamic system settings.

## 🚀 Quick Start (Embedded SQLite for Local Development)

The backend is configured with an **embedded in-code SQLite database** (`file:./dev.db`) so no external MySQL server or Docker container is needed for local development:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Generate Prisma Client & Sync Database**:
   ```bash
   npm run prisma:generate
   npm run db:push
   ```
3. **Seed Super Admin & Platform Default Settings**:
   ```bash
   npm run db:seed
   ```
   *Default Admin*: `admiin@acadifysolution.com` / `Acadify@2026!` (Role: `SUPER_ADMIN`).
4. **Start the Development Server**:
   ```bash
   npm run start:dev
   ```
   Server starts on `http://localhost:3000` (Global prefix: `/api/v1`).

## 🔑 Production Database (MySQL)

To switch to production MySQL:
1. In `prisma/schema.prisma`, update `datasource db { provider = "mysql" ... }`.
2. In `.env`, provide your production connection string: `DATABASE_URL="mysql://USER:PASS@HOST:3306/DB_NAME"`.
3. Run `npm run prisma:generate && npm run db:push`.

## 📦 Key Domain Modules

- **Auth (`src/auth`)**: JWT-based stateless authentication, bcrypt password hashing, `JwtAuthGuard`, and `RolesGuard`.
- **System Settings (`src/system-settings`)**: Centralized key-value configuration console for Cloud Storage, Email gateways, Payment providers, CSR regulatory thresholds, and dynamic Feature Flags.
- **Approvals (`src/approvals`)**: Multi-step state machine (`request`, `approve`, `reject`, `revoke`) with audit remarks and notification emission.
- **CSR Programme (`src/csr-programme`)**: Company CSR initiatives, budget planning, partner NGO assignments, and milestone tracking.
- **Financial & Reconciliation (`src/financial`)**: NGO financial report ingestion, period validation, ledger checks, and disbursement reconciliation.
- **Analytics (`src/analytics`)**: High-performance aggregation service computing platform KPIs, donation timelines, and sector-wise distribution.
- **Users & Profiles (`src/user`)**: User entity management and 1:1 profiles for NGOs, Companies, and Donors.
- **Notifications (`src/notifications`)**: Resilient notification intent queue with automatic exponential backoff retry mechanics.

## 🧪 Testing & Validation

```bash
# Run unit & integration test suites (31 suites, 149 tests passing)
npm test

# Run build compilation check
npm run build

# Run lint checks
npm run lint
```

## 📚 Documentation Index

Refer to the documents in `docs/` for deeper operational and architectural context:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — System architecture, module layout, and data flow.
- [API_GUIDE.md](docs/API_GUIDE.md) — HTTP surface, route versioning, authentication headers, and core endpoints.
- [OPERATIONS.md](docs/OPERATIONS.md) — In-process caching, guardrails, performance notes, and troubleshooting.
- [CHANGELOG.md](docs/CHANGELOG.md) — Changelog of notable backend updates.
- [Postman Collection](docs/postman/impactbridge.postman_collection.json) — Importable collection for API verification.
