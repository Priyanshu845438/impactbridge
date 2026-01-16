import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UserRole } from '../../src/user/user-role.enum';
import { signToken } from '../../src/auth/utils/jwt.util';

const JWT_SECRET = 'test-secret';

describe('Financial admin endpoints sanitisation', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const prismaMock = {
    financialReport: {
      findMany: jest.fn(),
    },
  } as unknown as PrismaService;

  const adminToken = signToken({ sub: 'admin-user', role: UserRole.SUPER_ADMIN });
  const ngoToken = signToken({ sub: 'ngo-user', role: UserRole.NGO });

  const createdAt = new Date('2024-05-01T10:00:00.000Z');
  const updatedAt = new Date('2024-05-02T10:00:00.000Z');

  const reportFixture = {
    id: 'report-1',
    period: 'Q1' as const,
    year: 2024,
    reportUrl: 'https://example.com/report.pdf',
    ngoId: 'ngo-1',
    createdAt,
    updatedAt,
    amount: 250000,
    status: 'SUBMITTED',
    internalNotes: 'sensitive',
    ngo: {
      id: 'ngo-1',
      registrationNumber: 'NGO-001',
      user: {
        id: 'ngo-user-1',
        name: 'Example NGO',
        email: 'ngo@example.com',
      },
    },
  };

  beforeAll(async () => {
    process.env.JWT_SECRET = JWT_SECRET;
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns sanitised DTOs for admin/all', async () => {
    (prisma.financialReport.findMany as jest.Mock).mockResolvedValueOnce([
      reportFixture,
    ] as any);

    const response = await request(app.getHttpServer())
      .get('/api/v1/financial/admin/all')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 'report-1',
        period: 'Q1',
        year: 2024,
        reportUrl: 'https://example.com/report.pdf',
        ngoId: 'ngo-1',
        ngoName: 'Example NGO',
        ngoEmail: 'ngo@example.com',
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      },
    ]);

    const leakedKeys = Object.keys(response.body[0]).filter((key) =>
      ['amount', 'status', 'internalNotes', 'ngo'].includes(key),
    );
    expect(leakedKeys).toHaveLength(0);
  });

  it('returns sanitised DTOs for admin/ngo/:id', async () => {
    (prisma.financialReport.findMany as jest.Mock).mockResolvedValueOnce([
      reportFixture,
    ] as any);

    const response = await request(app.getHttpServer())
      .get('/api/v1/financial/admin/ngo/ngo-1')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 'report-1',
        period: 'Q1',
        year: 2024,
        reportUrl: 'https://example.com/report.pdf',
        ngoId: 'ngo-1',
        ngoName: 'Example NGO',
        ngoEmail: 'ngo@example.com',
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      },
    ]);
  });

  it('enforces RBAC for admin/all', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/financial/admin/all')
      .set('Authorization', `Bearer ${ngoToken}`)
      .expect(403);

    expect(res.body.message).toBeDefined();
  });
});
