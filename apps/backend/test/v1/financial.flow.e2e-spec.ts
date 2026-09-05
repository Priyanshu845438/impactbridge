import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UserRole } from '../../src/user/user-role.enum';
import { signToken } from '../../src/auth/utils/jwt.util';

describe('NGO → Admin financial flow', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const ngoToken = signToken({ sub: 'ngo-user', role: UserRole.NGO });
  const adminToken = signToken({
    sub: 'admin-user',
    role: UserRole.SUPER_ADMIN,
  });

  beforeAll(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();

    await prisma.user.create({
      data: {
        id: 'admin-user',
        email: 'admin@example.org',
        password: 'hashed',
        name: 'Admin User',
        role: UserRole.SUPER_ADMIN,
      },
    });

    await prisma.user.create({
      data: {
        id: 'ngo-user',
        email: 'ngo@example.org',
        password: 'hashed',
        name: 'NGO User',
        role: UserRole.NGO,
        ngoProfile: {
          create: {
            id: 'ngo-profile',
            registrationNumber: 'NGO-001',
            status: 'ACTIVE',
          },
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.financialReport.deleteMany({});
    await prisma.nGOProfile.deleteMany({});
    await prisma.user.deleteMany({});
    await app.close();
  });

  it('allows NGO upload and surfaces record in admin listing', async () => {
    const payload = {
      period: 'Q1',
      year: 2024,
      reportUrl: 'https://example.com/q1.pdf',
    };

    const upload = await request(app.getHttpServer())
      .post('/api/v1/financial/ngo/upload')
      .set('Authorization', `Bearer ${ngoToken}`)
      .send(payload)
      .expect(201);

    const { id, period, year, reportUrl } = upload.body;
    expect(id).toBeDefined();
    expect({ period, year, reportUrl }).toEqual(payload);

    const listing = await request(app.getHttpServer())
      .get('/api/v1/financial/admin/all')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(listing.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id,
          period: payload.period,
          year: payload.year,
          reportUrl: payload.reportUrl,
        }),
      ]),
    );
  });
});
