import {
  BadRequestException,
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
import {
  toProgrammeAssignmentDto,
  toProgrammeCreateResponseDto,
  toProgrammeDetailDto,
  toProgrammeListItemDto,
  toProgrammeStatusTransitionDto,
  toProgrammeUpdateResponseDto,
} from './mappers/programme.mapper';
import { ActivityLogService } from '../activity/activity-log.service';

@Injectable()
export class CSRProgrammeService {
  private readonly programmeStatusValues: ProgrammeStatus[] = Object.values(
    ProgrammeStatus,
  ) as ProgrammeStatus[];

  private readonly allowedStatusTransitions: Record<
    ProgrammeStatus,
    ProgrammeStatus[]
  > = {
    [ProgrammeStatus.DRAFT]: [ProgrammeStatus.ACTIVE],
    [ProgrammeStatus.ACTIVE]: [ProgrammeStatus.COMPLETED],
    [ProgrammeStatus.COMPLETED]: [ProgrammeStatus.ARCHIVED],
    [ProgrammeStatus.ARCHIVED]: [],
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async create(
    companyId: string,
    dto: CreateProgrammeDto,
    context?: { actorId?: string | null },
  ) {
    await this.ensureCompany(companyId);

    const programme = await this.prisma.cSRProgramme.create({
      data: {
        companyId,
        title: dto.title,
        description: dto.description,
        status: this.normalizeProgrammeStatus(
          dto.status,
          ProgrammeStatus.DRAFT,
        ),
        budget: dto.budget,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: {
        milestones: true,
        assignments: true,
      },
    });

    await this.emitActivityLog(context?.actorId, 'created', programme.id, {
      companyId,
      status: programme.status,
    });

    const sanitized = sanitizeEntity(programme)!;
    return toProgrammeCreateResponseDto(sanitized);
  }

  async update(
    id: string,
    companyId: string,
    dto: UpdateProgrammeDto,
    context?: { actorId?: string | null },
  ) {
    const programme = await this.ensureProgrammeOwnership(id, companyId);

    const data: Prisma.CSRProgrammeUpdateInput = {
      title: dto.title ?? programme.title,
      description:
        dto.description !== undefined ? dto.description : programme.description,
      status: this.normalizeProgrammeStatus(
        dto.status ?? programme.status,
        programme.status,
      ),
      budget: dto.budget ?? programme.budget,
      startDate: dto.startDate ? new Date(dto.startDate) : programme.startDate,
      endDate: dto.endDate ? new Date(dto.endDate) : programme.endDate,
    };

    const nextStatus = data.status as ProgrammeStatus;
    this.assertStatusTransition(programme.status, nextStatus);

    const updated = await this.prisma.cSRProgramme.update({
      where: { id },
      data,
      include: {
        milestones: true,
        assignments: true,
      },
    });

    await this.emitActivityLog(context?.actorId, 'updated', id, {
      companyId,
      status: updated.status,
      previousStatus: programme.status,
      changedFields: Object.entries(dto)
        .filter(([, value]) => value !== undefined)
        .map(([key]) => key),
    });

    const sanitized = sanitizeEntity(updated)!;
    return toProgrammeUpdateResponseDto(sanitized);
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

    const sanitized = sanitizeEntities(programmes);
    return sanitized.map((programme) => toProgrammeListItemDto(programme));
  }

  async getByIdForCompany(companyId: string, programmeId: string) {
    await this.ensureProgrammeOwnership(programmeId, companyId);

    const programmeWithRelations = await this.prisma.cSRProgramme.findUnique({
      where: { id: programmeId },
      include: {
        milestones: true,
        assignments: {
          include: {
            ngo: {
              select: {
                id: true,
                missionStatement: true,
                user: { select: { id: true, name: true, email: true } },
              },
            },
          },
        },
      },
    });

    if (!programmeWithRelations) {
      throw new NotFoundException('Programme not found');
    }

    const sanitized = sanitizeEntity(programmeWithRelations)!;
    return toProgrammeDetailDto(sanitized);
  }

  async assignNgo(
    programmeId: string,
    companyId: string,
    dto: AssignNgoDto,
    context?: { actorId?: string | null },
  ) {
    await this.ensureProgrammeOwnership(programmeId, companyId);
    await this.ensureNgo(dto.ngoId);

    await this.ensureNgoAvailable(dto.ngoId, companyId, programmeId);

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

    await this.emitActivityLog(context?.actorId, 'assigned_ngo', programmeId, {
      companyId,
      ngoId: dto.ngoId,
      assignmentStatus: assignment.status,
    });

    const sanitized = sanitizeEntity(assignment)!;
    return toProgrammeAssignmentDto(sanitized);
  }

  async unassignNgo(
    programmeId: string,
    companyId: string,
    ngoId: string,
    finalStatus: ProgrammeAssignmentStatus = ProgrammeAssignmentStatus.REJECTED,
    notes?: string,
  ) {
    if (
      finalStatus !== ProgrammeAssignmentStatus.REJECTED &&
      finalStatus !== ProgrammeAssignmentStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Unsupported final status for unassignment',
      );
    }

    await this.ensureProgrammeOwnership(programmeId, companyId);

    const assignment = await this.prisma.programmeAssignment.findUnique({
      where: {
        programmeId_ngoId: { programmeId, ngoId },
      },
      include: {
        programme: { select: { companyId: true } },
        ngo: {
          select: {
            id: true,
            missionStatement: true,
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    if (assignment.programme.companyId !== companyId) {
      throw new ForbiddenException('Assignment belongs to another company');
    }

    if (
      assignment.status !== ProgrammeAssignmentStatus.INVITED &&
      assignment.status !== ProgrammeAssignmentStatus.ACTIVE
    ) {
      throw new BadRequestException('Assignment is already closed');
    }

    const updated = await this.prisma.programmeAssignment.update({
      where: {
        programmeId_ngoId: { programmeId, ngoId },
      },
      data: {
        status: finalStatus,
        notes: notes ?? assignment.notes,
        updatedAt: new Date(),
      },
      include: {
        ngo: {
          select: {
            id: true,
            missionStatement: true,
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    const sanitized = sanitizeEntity(updated)!;
    return toProgrammeAssignmentDto(sanitized);
  }

  async createMilestone(
    programmeId: string,
    companyId: string,
    dto: CreateMilestoneDto,
  ) {
    await this.ensureProgrammeOwnership(programmeId, companyId);

    await this.ensureMilestoneUniqueness(programmeId, dto.title);

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

  async getMilestones(programmeId: string, companyId: string) {
    await this.ensureProgrammeOwnership(programmeId, companyId);

    const milestones = await this.prisma.programmeMilestone.findMany({
      where: { programmeId, deletedAt: null },
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'asc' }],
    });

    return sanitizeEntities(milestones);
  }

  async transitionStatus(
    programmeId: string,
    companyId: string,
    requestedStatus: ProgrammeStatus | string | null | undefined,
    context?: { actorId?: string | null },
  ) {
    const programme = await this.ensureProgrammeOwnership(
      programmeId,
      companyId,
    );

    const nextStatus = this.normalizeProgrammeStatus(
      requestedStatus,
      programme.status,
    );

    this.assertStatusTransition(programme.status, nextStatus);

    if (nextStatus === programme.status) {
      await this.emitActivityLog(
        context?.actorId,
        'status_changed',
        programmeId,
        {
          companyId,
          status: nextStatus,
          previousStatus: programme.status,
        },
      );

      const sanitized = sanitizeEntity(programme)!;
      return toProgrammeStatusTransitionDto(sanitized);
    }

    const updated = await this.prisma.cSRProgramme.update({
      where: { id: programmeId },
      data: { status: nextStatus },
      include: {
        milestones: true,
        assignments: true,
      },
    });

    await this.emitActivityLog(
      context?.actorId,
      'status_changed',
      programmeId,
      {
        companyId,
        status: nextStatus,
        previousStatus: programme.status,
      },
    );

    const sanitized = sanitizeEntity(updated)!;
    return toProgrammeStatusTransitionDto(sanitized);
  }

  private async emitActivityLog(
    actorId: string | null | undefined,
    action: 'created' | 'updated' | 'assigned_ngo' | 'status_changed',
    programmeId: string,
    metadata: Record<string, unknown>,
  ) {
    if (!actorId) {
      return;
    }

    await this.activityLog.log({
      actorId,
      entity: 'csr_programme',
      entityId: programmeId,
      action,
      metadata,
    });
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

  private async ensureNgoAvailable(
    ngoId: string,
    companyId: string,
    programmeId?: string,
  ) {
    const blockingStatuses = this.getBlockingProgrammeStatuses();
    const statusFilter =
      blockingStatuses.length > 0 ? blockingStatuses : [ProgrammeStatus.ACTIVE];

    const existingAssignment = await this.prisma.programmeAssignment.findFirst({
      where: {
        ngoId,
        programme: {
          companyId,
          status: {
            in: statusFilter,
          },
        },
        status: ProgrammeAssignmentStatus.ACTIVE,
      },
    });

    if (existingAssignment && existingAssignment.programmeId !== programmeId) {
      throw new BadRequestException(
        'NGO is already assigned to an active programme for this company',
      );
    }
  }

  private async ensureMilestoneUniqueness(programmeId: string, title: string) {
    const duplicate = await this.prisma.programmeMilestone.findFirst({
      where: {
        programmeId,
        title: {
          equals: title,
        },
      },
    });

    if (duplicate) {
      throw new BadRequestException(
        'A milestone with this title already exists for the programme',
      );
    }
  }

  private normalizeProgrammeStatus(
    status: ProgrammeStatus | string | null | undefined,
    fallback: ProgrammeStatus,
  ): ProgrammeStatus {
    if (typeof status !== 'string') {
      return fallback;
    }

    const normalized = status.toUpperCase();

    const aliasMap: Record<string, ProgrammeStatus> = {
      SUBMITTED: ProgrammeStatus.DRAFT,
      APPROVED: ProgrammeStatus.ACTIVE,
    };

    if (aliasMap[normalized]) {
      return aliasMap[normalized];
    }

    const matched = this.programmeStatusValues.find(
      (value) => value === normalized,
    );

    if (matched) {
      return matched;
    }

    return fallback;
  }

  private getBlockingProgrammeStatuses(): ProgrammeStatus[] {
    const preferred = ['ACTIVE', 'PENDING', 'DRAFT'] as const;
    return preferred
      .map(
        (value) =>
          (ProgrammeStatus as Record<string, ProgrammeStatus | undefined>)[
            value
          ],
      )
      .filter((value): value is ProgrammeStatus => Boolean(value));
  }

  private assertStatusTransition(
    current: ProgrammeStatus,
    next: ProgrammeStatus,
  ) {
    if (current === next) {
      return;
    }

    const allowed = this.allowedStatusTransitions[current] ?? [];
    if (!allowed.includes(next)) {
      throw new BadRequestException(
        `Cannot transition programme from ${current} to ${next}`,
      );
    }
  }
}
