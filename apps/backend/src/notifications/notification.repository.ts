import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { PrismaService } from '../prisma/prisma.service';
import {
  NotificationChannel,
  NotificationIntent,
  NotificationIntentCreate,
  NotificationIntentStatus,
  NotificationDeliveryMetric,
  NotificationDeliveryOutcome,
  NotificationPayload,
  NotificationRecipient,
} from './notification.types';

const DEFAULT_STATUS: NotificationIntentStatus = 'PENDING';
const PENDING_STATUS: NotificationIntentStatus = 'PENDING';
const SENT_STATUS: NotificationIntentStatus = 'SENT';
const FAILED_STATUS: NotificationIntentStatus = 'FAILED';
const PERMANENT_FAILURE_STATUS: NotificationIntentStatus = 'PERMANENT_FAILURE';

export const MAX_RETRY_ATTEMPTS = 5;
export const MIN_RETRY_DELAY_MS = 60 * 1000; // 1 minute minimum delay between retries.

const DEFAULT_PENDING_LIMIT = 25;

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

const toIntent = (value: {
  id: string;
  channel: string;
  recipient: Prisma.JsonValue;
  payload: Prisma.JsonValue;
  status: string;
  createdAt: Date;
  retryCount: number;
  lastAttemptAt: Date | null;
}): NotificationIntent => ({
  id: value.id,
  channel: toChannel(value.channel),
  recipient: toRecipient(value.recipient),
  payload: toPayload(value.payload),
  status: toStatus(value.status),
  createdAt: value.createdAt,
  retryCount: value.retryCount,
  lastAttemptAt: value.lastAttemptAt,
});

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
        retryCount: 0,
        lastAttemptAt: null,
      },
    });

    return toIntent(created);
  }

  async findPending(
    limit = DEFAULT_PENDING_LIMIT,
  ): Promise<NotificationIntent[]> {
    const rows = await this.prisma.notificationIntent.findMany({
      where: { status: PENDING_STATUS },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    return rows.map(toIntent);
  }

  async findRetryableFailed(
    now: Date,
    limit = DEFAULT_PENDING_LIMIT,
  ): Promise<NotificationIntent[]> {
    const rows = await this.prisma.notificationIntent.findMany({
      where: {
        status: FAILED_STATUS,
        retryCount: { lt: MAX_RETRY_ATTEMPTS },
        OR: [
          { lastAttemptAt: null },
          {
            lastAttemptAt: {
              lt: new Date(now.getTime() - MIN_RETRY_DELAY_MS),
            },
          },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    return rows.map(toIntent);
  }

  async markSent(id: string): Promise<NotificationIntent> {
    const updated = await this.prisma.notificationIntent.update({
      where: { id },
      data: {
        status: SENT_STATUS,
        retryCount: { increment: 1 },
        lastAttemptAt: new Date(),
      },
    });

    return toIntent(updated);
  }

  async markFailed(id: string): Promise<NotificationIntent> {
    const updated = await this.prisma.notificationIntent.update({
      where: { id },
      data: {
        status: FAILED_STATUS,
        retryCount: { increment: 1 },
        lastAttemptAt: new Date(),
      },
    });

    return toIntent(updated);
  }

  async markPermanentFailure(id: string): Promise<void> {
    await this.prisma.notificationIntent.update({
      where: { id },
      data: {
        status: PERMANENT_FAILURE_STATUS,
        lastAttemptAt: new Date(),
      },
    });
  }

  async recordMetric(
    intentId: string,
    provider: string,
    outcome: NotificationDeliveryOutcome,
    failureReason?: string,
  ): Promise<NotificationDeliveryMetric> {
    const created = await this.prisma.notificationDeliveryMetric.create({
      data: {
        intentId,
        provider,
        outcome,
        failureReason,
      },
    });

    return {
      id: created.id,
      intentId: created.intentId,
      provider: created.provider,
      outcome: created.outcome as NotificationDeliveryOutcome,
      failureReason: created.failureReason,
      createdAt: created.createdAt,
    };
  }
}
