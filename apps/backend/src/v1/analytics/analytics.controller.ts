import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AnalyticsAggregationService } from '../../analytics/analytics-aggregation.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../user/user-role.enum';
import { AdminAnalyticsResponseDto } from './dto/admin-analytics-response.dto';

@Controller({ path: 'admin/analytics', version: '1' })
@ApiTags('Admin Analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class V1AnalyticsController {
  constructor(private readonly aggregation: AnalyticsAggregationService) {}

  @Get('overview')
  @ApiOkResponse({ type: AdminAnalyticsResponseDto })
  async getAdminOverview(): Promise<AdminAnalyticsResponseDto> {
    const [donations, programmes, approvals, financial, recentActivity] =
      await Promise.all([
        this.aggregation.getDonationOverview(),
        this.aggregation.getProgrammeOverview(),
        this.aggregation.getApprovalOverview(),
        this.aggregation.getFinancialReportOverview(),
        this.aggregation.getRecentActivity(),
    ]);

    return {
      donations,
      programmes,
      approvals,
      financial: {
        totalReports: financial.totalReports,
        ngoCount: financial.ngoCount,
        latestSubmittedAt: financial.latestSubmittedAt
          ? financial.latestSubmittedAt.toISOString()
          : null,
      },
      recentActivity,
    } satisfies AdminAnalyticsResponseDto;
  }
}
