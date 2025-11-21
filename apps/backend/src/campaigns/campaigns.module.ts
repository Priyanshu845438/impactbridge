import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicCampaignController } from './public-campaign.controller';
import { DonationsModule } from '../donations/donations.module';
import { ActivityLogModule } from '../activity/activity-log.module';

@Module({
  imports: [PrismaModule, DonationsModule, ActivityLogModule],
  providers: [CampaignsService],
  controllers: [CampaignsController, PublicCampaignController],
  exports: [CampaignsService],
})
export class CampaignsModule {}
