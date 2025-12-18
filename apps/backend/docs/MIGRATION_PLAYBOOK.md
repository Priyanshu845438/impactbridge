# Prisma Migration Playbook

This playbook captures the operational steps for running Prisma migrations safely across environments. Follow the checklists exactly to avoid schema drift or data loss.

---

## 1. Golden Rules
- Never run migrations directly against production without an approved change request.
- Every migration must be peer-reviewed and linked to an `agents.md` entry and ticket ID.
- Keep the `prisma/schema.prisma` file as the single source of truth; never hand-edit generated SQL files.
- Prefer additive, backwards-compatible changes. Breaking changes require a documented rollback strategy and scheduled downtime window.

---

## 2. Local Development Flow
1. Pull latest `main` and ensure `npm install` has been run.
2. Update `DATABASE_URL` in `.env` to point at your local Postgres instance.
3. Modify `prisma/schema.prisma` as required.
4. Generate a named migration:
   ```bash
   npx prisma migrate dev --name <short_feature_name>
   ```
5. If data seeding is required, update `prisma/seed.ts` or relevant scripts.
6. Run unit tests and linting:
   ```bash
   npm run test -- --runInBand
   npm run lint
   ```
7. Update documentation (`PROGRESS_CHECKLIST.md`, `agents.md`, relevant guides).
8. Commit the changed schema + migration SQL files.

Rollback (local):
```bash
npx prisma migrate reset
```
This command resets the database and re-applies all migrations. **Only use locally** because it drops all data.

---

## 3. Shared Integration Environment
Used for QA/UAT or staging.

### Apply
1. Tag the commit or branch to be deployed.
2. Confirm `DATABASE_URL` points to the integration database (never check credentials into git).
3. Run migrations in deploy mode:
   ```bash
   npx prisma migrate deploy
   ```
4. Run smoke tests (Postman collection or automated suite).
5. Notify QA that the environment has been updated.

### Rollback
- Preferred approach: deploy the previous known-good build and run `npx prisma migrate deploy` again (Prisma tracks applied migrations).
- If a breaking migration was deployed accidentally, create a corrective migration that restores the prior schema. Avoid manual SQL changes whenever possible.

---

## 4. Production Environment
Production changes require change-management approval.

### Pre-Deployment Checklist
- ✔️ Migration reviewed by senior engineer.
- ✔️ Rollback plan documented (down-migration or compensating change).
- ✔️ Monitoring/alerting ready (Datadog/Logs).
- ✔️ Communication drafted for stakeholders (downtime window if needed).

### Apply
1. Put the deployment into maintenance mode if downtime is expected.
2. Ensure `DATABASE_URL` references the production writer endpoint.
3. Execute migrations in deploy mode:
   ```bash
   npx prisma migrate deploy
   ```
4. Run targeted smoke tests (`npm run test -- service` or Postman regression).
5. Exit maintenance mode and announce completion.

### Rollback
1. If the migration introduced issues but data is intact, deploy the previous application build (migrations will be skipped because they are already recorded).
2. If schema changes must be undone, craft an explicit rollback migration (e.g., `npx prisma migrate dev --create-only` to scaffold SQL) and run it via `npx prisma migrate deploy`. Keep records of both migrations for compliance.
3. Document the incident in `AGENTS.md` and the incident response log.

---

## 5. Environment Matrix
| Environment | Database | Command | Notes |
|-------------|----------|---------|-------|
| Local | Developer Postgres | `npx prisma migrate dev` | Can drop data freely |
| Integration / Staging | Managed Postgres (shared) | `npx prisma migrate deploy` | No destructive resets |
| Production | Primary Postgres (HA) | `npx prisma migrate deploy` | Requires change approval |

---

## 6. Data Backfill & Hotfixes
- For data backfills, use Prisma scripts or SQL files checked into `scripts/` with idempotent logic.
- Hotfix migrations should be rare. If unavoidable, follow the same review/approval process and update this playbook with lessons learned.

---

## 7. Reference Commands
```bash
# Create a new migration without applying (useful for review)
npx prisma migrate dev --create-only --name <name>

# Show migration status
npx prisma migrate status

# Generate Prisma client (after schema change)
npx prisma generate
```

---

## 8. FAQ
**Q:** Can we edit generated SQL files?
**A:** Only for corrective statements that Prisma cannot represent. Document any manual edits in the migration README and `AGENTS.md`.

**Q:** How do we handle long-running migrations?
**A:** Run them during a maintenance window. Consider breakpoints (multiple smaller migrations) to minimise locks.

**Q:** What about feature branches?
**A:** Prefer rebasing instead of merging multiple divergent migration histories. If conflicts occur, regenerate migrations against the latest `main`.

---

Maintain this document alongside every structural database change.
