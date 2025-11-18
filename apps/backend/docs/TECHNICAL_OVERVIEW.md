# Technical Overview – ImpactBridge Backend

## Architecture Summary

- **Framework:** NestJS (modular, dependency injection driven)
- **Persistence:** Prisma ORM targeting PostgreSQL
- **Auth:** JWT-based authentication with bcrypt hashing and RBAC
- **Validation:** Global `ValidationPipe` with whitelist + forbidNonWhitelisted

## Module Structure

- `auth/`
  - `auth.controller.ts`: `/auth/register`, `/auth/login`
  - `auth.service.ts`: registration/login logic, JWT issuance
  - `utils/password.util.ts`: bcrypt helpers
  - `utils/jwt.util.ts`: JWT signing helper
  - `guards/jwt-auth.guard.ts`: validates JWT and populates `request.user`
  - `guards/roles.guard.ts`: enforces role-based access via metadata
  - `decorators/current-user.decorator.ts`: retrieves authenticated user
  - `decorators/roles.decorator.ts`: attaches required roles metadata
  - `dto/`: `LoginDto`, `RegisterDto`
- `user/`
  - `user.controller.ts`: `/users/:id` (public) and `/users/me` (JWT protected)
  - `user.service.ts`: profile lookups, strips passwords
  - `user.module.ts`: wires controller/service with `PrismaModule`
- `users/`
  - Legacy module for CRUD operations (to be unified later)
- `prisma/`
  - `prisma.service.ts` extends PrismaClient
  - `prisma.module.ts` exports `PrismaService`

## Prisma Usage

- Prisma Client generated under `prisma/generated`
- Services inject `PrismaService` for DB access
- Role enum sourced from Prisma `Role`
- User data sanitized (password removed) before returning to clients

## Authentication Flow

1. **Registration**
   - Hash password via `hashPassword`
   - Persist user with Prisma
   - Return sanitized profile
2. **Login**
   - Validate credentials via `comparePassword`
   - Sign JWT with `signToken({ sub: user.id, role: user.role })`
   - Return profile + token
3. **Protected Access**
   - Guard routes with `JwtAuthGuard`
   - Apply `@Roles(...)` as needed; `RolesGuard` checks `request.user.role`

## Environment Variables

- `JWT_SECRET`: required for JWT signing (throws if missing)
- Database connection string defined in Prisma configuration

## Validation & Error Handling

- Uses Nest exceptions (`BadRequestException`, `UnauthorizedException`, `ForbiddenException`)
- Validation errors surfaced by `ValidationPipe`

## Build & Dev

- `npm run start:dev` for hot reload
- `npm run build` to compile TypeScript to `dist/`

## Testing & Tooling

- Tests not yet implemented; add e2e tests for auth/profile flows
- Postman workflows outlined in `docs/API_TESTING_GUIDE.md`
- Linting scripts defined in `package.json`
