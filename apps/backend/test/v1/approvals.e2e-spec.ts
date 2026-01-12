import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import path from 'node:path';
import dotenv from 'dotenv';
import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { NotificationsService } from '../../src/notifications/notifications.service';
import { AnalyticsAggregationService } from '../../src/analytics/analytics-aggregation.service';
import { signToken } from '../../src/auth/utils/jwt.util';
import { NotificationChannel } from '../../src/notifications/notification.types';

function createApprovalFixture(overrides: Partial<ReturnType<typeof baseApproval>> = {}) {
  return {
    ...baseApproval(),
    ...overrides,
  };
}

function baseApproval() {
  return {
    id: 'approval-1',
    status: 'PENDING' as const,
    campaignId: 'campaign-1',
    companyId: 'company-1',
    ngoId: 'ngo-1',
    remarks: null,
    campaign: {
      id: 'campaign-1',
      ngoId: 'ngo-1',
      title: 'Clean Water Initiative',
    },
    company: {
      id: 'company-1',
      userId: 'company-user',
      deletedAt: null,
      user: {
        id: 'company-user',
        name: 'Company User',
        email: 'company@example.com',
      },
    },
    ngo: {
      id: 'ngo-1',
      userId: 'ngo-user',
      user: {
        id: 'ngo-user',
        name: 'NGO User',
        email: 'ngo@example.com',
      },
    },
  } as const;
}

describe('ApprovalsController failure-safety (e2e)', () => {
  let app: INestApplication;
  let prisma: jest.Mocked<PrismaService>;
  let notifications: { enqueue: jest.Mock };
  let analytics: AnalyticsAggregationService;

  const ngoUser = { id: 'ngo-user', role: 'NGO' } as const;
  const companyUser = { id: 'company-user', role: 'COMPANY' } as const;

  let ngoToken: string;
  let companyToken: string;

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
      auditLog: { create: jest.fn() },
    } as unknown as jest.Mocked<PrismaService>;

    notifications = { enqueue: jest.fn() };

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

    ngoToken = await signToken({ sub: ngoUser.id, role: ngoUser.role });
    companyToken = await signToken({ sub: companyUser.id, role: companyUser.role });
  });

  afterEach(() => {
    jest.clearAllMocks();
    notifications.enqueue.mockReset();
    prisma.campaignApproval.findUnique.mockReset();
    prisma.campaignApproval.update.mockReset();
    prisma.campaignApproval.groupBy.mockReset();
    prisma.auditLog.create.mockReset();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('approve()', () => {
    beforeEach(() => {
      const pending = createApprovalFixture();
      const approved = createApprovalFixture({ status: 'APPROVED' });

      prisma.campaignApproval.findUnique
        .mockResolvedValueOnce(pending as any)
        .mockResolvedValueOnce(approved as any);
      prisma.campaignApproval.update.mockResolvedValue(approved as any);
      prisma.campaign.findUnique.mockResolvedValue({
        id: pending.campaignId,
        ngoId: pending.ngoId,
      } as any);
      prisma.companyProfile.findUnique.mockResolvedValue({
        id: pending.companyId,
        deletedAt: null,
      } as any);
    });

    it('updates approval even if notification enqueue fails', async () => {
      notifications.enqueue.mockRejectedValueOnce(new Error('provider offline'));

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'APPROVED', remarks: 'Looks good' })
        .expect(500);

      expect(prisma.campaignApproval.update).toHaveBeenCalledTimes(1);
      expect(prisma.auditLog.create).toHaveBeenCalledTimes(1);
      expect(notifications.enqueue).toHaveBeenCalledWith(
        'email' satisfies NotificationChannel,
        expect.objectContaining({ email: 'company@example.com' }),
        expect.objectContaining({
          metadata: expect.objectContaining({ event: 'NGO_APPROVAL_APPROVED' }),
        }),
      );
    });

    it('keeps analytics overview stable after notification failure', async () => {
      notifications.enqueue.mockRejectedValueOnce(new Error('provider offline'));

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'APPROVED', remarks: 'Looks good' })
        .expect(500);

      prisma.campaignApproval.groupBy.mockResolvedValueOnce([
        { status: 'APPROVED', _count: { _all: 3 } },
        { status: 'PENDING', _count: { _all: 2 } },
      ] as any);

      const overview = await analytics.getApprovalOverview();
      expect(overview.totalApprovals).toBe(5);
      expect(overview.byStatus).toEqual({ APPROVED: 3, PENDING: 2 });
    });
  });

  describe('reject()', () => {
    beforeEach(() => {
      const pending = createApprovalFixture();
      const rejected = createApprovalFixture({
        status: 'REJECTED',
        remarks: 'Insufficient documentation',
      });

      prisma.campaignApproval.findUnique
        .mockResolvedValueOnce(pending as any)
        .mockResolvedValueOnce(rejected as any);
      prisma.campaignApproval.update.mockResolvedValue(rejected as any);
      prisma.campaign.findUnique.mockResolvedValue({
        id: pending.campaignId,
        ngoId: pending.ngoId,
      } as any);
      prisma.companyProfile.findUnique.mockResolvedValue({
        id: pending.companyId,
        deletedAt: null,
      } as any);
    });

    it('records rejection with audit log even when notifications fail', async () => {
      notifications.enqueue.mockRejectedValueOnce(new Error('provider offline'));

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/reject')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'REJECTED', remarks: 'Insufficient documentation' })
        .expect(500);

      expect(prisma.campaignApproval.update).toHaveBeenCalledTimes(1);
      expect(prisma.auditLog.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('analytics visibility', () => {
    it('tracks approval counts after mixed status changes', async () => {
      prisma.campaignApproval.groupBy.mockResolvedValueOnce([
        { status: 'APPROVED', _count: { _all: 2 } },
        { status: 'PENDING', _count: { _all: 1 } },
        { status: 'REJECTED', _count: { _all: 1 } },
      ] as any);

      const overview = await analytics.getApprovalOverview();

      expect(prisma.campaignApproval.groupBy).toHaveBeenCalledWith({
        where: { companyId: undefined, ngoId: undefined },
        by: ['status'],
        _count: { _all: true },
      });
      expect(overview.totalApprovals).toBe(4);
      expect(overview.byStatus).toEqual({
        APPROVED: 2,
        PENDING: 1,
        REJECTED: 1,
      });
    });
  });
});
