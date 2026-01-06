import { CSRProgrammeService } from '../../src/csr-programme/csr-programme.service';
import { ActivityLogService } from '../../src/activity/activity-log.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import {
  ProgrammeAssignmentStatus,
  ProgrammeStatus,
} from 'prisma/generated';

const baseProgramme = {
  id: 'programme-1',
  companyId: 'company-1',
  title: 'Water Access',
  description: 'Clean water initiative',
  status: ProgrammeStatus.DRAFT,
  budget: 50000,
  startDate: new Date('2025-01-01T00:00:00.000Z'),
  endDate: new Date('2025-06-30T00:00:00.000Z'),
  createdAt: new Date('2024-12-01T00:00:00.000Z'),
  updatedAt: new Date('2024-12-05T00:00:00.000Z'),
  deletedAt: null,
};

describe('CSRProgrammeService activity logs', () => {
  let service: CSRProgrammeService;
  let prisma: jest.Mocked<PrismaService>;
  let activityLog: jest.Mocked<ActivityLogService>;

  beforeEach(() => {
    prisma = {
      companyProfile: {
        findUnique: jest.fn(async ({ where }) =>
          where.id === 'company-1' ? { id: 'company-1' } : null,
        ),
      },
      cSRProgramme: {
        create: jest.fn(async ({ data }) => ({
          ...baseProgramme,
          ...data,
          status: data.status ?? baseProgramme.status,
          milestones: [],
          assignments: [],
        })),
        update: jest.fn(async ({ data, where }) => ({
          ...baseProgramme,
          id: where.id,
          ...data,
          status: data.status ?? baseProgramme.status,
          milestones: [],
          assignments: [],
        })),
        findUnique: jest.fn(async ({ where }) =>
          where.id === baseProgramme.id ? { ...baseProgramme } : null,
        ),
      },
      programmeAssignment: {
        upsert: jest.fn(async ({ where, create, update }) => ({
          id: 'assignment-1',
          programmeId: where.programmeId_ngoId.programmeId,
          ngoId: create?.ngoId ?? where.programmeId_ngoId.ngoId,
          status: ProgrammeAssignmentStatus.ACTIVE,
          notes: update?.notes ?? create?.notes ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
          ngo: {
            id: create?.ngoId ?? where.programmeId_ngoId.ngoId,
            missionStatement: 'Mission',
            user: { id: 'ngo-user', name: 'NGO', email: 'ngo@example.com' },
          },
        })),
        findFirst: jest.fn(async () => null),
      },
      nGOProfile: {
        findUnique: jest.fn(async ({ where }) =>
          where.id === 'ngo-1' ? { id: 'ngo-1' } : null,
        ),
      },
    } as unknown as jest.Mocked<PrismaService>;

    activityLog = {
      log: jest.fn(),
    } as unknown as jest.Mocked<ActivityLogService>;

    service = new CSRProgrammeService(prisma, activityLog);
  });

  it('logs create when actor present', async () => {
    await service.create('company-1', { title: 'New', status: ProgrammeStatus.DRAFT } as any, {
      actorId: 'actor-1',
    });

    expect(activityLog.log).toHaveBeenCalledWith(
      expect.objectContaining({
        actorId: 'actor-1',
        entity: 'csr_programme',
        entityId: expect.any(String),
        action: 'created',
        metadata: expect.objectContaining({
          companyId: 'company-1',
          status: expect.any(String),
        }),
      }),
    );
  });

  it('skips create log when actor missing', async () => {
    await service.create('company-1', { title: 'New' } as any, { actorId: null });
    expect(activityLog.log).not.toHaveBeenCalled();
  });

  it('logs update with changed fields and previous status', async () => {
    await service.update(
      'programme-1',
      'company-1',
      { title: 'Updated Title', status: ProgrammeStatus.ACTIVE },
      { actorId: 'actor-2' },
    );

    expect(activityLog.log).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'updated',
        entityId: 'programme-1',
        metadata: expect.objectContaining({
          companyId: 'company-1',
          status: ProgrammeStatus.ACTIVE,
          previousStatus: ProgrammeStatus.DRAFT,
          changedFields: expect.arrayContaining(['title', 'status']),
        }),
      }),
    );
  });

  it('logs NGO assignment when actor present', async () => {
    await service.assignNgo(
      'programme-1',
      'company-1',
      { ngoId: 'ngo-1', notes: 'Important' },
      { actorId: 'actor-3' },
    );

    expect(activityLog.log).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'assigned_ngo',
        entityId: 'programme-1',
        metadata: expect.objectContaining({
          ngoId: 'ngo-1',
          companyId: 'company-1',
          assignmentStatus: ProgrammeAssignmentStatus.ACTIVE,
        }),
      }),
    );
  });

  it('logs status change when actor present', async () => {
    await service.transitionStatus(
      'programme-1',
      'company-1',
      ProgrammeStatus.ACTIVE,
      { actorId: 'actor-4' },
    );

    expect(activityLog.log).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'status_changed',
        entityId: 'programme-1',
        metadata: expect.objectContaining({
          companyId: 'company-1',
          status: ProgrammeStatus.ACTIVE,
          previousStatus: ProgrammeStatus.DRAFT,
        }),
      }),
    );
  });

  it('skips logs when actor missing for other actions', async () => {
    await service.update('programme-1', 'company-1', { title: 'Updated' } as any, {
      actorId: null,
    });
    await service.assignNgo('programme-1', 'company-1', { ngoId: 'ngo-1' } as any, {
      actorId: null,
    });
    await service.transitionStatus('programme-1', 'company-1', ProgrammeStatus.ACTIVE, {
      actorId: undefined,
    });

    expect(activityLog.log).not.toHaveBeenCalled();
  });
});
