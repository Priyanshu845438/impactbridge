import { Inject, Injectable } from '@nestjs/common';
import {
  NotificationChannel,
  NotificationIntent,
  NotificationIntentCreate,
  NotificationPayload,
  NotificationRecipient,
  NOTIFICATION_PROVIDER,
} from './notification.types';
import type { NotificationProvider } from './notification.types';
import { NotificationRepository } from './notification.repository';
import { NotificationProcessor } from './notification.processor';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly repository: NotificationRepository,
    private readonly processor: NotificationProcessor,
    @Inject(NOTIFICATION_PROVIDER)
    private readonly provider: NotificationProvider,
  ) {}

  async enqueue(
    channel: NotificationChannel,
    recipient: NotificationRecipient,
    payload: NotificationPayload,
  ): Promise<NotificationIntent> {
    const data: NotificationIntentCreate = {
      channel,
      recipient,
      payload,
    };

    const intent = await this.repository.createIntent(data);
    void this.provider.send(intent);
    return intent;
  }

  async deliverPending(limit?: number): Promise<void> {
    await this.processor.processBatch(limit);
  }
}
