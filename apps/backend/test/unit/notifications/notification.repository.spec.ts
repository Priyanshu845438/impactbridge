import { Test } from '@nestjs/testing';
import { Prisma } from 'prisma/generated';
import { NotificationRepository } from '../../../src/notifications/notification.repository';
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

  it('persists notification intent with pending status', async () => {
    const now = new Date();
    prisma.notificationIntent.create.mockResolvedValue({
      id: 'intent-123',
      channel: 'email',
      recipient: { email: 'user@example.com' },
      payload: { body: 'Hello' },
      status: 'PENDING',
      createdAt: now,
      retryCount: 0,
      lastAttemptAt: null,
    });

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
      createdAt: now,
      retryCount: 0,
      lastAttemptAt: null,
    });
  });

  it('returns pending intents ordered by createdAt', async () => {
    const now = new Date();
    prisma.notificationIntent.findMany.mockResolvedValue([
      {
        id: 'intent-b',
        channel: 'email',
        recipient: { email: 'b@example.com' },
        payload: { body: 'B' },
        status: 'PENDING',
        createdAt: now,
        retryCount: 1,
        lastAttemptAt: now,
      },
    ]);

    const result = await repository.findPending(5);

    expect(prisma.notificationIntent.findMany).toHaveBeenCalledWith({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: 5,
    });
    expect(result).toEqual([
      {
        id: 'intent-b',
        channel: 'email',
        recipient: { email: 'b@example.com' },
        payload: { body: 'B' },
        status: 'PENDING',
        createdAt: now,
        retryCount: 1,
        lastAttemptAt: now,
      },
    ]);
  });

  it('marks intents as sent', async () => {
    prisma.notificationIntent.update.mockResolvedValue(undefined);

    await repository.markSent('intent-1');

    expect(prisma.notificationIntent.update).toHaveBeenCalledWith({
      where: { id: 'intent-1' },
      data: {
        status: 'SENT',
        retryCount: { increment: 1 },
        lastAttemptAt: expect.any(Date),
      },
    });
  });

  it('marks intents as failed', async () => {
    prisma.notificationIntent.update.mockResolvedValue(undefined);

    await repository.markFailed('intent-2');

    expect(prisma.notificationIntent.update).toHaveBeenCalledWith({
      where: { id: 'intent-2' },
      data: {
        status: 'FAILED',
        retryCount: { increment: 1 },
        lastAttemptAt: expect.any(Date),
      },
    });
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
