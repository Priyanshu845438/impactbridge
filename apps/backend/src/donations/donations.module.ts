import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityLogModule } from '../activity/activity-log.module';
import { CSRModule } from '../csr/csr.module';

@Module({
  imports: [PrismaModule, ActivityLogModule, CSRModule],
  providers: [DonationsService],
  controllers: [DonationsController],
  exports: [DonationsService],
})
export class DonationsModule {}
