import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { hashPassword } from '../../src/auth/utils/password.util';

const prismaService = {
  user: {
    findUnique: jest.fn(),
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

describe('V1 Auth Controller (integration)', () => {
  let app: INestApplication;

  const existingUser = {
    id: 'user-123',
    name: 'Existing User',
    email: 'existing@example.com',
    role: 'NGO',
    password: '',
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    existingUser.password = await hashPassword('correct-password');
    prismaService.user.findUnique.mockResolvedValue(null);
    prismaService.user.create.mockImplementation(async ({ data }) => ({
      id: 'user-new',
      ...data,
    }));

    app = await createTestingApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/v1/auth/register', () => {
    it('creates a new user when email is unused', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'password123',
          role: 'DONOR',
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            id: 'user-new',
            email: 'jane@example.com',
            role: 'DONOR',
          });
        });
    });

    it('rejects duplicate email addresses', async () => {
      prismaService.user.findUnique.mockResolvedValueOnce(existingUser);

      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          name: 'Jane Doe',
          email: existingUser.email,
          password: 'password123',
          role: 'NGO',
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toBe('Email already registered');
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('returns a JWT when credentials are correct', async () => {
      prismaService.user.findUnique.mockResolvedValue(existingUser);

      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: existingUser.email, password: 'correct-password' })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toHaveProperty('accessToken');
          expect(body.user.email).toBe(existingUser.email);
        });
    });

    it('rejects invalid credentials with BadRequestException', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: existingUser.email, password: 'incorrect' })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toBe('Invalid credentials');
        });
    });
  });
});
