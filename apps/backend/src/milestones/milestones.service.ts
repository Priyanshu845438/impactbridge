import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneStatusDto } from './dto/update-milestone-status.dto';

@Injectable()
export class MilestonesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(campaignId: string, ngoUserId: string, dto: CreateMilestoneDto) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const ngoProfile = await this.prisma.nGOProfile.findUnique({
      where: { userId: ngoUserId },
    });

    if (!ngoProfile || campaign.ngoId !== ngoProfile.id) {
      throw new ForbiddenException('Campaign does not belong to this NGO');
    }

    return this.prisma.milestone.create({
      data: {
        campaignId,
        title: dto.title,
        description: dto.description,
        targetDate: new Date(dto.targetDate),
        budget: dto.budget,
      },
    });
  }

  async updateStatus(
    milestoneId: string,
    ngoUserId: string,
    dto: UpdateMilestoneStatusDto,
  ) {
    const milestone = await this.prisma.milestone.findUnique({
      where: { id: milestoneId },
      include: { campaign: true },
    });

    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }

    const ngoProfile = await this.prisma.nGOProfile.findUnique({
      where: { userId: ngoUserId },
    });

    if (!ngoProfile || milestone.campaign.ngoId !== ngoProfile.id) {
      throw new ForbiddenException('Milestone does not belong to this NGO');
    }

    if (dto.progressPercent < 0 || dto.progressPercent > 100) {
      throw new ForbiddenException('Progress must be between 0 and 100');
    }

    return this.prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        status: dto.status,
        progressPercent: dto.progressPercent,
      },
    });
  }

  async listForCampaign(
    campaignId: string,
    requesterUserId: string,
    role: string,
  ) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { ngo: true },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (role === 'NGO') {
      const ngoProfile = await this.prisma.nGOProfile.findUnique({
        where: { userId: requesterUserId },
      });

      if (!ngoProfile || campaign.ngoId !== ngoProfile.id) {
        throw new ForbiddenException('Campaign does not belong to this NGO');
      }
    }

    if (role === 'COMPANY') {
      const approval = await this.prisma.campaignApproval.findFirst({
        where: {
          campaignId,
          company: { userId: requesterUserId },
          status: 'APPROVED',
        },
      });

      if (!approval) {
        throw new ForbiddenException(
          'Company not approved to view this campaign',
        );
      }
    }

    // SUPER_ADMIN bypasses checks

    return this.prisma.milestone.findMany({
      where: { campaignId },
      orderBy: { targetDate: 'asc' },
    });
  }
}
