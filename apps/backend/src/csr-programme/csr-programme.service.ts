import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  ProgrammeAssignmentStatus,
  ProgrammeMilestoneStatus,
  ProgrammeStatus,
} from 'prisma/generated';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { AssignNgoDto } from './dto/assign-ngo.dto';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { sanitizeEntity, sanitizeEntities } from '../utils/sanitize.util';

@Injectable()
export class CSRProgrammeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(companyId: string, dto: CreateProgrammeDto) {
    await this.ensureCompany(companyId);

    const programme = await this.prisma.cSRProgramme.create({
      data: {
        companyId,
        title: dto.title,
        description: dto.description,
        status: dto.status ?? ProgrammeStatus.DRAFT,
        budget: dto.budget,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: {
        milestones: true,
        assignments: true,
      },
    });

    return sanitizeEntity(programme)!;
  }

  async update(id: string, companyId: string, dto: UpdateProgrammeDto) {
    const programme = await this.ensureProgrammeOwnership(id, companyId);

    const data: Prisma.CSRProgrammeUpdateInput = {
      title: dto.title ?? programme.title,
      description:
        dto.description !== undefined ? dto.description : programme.description,
      status: dto.status ?? programme.status,
      budget: dto.budget ?? programme.budget,
      startDate: dto.startDate ? new Date(dto.startDate) : programme.startDate,
      endDate: dto.endDate ? new Date(dto.endDate) : programme.endDate,
    };

    const updated = await this.prisma.cSRProgramme.update({
      where: { id },
      data,
      include: {
        milestones: true,
        assignments: true,
      },
    });

    return sanitizeEntity(updated)!;
  }

  async listByCompany(companyId: string) {
    await this.ensureCompany(companyId);

    const programmes = await this.prisma.cSRProgramme.findMany({
      where: { companyId, deletedAt: null },
      include: {
        milestones: true,
        assignments: {
          include: {
            ngo: {
              select: {
                id: true,
                missionStatement: true,
                user: {
                  select: { id: true, name: true, email: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return sanitizeEntities(programmes);
  }

  async assignNgo(programmeId: string, companyId: string, dto: AssignNgoDto) {
    await this.ensureProgrammeOwnership(programmeId, companyId);
    await this.ensureNgo(dto.ngoId);

    const assignment = await this.prisma.programmeAssignment.upsert({
      where: {
        programmeId_ngoId: {
          programmeId,
          ngoId: dto.ngoId,
        },
      },
      update: {
        notes: dto.notes,
        status: ProgrammeAssignmentStatus.ACTIVE,
        updatedAt: new Date(),
      },
      create: {
        programmeId,
        ngoId: dto.ngoId,
        notes: dto.notes,
        status: ProgrammeAssignmentStatus.ACTIVE,
      },
      include: {
        ngo: {
          select: {
            id: true,
            missionStatement: true,
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    return sanitizeEntity(assignment)!;
  }

  async createMilestone(
    programmeId: string,
    companyId: string,
    dto: CreateMilestoneDto,
  ) {
    await this.ensureProgrammeOwnership(programmeId, companyId);

    const milestone = await this.prisma.programmeMilestone.create({
      data: {
        programmeId,
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        status: dto.status ?? ProgrammeMilestoneStatus.PENDING,
        progress: dto.progress ?? 0,
      },
    });

    return sanitizeEntity(milestone)!;
  }

  async updateMilestone(
    milestoneId: string,
    companyId: string,
    dto: UpdateMilestoneDto,
  ) {
    const milestone = await this.prisma.programmeMilestone.findUnique({
      where: { id: milestoneId },
      include: { programme: true },
    });

    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }

    if (milestone.programme.companyId !== companyId) {
      throw new ForbiddenException(
        'Cannot modify milestone for another company',
      );
    }

    const updated = await this.prisma.programmeMilestone.update({
      where: { id: milestoneId },
      data: {
        title: dto.title ?? milestone.title,
        description:
          dto.description !== undefined
            ? dto.description
            : milestone.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : milestone.dueDate,
        status: dto.status ?? milestone.status,
        progress: dto.progress ?? milestone.progress,
      },
    });

    return sanitizeEntity(updated)!;
  }

  private async ensureCompany(companyId: string) {
    const company = await this.prisma.companyProfile.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company profile not found');
    }
  }

  private async ensureProgrammeOwnership(
    programmeId: string,
    companyId: string,
  ) {
    const programme = await this.prisma.cSRProgramme.findUnique({
      where: { id: programmeId },
    });

    if (!programme) {
      throw new NotFoundException('Programme not found');
    }

    if (programme.companyId !== companyId) {
      throw new ForbiddenException('Programme does not belong to this company');
    }

    return programme;
  }

  private async ensureNgo(ngoId: string) {
    const ngo = await this.prisma.nGOProfile.findUnique({
      where: { id: ngoId },
      select: { id: true },
    });

    if (!ngo) {
      throw new NotFoundException('NGO profile not found');
    }
  }
}
