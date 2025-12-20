import { Module } from '@nestjs/common';
import { V1AuthModule } from './auth/auth.module';
import { V1UserModule } from './user/user.module';

@Module({
  imports: [V1AuthModule, V1UserModule],
})
export class V1Module {}
