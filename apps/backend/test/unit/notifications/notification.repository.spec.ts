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
    });

    const result = await repository.createIntent({
      channel: 'email',
      recipient: { email: 'user@example.com' },
      payload: { body: 'Hello' },
    });

    expect(prisma.notificationIntent.create).toHaveBeenCalledWith({
      data: {
        channel: 'email',
        recipient: expect.anything(),
        payload: expect.anything(),
        status: 'PENDING',
      },
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
      },
    ]);
  });

  it('marks intents as sent', async () => {
    prisma.notificationIntent.update.mockResolvedValue(undefined);

    await repository.markSent('intent-1');

    expect(prisma.notificationIntent.update).toHaveBeenCalledWith({
      where: { id: 'intent-1' },
      data: { status: 'SENT' },
    });
  });

  it('marks intents as failed', async () => {
    prisma.notificationIntent.update.mockResolvedValue(undefined);

    await repository.markFailed('intent-2');

    expect(prisma.notificationIntent.update).toHaveBeenCalledWith({
      where: { id: 'intent-2' },
      data: { status: 'FAILED' },
    });
  });
});
