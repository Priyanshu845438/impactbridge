export interface FinancialAdminReportDto {
    id: string;
    ngoId: string;
    ngoName: string | null;
    ngoEmail: string | null;
    period: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ANNUAL';
    year: number;
    reportUrl: string;
    createdAt: string;
    updatedAt: string;
}
