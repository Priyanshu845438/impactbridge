# API Testing Guide – ImpactBridge Backend

This guide explains how to validate every production-ready API using the bundled Postman collection (`docs/postman/impactbridge.postman_collection.json`). The collection sets `{{base_url}}` (default `http://localhost:3000`), injects JWT tokens after login, and exposes helper variables (`{{campaignId}}`, `{{donationId}}`, `{{invitationToken}}`, `{{ngoProfileId}}`, `{{milestoneId}}`, `{{page}}`, `{{limit}}`).

> **Tip:** Execute folders in order – **Auth → NGO Self-Service → Admin Registries → Aggregated Listings → CSR** – so that dynamic variables captured from responses feed subsequent requests.

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

- Test stores `accessToken` in `{{token}}`.

### 1.3 Invite Reviewer/Auditor (SUPER_ADMIN)

- **POST** `{{base_url}}/admin/invite`

```json
{
  "email": "reviewer@example.com",
  "role": "REVIEWER"
}
```

- Test script captures `{{invitationToken}}`.

### 1.4 Accept Invitation

- **POST** `{{base_url}}/auth/accept-invite`

```json
{
  "token": "{{invitationToken}}",
  "password": "StrongPass!1"
}
```

---

## 2. NGO Self-Service & Milestones (NGO token required)

### 2.1 Profile

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

### 2.4 Campaign Creation

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

### 2.5 Milestones

1. **Create** – `POST {{base_url}}/milestones/{{campaignId}}`

```json
{
  "title": "Procure Filters",
  "description": "Purchase 100 filtration units",
  "targetDate": "2025-12-31",
  "budget": 150000
}
```

2. **Update Status** – `PATCH {{base_url}}/milestones/status/{{milestoneId}}`

```json
{
  "status": "IN_PROGRESS",
  "progressPercent": 40
}
```

3. **List** – `GET {{base_url}}/milestones/{{campaignId}}`

### 2.6 Impact Metrics

- `POST {{base_url}}/impact/{{campaignId}}`
- `GET {{base_url}}/impact/campaign/{{campaignId}}`
- `GET {{base_url}}/impact/milestone/{{milestoneId}}`

### 2.7 Donations & Receipts

- `POST {{base_url}}/receipts`
- `GET {{base_url}}/donations/ngo`

### 2.8 Utilization Reports

- Submit: `POST {{base_url}}/utilization/{{campaignId}}`
- Campaign view: `GET {{base_url}}/utilization/campaign/{{campaignId}}`
- Milestone view: `GET {{base_url}}/utilization/milestone/{{milestoneId}}`
- Admin ledger: `GET {{base_url}}/utilization/admin/all`

---

## 3. Company CSR Management

- Budget: `POST /csr/company/budget`, `GET /csr/company/status`
- Manual spend: `POST /csr/company/spent`
- Donation: `POST /donations/{{campaignId}}`
- History: `GET /donations/me`
- Milestones (approved): `GET /milestones/{{campaignId}}`

---

## 4. Donation Flows

- Public browse: `GET /campaigns/public`, `GET /campaigns/public/{{campaignId}}`
- Anonymous donate: `POST /public/campaigns/{{campaignId}}/donate`

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

- NGO verification: `POST /admin/verification/ngos/{{ngoProfileId}}/(approve|reject|pending)`
- **Registries (new tests)**: `GET /users/admin/ngos?page=1&limit=10`, `GET /users/admin/companies`, `GET /users/admin/donors`
- **Compliance flows**: `GET/POST /address/ngo`, `GET/POST /bank/ngo`
- **Aggregated listings**: `GET /users/ngos-with-campaigns`, `GET /users/companies-with-reports`
- Analytics: `GET /admin/analytics`

---

## 6. Negative Scenarios

- Missing JWT → `401`
- Wrong role → `403`
- Invalid payload → `400` with validation details
- Duplicate email → `400 Email already registered`
- Milestone progress outside 0–100 → `403`

---

## 7. CSR Annual Summary

- **POST** `{{base_url}}/csr/summary`

```json
{
  "companyId": "<companyProfileId>",
  "financialYear": "2024-2025"
}
```

- Response includes company metadata, CSR obligation/spend/utilization, project breakdown, beneficiaries, admin notes.

Run the Postman collection runner to automate these flows. Reset or seed the database as required to keep IDs valid for chained requests.
