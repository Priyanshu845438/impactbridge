# Prisma Seeding and Migration Playbook

This guide defines how we seed data across environments and how migrations are promoted from local development through staging into production. The goal is to avoid schema drift, guarantee reproducible data snapshots, and make rollback expectations explicit.

---

## Seeding Strategy

| Environment | Purpose | Seed Contents | Example Command |
| --- | --- | --- | --- |
| Local Development | Provide developers a realistic dataset for feature work. | Core reference data (roles, feature toggles), small sample entities per module, optional mock users for manual testing. | `npx prisma db seed --schema prisma/schema.prisma`
| Automated Tests | Ensure deterministic unit/integration tests. | Minimal fixtures scoped to the test suites (baseline users, auth tokens, NGO/company profiles). Idempotent and quick to apply. | `npx prisma db seed --schema prisma/schema.prisma --preview-feature`
| Demo / Mock | Power demos without exposing real data. | Synthetic NGOs, companies, campaigns, donation snapshots flagged as demo-only. | `ENV=demo npx prisma db seed --schema prisma/schema.prisma`

### Seed Implementation Guidelines

- Keep seed logic in `prisma/seed.ts` with environment-aware branching.
- Use idempotent create-or-update operations to support repeated runs.
- Never commit secrets or live PII to seed files.
- Align seed data with business narratives so demos remain credible.

### Validating Seeds Without Running Them

```
# Type-check the seed script
npx ts-node --files prisma/seed.ts --dry-run

# Generate a seed plan without executing writes
npx prisma db seed --schema prisma/schema.prisma --dry-run
```

---

## Migration Flow (Staging vs Production)

### Roles & Responsibilities

- Feature Developers: generate migrations locally (`npx prisma migrate dev --name <change>`) and ensure tests pass.
- Backend Maintainer / Reviewer: review migration SQL and confirm backward compatibility plus seed alignment.
- Release Engineer / DevOps: execute migrations on staging/production and monitor rollout health.

### Environment Promotion Steps

1. **Local Development**
   - Run `npx prisma migrate dev --name <change>`.
   - Run `npx prisma db seed` for local verification.
   - Commit migration SQL and regenerated Prisma client.
2. **Continuous Integration**
   - CI executes `npx prisma migrate deploy --preview-feature` against a disposable database.
   - Pipelines fail on migration errors or pending conflict.
3. **Staging**
   - Release engineer runs `npx prisma migrate deploy` using staging credentials.
   - Optionally pre-seed staging via `ENV=demo npx prisma db seed`.
   - Perform smoke/e2e tests prior to sign-off.
4. **Production**
   - Triggered only after staging approval.
   - Run `npx prisma migrate deploy` during a controlled window or release pipeline.
   - On-call acknowledges start/end and monitors metrics.

### Rollback Policy

- Rollbacks are permitted on staging only; production rollbacks require incident review because Prisma migrations are forward-only.
- To revert staging: restore from snapshot or rerun `npx prisma migrate resolve --rolled-back <migration>` after manual DB restoration.
- Production failure response:
  1. Halt deploy pipeline.
  2. Restore from latest backup.
  3. Mark applied migrations with `npx prisma migrate resolve --applied <migration>` if needed.
  4. Prepare a new forward migration to correct issues before reattempting deploy.

### Failure Handling Checklist

1. Capture logs from `prisma-migrate-engine` and database error output.
2. Verify credentials / connection strings.
3. Detect schema drift by running `npx prisma db pull` on staging; compare with version-controlled schema.
4. If drift exists, reconcile manually, update the schema, and create a corrective migration.

---

## Reference Commands (Do Not Execute Here)

```
# Generate a new migration locally
npx prisma migrate dev --name add_new_feature

# Apply committed migrations to staging/production
DATABASE_URL=$STAGING_URL npx prisma migrate deploy

# Seed database for demo environment
ENV=demo npx prisma db seed

# Mark a failed migration as rolled back (after restore)
npx prisma migrate resolve --rolled-back 20250101090000_add_table

# Inspect pending migrations
npx prisma migrate status
```

---

## Operational Tips

- Keep migrations small; avoid bundling unrelated schema work.
- Always run `npx prisma generate` after migrations so TypeScript types stay current.
- Document manual data backfills or SQL steps in migration comments or release notes.
- Coordinate with frontend teams when schema changes affect DTOs or API contracts.
- Maintain staging parity with production configuration (feature flags, ENV vars) to surface issues before release.
