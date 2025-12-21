import { Test } from '@nestjs/testing';
import { Prisma } from 'prisma/generated';
import { NotificationRepository } from '../../../src/notifications/notification.repository';
import { PrismaService } from '../../../src/prisma/prisma.service';

class MockPrismaService {
  public notificationIntent = {
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
});
