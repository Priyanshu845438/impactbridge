import type { ProgrammeState } from '../../enums/programme-state.enum';
export interface ProgrammeDetailDto {
    id: string;
    title: string;
    description?: string;
    status: ProgrammeState;
    budget?: number;
    startDate?: string;
    endDate?: string;
    companyId: string;
    milestones: Array<{
        id: string;
        title: string;
        description?: string;
        status: string;
        progress: number;
        dueDate?: string;
        createdAt: string;
        updatedAt: string;
    }>;
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
    createdAt: string;
    updatedAt: string;
}
