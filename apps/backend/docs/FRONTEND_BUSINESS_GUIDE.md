# Frontend Business Guide – ImpactBridge Backend

This handbook explains how each user role experiences the platform, the key API calls your frontend should orchestrate, and the current completion status of major features.

---

## 1. Roles & Journeys

### SUPER_ADMIN
- **What they do:** Invite new users (reviewers/auditors), verify NGO applications, monitor analytics and donation ledgers.
- **Key APIs:**
  - `/admin/invite` → issue invite links (auto populates Postman token).
  - `/admin/verification/ngos/:id/(approve|reject|pending)` → gate campaigns.
  - `/users/admin/(ngos|companies|donors)` → compliance dashboards.
  - `/admin/analytics`, `/donations/admin/all` → platform-wide insight.
- **UI Hints:** Provide queue of NGO submissions, quick approve/reject buttons, and analytics dashboards.

### NGO
1. **Sign-up/Login** → `/auth/register` + `/auth/login`.
2. **Compliance Setup:**
   - `/users/me` (GET/PATCH) for profile.
   - `/address/ngo`, `/bank/ngo`, `/documents/ngo` for regulatory data.
3. **Await Verification:** admins must approve before campaigns go live.
4. **Campaign Management:** `POST /campaigns`; list is public once approved.
5. **Milestone Tracking:**
   - `POST /milestones/:campaignId` to create project milestones with budget/target dates.
   - `PATCH /milestones/status/:milestoneId` to update status + progress.
   - `GET /milestones/:campaignId` to review progress.
6. **Donations & Receipts:**
   - `GET /donations/ngo` for history.
   - `POST /receipts` to upload acknowledgement URLs.

### COMPANY
1. **Login** as company.
2. **CSR Budgeting:** `POST /csr/company/budget`, `GET /csr/company/status`, `POST /csr/company/spent`.
3. **Donations:** `POST /donations/:campaignId` (auto-logs CSR spend), `GET /donations/me`.
4. **Milestone Visibility:** `GET /milestones/:campaignId` if approval is granted (future workflow).

### DONOR
- **Authenticated donors:** donate via `/donations/:campaignId`, track via `/donations/me`.
- **Anonymous donors:** `/public/campaigns/:campaignId/donate` with name/email for receipt emails (future notification service).

### REVIEWER / AUDITOR (Invited Roles)
- Accounts are provisioned via `/admin/invite` → `/auth/accept-invite`.
- Read-only dashboards are planned (currently no dedicated endpoints beyond core admin views).

---

## 2. Current Feature Coverage
- **Auth & Invitations** ✔
- **NGO Compliance** (address, bank, documents) ✔
- **NGO Verification Workflow** ✔
- **Campaign Creation & Public Listing** ✔
- **Milestone Tracking for Campaigns** ✔ (create/update/list) – supports progress dashboards.
- **Donations & Receipts** ✔ (authenticated + anonymous)
- **CSR Budget Tracking** ✔ (auto-updates on donations)
- **Admin Analytics & Profiles** ✔
- **Activity Logging** ✔
- **Company-NGO Approvals** 🔄 (schema ready; UI/workflow pending)
- **NGO Financial Reports** 🔄 (service endpoints pending)
- **Pagination, Soft Delete, Notifications** 🔄 future enhancements
- **Automated Tests** 🔄 planned

Legend: ✔ Delivered | 🔄 Planned/In progress

---

## 3. UX Considerations by Module

### Campaign Milestones
- Each milestone includes **title**, **description**, **target date**, **budget**, **status**, and **progress percent**.
- Use a timeline or progress bar to visualize `pending → in progress → completed`.
- Only the owning NGO can create/update milestones; companies/admins have read-only access.
- Companies should only see milestones for campaigns they are approved to fund (approval workflow forthcoming).

### CSR Budget Dashboard
- Display `annualBudget`, `allocated`, `spent`, `remaining` from `/csr/company/status`.
- Combine with donation history to show how spend accrues over time.

### Verification Queue
- Show NGO submissions with compliance data (documents, address, bank status) so admins can approve quickly.
- After approval, notify the NGO (future email hook) and unlock campaign creation.

### Donation Receipts
- After successful donation, provide NGOs a form to upload receipt URLs via `/receipts`.
- Donors should be able to download/view receipt links.

---

## 4. Operational Notes for Frontend Teams
- Always attach `Authorization: Bearer <token>` header (Postman script handles this automatically).
- Use the Postman collection as a reference for required payloads.
- Handle errors gracefully:
  - `401` → prompt login.
  - `403` → show “insufficient permissions” or “verification pending”.
  - `400` → display validation messages returned by backend.
- Remember to sanitize sensitive fields: account numbers are masked in responses; never display raw passwords.
- Activity logs can be tapped for audit screens (future enhancement).

---

## 5. Roadmap Impact on Frontends
- **Company–NGO approvals** will introduce new screens for requesting approvals and showing status before donations.
- **NGO financial reporting** will require upload forms + admin viewers for quarterly/annual disclosures.
- **Pagination/soft delete** will alter list endpoints; prepare UI to handle page/limit response metadata.
- **Notifications** will surface receipt emails and invite reminders; frontends should expose toggles as needed.

Keep this document handy alongside `PROJECT_FULL_STATUS.md` to align design and development teams on what’s live versus upcoming.


### Utilization Reports
NGOs provide detailed fund usage reports to maintain transparency:
- Submit reports via `POST /utilization/:campaignId` including amount used, description, proof URL, and optional milestone reference.
- NGO, company, and SUPER_ADMIN roles can view campaign-level reports (`GET /utilization/campaign/:id`).
- All roles (including donors) can view milestone-level reports (`GET /utilization/milestone/:id`) to track outcomes per phase.
- SUPER_ADMIN has an aggregate ledger via `/utilization/admin/all`.

### CSR Annual Summary
- Frontend should collect `companyId` and `financialYear`, then call `POST /csr/summary`.
- Display obligation, spent, utilized, unspent amounts plus project breakdown (impact + utilization).
- Offer export/download options for CSR-2 compliance reports.
