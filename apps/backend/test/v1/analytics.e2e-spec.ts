import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { signToken } from '../../src/auth/utils/jwt.util';
import { UserRole } from '../../src/user/user-role.enum';
import { ProgrammeStatus } from 'prisma/generated';

describe('V1 AnalyticsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const adminToken = signToken({ sub: 'admin-id', role: UserRole.SUPER_ADMIN });
  const donorToken = signToken({ sub: 'donor-id', role: UserRole.DONOR });

  beforeAll(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();

    await seedData(prisma);
  });

  afterAll(async () => {
    await prisma.$transaction([
      prisma.donation.deleteMany({}),
      prisma.cSRProgramme.deleteMany({}),
      prisma.campaignApproval.deleteMany({}),
      prisma.campaign.deleteMany({}),
      prisma.companyProfile.deleteMany({}),
      prisma.ngoProfile.deleteMany({}),
      prisma.user.deleteMany({}),
    ]);

    await app.close();
  });

  it('returns analytics overview for super admins', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/admin/analytics/overview')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(res.body).toMatchObject({
      donations: {
        summary: {
          totalCount: 3,
          totalAmount: 3000,
        },
        totals: expect.arrayContaining([
          expect.objectContaining({ label: 'Total' }),
          expect.objectContaining({ label: 'Last 7 days' }),
          expect.objectContaining({ label: 'Today' }),
        ]),
        timeline: expect.any(Array),
      },
      programmes: {
        summary: {
          totalProgrammes: 2,
          byStatus: expect.objectContaining({
            [ProgrammeStatus.ACTIVE]: 1,
            [ProgrammeStatus.COMPLETED]: 1,
          }),
        },
        counts: expect.arrayContaining([
          expect.objectContaining({ status: ProgrammeStatus.ACTIVE, count: 1 }),
          expect.objectContaining({ status: ProgrammeStatus.COMPLETED, count: 1 }),
        ]),
      },
      approvals: {
        summary: {
          totalApprovals: 2,
          byStatus: expect.objectContaining({ APPROVED: 1, PENDING: 1 }),
        },
        counts: expect.arrayContaining([
          expect.objectContaining({ status: 'APPROVED', count: 1 }),
          expect.objectContaining({ status: 'PENDING', count: 1 }),
        ]),
      },
      financial: {
        totalReports: 0,
        ngoCount: 0,
        latestSubmittedAt: null,
      },
      recentActivity: expect.any(Array),
    });

    expect(res.body.donations.summary.today.count).toBeGreaterThanOrEqual(1);
  });

  it('forbids access for non-admin roles', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/admin/analytics/overview')
      .set('Authorization', `Bearer ${donorToken}`)
      .expect(403);
  });
});

async function seedData(prisma: PrismaService) {
  await prisma.$transaction([
    prisma.user.create({
      data: {
        id: 'admin-id',
        email: 'admin@example.com',
        password: 'hashed',
        name: 'Admin',
        role: UserRole.SUPER_ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        id: 'ngo-user',
        email: 'ngo@example.com',
        password: 'hashed',
        name: 'NGO User',
        role: UserRole.NGO,
        ngoProfile: {
          create: {
            id: 'ngo-profile',
            registrationNumber: 'NGO123',
            status: 'ACTIVE',
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        id: 'company-user',
        email: 'company@example.com',
        password: 'hashed',
        name: 'Company User',
        role: UserRole.COMPANY,
        companyProfile: {
          create: {
            id: 'company-profile',
            cin: 'CIN123',
            status: 'ACTIVE',
          },
        },
      },
    }),
    prisma.campaign.create({
      data: {
        id: 'campaign-1',
        title: 'Campaign One',
        ngoId: 'ngo-profile',
        status: 'PUBLIC',
      },
    }),
    prisma.campaign.create({
      data: {
        id: 'campaign-2',
        title: 'Campaign Two',
        ngoId: 'ngo-profile',
        status: 'PUBLIC',
      },
    }),
    prisma.cSRProgramme.create({
      data: {
        id: 'programme-1',
        title: 'Programme A',
        status: ProgrammeStatus.ACTIVE,
        companyId: 'company-profile',
      },
    }),
    prisma.cSRProgramme.create({
      data: {
        id: 'programme-2',
        title: 'Programme B',
        status: ProgrammeStatus.COMPLETED,
        companyId: 'company-profile',
      },
    }),
    prisma.campaignApproval.create({
      data: {
        id: 'approval-1',
        status: 'APPROVED',
        campaignId: 'campaign-1',
        companyId: 'company-profile',
        ngoId: 'ngo-profile',
      },
    }),
    prisma.campaignApproval.create({
      data: {
        id: 'approval-2',
        status: 'PENDING',
        campaignId: 'campaign-2',
        companyId: 'company-profile',
        ngoId: 'ngo-profile',
      },
    }),
    prisma.financialReport.create({
      data: {
        id: 'report-1',
        ngoId: 'ngo-profile',
        period: 'Q1',
        year: 2025,
        reportUrl: 'https://example.com/report.pdf',
      },
    }),
    prisma.auditLog.create({
      data: {
        id: 'log-1',
        userId: 'admin-id',
        action: 'login',
        details: {},
      },
    }),
    prisma.donation.createMany({
      data: [
        {
          id: 'donation-1',
          amount: 1000,
          donationDate: new Date(),
          campaignId: 'campaign-1',
          companyId: 'company-profile',
        },
        {
          id: 'donation-2',
          amount: 1000,
          donationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          campaignId: 'campaign-1',
          companyId: 'company-profile',
        },
        {
          id: 'donation-3',
          amount: 1000,
          donationDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          campaignId: 'campaign-2',
          companyId: 'company-profile',
        },
      ],
    }),
  ]);
}
