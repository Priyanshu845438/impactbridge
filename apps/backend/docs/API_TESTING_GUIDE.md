# API Testing Guide – Auth Module

This guide walks through verifying the ImpactBridge auth APIs using Postman. All endpoints assume the backend runs locally at `http://localhost:3000` and global validation is enabled.

## Prerequisites

- Backend running via `npm run start:dev`
- Environment variable `JWT_SECRET` set (e.g. `export JWT_SECRET=dev-secret`)
- Postman or similar REST client

## 1. Register User

**Method:** POST  
**URL:** `http://localhost:3000/auth/register`

### Request Body (JSON)
```json
{
  "name": "Alice Admin",
  "email": "alice@example.com",
  "password": "password123",
  "role": "SUPER_ADMIN"
}
```

### Expected Response
- HTTP 201 (if using default Nest behavior) or 200 depending on controller config
- JSON payload without password:
```json
{
  "id": "<uuid>",
  "name": "Alice Admin",
  "email": "alice@example.com",
  "role": "SUPER_ADMIN",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>"
}
```

### Negative Tests
- Reusing the same email should return `400 Bad Request` with message `Email already registered`.
- Omitting required fields should trigger validation errors due to global `ValidationPipe`.

## 2. Login User

**Method:** POST  
**URL:** `http://localhost:3000/auth/login`

### Request Body (JSON)
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

### Expected Response
```json
{
  "user": {
    "id": "<uuid>",
    "name": "Alice Admin",
    "email": "alice@example.com",
    "role": "SUPER_ADMIN",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  },
  "accessToken": "<jwt-token>"
}
```

### Negative Tests
- Wrong password: expect `400 Bad Request` with message `Invalid credentials`.
- Unknown email: same error as above.

## 3. Using the JWT

- Copy `accessToken` from login response.
- Subsequent protected endpoints (to be implemented) should include header:  
  `Authorization: Bearer <accessToken>`

## Tips

- Configure a Postman environment variable `{{baseUrl}} = http://localhost:3000`.
- Store JWT in Postman env and use it in subsequent requests.
- Use Postman collection runner to automate regression tests once more endpoints are available.
