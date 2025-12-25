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
    const [donations, programmes, approvals] = await Promise.all([
      this.aggregation.getDonationTotals(),
      this.aggregation.getProgrammeCounts(),
      this.aggregation.getApprovalStatusBreakdown(),
    ]);

    return {
      donations: {
        totalCount: donations.totalCount,
        totalAmount: donations.totalAmount,
        today: {
          count: donations.today.totalCount,
          amount: donations.today.totalAmount,
        },
        last7Days: {
          count: donations.last7Days.totalCount,
          amount: donations.last7Days.totalAmount,
        },
        last30Days: {
          count: donations.last30Days.totalCount,
          amount: donations.last30Days.totalAmount,
        },
      },
      programmes,
      approvals,
    } satisfies AdminAnalyticsResponseDto;
  }
}
