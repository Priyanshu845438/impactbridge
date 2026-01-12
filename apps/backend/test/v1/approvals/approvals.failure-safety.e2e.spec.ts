import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import path from 'node:path';
import dotenv from 'dotenv';
import request from 'supertest';

import { AppModule } from '../../../src/app.module';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { NotificationsService } from '../../../src/notifications/notifications.service';
import { AnalyticsAggregationService } from '../../../src/analytics/analytics-aggregation.service';
import { signToken } from '../../../src/auth/utils/jwt.util';

const approvalFixture = () => ({
  id: 'approval-1',
  status: 'PENDING' as const,
  campaignId: 'campaign-1',
  companyId: 'company-user',
  ngoId: 'ngo-user',
  remarks: null,
  campaign: {
    id: 'campaign-1',
    ngoId: 'ngo-user',
    title: 'Water for All',
  },
  company: {
    id: 'company-user',
    userId: 'company-user',
    deletedAt: null,
    user: {
      id: 'company-user',
      name: 'Acme Corp',
      email: 'company@example.com',
    },
  },
  ngo: {
    id: 'ngo-user',
    userId: 'ngo-user',
    user: {
      id: 'ngo-user',
      name: 'Helping Hands',
      email: 'ngo@example.com',
    },
  },
});

describe('Approvals failure-safety (e2e)', () => {
  let app: INestApplication;
  let prisma: jest.Mocked<PrismaService>;
  let notifications: { enqueue: jest.Mock };
  let analytics: AnalyticsAggregationService;

  const ngoUser = { id: 'ngo-user', role: 'NGO' } as const;
  const companyUser = { id: 'company-user', role: 'COMPANY' } as const;

  let companyToken: string;

  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

    prisma = {
      campaign: { findUnique: jest.fn() },
      companyProfile: { findUnique: jest.fn() },
      campaignApproval: {
        findUnique: jest.fn(),
        update: jest.fn(),
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

    companyToken = await signToken({ sub: companyUser.id, role: companyUser.role });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('approve()', () => {
    beforeEach(() => {
      const pending = approvalFixture();
      const approved = approvalFixture({ status: 'APPROVED' });

      prisma.campaign.findUnique.mockResolvedValue({
        id: pending.campaignId,
        ngoId: pending.ngoId,
      } as any);
      prisma.companyProfile.findUnique.mockResolvedValue({
        id: pending.companyId,
        deletedAt: null,
      } as any);

      const findUnique = prisma.campaignApproval.findUnique as jest.Mock;
      findUnique.mockReset();
      findUnique.mockResolvedValue(approved as any);
      findUnique.mockResolvedValueOnce(pending as any);

      prisma.campaignApproval.update.mockResolvedValue(approved as any);
    });

    it('persists approval state and audit log when notifications fail', async () => {
      notifications.enqueue.mockRejectedValueOnce(new Error('provider offline'));

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'APPROVED', remarks: 'All good' })
        .expect(500).catch(err => err.response ? console.log(err.response.status, err.response.text) : null);

      expect(prisma.campaignApproval.update).toHaveBeenCalledTimes(1);
      expect(prisma.auditLog.create).toHaveBeenCalledTimes(1);
    });

    it('keeps analytics counts available when notifications fail', async () => {
      notifications.enqueue.mockRejectedValueOnce(new Error('provider offline'));

      await request(app.getHttpServer())
        .post('/api/v1/approvals/campaign-1/approve')
        .set('Authorization', `Bearer ${companyToken}`)
        .send({ status: 'APPROVED', remarks: 'All good' })
        .expect(500).catch(err => err.response ? console.log(err.response.status, err.response.text) : null);

      prisma.campaignApproval.groupBy.mockResolvedValueOnce([
        { status: 'APPROVED', _count: { _all: 3 } },
        { status: 'PENDING', _count: { _all: 2 } },
      ] as any);

      const overview = await analytics.getApprovalOverview();
      expect(overview.totalApprovals).toBe(5);
      expect(overview.byStatus).toEqual({ APPROVED: 3, PENDING: 2 });
    });
  });
});
