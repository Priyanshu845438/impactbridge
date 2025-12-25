import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AnalyticsAggregationService } from './analytics-aggregation.service';

@Module({
  imports: [PrismaModule],
  providers: [AnalyticsService, AnalyticsAggregationService],
  exports: [AnalyticsAggregationService],
})
export class AnalyticsModule {}
