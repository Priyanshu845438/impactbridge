import { IsString } from 'class-validator';

export class CSRSummaryRequestDto {
  @IsString()
  companyId!: string;

  @IsString()
  financialYear!: string;
}
