import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneStatusDto } from './dto/update-milestone-status.dto';

@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestonesService: MilestonesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post(':campaignId')
  create(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: CreateMilestoneDto,
  ) {
    return this.milestonesService.create(campaignId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Patch('status/:milestoneId')
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('milestoneId') milestoneId: string,
    @Body() dto: UpdateMilestoneStatusDto,
  ) {
    return this.milestonesService.updateStatus(milestoneId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO, UserRole.COMPANY, UserRole.SUPER_ADMIN)
  @Get(':campaignId')
  list(@CurrentUser() user: AuthUser, @Param('campaignId') campaignId: string) {
    return this.milestonesService.listForCampaign(
      campaignId,
      user.sub,
      user.role,
    );
  }
}
