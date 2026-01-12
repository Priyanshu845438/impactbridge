import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import path from 'node:path';
import dotenv from 'dotenv';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { signToken } from '../../src/auth/utils/jwt.util';
import { NotificationsService } from '../../src/notifications/notifications.service';
import { AnalyticsAggregationService } from '../../src/analytics/analytics-aggregation.service';

describe('ApprovalsController (e2e)', () => {
  let app: INestApplication;
  let prisma: jest.Mocked<PrismaService>;
  let notifications: { enqueue: jest.Mock };
  let analytics: AnalyticsAggregationService;

  const companyUser = { id: 'company-user', role: 'COMPANY' } as const;
  const ngoUser = { id: 'ngo-user', role: 'NGO' } as const;

  let companyToken: string;
  let ngoToken: string;

  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

    prisma = {
      campaign: { findUnique: jest.fn() },
      companyProfile: { findUnique: jest.fn() },
      campaignApproval: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
        groupBy: jest.fn(),
      },
      auditLog: {
        create: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    notifications = {
      enqueue: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .overrideProvider(NotificationsService)
      .useValue(notifications)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    analytics = moduleFixture.get(AnalyticsAggregationService);

    companyToken = await signToken({
      sub: companyUser.id,
      role: companyUser.role,
    });
    ngoToken = await signToken({ sub: ngoUser.id, role: ngoUser.role });

    notifications.enqueue.mockResolvedValue({ id: 'intent-1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
    prisma.auditLog.create.mockReset();
    notifications.enqueue.mockResolvedValue({ id: 'intent-1' });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/approvals/:campaignId/request', () => {
    it('allows valid NGO to request approval', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-user',
      } as any);
      prisma.companyProfile.findUnique.mockResolvedValue({
        id: 'company-profile',
        deletedAt: null,
      } as any);
      prisma.campaignApproval.findUnique.mockResolvedValue(null);
      prisma.campaignApproval.create.mockResolvedValue({
        id: 'approval-1',
        status: 'PENDING',
      } as any);

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/request')
        .set('Authorization', `Bearer ${ngoToken}`)
        .send({ companyId: 'company-profile', remarks: 'Please review' })
        .expect(201);
    });

    it('blocks when campaign owned by another NGO', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'other-ngo',
      } as any);

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/request')
        .set('Authorization', `Bearer ${ngoToken}`)
        .send({ companyId: 'company-profile' })
        .expect(403);
    });
    it('forbids company user from requesting approval', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-user',
      } as any);

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/request')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ companyId: 'company-profile' })
        .expect(403);

      expect(prisma.campaignApproval.create).not.toHaveBeenCalled();
    });
  });

  describe('Failure safety validations', () => {
    const baseApproval = {
      id: 'approval-1',
      status: 'PENDING',
      campaignId: 'campaign-1',
      companyId: 'company-user',
      ngoId: 'ngo-user',
      remarks: null,
      campaign: {
        id: 'campaign-1',
        ngoId: 'ngo-user',
        title: 'Campaign',
      },
      company: {
        id: 'company-user',
        userId: companyUser.id,
        deletedAt: null,
        user: { id: 'company-user', name: 'Company', email: 'company@example.com' },
      },
      ngo: {
        id: 'ngo-user',
        userId: ngoUser.id,
        user: { id: 'ngo-user', name: 'NGO', email: 'ngo@example.com' },
      },
    } as const;

    beforeEach(() => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-user',
      } as any);
      prisma.companyProfile.findUnique.mockResolvedValue({
        id: 'company-user',
        deletedAt: null,
      } as any);
      notifications.enqueue.mockResolvedValue({ id: 'intent-1' });
    });

    it('persists approval status and audit log when notification enqueue fails', async () => {
      prisma.campaignApproval.findUnique
        .mockResolvedValueOnce({ ...baseApproval })
        .mockResolvedValueOnce({ ...baseApproval, status: 'APPROVED' });
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
      } as any);
      notifications.enqueue.mockRejectedValueOnce(new Error('notification failure'));

      const response = await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'APPROVED', remarks: 'All good' });

      expect(response.status).toBeGreaterThanOrEqual(500);
      expect(prisma.campaignApproval.update).toHaveBeenCalledTimes(1);
      expect(prisma.auditLog.create).toHaveBeenCalledTimes(1);
      expect(prisma.campaignApproval.create).not.toHaveBeenCalled();
      expect(notifications.enqueue).toHaveBeenCalledTimes(1);
    });

    it('keeps approval analytics available even after notification failure', async () => {
      prisma.campaignApproval.findUnique
        .mockResolvedValueOnce({ ...baseApproval })
        .mockResolvedValueOnce({ ...baseApproval, status: 'APPROVED' });
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
      } as any);
      notifications.enqueue.mockRejectedValueOnce(new Error('notification failure'));

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'APPROVED', remarks: 'All good' })
        .expect(500);

      prisma.campaignApproval.groupBy.mockResolvedValue([
        { status: 'APPROVED', _count: { _all: 3 } },
        { status: 'PENDING', _count: { _all: 2 } },
      ] as any);

      const overview = await analytics.getApprovalOverview();

      expect(overview.totalApprovals).toBe(5);
      expect(overview.byStatus).toEqual({ APPROVED: 3, PENDING: 2 });
      expect(prisma.campaignApproval.groupBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/v1/approvals/:campaignId/approve', () => {
    beforeEach(() => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        id: 'approval-1',
        status: 'PENDING',
        companyId: 'company-user',
        campaignId: 'campaign-1',
        ngoId: 'ngo-user',
        campaign: { id: 'campaign-1', ngoId: 'ngo-user', title: 'Campaign' },
        company: {
          id: 'company-user',
          userId: companyUser.id,
          deletedAt: null,
        },
        ngo: { id: 'ngo-user', userId: ngoUser.id },
      } as any);
      prisma.campaignApproval.update.mockResolvedValue({
        id: 'approval-1',
        status: 'APPROVED',
      } as any);
    });

    it('approves pending request', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'APPROVED', remarks: 'All good' })
        .expect(201);
    });

    it('rejects invalid status', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'REJECTED' })
        .expect(400);
    });

    it('forbids NGO from approving requests', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${ngoToken}`)
        .send({ status: 'APPROVED', remarks: 'invalid' })
        .expect(403);

      expect(prisma.campaignApproval.update).not.toHaveBeenCalled();
    });

  });

  describe('POST /api/v1/approvals/:campaignId/reject', () => {
    beforeEach(() => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
      } as any);
      prisma.campaignApproval.update.mockResolvedValue({
        id: 'approval-1',
        status: 'REJECTED',
      } as any);
    });

    const baseApproval = {
      id: 'approval-1',
      status: 'PENDING',
      campaignId: 'campaign-1',
      companyId: 'company-user',
      ngoId: 'ngo-user',
      campaign: { id: 'campaign-1', ngoId: 'ngo-user', title: 'Campaign' },
      company: { id: 'company-user', userId: companyUser.id, deletedAt: null },
      ngo: { id: 'ngo-user', userId: ngoUser.id },
    };

    it('rejects pending request', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/reject')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'REJECTED', remarks: 'Not aligned' })
        .expect(201);
    });

    it('forbids NGO from rejecting requests', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/reject')
        .set('Authorization', `Bearer ${ngoToken}`)
        .send({ status: 'REJECTED', remarks: 'nope' })
        .expect(403);

      expect(prisma.campaignApproval.update).not.toHaveBeenCalled();
    });

  });

  describe('POST /api/v1/approvals/:campaignId/revoke', () => {
    beforeEach(() => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        id: 'approval-1',
        status: 'APPROVED',
        campaignId: 'campaign-1',
        companyId: 'company-user',
        ngoId: 'ngo-user',
        campaign: { id: 'campaign-1', ngoId: 'ngo-user', title: 'Campaign' },
        company: {
          id: 'company-user',
          userId: companyUser.id,
          deletedAt: null,
        },
        ngo: { id: 'ngo-user', userId: ngoUser.id },
      } as any);
      prisma.campaignApproval.update.mockResolvedValue({
        id: 'approval-1',
        status: 'REVOKED',
      } as any);
    });

    it('revokes approved requests', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/revoke')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ remarks: 'contract breach' })
        .expect(201);
    });

    it('fails when approval not approved', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValueOnce({
        id: 'approval-1',
        status: 'PENDING',
        campaignId: 'campaign-1',
        companyId: 'company-user',
        ngoId: 'ngo-user',
        campaign: { id: 'campaign-1', ngoId: 'ngo-user', title: 'Campaign' },
        company: {
          id: 'company-user',
          userId: companyUser.id,
          deletedAt: null,
        },
        ngo: { id: 'ngo-user', userId: ngoUser.id },
      } as any);

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/revoke')
        .set('Authorization', `Bearer ${companyToken}`)
        .send()
        .expect(403);
    });

    it('forbids NGO from revoking approvals', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/revoke')
        .set('Authorization', `Bearer ${ngoToken}`)
        .send({ remarks: 'cannot revoke' })
        .expect(403);

      expect(prisma.campaignApproval.update).not.toHaveBeenCalled();
    });

  });
});
