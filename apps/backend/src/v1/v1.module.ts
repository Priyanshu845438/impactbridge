import { Module } from '@nestjs/common';
import { V1AuthModule } from './auth/auth.module';
import { V1UserModule } from './user/user.module';
import { V1AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [V1AuthModule, V1UserModule, V1AnalyticsModule],
})
export class V1Module {}
