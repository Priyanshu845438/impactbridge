import { Injectable } from '@nestjs/common';
import { Donation, Prisma, ProgrammeStatus } from 'prisma/generated';

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

export interface DonationTimelinePoint {
  date: string;
  amount: number;
}

export interface DonationOverview {
  totalAmount: number;
  totalCount: number;
  today: { totalAmount: number; totalCount: number };
  last7Days: { totalAmount: number; totalCount: number };
  last30Days: { totalAmount: number; totalCount: number };
  totals: Array<{ label: string; amount: number; delta?: number }>;
  timeline: DonationTimelinePoint[];
  summary: {
    totalAmount: number;
    totalCount: number;
    today: { count: number; amount: number };
    last7Days: { count: number; amount: number };
    last30Days: { count: number; amount: number };
  };
}

export interface ProgrammeOverview {
  totalProgrammes: number;
  byStatus: Record<string, number>;
  counts: Array<{ status: string; count: number }>;
  summary: {
    totalProgrammes: number;
    byStatus: Record<string, number>;
  };
}

export interface ApprovalOverview {
  totalApprovals: number;
  byStatus: Record<string, number>;
  counts: Array<{ status: string; count: number }>;
  summary: {
    totalApprovals: number;
    byStatus: Record<string, number>;
  };
}

export interface ActivityEntry {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
}

@Injectable()
export class AnalyticsAggregationService {
  constructor(private readonly prisma: PrismaService) {}

  async getDonationOverview(
    filter: DonationAggregationFilter = {},
  ): Promise<DonationOverview> {
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

    const timeline = await this.buildDonationTimeline(where);
    const totals = this.buildDonationTotals(today, last7Days, last30Days);

    const summary = {
      totalAmount: aggregate._sum.amount ?? 0,
      totalCount: aggregate._count._all ?? 0,
      today: {
        count: today._count._all ?? 0,
        amount: today._sum.amount ?? 0,
      },
      last7Days: {
        count: last7Days._count._all ?? 0,
        amount: last7Days._sum.amount ?? 0,
      },
      last30Days: {
        count: last30Days._count._all ?? 0,
        amount: last30Days._sum.amount ?? 0,
      },
    };

    return {
      totalAmount: summary.totalAmount,
      totalCount: summary.totalCount,
      today: {
        totalAmount: summary.today.amount,
        totalCount: summary.today.count,
      },
      last7Days: {
        totalAmount: summary.last7Days.amount,
        totalCount: summary.last7Days.count,
      },
      last30Days: {
        totalAmount: summary.last30Days.amount,
        totalCount: summary.last30Days.count,
      },
      totals,
      timeline,
      summary,
    };
  }

  async getProgrammeOverview(
    filter: ProgrammeAggregationFilter = {},
  ): Promise<ProgrammeOverview> {
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

    const counts = grouped.map((row) => ({
      status: row.status,
      count: row._count._all ?? 0,
    }));

    return {
      totalProgrammes: total,
      byStatus,
      counts,
      summary: {
        totalProgrammes: total,
        byStatus,
      },
    };
  }

  async getApprovalOverview(
    filter: ApprovalAggregationFilter = {},
  ): Promise<ApprovalOverview> {
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

    const counts = grouped.map((row) => ({
      status: row.status,
      count: row._count._all ?? 0,
    }));

    return {
      totalApprovals: total,
      byStatus,
      counts,
      summary: {
        totalApprovals: total,
        byStatus,
      },
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

  async getRecentActivity(limit = 10): Promise<ActivityEntry[]> {
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
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

    return logs.map((log) => ({
      id: log.id,
      actor: log.user?.name ?? log.user?.email ?? 'System',
      action: log.action,
      timestamp: log.createdAt.toISOString(),
    }));
  }

  private async buildDonationTimeline(
    where: Prisma.DonationWhereInput,
  ): Promise<DonationTimelinePoint[]> {
    const donations = await this.prisma.donation.findMany({
      where,
      select: { donationDate: true, amount: true },
      orderBy: { donationDate: 'asc' },
    });

    const grouped = new Map<string, number>();

    donations.forEach((donation: Pick<Donation, 'donationDate' | 'amount'>) => {
      const key = this.startOfDayISO(donation.donationDate);
      const existing = grouped.get(key) ?? 0;
      grouped.set(key, existing + donation.amount);
    });

    return Array.from(grouped.entries()).map(([date, amount]) => ({ date, amount }));
  }

  private buildDonationTotals(
    today: { _sum: { amount: number | null } | null },
    last7Days: { _sum: { amount: number | null } | null },
    last30Days: { _sum: { amount: number | null } | null },
  ): Array<{ label: string; amount: number; delta?: number }> {
    const todayAmount = today._sum?.amount ?? 0;
    const last7Amount = last7Days._sum?.amount ?? 0;
    const last30Amount = last30Days._sum?.amount ?? 0;

    const previousWeek = last30Amount - last7Amount;
    const delta = previousWeek > 0 ? (last7Amount - previousWeek) / previousWeek : undefined;

    return [
      { label: 'Total', amount: last30Amount },
      {
        label: 'Last 7 days',
        amount: last7Amount,
        delta: delta !== undefined ? Number(delta.toFixed(2)) : undefined,
      },
      { label: 'Today', amount: todayAmount },
    ];
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

  private startOfDayISO(date: Date): string {
    const d = this.startOfDay(date);
    return d.toISOString();
  }
}
