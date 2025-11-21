import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { DonationsService } from '../donations/donations.service';
import { CreatePublicDonationDto } from './dto/create-public-donation.dto';

@Controller('public/campaigns')
export class PublicCampaignController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly donationsService: DonationsService,
  ) {}

  @Get(':id')
  getCampaign(@Param('id') id: string) {
    return this.campaignsService.getPublicCampaignForDonation(id);
  }

  @Post(':id/donate')
  donate(@Param('id') id: string, @Body() dto: CreatePublicDonationDto) {
    return this.donationsService.createPublicDonation(id, dto);
  }
}
