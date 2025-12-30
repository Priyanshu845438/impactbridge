import { BadRequestException } from '@nestjs/common';
import { CSRProgrammeService } from '../../src/csr-programme/csr-programme.service';
import type { PrismaService } from '../../src/prisma/prisma.service';
import type { Prisma } from 'prisma/generated';
import {
  ProgrammeAssignmentStatus,
  ProgrammeMilestoneStatus,
  ProgrammeStatus,
} from 'prisma/generated';

type ProgrammeRecord = {
  id: string;
  companyId: string;
  title: string;
  description: string | null;
  status: ProgrammeStatus;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  deletedAt: Date | null;
};

type AssignmentRecord = {
  id: string;
  programmeId: string;
  ngoId: string;
  status: ProgrammeAssignmentStatus;
  notes: string | null;
  assignedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

type MilestoneRecord = {
  id: string;
  programmeId: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  status: ProgrammeMilestoneStatus;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

type NgoProfileRecord = {
  id: string;
  missionStatement: string | null;
  user: { id: string; name: string; email: string };
};

interface TestState {
  companyProfiles: { id: string }[];
  ngoProfiles: NgoProfileRecord[];
  programmes: ProgrammeRecord[];
  assignments: AssignmentRecord[];
  milestones: MilestoneRecord[];
}

let idCounter = 1;
const genId = (prefix: string) => `${prefix}-${idCounter++}`;

function cloneProgramme(programme: ProgrammeRecord): ProgrammeRecord {
  return { ...programme };
}

function createState(overrides: Partial<TestState> = {}): TestState {
  const base: TestState = {
    companyProfiles: [{ id: 'company-1' }],
    ngoProfiles: [
      {
        id: 'ngo-1',
        missionStatement: 'Education impact',
        user: { id: 'user-ngo-1', name: 'Hope Org', email: 'ngo1@example.com' },
      },
      {
        id: 'ngo-2',
        missionStatement: 'Healthcare outreach',
        user: { id: 'user-ngo-2', name: 'Care Collective', email: 'ngo2@example.com' },
      },
    ],
    programmes: [
      {
        id: 'programme-1',
        companyId: 'company-1',
        title: 'Water Access',
        description: null,
        status: ProgrammeStatus.DRAFT,
        budget: null,
        startDate: null,
        endDate: null,
        deletedAt: null,
      },
      {
        id: 'programme-2',
        companyId: 'company-1',
        title: 'Health Camps',
        description: null,
        status: ProgrammeStatus.ACTIVE,
        budget: null,
        startDate: null,
        endDate: null,
        deletedAt: null,
      },
    ],
    assignments: [],
    milestones: [],
  };

  return {
    ...base,
    ...overrides,
  };
}

function createPrismaStub(state: TestState): jest.Mocked<PrismaService> {
  const prismaStub: Partial<jest.Mocked<PrismaService>> = {
    companyProfile: {
      findUnique: jest.fn(async ({ where }) => {
        const { id } = where;
        return id ? state.companyProfiles.find((company) => company.id === id) ?? null : null;
      }),
    },
    nGOProfile: {
      findUnique: jest.fn(async ({ where }) => {
        const { id } = where;
        return id ? state.ngoProfiles.find((ngo) => ngo.id === id) ?? null : null;
      }),
    },
    cSRProgramme: {
      create: jest.fn(async ({ data, include }) => {
        const record: ProgrammeRecord = {
          id: data.id ?? genId('programme'),
          companyId: data.companyId as string,
          title: data.title as string,
          description: (data.description as string | null | undefined) ?? null,
          status: data.status as ProgrammeStatus,
          budget: (data.budget as number | null | undefined) ?? null,
          startDate: (data.startDate as Date | null | undefined) ?? null,
          endDate: (data.endDate as Date | null | undefined) ?? null,
          deletedAt: null,
        };
        state.programmes.push(record);
        return attachProgrammeIncludes(state, record, include);
      }),
      update: jest.fn(async ({ where, data, include }) => {
        const record = state.programmes.find((programme) => programme.id === where.id);
        if (!record) {
          throw new Error('Programme not found in stub');
        }
        Object.assign(record, {
          title: data.title ?? record.title,
          description:
            data.description !== undefined ? (data.description as string | null) : record.description,
          status: (data.status as ProgrammeStatus | undefined) ?? record.status,
          budget: data.budget ?? record.budget,
          startDate: (data.startDate as Date | null | undefined) ?? record.startDate,
          endDate: (data.endDate as Date | null | undefined) ?? record.endDate,
        });
        return attachProgrammeIncludes(state, record, include);
      }),
      findUnique: jest.fn(async ({ where }) => {
        const record = state.programmes.find((programme) => programme.id === where.id);
        return record ? cloneProgramme(record) : null;
      }),
      findMany: jest.fn(async ({ where, include }) => {
        const filtered = state.programmes.filter((programme) => {
          if (where?.companyId && programme.companyId !== where.companyId) {
            return false;
          }
          if (where?.deletedAt === null && programme.deletedAt !== null) {
            return false;
          }
          return true;
        });
        return filtered.map((programme) => attachProgrammeIncludes(state, programme, include));
      }),
    },
    programmeAssignment: {
      findFirst: jest.fn(async ({ where }) => {
        const { ngoId } = where;
        const statusFilter = where.status;
        const programmeFilter = where.programme;

        const candidate = state.assignments.find((assignment) => {
          if (assignment.ngoId !== ngoId) {
            return false;
          }
          if (statusFilter && assignment.status !== statusFilter) {
            return false;
          }
          const programme = state.programmes.find((prog) => prog.id === assignment.programmeId);
          if (!programme) {
            return false;
          }
          if (
            programmeFilter?.companyId &&
            programme.companyId !== programmeFilter.companyId
          ) {
            return false;
          }
          if (
            programmeFilter?.status?.in &&
            !programmeFilter.status.in.includes(programme.status)
          ) {
            return false;
          }
          return true;
        });

        if (!candidate) {
          return null;
        }

        return {
          ...candidate,
          programme: cloneProgramme(
            state.programmes.find((programme) => programme.id === candidate.programmeId)!,
          ),
        };
      }),
      findUnique: jest.fn(async ({ where }) => {
        const match = state.assignments.find(
          (assignment) =>
            assignment.programmeId === where.programmeId_ngoId.programmeId &&
            assignment.ngoId === where.programmeId_ngoId.ngoId,
        );

        if (!match) {
          return null;
        }

        return {
          ...match,
          programme: cloneProgramme(
            state.programmes.find((programme) => programme.id === match.programmeId)!,
          ),
          ngo: cloneNgo(state, match.ngoId),
        };
      }),
      upsert: jest.fn(async ({ where, create, update, include }) => {
        const existing = state.assignments.find(
          (assignment) =>
            assignment.programmeId === where.programmeId_ngoId.programmeId &&
            assignment.ngoId === where.programmeId_ngoId.ngoId,
        );

        if (existing) {
          existing.notes = (update.notes as string | null | undefined) ?? existing.notes;
          existing.status = update.status as ProgrammeAssignmentStatus;
          existing.updatedAt = new Date();
        } else {
          const record: AssignmentRecord = {
            id: genId('assignment'),
            programmeId: create.programmeId as string,
            ngoId: create.ngoId as string,
            status: create.status as ProgrammeAssignmentStatus,
            notes: (create.notes as string | null | undefined) ?? null,
            assignedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          state.assignments.push(record);
        }

        const target = state.assignments.find(
          (assignment) =>
            assignment.programmeId === where.programmeId_ngoId.programmeId &&
            assignment.ngoId === where.programmeId_ngoId.ngoId,
        )!;

        return attachAssignmentInclude(state, target, include);
      }),
      update: jest.fn(async ({ where, data, include }) => {
        const match = state.assignments.find(
          (assignment) =>
            assignment.programmeId === where.programmeId_ngoId.programmeId &&
            assignment.ngoId === where.programmeId_ngoId.ngoId,
        );

        if (!match) {
          throw new Error('Assignment not found');
        }

        match.status = data.status as ProgrammeAssignmentStatus;
        match.notes = (data.notes as string | null | undefined) ?? match.notes;
        match.updatedAt = new Date();

        return attachAssignmentInclude(state, match, include);
      }),
    },
    programmeMilestone: {
      findFirst: jest.fn(async ({ where }) => {
        return (
          state.milestones.find(
            (milestone) =>
              milestone.programmeId === where.programmeId &&
              milestone.title.toLowerCase() ===
                (where.title?.equals as string)?.toLowerCase(),
          ) ?? null
        );
      }),
      findUnique: jest.fn(async ({ where }) => {
        const match = state.milestones.find((milestone) => milestone.id === where.id);
        if (!match) {
          return null;
        }
        return {
          ...match,
          programme: cloneProgramme(
            state.programmes.find((programme) => programme.id === match.programmeId)!,
          ),
        };
      }),
      create: jest.fn(async ({ data }) => {
        const record: MilestoneRecord = {
          id: genId('milestone'),
          programmeId: data.programmeId as string,
          title: data.title as string,
          description: (data.description as string | null | undefined) ?? null,
          dueDate: (data.dueDate as Date | null | undefined) ?? null,
          status: (data.status as ProgrammeMilestoneStatus | undefined) ?? ProgrammeMilestoneStatus.PENDING,
          progress: (data.progress as number | undefined) ?? 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        state.milestones.push(record);
        return { ...record };
      }),
      update: jest.fn(async ({ where, data }) => {
        const match = state.milestones.find((milestone) => milestone.id === where.id);
        if (!match) {
          throw new Error('Milestone not found');
        }
        match.title = data.title ?? match.title;
        match.description =
          data.description !== undefined ? (data.description as string | null) : match.description;
        match.dueDate = (data.dueDate as Date | null | undefined) ?? match.dueDate;
        match.status = (data.status as ProgrammeMilestoneStatus | undefined) ?? match.status;
        match.progress = (data.progress as number | undefined) ?? match.progress;
        match.updatedAt = new Date();
        return { ...match };
      }),
      findMany: jest.fn(async ({ where }) => {
        return state.milestones
          .filter((milestone) => {
            if (milestone.programmeId !== where.programmeId) {
              return false;
            }
            if (where.deletedAt === null && milestone.deletedAt !== null) {
              return false;
            }
            return true;
          })
          .sort((a, b) => {
            if (a.dueDate && b.dueDate) {
              const diff = a.dueDate.getTime() - b.dueDate.getTime();
              if (diff !== 0) {
                return diff;
              }
            } else if (a.dueDate && !b.dueDate) {
              return -1;
            } else if (!a.dueDate && b.dueDate) {
              return 1;
            }
            return a.createdAt.getTime() - b.createdAt.getTime();
          })
          .map((milestone) => ({ ...milestone }));
      }),
    },
  };

  return prismaStub as jest.Mocked<PrismaService>;
}

function attachProgrammeIncludes(
  state: TestState,
  programme: ProgrammeRecord,
  include?: Prisma.CSRProgrammeInclude,
) {
  const base = { ...programme } as ProgrammeRecord & {
    milestones?: MilestoneRecord[];
    assignments?: ReturnType<typeof attachAssignmentInclude>[];
  };

  if (include?.milestones) {
    base.milestones = state.milestones
      .filter((milestone) => milestone.programmeId === programme.id)
      .map((milestone) => ({ ...milestone }));
  }

  if (include?.assignments) {
    base.assignments = state.assignments
      .filter((assignment) => assignment.programmeId === programme.id)
      .map((assignment) => attachAssignmentInclude(state, assignment, include.assignments));
  }

  return base;
}

function attachAssignmentInclude(
  state: TestState,
  assignment: AssignmentRecord,
  include?: Prisma.ProgrammeAssignmentInclude,
) {
  const base = { ...assignment } as AssignmentRecord & {
    ngo?: ReturnType<typeof cloneNgo>;
  };

  if (include?.ngo) {
    base.ngo = cloneNgo(state, assignment.ngoId);
  }

  return base;
}

function cloneNgo(state: TestState, ngoId: string) {
  const ngo = state.ngoProfiles.find((profile) => profile.id === ngoId);
  if (!ngo) {
    throw new Error(`NGO ${ngoId} missing in stub`);
  }

  return {
    id: ngo.id,
    missionStatement: ngo.missionStatement,
    user: { ...ngo.user },
  };
}

function setup(overrides: Partial<TestState> = {}) {
  const state = createState(overrides);
  const prisma = createPrismaStub(state);
  const service = new CSRProgrammeService(prisma);
  return { service, prisma, state };
}

describe('CSRProgrammeService (in-memory integration)', () => {
  beforeEach(() => {
    idCounter = 1;
  });

  it('assigns an NGO and supports unassignment', async () => {
    const { service, state } = setup({ assignments: [] });

    const assignment = await service.assignNgo('programme-1', 'company-1', {
      ngoId: 'ngo-1',
      notes: 'Pilot collaboration',
    });

    expect(assignment.status).toBe(ProgrammeAssignmentStatus.ACTIVE);
    expect(state.assignments).toHaveLength(1);

    const updated = await service.unassignNgo(
      'programme-1',
      'company-1',
      'ngo-1',
      ProgrammeAssignmentStatus.REJECTED,
      'Scope mismatch',
    );

    expect(updated.status).toBe(ProgrammeAssignmentStatus.REJECTED);
    expect(state.assignments[0].status).toBe(ProgrammeAssignmentStatus.REJECTED);
    expect(state.assignments[0].notes).toBe('Scope mismatch');
  });

  it('prevents assigning an NGO to multiple active programmes for the same company', async () => {
    const { service, state } = setup({
      assignments: [
        {
          id: 'assignment-locked',
          programmeId: 'programme-2',
          ngoId: 'ngo-1',
          status: ProgrammeAssignmentStatus.ACTIVE,
          notes: null,
          assignedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    await expect(
      service.assignNgo('programme-1', 'company-1', {
        ngoId: 'ngo-1',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    // original assignment remains unchanged
    expect(state.assignments).toHaveLength(1);
    expect(state.assignments[0].programmeId).toBe('programme-2');
  });

  it('enforces milestone lifecycle and retrieval ordering', async () => {
    const { service, state } = setup();

    const created = await service.createMilestone('programme-1', 'company-1', {
      title: 'Design workshop',
      dueDate: new Date('2025-02-01'),
    });

    expect(created.title).toBe('Design workshop');

    const updated = await service.updateMilestone(created.id, 'company-1', {
      progress: 60,
      status: ProgrammeMilestoneStatus.IN_PROGRESS,
    });

    expect(updated.progress).toBe(60);
    expect(state.milestones[0].status).toBe(ProgrammeMilestoneStatus.IN_PROGRESS);

    await service.createMilestone('programme-1', 'company-1', {
      title: 'Village onboarding',
      dueDate: new Date('2025-01-15'),
    });

    const milestones = await service.getMilestones('programme-1', 'company-1');
    expect(milestones.map((milestone) => milestone.title)).toEqual([
      'Village onboarding',
      'Design workshop',
    ]);
  });

  it('supports sequential programme status transitions', async () => {
    const { service, prisma, state } = setup({
      programmes: [
        {
          id: 'programme-1',
          companyId: 'company-1',
          title: 'Water Access',
          description: null,
          status: ProgrammeStatus.DRAFT,
          budget: null,
          startDate: null,
          endDate: null,
          deletedAt: null,
        },
      ],
    });

    const active = await service.transitionStatus(
      'programme-1',
      'company-1',
      ProgrammeStatus.ACTIVE,
    );
    expect(active.status).toBe(ProgrammeStatus.ACTIVE);
    expect(state.programmes[0].status).toBe(ProgrammeStatus.ACTIVE);

    prisma.cSRProgramme.update.mockClear();

    const alias = await service.transitionStatus(
      'programme-1',
      'company-1',
      'approved',
    );
    expect(alias.status).toBe(ProgrammeStatus.ACTIVE);
    expect(prisma.cSRProgramme.update).not.toHaveBeenCalled();

    const completed = await service.transitionStatus(
      'programme-1',
      'company-1',
      ProgrammeStatus.COMPLETED,
    );
    expect(completed.status).toBe(ProgrammeStatus.COMPLETED);

    await expect(
      service.transitionStatus('programme-1', 'company-1', ProgrammeStatus.ACTIVE),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
