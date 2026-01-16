import { ApiProperty } from '@nestjs/swagger';

export class AdminFinancialReportDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  period!: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ANNUAL';

  @ApiProperty()
  year!: number;

  @ApiProperty()
  reportUrl!: string;

  @ApiProperty()
  ngoId!: string;

  @ApiProperty({ nullable: true })
  ngoName!: string | null;

  @ApiProperty({ nullable: true })
  ngoEmail!: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
