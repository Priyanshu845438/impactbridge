# Auth Flow & Session Management

This document explains how authentication is implemented on the ImpactBridge frontend, how role-based redirects work, and the planned extensions.

## Components Involved
- `app/login/page.tsx` – sign-in form with email/password
- `app/register/page.tsx` – role-aware signup form (name, email, password, role)
- `contexts/auth-context.tsx` – holds user + token state in memory
- `lib/api-client.ts` – wrapper around `ky` for calling backend APIs
- `middleware.ts` (planned) – will enforce server-side guard once backend is ready

## Login Flow
1. User submits email/password via `react-hook-form` + `zod`
2. `apiClient.post('auth/login')` is called
3. On success, response returns `{ user, accessToken }`
4. `AuthProvider` stores token + user, and `setApiClientToken` applies bearer header
5. Based on `user.role`, the router redirects to the corresponding dashboard route

Redirect mapping:
- `SUPER_ADMIN` → `/dashboard/admin`
- `NGO` → `/dashboard/ngo`
- `COMPANY` → `/dashboard/company`
- `DONOR` → `/dashboard/donor`

## Register Flow
- Similar to login; form collects name, email, password, role
- On success, the user is redirected to `/dashboard` (AuthProvider then re-routes to role page)
- Future: show success toast or onboarding wizard for new NGOs/companies

## Forgot/Reset Password
- `/forgot-password` and `/reset-password` currently collect input and display success messaging placeholders
- Backend endpoints will be integrated later (e.g., email OTP, tokenised reset URLs)

## AuthProvider internals
```tsx
const value = {
  user,
  token,
  login: async (payload) => { ... },
  logout: () => { ... },
};
```
- Stores data in React state (no localStorage for security reasons)
- `logout()` clears token and resets API headers
- If `token` is absent, the dashboard layout redirects to `/login`

## Route Guarding
- Dashboard layout checks for `token` and `user`; if missing, it returns `null` and triggers router replace
- Plan: add Next.js `middleware.ts` to block direct navigation to protected routes before hydration

## Testing Guidance
- Use browser devtools to ensure requests include `Authorization: Bearer <token>` header
- Simulate missing token by refreshing the page; layout should drop user back to `/login`
- When backend is ready, add integration tests (Playwright/Cypress) for login & redirection flows

## Future Enhancements
- Persist session via HTTP-only cookies when backend supports it
- Add 2FA/MFA flows for super admins
- Track login attempts to display “last logged in” widget accurately
- Integrate forgot/reset flows with real email and token validation
