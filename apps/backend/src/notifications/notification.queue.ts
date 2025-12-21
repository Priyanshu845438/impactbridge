export interface NotificationQueueJob {
  intentId: string;
}

export interface NotificationQueue {
  enqueue(job: NotificationQueueJob): Promise<void>;
}

export const NOTIFICATION_QUEUE = 'NOTIFICATION_QUEUE';
