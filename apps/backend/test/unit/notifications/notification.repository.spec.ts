import { Test } from '@nestjs/testing';
import { Prisma } from 'prisma/generated';
import { NotificationRepository, MAX_RETRY_ATTEMPTS, MIN_RETRY_DELAY_MS } from '../../../src/notifications/notification.repository';
import { PrismaService } from '../../../src/prisma/prisma.service';

class MockPrismaService {
  public notificationIntent = {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  };

  public notificationDeliveryMetric = {
    create: jest.fn(),
  };
}

describe('NotificationRepository', () => {
  let repository: NotificationRepository;
  let prisma: MockPrismaService;

  beforeEach(async () => {
    prisma = new MockPrismaService();

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationRepository,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    repository = moduleRef.get(NotificationRepository);
  });

  const sample = {
    id: 'intent-123',
    channel: 'email',
    recipient: { email: 'user@example.com' } as Prisma.JsonObject,
    payload: { body: 'Hello' } as Prisma.JsonObject,
    status: 'PENDING',
    createdAt: new Date(),
    retryCount: 0,
    lastAttemptAt: null,
  };

  it('persists notification intent with pending status', async () => {
    prisma.notificationIntent.create.mockResolvedValue(sample);

    const result = await repository.createIntent({
      channel: 'email',
      recipient: { email: 'user@example.com' },
      payload: { body: 'Hello' },
    });

    expect(prisma.notificationIntent.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        channel: 'email',
        status: 'PENDING',
        retryCount: 0,
        lastAttemptAt: null,
      }),
    });
    const createArgs = prisma.notificationIntent.create.mock.calls[0][0];
    expect(createArgs.data.recipient).toEqual(
      expect.objectContaining({ email: 'user@example.com' }),
    );
    expect(createArgs.data.payload).toEqual(
      expect.objectContaining({ body: 'Hello' }),
    );
    expect(result).toEqual({
      id: 'intent-123',
      channel: 'email',
      recipient: { email: 'user@example.com' },
      payload: { body: 'Hello' },
      status: 'PENDING',
      createdAt: sample.createdAt,
      retryCount: 0,
      lastAttemptAt: null,
    });
  });

  it('returns retryable failed intents respecting backoff', async () => {
    const now = new Date();
    const past = new Date(now.getTime() - MIN_RETRY_DELAY_MS - 1000);
    prisma.notificationIntent.findMany.mockResolvedValue([
      {
        ...sample,
        id: 'intent-retry',
        status: 'FAILED',
        retryCount: 1,
        lastAttemptAt: past,
      },
    ]);

    const result = await repository.findRetryableFailed(now, 10);

    expect(prisma.notificationIntent.findMany).toHaveBeenCalledWith({
      where: {
        status: 'FAILED',
        retryCount: { lt: MAX_RETRY_ATTEMPTS },
        OR: [
          { lastAttemptAt: null },
          {
            lastAttemptAt: {
              lt: new Date(now.getTime() - MIN_RETRY_DELAY_MS),
            },
          },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });
    expect(result[0].id).toBe('intent-retry');
  });

  it('marks intents as sent', async () => {
    prisma.notificationIntent.update.mockResolvedValue({
      ...sample,
      status: 'SENT',
      retryCount: 1,
      lastAttemptAt: new Date(),
    });

    const result = await repository.markSent('intent-1');

    expect(prisma.notificationIntent.update).toHaveBeenCalledWith({
      where: { id: 'intent-1' },
      data: {
        status: 'SENT',
        retryCount: { increment: 1 },
        lastAttemptAt: expect.any(Date),
      },
    });
    expect(result.status).toBe('SENT');
  });

  it('marks intents as failed', async () => {
    prisma.notificationIntent.update.mockResolvedValue({
      ...sample,
      status: 'FAILED',
      retryCount: 2,
      lastAttemptAt: new Date(),
    });

    const result = await repository.markFailed('intent-2');

    expect(prisma.notificationIntent.update).toHaveBeenCalledWith({
      where: { id: 'intent-2' },
      data: {
        status: 'FAILED',
        retryCount: { increment: 1 },
        lastAttemptAt: expect.any(Date),
      },
    });
    expect(result.retryCount).toBe(2);
  });

  it('records delivery metrics without affecting control flow', async () => {
    const now = new Date();
    prisma.notificationDeliveryMetric.create.mockResolvedValue({
      id: 'metric-1',
      intentId: 'intent-3',
      provider: 'NoopNotificationProvider',
      outcome: 'success',
      failureReason: null,
      createdAt: now,
    });

    const metric = await repository.recordMetric(
      'intent-3',
      'NoopNotificationProvider',
      'success',
    );

    expect(prisma.notificationDeliveryMetric.create).toHaveBeenCalledWith({
      data: {
        intentId: 'intent-3',
        provider: 'NoopNotificationProvider',
        outcome: 'success',
        failureReason: undefined,
      },
    });
    expect(metric).toEqual({
      id: 'metric-1',
      intentId: 'intent-3',
      provider: 'NoopNotificationProvider',
      outcome: 'success',
      failureReason: null,
      createdAt: now,
    });
  });
});
