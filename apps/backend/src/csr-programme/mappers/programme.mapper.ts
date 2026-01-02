import type {
  ProgrammeAssignmentDto,
  ProgrammeCreateResponseDto,
  ProgrammeDetailDto,
  ProgrammeListItemDto,
  ProgrammeStatusTransitionDto,
  ProgrammeUpdateResponseDto,
} from '@impactbridge/api-contracts';
import type {
  ProgrammeAssignment,
  ProgrammeMilestone,
  CSRProgramme,
} from 'prisma/generated';

type SanitizedProgramme = Omit<
  CSRProgramme,
  'createdAt' | 'updatedAt' | 'startDate' | 'endDate'
> & {
  createdAt: Date | string;
  updatedAt: Date | string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  assignments?: Array<SanitizedProgrammeAssignment>;
  milestones?: Array<SanitizedProgrammeMilestone>;
};

type SanitizedProgrammeAssignment = Omit<
  ProgrammeAssignment,
  'createdAt' | 'updatedAt'
> & {
  createdAt: Date | string;
  updatedAt: Date | string;
  ngo?: {
    id: string;
    missionStatement?: string | null;
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
};

type SanitizedProgrammeMilestone = Omit<
  ProgrammeMilestone,
  'createdAt' | 'updatedAt' | 'dueDate'
> & {
  dueDate?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const toDateString = (value: string | Date | null | undefined) =>
  value ? new Date(value).toISOString() : undefined;

const mapAssignments = (
  assignments: SanitizedProgrammeAssignment[] | undefined,
) =>
  (assignments ?? []).map<ProgrammeDetailDto['assignments'][number]>((assignment) => ({
    id: assignment.id,
    ngoId: assignment.ngoId,
    status: assignment.status,
    notes: assignment.notes ?? undefined,
    assignedAt: toDateString(assignment.createdAt) ?? '',
    updatedAt: toDateString(assignment.updatedAt) ?? '',
    ngo: assignment.ngo
      ? {
          id: assignment.ngo.id,
          name: assignment.ngo.user?.name ?? undefined,
          email: assignment.ngo.user?.email ?? undefined,
          missionStatement: assignment.ngo.missionStatement ?? undefined,
        }
      : undefined,
  }));

const mapMilestones = (
  milestones: SanitizedProgrammeMilestone[] | undefined,
) =>
  (milestones ?? []).map<ProgrammeDetailDto['milestones'][number]>((milestone) => ({
    id: milestone.id,
    title: milestone.title,
    description: milestone.description ?? undefined,
    status: milestone.status,
    progress: milestone.progress,
    dueDate: toDateString(milestone.dueDate ?? undefined),
    createdAt: toDateString(milestone.createdAt) ?? '',
    updatedAt: toDateString(milestone.updatedAt) ?? '',
  }));

export const toProgrammeDetailDto = (
  programme: SanitizedProgramme,
): ProgrammeDetailDto => ({
  id: programme.id,
  title: programme.title,
  description: programme.description ?? undefined,
  status: programme.status,
  budget: programme.budget ?? undefined,
  startDate: toDateString(programme.startDate ?? undefined),
  endDate: toDateString(programme.endDate ?? undefined),
  companyId: programme.companyId,
  milestones: mapMilestones(programme.milestones),
  assignments: mapAssignments(programme.assignments),
  createdAt: toDateString(programme.createdAt) ?? '',
  updatedAt: toDateString(programme.updatedAt) ?? '',
});

export const toProgrammeCreateResponseDto = (
  programme: SanitizedProgramme,
): ProgrammeCreateResponseDto => ({
  programme: toProgrammeDetailDto(programme),
});

export const toProgrammeUpdateResponseDto = (
  programme: SanitizedProgramme,
): ProgrammeUpdateResponseDto => ({
  programme: toProgrammeDetailDto(programme),
});

export const toProgrammeAssignmentDto = (
  assignment: SanitizedProgrammeAssignment,
): ProgrammeAssignmentDto => ({
  id: assignment.id,
  ngoId: assignment.ngoId,
  status: assignment.status,
  notes: assignment.notes ?? undefined,
  assignedAt: toDateString(assignment.createdAt) ?? '',
  updatedAt: toDateString(assignment.updatedAt) ?? '',
  ngo: assignment.ngo
    ? {
        id: assignment.ngo.id,
        name: assignment.ngo.user?.name ?? undefined,
        email: assignment.ngo.user?.email ?? undefined,
        missionStatement: assignment.ngo.missionStatement ?? undefined,
      }
    : undefined,
});

export const toProgrammeStatusTransitionDto = (
  programme: SanitizedProgramme,
): ProgrammeStatusTransitionDto => ({
  programmeId: programme.id,
  status: programme.status,
  updatedAt: toDateString(programme.updatedAt) ?? '',
});

export const toProgrammeListItemDto = (
  programme: SanitizedProgramme,
): ProgrammeListItemDto => ({
  id: programme.id,
  title: programme.title,
  description: programme.description ?? undefined,
  status: programme.status,
  budget: programme.budget ?? undefined,
  startDate: toDateString(programme.startDate ?? undefined),
  endDate: toDateString(programme.endDate ?? undefined),
  companyId: programme.companyId,
  assignments: mapAssignments(programme.assignments),
  milestones: mapMilestones(programme.milestones),
  createdAt: toDateString(programme.createdAt) ?? '',
  updatedAt: toDateString(programme.updatedAt) ?? '',
});
