import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CSRBudgetDto } from './dto/csr-budget.dto';
import { CSRSummaryRequestDto } from './dto/csr-summary.dto';

@Injectable()
export class CSRService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertCSRBudget(companyProfileId: string, dto: CSRBudgetDto) {
    await this.ensureCompanyProfile(companyProfileId);

    return this.prisma.companyProfile.update({
      where: { id: companyProfileId },
      data: {
        csrAnnualBudget: dto.annualBudget,
        ...(dto.allocated !== undefined ? { csrAllocated: dto.allocated } : {}),
        ...(dto.spent !== undefined ? { csrSpent: dto.spent } : {}),
      },
    });
  }

  async updateSpent(companyProfileId: string, amount: number) {
    const profile = await this.ensureCompanyProfile(companyProfileId);

    const nextSpent = (profile.csrSpent ?? 0) + amount;

    return this.prisma.companyProfile.update({
      where: { id: companyProfileId },
      data: {
        csrSpent: nextSpent,
      },
    });
  }

  async getCSRStatus(companyProfileId: string) {
    const profile = await this.ensureCompanyProfile(companyProfileId);

    const annualBudget = profile.csrAnnualBudget ?? 0;
    const allocated = profile.csrAllocated ?? 0;
    const spent = profile.csrSpent ?? 0;

    return {
      annualBudget,
      allocated,
      spent,
      remaining: annualBudget - spent,
    };
  }

  async getCompanyProfileForUser(userId: string) {
    const profile = await this.prisma.companyProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Company profile not found');
    }

    return profile;
  }

  async generateSummary({ companyId, financialYear }: CSRSummaryRequestDto) {
    const company = await this.prisma.companyProfile.findUnique({
      where: { id: companyId },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!company) {
      throw new NotFoundException('Company profile not found');
    }

    const campaigns = await this.prisma.campaign.findMany({
      where: {
        approvals: {
          some: { companyId, status: 'APPROVED' },
        },
      },
      include: {
        impactMetrics: true,
        utilizationReports: true,
      },
    });

    const donations = await this.prisma.donation.findMany({
      where: {
        company: { id: companyId },
        campaignId: { in: campaigns.map((campaign) => campaign.id) },
      },
    });

    const csrObligation = company.csrAnnualBudget ?? 0;
    const totalDisbursed = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0,
    );
    const amountUtilized = campaigns
      .map((campaign) =>
        campaign.utilizationReports.reduce(
          (sum, report) => sum + report.amountUsed,
          0,
        ),
      )
      .reduce((sum, value) => sum + value, 0);
    const unspentAmount = csrObligation - amountUtilized;

    const projectList = campaigns.map((campaign) => ({
      campaignId: campaign.id,
      title: campaign.title,
      goalAmount: campaign.goalAmount,
      amountRaised: campaign.raisedAmount,
      amountDisbursed: donations
        .filter((donation) => donation.campaignId === campaign.id)
        .reduce((sum, donation) => sum + donation.amount, 0),
      amountUtilized: campaign.utilizationReports.reduce(
        (sum, report) => sum + report.amountUsed,
        0,
      ),
      impactSummary: campaign.impactMetrics.map((metric) => ({
        id: metric.id,
        name: metric.name,
        value: metric.value,
        unit: metric.unit,
      })),
      utilizationReports: campaign.utilizationReports.map((report) => ({
        id: report.id,
        amountUsed: report.amountUsed,
        description: report.description,
        proofUrl: report.proofUrl,
        milestoneId: report.milestoneId,
      })),
    }));

    const beneficiaries = campaigns.reduce((sum, campaign) => {
      return (
        sum +
        campaign.impactMetrics
          .filter((metric) => metric.unit.toLowerCase() === 'people')
          .reduce((inner, metric) => inner + metric.value, 0)
      );
    }, 0);

    const impactMetricsSummary = campaigns.reduce(
      (summary, campaign) => {
        campaign.impactMetrics.forEach((metric) => {
          const key = metric.unit.toLowerCase();
          summary[key] = (summary[key] ?? 0) + metric.value;
        });
        return summary;
      },
      {} as Record<string, number>,
    );

    return {
      company: {
        id: companyId,
        name: company.user?.name,
        email: company.user?.email,
        financialYear,
      },
      summary: {
        csrObligation,
        totalDisbursed,
        amountUtilized,
        unspentAmount,
        totalApprovedProjects: campaigns.length,
      },
      projectList,
      beneficiaries,
      impactMetricsSummary,
      adminNotes:
        'Auto-generated CSR summary. Review utilization reports for proof links.',
    };
  }

  private async ensureCompanyProfile(companyProfileId: string) {
    const profile = await this.prisma.companyProfile.findUnique({
      where: { id: companyProfileId },
      select: {
        id: true,
        csrAnnualBudget: true,
        csrAllocated: true,
        csrSpent: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Company profile not found');
    }

    return profile;
  }
}
