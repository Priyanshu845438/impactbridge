import type { ReportType } from '../../enums/report-type.enum';
export interface FinancialReportDto {
    id: string;
    ngoId: string;
    companyId?: string;
    reportType: ReportType;
    fiscalYear: string;
    quarter?: string;
    url: string;
    uploadedAt: string;
}
