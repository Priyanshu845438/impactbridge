# ImpactBridge Frontend Project Overview

Welcome to the ImpactBridge frontend workspace. This document provides a quick understanding of what the project is, who it is for, and how the application is organised from a product and UX perspective. It is intended for both technical and non-technical team members.

## What Is ImpactBridge?
ImpactBridge is a CSR (Corporate Social Responsibility) collaboration platform where NGOs, companies, donors, and administrators coordinate projects, funding, and compliance tasks.

### Key Personas
- **Super Admin** – manages the platform, approvals, compliance, and reporting.
- **NGO** – creates campaigns, submits documentation, and tracks impact.
- **Company** – manages CSR programmes, budgets, and partnerships with NGOs.
- **Donor** – monitors contributions and campaign progress.

## Frontend Goals
- Deliver a secure, responsive dashboard tailored to each persona.
- Provide polished authentication and onboarding flows.
- Offer a modular foundation for future data-driven features (campaigns, reports, impact metrics).

## High-Level Feature Map
| Area | Current Status | Next Steps |
| ---- | -------------- | ---------- |
| Authentication | Login/Register/Forget/Reset UI complete | Hook to backend sessions & MFA |
| Dashboard Shell | Role-aware layout, sidebar, quick stats | Connect to live backend data |
| Admin Modules | NGO, Programmes, Reports, Settings placeholders | Build tables, approvals, analytics |
| Docs & Guides | Setup + dashboard docs ready | Add screenshots, video walk-through |

## UX Highlights
- Consistent ImpactBridge branding (navy, violet gradient, glassmorphism cards).
- Desktop + mobile responsive layouts tested down to ~360px.
- Collapsible navigation that reveals module sub-pages for super admins without overwhelming other roles.

## Tech Summary
- Next.js 14 (App Router) + TypeScript
- TailwindCSS + shadcn/ui components
- React Query + custom auth context for state management
- ky for API requests with JWT token support

For more implementation-level information, read:
- `FRONTEND_SETUP.md` – dev setup & folder structure
- `FRONTEND_DASHBOARD.md` – dashboard architecture & components
- `AUTH_FLOW.md` – login/register/guard behaviour
- `STYLE_GUIDE.md` – theming, UI tokens, accessibility

## Contact & Ownership
- **Frontend Lead:** (fill when assigned)
- **Design System:** (link to Figma / figma placeholder)
- **Product Manager:** (fill when assigned)

Please keep this document updated when major features, personas, or product goals change.
