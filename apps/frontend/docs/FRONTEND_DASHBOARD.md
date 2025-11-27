# ImpactBridge Dashboard Skeleton

## Overview
The dashboard workspace introduces a protected, role-aware layout for authenticated users. All dashboard routes share a common shell that delivers consistent navigation and branding while keeping the code ready for future feature modules.

## Layout
- **File**: `app/dashboard/layout.tsx`
- **Highlights**:
  - Header with ImpactBridge brand, active user badge, and logout control.
  - Desktop sidebar + mobile drawer sourced from a single `navLinks` config.
  - Uses `useAuth()` to guard against unauthenticated access and to filter visible links by user role.
  - Provides a shared welcome block (`Welcome to ImpactBridge Dashboard`) where cross-role announcements can live.

## Role Pages
Each role currently renders a placeholder ready for widgets:
- `app/dashboard/admin/page.tsx`
- `app/dashboard/ngo/page.tsx`
- `app/dashboard/company/page.tsx`
- `app/dashboard/donor/page.tsx`

These components will eventually surface insights such as pending verifications, campaign milestones, or donor receipts once backend APIs are connected.

## Auth Integration
- `AuthProvider` keeps JWT + user object in memory only; layout observes this context.
- Logout clears the token via `logout()` and redirects back to `/login`.
- Navigation updates automatically when additional roles or sections join the `navLinks` array.

## Next Steps
1. Wire each role page to actual backend data (campaigns, compliance tasks, CSR budgets).
2. Add quick stats cards inside the shared hero block for an “at a glance” experience.
3. Extend the layout with breadcrumbs and contextual actions (e.g., “Create campaign”).
