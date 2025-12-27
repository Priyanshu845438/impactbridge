# @impactbridge/api-contracts

Shared enums and TypeScript DTO interfaces used by ImpactBridge backend and frontend.

## Contents

- Role enums, approval decisions, programme states, and report types.
- Read-only DTO interfaces for auth, approvals, CSR programmes, financial reports, and user profiles.
- Type-only exports (no runtime code) for safe consumption by Node and browser bundles.

## Usage (planned)

1. Install from workspace once published: `npm install @impactbridge/api-contracts`.
2. Import enums/DTOs in backend controllers/services or frontend hooks to ensure shared typing.
3. Update consuming code to rely on shared definitions instead of local duplicates.

## Build

```
npm install
npm run build
```

Outputs TypeScript declaration files into `dist/`.

## Migration Plan

- **Backend**: replace local enums/DTO types (e.g., `user-role.enum.ts`, approval DTOs) with imports from this package once the backend tsconfig references it.
- **Frontend**: update auth/approvals hooks to consume these shared contracts after backend rollout keeps types in sync.
- Document migration steps in service-specific READMEs and update tests alongside the refactor to avoid drift.
