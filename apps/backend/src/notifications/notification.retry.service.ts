import { Injectable, Logger } from '@nestjs/common';
import { NotificationProcessor } from './notification.processor';
import { NotificationRepository, MIN_RETRY_DELAY_MS } from './notification.repository';
import { NotificationIntent } from './notification.types';

const MAX_RETRY_ATTEMPTS = 5;

@Injectable()
export class NotificationRetryService {
  private readonly logger = new Logger(NotificationRetryService.name);

  constructor(
    private readonly repository: NotificationRepository,
    private readonly processor: NotificationProcessor,
  ) {}

  async attemptRetries(limit = 25): Promise<void> {
    const now = new Date();
    const retryable = await this.repository.findRetryableFailed(now, limit);

    for (const intent of retryable) {
      if (!this.isRetryEligible(intent, now)) {
        continue;
      }

      this.logger.log(
        `retry_started intent=${intent.id} retryCount=${intent.retryCount}`,
      );

      const result = await this.processor.processIntent(intent);
      if (result.outcome === 'sent') {
        this.logger.log(`retry_succeeded intent=${intent.id}`);
        continue;
      }

      this.logger.warn(
        `retry_failed intent=${intent.id} reason=${
          result.error instanceof Error ? result.error.message : 'unknown'
        }`,
      );

      const updatedRetryCount = result.intent.retryCount;
      if (updatedRetryCount >= MAX_RETRY_ATTEMPTS) {
        await this.handleExhausted(intent.id);
      }
    }
  }

  private isRetryEligible(intent: NotificationIntent, now: Date): boolean {
    if (intent.retryCount >= MAX_RETRY_ATTEMPTS) {
      this.logger.debug(
        `intent ${intent.id} skipped - max retries reached (${intent.retryCount})`,
      );
      return false;
    }

    if (!intent.lastAttemptAt) {
      return true;
    }

    const elapsed = now.getTime() - intent.lastAttemptAt.getTime();
    if (elapsed < MIN_RETRY_DELAY_MS) {
      this.logger.debug(
        `intent ${intent.id} skipped - backoff not satisfied (elapsed=${elapsed})`,
      );
      return false;
    }

    return true;
  }

  private async handleExhausted(intentId: string): Promise<void> {
    await this.repository.markPermanentFailure(intentId);
    this.logger.warn(`retry_exhausted intent=${intentId}`);
  }
}
