import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { signToken } from '../../src/auth/utils/jwt.util';

const prismaService = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

jest.mock('../../src/prisma/prisma.service');

function createTestingApp(): Promise<INestApplication> {
  return Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(prismaService as unknown as PrismaService)
    .compile()
    .then((moduleFixture: TestingModule) => {
      const nestApp = moduleFixture.createNestApplication();
      return nestApp.init().then(() => nestApp);
    });
}

describe('V1 User Controller (integration)', () => {
  let app: INestApplication;

  const user = {
    id: 'user-123',
    name: 'Existing User',
    email: 'existing@example.com',
    role: 'NGO',
    password: '$2a$12$abcdefghijklmnopqrstuv',
  };

  const token = signToken({ sub: user.id, role: user.role });

  beforeEach(async () => {
    jest.resetAllMocks();
    prismaService.user.findUnique.mockResolvedValue(user);
    prismaService.user.update.mockImplementation(async ({ data }) => ({
      ...user,
      ...data,
    }));
    prismaService.auditLog.create.mockResolvedValue({
      id: 'audit-1',
      userId: user.id,
      action: 'PROFILE_UPDATE',
      details: '{}',
      createdAt: new Date().toISOString(),
    });

    app = await createTestingApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/users/me', () => {
    it('returns current profile when authenticated', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            id: user.id,
            email: user.email,
            role: user.role,
          });
        });
    });

    it('rejects missing token', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .expect(401)
        .expect(({ body }) => {
          expect(body.message).toBe('Missing authorization header');
        });
    });
  });

  describe('PATCH /api/v1/users/me', () => {
    it('updates profile for authenticated users', async () => {
      await request(app.getHttpServer())
        .patch('/api/v1/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Name' })
        .expect(200)
        .expect(({ body }) => {
          expect(body.name).toBe('Updated Name');
        });
    });
  });
});
