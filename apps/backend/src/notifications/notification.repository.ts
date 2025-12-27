import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { PrismaService } from '../prisma/prisma.service';
import {
  NotificationChannel,
  NotificationIntent,
  NotificationIntentCreate,
  NotificationIntentStatus,
  NotificationPayload,
  NotificationRecipient,
} from './notification.types';

const DEFAULT_STATUS: NotificationIntentStatus = 'PENDING';

const toJsonValue = (value: unknown): Prisma.InputJsonValue =>
  value as Prisma.InputJsonValue;

const toRecipient = (value: Prisma.JsonValue): NotificationRecipient =>
  value as unknown as NotificationRecipient;

const toPayload = (value: Prisma.JsonValue): NotificationPayload =>
  value as unknown as NotificationPayload;

const toChannel = (value: string): NotificationChannel =>
  value as NotificationChannel;

const toStatus = (value: string): NotificationIntentStatus =>
  value as NotificationIntentStatus;

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createIntent(
    data: NotificationIntentCreate,
  ): Promise<NotificationIntent> {
    const created = await this.prisma.notificationIntent.create({
      data: {
        channel: data.channel,
        recipient: toJsonValue(data.recipient),
        payload: toJsonValue(data.payload),
        status: DEFAULT_STATUS,
      },
    });

    return {
      id: created.id,
      channel: toChannel(created.channel),
      recipient: toRecipient(created.recipient),
      payload: toPayload(created.payload),
      status: toStatus(created.status),
      createdAt: created.createdAt,
    };
  }
}
