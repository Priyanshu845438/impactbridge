import { Test } from '@nestjs/testing';
import { NotificationsService } from '../../../src/notifications/notifications.service';
import {
  NotificationIntent,
  NOTIFICATION_PROVIDER,
  NotificationProvider,
} from '../../../src/notifications/notification.types';

class MockNotificationProvider implements NotificationProvider {
  public lastIntent: NotificationIntent | null = null;

  send(intent: NotificationIntent): Promise<void> {
    this.lastIntent = intent;
    return Promise.resolve();
  }
}

describe('NotificationsService', () => {
  let service: NotificationsService;
  let provider: MockNotificationProvider;

  beforeEach(async () => {
    provider = new MockNotificationProvider();

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: NOTIFICATION_PROVIDER,
          useValue: provider,
        },
      ],
    }).compile();

    service = moduleRef.get(NotificationsService);
  });

  it('creates intent with timestamp and delegates to provider', () => {
    const recipient = { email: 'user@example.com' };
    const payload = { subject: 'Test', body: 'Hello' };

    const intent = service.enqueue('email', recipient, payload);

    expect(intent.channel).toBe('email');
    expect(intent.recipient).toEqual(recipient);
    expect(intent.payload).toEqual(payload);
    expect(intent.createdAt).toBeInstanceOf(Date);
    expect(provider.lastIntent).toEqual(intent);
  });
});
