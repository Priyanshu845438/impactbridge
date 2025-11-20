import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

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
    return this.donationsService.createDonation(user?.sub, campaignId, dto);
  }
}
