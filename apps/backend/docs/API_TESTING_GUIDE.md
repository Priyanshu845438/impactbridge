# API Testing Guide – ImpactBridge Backend

Use this guide with the Postman collection at `docs/postman/impactbridge.postman_collection.json`. The collection sets `{{base_url}} = http://localhost:3000` and automatically stores the JWT token after login.

## Prerequisites
- Backend running (`npm run start:dev`) with database access.
- Environment variables: `JWT_SECRET`, database connection string.
- Postman environment (or collection variables) for IDs as needed (`userId`, `ngoId`, etc.).

---

## Auth
1. **POST /auth/register** – create SUPER_ADMIN/NGO/COMPANY/DONOR users.
2. **POST /auth/login** – returns `user` + `accessToken`. Token stored in collection variable `token` for subsequent requests.
   - Negative: wrong credentials → 400 `Invalid credentials`.

---

## Self-Service (Requires JWT)
3. **GET /users/me** – fetch sanitized profile.
4. **PATCH /users/me** – update personal details (body requires optional fields like `phone`).
5. **POST /users/change-password** – verify old password and set new password.
6. **POST /address/ngo** – NGO role only; upsert registered address (body requires `line1`, `district`, `state`, `pincode`, `country`).
7. **POST /bank/ngo** – NGO role only; upsert bank details. Response masks account number.

---

## Admin Insights (RBAC)
8. **GET /users/ngos/:id** – SUPER_ADMIN/COMPANY roles; returns sanitized NGO.
9. **GET /users/companies/:id** – SUPER_ADMIN/NGO roles; returns sanitized company.
10. **GET /users/ngos-with-campaigns** – SUPER_ADMIN/COMPANY; NGO list with campaigns.
11. **GET /users/companies-with-reports** – SUPER_ADMIN; companies with donations + campaigns.
12. **GET /users/admin/ngos** – SUPER_ADMIN; detailed NGO profiles (documents, bank, addresses).
13. **GET /users/admin/companies** – SUPER_ADMIN; detailed company profiles.
14. **GET /users/admin/donors** – SUPER_ADMIN; donor profiles with addresses.

---

## Legacy Users (To Sunset)
15. **GET /users** – legacy listing (unsanitized). Use only for audits.
16. **GET /users/:id** – legacy detail fetch.

---

## Negative Test Checklist
- Missing `Authorization` header → 401 Unauthorized.
- Insufficient role → 403 Forbidden.
- Invalid DTO payload → validation errors (400) with field messages.

---

## Automation Tips
- Import collection and run folder sequences (Auth → Self-Service → Admin).
- Extend collection tests for masked account numbers (`****1234`).
- Add scripts to seed sample NGO/company IDs when campaigns/donations modules expand.

