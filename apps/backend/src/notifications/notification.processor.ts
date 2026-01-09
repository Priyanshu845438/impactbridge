import { Inject, Injectable, Logger } from '@nestjs/common';
import { NotificationIntent, NOTIFICATION_PROVIDER } from './notification.types';
import type { NotificationProvider } from './notification.types';
import { NotificationRepository } from './notification.repository';

interface ProcessResult {
  intent: NotificationIntent;
  outcome: 'sent' | 'failed';
  error?: unknown;
}

@Injectable()
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    private readonly repository: NotificationRepository,
    @Inject(NOTIFICATION_PROVIDER)
    private readonly provider: NotificationProvider,
  ) {}

  async processBatch(limit?: number): Promise<ProcessResult[]> {
    const intents = await this.repository.findPending(limit);
    const results: ProcessResult[] = [];

    for (const intent of intents) {
      try {
        await this.provider.send(intent);
        await this.repository.markSent(intent.id);
        results.push({ intent, outcome: 'sent' });
      } catch (error) {
        await this.repository.markFailed(intent.id);
        this.logger.warn(
          `Notification intent ${intent.id} failed: ${
            error instanceof Error ? error.message : 'unknown error'
          }`,
        );
        results.push({ intent, outcome: 'failed', error });
      }
    }

    return results;
  }
}
