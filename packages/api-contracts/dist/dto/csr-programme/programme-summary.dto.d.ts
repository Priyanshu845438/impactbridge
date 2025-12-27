import type { ProgrammeState } from '../../enums/programme-state.enum';
export interface ProgrammeSummaryDto {
    id: string;
    title: string;
    description: string;
    ownerCompanyId: string;
    ngoId?: string;
    state: ProgrammeState;
    startDate?: string;
    endDate?: string;
}
