import {
  NotificationIntent,
  NotificationProvider,
} from '../notification.types';

export class NoopNotificationProvider implements NotificationProvider {
  send(intent: NotificationIntent): Promise<void> {
    // Intentionally left blank – used for local dev & tests.
    void intent;
    return Promise.resolve();
  }
}
