import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CSRProgrammeService } from '../../../src/csr-programme/csr-programme.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import {
  ProgrammeAssignmentStatus,
  ProgrammeMilestoneStatus,
  ProgrammeStatus,
} from 'prisma/generated';

describe('CSRProgrammeService', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: CSRProgrammeService;

  const programme = {
    id: 'programme-1',
    companyId: 'company-1',
    title: 'Water Project',
    description: null,
    status: ProgrammeStatus.DRAFT,
    budget: null,
    startDate: null,
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    prisma = {
      companyProfile: {
        findUnique: jest.fn().mockResolvedValue({ id: 'company-1' }),
      },
      nGOProfile: {
        findUnique: jest.fn().mockResolvedValue({ id: 'ngo-1' }),
      },
      cSRProgramme: {
        create: jest.fn().mockResolvedValue({
          ...programme,
          milestones: [],
          assignments: [],
        }),
        findUnique: jest.fn().mockResolvedValue(programme),
        findMany: jest
          .fn()
          .mockResolvedValue([
            { ...programme, milestones: [], assignments: [] },
          ]),
        update: jest.fn().mockResolvedValue({
          ...programme,
          title: 'Updated',
          milestones: [],
          assignments: [],
        }),
      },
      programmeAssignment: {
        findFirst: jest.fn().mockResolvedValue(null),
        upsert: jest.fn().mockResolvedValue({
          id: 'assignment-1',
          programmeId: 'programme-1',
          ngoId: 'ngo-1',
          status: ProgrammeAssignmentStatus.ACTIVE,
          ngo: {
            id: 'ngo-1',
            missionStatement: 'Mission',
            user: { id: 'user-1', name: 'NGO', email: 'ngo@example.com' },
          },
        }),
      },
      programmeMilestone: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({
          id: 'milestone-1',
          programmeId: 'programme-1',
          title: 'Kickoff',
          status: ProgrammeMilestoneStatus.PENDING,
          progress: 0,
        }),
        findUnique: jest.fn().mockResolvedValue({
          id: 'milestone-1',
          programme: { companyId: 'company-1' },
          title: 'Kickoff',
          description: null,
          dueDate: null,
          status: ProgrammeMilestoneStatus.PENDING,
          progress: 0,
        }),
        update: jest.fn().mockResolvedValue({
          id: 'milestone-1',
          programmeId: 'programme-1',
          title: 'Kickoff updated',
          status: ProgrammeMilestoneStatus.IN_PROGRESS,
          progress: 25,
        }),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new CSRProgrammeService(prisma);
  });

  describe('create', () => {
    it('creates programme for company', async () => {
      const result = await service.create('company-1', {
        title: 'Water Project',
        status: ProgrammeStatus.ACTIVE,
      });

      expect(result.title).toBe('Water Project');
      expect(prisma.cSRProgramme.create).toHaveBeenCalled();
    });

    it('throws when company missing', async () => {
      prisma.companyProfile.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.create('company-unknown', { title: 'Invalid' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('updates programme fields', async () => {
      const result = await service.update('programme-1', 'company-1', {
        title: 'Updated',
      });

      expect(result.title).toBe('Updated');
      expect(prisma.cSRProgramme.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'programme-1' } }),
      );
    });

    it('rejects when programme belongs to another company', async () => {
      prisma.cSRProgramme.findUnique.mockResolvedValueOnce({
        ...programme,
        companyId: 'company-2',
      });

      await expect(
        service.update('programme-1', 'company-1', { title: 'Invalid' }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('listByCompany', () => {
    it('returns programmes for company', async () => {
      const programmes = await service.listByCompany('company-1');

      expect(programmes).toHaveLength(1);
      expect(prisma.cSRProgramme.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { companyId: 'company-1', deletedAt: null },
        }),
      );
    });
  });

  describe('assignNgo', () => {
    it('creates assignment', async () => {
      const assignment = await service.assignNgo('programme-1', 'company-1', {
        ngoId: 'ngo-1',
        notes: 'Key partner',
      });

      expect(assignment.status).toBe(ProgrammeAssignmentStatus.ACTIVE);
      expect(prisma.programmeAssignment.upsert).toHaveBeenCalled();
    });

    it('throws when NGO missing', async () => {
      prisma.nGOProfile.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.assignNgo('programme-1', 'company-1', {
          ngoId: 'missing',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('createMilestone', () => {
    it('creates milestone', async () => {
      const milestone = await service.createMilestone(
        'programme-1',
        'company-1',
        {
          title: 'Kickoff',
        },
      );

      expect(milestone.title).toBe('Kickoff');
      expect(prisma.programmeMilestone.create).toHaveBeenCalled();
    });
  });

  describe('updateMilestone', () => {
    it('updates milestone for owned programme', async () => {
      const milestone = await service.updateMilestone(
        'milestone-1',
        'company-1',
        {
          title: 'Kickoff updated',
          progress: 25,
          status: ProgrammeMilestoneStatus.IN_PROGRESS,
        },
      );

      expect(milestone.title).toBe('Kickoff updated');
      expect(prisma.programmeMilestone.update).toHaveBeenCalled();
    });

    it('throws when milestone missing', async () => {
      prisma.programmeMilestone.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.updateMilestone('missing', 'company-1', { title: 'Invalid' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when milestone owned by different company', async () => {
      prisma.programmeMilestone.findUnique.mockResolvedValueOnce({
        programme: { companyId: 'company-2' },
      } as any);

      await expect(
        service.updateMilestone('milestone-1', 'company-1', {
          title: 'Invalid',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
