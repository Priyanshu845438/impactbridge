import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class DonationWindowDto {
  @Expose()
  @ApiProperty({ example: 42 })
  count!: number;

  @Expose()
  @ApiProperty({ example: 125000 })
  amount!: number;
}

class DonationSummaryDto {
  @Expose()
  @ApiProperty({ example: 120 })
  totalCount!: number;

  @Expose()
  @ApiProperty({ example: 450000 })
  totalAmount!: number;

  @Expose()
  @Type(() => DonationWindowDto)
  today!: DonationWindowDto;

  @Expose()
  @Type(() => DonationWindowDto)
  last7Days!: DonationWindowDto;

  @Expose()
  @Type(() => DonationWindowDto)
  last30Days!: DonationWindowDto;
}

class ProgrammeSummaryDto {
  @Expose()
  @ApiProperty({ example: 32 })
  totalProgrammes!: number;

  @Expose()
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'number' },
    example: { ACTIVE: 12, COMPLETED: 5 },
  })
  byStatus!: Record<string, number>;
}

class ApprovalSummaryDto {
  @Expose()
  @ApiProperty({ example: 27 })
  totalApprovals!: number;

  @Expose()
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'number' },
    example: { APPROVED: 10, PENDING: 7 },
  })
  byStatus!: Record<string, number>;
}

export class AdminAnalyticsResponseDto {
  @Expose()
  @Type(() => DonationSummaryDto)
  donations!: DonationSummaryDto;

  @Expose()
  @Type(() => ProgrammeSummaryDto)
  programmes!: ProgrammeSummaryDto;

  @Expose()
  @Type(() => ApprovalSummaryDto)
  approvals!: ApprovalSummaryDto;
}
