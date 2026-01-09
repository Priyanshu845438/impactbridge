import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  NotificationIntent,
  NotificationDeliveryOutcome,
  NOTIFICATION_PROVIDER,
} from './notification.types';
import type { NotificationProvider } from './notification.types';
import { NotificationRepository } from './notification.repository';

export interface ProcessResult {
  intent: NotificationIntent;
  outcome: 'sent' | 'failed';
  error?: unknown;
}

@Injectable()
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  // Retry policy (no automated retries yet):
  // - statuses eligible for future retries: PENDING, FAILED (SENT is terminal)
  // - maximum retry attempts: 5 (enforced by future schedulers/workers)
  // These rules are documented here for visibility only; current behaviour remains one-shot delivery.
  constructor(
    private readonly repository: NotificationRepository,
    @Inject(NOTIFICATION_PROVIDER)
    private readonly provider: NotificationProvider,
  ) {}

  async processBatch(limit?: number): Promise<ProcessResult[]> {
    const intents = await this.repository.findPending(limit);
    const results: ProcessResult[] = [];

    for (const intent of intents) {
      const result = await this.processIntent(intent);
      results.push(result);
    }

    return results;
  }

  async processIntent(intent: NotificationIntent): Promise<ProcessResult> {
    this.logger.log(
      `Delivery attempt started for intent ${intent.id} (channel=${intent.channel}, retryCount=${intent.retryCount})`,
    );

    try {
      await this.provider.send(intent);
      const updatedIntent = await this.repository.markSent(intent.id);
      await this.safeRecordMetric(intent.id, 'success');
      this.logger.log(`Delivery success for intent ${intent.id}`);
      return { intent: updatedIntent, outcome: 'sent' };
    } catch (error) {
      const updatedIntent = await this.repository.markFailed(intent.id);
      await this.safeRecordMetric(
        intent.id,
        'failure',
        error instanceof Error ? error.message : 'unknown error',
      );
      this.logger.warn(
        `Delivery failure for intent ${intent.id}: ${
          error instanceof Error ? error.message : 'unknown error'
        }`,
      );
      return { intent: updatedIntent, outcome: 'failed', error };
    }
  }

  private async safeRecordMetric(
    intentId: string,
    outcome: NotificationDeliveryOutcome,
    failureReason?: string,
  ): Promise<void> {
    try {
      await this.repository.recordMetric(
        intentId,
        this.provider.constructor.name,
        outcome,
        failureReason,
      );
    } catch (err) {
      const warning =
        err instanceof Error ? err.message : 'unknown metric persistence error';
      this.logger.warn(
        `Metric persistence failed for intent ${intentId}: ${warning}`,
      );
    }
  }
}
