import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UserRole } from '../../src/user/user-role.enum';
import { signToken } from '../../src/auth/utils/jwt.util';

const spyPrisma = {
  financialReport: {
    findMany: jest.fn(),
  },
};

jest.mock('../../src/prisma/prisma.service');

describe('V1 FinancialController /admin/all (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const adminToken = signToken({ sub: 'admin-user', role: UserRole.SUPER_ADMIN });
  const ngoToken = signToken({ sub: 'ngo-user', role: UserRole.NGO });

  const now = new Date('2024-03-01T10:00:00Z');
  const reportsPayload = [
    {
      id: 'report-1',
      period: 'Q1',
      year: 2024,
      reportUrl: 'https://example.com/report-1.pdf',
      amount: 150000,
      status: 'SUBMITTED',
      createdAt: now,
      updatedAt: now,
      ngo: {
        id: 'ngo-1',
        registrationNumber: 'NGO-001',
        user: {
          id: 'ngo-user-1',
          name: 'Example NGO',
          email: 'ngo@example.com',
        },
      },
    },
    {
      id: 'report-2',
      period: 'Q2',
      year: 2023,
      reportUrl: 'https://example.com/report-2.pdf',
      amount: 275000,
      status: 'UNDER_REVIEW',
      createdAt: new Date('2023-09-15T09:15:00Z'),
      updatedAt: new Date('2023-09-20T12:30:00Z'),
      ngo: {
        id: 'ngo-2',
        registrationNumber: 'NGO-002',
        user: {
          id: 'ngo-user-2',
          name: 'Impact NGO',
          email: 'impact@example.org',
        },
      },
    },
  ];

  beforeAll(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    spyPrisma.financialReport.findMany.mockResolvedValue(reportsPayload as any);
    (prisma.financialReport.findMany as jest.Mock).mockImplementation(
      spyPrisma.financialReport.findMany,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('allows SUPER_ADMIN to fetch complete listing with expected shape', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/financial/admin/all')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(spyPrisma.financialReport.findMany).toHaveBeenCalledWith({
      include: {
        ngo: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(response.body).toEqual(
      reportsPayload.map((report) => ({
        ...report,
        createdAt: report.createdAt.toISOString(),
        updatedAt: report.updatedAt.toISOString(),
      })),
    );
  });

  it('forbids NGO users from accessing admin listing', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/financial/admin/all')
      .set('Authorization', `Bearer ${ngoToken}`)
      .expect(403);

    expect(spyPrisma.financialReport.findMany).not.toHaveBeenCalled();
  });

  it('propagates underlying service errors without mutation side effects', async () => {
    const error = new Error('database unavailable');
    spyPrisma.financialReport.findMany.mockRejectedValueOnce(error);

    await request(app.getHttpServer())
      .get('/api/v1/financial/admin/all')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(500);

    expect(spyPrisma.financialReport.findMany).toHaveBeenCalledTimes(1);
  });
});
