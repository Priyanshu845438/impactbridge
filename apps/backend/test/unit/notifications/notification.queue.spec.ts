import { NOTIFICATION_QUEUE } from '../../../src/notifications/notification.queue';

describe('Notification queue contract', () => {
  it('exposes a shared injection token', () => {
    expect(typeof NOTIFICATION_QUEUE).toBe('string');
    expect(NOTIFICATION_QUEUE).toBe('NOTIFICATION_QUEUE');
  });
});
