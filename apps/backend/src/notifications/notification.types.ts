export type NotificationChannel = 'email' | 'sms';

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

export interface NotificationIntent {
  channel: NotificationChannel;
  recipient: NotificationRecipient;
  payload: NotificationPayload;
  createdAt: Date;
}

export interface NotificationProvider {
  send(intent: NotificationIntent): Promise<void>;
}

export const NOTIFICATION_PROVIDER = 'NOTIFICATION_PROVIDER';
