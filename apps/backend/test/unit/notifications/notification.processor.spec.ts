import { Test } from '@nestjs/testing';
import { NotificationProcessor } from '../../../src/notifications/notification.processor';
import { NotificationRepository } from '../../../src/notifications/notification.repository';
import {
  NOTIFICATION_PROVIDER,
  NotificationIntent,
  NotificationProvider,
} from '../../../src/notifications/notification.types';

class MockNotificationRepository {
  public findPending = jest.fn<Promise<NotificationIntent[]>, []>();
  public markSent = jest.fn<Promise<void>, [string]>();
  public markFailed = jest.fn<Promise<void>, [string]>();
  public recordMetric = jest.fn<Promise<void>, [string, string, string, string?]>();
}

class MockNotificationProvider implements NotificationProvider {
  constructor(private readonly options: { shouldFail?: boolean } = {}) {}

  async send(intent: NotificationIntent): Promise<void> {
    if (this.options.shouldFail) {
      throw new Error(`failed-${intent.id}`);
    }
  }
}

describe('NotificationProcessor', () => {
  let processor: NotificationProcessor;
  let repository: MockNotificationRepository;

  beforeEach(async () => {
    repository = new MockNotificationRepository();

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationProcessor,
        {
          provide: NotificationRepository,
          useValue: repository,
        },
        {
          provide: NOTIFICATION_PROVIDER,
          useFactory: () => new MockNotificationProvider(),
        },
      ],
    }).compile();

    processor = moduleRef.get(NotificationProcessor);
  });

  const buildIntent = (id: string): NotificationIntent => ({
    id,
    channel: 'email',
    recipient: { email: 'user@example.com' },
    payload: { body: 'Hello' },
    status: 'PENDING',
    createdAt: new Date(),
  });

  it('marks intents as sent when provider succeeds', async () => {
    const intents = [buildIntent('intent-1'), buildIntent('intent-2')];
    repository.findPending.mockResolvedValue(intents);

    const results = await processor.processBatch();

    expect(repository.findPending).toHaveBeenCalledWith(undefined);
    expect(repository.markSent).toHaveBeenCalledTimes(2);
    expect(repository.markSent).toHaveBeenCalledWith('intent-1');
    expect(repository.markSent).toHaveBeenCalledWith('intent-2');
    expect(repository.markFailed).not.toHaveBeenCalled();
    expect(repository.recordMetric).toHaveBeenCalledTimes(2);
    expect(repository.recordMetric).toHaveBeenCalledWith(
      'intent-1',
      'MockNotificationProvider',
      'success',
      undefined,
    );
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.outcome)).toEqual(['sent', 'sent']);
  });

  it('marks intent as failed when provider throws', async () => {
    const failingProvider = new MockNotificationProvider({ shouldFail: true });

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationProcessor,
        {
          provide: NotificationRepository,
          useValue: repository,
        },
        {
          provide: NOTIFICATION_PROVIDER,
          useValue: failingProvider,
        },
      ],
    }).compile();

    processor = moduleRef.get(NotificationProcessor);

    const intents = [buildIntent('intent-failed')];
    repository.findPending.mockResolvedValue(intents);

    const results = await processor.processBatch();

    expect(repository.markSent).not.toHaveBeenCalled();
    expect(repository.markFailed).toHaveBeenCalledWith('intent-failed');
    expect(repository.recordMetric).toHaveBeenCalledWith(
      'intent-failed',
      'MockNotificationProvider',
      'failure',
      expect.stringContaining('failed-intent-failed'),
    );
    expect(results).toHaveLength(1);
    expect(results[0].outcome).toBe('failed');
  });
});
