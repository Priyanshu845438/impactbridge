# Postman Testing Guide – ImpactBridge Backend

This document lists all REST endpoints with sample payloads and expected responses. Use it alongside the Postman collection (`docs/postman/impactbridge.postman_collection.json`). Base URL: `http://localhost:3000`.

## 1. Authentication & Invitations
| Endpoint | Method | Body | Notes |
| --- | --- | --- | --- |
| `/auth/register` | POST | `{ "name": "Alice NGO", "email": "ngo@example.com", "password": "password123", "role": "NGO" }` | Registers user & auto-seeds profile. |
| `/auth/login` | POST | `{ "email": "ngo@example.com", "password": "password123" }` | Returns `{ user, accessToken }`; Postman stores token. |
| `/admin/invite` | POST | `{ "email": "reviewer@example.com", "role": "REVIEWER" }` | SUPER_ADMIN only. Response includes invite link token. |
| `/auth/accept-invite` | POST | `{ "token": "<inviteToken>", "password": "StrongPass!1" }` | Creates invited account. |

## 2. NGO Compliance & Operations
| Flow | Endpoint | Method | Body |
| --- | --- | --- | --- |
| Profile | `/users/me` | GET/PATCH | optional `{ name, email, phone }` |
| Address | `/address/ngo` | POST | `{ line1, line2?, district, state, pincode, country }` |
| Bank | `/bank/ngo` | POST | `{ accountHolder, accountNumber, ifscCode, bankName, branchName? }` |
| Documents | `/documents/ngo` | POST | `{ type, fileUrl }` |
| Campaign | `/campaigns` | POST | `{ title, description, category, targetAmount, isPublic }` (needs verification) |
| Milestones | `/milestones/:campaignId` | POST | `{ title, description, targetDate, budget }` |
| Milestone Status | `/milestones/status/:milestoneId` | PATCH | `{ status, progressPercent }` |
| Impact Metrics | `/impact/:campaignId` | POST | `{ name, value, unit, milestoneId? }` |
| Utilization | `/utilization/:campaignId` | POST | `{ amountUsed, description, proofUrl, milestoneId? }` |
| Donation Receipts | `/receipts` | POST | `{ donationId, receiptUrl }` |

## 3. Company CSR
| Endpoint | Method | Body | Role |
| --- | --- | --- | --- |
| `/csr/company/budget` | POST | `{ annualBudget, allocated?, spent? }` | COMPANY |
| `/csr/company/status` | GET | – | COMPANY |
| `/csr/company/spent` | POST | `{ spent }` | COMPANY |
| `/csr/summary` | POST | `{ companyId, financialYear }` | COMPANY / SUPER_ADMIN |

## 4. Donations & History
- Authenticated donation: `POST /donations/:campaignId` → `{ amount, paymentRef?, csrEligible, isForeignDonor }`
- Public donation: `POST /public/campaigns/:campaignId/donate` → `{ amount, donorName, email }`
- Histories:
  - `/donations/me` (auth user)
  - `/donations/ngo`
  - `/donations/admin/all`

## 5. Verification & Admin Oversight
- NGO verification: `POST /admin/verification/ngos/:id/(approve|reject|pending)`
- Profiles: `GET /users/admin/(ngos|companies|donors)`
- Analytics: `GET /admin/analytics`
- Milestone list (cross-role): `GET /milestones/:campaignId`
- Utilization list: `GET /utilization/campaign/:id`, `GET /utilization/milestone/:id`, `GET /utilization/admin/all`

## 6. CSR Summary Response Shape
`POST /csr/summary` returns:
```json
{
  "company": { "id": "...", "name": "Acme Corp", "email": "csr@acme.com", "financialYear": "2024-2025" },
  "summary": {
    "csrObligation": 1000000,
    "totalDisbursed": 400000,
    "amountUtilized": 350000,
    "unspentAmount": 650000,
    "totalApprovedProjects": 3
  },
  "projectList": [
    {
      "campaignId": "...",
      "title": "Clean Water Drive",
      "goalAmount": 500000,
      "amountRaised": 320000,
      "amountDisbursed": 200000,
      "amountUtilized": 180000,
      "impactSummary": [ { "name": "Households Served", "value": 250, "unit": "people" } ],
      "utilizationReports": [ { "amountUsed": 120000, "description": "Procured filters", "proofUrl": "..." } ]
    }
  ],
  "beneficiaries": 750,
  "impactMetricsSummary": { "people": 750, "trees": 1200 },
  "adminNotes": "Auto-generated CSR summary. Review utilization reports for proof links."
}
```

---

Use Postman’s “Tests” tab to validate status codes, response shapes, and capture IDs (campaignId, milestoneId, etc.) for chained requests.
