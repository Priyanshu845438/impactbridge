# CSR Programme Data Flow

## Overview
Company CSR programme experiences are feature-flagged so that the frontend can safely toggle between mock data and live backend endpoints without altering UI behaviour. React Query hooks encapsulate this logic and normalise responses to common DTO shapes before rendering.

## Read Hooks
- `useCompanyProgrammes` → lists CSR programmes for a company. When `API_PROGRAMME` is enabled it fetches `/companies/{companyId}/csr-programmes`; otherwise it serves mock data. Results are normalised to shared `ProgrammeSummaryDto` fields (id, title, description, state, timestamps) so both paths render identically.
- `useProgrammeDetail` → fetches a single programme. Applies the same normalisation rules, falling back to mock detail when the API returns empty or malformed payloads.

## Mutation Hooks
- `useCreateProgramme`, `useUpdateProgramme`, `useProgrammeStatus`, `useProgrammeAssignment` each read `API_PROGRAMME` to decide between backend mutations and mock fallbacks. With the flag now defaulting to on, backend mutations run by default while still falling back to mocks if requests fail. Success/error toasts and navigation remain unchanged regardless of mode.
- All mutations share query keys with the list/detail hooks and invalidate both after completion so cache stays consistent without manual writes.

## Fallback Safety
- Normalisation utilities (`use-programme-wrappers.ts`) ensure undefined API fields inherit mock defaults, keeping UI stable.
- Hooks guard against null responses and unexpected errors by returning mock results instead of propagating failures when possible. Runtime fallbacks also catch network/API exceptions and log console warnings in development so UX stays identical.
- Loading and error states surface via standard skeletons and toasts—no additional UI states were introduced.

## Testing Coverage
- Hook unit tests exercise flag on/off paths, malformed API payloads, and fallback behaviour.
- Page-level RTL tests (list/detail/edit) validate consistent UI output across mock/API states, loading, and error scenarios. Audit logging verification did not require UI changes; tests confirm backend payloads include metadata consumed by activity logs.
- End-to-end smoke coverage is the remaining follow-up before promoting to production environments without manual verification.

Keep this document in sync with additional hook behaviour (e.g., pagination, filtering) or when feature flags are retired.
