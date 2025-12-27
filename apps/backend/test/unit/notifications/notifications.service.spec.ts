import { Test } from '@nestjs/testing';
import { NotificationsService } from '../../../src/notifications/notifications.service';
import {
  NotificationIntent,
  NOTIFICATION_PROVIDER,
  NotificationProvider,
} from '../../../src/notifications/notification.types';
import { NotificationRepository } from '../../../src/notifications/notification.repository';

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

  beforeEach(async () => {
    provider = new MockNotificationProvider();
    repository = new MockNotificationRepository();

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
      ],
    }).compile();

    service = moduleRef.get(NotificationsService);
  });

  it('persists intent then delegates to provider', async () => {
    const now = new Date();
    const storedIntent: NotificationIntent = {
      id: 'intent-1',
      channel: 'email',
      recipient: { email: 'user@example.com' },
      payload: { body: 'Hello' },
      status: 'PENDING',
      createdAt: now,
    };

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
});
