# ImpactBridge Frontend Progress Report

_Last updated: 2025-12-05 08:02 UTC_

## Overview
The ImpactBridge frontend remains a polished Next.js 14 App Router experience with role-aware dashboards, rich documentation, and production-ready styling. The latest milestone extends the tooling stack with Storybook + Percy snapshot scaffolding to guard against UI regressions.

---

## Completed Work (new)
- Built NGO document center with status checklist, drag-&-drop upload surface, mock progress indicator, and compliance notes sidebar.
- Built NGO campaign detail view with breadcrumb navigation, status-aware header actions, KPI tiles, tabbed overview/donations/media/settings, and skeleton placeholders.
- Delivered NGO My Campaigns workspace with filters, responsive table/list, status badges, skeletal loading, empty state, and pagination.
- Delivered NGO user dashboard experience with warm hero, stat cards, donation trend + supporter mix charts, NGO-focused quick actions, and robust skeleton/empty states.
- Installed Storybook 10 (Vite builder) and authored stories for Button, Input, and QuickActionCard.
- Added Percy CLI (`@percy/cli`, `@percy/storybook`) with config at `tests/percy.config.json` and script `npm run snapshot:ui`.
- Documented Percy workflow and requirements in setup/dashboard/component/TODO docs.
- Enabled optimistic NGO assignment on programme detail view for instant feedback with offline-aware rollback messaging.
- Introduced offline-aware UX hooks: a shared status provider surfaces toasts when connectivity changes, disables mutation buttons with tooltips, queues assignments in localStorage, and replays them on reconnect.
- Delivered global search spotlight modal with categories, keyboard shortcuts, and recent history.

## Current Status / Issues
- Storybook snapshots (`npm run snapshot:ui`) currently fail because the container lacks headless Chromium system libraries (`libgobject-2.0.so.0`, etc.). Percy also flags the spec-mandated `include` property as unknown; kept intact per instructions.
- Storybook dev server warns about `actions.argTypesRegex` when used with Percy; leaving as-is since stories rely on default actions and no breakage observed.
- Once system libraries are installed, Percy snapshots should run end-to-end.
- NGO document center currently uses mock data and faked progress; real storage + preview APIs still need wiring.

## Pending / Upcoming Work
- Install required OS packages for Chromium to unblock Percy snapshots.
- Build Jest/RTL harness for App Router components (command palette, Action Center) and reintroduce unit tests.
- Expand Storybook coverage to additional components (NGO tables, timeline widgets, Action Center).
- Connect dashboard widgets to live backend data via React Query.
- Wire NGO document center uploads to backend services (real storage, signed URLs, preview modal).
- Implement middleware-based route protection.
- Introduce automated E2E and visual regression runs post-harness.

## Next Steps
1. Coordinate with ops to install necessary Chromium libs in the CI/container environment, then rerun `npm run snapshot:ui`.
2. Finalise Jest harness mocks and re-add component tests.
3. Add more Storybook stories + Percy coverage as modules mature.
4. Wire backend APIs to replace mock data.

---

All relevant docs (`FRONTEND_SETUP.md`, `FRONTEND_DASHBOARD.md`, `COMPONENT_CATALOG.md`, `FRONTEND_TODO.md`) have been updated accordingly.

### Breadcrumb Integration
- Added reusable breadcrumb component and surfaced navigation paths on key admin views.

- Smart command hints now surface contextual tips after inactivity with per-route dismissal.

- Added Donor Management admin module with filters, responsive table, skeletons, and pagination.

- Delivered donor profile page with summary, history, notes, and skeleton fallback.

- Implemented All Donations page with filters, pagination, modal receipt, and responsive skeletons.

- Built Campaign Management admin page with filters, pagination, skeleton loading, and create modal placeholder.

- Delivered campaign detail page with mock dataset, tabs, settings UI, and modal actions.

- Campaign detail page delivered with summary cards, tabs, settings UI, and modal actions.

- Reports dashboard scaffolded with mock analytics and export actions.

- Donation receipt detail view implemented with mock download/resend actions.

- Introduced Audit Logs admin page with filters, export stub, drawer details, and skeleton states.

- Added System Settings UI with general/security/notifications/branding sections, summary sidebar, and toast-based save confirmation.
