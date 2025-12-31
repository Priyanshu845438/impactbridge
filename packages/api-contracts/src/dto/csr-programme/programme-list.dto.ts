import type { ProgrammeState } from '../../enums/programme-state.enum';

/**
 * CSR programme summary returned in list endpoints.
 */
export interface ProgrammeListItemDto {
  id: string;
  title: string;
  description?: string;
  status: ProgrammeState;
  budget?: number;
  startDate?: string;
  endDate?: string;
  companyId: string;
  assignments: Array<{
    id: string;
    ngoId: string;
    status: string;
    notes?: string;
    assignedAt: string;
    updatedAt: string;
    ngo?: {
      id: string;
      name?: string;
      email?: string;
      missionStatement?: string;
    };
  }>;
  milestones: Array<{
    id: string;
    title: string;
    status: string;
    progress: number;
    dueDate?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
