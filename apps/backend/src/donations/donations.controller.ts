import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Get } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':campaignId')
  create(
    @CurrentUser() user: any,
    @Param('campaignId') campaignId: string,
    @Body() dto: CreateDonationDto,
  ) {
    return this.donationsService.createDonation(user?.id, campaignId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMine(@CurrentUser() user: any) {
    return this.donationsService.getMyDonations(user?.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Get('ngo')
  getNgoDonations(@CurrentUser() user: any) {
    return this.donationsService.getNGOCampaignDonations(user?.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('admin/all')
  getAll() {
    return this.donationsService.getAllDonations();
  }
}
