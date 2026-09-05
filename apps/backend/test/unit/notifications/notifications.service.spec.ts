import { Test } from '@nestjs/testing';
import { NotificationsService } from '../../../src/notifications/notifications.service';
import {
  NotificationIntent,
  NOTIFICATION_PROVIDER,
  NotificationProvider,
} from '../../../src/notifications/notification.types';
import { NotificationRepository } from '../../../src/notifications/notification.repository';
import { NotificationProcessor } from '../../../src/notifications/notification.processor';

class MockNotificationProvider implements NotificationProvider {
  public lastIntent: NotificationIntent | null = null;

  send(intent: NotificationIntent): Promise<void> {
    this.lastIntent = intent;
    return Promise.resolve();
  }
}

class MockNotificationRepository {
  public createIntent = jest.fn();
}

describe('NotificationsService', () => {
  let service: NotificationsService;
  let provider: MockNotificationProvider;
  let repository: MockNotificationRepository;
  let processor: NotificationProcessor;

  beforeEach(async () => {
    provider = new MockNotificationProvider();
    repository = new MockNotificationRepository();
    processor = { processBatch: jest.fn() } as unknown as NotificationProcessor;

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: NOTIFICATION_PROVIDER,
          useValue: provider,
        },
        {
          provide: NotificationRepository,
          useValue: repository,
        },
        {
          provide: NotificationProcessor,
          useValue: processor,
        },
      ],
    }).compile();

    service = moduleRef.get(NotificationsService);
  });

  const buildIntent = (
    overrides: Partial<NotificationIntent> = {},
  ): NotificationIntent => ({
    id: 'intent-1',
    channel: 'email',
    recipient: { email: 'user@example.com' },
    payload: { body: 'Hello' },
    status: 'PENDING',
    createdAt: new Date(),
    ...overrides,
  });

  it('persists intent then delegates to provider', async () => {
    const storedIntent = buildIntent();

    repository.createIntent.mockResolvedValue(storedIntent);

    const intent = await service.enqueue(
      'email',
      { email: 'user@example.com' },
      { body: 'Hello' },
    );

    expect(repository.createIntent).toHaveBeenCalledWith({
      channel: 'email',
      recipient: { email: 'user@example.com' },
      payload: { body: 'Hello' },
    });
    expect(provider.lastIntent).toEqual(storedIntent);
    expect(intent).toEqual(storedIntent);
  });

  it('delegates delivery to processor when flush requested', async () => {
    await service.deliverPending();

    expect(processor.processBatch).toHaveBeenCalledWith(undefined);

    await service.deliverPending(10);
    expect(processor.processBatch).toHaveBeenLastCalledWith(10);
  });
});
