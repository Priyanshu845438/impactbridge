# @impactbridge/api-contracts

Shared TypeScript interfaces, DTOs, and domain enums utilized across the ImpactBridge monorepo (`apps/backend` and `apps/frontend`).

## 📦 Contents & Modules

- **Roles & Permissions**: `Role` enum (`SUPER_ADMIN`, `NGO`, `COMPANY`, `DONOR`).
- **Auth Contracts**: Login, Register, Refresh Token DTOs, and Auth Response payloads.
- **CSR Programmes**: Programme lifecycle states, creation, update, listing, and NGO assignment DTOs.
- **Approvals Workflow**: Approval decision enums (`APPROVED`, `REJECTED`, `REVOKED`, `PENDING`), review requests, and decision mutation DTOs.
- **Financial & Utilisation**: Milestone disbursement DTOs, utilisation proofs, and statutory financial reports.
- **System Settings & Keys**: `SystemSettingDto` and `UpdateSystemSettingsDto` for dynamic platform configuration (Cloud Storage, Mail, Payment, CSR Rules, and Feature Flags).
- **Analytics**: Admin KPI query parameters, timeline groupings, and aggregation payload types.

## 🚀 Building the Package

From the package directory or monorepo root:

```bash
cd packages/api-contracts
npm install
npm run build
```

This compiles TypeScript definitions directly into `dist/` with declaration maps (`.d.ts`), enabling instant resolution in consuming workspaces.

## 🔗 Workspace Consumption

Both `apps/backend` and `apps/frontend` reference `@impactbridge/api-contracts` as a local workspace dependency:

```typescript
import { Role, SystemSettingDto, UpdateSystemSettingsDto } from '@impactbridge/api-contracts';
```
