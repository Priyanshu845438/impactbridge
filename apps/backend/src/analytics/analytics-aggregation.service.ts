import { Injectable } from '@nestjs/common';
import { Prisma, ProgrammeStatus } from 'prisma/generated';

type DonationDateFilter = Prisma.DateTimeFilter<'Donation'>;
import { PrismaService } from '../prisma/prisma.service';

export interface DonationAggregationFilter {
  companyId?: string;
  ngoId?: string;
  from?: Date;
  to?: Date;
}

export interface ProgrammeAggregationFilter {
  companyId?: string;
  includeArchived?: boolean;
}

export interface ApprovalAggregationFilter {
  companyId?: string;
  ngoId?: string;
}

export interface FinancialReportOverview {
  totalReports: number;
  ngoCount: number;
  latestSubmittedAt: Date | null;
}

@Injectable()
export class AnalyticsAggregationService {
  constructor(private readonly prisma: PrismaService) {}

  async getDonationTotals(filter: DonationAggregationFilter = {}) {
    const where = this.buildDonationWhere(filter);

    const aggregate = await this.prisma.donation.aggregate({
      where,
      _sum: { amount: true },
      _count: { _all: true },
    });

    const baseDateFilter = this.normalizeDonationDateFilter(where.donationDate);
    const todayRange: DonationDateFilter = { gte: this.startOfDay(new Date()) };
    const last7Range: DonationDateFilter = { gte: this.daysAgo(7) };
    const last30Range: DonationDateFilter = { gte: this.daysAgo(30) };

    const today = await this.prisma.donation.aggregate({
      where: {
        ...where,
        donationDate: this.mergeDonationDateFilters(baseDateFilter, todayRange),
      },
      _sum: { amount: true },
      _count: { _all: true },
    });

    const last7Days = await this.prisma.donation.aggregate({
      where: {
        ...where,
        donationDate: this.mergeDonationDateFilters(baseDateFilter, last7Range),
      },
      _sum: { amount: true },
      _count: { _all: true },
    });

    const last30Days = await this.prisma.donation.aggregate({
      where: {
        ...where,
        donationDate: this.mergeDonationDateFilters(
          baseDateFilter,
          last30Range,
        ),
      },
      _sum: { amount: true },
      _count: { _all: true },
    });

    return {
      totalAmount: aggregate._sum.amount ?? 0,
      totalCount: aggregate._count._all ?? 0,
      today: {
        totalAmount: today._sum.amount ?? 0,
        totalCount: today._count._all ?? 0,
      },
      last7Days: {
        totalAmount: last7Days._sum.amount ?? 0,
        totalCount: last7Days._count._all ?? 0,
      },
      last30Days: {
        totalAmount: last30Days._sum.amount ?? 0,
        totalCount: last30Days._count._all ?? 0,
      },
    };
  }

  async getProgrammeCounts(filter: ProgrammeAggregationFilter = {}) {
    const where = this.buildProgrammeWhere(filter);

    const grouped = await this.prisma.cSRProgramme.groupBy({
      where,
      by: ['status'],
      _count: { _all: true },
    });

    const byStatus = Object.values(ProgrammeStatus).reduce<
      Record<string, number>
    >((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    let total = 0;
    for (const row of grouped) {
      const count = row._count._all ?? 0;
      byStatus[row.status] = count;
      total += count;
    }

    return {
      totalProgrammes: total,
      byStatus,
    };
  }

  async getApprovalStatusBreakdown(filter: ApprovalAggregationFilter = {}) {
    const where: Prisma.CampaignApprovalWhereInput = {
      companyId: filter.companyId,
      ngoId: filter.ngoId,
    };

    const grouped = await this.prisma.campaignApproval.groupBy({
      where,
      by: ['status'],
      _count: { _all: true },
    });

    const byStatus: Record<string, number> = {};
    let total = 0;

    for (const row of grouped) {
      const count = row._count._all ?? 0;
      byStatus[row.status] = count;
      total += count;
    }

    return {
      totalApprovals: total,
      byStatus,
    };
  }

  async getFinancialReportOverview(): Promise<FinancialReportOverview> {
    const [totalReports, groupedByNgo, latest] = await Promise.all([
      this.prisma.financialReport.count(),
      this.prisma.financialReport.groupBy({
        by: ['ngoId'],
        _count: { ngoId: true },
      }),
      this.prisma.financialReport.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      }),
    ]);

    return {
      totalReports,
      ngoCount: groupedByNgo.length,
      latestSubmittedAt: latest?.createdAt ?? null,
    };
  }

  private buildDonationWhere(
    filter: DonationAggregationFilter,
  ): Prisma.DonationWhereInput {
    const where: Prisma.DonationWhereInput = {
      deletedAt: null,
    };

    if (filter.companyId) {
      where.companyId = filter.companyId;
    }

    if (filter.ngoId) {
      where.campaign = {
        is: {
          ngoId: filter.ngoId,
        },
      };
    }

    if (filter.from || filter.to) {
      where.donationDate = {
        ...(filter.from ? { gte: filter.from } : {}),
        ...(filter.to ? { lte: filter.to } : {}),
      };
    }

    return where;
  }

  private buildProgrammeWhere(
    filter: ProgrammeAggregationFilter,
  ): Prisma.CSRProgrammeWhereInput {
    const where: Prisma.CSRProgrammeWhereInput = {};

    if (filter.companyId) {
      where.companyId = filter.companyId;
    }

    if (!filter.includeArchived) {
      where.deletedAt = null;
    }

    return where;
  }

  private startOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private daysAgo(days: number): Date {
    const d = this.startOfDay(new Date());
    d.setDate(d.getDate() - days);
    return d;
  }

  private normalizeDonationDateFilter(
    base: Prisma.DonationWhereInput['donationDate'],
  ): DonationDateFilter | undefined {
    if (!base) {
      return undefined;
    }

    if (base instanceof Date || typeof base === 'string') {
      return { equals: base };
    }

    return base as DonationDateFilter;
  }

  private mergeDonationDateFilters(
    base: DonationDateFilter | undefined,
    extra: DonationDateFilter,
  ): DonationDateFilter {
    return {
      ...(base ?? {}),
      ...extra,
    };
  }
}
