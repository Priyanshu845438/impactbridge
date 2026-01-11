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

class DonationTotalDto {
  @Expose()
  @ApiProperty({ example: 'Last 7 days' })
  label!: string;

  @Expose()
  @ApiProperty({ example: 120000 })
  amount!: number;

  @Expose()
  @ApiProperty({ example: 0.12, required: false })
  delta?: number;
}

class DonationTimelinePointDto {
  @Expose()
  @ApiProperty({ example: '2025-02-01T00:00:00.000Z' })
  date!: string;

  @Expose()
  @ApiProperty({ example: 45000 })
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

class DonationsDto {
  @Expose()
  @Type(() => DonationTotalDto)
  totals!: DonationTotalDto[];

  @Expose()
  @Type(() => DonationTimelinePointDto)
  timeline!: DonationTimelinePointDto[];

  @Expose()
  @Type(() => DonationSummaryDto)
  summary!: DonationSummaryDto;
}

class ProgrammeCountDto {
  @Expose()
  @ApiProperty({ example: 'ACTIVE' })
  status!: string;

  @Expose()
  @ApiProperty({ example: 12 })
  count!: number;
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

class ProgrammesDto {
  @Expose()
  @Type(() => ProgrammeCountDto)
  counts!: ProgrammeCountDto[];

  @Expose()
  @Type(() => ProgrammeSummaryDto)
  summary!: ProgrammeSummaryDto;
}

class ApprovalCountDto {
  @Expose()
  @ApiProperty({ example: 'APPROVED' })
  status!: string;

  @Expose()
  @ApiProperty({ example: 10 })
  count!: number;
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

class ApprovalsDto {
  @Expose()
  @Type(() => ApprovalCountDto)
  counts!: ApprovalCountDto[];

  @Expose()
  @Type(() => ApprovalSummaryDto)
  summary!: ApprovalSummaryDto;
}

class FinancialOverviewDto {
  @Expose()
  @ApiProperty({ example: 120 })
  totalReports!: number;

  @Expose()
  @ApiProperty({ example: 45 })
  ngoCount!: number;

  @Expose()
  @ApiProperty({ example: '2025-02-10T09:30:00.000Z', nullable: true })
  latestSubmittedAt!: string | null;
}

class ActivityEntryDto {
  @Expose()
  @ApiProperty({ example: 'log-id' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 'Priya Menon' })
  actor!: string;

  @Expose()
  @ApiProperty({ example: 'programme_created' })
  action!: string;

  @Expose()
  @ApiProperty({ example: '2025-02-18T10:00:00.000Z' })
  timestamp!: string;
}

export class AdminAnalyticsResponseDto {
  @Expose()
  @Type(() => DonationsDto)
  donations!: DonationsDto;

  @Expose()
  @Type(() => ProgrammesDto)
  programmes!: ProgrammesDto;

  @Expose()
  @Type(() => ApprovalsDto)
  approvals!: ApprovalsDto;

  @Expose()
  @Type(() => FinancialOverviewDto)
  financial!: FinancialOverviewDto;

  @Expose()
  @Type(() => ActivityEntryDto)
  recentActivity!: ActivityEntryDto[];
}
