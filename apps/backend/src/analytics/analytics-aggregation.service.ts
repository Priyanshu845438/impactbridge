import { Injectable } from '@nestjs/common';
import { Prisma, ProgrammeStatus } from 'prisma/generated';
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

    return {
      totalAmount: aggregate._sum.amount ?? 0,
      totalCount: aggregate._count._all ?? 0,
    };
  }

  async getProgrammeCounts(filter: ProgrammeAggregationFilter = {}) {
    const where = this.buildProgrammeWhere(filter);

    const grouped = await this.prisma.cSRProgramme.groupBy({
      where,
      by: ['status'],
      _count: { _all: true },
    });

    const byStatus = Object.values(ProgrammeStatus).reduce<Record<string, number>>(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {},
    );

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

  private buildDonationWhere(filter: DonationAggregationFilter): Prisma.DonationWhereInput {
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

  private buildProgrammeWhere(filter: ProgrammeAggregationFilter): Prisma.CSRProgrammeWhereInput {
    const where: Prisma.CSRProgrammeWhereInput = {};

    if (filter.companyId) {
      where.companyId = filter.companyId;
    }

    if (!filter.includeArchived) {
      where.deletedAt = null;
    }

    return where;
  }
}
