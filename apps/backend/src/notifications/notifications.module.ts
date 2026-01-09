import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';
import { NoopNotificationProvider } from './providers/noop.provider';
import { NOTIFICATION_PROVIDER } from './notification.types';
import { NotificationRepository } from './notification.repository';
import { NotificationProcessor } from './notification.processor';
import { NotificationRetryService } from './notification.retry.service';
import { NotificationRetryScheduler } from './notification.scheduler';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  providers: [
    NotificationRepository,
    NotificationProcessor,
    NotificationRetryService,
    NotificationRetryScheduler,
    NotificationsService,
    {
      provide: NOTIFICATION_PROVIDER,
      useClass: NoopNotificationProvider,
    },
  ],
  exports: [NotificationsService, NotificationProcessor, NotificationRetryService],
})
export class NotificationsModule {}
