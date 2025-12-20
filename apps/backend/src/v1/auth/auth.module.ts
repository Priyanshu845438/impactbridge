import { Module } from '@nestjs/common';
import { V1AuthController } from './auth.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [V1AuthController],
})
export class V1AuthModule {}
