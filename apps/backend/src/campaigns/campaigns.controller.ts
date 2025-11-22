import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { AuthUser } from '../auth/types/auth-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateCampaignDto) {
    const userId = user.sub;
    return this.campaignsService.createForNGO(userId, dto);
  }

  @Get('public')
  getPublicCampaigns() {
    return this.campaignsService.getPublicCampaigns();
  }

  @Get('public/:id')
  getPublicCampaign(@Param('id') id: string) {
    return this.campaignsService.getCampaignById(id);
  }
}
