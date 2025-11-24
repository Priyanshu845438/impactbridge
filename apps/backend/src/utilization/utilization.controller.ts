import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UtilizationService } from './utilization.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { UtilizationReportDto } from './dto/utilization-report.dto';

@Controller('utilization')
export class UtilizationController {
  constructor(private readonly utilizationService: UtilizationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post(':campaignId')
  submit(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: UtilizationReportDto,
  ) {
    return this.utilizationService.submitReport(campaignId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO, UserRole.COMPANY, UserRole.SUPER_ADMIN)
  @Get('campaign/:campaignId')
  listForCampaign(@Param('campaignId') campaignId: string) {
    return this.utilizationService.listReportsForCampaign(campaignId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO, UserRole.COMPANY, UserRole.SUPER_ADMIN, UserRole.DONOR)
  @Get('milestone/:milestoneId')
  listForMilestone(@Param('milestoneId') milestoneId: string) {
    return this.utilizationService.listReportsForMilestone(milestoneId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('admin/all')
  adminAll() {
    return this.utilizationService.adminAllReports();
  }
}
