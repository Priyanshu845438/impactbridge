# API Testing Guide – ImpactBridge Backend

This guide explains how to validate each API using the Postman collection located at `docs/postman/impactbridge.postman_collection.json`. The collection already sets `{{base_url}} = http://localhost:3000` and automatically injects the JWT token after login.

## 1. Authentication
### 1.1 Register User
- **Method:** POST
- **URL:** `{{base_url}}/auth/register`
- **Body (required fields):**
```json
{
  "name": "Alice NGO",
  "email": "ngo@example.com",
  "password": "password123",
  "role": "NGO"
}
```

### 1.2 Login User
- **Method:** POST
- **URL:** `{{base_url}}/auth/login`
- **Body:**
```json
{
  "email": "ngo@example.com",
  "password": "password123"
}
```
- **Response:** contains `accessToken` which collection stores automatically.

## 2. NGO Self-Service APIs (requires NGO login)
### 2.1 Get My Profile
- **Method:** GET `{{base_url}}/users/me`
- **Description:** Returns the authenticated NGO user record.

### 2.2 Update My Profile
- **Method:** PATCH `{{base_url}}/users/me`
- **Body (all optional):**
```json
{
  "name": "ImpactBridge Foundation",
  "email": "updated-ngo@example.com",
  "phone": "+911234567890",
  "address": "221B Baker Street"
}
```

### 2.3 Change Password
- **Method:** POST `{{base_url}}/users/change-password`
- **Body (required):**
```json
{
  "oldPassword": "password123",
  "newPassword": "newSecret456"
}
```

### 2.4 Update Registered Address
- **Method:** POST `{{base_url}}/address/ngo`
- **Body (required):**
```json
{
  "line1": "123 Trust Lane",
  "line2": "Suite 2",
  "district": "Bengaluru Urban",
  "state": "Karnataka",
  "pincode": "560001",
  "country": "India"
}
```

### 2.5 Update Bank Details
- **Method:** POST `{{base_url}}/bank/ngo`
- **Body (required fields):**
```json
{
  "accountHolder": "ImpactBridge NGO",
  "accountNumber": "123456789012",
  "ifscCode": "HDFC0001234",
  "bankName": "HDFC Bank",
  "branchName": "MG Road"
}
```

### 2.6 Upload NGO Document
- **Method:** POST `{{base_url}}/documents/ngo`
- **Body (required):**
```json
{
  "type": "CSR_POLICY",
  "fileUrl": "https://files.example.com/csr-policy.pdf"
}
```

### 2.7 Create Campaign
- **Method:** POST `{{base_url}}/campaigns`
- **Body (required):**
```json
{
  "title": "Clean Water Drive",
  "description": "Provide clean water filters to rural schools.",
  "category": "HEALTHCARE",
  "targetAmount": 500000,
  "isPublic": true
}
```

### 2.8 Generate Donation Receipt
- **Method:** POST `{{base_url}}/receipts`
- **Body (required):**
```json
{
  "donationId": "<existingDonationId>",
  "receiptUrl": "https://files.example.com/receipt.pdf"
}
```

### 2.9 NGO Donation History
- **Method:** GET `{{base_url}}/donations/ngo`
- **Description:** Lists all donations across campaigns owned by the NGO.

## 3. Donation APIs
### 3.1 Authenticated Donation (Company/Donor)
- **Method:** POST `{{base_url}}/donations/{{campaignId}}`
- **Body:**
```json
{
  "amount": 5000,
  "paymentRef": "TXN123",
  "csrEligible": true,
  "isForeignDonor": false
}
```

### 3.2 My Donations
- **Method:** GET `{{base_url}}/donations/me`

### 3.3 Public Donation (no auth)
- **Method:** POST `{{base_url}}/public/campaigns/{{campaignId}}/donate`
- **Body:**
```json
{
  "amount": 2000,
  "donorName": "Guest Donor",
  "email": "guest@example.com"
}
```

## 4. Public Campaign Browsing
- **GET** `{{base_url}}/campaigns/public`
- **GET** `{{base_url}}/campaigns/public/{{campaignId}}`

## 5. Admin Insights (SUPER_ADMIN token)
- **GET** `{{base_url}}/users/admin/ngos`
- **GET** `{{base_url}}/users/admin/companies`
- **GET** `{{base_url}}/users/admin/donors`
- **GET** `{{base_url}}/donations/admin/all`
- **GET** `{{base_url}}/admin/analytics`

## 6. Legacy Endpoints (Audit Only)
- **GET** `{{base_url}}/users`
- **GET** `{{base_url}}/users/{{userId}}`

## Negative Cases
- Missing token → 401 Unauthorized.
- Wrong role (e.g., donor hitting NGO-only endpoint) → 403 Forbidden.
- Invalid payload → 400 with validation details.

Use the Postman collection runners to execute full flows in order: Auth → NGO Self-Service → Donations → Admin. Populate campaign/donation IDs from earlier responses when needed.
