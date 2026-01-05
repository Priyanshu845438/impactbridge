import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import {
  ProgrammeStatus,
  Role,
} from 'prisma/generated';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { signToken } from '../../src/auth/utils/jwt.util';

interface SeededData {
  companyId: string;
  programmeId: string;
}

const baseCompanyId = 'company-1';
const baseProgrammeId = 'programme-1';

const buildPrismaStub = (): PrismaService => {
  const programmeRecord = {
    id: baseProgrammeId,
    companyId: baseCompanyId,
    title: 'Water Access Initiative',
    description: 'Provide clean water to rural areas',
    status: ProgrammeStatus.DRAFT,
    budget: 100000,
    startDate: new Date('2025-01-01T00:00:00Z'),
    endDate: null,
    createdAt: new Date('2024-12-01T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
    deletedAt: null,
  };

  return {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    companyProfile: {
      findUnique: jest.fn(async ({ where }) =>
        where?.id === baseCompanyId ? { id: baseCompanyId } : null,
      ),
    },
    cSRProgramme: {
      findMany: jest.fn(async () => [{
        ...programmeRecord,
        milestones: [],
        assignments: [],
      }]),
      findUnique: jest.fn(async () => ({
        ...programmeRecord,
        milestones: [],
        assignments: [],
      })),
      create: jest.fn(async ({ data }) => ({
        ...programmeRecord,
        id: 'programme-create',
        title: data.title,
        status: data.status ?? ProgrammeStatus.DRAFT,
        milestones: [],
        assignments: [],
      })),
      update: jest.fn(async ({ data }) => ({
        ...programmeRecord,
        status: (data.status as ProgrammeStatus | undefined) ?? programmeRecord.status,
        milestones: [],
        assignments: [],
      })),
    },
    programmeAssignment: {
      findFirst: jest.fn().mockResolvedValue(null),
    },
    programmeMilestone: {
      create: jest.fn().mockResolvedValue({
        id: 'milestone-1',
        programmeId: baseProgrammeId,
        title: 'Initial Planning',
        description: null,
        status: 'PENDING',
        progress: 0,
        dueDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
      findMany: jest.fn().mockResolvedValue([]),
    },
    nGOProfile: {
      findUnique: jest.fn().mockResolvedValue({ id: 'ngo-1' }),
    },
  } as unknown as PrismaService;
};

const createToken = (role: Role) =>
  signToken({ sub: `${role.toLowerCase()}-user`, role });

const expectForbidden = (response: request.Response) => {
  expect(response.status).toBe(403);
  expect(response.body).toMatchObject({
    statusCode: 403,
    message: 'Access denied',
  });
};

const expectOk = (status: number) => expect([200, 201, 400]).toContain(status);

const COMPANY_ROUTES = {
  list: () => `/companies/${baseCompanyId}/csr-programmes`,
  detail: () => `/companies/${baseCompanyId}/csr-programmes/${baseProgrammeId}`,
  create: () => `/companies/${baseCompanyId}/csr-programmes`,
  update: () => `/companies/${baseCompanyId}/csr-programmes/${baseProgrammeId}`,
  status: () =>
    `/companies/${baseCompanyId}/csr-programmes/${baseProgrammeId}/status`,
};

describe('CSR Programme route RBAC enforcement', () => {
  let app: INestApplication;
  let prismaStub: PrismaService;
  const tokens = {
    [Role.COMPANY]: '',
    [Role.NGO]: '',
    [Role.SUPER_ADMIN]: '',
  } as Record<Role, string>;

  beforeAll(async () => {
    prismaStub = buildPrismaStub();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaStub)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    tokens[Role.COMPANY] = await createToken(Role.COMPANY);
    tokens[Role.NGO] = await createToken(Role.NGO);
    tokens[Role.SUPER_ADMIN] = await createToken(Role.SUPER_ADMIN);
  });

  afterAll(async () => {
    await app.close();
  });

  const send = async (
    method: 'get' | 'post' | 'patch',
    url: string,
    role: Role,
    body?: Record<string, unknown>,
  ) => {
    const req = request(app.getHttpServer())[method](url);
    if (body) {
      req.send(body);
    }
    return req.set('Authorization', `Bearer ${tokens[role]}`);
  };

  describe('list programmes', () => {
    it('allows COMPANY', async () => {
      const response = await send('get', COMPANY_ROUTES.list(), Role.COMPANY);
      expectOk(response.status);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('denies NGO', async () => {
      const response = await send('get', COMPANY_ROUTES.list(), Role.NGO);
      expectForbidden(response);
    });

    it('denies SUPER_ADMIN', async () => {
      const response = await send('get', COMPANY_ROUTES.list(), Role.SUPER_ADMIN);
      expectForbidden(response);
    });
  });

  describe('programme detail', () => {
    it('allows COMPANY', async () => {
      const response = await send('get', COMPANY_ROUTES.detail(), Role.COMPANY);
      expectOk(response.status);
      expect(response.body).toHaveProperty('id', baseProgrammeId);
    });

    it('denies NGO', async () => {
      const response = await send('get', COMPANY_ROUTES.detail(), Role.NGO);
      expectForbidden(response);
    });

    it('denies SUPER_ADMIN', async () => {
      const response = await send('get', COMPANY_ROUTES.detail(), Role.SUPER_ADMIN);
      expectForbidden(response);
    });
  });

  describe('create programme', () => {
    const payload = {
      title: 'Healthcare Support',
      description: 'Mobile clinics for remote areas',
      status: ProgrammeStatus.DRAFT,
      budget: 50000,
    };

    it('allows COMPANY', async () => {
      const response = await send('post', COMPANY_ROUTES.create(), Role.COMPANY, payload);
      expectOk(response.status);
      expect(response.body).toHaveProperty('programme');
    });

    it('denies NGO', async () => {
      const response = await send('post', COMPANY_ROUTES.create(), Role.NGO, payload);
      expectForbidden(response);
    });

    it('denies SUPER_ADMIN', async () => {
      const response = await send('post', COMPANY_ROUTES.create(), Role.SUPER_ADMIN, payload);
      expectForbidden(response);
    });
  });

  describe('update programme', () => {
    it('allows COMPANY', async () => {
      const response = await send('patch', COMPANY_ROUTES.update(), Role.COMPANY, {
        status: ProgrammeStatus.ACTIVE,
      });
      expectOk(response.status);
      expect(response.body).toHaveProperty('programme');
    });

    it('denies NGO', async () => {
      const response = await send('patch', COMPANY_ROUTES.update(), Role.NGO, {
        status: ProgrammeStatus.ACTIVE,
      });
      expectForbidden(response);
    });

    it('denies SUPER_ADMIN', async () => {
      const response = await send('patch', COMPANY_ROUTES.update(), Role.SUPER_ADMIN, {
        status: ProgrammeStatus.ACTIVE,
      });
      expectForbidden(response);
    });
  });

  describe('status transition', () => {
    it('allows COMPANY', async () => {
      const response = await send('post', COMPANY_ROUTES.status(), Role.COMPANY, {
        status: ProgrammeStatus.COMPLETED,
      });
      if (response.status === 201) {
        expect(response.body).toHaveProperty('programmeId', baseProgrammeId);
      } else {
        expect(response.status).toBe(400);
      }
    });

    it('denies NGO', async () => {
      const response = await send('post', COMPANY_ROUTES.status(), Role.NGO, {
        status: ProgrammeStatus.COMPLETED,
      });
      expectForbidden(response);
    });

    it('denies SUPER_ADMIN', async () => {
      const response = await send('post', COMPANY_ROUTES.status(), Role.SUPER_ADMIN, {
        status: ProgrammeStatus.COMPLETED,
      });
      expectForbidden(response);
    });
  });
});
