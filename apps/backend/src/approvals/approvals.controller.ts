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
import { UsersService } from '../users/users.service';

@Controller('approvals')
export class ApprovalsController {
  constructor(
    private readonly approvalsService: ApprovalsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post(':campaignId/request')
  async requestApproval(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: RequestApprovalDto,
  ) {
    const profile = await this.usersService.getNGOProfileByUserId(user.sub);
    if (!profile) {
      throw new Error('NGO profile not found');
    }

    return this.approvalsService.requestApproval(
      campaignId,
      user.sub,
      dto.companyId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Post(':campaignId/approve')
  approve(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: ApproveProjectDto,
  ) {
    return this.approvalsService.approve(campaignId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Post(':campaignId/reject')
  reject(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: ApproveProjectDto,
  ) {
    return this.approvalsService.reject(campaignId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Get('company/pending')
  getPending(@CurrentUser() user: AuthUser) {
    return this.approvalsService.getPendingForCompany(user.sub);
  }
}
