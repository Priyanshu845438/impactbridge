# API Versioning & DTO Alignment Guide

This document outlines how the ImpactBridge backend will evolve its HTTP APIs without breaking existing clients.

---

## 1. Versioning Strategy
- **Prefix-based versioning**: expose routes under `/v1/...` (current default). Future versions will use `/v2`, `/v3`, etc.
- **Monorepo coordination**: keep frontend and backend pointing to the same major version during release trains.
- **Deprecation window**: announce deprecation at least one sprint (2 weeks) before removing a route. Include response headers (`Deprecation`, `Sunset`) and document the replacement endpoint.

### 1.1 When to bump versions
- Breaking changes to request or response payloads (renaming/removing fields).
- Behavioural changes that violate previous contracts.
- Authentication mechanism shifts (e.g., introducing OAuth flows).

### 1.2 Non-breaking updates
- Adding new optional fields.
- Introducing new endpoints within the same resource.
- Performance improvements that do not alter payload shape.

---

## 2. Deprecation Workflow
1. Document the upcoming change in `PROJECT_FULL_STATUS.md` and `agents.md`.
2. Add a `Deprecation` header to the existing endpoint with a target date.
3. Communicate via release notes and notify frontend teams.
4. Provide dual endpoints (`/v1/...` and `/v2/...`) during the migration window.
5. After expiry, remove the legacy endpoint and clean up shared DTOs/tests.

---

## 3. Shared DTO & Type Alignment
To keep frontend and backend in sync:
- Maintain DTO definitions in the backend (NestJS classes with `class-validator`).
- Generate TypeScript interfaces for the frontend using `class-transformer` metadata or a future shared package.
- Short term: add a script to export DTO shapes into `apps/shared-types/` (planned).
- All DTO changes must be documented in `agents.md` with clear field-level notes.
- Frontend code should import versioned types (e.g., `@impactbridge/types/v1/user`).

### 3.1 DTO change checklist
- Update backend DTO class.
- Regenerate shared types or update typed clients.
- Adjust frontend components/services.
- Update Postman collection and testing docs.
- Add release note entry.

---

## 4. Compatibility Testing
- For each version bump, run automated contract tests (planned) that ensure both v1 and v2 respond correctly.
- Postman collections should include both versions during the deprecation window.
- Integration environments must mirror production versioning structure (`/v1` enabled, `/v2` gated behind feature flags if needed).

---

## 5. Governance & Review
- Version changes require approval from backend lead + product owner.
- Shared type updates must pass frontend reviewers to confirm compatibility.
- Update `PROGRESS_CHECKLIST.md` and `BUSINESS_STATUS.md` whenever new API versions are introduced.

---

Keep this guide updated as soon as the first `/v2` endpoints are drafted.
