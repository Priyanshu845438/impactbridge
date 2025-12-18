import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NoopNotificationProvider } from './providers/noop.provider';
import { NOTIFICATION_PROVIDER } from './notification.types';

@Module({
  providers: [
    NotificationsService,
    {
      provide: NOTIFICATION_PROVIDER,
      useClass: NoopNotificationProvider,
    },
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
