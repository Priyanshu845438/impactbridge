import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CampaignCategory } from 'prisma/generated';
import { ActivityLogService } from '../activity/activity-log.service';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async createForNGO(userId: string, dto: CreateCampaignDto) {
    const profile = await this.prisma.nGOProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('NGO profile not found');
    }

    const campaign = await this.prisma.campaign.create({
      data: {
        ngoId: profile.id,
        title: dto.title,
        description: dto.description,
        category: dto.category ?? CampaignCategory.OTHER,
        goalAmount: dto.targetAmount,
        raisedAmount: 0,
        status: dto.isPublic ? 'PUBLIC' : 'DRAFT',
        startDate: new Date(),
      },
    });

    await this.activityLog.log(userId, 'CAMPAIGN_CREATED', {
      campaignId: campaign.id,
      title: dto.title,
    });

    return campaign;
  }

  async getPublicCampaigns() {
    return this.prisma.campaign.findMany({
      where: {
        status: 'PUBLIC',
      },
      include: {
        ngo: {
          select: {
            id: true,
            missionStatement: true,
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });
  }

  async getCampaignById(id: string) {
    return this.prisma.campaign.findFirst({
      where: {
        id,
        status: 'PUBLIC',
      },
      include: {
        ngo: {
          select: {
            id: true,
            missionStatement: true,
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        donations: true,
      },
    });
  }

  async getPublicLink(id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, status: 'PUBLIC' },
    });
    if (!campaign) return null;
    return {
      campaign,
      publicUrl: `/public/campaigns/${id}`,
    };
  }

  async getPublicCampaignForDonation(id: string) {
    return this.prisma.campaign.findFirst({
      where: { id, status: 'PUBLIC' },
      include: {
        ngo: {
          select: {
            id: true,
            missionStatement: true,
            user: { select: { name: true, email: true } },
          },
        },
      },
    });
  }
}
