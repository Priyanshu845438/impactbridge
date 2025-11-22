import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { AuthUser } from '../auth/types/auth-user.type';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':campaignId')
  create(
    @CurrentUser() user: AuthUser,
    @Param('campaignId') campaignId: string,
    @Body() dto: CreateDonationDto,
  ) {
    const userId = user.sub;
    return this.donationsService.createDonation(userId, campaignId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMine(@CurrentUser() user: AuthUser) {
    const userId = user.sub;
    return this.donationsService.getMyDonations(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Get('ngo')
  getNgoDonations(@CurrentUser() user: AuthUser) {
    const userId = user.sub;
    return this.donationsService.getNGOCampaignDonations(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('admin/all')
  getAll() {
    return this.donationsService.getAllDonations();
  }
}
