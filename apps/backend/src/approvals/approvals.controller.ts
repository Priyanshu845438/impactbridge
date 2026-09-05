import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { ApproveProjectDto } from './dto/approve-project.dto';
import { RequestApprovalDto } from './dto/request-approval.dto';

@Controller({ path: 'approvals', version: '1' })
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post(':campaignId/request')
  requestApproval(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: RequestApprovalDto,
  ) {
    return this.approvalsService.requestApproval(
      campaignId,
      user.sub,
      dto.companyId,
      user.sub,
      dto.remarks,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY, UserRole.SUPER_ADMIN)
  @Post(':campaignId/approve')
  approve(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: ApproveProjectDto,
  ) {
    return this.approvalsService.approve(campaignId, user.sub, dto, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY, UserRole.SUPER_ADMIN)
  @Post(':campaignId/reject')
  reject(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: ApproveProjectDto,
  ) {
    return this.approvalsService.reject(campaignId, user.sub, dto, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY, UserRole.SUPER_ADMIN)
  @Post(':campaignId/revoke')
  revoke(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body('remarks') remarks?: string,
  ) {
    return this.approvalsService.revoke(
      campaignId,
      user.sub,
      user.sub,
      remarks,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY, UserRole.SUPER_ADMIN)
  @Get('pending')
  getAllOrCompanyPending(@CurrentUser() user: AuthUser) {
    if (user.role === UserRole.SUPER_ADMIN) {
      return this.approvalsService.getAllPending();
    }
    return this.approvalsService.getPendingForCompany(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Get('company/pending')
  getPending(@CurrentUser() user: AuthUser) {
    return this.approvalsService.getPendingForCompany(user.sub);
  }
}
