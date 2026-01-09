import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationRetryService } from './notification.retry.service';

@Injectable()
export class NotificationRetryScheduler {
  private readonly logger = new Logger(NotificationRetryScheduler.name);

  constructor(private readonly retryService: NotificationRetryService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleRetryTick(): Promise<void> {
    try {
      await this.retryService.attemptRetries();
    } catch (error) {
      this.logger.error(
        `Retry scheduler error: ${
          error instanceof Error ? error.message : 'unknown'
        }`,
      );
    }
  }
}
