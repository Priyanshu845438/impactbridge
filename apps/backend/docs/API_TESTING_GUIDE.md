# API Testing Guide – ImpactBridge Backend

This guide documents manual verification steps for every publicly exposed API. All examples assume:

- Backend runs locally at `http://localhost:3000` via `npm run start:dev`.
- Database is reachable (Prisma configured).
- Environment variable `JWT_SECRET` exported, e.g. `export JWT_SECRET=dev-secret`.
- Use Postman or any REST client. A ready-to-import Postman collection is provided in `docs/postman/impactbridge.postman_collection.json`.

## Global Setup

1. Create a Postman environment with variables:
   - `baseUrl` = `http://localhost:3000`
   - `adminEmail`, `adminPassword`, etc., for reuse.
2. For protected requests, capture the JWT (`accessToken`) from the login response and store it as `token` in the environment. Configure an Authorization header template: `Bearer {{token}}`.

---

## Auth Module

### 1. Register User
- **Method:** `POST`
- **URL:** `{{baseUrl}}/auth/register`
- **Body:**
```json
{
  "name": "Alice Admin",
  "email": "alice@example.com",
  "password": "password123",
  "role": "SUPER_ADMIN"
}
```
- **Expected:** 201/200 with created user (password omitted).
- **Negative Tests:**
  - Duplicate email → 400 with message `Email already registered`.
  - Invalid payload (missing fields, invalid email) → validation errors via `ValidationPipe`.

### 2. Login User
- **Method:** `POST`
- **URL:** `{{baseUrl}}/auth/login`
- **Body:**
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```
- **Expected:** 200 with `user` object and `accessToken` (JWT, 1 day expiry).
- **Negative Tests:** wrong password or unknown email → 400 `Invalid credentials`.

---

## User Module (Self-Service)

### 3. Get Own Profile
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users/me`
- **Auth:** Bearer `{{token}}`
- **Expected:** 200 with sanitized user profile.

### 4. Update Own Profile
- **Method:** `PATCH`
- **URL:** `{{baseUrl}}/users/me`
- **Auth:** Bearer `{{token}}`
- **Body (example):**
```json
{
  "phone": "+1234567890",
  "address": "221B Baker Street"
}
```
- **Expected:** Updated profile (no password field).
- **Negative Tests:** invalid field type (e.g., number for `phone`) → validation error.

---

## Users Module (Admin / Platform Management)

### 5. Create User (admin tools)
- **Method:** `POST`
- **URL:** `{{baseUrl}}/users`
- **Body:** `CreateUserDto`
- **Expected:** 201 with created user (password included by default service; sanitize manually if needed). *Note:* This legacy module may require platform guard alignment later.

### 6. List Users
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users`
- **Expected:** 200 with array of users (current implementation returns raw data). Future task: align with sanitized outputs.

### 7. Get User by ID
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users/{id}`
- **Expected:** 200 with user or 404 if not found.

### 8. Update User by ID
- **Method:** `PATCH`
- **URL:** `{{baseUrl}}/users/{id}`
- **Body:** `UpdateUserDto`
- **Expected:** Updated user record.

### 9. Delete User by ID
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/users/{id}`
- **Expected:** Deleted record confirmation.

### 10. Change Password
- **Method:** `POST`
- **URL:** `{{baseUrl}}/users/change-password`
- **Auth:** Bearer `{{token}}`
- **Body:**
```json
{
  "oldPassword": "password123",
  "newPassword": "newSecret456"
}
```
- **Expected:** 200 success. Subsequent login must use new password.
- **Negative Tests:** wrong old password → 400 `Invalid existing password`.

### 11. Get NGO Profile (Admin / Company View)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users/ngos/{id}`
- **Auth:** Bearer `{{token}}` with role `SUPER_ADMIN` or `COMPANY`.
- **Expected:** Sanitized NGO profile or 404.

### 12. Get Company Profile (Admin / NGO View)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users/companies/{id}`
- **Auth:** Bearer `{{token}}` with role `SUPER_ADMIN` or `NGO`.
- **Expected:** Sanitized company profile or 404.

---

## Public User APIs

### 13. Public Profile Lookup
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users/{id}` (implemented in `user.controller`)
- **Expected:** Sanitized profile. 404 if not found.

### 14. List Users (Public)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/users` (user module). Current behavior returns all users; add filtering and auth later.

> **Note:** The coexistence of `user/` and `users/` modules is known. Future refactor should consolidate them for consistency.

---

## Test Matrix Summary

| Endpoint | Method | Auth | Roles | Status Checks |
| -------- | ------ | ---- | ----- | ------------- |
| `/auth/register` | POST | None | n/a | 201, 400 |
| `/auth/login` | POST | None | n/a | 200, 400 |
| `/users/me` | GET | JWT | Any | 200, 401 |
| `/users/me` | PATCH | JWT | Any | 200, 400 |
| `/users/change-password` | POST | JWT | Any | 200, 400 |
| `/users` | GET | None | n/a | 200 |
| `/users/:id` | GET | None | n/a | 200, 404 |
| `/users` | POST | None | n/a | 201 |
| `/users/:id` | PATCH | None | n/a | 200 |
| `/users/:id` | DELETE | None | n/a | 200 |
| `/users/ngos/:id` | GET | JWT | SUPER_ADMIN, COMPANY | 200, 403, 404 |
| `/users/companies/:id` | GET | JWT | SUPER_ADMIN, NGO | 200, 403, 404 |

Ensure negative scenarios (missing token, insufficient role) respond with appropriate status (`401 Unauthorized`, `403 Forbidden`).

---

## Automation Tips

- Use the provided Postman collection for scripted testing.
- Chain requests: register → login → set token → call protected endpoints.
- For CI, consider adding `npm run test` or e2e tests covering the same flows when DB access is available.
