# API Testing Guide – ImpactBridge Backend

This guide captures manual verification steps for all exposed APIs. Use the bundled Postman collection at `docs/postman/impactbridge.postman_collection.json` for convenience.

## Prerequisites
- Backend running at `http://localhost:3000` (`npm run start:dev`).
- Database reachable (Prisma configured).
- `JWT_SECRET` exported (e.g., `export JWT_SECRET=dev-secret`).
- Postman environment variables:
  - `baseUrl` – defaults to `http://localhost:3000`.
  - `token`, `userId`, `ngoId`, `companyId`, `donorId` (set during requests).

---

## Auth
1. **POST /auth/register** – create SUPER_ADMIN/NGO/COMPANY/DONOR users.
2. **POST /auth/login** – returns `user` + `accessToken` (store token for later use).
   - Negative: wrong password → 400 `Invalid credentials`.

---

## Self-Service (Requires JWT)
3. **GET /users/me** – returns sanitized profile (no password).
4. **PATCH /users/me** – update non-sensitive fields; validation errors on bad payloads.
5. **POST /users/change-password** – verify old password, update to new one.
6. **POST /address/ngo** – NGO role only; upsert registered address.
7. **POST /bank/ngo** – NGO role only; upsert bank details (masked account number returned).

---

## Admin Insights (RBAC)
8. **GET /users/ngos/:id** – SUPER_ADMIN/COMPANY; sanitized NGO details.
9. **GET /users/companies/:id** – SUPER_ADMIN/NGO; sanitized company details.
10. **GET /users/ngos-with-campaigns** – SUPER_ADMIN/COMPANY; NGO list with campaigns.
11. **GET /users/companies-with-reports** – SUPER_ADMIN; companies with donation + campaign info.
12. **GET /users/admin/ngos** – SUPER_ADMIN; NGO profiles with documents, bank, addresses.
13. **GET /users/admin/companies** – SUPER_ADMIN; company profiles with documents/bank/addresses.
14. **GET /users/admin/donors** – SUPER_ADMIN; donor profiles with addresses.

---

## Public / Legacy Users (to consolidate)
15. **GET /users** – legacy list (may include raw data).
16. **GET /users/:id** – legacy detail fetch.

---

## Negative Scenarios
- Missing token → 401 Unauthorized.
- Role mismatch (e.g., NGO hitting admin route) → 403 Forbidden.
- Validation errors display field-specific messages from `ValidationPipe`.

---

## Automation Tips
- Import Postman collection and env; collection stores tokens automatically after login.
- Add tests to verify masked account numbers (e.g., regex check).
- Consider scripting setup/teardown requests when tests expand.

