import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApproveProjectDto } from './dto/approve-project.dto';

@Injectable()
export class ApprovalsService {
  constructor(private readonly prisma: PrismaService) {}

  async requestApproval(
    campaignId: string,
    ngoProfileId: string,
    companyProfileId: string,
  ) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (campaign.ngoId !== ngoProfileId) {
      throw new ForbiddenException('Campaign does not belong to this NGO');
    }

    const company = await this.prisma.companyProfile.findUnique({
      where: { id: companyProfileId },
    });

    if (!company) {
      throw new NotFoundException('Company profile not found');
    }

    return this.prisma.campaignApproval.upsert({
      where: {
        campaignId_companyId: { campaignId, companyId: companyProfileId },
      },
      update: {
        status: 'PENDING',
        remarks: null,
      },
      create: {
        campaignId,
        companyId: companyProfileId,
        ngoId: ngoProfileId,
        status: 'PENDING',
      },
    });
  }

  async updateStatus(
    campaignId: string,
    companyProfileId: string,
    dto: ApproveProjectDto,
  ) {
    const approval = await this.prisma.campaignApproval.findUnique({
      where: {
        campaignId_companyId: { campaignId, companyId: companyProfileId },
      },
    });

    if (!approval) {
      throw new NotFoundException('Approval request not found');
    }

    return this.prisma.campaignApproval.update({
      where: {
        campaignId_companyId: {
          campaignId,
          companyId: companyProfileId,
        },
      },
      data: {
        status: dto.status,
        remarks: dto.remarks,
      },
    });
  }

  approve(
    campaignId: string,
    companyProfileId: string,
    dto: ApproveProjectDto,
  ) {
    if (dto.status && dto.status !== 'APPROVED') {
      throw new ForbiddenException('Status must be APPROVED');
    }

    return this.updateStatus(campaignId, companyProfileId, {
      status: 'APPROVED',
      remarks: dto.remarks,
    });
  }

  reject(campaignId: string, companyProfileId: string, dto: ApproveProjectDto) {
    if (dto.status && dto.status !== 'REJECTED') {
      throw new ForbiddenException('Status must be REJECTED');
    }

    return this.updateStatus(campaignId, companyProfileId, {
      status: 'REJECTED',
      remarks: dto.remarks,
    });
  }

  async getPendingForCompany(companyProfileId: string) {
    return this.prisma.campaignApproval.findMany({
      where: { companyId: companyProfileId, status: 'PENDING' },
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
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async ensureApproved(campaignId: string, companyId: string) {
    const approval = await this.prisma.campaignApproval.findUnique({
      where: {
        campaignId_companyId: { campaignId, companyId },
      },
    });

    if (!approval || approval.status !== 'APPROVED') {
      throw new ForbiddenException('Campaign not approved for this company');
    }

    return approval;
  }
}
