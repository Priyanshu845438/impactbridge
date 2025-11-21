# Frontend Business Guide – ImpactBridge Backend

This guide explains how frontend clients should interact with the backend. A separate API Testing guide exists for Postman flows; here we focus on business logic, payloads, and user journeys.

## Roles & Permissions
| Role | Description | Typical Permissions |
| ---- | ----------- | ------------------- |
| `SUPER_ADMIN` | Platform administrators | Access admin insights/analytics and audit data |
| `NGO` | Registered non-profit | Manage profile, address, bank, campaigns, documents, donations |
| `COMPANY` | Corporate CSR team | Donate to campaigns, view admin NGO endpoints |
| `DONOR` | Individual donor | Donate and view personal history |

## Authentication Flow
1. **Register** – `POST /auth/register` with name, email, password, role (see API Testing guide for exact body).
2. **Login** – `POST /auth/login`; response returns `accessToken` and sanitized user. Store token securely (HttpOnly cookie or memory + refresh strategy).
3. **Authenticated Requests** – send `Authorization: Bearer <token>` header. JWT payload contains `id` and `role`.
4. **Role Guarding** – backend guards apply `JwtAuthGuard` first, then `@Roles(...)` for RBAC.

## NGO Journey
1. **Complete Profile** – `GET /users/me` / `PATCH /users/me` to update name/email/phone.
2. **Compliance Setup**
   - Registered address: `POST /address/ngo`
   - Bank details: `POST /bank/ngo` (account number masked in responses)
   - Document uploads: `POST /documents/ngo` (CSR policy, PAN, etc.)
3. **Campaign Management**
   - Create campaign: `POST /campaigns`
   - Public share link: `GET /campaigns/public/:id` (and note `public/campaigns/:id` for donors)
4. **Donations & Receipts**
   - View donations: `GET /donations/ngo`
   - Generate donation receipt: `POST /receipts`

## Company Journey
1. Register/login as `COMPANY`.
2. Donate via `POST /donations/:campaignId` (CSR contributions tracked).
3. View reports via admin endpoints if granted (requires `SUPER_ADMIN` token currently; plan future company dashboards).

## Donor Journey
1. Register/login as `DONOR` (or donate anonymously using public campaign endpoint).
2. Donate via `POST /donations/:campaignId` (when logged in) or `POST /public/campaigns/:id/donate` (anonymous).
3. View personal donations via `GET /donations/me`.

## Admin Insights
- `GET /users/admin/ngos` | `/admin/companies` | `/admin/donors` – compliance reporting.
- `GET /donations/admin/all` – donation roll-ups.
- `GET /admin/analytics` – aggregated statistics.

## Compliance Modules
- **Activity Logs** – critical actions log to Prisma `AuditLog` (login, profile update, campaign created, donation made, receipt generated).
- **Campaigns** – campaign status stored as `PUBLIC` (shareable) or `DRAFT`.
- **Documents** – documents are stored with `type` and `url`; clients should ensure upload to secure storage before calling API.

## Payload References (Required vs Optional)
- Address: `{ line1*, line2?, district*, state*, pincode*, country* }`
- Bank: `{ accountHolder*, accountNumber*, ifscCode*, bankName*, branchName? }`
- Campaign: `{ title*, description*, category*, targetAmount*, isPublic* }`
- Receipt: `{ donationId*, receiptUrl* }`

## Error Handling
- Validation errors include detailed field messages from class-validator.
- Duplicate emails when updating profile return `400 Email already in use`.
- All protected routes respond with `401` (no token) or `403` (role mismatch).

## Future Enhancements
- Merge legacy user modules.
- Company dashboards with donation analytics.
- Donor receipts and shareable donation summaries.
- Refresh tokens / MFA for enterprise accounts.

