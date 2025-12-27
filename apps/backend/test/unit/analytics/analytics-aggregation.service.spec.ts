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
      },
      cSRProgramme: {
        groupBy: jest.fn(),
      },
      campaignApproval: {
        groupBy: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new AnalyticsAggregationService(prisma);
  });

  describe('getDonationTotals', () => {
    it('returns zero totals when no data', async () => {
      prisma.donation.aggregate
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } })
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } })
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } })
        .mockResolvedValueOnce({ _sum: { amount: null }, _count: { _all: 0 } });

      await expect(service.getDonationTotals()).resolves.toEqual({
        totalAmount: 0,
        totalCount: 0,
        today: { totalAmount: 0, totalCount: 0 },
        last7Days: { totalAmount: 0, totalCount: 0 },
        last30Days: { totalAmount: 0, totalCount: 0 },
      });

      expect(prisma.donation.aggregate).toHaveBeenCalledWith({
        where: { deletedAt: null },
        _sum: { amount: true },
        _count: { _all: true },
      });
    });

    it('applies filters for company, ngo, and dates', async () => {
      prisma.donation.aggregate.mockResolvedValue({
        _sum: { amount: 1500 },
        _count: { _all: 3 },
      });

      const from = new Date('2024-01-01');
      const to = new Date('2024-03-01');

      await service.getDonationTotals({
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

  describe('getProgrammeCounts', () => {
    it('returns counts grouped by status', async () => {
      prisma.cSRProgramme.groupBy.mockResolvedValue([
        { status: ProgrammeStatus.ACTIVE, _count: { _all: 2 } },
        { status: ProgrammeStatus.COMPLETED, _count: { _all: 1 } },
      ]);

      const result = await service.getProgrammeCounts({ companyId: 'comp-1' });

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
      });
    });

    it('includes archived programmes when flag is true', async () => {
      prisma.cSRProgramme.groupBy.mockResolvedValue([]);

      await service.getProgrammeCounts({ includeArchived: true });

      expect(prisma.cSRProgramme.groupBy).toHaveBeenCalledWith({
        where: {},
        by: ['status'],
        _count: { _all: true },
      });
    });
  });

  describe('getApprovalStatusBreakdown', () => {
    it('groups approvals by status', async () => {
      prisma.campaignApproval.groupBy.mockResolvedValue([
        { status: 'APPROVED', _count: { _all: 4 } },
        { status: 'PENDING', _count: { _all: 1 } },
      ]);

      const result = await service.getApprovalStatusBreakdown({
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
      });
    });
  });
});
