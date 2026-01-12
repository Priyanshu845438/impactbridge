import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ApprovalsService } from '../../../src/approvals/approvals.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('ApprovalsService transactions', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: ApprovalsService;
  const activityLog = { logWithClient: jest.fn(), log: jest.fn() } as any;
  const notifications = { enqueue: jest.fn() } as any;

  const baseApproval = {
    id: 'approval-1',
    campaignId: 'campaign-1',
    companyId: 'company-1',
    ngoId: 'ngo-1',
    status: 'PENDING' as const,
    remarks: null as string | null,
    campaign: {
      id: 'campaign-1',
      ngoId: 'ngo-1',
      title: 'Campaign',
    },
    company: {
      id: 'company-1',
      userId: 'company-user',
      deletedAt: null,
      user: { id: 'company-user', name: 'Company', email: 'company@example.com' },
    },
    ngo: {
      id: 'ngo-1',
      userId: 'ngo-user',
      user: { id: 'ngo-user', name: 'NGO', email: 'ngo@example.com' },
    },
  };

  beforeEach(() => {
    const tx: any = {
      campaignApproval: {
        create: jest.fn(),
        update: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    prisma = {
      $transaction: jest.fn().mockImplementation(async (cb) => cb(tx)),
      campaign: { findUnique: jest.fn() },
      companyProfile: { findUnique: jest.fn() },
      campaignApproval: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    prisma.campaign.findUnique.mockResolvedValue({
      id: 'campaign-1',
      ngoId: 'ngo-1',
    } as any);
    prisma.companyProfile.findUnique.mockResolvedValue({
      id: 'company-1',
      deletedAt: null,
    } as any);

    tx.campaignApproval.create.mockResolvedValue({ ...baseApproval } as any);
    tx.campaignApproval.findUnique.mockResolvedValue({ ...baseApproval } as any);
    tx.campaignApproval.update.mockResolvedValue({ ...baseApproval } as any);

    notifications.enqueue.mockResolvedValue({ id: 'intent-1' } as any);

    service = new ApprovalsService(prisma, activityLog, notifications);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('wraps requestApproval side effects in $transaction', async () => {
    await service.requestApproval('campaign-1', 'ngo-1', 'company-1', 'ngo-user');

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(notifications.enqueue).toHaveBeenCalled();
    expect(activityLog.logWithClient).toHaveBeenCalled();
  });

  it('does not attempt to enqueue when transaction fails', async () => {
    prisma.$transaction.mockImplementationOnce(async () => {
      throw new Error('DB failure');
    });

    await expect(
      service.requestApproval('campaign-1', 'ngo-1', 'company-1', 'ngo-user'),
    ).rejects.toThrowError('DB failure');

    expect(notifications.enqueue).not.toHaveBeenCalled();
    expect(activityLog.logWithClient).not.toHaveBeenCalled();
  });

  it('throws if approval lookup inside transaction fails', async () => {
    const tx = {
      campaignApproval: {
        create: jest.fn().mockResolvedValue({ ...baseApproval } as any),
        findUnique: jest.fn().mockResolvedValue(null),
        update: jest.fn(),
      },
    };

    prisma.$transaction.mockImplementationOnce(async (cb) => cb(tx as any));

    await expect(
      service.requestApproval('campaign-1', 'ngo-1', 'company-1', 'ngo-user'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
