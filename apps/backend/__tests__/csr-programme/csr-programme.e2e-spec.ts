import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import {
  ProgrammeStatus,
  ProgrammeAssignmentStatus,
} from 'prisma/generated';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { signToken } from '../../src/auth/utils/jwt.util';

const now = () => new Date('2025-01-01T00:00:00.000Z');

interface ProgrammeRecord {
  id: string;
  companyId: string;
  title: string;
  description: string | null;
  status: ProgrammeStatus;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MilestoneRecord {
  id: string;
  programmeId: string;
  title: string;
  description: string | null;
  status: string;
  progress: number;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface AssignmentRecord {
  id: string;
  programmeId: string;
  ngoId: string;
  status: ProgrammeAssignmentStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const createDataStore = () => {
  const company = { id: 'company-1' };
  const programme: ProgrammeRecord = {
    id: 'programme-1',
    companyId: company.id,
    title: 'Water Access Initiative',
    description: 'Provide clean water to rural areas',
    status: ProgrammeStatus.DRAFT,
    budget: 100000,
    startDate: now(),
    endDate: null,
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
  };
  const milestones: MilestoneRecord[] = [
    {
      id: 'milestone-1',
      programmeId: programme.id,
      title: 'Initial Planning',
      description: 'Plan logistics and resources',
      status: 'PENDING',
      progress: 0,
      dueDate: null,
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    },
  ];
  const assignments: AssignmentRecord[] = [];

  return {
    company,
    programme,
    programmes: [programme],
    milestones,
    assignments,
  };
};

const buildPrismaDouble = (store: ReturnType<typeof createDataStore>) => {
  return {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    companyProfile: {
      findUnique: jest.fn(async ({ where }) =>
        where?.id === store.company.id ? { ...store.company } : null,
      ),
    },
    cSRProgramme: {
      findMany: jest.fn(async ({ where, include }) => {
        if (where?.companyId !== store.company.id) {
          return [];
        }
        return store.programmes.map((programme) => ({
          ...programme,
          milestones: include?.milestones
            ? store.milestones.filter((m) => m.programmeId === programme.id)
            : undefined,
          assignments: include?.assignments
            ? store.assignments
                .filter((a) => a.programmeId === programme.id)
                .map((assignment) => ({
                  ...assignment,
                  ngo: {
                    id: 'ngo-1',
                    missionStatement: 'Support community education',
                    user: {
                      id: 'user-ngo-1',
                      name: 'Helping Hands NGO',
                      email: 'ngo@example.com',
                    },
                  },
                }))
            : undefined,
        }));
      }),
      findUnique: jest.fn(async ({ where, include }) => {
        const programme = store.programmes.find((p) => p.id === where?.id);
        if (!programme) {
          return null;
        }
        return {
          ...programme,
          milestones: include?.milestones
            ? store.milestones.filter((m) => m.programmeId === programme.id)
            : undefined,
          assignments: include?.assignments
            ? store.assignments
                .filter((a) => a.programmeId === programme.id)
                .map((assignment) => ({
                  ...assignment,
                  ngo: {
                    id: 'ngo-1',
                    missionStatement: 'Support community education',
                    user: {
                      id: 'user-ngo-1',
                      name: 'Helping Hands NGO',
                      email: 'ngo@example.com',
                    },
                  },
                }))
            : undefined,
        };
      }),
      create: jest.fn(async ({ data, include }) => {
        const created: ProgrammeRecord = {
          id: `programme-${store.programmes.length + 1}`,
          companyId: data.companyId,
          title: data.title,
          description: data.description ?? null,
          status: data.status ?? ProgrammeStatus.DRAFT,
          budget: data.budget ?? null,
          startDate: data.startDate ?? null,
          endDate: data.endDate ?? null,
          createdAt: now(),
          updatedAt: now(),
          deletedAt: null,
        };
        store.programmes.push(created);
        return {
          ...created,
          milestones: include?.milestones ? [] : undefined,
          assignments: include?.assignments ? [] : undefined,
        };
      }),
      update: jest.fn(async ({ where, data, include }) => {
        const programme = store.programmes.find((p) => p.id === where?.id);
        if (!programme) {
          throw new Error('Programme not found');
        }
        Object.assign(programme, {
          title: data.title ?? programme.title,
          description:
            data.description !== undefined
              ? data.description
              : programme.description,
          status: (data.status as ProgrammeStatus | undefined) ?? programme.status,
          budget: data.budget ?? programme.budget,
          startDate: data.startDate ?? programme.startDate,
          endDate: data.endDate ?? programme.endDate,
          updatedAt: now(),
        });
        return {
          ...programme,
          milestones: include?.milestones
            ? store.milestones.filter((m) => m.programmeId === programme.id)
            : undefined,
          assignments: include?.assignments
            ? store.assignments
                .filter((a) => a.programmeId === programme.id)
                .map((assignment) => ({
                  ...assignment,
                  ngo: {
                    id: 'ngo-1',
                    missionStatement: 'Support community education',
                    user: {
                      id: 'user-ngo-1',
                      name: 'Helping Hands NGO',
                      email: 'ngo@example.com',
                    },
                  },
                }))
            : undefined,
        };
      }),
    },
    programmeAssignment: {
      findFirst: jest.fn().mockResolvedValue(null),
    },
    programmeMilestone: {
      create: jest.fn(async ({ data }) => {
        const milestone: MilestoneRecord = {
          id: `milestone-${store.milestones.length + 1}`,
          programmeId: data.programmeId,
          title: data.title,
          description: data.description ?? null,
          status: data.status ?? 'PENDING',
          progress: data.progress ?? 0,
          dueDate: data.dueDate ?? null,
          createdAt: now(),
          updatedAt: now(),
          deletedAt: null,
        };
        store.milestones.push(milestone);
        return milestone;
      }),
      findMany: jest.fn(async ({ where }) =>
        store.milestones.filter((m) => m.programmeId === where?.programmeId),
      ),
    },
    nGOProfile: {
      findUnique: jest.fn().mockResolvedValue({
        id: 'ngo-1',
        missionStatement: 'Support community education',
        user: {
          id: 'user-ngo-1',
          name: 'Helping Hands NGO',
          email: 'ngo@example.com',
        },
      }),
    },
  } as unknown as PrismaService;
};

const expectListDtoKeys = [
  'assignments',
  'budget',
  'companyId',
  'createdAt',
  'description',
  'endDate',
  'id',
  'milestones',
  'startDate',
  'status',
  'title',
  'updatedAt',
].sort();

const expectStatusDtoKeys = ['programmeId', 'status', 'updatedAt'].sort();

describe('CSR Programme routes (happy-path HTTP contracts)', () => {
  let app: INestApplication;
  let prismaMock: PrismaService;
  let store = createDataStore();
  let authHeader: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(buildPrismaDouble(store))
      .compile();

    prismaMock = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();

    const token = await signToken({ sub: 'user-company-1', role: 'COMPANY' });
    authHeader = `Bearer ${token}`;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    store = createDataStore();
    Object.assign(prismaMock, buildPrismaDouble(store));
  });

  it('GET /companies/:companyId/csr-programmes returns ProgrammeSummaryDto[]', async () => {
    const { body, status } = await request(app.getHttpServer())
      .get(`/companies/${store.company.id}/csr-programmes`)
      .set('Authorization', authHeader);

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({
      id: store.programme.id,
      companyId: store.company.id,
      title: store.programme.title,
      status: ProgrammeStatus.DRAFT,
    });
    expect(Object.keys(body[0]).sort()).toEqual(expectListDtoKeys);
  });

  it('GET /companies/:companyId/csr-programmes/:programmeId returns ProgrammeDetailDto', async () => {
    const { body, status } = await request(app.getHttpServer())
      .get(`/companies/${store.company.id}/csr-programmes/${store.programme.id}`)
      .set('Authorization', authHeader);

    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: store.programme.id,
      companyId: store.company.id,
      title: store.programme.title,
      status: ProgrammeStatus.DRAFT,
      assignments: [],
    });
    expect(body.milestones).toHaveLength(1);
    expect(Object.keys(body).sort()).toEqual(expectListDtoKeys);
  });

  it('POST /companies/:companyId/csr-programmes creates programme and returns DTO', async () => {
    const payload = {
      title: 'Healthcare Support',
      description: 'Mobile clinics for remote areas',
      status: ProgrammeStatus.DRAFT,
      budget: 50000,
    };

    const { body, status } = await request(app.getHttpServer())
      .post(`/companies/${store.company.id}/csr-programmes`)
      .set('Authorization', authHeader)
      .send(payload);

    expect(status).toBe(201);
    expect(body).toHaveProperty('programme');
    expect(body.programme.title).toBe(payload.title);
    expect(body.programme.companyId).toBe(store.company.id);
    expect(Object.keys(body.programme).sort()).toEqual(expectListDtoKeys);
  });

  it('PATCH /companies/:companyId/csr-programmes/:programmeId returns ProgrammeUpdateResponseDto', async () => {
    const { body, status } = await request(app.getHttpServer())
      .patch(`/companies/${store.company.id}/csr-programmes/${store.programme.id}`)
      .set('Authorization', authHeader)
      .send({ status: ProgrammeStatus.ACTIVE });

    expect(status).toBe(200);
    expect(body).toHaveProperty('programme');
    expect(body.programme.status).toBe(ProgrammeStatus.ACTIVE);
    expect(Object.keys(body.programme).sort()).toEqual(expectListDtoKeys);
  });

  it('POST /companies/:companyId/csr-programmes/:programmeId/status returns ProgrammeStatusTransitionDto', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post(
        `/companies/${store.company.id}/csr-programmes/${store.programme.id}/status`,
      )
      .set('Authorization', authHeader)
      .send({ status: ProgrammeStatus.COMPLETED });

    expect(status).toBe(201);
    expect(body).toMatchObject({
      programmeId: store.programme.id,
      status: ProgrammeStatus.COMPLETED,
    });
    expect(Object.keys(body).sort()).toEqual(expectStatusDtoKeys);
  });
});
