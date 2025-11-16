# Frontend Business Guide – Auth & Roles

This document explains how the frontend should interact with ImpactBridge auth services, expected payloads, and business rules for user roles.

## Auth Flow Overview

1. **User Registration**
   - Frontend collects name, email, password, and role.
   - Sends POST `/auth/register` with validated input.
   - Receives user profile (no password).
   - Optionally auto-login using the same credentials.

2. **User Login**
   - Send POST `/auth/login` with email/password.
   - Receives sanitized user profile + `accessToken` (JWT valid for 1 day).
   - Store JWT securely (e.g., HttpOnly cookie or memory + refresh strategy).

3. **Authenticated Requests**
   - Include `Authorization: Bearer <token>` header.
   - Backend will validate JWT (guards to be implemented).

## Roles & Permissions

| Role         | Description                                                     | Typical Capabilities (future) |
| ------------ | --------------------------------------------------------------- | ------------------------------ |
| SUPER_ADMIN  | ImpactBridge operators managing platform-wide settings         | Full access                    |
| NGO          | Nonprofit organizations running campaigns                      | Manage NGO profile, campaigns  |
| COMPANY      | Corporate CSR partners funding initiatives                     | View reports, manage donations |
| DONOR        | Individual donors tracking contributions                        | View personal impact           |

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

- Display clear validation errors from backend (`ValidationPipe` ensures descriptive messages).
- Prevent duplicate registrations by handling `Email already registered` response.
- After login, route user based on role (e.g., dashboard per role).
- Implement logout by clearing stored JWT.

## Security Notes

- Always use HTTPS in production.
- Prefer HttpOnly cookies for JWT if feasible.
- Plan for refresh token flow and role-based route guards.

## Future Integrations

- MFA or OAuth providers for enterprise logins.
- Role-specific onboarding flows.
- Analytics on login/registration events to monitor engagement.
