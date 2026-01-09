export type NotificationChannel = 'email' | 'sms';

export type NotificationIntentStatus = 'PENDING' | 'SENT' | 'FAILED';

export type NotificationDeliveryOutcome = 'success' | 'failure';

export interface NotificationRecipient {
  email?: string;
  phone?: string;
  name?: string;
}

export interface NotificationPayload {
  subject?: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationIntentCreate {
  channel: NotificationChannel;
  recipient: NotificationRecipient;
  payload: NotificationPayload;
}

export interface NotificationIntent extends NotificationIntentCreate {
  id: string;
  status: NotificationIntentStatus;
  createdAt: Date;
  retryCount: number;
  lastAttemptAt: Date | null;
}

export interface NotificationDeliveryMetric {
  id: string;
  intentId: string;
  provider: string;
  outcome: NotificationDeliveryOutcome;
  failureReason?: string | null;
  createdAt: Date;
}

export interface NotificationProvider {
  send(intent: NotificationIntent): Promise<void>;
}

export const NOTIFICATION_PROVIDER = 'NOTIFICATION_PROVIDER';
