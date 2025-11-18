# API Testing Guide – Auth & Users Module

This guide walks through verifying the ImpactBridge authentication and user profile APIs using Postman. All endpoints assume the backend runs at `http://localhost:3000`, the database is reachable, and `JWT_SECRET` is configured.

## Prerequisites

- Backend running via `npm run start:dev`
- `JWT_SECRET` environment variable exported (e.g. `export JWT_SECRET=dev-secret`)
- Postman or similar REST client

## 1. Register User

**Method:** POST  
**URL:** `http://localhost:3000/auth/register`

### Request Body (JSON)
```json
{
  "name": "Alice Admin",
  "email": "alice@example.com",
  "password": "password123",
  "role": "SUPER_ADMIN"
}
```

### Expected Response
- Status 201 (or 200) with JSON payload excluding password:
```json
{
  "id": "<uuid>",
  "name": "Alice Admin",
  "email": "alice@example.com",
  "role": "SUPER_ADMIN",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>"
}
```

### Negative Tests
- Reusing the same email → `400 Bad Request` (`Email already registered`).
- Missing fields → validation error from global `ValidationPipe`.

## 2. Login User

**Method:** POST  
**URL:** `http://localhost:3000/auth/login`

### Request Body (JSON)
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

### Expected Response
```json
{
  "user": {
    "id": "<uuid>",
    "name": "Alice Admin",
    "email": "alice@example.com",
    "role": "SUPER_ADMIN",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  },
  "accessToken": "<jwt-token>"
}
```

### Negative Tests
- Wrong password or unknown email → `400 Bad Request` (`Invalid credentials`).

## 3. Using the JWT

- Copy `accessToken` from the login response.
- Include header `Authorization: Bearer <accessToken>` for protected endpoints.
- `JwtAuthGuard` validates the token; `RolesGuard` honours `@Roles(...)` metadata to enforce RBAC.

### Role-Based Lookups
- `GET /users/ngos/{id}` → Requires token from SUPER_ADMIN or COMPANY.
- `GET /users/companies/{id}` → Requires token from SUPER_ADMIN or NGO.
- Both endpoints return sanitized profiles (no password).

## 4. Validate Authenticated Session

**Method:** GET  
**URL:** `http://localhost:3000/users/me`

- Requires `Authorization: Bearer <accessToken>`.
- Returns the persisted user profile (password omitted). Use this to confirm authentication flow.

## 5. Fetch Public User Profile

**Method:** GET  
**URL:** `http://localhost:3000/users/<userId>`

- No authentication required.
- Returns public profile details without password. Confirms sanitized output for arbitrary users.

## Tips

- Configure Postman env variable `{{baseUrl}}` for the host and reuse it across requests.
- Store JWT in Postman environment for chaining.
- Use the collection runner for regression testing once more endpoints exist.
