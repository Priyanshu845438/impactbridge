import { AnalyticsAggregationService } from '../../../src/analytics/analytics-aggregation.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { ProgrammeStatus } from 'prisma/generated';

describe('AnalyticsAggregationService', () => {
  let service: AnalyticsAggregationService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    prisma = {
      donation: {
        aggregate: jest.fn(),
        findMany: jest.fn(),
      },
      cSRProgramme: {
        groupBy: jest.fn(),
      },
      campaignApproval: {
        groupBy: jest.fn(),
      },
      financialReport: {
        count: jest.fn(),
        groupBy: jest.fn(),
        findFirst: jest.fn(),
      },
      auditLog: {
        findMany: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new AnalyticsAggregationService(prisma);
  });

  describe('getDonationOverview', () => {
    it('returns zero totals when no data', async () => {
      prisma.donation.aggregate
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } })
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } })
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } })
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } });
      prisma.donation.findMany.mockResolvedValue([]);

      const result = await service.getDonationOverview();

      expect(result).toEqual({
        totalAmount: 0,
        totalCount: 0,
        today: { totalAmount: 0, totalCount: 0 },
        last7Days: { totalAmount: 0, totalCount: 0 },
        last30Days: { totalAmount: 0, totalCount: 0 },
        totals: [
          { label: 'Total', amount: 0 },
          { label: 'Last 7 days', amount: 0, delta: undefined },
          { label: 'Today', amount: 0 },
        ],
        timeline: [],
        summary: {
          totalAmount: 0,
          totalCount: 0,
          today: { count: 0, amount: 0 },
          last7Days: { count: 0, amount: 0 },
          last30Days: { count: 0, amount: 0 },
        },
      });

      expect(prisma.donation.aggregate).toHaveBeenCalledWith({
        where: { deletedAt: null },
        _sum: { amount: true },
        _count: { _all: true },
      });
      expect(prisma.donation.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        select: { donationDate: true, amount: true },
        orderBy: { donationDate: 'asc' },
      });
    });

    it('applies filters for company, ngo, and dates', async () => {
      prisma.donation.aggregate.mockResolvedValue({
        _sum: { amount: 1500 },
        _count: { _all: 3 },
      });

      const from = new Date('2024-01-01');
      const to = new Date('2024-03-01');

      prisma.donation.findMany.mockResolvedValue([
        { donationDate: new Date('2024-02-01T00:00:00Z'), amount: 1500 } as any,
      ]);

      await service.getDonationOverview({
        companyId: 'company-1',
        ngoId: 'ngo-1',
        from,
        to,
      });

      expect(prisma.donation.aggregate).toHaveBeenCalledWith({
        where: {
          deletedAt: null,
          companyId: 'company-1',
          campaign: {
            is: { ngoId: 'ngo-1' },
          },
          donationDate: { gte: from, lte: to },
        },
        _sum: { amount: true },
        _count: { _all: true },
      });
    });
  });

  describe('getProgrammeOverview', () => {
    it('returns counts grouped by status', async () => {
      prisma.cSRProgramme.groupBy.mockResolvedValue([
        { status: ProgrammeStatus.ACTIVE, _count: { _all: 2 } },
        { status: ProgrammeStatus.COMPLETED, _count: { _all: 1 } },
      ]);

      const result = await service.getProgrammeOverview({ companyId: 'comp-1' });

      expect(prisma.cSRProgramme.groupBy).toHaveBeenCalledWith({
        where: { companyId: 'comp-1', deletedAt: null },
        by: ['status'],
        _count: { _all: true },
      });

      expect(result).toEqual({
        totalProgrammes: 3,
        byStatus: {
          [ProgrammeStatus.DRAFT]: 0,
          [ProgrammeStatus.ACTIVE]: 2,
          [ProgrammeStatus.COMPLETED]: 1,
          [ProgrammeStatus.ARCHIVED]: 0,
        },
        counts: [
          { status: ProgrammeStatus.ACTIVE, count: 2 },
          { status: ProgrammeStatus.COMPLETED, count: 1 },
        ],
        summary: {
          totalProgrammes: 3,
          byStatus: {
            [ProgrammeStatus.DRAFT]: 0,
            [ProgrammeStatus.ACTIVE]: 2,
            [ProgrammeStatus.COMPLETED]: 1,
            [ProgrammeStatus.ARCHIVED]: 0,
          },
        },
      });
    });

    it('includes archived programmes when flag is true', async () => {
      prisma.cSRProgramme.groupBy.mockResolvedValue([]);

      await service.getProgrammeOverview({ includeArchived: true });

      expect(prisma.cSRProgramme.groupBy).toHaveBeenCalledWith({
        where: {},
        by: ['status'],
        _count: { _all: true },
      });
    });
  });

  describe('getApprovalOverview', () => {
    it('groups approvals by status', async () => {
      prisma.campaignApproval.groupBy.mockResolvedValue([
        { status: 'APPROVED', _count: { _all: 4 } },
        { status: 'PENDING', _count: { _all: 1 } },
      ]);

      const result = await service.getApprovalOverview({
        ngoId: 'ngo-1',
      });

      expect(prisma.campaignApproval.groupBy).toHaveBeenCalledWith({
        where: { companyId: undefined, ngoId: 'ngo-1' },
        by: ['status'],
        _count: { _all: true },
      });

      expect(result).toEqual({
        totalApprovals: 5,
        byStatus: { APPROVED: 4, PENDING: 1 },
        counts: [
          { status: 'APPROVED', count: 4 },
          { status: 'PENDING', count: 1 },
        ],
        summary: {
          totalApprovals: 5,
          byStatus: { APPROVED: 4, PENDING: 1 },
        },
      });
    });
  });

  describe('getFinancialReportOverview', () => {
    it('aggregates totals and latest submission date', async () => {
      const now = new Date('2025-02-18T10:00:00Z');

    prisma.financialReport.count.mockResolvedValue(42);
    prisma.financialReport.groupBy.mockResolvedValue([
      { ngoId: 'ngo-1', _count: { ngoId: 3 } },
      { ngoId: 'ngo-2', _count: { ngoId: 2 } },
    ] as any);
    prisma.financialReport.findFirst.mockResolvedValue({ createdAt: now } as any);

      const result = await service.getFinancialReportOverview();

      expect(result).toEqual({
        totalReports: 42,
        ngoCount: 2,
        latestSubmittedAt: now,
      });

      expect(prisma.financialReport.count).toHaveBeenCalledWith();
      expect(prisma.financialReport.groupBy).toHaveBeenCalledWith({
        by: ['ngoId'],
        _count: { ngoId: true },
      });
      expect(prisma.financialReport.findFirst).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      });
    });

    it('handles empty dataset gracefully', async () => {
    prisma.financialReport.count.mockResolvedValue(0);
    prisma.financialReport.groupBy.mockResolvedValue([] as any);
    prisma.financialReport.findFirst.mockResolvedValue(null);

      const result = await service.getFinancialReportOverview();

      expect(result).toEqual({
        totalReports: 0,
        ngoCount: 0,
        latestSubmittedAt: null,
      });
    });
  });
  describe('getRecentActivity', () => {
    it('maps audit logs into activity entries', async () => {
      prisma.auditLog.findMany.mockResolvedValue([
        {
          id: 'log-1',
          action: 'programme_created',
          createdAt: new Date('2025-02-18T10:00:00Z'),
          user: { name: 'Admin', email: 'admin@example.com' },
        },
        {
          id: 'log-2',
          action: 'donation_recorded',
          createdAt: new Date('2025-02-18T11:00:00Z'),
          user: null,
        },
      ] as any);

      const result = await service.getRecentActivity(5);

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          action: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      expect(result).toEqual([
        {
          id: 'log-1',
          actor: 'Admin',
          action: 'programme_created',
          timestamp: '2025-02-18T10:00:00.000Z',
        },
        {
          id: 'log-2',
          actor: 'System',
          action: 'donation_recorded',
          timestamp: '2025-02-18T11:00:00.000Z',
        },
      ]);
    });

    it('falls back to email when name missing', async () => {
      prisma.auditLog.findMany.mockResolvedValue([
        {
          id: 'log-1',
          action: 'programme_created',
          createdAt: new Date('2025-02-18T10:00:00Z'),
          user: { name: null, email: 'admin@example.com' },
        },
      ] as any);

      const [entry] = await service.getRecentActivity();
      expect(entry.actor).toBe('admin@example.com');
    });
  });
});
