import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { V1Module } from './v1/v1.module';
import { CSRProgrammeModule } from './csr-programme/csr-programme.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    V1Module,
    CSRProgrammeModule,
    ApprovalsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
