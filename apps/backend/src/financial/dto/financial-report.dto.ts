import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class FinancialReportDto {
  @IsEnum(['Q1', 'Q2', 'Q3', 'Q4', 'ANNUAL'])
  period!: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ANNUAL';

  @IsInt()
  @Min(1900)
  @Max(3000)
  year!: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  reportUrl!: string;
}
