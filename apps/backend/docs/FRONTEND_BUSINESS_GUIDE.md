# Frontend Business Guide – Auth & Profiles

This document outlines how the frontend should interact with ImpactBridge authentication and user profile APIs, expected payloads, and business rules for roles.

## Auth Flow Overview

1. **User Registration**
   - Collect name, email, password, role.
   - POST `/auth/register` with validated payload.
   - Response contains created user (no password).

2. **User Login**
   - POST `/auth/login` with email/password.
   - Response includes sanitized user profile and `accessToken` (JWT valid for 1 day).
   - Store JWT securely (e.g., HttpOnly cookie or in-memory + refresh token strategy).

3. **Authenticated Requests**
   - Include `Authorization: Bearer <token>` header.
   - `JwtAuthGuard` validates tokens; `CurrentUser` decorator exposes the decoded payload.
   - `@Roles(...)` metadata with `RolesGuard` enforces role-based access.
   - Example: `GET /users/me` returns the persisted user profile for the logged-in user.

4. **Public Profiles**
   - `GET /users/:id` returns a sanitized profile without requiring authentication.

## Roles & Permissions

| Role         | Description                                                     | Typical Future Capabilities |
| ------------ | --------------------------------------------------------------- | --------------------------- |
| SUPER_ADMIN  | ImpactBridge operators managing platform-wide settings         | Full access                 |
| NGO          | Nonprofit organizations running campaigns                      | Manage NGO profile, campaigns|
| COMPANY      | Corporate CSR partners funding initiatives                     | View reports, manage donations|
| DONOR        | Individual donors tracking contributions                        | View personal impact        |

Use roles to target dashboards, feature flags, and navigation states. Guard backend routes with `@Roles(...)` when access should be limited to specific roles.

## Payload Requirements

### Register Payload
```json
{
  "name": "<string>",
  "email": "<valid email>",
  "password": "<min 6 chars>",
  "role": "SUPER_ADMIN|NGO|COMPANY|DONOR"
}
```

### Login Payload
```json
{
  "email": "<valid email>",
  "password": "<min 6 chars>"
}
```

## UX Considerations

- Show clear validation errors (surfaced by `ValidationPipe`).
- Block duplicate registrations by handling `Email already registered`.
- After login, route user to role-specific dashboards.
- Provide logout by clearing stored JWT and cached profile.

## Security Notes

- Use HTTPS in production.
- Prefer HttpOnly cookies for JWT where possible.
- Plan for refresh tokens and session expiry handling.

## Future Integrations

- MFA or OAuth for enterprises.
- Role-specific onboarding flows.
- Analytics for login/registration metrics.
