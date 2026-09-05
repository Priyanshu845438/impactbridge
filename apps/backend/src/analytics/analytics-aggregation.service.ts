import { Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';
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
  ngoId?: string;
  includeArchived?: boolean;
}

export interface ApprovalAggregationFilter {
  companyId?: string;
  ngoId?: string;
}

export interface FinancialReportAggregationFilter {
  companyId?: string;
  ngoId?: string;
}

export interface FinancialReportOverview {
  totalReports: number;
  ngoCount: number;
  latestSubmittedAt: Date | null;
  kpis: {
    averageReportsPerNgo: number;
    reportsThisMonth: number;
    reportsPreviousMonth: number;
    monthOverMonthGrowth: number | null;
  };
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
  kpis: {
    averageAmount: number;
    largestDonation: { amount: number; donationDate: Date | null } | null;
    uniqueDonors: number;
    uniqueCompanies: number;
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
  kpis: {
    activeCount: number;
    completedCount: number;
    completionRate: number;
    archivedCount: number;
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
  kpis: {
    approvedCount: number;
    pendingCount: number;
    approvalRate: number;
    rejectionCount: number;
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
  private readonly cache = new NodeCache({
    stdTTL: 120,
    useClones: false,
    checkperiod: 60,
  });

  constructor(private readonly prisma: PrismaService) {}

  async getDonationOverview(
    filter: DonationAggregationFilter = {},
  ): Promise<DonationOverview> {
    const cacheKey = this.buildCacheKey('donations', filter);
    const cached = this.cache.get<DonationOverview>(cacheKey);
    if (cached) {
      return cached;
    }

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

    const [largestDonation] = await this.prisma.donation.findMany({
      where,
      orderBy: { amount: 'desc' },
      select: { amount: true, donationDate: true },
      take: 1,
    });

    const [donorGroups, companyGroups] = await Promise.all([
      this.prisma.donation.groupBy({
        where: { ...where, donorId: { not: null } },
        by: ['donorId'],
        _count: { _all: true },
      }),
      this.prisma.donation.groupBy({
        where: { ...where, companyId: { not: null } },
        by: ['companyId'],
        _count: { _all: true },
      }),
    ]);

    const uniqueDonors = donorGroups.length;
    const uniqueCompanies = companyGroups.length;

    const averageAmount = summary.totalCount
      ? Number((summary.totalAmount / summary.totalCount).toFixed(2))
      : 0;

    const overview: DonationOverview = {
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
      kpis: {
        averageAmount,
        largestDonation: largestDonation
          ? {
              amount: largestDonation.amount,
              donationDate: largestDonation.donationDate ?? null,
            }
          : null,
        uniqueDonors,
        uniqueCompanies,
      },
    };

    this.cache.set(cacheKey, overview);
    return overview;
  }

  async getProgrammeOverview(
    filter: ProgrammeAggregationFilter = {},
  ): Promise<ProgrammeOverview> {
    const cacheKey = this.buildCacheKey('programmes', filter);
    const cached = this.cache.get<ProgrammeOverview>(cacheKey);
    if (cached) {
      return cached;
    }

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

    const activeCount = byStatus[ProgrammeStatus.ACTIVE] ?? 0;
    const completedCount = byStatus[ProgrammeStatus.COMPLETED] ?? 0;
    const archivedCount = byStatus[ProgrammeStatus.ARCHIVED] ?? 0;
    const completionRate = total
      ? Number((completedCount / total).toFixed(2))
      : 0;

    const overview: ProgrammeOverview = {
      totalProgrammes: total,
      byStatus,
      counts,
      summary: {
        totalProgrammes: total,
        byStatus,
      },
      kpis: {
        activeCount,
        completedCount,
        completionRate,
        archivedCount,
      },
    };

    this.cache.set(cacheKey, overview);
    return overview;
  }

  async getApprovalOverview(
    filter: ApprovalAggregationFilter = {},
  ): Promise<ApprovalOverview> {
    const cacheKey = this.buildCacheKey('approvals', filter);
    const cached = this.cache.get<ApprovalOverview>(cacheKey);
    if (cached) {
      return cached;
    }

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

    const approvedCount = byStatus.APPROVED ?? 0;
    const pendingCount = byStatus.PENDING ?? 0;
    const rejectionCount = byStatus.REJECTED ?? 0;
    const approvalRate = total ? Number((approvedCount / total).toFixed(2)) : 0;

    const overview: ApprovalOverview = {
      totalApprovals: total,
      byStatus,
      counts,
      summary: {
        totalApprovals: total,
        byStatus,
      },
      kpis: {
        approvedCount,
        pendingCount,
        approvalRate,
        rejectionCount,
      },
    };

    this.cache.set(cacheKey, overview);
    return overview;
  }

  async getFinancialReportOverview(
    filter: FinancialReportAggregationFilter = {},
  ): Promise<FinancialReportOverview> {
    const cacheKey = this.buildCacheKey('financial', filter);
    const cached = this.cache.get<FinancialReportOverview>(cacheKey);
    if (cached) {
      return cached;
    }

    let scopedNgoIds: string[] | undefined;

    if (filter.ngoId) {
      scopedNgoIds = [filter.ngoId];
    } else if (filter.companyId) {
      scopedNgoIds = await this.resolveCompanyNgoIds(filter.companyId);

      if (scopedNgoIds.length === 0) {
        const empty = this.buildEmptyFinancialOverview();
        this.cache.set(cacheKey, empty);
        return empty;
      }
    }

    const baseWhere: Prisma.FinancialReportWhereInput = scopedNgoIds
      ? { ngoId: { in: scopedNgoIds } }
      : {};

    const [totalReports, groupedByNgo, latest] = await Promise.all([
      this.prisma.financialReport.count({ where: baseWhere }),
      this.prisma.financialReport.groupBy({
        where: baseWhere,
        by: ['ngoId'],
        _count: { ngoId: true },
      }),
      this.prisma.financialReport.findFirst({
        where: baseWhere,
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      }),
    ]);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );
    const endOfPreviousMonth = new Date(startOfMonth.getTime() - 1);

    const [reportsThisMonth, reportsPreviousMonth] = await Promise.all([
      this.prisma.financialReport.count({
        where: {
          ...baseWhere,
          createdAt: {
            gte: startOfMonth,
            lte: now,
          },
        },
      }),
      this.prisma.financialReport.count({
        where: {
          ...baseWhere,
          createdAt: {
            gte: startOfPreviousMonth,
            lte: endOfPreviousMonth,
          },
        },
      }),
    ]);

    const averageReportsPerNgo = groupedByNgo.length
      ? Number((totalReports / groupedByNgo.length).toFixed(2))
      : 0;

    const monthOverMonthGrowth = reportsPreviousMonth
      ? Number(
          (
            (reportsThisMonth - reportsPreviousMonth) /
            reportsPreviousMonth
          ).toFixed(2),
        )
      : null;

    const overview: FinancialReportOverview = {
      totalReports,
      ngoCount: groupedByNgo.length,
      latestSubmittedAt: latest?.createdAt ?? null,
      kpis: {
        averageReportsPerNgo,
        reportsThisMonth,
        reportsPreviousMonth,
        monthOverMonthGrowth,
      },
    };

    this.cache.set(cacheKey, overview);
    return overview;
  }

  private buildEmptyFinancialOverview(): FinancialReportOverview {
    return {
      totalReports: 0,
      ngoCount: 0,
      latestSubmittedAt: null,
      kpis: {
        averageReportsPerNgo: 0,
        reportsThisMonth: 0,
        reportsPreviousMonth: 0,
        monthOverMonthGrowth: null,
      },
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

    return Array.from(grouped.entries()).map(([date, amount]) => ({
      date,
      amount,
    }));
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
    const delta =
      previousWeek > 0
        ? (last7Amount - previousWeek) / previousWeek
        : undefined;

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

    if (filter.ngoId) {
      where.assignments = {
        some: {
          ngoId: filter.ngoId,
        },
      };
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

  private buildCacheKey(
    prefix: string,
    filter:
      | DonationAggregationFilter
      | ProgrammeAggregationFilter
      | ApprovalAggregationFilter
      | FinancialReportAggregationFilter,
  ): string {
    return `${prefix}:${JSON.stringify(filter ?? {})}`;
  }

  private async resolveCompanyNgoIds(companyId: string): Promise<string[]> {
    const [approvalGroups, donations] = await Promise.all([
      this.prisma.campaignApproval.groupBy({
        where: { companyId },
        by: ['ngoId'],
        _count: { _all: true },
      }),
      this.prisma.donation.findMany({
        where: { companyId },
        select: {
          campaign: {
            select: { ngoId: true },
          },
        },
      }),
    ]);

    const ngoIds = new Set<string>();

    approvalGroups.forEach((group) => {
      if (group.ngoId) {
        ngoIds.add(group.ngoId);
      }
    });

    donations.forEach((donation) => {
      const ngoId = donation.campaign?.ngoId;
      if (ngoId) {
        ngoIds.add(ngoId);
      }
    });

    return Array.from(ngoIds);
  }
}
