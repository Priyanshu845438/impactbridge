import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UtilizationReportDto {
  @IsNumber()
  amountUsed!: number;

  @IsString()
  description!: string;

  @IsString()
  proofUrl!: string;

  @IsOptional()
  @IsString()
  milestoneId?: string;
}
