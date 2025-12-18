import { Inject, Injectable } from '@nestjs/common';
import {
  NotificationChannel,
  NotificationIntent,
  NotificationPayload,
  NotificationRecipient,
  NOTIFICATION_PROVIDER,
} from './notification.types';
import type { NotificationProvider } from './notification.types';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_PROVIDER)
    private readonly provider: NotificationProvider,
  ) {}

  enqueue(
    channel: NotificationChannel,
    recipient: NotificationRecipient,
    payload: NotificationPayload,
  ): NotificationIntent {
    const intent: NotificationIntent = {
      channel,
      recipient,
      payload,
      createdAt: new Date(),
    };

    void this.provider.send(intent);
    return intent;
  }
}
