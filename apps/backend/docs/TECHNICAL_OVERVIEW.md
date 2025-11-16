# Technical Overview – ImpactBridge Backend

## Architecture Summary

- **Framework:** NestJS (modular, dependency injection driven)
- **Persistence:** Prisma ORM targeting PostgreSQL
- **Auth:** JWT-based authentication with bcrypt password hashing
- **Validation:** Global `ValidationPipe` enforcing DTO schemas

## Module Structure

- `auth/`
  - `auth.controller.ts`: exposes `/auth/register` and `/auth/login`
  - `auth.service.ts`: handles registration and login logic
  - `utils/password.util.ts`: bcrypt hash/compare helpers
  - `utils/jwt.util.ts`: JSON Web Token signing helper
  - `dto/`: `LoginDto`, `RegisterDto`
- `users/`
  - CRUD service wired to Prisma
  - DTOs for create/update with role validation
- `prisma/`
  - `prisma.service.ts` extends PrismaClient
  - `prisma.module.ts` exports service for others

## Prisma Usage

- Prisma Client generated under `prisma/generated`
- All service classes inject `PrismaService`
- User role enum sourced from Prisma’s generated `Role`
- User creation/update cast to Prisma types to ensure type safety

## DTO & Validation Strategy

- DTOs leverage `class-validator` and `@nestjs/mapped-types`
- Global `ValidationPipe` configured with `whitelist` + `forbidNonWhitelisted`
- Ensures controllers receive sanitized payloads only

## Authentication Flow

1. **Registration**
   - Hash password via `hashPassword`
   - Persist user with Prisma
   - Return user profile without password
2. **Login**
   - Verify password via `comparePassword`
  - Sign JWT with `signToken({ sub: user.id, role: user.role })`
   - Return profile + access token (1-day expiry)
3. **Future Work**
   - Implement JWT guard & strategy
   - Add refresh tokens if needed

## Environment Variables

- `JWT_SECRET`: required for JWT signing (throws if missing)
- Database connection string managed via Prisma `.env`

## Validation & Error Handling

- Uses NestJS exceptions (`BadRequestException` for auth errors)
- Prisma errors can be surfaced via filters (future enhancement)
- Validation errors returned automatically via `ValidationPipe`

## Build & Dev

- Run `npm run start:dev` for hot reloading (requires permissions on `dist/` or adjust output path)
- Codebase uses TypeScript; ensure `tsconfig.json` aligns with Nest defaults

## Testing & Tooling

- Tests not yet implemented; recommended to add e2e tests for auth
- Postman collection documented in `API_TESTING_GUIDE.md`
- Linting via Nest/Nx tooling (see `package.json` scripts)
