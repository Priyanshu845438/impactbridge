import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AnalyticsAggregationService } from '../../analytics/analytics-aggregation.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../user/user-role.enum';
import { AdminAnalyticsResponseDto } from './dto/admin-analytics-response.dto';
import { AdminAnalyticsScopeQueryDto } from './dto/admin-analytics-scope-query.dto';

@Controller({ path: 'admin/analytics', version: '1' })
@ApiTags('Admin Analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class V1AnalyticsController {
  constructor(private readonly aggregation: AnalyticsAggregationService) {}

  @Get('overview')
  @ApiOkResponse({ type: AdminAnalyticsResponseDto })
  async getAdminOverview(
    @Query() scope: AdminAnalyticsScopeQueryDto,
  ): Promise<AdminAnalyticsResponseDto> {
    const { companyId, ngoId } = scope;

    const [donations, programmes, approvals, financial, recentActivity] =
      await Promise.all([
        this.aggregation.getDonationOverview({ companyId, ngoId }),
        this.aggregation.getProgrammeOverview({ companyId, ngoId }),
        this.aggregation.getApprovalOverview({ companyId, ngoId }),
        this.aggregation.getFinancialReportOverview({ companyId, ngoId }),
        this.aggregation.getRecentActivity(),
    ]);

    return {
      donations: {
        ...donations,
        kpis: {
          ...donations.kpis,
          largestDonation: donations.kpis.largestDonation
            ? {
                amount: donations.kpis.largestDonation.amount,
                donationDate: donations.kpis.largestDonation.donationDate
                  ? donations.kpis.largestDonation.donationDate.toISOString()
                  : null,
              }
            : null,
        },
      },
      programmes,
      approvals,
      financial: {
        totalReports: financial.totalReports,
        ngoCount: financial.ngoCount,
        latestSubmittedAt: financial.latestSubmittedAt
          ? financial.latestSubmittedAt.toISOString()
          : null,
        kpis: financial.kpis,
      },
      recentActivity,
    } satisfies AdminAnalyticsResponseDto;
  }
}
