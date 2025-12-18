# Auth Token Contract

## Token Format
- **Type**: JWT (HS256)
- **Issued by**: `/auth/login`
- **Claims**: `sub` (user ID), `role`
- **Expiry**: 24 hours (86400 seconds)

## Headers & Client Usage
- **Header name**: `Authorization`
- **Header value**: `Bearer <token>`
- **Refresh strategy**: Clients should renew the token 60 seconds before expiry (buffer defined in frontend env placeholder).

## Storage Guidance
- Frontend currently stores tokens in memory (context/localStorage). No refresh endpoint exists yet; planned improvement includes refresh tokens with rotation strategy.

## Environment Variables
- Backend requires `JWT_SECRET` (strong, rotated per environment) with documented rotation cadence in ops runbook.
- Frontend env placeholders (unused until integration):
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_API_AUTH_HEADER`
  - `NEXT_PUBLIC_AUTH_EXPIRY_BUFFER_SECONDS`

## Notes
- Controllers/guards remain unchanged; this document only captures the contract for future integration.
- Ensure rotation policies are documented in deployment playbooks before enabling refresh tokens.
