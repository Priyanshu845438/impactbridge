import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CampaignCategory } from 'prisma/generated';

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  async createForNGO(userId: string, dto: CreateCampaignDto) {
    const profile = await this.prisma.nGOProfile.findUnique({ where: { userId } });

    if (!profile) {
      throw new Error('NGO profile not found');
    }

    return this.prisma.campaign.create({
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
}
