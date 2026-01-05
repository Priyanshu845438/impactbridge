import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import {
  ProgrammeStatus,
  ProgrammeAssignmentStatus,
  ProgrammeMilestoneStatus,
} from 'prisma/generated';
import {
  baseCompany,
  baseNgo,
  buildProgramme,
  expectAssignmentDtoShape,
  expectProgrammeListShape,
  expectProgrammeDetailShape,
} from './fixtures';

const prismaMock = {
  $connect: jest.fn().mockResolvedValue(undefined),
  $disconnect: jest.fn().mockResolvedValue(undefined),
  companyProfile: {
    findUnique: jest.fn(),
  },
  nGOProfile: {
    findUnique: jest.fn(),
  },
  cSRProgramme: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  programmeAssignment: {
    upsert: jest.fn(),
    findFirst: jest.fn(),
  },
};

const JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret';

function companyAuthHeader() {
  const token = sign({ sub: 'user-1', role: 'COMPANY' }, JWT_SECRET);
  return `Bearer ${token}`;
}

describe('CSR Programme routes (company-scoped contract)', () => {
  let app: INestApplication;
  const companyId = baseCompany.id;
  const programme = buildProgramme();
  const programmeWithoutAssignments = buildProgramme({
    id: 'programme-2',
    assignments: [],
  });

  beforeAll(async () => {
    process.env.JWT_SECRET = JWT_SECRET;
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
    prismaMock.companyProfile.findUnique.mockResolvedValue(baseCompany);
    prismaMock.nGOProfile.findUnique.mockResolvedValue(baseNgo);
    prismaMock.programmeAssignment.findFirst.mockResolvedValue(null);
    prismaMock.cSRProgramme.findMany.mockResolvedValue([
      programme,
      programmeWithoutAssignments,
    ]);
    prismaMock.cSRProgramme.findUnique.mockImplementation(({ where, include }) => {
      const includeWithDefaults = {
        milestones: include?.milestones ?? true,
        assignments: include?.assignments ?? true,
      };

      const enrich = (base: any) =>
        base
          ? {
              ...base,
              milestones: base.milestones ?? [],
              assignments: base.assignments ?? [],
            }
          : null;

      if (where.id === programme.id) {
        return Promise.resolve(
          enrich({
            ...programme,
            milestones: includeWithDefaults.milestones ? programme.milestones : undefined,
            assignments: includeWithDefaults.assignments ? programme.assignments : undefined,
          }),
        );
      }
      if (where.id === programmeWithoutAssignments.id) {
        return Promise.resolve(
          enrich({
            ...programmeWithoutAssignments,
            milestones: includeWithDefaults.milestones ? programmeWithoutAssignments.milestones : undefined,
            assignments: includeWithDefaults.assignments ? programmeWithoutAssignments.assignments : undefined,
          }),
        );
      }
      return Promise.resolve(null);
    });
    prismaMock.cSRProgramme.create.mockResolvedValue(programme);
    prismaMock.cSRProgramme.update.mockResolvedValue({
      ...programme,
      status: ProgrammeStatus.ACTIVE,
      updatedAt: new Date('2024-12-31T00:00:00.000Z'),
      milestones: programme.milestones,
      assignments: programme.assignments,
    });
    prismaMock.programmeAssignment.upsert.mockResolvedValue({
      id: 'assignment-2',
      programmeId: programme.id,
      ngoId: baseNgo.id,
      status: ProgrammeAssignmentStatus.ACTIVE,
      notes: 'Confirmed',
      createdAt: new Date('2024-12-22T00:00:00.000Z'),
      updatedAt: new Date('2024-12-23T00:00:00.000Z'),
      ngo: baseNgo,
    });
  });

  it('GET /companies/:companyId/csr-programmes returns ProgrammeSummaryDto[]', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/companies/${companyId}/csr-programmes`)
      .set('Authorization', companyAuthHeader())
      .expect(200);

    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
    body.forEach((item: any, index: number) => {
      expectProgrammeListShape(item);
      const fixture = index === 0 ? programme : programmeWithoutAssignments;
      expect(item.id).toBe(fixture.id);
      expect(item.companyId).toBe(companyId);
      expect(item.assignments.length).toBe(fixture.assignments.length);
    });
  });

  it('GET /companies/:companyId/csr-programmes/:programmeId returns ProgrammeDetailDto', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/companies/${companyId}/csr-programmes/${programme.id}`)
      .set('Authorization', companyAuthHeader())
      .expect(200);

    expectProgrammeDetailShape(body);
    expect(body.id).toBe(programme.id);
    expect(body.assignments.length).toBe(programme.assignments.length);
  });

  it('POST /companies/:companyId/csr-programmes returns create response DTO', async () => {
    const payload = {
      title: 'New Programme',
      description: 'Helping communities',
      status: ProgrammeStatus.DRAFT,
      budget: 50000,
      startDate: '2025-03-01',
      endDate: '2025-09-30',
    };

    const { body } = await request(app.getHttpServer())
      .post(`/companies/${companyId}/csr-programmes`)
      .set('Authorization', companyAuthHeader())
      .send(payload)
      .expect(201);

    expect(body).toHaveProperty('programme');
    expectProgrammeDetailShape(body.programme);
    expect(body.programme.id).toBe(programme.id);
  });

  it('PATCH /companies/:companyId/csr-programmes/:programmeId returns update response DTO', async () => {
    const { body } = await request(app.getHttpServer())
      .patch(`/companies/${companyId}/csr-programmes/${programme.id}`)
      .set('Authorization', companyAuthHeader())
      .send({ status: ProgrammeStatus.ACTIVE })
      .expect(200);

    expect(body).toHaveProperty('programme');
    expectProgrammeDetailShape(body.programme);
    expect(body.programme.status).toBe(ProgrammeStatus.ACTIVE);
  });

  it('POST /companies/:companyId/csr-programmes/:programmeId/assign-ngo returns assignment DTO', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/companies/${companyId}/csr-programmes/${programme.id}/assign-ngo`)
      .set('Authorization', companyAuthHeader())
      .send({ ngoId: baseNgo.id, notes: 'Confirmed' })
      .expect(201);

    expectAssignmentDtoShape(body);
  });

  it('POST /companies/:companyId/csr-programmes/:programmeId/status returns status transition DTO', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/companies/${companyId}/csr-programmes/${programme.id}/status`)
      .set('Authorization', companyAuthHeader())
      .send({ status: ProgrammeStatus.ACTIVE })
      .expect(201);

    expect(Object.keys(body).sort()).toEqual(
      ['programmeId', 'status', 'updatedAt'].sort(),
    );
    expect(body.programmeId).toBe(programme.id);
    expect(body.status).toBe(ProgrammeStatus.ACTIVE);
    expect(typeof body.updatedAt).toBe('string');
  });
});
