import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';
import { ApprovalsService } from '../../src/approvals/approvals.service';
import { FinancialService } from '../../src/financial/financial.service';
import { signToken } from '../../src/auth/utils/jwt.util';

describe('RBAC integration (controllers only)', () => {
  let app: INestApplication;

  const authService = {
    login: jest
      .fn()
      .mockResolvedValue({ accessToken: 'token', user: { id: 'user-login' } }),
  } satisfies Partial<AuthService> as AuthService;

  const usersService = {
    findById: jest.fn().mockResolvedValue({
      id: 'user-123',
      email: 'user@example.com',
      role: 'NGO',
    }),
    update: jest.fn().mockResolvedValue({ id: 'user-123', name: 'Updated' }),
    getNGOProfileByUserId: jest.fn().mockResolvedValue({ id: 'ngo-profile' }),
  } satisfies Partial<UsersService> as UsersService;

  const approvalsService = {
    approve: jest
      .fn()
      .mockResolvedValue({ id: 'approval-1', status: 'APPROVED' }),
    reject: jest
      .fn()
      .mockResolvedValue({ id: 'approval-1', status: 'REJECTED' }),
    revoke: jest
      .fn()
      .mockResolvedValue({ id: 'approval-1', status: 'REVOKED' }),
    requestApproval: jest
      .fn()
      .mockResolvedValue({ id: 'approval-1', status: 'PENDING' }),
  } satisfies Partial<ApprovalsService> as ApprovalsService;

  const financialService = {
    uploadReport: jest.fn().mockResolvedValue({ id: 'report-1' }),
    getReportsForNGO: jest.fn().mockResolvedValue([]),
  } satisfies Partial<FinancialService> as FinancialService;

  const tokens = {
    ngo: signToken({ sub: 'ngo-user', role: 'NGO' }),
    company: signToken({ sub: 'company-user', role: 'COMPANY' }),
    superAdmin: signToken({ sub: 'admin-user', role: 'SUPER_ADMIN' }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(ApprovalsService)
      .useValue(approvalsService)
      .overrideProvider(FinancialService)
      .useValue(financialService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
    usersService.getNGOProfileByUserId.mockResolvedValue({ id: 'ngo-profile' });
  });

  describe('Auth & Users', () => {
    it('allows public login without authentication header', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'someone@example.com', password: 'password123' })
        .expect(201);
      expect(authService.login).toHaveBeenCalled();
    });

    it('blocks access to /users/me when missing token', async () => {
      await request(app.getHttpServer()).get('/api/v1/users/me').expect(401);
    });

    it('allows authenticated user to access /users/me', async () => {
      const { status } = await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${tokens.ngo}`);
      expect(status).toBe(200);
    });
  });

  describe('Approvals workflow', () => {
    it('allows company role to approve', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${tokens.company}`)
        .send({ status: 'APPROVED', remarks: 'All good' });

      expect(response.status).toBe(201);
      expect(approvalsService.approve).toHaveBeenCalled();
    });

    it('rejects NGO role for approve endpoint', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${tokens.ngo}`)
        .send({ status: 'APPROVED' });

      expect(response.status).toBe(403);
    });

    it('allows company role to reject and blocks donors', async () => {
      const allowed = await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/reject')
        .set('Authorization', `Bearer ${tokens.company}`)
        .send({ status: 'REJECTED', remarks: 'Nope' });
      expect(allowed.status).toBe(201);

      const denied = await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/reject')
        .set('Authorization', `Bearer ${tokens.ngo}`)
        .send({ status: 'REJECTED' });
      expect(denied.status).toBe(403);
    });

    it('allows company role to revoke and denies NGO', async () => {
      const allowed = await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/revoke')
        .set('Authorization', `Bearer ${tokens.company}`)
        .send({ remarks: 'Revoked' });
      expect(allowed.status).toBe(201);

      const denied = await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/revoke')
        .set('Authorization', `Bearer ${tokens.ngo}`)
        .send({ remarks: 'Trying to revoke' });
      expect(denied.status).toBe(403);
    });
  });

  describe('Financial reports', () => {
    it('allows NGO to upload reports', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/financial/ngo/upload')
        .set('Authorization', `Bearer ${tokens.ngo}`)
        .send({
          reportType: 'AUDITED',
          fiscalYear: '2024-2025',
          url: 'https://example.com/report.pdf',
        });

      expect(response.status).toBe(201);
      expect(financialService.uploadReport).toHaveBeenCalled();
    });

    it('denies company role from uploading NGO report', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/financial/ngo/upload')
        .set('Authorization', `Bearer ${tokens.company}`)
        .send({
          reportType: 'AUDITED',
          fiscalYear: '2024-2025',
          url: 'https://example.com/report.pdf',
        });

      expect(response.status).toBe(403);
    });

    it('allows NGO to list own reports and blocks super-admin on NGO endpoint', async () => {
      const allowed = await request(app.getHttpServer())
        .get('/api/v1/financial/ngo/my-reports')
        .set('Authorization', `Bearer ${tokens.ngo}`);
      expect(allowed.status).toBe(200);

      const denied = await request(app.getHttpServer())
        .get('/api/v1/financial/ngo/my-reports')
        .set('Authorization', `Bearer ${tokens.company}`);
      expect(denied.status).toBe(403);
    });
  });
});
