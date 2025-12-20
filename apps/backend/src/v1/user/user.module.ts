import { Module } from '@nestjs/common';
import { V1UserController } from './user.controller';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [V1UserController],
})
export class V1UserModule {}
