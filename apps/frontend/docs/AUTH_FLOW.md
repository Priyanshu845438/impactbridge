# Auth Flow & Session Management

This document explains how authentication is implemented on the ImpactBridge frontend, how role-based redirects work, and the planned extensions.

## Components Involved
- `app/login/page.tsx` – sign-in form with email/password
- `app/register/page.tsx` – role-aware signup form (name, email, password, role)
- `contexts/auth-context.tsx` – holds user + token state in memory
- `lib/api-client.ts` – wrapper around `ky` for calling backend APIs
- `components/ui/sonner.tsx` – global Toaster used for auth notifications
- `middleware.ts` (planned) – will enforce server-side guard once backend is ready

## Login Flow
1. User submits email/password via `react-hook-form` + `zod`
2. `apiClient.post('auth/login')` is called
3. On success, response returns `{ user, accessToken }`
4. `AuthProvider` stores token + user, and `setApiClientToken` applies bearer header
5. Toast can be triggered for success or errors via `toast.success()` / `toast.error()` (global provider already mounted)
6. Based on `user.role`, the router redirects to the corresponding dashboard route

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
- Stores token + user in React state and mirrors them to `localStorage`
- On mount, reads from `localStorage` to auto-authenticate returning users
- If storage empty, redirects to `/auth/login`
- `logout()` clears both state and `localStorage`, then resets API headers
- If `token` is absent, the dashboard layout redirects to `/login`

## Route Guarding
- Dashboard layout checks for `token` and `user`; if missing, it returns `null` and triggers router replace
- Plan: add Next.js `middleware.ts` to block direct navigation to protected routes before hydration

## Toast Usage
- Import `import { toast } from 'sonner';`
- Examples:
  ```tsx
  toast.success('Logged in successfully');
  toast.error('Invalid credentials');
  ```
- Global Toaster lives inside `app/layout.tsx`, so no extra provider wiring is needed

## Future Enhancements
- Persist session via HTTP-only cookies when backend supports it
- Add 2FA/MFA flows for super admins
- Track login attempts to display “last logged in” widget accurately
- Integrate forgot/reset flows with real email and token validation
