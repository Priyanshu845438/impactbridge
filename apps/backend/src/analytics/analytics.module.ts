import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AnalyticsAggregationService } from './analytics-aggregation.service';

@Module({
  imports: [PrismaModule],
  providers: [AnalyticsService, AnalyticsAggregationService],
  controllers: [AnalyticsController],
  exports: [AnalyticsAggregationService],
})
export class AnalyticsModule {}
