import type { ReportType } from '../../enums/report-type.enum';

export interface FinancialReportDto {
  id: string;
  ngoId?: string;
  companyId?: string;
  reportType?: ReportType | string;
  fiscalYear?: string;
  quarter?: string;
  period?: string;
  status?: string;
  reviewer?: string;
  url?: string;
  uploadedAt?: string;
}

export type NgoFinancialReportDto = FinancialReportDto;
