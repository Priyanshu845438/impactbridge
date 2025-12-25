import { Module } from '@nestjs/common';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { V1AnalyticsController } from './analytics.controller';

@Module({
  imports: [AnalyticsModule],
  controllers: [V1AnalyticsController],
})
export class V1AnalyticsModule {}
