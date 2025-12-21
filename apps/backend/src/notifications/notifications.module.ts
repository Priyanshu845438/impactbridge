import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NoopNotificationProvider } from './providers/noop.provider';
import { NOTIFICATION_PROVIDER } from './notification.types';
import { NotificationRepository } from './notification.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    NotificationRepository,
    NotificationsService,
    {
      provide: NOTIFICATION_PROVIDER,
      useClass: NoopNotificationProvider,
    },
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
