import { ApprovalsService } from '../../src/approvals/approvals.service';
import { PrismaService } from '../../src/prisma/prisma.service';

type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVOKED';

interface ApprovalRecord {
  id: string;
  campaignId: string;
  companyId: string;
  ngoId: string;
  status: ApprovalStatus;
  remarks: string | null;
  campaign: { id: string; ngoId: string; title: string };
  company: {
    id: string;
    userId: string;
    deletedAt: Date | null;
    user: { id: string; name: string; email: string };
  };
  ngo: {
    id: string;
    userId: string;
    user: { id: string; name: string; email: string };
  };
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const buildApproval = (override: Partial<ApprovalRecord> = {}): ApprovalRecord => {
  const base: ApprovalRecord = {
    id: 'approval-1',
    campaignId: 'campaign-1',
    companyId: 'company-1',
    ngoId: 'ngo-1',
    status: 'PENDING',
    remarks: null,
    campaign: { id: 'campaign-1', ngoId: 'ngo-1', title: 'Clean Water' },
    company: {
      id: 'company-1',
      userId: 'company-user',
      deletedAt: null,
      user: { id: 'company-user', name: 'Company User', email: 'company@example.com' },
    },
    ngo: {
      id: 'ngo-1',
      userId: 'ngo-user',
      user: { id: 'ngo-user', name: 'NGO User', email: 'ngo@example.com' },
    },
  };

  return { ...base, ...override };
};

const mapKey = (campaignId: string, companyId: string) => `${campaignId}:${companyId}`;

describe('ApprovalsService resilience to notification failures', () => {
  let service: ApprovalsService;
  let store: Map<string, ApprovalRecord>;
  let prisma: jest.Mocked<PrismaService>;
  const activityLog = { log: jest.fn() } as any;
  const notifications = { enqueue: jest.fn() } as any;

  beforeEach(() => {
    store = new Map<string, ApprovalRecord>();

    prisma = {
      campaignApproval: {
        findUnique: jest.fn(async ({ where }) => {
          const key = mapKey(
            where.campaignId_companyId.campaignId,
            where.campaignId_companyId.companyId,
          );
          const record = store.get(key);
          return record ? clone(record) : null;
        }),
        update: jest.fn(async ({ where, data }) => {
          const key = mapKey(
            where.campaignId_companyId.campaignId,
            where.campaignId_companyId.companyId,
          );
          const record = store.get(key);
          if (!record) {
            throw new Error('Approval not found in store');
          }

          const next: ApprovalRecord = {
            ...record,
            status: (data.status ?? record.status) as ApprovalStatus,
            remarks:
              data.remarks !== undefined ? (data.remarks as string | null) : record.remarks,
          };

          store.set(key, next);
          return clone(next);
        }),
        findMany: jest.fn(),
      },
      campaign: { findUnique: jest.fn() },
      companyProfile: { findUnique: jest.fn() },
    } as unknown as jest.Mocked<PrismaService>;

    service = new ApprovalsService(prisma, activityLog, notifications);
    activityLog.log.mockReset();
    notifications.enqueue.mockReset().mockImplementation(async () => {
      throw new Error('Notification failure');
    });
  });

  const seedApproval = (record: ApprovalRecord) => {
    store.set(mapKey(record.campaignId, record.companyId), clone(record));
  };

  it('persists APPROVED status even when notification enqueue fails', async () => {
    seedApproval(buildApproval());

    await expect(
      service.approve(
        'campaign-1',
        'company-1',
        { status: 'APPROVED', remarks: 'Looks good' },
        'company-user',
      ),
    ).rejects.toThrow('Notification failure');

    const stored = store.get(mapKey('campaign-1', 'company-1'))!;
    expect(stored.status).toBe('APPROVED');
    expect(stored.remarks).toBe('Looks good');

    expect(activityLog.log).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'NGO_APPROVAL_APPROVED',
        actorId: 'company-user',
      }),
    );

    expect(prisma.campaignApproval.update).toHaveBeenCalledTimes(1);
  });

  it('persists REJECTED status when notification enqueue fails', async () => {
    seedApproval(buildApproval());

    await expect(
      service.reject(
        'campaign-1',
        'company-1',
        { status: 'REJECTED', remarks: 'Missing documents' },
        'company-user',
      ),
    ).rejects.toThrow('Notification failure');

    const stored = store.get(mapKey('campaign-1', 'company-1'))!;
    expect(stored.status).toBe('REJECTED');
    expect(stored.remarks).toBe('Missing documents');

    expect(activityLog.log).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'NGO_APPROVAL_REJECTED',
        actorId: 'company-user',
        metadata: expect.objectContaining({ comment: 'Missing documents' }),
      }),
    );

    expect(prisma.campaignApproval.update).toHaveBeenCalledTimes(1);
  });

  it('persists REVOKED status when notification enqueue fails', async () => {
    seedApproval(buildApproval({ status: 'APPROVED', remarks: 'Looks good' }));

    await expect(
      service.revoke('campaign-1', 'company-1', 'company-user', 'Policy breach'),
    ).rejects.toThrow('Notification failure');

    const stored = store.get(mapKey('campaign-1', 'company-1'))!;
    expect(stored.status).toBe('REVOKED');
    expect(stored.remarks).toBe('Policy breach');

    expect(activityLog.log).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'NGO_APPROVAL_REVOKED',
        actorId: 'company-user',
        metadata: expect.objectContaining({ comment: 'Policy breach' }),
      }),
    );

    expect(prisma.campaignApproval.update).toHaveBeenCalledTimes(1);
  });
});
