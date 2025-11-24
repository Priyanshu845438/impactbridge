# Postman Automation Guide – ImpactBridge Backend

This guide explains how to automate API scenarios using the ImpactBridge Postman collection.

## 1. Prerequisites
- Import `docs/postman/impactbridge.postman_collection.json` into Postman.
- Ensure environment variables:
  - `base_url = http://localhost:3000`
- Database seeded with required data (NGO/company accounts, campaigns, etc.).

## 2. Collection Runner Setup
1. Open the collection → click **Run Collection**.
2. Select the desired folder (e.g., `Auth`, `NGO Self-Service`, `CSR`).
3. Enable **Save responses** if you want to inspect outputs after the run.
4. Optionally provide data files (CSV/JSON) if you need multiple iterations.

## 3. Automation Script (Pre-request/Test)
The collection ships with scripts to:
- Inject `Authorization: Bearer <token>` header automatically if `{{token}}` exists.
- Capture login tokens, campaign IDs, milestone IDs, invitation tokens, etc., via `pm.collectionVariables`.

## 4. Example Automated Flow
1. **Auth Folder** – register & login; token stored automatically.
2. **NGO Self-Service** – update profile, submit compliance data, create campaign.
3. **Milestones** – create milestone, update status, list milestones.
4. **Impact Metrics** – submit metrics linked to milestone.
5. **Utilization Reports** – submit fund utilization, list campaign/milestone reports.
6. **CSR** – update budget/spent; generate CSR summary.
7. **Admin** – verify NGO, view analytics, utilization ledger.

Collection Runner executes the above sequentially; any assertion failure highlights the failing request.

## 5. CLI Automation (Newman)
Optionally use Newman to run the collection headless:
```bash
newman run docs/postman/impactbridge.postman_collection.json \
  --env-var base_url=http://localhost:3000 \
  --reporters cli
```

## 6. Maintenance Notes
- When new endpoints are added, update the collection, ensure variables/tests capture IDs appropriately.
- Keep a single source of truth (`POSTMAN_TESTING.md`) for request payloads.
- For complex flows (e.g., CSR summary), add Postman tests verifying key fields exist.
