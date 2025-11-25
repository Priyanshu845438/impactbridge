# API Testing Guide – ImpactBridge Backend

This guide explains how to validate every production-ready API using the bundled Postman collection (`docs/postman/impactbridge.postman_collection.json`). The collection already sets `{{base_url}} = http://localhost:3000`, injects the JWT token after login, and exposes helper variables such as `{{campaignId}}`, `{{donationId}}`, `{{invitationToken}}`, `{{ngoProfileId}}`, and `{{milestoneId}}`.

> **Tip:** Execute requests in sequence (Auth → NGO → Company → Milestones → Admin) so that dynamic variables captured from responses are available to later steps.

---

## 1. Authentication & Invitations

### 1.1 Register User
- **POST** `{{base_url}}/auth/register`
```json
{
  "name": "Alice NGO",
  "email": "ngo@example.com",
  "password": "password123",
  "role": "NGO"
}
```

### 1.2 Login User
- **POST** `{{base_url}}/auth/login`
```json
{
  "email": "ngo@example.com",
  "password": "password123"
}
```
- Postman test stores `accessToken` in `{{token}}`.

### 1.3 Invite Reviewer/Auditor (SUPER_ADMIN)
- **POST** `{{base_url}}/admin/invite`
```json
{
  "email": "reviewer@example.com",
  "role": "REVIEWER"
}
```
- Test script pulls invite token into `{{invitationToken}}`.

### 1.4 Accept Invitation
- **POST** `{{base_url}}/auth/accept-invite`
```json
{
  "token": "{{invitationToken}}",
  "password": "StrongPass!1"
}
```

---

## 2. NGO Self-Service & Milestones (requires NGO login)

### 2.1 Get / Update Profile
- `GET {{base_url}}/users/me`
- `PATCH {{base_url}}/users/me`
```json
{
  "name": "ImpactBridge Foundation",
  "email": "updated-ngo@example.com",
  "phone": "+911234567890"
}
```

### 2.2 Change Password
- `POST {{base_url}}/users/change-password`
```json
{
  "oldPassword": "password123",
  "newPassword": "newSecret456"
}
```

### 2.3 Compliance Modules
- Address: `POST {{base_url}}/address/ngo`
- Bank: `POST {{base_url}}/bank/ngo`
- Documents: `POST {{base_url}}/documents/ngo`

### 2.4 Create Campaign (after verification)
- `POST {{base_url}}/campaigns`
```json
{
  "title": "Clean Water Drive",
  "description": "Provide clean water filters to rural schools.",
  "category": "HEALTHCARE",
  "targetAmount": 500000,
  "isPublic": true
}
```

### 2.5 Milestone Management
1. **Create Milestone** (NGO)
   - `POST {{base_url}}/milestones/{{campaignId}}`
```json
{
  "title": "Procure Filters",
  "description": "Purchase 100 filtration units",
  "targetDate": "2025-12-31",
  "budget": 150000
}
```
   - Postman test saves `{{milestoneId}}`.

2. **Update Milestone Status** (NGO)
   - `PATCH {{base_url}}/milestones/status/{{milestoneId}}`
```json
{
  "status": "IN_PROGRESS",
  "progressPercent": 40
}
```
3. **List Milestones**
   - NGO / Company (if approved) / SUPER_ADMIN: `GET {{base_url}}/milestones/{{campaignId}}`

### 2.6 Impact Metrics
1. **Add Impact Metric** (NGO)
   - `POST {{base_url}}/impact/{{campaignId}}`
```json
{
  "name": "Households Served",
  "value": 250,
  "unit": "families",
  "milestoneId": "{{milestoneId}}"
}
```
   - `milestoneId` optional; omit to log a campaign-level metric.
2. **Get Campaign Metrics** (all roles)
   - `GET {{base_url}}/impact/campaign/{{campaignId}}`
3. **Get Milestone Metrics** (all roles)
   - `GET {{base_url}}/impact/milestone/{{milestoneId}}`

### 2.6 Donation Receipt & History
- Generate receipt: `POST {{base_url}}/receipts`
- View donation history: `GET {{base_url}}/donations/ngo`

### 2.7 Utilization Reports
1. **Submit Utilization Report** (NGO)
   - `POST {{base_url}}/utilization/{{campaignId}}`
```json
{
  "amountUsed": 120000,
  "description": "Procured filters for 4 villages",
  "proofUrl": "https://files.example.com/proof.pdf",
  "milestoneId": "{{milestoneId}}"
}
```
2. **Campaign Utilization Reports** (NGO/Company/SUPER_ADMIN)
   - `GET {{base_url}}/utilization/campaign/{{campaignId}}`
3. **Milestone Utilization Reports** (All roles)
   - `GET {{base_url}}/utilization/milestone/{{milestoneId}}`
4. **Admin Utilization Ledger**
   - `GET {{base_url}}/utilization/admin/all`

---

## 3. Company CSR Management

### 3.1 Set / View Budget
- `POST {{base_url}}/csr/company/budget`
- `GET {{base_url}}/csr/company/status`

### 3.2 Manual Spend Adjustment
- `POST {{base_url}}/csr/company/spent`
```json
{
  "spent": 25000
}
```

### 3.3 Donation
- `POST {{base_url}}/donations/{{campaignId}}`
```json
{
  "amount": 5000,
  "paymentRef": "TXN123",
  "csrEligible": true,
  "isForeignDonor": false
}
```
- CSR spend auto-updated server-side.

### 3.4 View Company Donation History
- `GET {{base_url}}/donations/me`

### 3.5 Milestones for Approved Campaigns
- `GET {{base_url}}/milestones/{{campaignId}}`
  - Requires campaign approval (future workflow) or SUPER_ADMIN role.

---

## 4. Donation Flows
- Public browse: `GET /campaigns/public`, `GET /campaigns/public/{{campaignId}}`
- Anonymous donation: `POST /public/campaigns/{{campaignId}}/donate`
```json
{
  "amount": 2000,
  "donorName": "Guest Donor",
  "email": "guest@example.com"
}
```
- Personal history: `GET /donations/me`
- Admin ledger: `GET /donations/admin/all`

---

## 5. Admin & Compliance
- Verify NGOs: `POST /admin/verification/ngos/{{ngoProfileId}}/(approve|reject|pending)`
- Lists: `GET /users/admin/(ngos|companies|donors)`
- Analytics: `GET /admin/analytics`

---

## 6. Negative Test Scenarios
- Missing JWT → `401 Unauthorized`
- Wrong role → `403 Forbidden`
- Invalid payloads → `400` with validation messages
- Duplicate email on profile update → `400 Email already registered`
- Milestone progress outside 0–100 → `403`

Run the Postman collection runner to automate these flows. Reset or seed the database as needed so IDs remain valid for chained requests.

## 7. CSR Annual Summary
- **POST** `{{base_url}}/csr/summary` (roles: COMPANY, SUPER_ADMIN)
```json
{
  "companyId": "<companyProfileId>",
  "financialYear": "2024-2025"
}
```
- **Response Fields:**
  - `company` (id, name, email, financialYear)
  - `summary` (csrObligation, amountSpent, amountUtilized, unspentAmount)
  - `projectList` (goal amount, raised amount, impact metrics, utilization reports)
  - `beneficiaries` (total people reached based on impact metrics)
  - `adminNotes` (auto-generated note)
