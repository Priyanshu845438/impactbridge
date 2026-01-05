import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { ProgrammeStatus } from 'prisma/generated';
import { sign } from 'jsonwebtoken';

const prismaMock = {
  $connect: jest.fn().mockResolvedValue(undefined),
  $disconnect: jest.fn().mockResolvedValue(undefined),
  companyProfile: {
    findUnique: jest.fn().mockResolvedValue({ id: 'company-1' }),
  },
  cSRProgramme: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({
      id: 'programme-1',
      title: 'Test Programme',
      companyId: 'company-1',
      description: 'desc',
      status: ProgrammeStatus.DRAFT,
      budget: null,
      startDate: null,
      endDate: null,
      assignments: [],
      milestones: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    create: jest.fn().mockResolvedValue({
      id: 'programme-1',
      title: 'Test Programme',
      companyId: 'company-1',
      description: 'desc',
      status: ProgrammeStatus.DRAFT,
      budget: null,
      startDate: null,
      endDate: null,
      assignments: [],
      milestones: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    update: jest.fn().mockResolvedValue({
      id: 'programme-1',
      title: 'Test Programme',
      companyId: 'company-1',
      description: 'desc',
      status: ProgrammeStatus.ACTIVE,
      budget: null,
      startDate: null,
      endDate: null,
      assignments: [],
      milestones: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
  programmeAssignment: {
    upsert: jest.fn().mockResolvedValue({
      id: 'assignment-1',
      programmeId: 'programme-1',
      ngoId: 'ngo-1',
      status: ProgrammeStatus.ACTIVE,
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ngo: null,
    }),
  },
};

const JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret';

function createToken(role: string) {
  return sign({ sub: 'user-1', role }, JWT_SECRET);
}

describe('CSR Programme route guards', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock as unknown as PrismaService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects requests without authentication', async () => {
    await request(app.getHttpServer())
      .get('/companies/company-1/csr-programmes')
      .expect(401);
  });

  it('rejects requests with incorrect role', async () => {
    const token = createToken('NGO');

    await request(app.getHttpServer())
      .get('/companies/company-1/csr-programmes')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });

  it('allows access with COMPANY role', async () => {
    const token = createToken('COMPANY');

    const response = await request(app.getHttpServer())
      .get('/companies/company-1/csr-programmes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
