import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ImpactService } from './impact.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { CreateImpactMetricDto } from './dto/create-impact-metric.dto';

@Controller('impact')
export class ImpactController {
  constructor(private readonly impactService: ImpactService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post(':campaignId')
  addMetric(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: CreateImpactMetricDto,
  ) {
    return this.impactService.addMetric(campaignId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO, UserRole.COMPANY, UserRole.SUPER_ADMIN, UserRole.DONOR)
  @Get('campaign/:campaignId')
  getCampaignMetrics(@Param('campaignId') campaignId: string) {
    return this.impactService.getMetricsForCampaign(campaignId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO, UserRole.COMPANY, UserRole.SUPER_ADMIN, UserRole.DONOR)
  @Get('milestone/:milestoneId')
  getMilestoneMetrics(@Param('milestoneId') milestoneId: string) {
    return this.impactService.getMetricsForMilestone(milestoneId);
  }
}
