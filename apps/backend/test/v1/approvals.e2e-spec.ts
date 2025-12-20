import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { signToken } from '../../src/auth/utils/jwt.util';

describe('ApprovalsController (e2e)', () => {
  let app: INestApplication;
  let prisma: jest.Mocked<PrismaService>;

  const companyUser = { id: 'company-user', role: 'COMPANY' } as const;
  const ngoUser = { id: 'ngo-user', role: 'NGO' } as const;

  const companyToken = signToken({
    sub: companyUser.id,
    role: companyUser.role,
  });
  const ngoToken = signToken({ sub: ngoUser.id, role: ngoUser.role });

  beforeAll(async () => {
    prisma = {
      campaign: { findUnique: jest.fn() },
      companyProfile: { findUnique: jest.fn() },
      campaignApproval: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
      },
      auditLog: {
        create: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
    prisma.auditLog.create.mockReset();
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
  });
});
