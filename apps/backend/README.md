# ImpactBridge Backend (NestJS + Prisma)

ImpactBridge is a compliance-focused CSR platform that connects NGOs, companies, donors, and administrators. The backend manages onboarding, campaign funding, impact tracking, utilization reporting, and CSR summaries so every rupee is auditable end to end.

## Quick Start
1. Install dependencies
   ```bash
   npm install
   ```
2. Provide `DATABASE_URL` (Neon PostgreSQL) in your environment.
3. Generate Prisma client & run migrations
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```
4. Start the server
   ```bash
   npm run start:dev
   ```
5. Build & lint before handoff
   ```bash
   npm run lint
   npm run build
   ```

## Key Modules
- **Auth & Invitations** – registration, login, invite acceptance, JWT guards.
- **Users & Profiles** – self-service profile updates, auto-created NGO/company/donor profiles.
- **Compliance** – NGO address, bank, documents, verification workflow.
- **Campaigns** – creation (verified NGOs), public listing, milestones, impact metrics.
- **Donations & Receipts** – authenticated + public donations, histories, receipt uploads.
- **CSR** – company CSR budget tracking, utilization reports, annual CSR summaries.
- **Utilization & Impact** – fund usage reporting with proofs, campaign/milestone outcome metrics.
- **Analytics & Admin** – platform stats, profile listings, global activity logging.

## Documentation
- `docs/API_TESTING_GUIDE.md` – endpoint payloads & responses.
- `docs/POSTMAN_TESTING.md` – quick reference for Postman.
- `docs/POSTMAN_AUTOMATION.md` – Collection Runner/Newman usage.
- `docs/PROJECT_FULL_STATUS.md` – non-technical status summary.
- `PROJECT_MASTER_CONTEXT.md` – architectural context.

## Postman Collection
- File: `docs/postman/impactbridge.postman_collection.json`
- Base URL: `http://localhost:3000`
- Auto-injects JWT tokens, captures campaign/milestone IDs.
- Includes folders for Auth, NGO, Milestones, Impact, Utilization, CSR, Admin, and an Automation Flow placeholder.

## Workflow Guidelines
- Follow controller → service → Prisma layering; no business logic in controllers.
- Use DTOs with `class-validator` for every request body.
- Update `AGENTS.md` after each logical change.
- Ensure `npm run lint` and `npm run build` pass before delivery.

## Automation Script
- `docs/scripts/postman-automation.js` – runs the Postman collection through Newman.
  ```bash
  npm install -g newman
  node docs/scripts/postman-automation.js
  ```

## Pending Enhancements
- Company–NGO project approvals (service scaffolding pending).
- NGO financial reporting endpoints.
- Pagination/search across admin lists.
- Soft delete policies and automated notifications.
- Automated integration tests.

For detailed change history, see `AGENTS.md`.
