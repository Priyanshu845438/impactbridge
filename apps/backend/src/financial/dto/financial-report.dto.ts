import { IsEnum, IsNumber, IsString } from 'class-validator';

export class FinancialReportDto {
  @IsEnum(['Q1', 'Q2', 'Q3', 'Q4', 'ANNUAL'])
  period!: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ANNUAL';

  @IsNumber()
  year!: number;

  @IsString()
  reportUrl!: string;
}
