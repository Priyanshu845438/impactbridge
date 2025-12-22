import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilizationReportDto } from './dto/utilization-report.dto';
import { sanitizeEntity, sanitizeEntities } from '../utils/sanitize.util';

@Injectable()
export class UtilizationService {
  constructor(private readonly prisma: PrismaService) {}

  async submitReport(
    campaignId: string,
    ngoUserId: string,
    dto: UtilizationReportDto,
  ) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { ngo: { select: { userId: true } } },
    });

    if (!campaign || campaign.ngo.userId !== ngoUserId) {
      throw new NotFoundException('Campaign not found for this NGO');
    }

    if (dto.milestoneId) {
      const milestone = await this.prisma.milestone.findUnique({
        where: { id: dto.milestoneId },
      });

      if (!milestone || milestone.campaignId !== campaignId) {
        throw new NotFoundException('Milestone not found for this campaign');
      }
    }

    const report = await this.prisma.utilizationReport.create({
      data: {
        campaignId,
        milestoneId: dto.milestoneId,
        amountUsed: dto.amountUsed,
        description: dto.description,
        proofUrl: dto.proofUrl,
      },
    });

    return sanitizeEntity(report)!;
  }

  async listReportsForCampaign(campaignId: string) {
    const reports = await this.prisma.utilizationReport.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'desc' },
    });

    return sanitizeEntities(reports);
  }

  async listReportsForMilestone(milestoneId: string) {
    const reports = await this.prisma.utilizationReport.findMany({
      where: { milestoneId },
      orderBy: { createdAt: 'desc' },
    });

    return sanitizeEntities(reports);
  }

  async adminAllReports() {
    const reports = await this.prisma.utilizationReport.findMany({
      include: {
        campaign: {
          include: {
            ngo: {
              include: {
                user: { select: { id: true, name: true, email: true } },
              },
            },
          },
        },
        milestone: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return sanitizeEntities(reports);
  }
}
