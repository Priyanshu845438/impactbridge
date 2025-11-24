import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImpactMetricDto } from './dto/create-impact-metric.dto';

@Injectable()
export class ImpactService {
  constructor(private readonly prisma: PrismaService) {}

  async addMetric(
    campaignId: string,
    ngoUserId: string,
    dto: CreateImpactMetricDto,
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

    return this.prisma.impactMetric.create({
      data: {
        campaignId,
        milestoneId: dto.milestoneId,
        name: dto.name,
        value: dto.value,
        unit: dto.unit,
      },
    });
  }

  getMetricsForCampaign(campaignId: string) {
    return this.prisma.impactMetric.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'desc' },
    });
  }

  getMetricsForMilestone(milestoneId: string) {
    return this.prisma.impactMetric.findMany({
      where: { milestoneId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
