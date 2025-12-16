# ImpactBridge Backend – Full Working & Status Guide

*Last updated: 2025-11-22 (based on AGENTS.md entry 58)*

This guide explains the ImpactBridge backend in plain language so that **non-technical stakeholders, new engineers, product managers, and compliance officers** can all understand what the platform does today, how the different user roles interact with it, and which features are still in progress. Think of it as the “owner’s manual” for the server.

---

## 1. Why ImpactBridge Exists
ImpactBridge brings **NGOs, Corporates, Donors, and Platform Administrators** onto one shared system so that Corporate Social Responsibility (CSR) projects can be planned, funded, monitored, and reported in a transparent manner. The backend acts as the traffic controller: it authenticates users, stores compliance documents, tracks donations, generates receipts, and records every important action for audit purposes.

Key goals:
- Help NGOs collect documents, prove credibility, and publish impact campaigns.
- Allow corporate CSR teams and individual donors to donate and track spending.
- Give administrators clear oversight, including verification workflows and analytics.
- Maintain a secure, logged system where every action is auditable.

---

## 2. Meet the User Roles

| Role | Who they are | What they do on the platform |
| ---- | ------------- | ---------------------------- |
| **SUPER_ADMIN** | ImpactBridge staff who run the platform | Invite new users (including reviewers/auditors), verify NGOs, view analytics, and access the master lists of NGOs, companies, donors, and donations. |
| **NGO** | Non-governmental organizations seeking CSR funding | Complete compliance setup (address, bank, documents), submit campaigns, receive donations, generate donation receipts, and view donation history. |
| **COMPANY** | Corporate CSR/ESG teams | Manage an annual CSR budget, donate to campaigns, and track how much has been spent. |
| **DONOR** | Individual philanthropists | Donate to campaigns (public or logged-in) and view their donation history. |
| **REVIEWER / AUDITOR** | Stakeholders invited by admins (future view-only dashboards) | Accounts are created via the invitation system; read-only interfaces are planned. |

To keep data safe, the backend enforces role-based access:
- Every request passes through a **JWT guard** (checks the user’s token).
- Then the **Roles guard** ensures the user is allowed to access the requested endpoint.
- Each controller method states which roles can use it (for example, `@Roles(UserRole.NGO)`).

---

## 3. High-Level System Map (Words, no Diagram Needed)
Imagine the system as a set of LEGO blocks. Each block (module) does one job and connects to others through services.

### 3.1 Milestone-Based Project Tracking (NEW)
Milestones help break campaigns into manageable targets:

### 3.2 Impact Metrics & Outcome Reporting (NEW)
- NGOs capture measurable outcomes (e.g., beneficiaries served, trees planted) per campaign or milestone.

### 3.3 Utilization Reports (NEW)
- NGOs document how campaign funds were spent, attaching descriptions and proof URLs.
- Reports can optionally tie to milestones to show budget consumption alongside progress.
- All stakeholders can review utilization to ensure accountability: campaign-level (`GET /utilization/campaign/:id`), milestone-level (`GET /utilization/milestone/:id`), and admin-wide ledger (`GET /utilization/admin/all`).

### 3.4 CSR Annual Summary Builder (NEW)
- Super admins and companies can request a CSR-2 compliant summary via `POST /csr/summary`.
- Aggregates CSR obligation, amount spent, utilization totals, unspent balance, project-level details, and beneficiary counts.
- Pulls data from CSR budgets, approvals, utilization reports, and impact metrics.
- Metrics include **name**, **value**, **unit**, and optional link to a milestone.
- All roles can view impact metrics to gauge project success.
- API: `POST /impact/:campaignId`, `GET /impact/campaign/:campaignId`, `GET /impact/milestone/:milestoneId`.
- NGOs create milestones with **title**, **description**, **target date**, and **budget** per campaign.
- Status flows through `PENDING → IN_PROGRESS → COMPLETED` with explicit **progress percentage (0–100)**.
- Companies (after approval) and SUPER_ADMIN can view milestones to monitor deliverables and timelines.
- API summary: `POST /milestones/:campaignId`, `PATCH /milestones/status/:milestoneId`, `GET /milestones/:campaignId`.


1. **Authentication & Invitations**: Handles registration, login, token creation, and onboarding via invite links.
2. **Profiles**: Stores the common user info plus specialized data for NGOs, companies, and donors.
3. **Compliance Modules**: Address, bank details, and document uploads for NGOs; CSR budget management for companies.
4. **Campaigns & Donations**: NGOs create campaigns once verified; donors/companies contribute funds; receipts can be generated.
5. **Verification & Analytics**: Admins examine NGO submissions and view aggregated stats.
6. **Activity Log**: Every major action records an entry so auditors can replay events.

Data flows look like this:
- **Registration** → (auto-create profile) → **Compliance setup** → **Verification** → **Campaign creation** → **Donations** → **Receipts & analytics**.
- **Invitations** allow admins to add new reviewers/auditors without manual account creation.
- **CSR budgets** ensure company donations are tied back to official spending requirements.

---

## 4. Step-by-Step Journeys for Each Role

### 4.1 NGO Journey (End-to-End)
1. **Sign Up & Login**
   - Register with name, email, password, and choose “NGO”.
   - Login returns a secure token; Postman automatically saves it for testing.
2. **Complete Compliance Tasks**
   - Submit registered address (`/address/ngo`).
   - Add bank details (`/bank/ngo` – account numbers are masked in responses).
   - Upload key documents (`/documents/ngo`, e.g., CSR policy link).
3. **Verification Gate**
   - A SUPER_ADMIN reviews the NGO via `/admin/verification/ngos/:id/(approve|reject|pending)`.
   - Campaign creation is only allowed once the status is **APPROVED**.
4. **Launch Campaigns**
   - Create campaigns with goals and descriptions (`POST /campaigns`).
   - Public endpoints allow donors to browse (`GET /campaigns/public`).
5. **Handle Donations**
   - `GET /donations/ngo` lists all donations received across the NGO’s campaigns.
6. **Issue Receipts**
   - Upload donation receipts (`POST /receipts`) for donors and compliance files.
7. **Audit Trail**
   - Each action logs an entry (login, campaign creation, donation, receipt) so administrators can trace activities.

### 4.2 Company Journey
1. **Sign Up & Login** as company.
2. **Set CSR Budget**
   - `/csr/company/budget` records the annual budget plus optional allocated/spent figures.
   - `/csr/company/status` shows the latest totals and remaining funds.
   - Manual adjustments via `/csr/company/spent` (donations also increment spend automatically).
3. **Donate to Campaigns**
   - `/donations/:campaignId` performs the contribution (requires eventual approval workflow).
   - `/donations/me` shows the company’s donation history.
4. **Reports & Oversight**
   - Company data is exposed to admins for compliance reviews.

### 4.3 Donor Journey
1. **Registered Donor**
   - Logs in, donates to campaigns (`/donations/:campaignId`), and reviews history (`/donations/me`).
2. **Anonymous Donor**
   - Uses the public endpoint (`/public/campaigns/:campaignId/donate`) without logging in; still generates logs and updates campaign totals.

### 4.4 SUPER_ADMIN Journey
1. **Onboard Users via Invitation**
   - `/admin/invite` issues a link; new user visits `/auth/accept-invite` with token.
2. **Verify NGOs**
   - Approve/reject/pending statuses to enforce vetting.
3. **Monitor Platform**
   - `/users/admin/(ngos|companies|donors)` for profile summaries.
   - `/donations/admin/all` for donations ledger.
   - `/admin/analytics` for aggregated stats.
4. **Review Activity Logs**
   - Stored in database via `ActivityLogService` (not yet exposed via API, but available for audit queries).

---

## 5. What the Database Stores (Plain Language)
The Prisma schema defines tables that map closely to real-world concepts:

- **User**: Basic account info (name, email, password hash, role).
- **NGOProfile**: NGO-specific details (registration type, verification status, compliance artefacts, linked documents, campaigns, financial reports).
- **CompanyProfile**: Company info including CSR budget fields (`csrAnnualBudget`, `csrAllocated`, `csrSpent`).
- **DonorProfile**: Optional donor metadata (PAN, interests, addresses).
- **Campaign**: Fundraising project; includes goal, description, status (public/draft), and references the owning NGO.
- **Donation**: A recorded contribution; references campaign + optional donor/company profiles; stores amount, date, payment reference, and optional receipt URL.
- **BankDetail**, **Address**, **Document**: Sub-records attached to NGOs or companies.
- **FinancialReport**: Placeholder for future NGO financial reporting module.
- **Invitation**: Pending user invitations and their tokens.
- **AuditLog**: Activity records (action type, metadata, user IDs).
- **CampaignApproval**: Pending table for company–NGO approval workflow (created during planning stage, not yet wired in production).

All tables include timestamps and indexes where needed. Sensitive data (passwords, account numbers) are never returned directly; services sanitize responses.

---

## 6. Feature Checklist (Completed vs Pending)

| Feature | Description | Status |
| ------- | ----------- | ------ |
| Authentication & JWT | Register, login, password hashing, token guard | ✅ Complete |
| Invitations | SUPER_ADMIN invites + public acceptance | ✅ Complete |
| NGO compliance setup | Address, bank, documents modules | ✅ Complete |
| NGO verification workflow | Admin approval gating campaign creation | ✅ Complete |
| Campaign creation & public listing | NGOs publish, donors browse | ✅ Complete |
| Donation flows | Authenticated and anonymous donations; history endpoints | ✅ Complete |
| Donation receipts | NGOs attach receipt URLs to donations | ✅ Complete |
| Company CSR tracking | Budget status and automatic spend updates on donations | ✅ Complete |
| Analytics & admin lists | Platform oversight for SUPER_ADMIN | ✅ Complete |
| Activity logging | Audit trail for key actions | ✅ Complete |
| **Company–NGO approval workflow** | Campaign approvals before company donations | 🔄 In design (schema drafted, services partially scaffolded, not deployed) |
| **NGO financial reporting** | Upload/list quarterly & annual reports | 🔄 Planned |
| Pagination & search | Consistent pagination across lists | 🔄 Planned |
| Soft delete approach | Replace hard deletes with `deletedAt` | 🔄 Planned |
| Email/SMS notifications | Receipts, password change, invitation reminders | 🔄 Planned |
| Reviewer/Auditor dashboards | Read-only portals for new roles | 🔄 Planned |
| Automated tests | Integration/e2e coverage | 🔄 Planned |

Legend: ✅ Delivered · 🔄 In progress / On roadmap · 🚧 Not started

---

## 7. How Everything Connects (Narrative for Non-Engineers)
- When an NGO signs up, the system automatically prepares an NGO profile record. Admins later review the documents and use the verification endpoints to approve them. Only after approval can the NGO publish campaigns.
- Corporates (companies) can donate to those campaigns and keep track of their CSR budgets. Every donation they make automatically updates their “spent” CSR line so finance teams stay aligned.
- Donors (either logged in or anonymous) can support campaigns. NGOs can send receipts by uploading a URL to each donation.
- Administrators have the final say: they invite special users, approve NGOs, read analytics, and can inspect comprehensive lists of NGOs, companies, donors, and donations at any time.
- Nothing happens without a trace: every major button press (login, create campaign, donate, generate receipt, update CSR) adds an entry to the audit log table.

---

## 8. Operational Runbook
This section gathers the practical steps for running and testing the backend.

### Running Locally
1. Install dependencies: `npm install` (inside `impactbridge/apps/backend`).
2. Provide database connection: set `DATABASE_URL` (Neon PostgreSQL) in environment.
3. Start the server: `npm run start:dev` (uses port 3000; ensure it’s free).
4. Production build: `npm run build` (generates code in `dist/`).
5. Lint check: `npm run lint` (enforced before every handoff).

### Postman Collection Usage
- File: `docs/postman/impactbridge.postman_collection.json`
- Variables:
  - `{{base_url}}` (defaults to `http://localhost:3000`)
  - `{{token}}` auto-populates after login
  - `{{campaignId}}`, `{{donationId}}`, `{{invitationToken}}`, `{{ngoProfileId}}` are captured dynamically via tests
- Preset flows: Auth → Invitations → NGO compliance → Verification → Campaign → Donations → Receipts → Analytics
- Negative tests covered in `docs/API_TESTING_GUIDE.md` (missing token, wrong role, validation errors)

### Backups & Audits
- Audit logs sit in the `AuditLog` table.
- Prisma migrations live under `prisma/migrations/*`. Each feature has a timestamped migration folder.
- `AGENTS.md` documents every major change chronologically (1–58 to date).

---

## 9. Pending Work Details (Roadmap Items)

1. **Company–NGO Project Approval Workflow**
   - *Goal:* require company approval before donations hit a campaign.
   - *Status:* `CampaignApproval` schema added; service/controller stubs drafted but rolled back to avoid partial features. Needs finalized DTOs (e.g., `RequestApprovalDto` with company selection), integration with donations, and Postman test coverage.

2. **NGO Financial Reporting Module**
   - *Goal:* NGOs upload quarterly (Q1–Q4) and annual financial report URLs.
   - *Current state:* `FinancialReport` model exists; service/controller to be built. Future endpoints should allow NGO upload, NGO self-view, admin view, and aggregated reporting.

3. **Pagination, Search, and Soft Delete**
   - *Need:* lists (NGO/company/donor) currently return all rows. Pagination DTO and `deletedAt` logic are planned to avoid overwhelming responses and to safely “archive” records without permanent deletion.

4. **Notifications & Reviewer Dashboards**
   - *Need:* Email service, templated notifications (registration, donation receipt, password change), and read-only dashboards for reviewers/auditors invited via the existing invitation system.

5. **Automated Testing**
   - *Need:* integration tests to accompany manual Postman verification (auth flows, RBAC behavior, donation totals, CSR updates, verification gating).

---

## 10. Glossary of Terms
- **CSR:** Corporate Social Responsibility – corporate initiatives to support social causes.
- **NGO Profile:** A record that stores an NGO’s registration type, documents, and status.
- **Campaign:** A fundraising project published by an NGO.
- **Donation:** A financial contribution to a campaign (can be from donors or companies).
- **Receipt:** Proof-of-donation document linked via URL.
- **Verification:** Admin process to approve NGO campaigns before they go public.
- **Audit Log:** A chronological record of important actions (who did what and when).
- **JWT:** JSON Web Token; used to authenticate users on every request.

---

## 11. Recent Change Timeline (From AGENTS.md)
- **Entries 1–28**: Core scaffolding, auth flows, NGO/company/donor auto-profile creation.
- **Entries 29–36**: NGO compliance endpoints (address, bank, documents) and public campaign listing.
- **Entry 37–38**: Donation API & history endpoints.
- **Entry 39**: Donation receipt generation.
- **Entry 40**: Public campaign share links and anonymous donation flow.
- **Entry 41**: Global activity logging.
- **Entry 42**: Role fixes & Postman auto-token enhancements.
- **Entry 43**: Admin analytics endpoints.
- **Entry 44**: Documentation refresh & Postman organization.
- **Entry 45**: CSR compliance reporting endpoints for admins.
- **Entry 46**: Swagger docs (currently disabled in production but wired for QA).
- **Entry 47**: Final lint pass before invitations.
- **Entry 48–49**: `PROJECT_MASTER_CONTEXT.md` created and expanded.
- **Entry 54**: User invitation system delivered.
- **Entry 55–57**: Build fixes, NGO verification workflow, CSR budget tracking.
- **Entry 58**: NGO financial reporting scaffolding captured for future work.

---

## 12. Key Takeaways
- The backend is **production-ready** for authentication, NGO compliance, campaign publishing, donations, receipts, CSR tracking, invitations, and admin oversight.
- Upcoming features concentrate on **approvals, financial reporting, pagination, soft delete, and notifications**.
- Documentation (this file, API guide, business guide, master context) is kept in sync with code changes via `AGENTS.md`.
- Manual testing flows are consolidated in Postman; automated tests are planned.

If you are new to the project, start with:
1. **`PROJECT_MASTER_CONTEXT.md`** for an architectural summary.
2. **This document** for role-based understanding and status.
3. **`docs/API_TESTING_GUIDE.md`** to exercise endpoints with Postman.
4. **`AGENTS.md`** to see how the project evolved step-by-step.

For any new feature, follow the established pattern: create DTO → service → controller → add Prisma migration if needed → update Postman/tests → add an entry to `AGENTS.md`.

---

*End of document.*
- Added auto-creation hooks for NGO, company, and donor profiles during registration.
