import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApproveProjectDto } from './dto/approve-project.dto';

type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVOKED';

const ApprovalErrors = {
  notFound: 'Approval request not found',
  notPending: 'Only pending requests can transition',
  notApproved: 'Only approved requests can be revoked',
  alreadyApproved: 'Campaign already approved for this company',
} as const;

@Injectable()
export class ApprovalsService {
  constructor(private readonly prisma: PrismaService) {}

  private buildUniqueKey(campaignId: string, companyId: string) {
    return {
      campaignId_companyId: { campaignId, companyId },
    } as const;
  }

  private async getApprovalOrThrow(campaignId: string, companyId: string) {
    const approval = await this.prisma.campaignApproval.findUnique({
      where: this.buildUniqueKey(campaignId, companyId),
    });

    if (!approval) {
      throw new NotFoundException(ApprovalErrors.notFound);
    }

    return approval;
  }

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

    const existing = await this.prisma.campaignApproval.findUnique({
      where: this.buildUniqueKey(campaignId, companyProfileId),
    });

    if (existing) {
      if (existing.ngoId !== ngoProfileId) {
        throw new ForbiddenException('Approval belongs to a different NGO');
      }

      if (existing.status === 'APPROVED') {
        return existing;
      }

      if (existing.status === 'PENDING') {
        return existing;
      }

      return this.prisma.campaignApproval.update({
        where: this.buildUniqueKey(campaignId, companyProfileId),
        data: { status: 'PENDING', remarks: null },
      });
    }

    return this.prisma.campaignApproval.create({
      data: {
        campaignId,
        companyId: companyProfileId,
        ngoId: ngoProfileId,
        status: 'PENDING',
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

    return this.transition(
      campaignId,
      companyProfileId,
      'APPROVED',
      dto.remarks,
    );
  }

  reject(campaignId: string, companyProfileId: string, dto: ApproveProjectDto) {
    if (dto.status && dto.status !== 'REJECTED') {
      throw new ForbiddenException('Status must be REJECTED');
    }

    return this.transition(
      campaignId,
      companyProfileId,
      'REJECTED',
      dto.remarks,
    );
  }

  async revoke(campaignId: string, companyProfileId: string, remarks?: string) {
    const approval = await this.getApprovalOrThrow(
      campaignId,
      companyProfileId,
    );

    if (approval.status === 'REVOKED') {
      return approval;
    }

    if (approval.status !== 'APPROVED') {
      throw new ForbiddenException(ApprovalErrors.notApproved);
    }

    return this.prisma.campaignApproval.update({
      where: this.buildUniqueKey(campaignId, companyProfileId),
      data: { status: 'REVOKED', remarks: remarks ?? approval.remarks },
    });
  }

  private async transition(
    campaignId: string,
    companyProfileId: string,
    target: ApprovalStatus,
    remarks?: string,
  ) {
    const approval = await this.getApprovalOrThrow(
      campaignId,
      companyProfileId,
    );

    if (approval.status === target) {
      if (remarks !== undefined && remarks !== approval.remarks) {
        return this.prisma.campaignApproval.update({
          where: this.buildUniqueKey(campaignId, companyProfileId),
          data: { remarks },
        });
      }

      return approval;
    }

    if (target === 'APPROVED') {
      if (approval.status !== 'PENDING') {
        throw new ForbiddenException(ApprovalErrors.notPending);
      }
    }

    if (target === 'REJECTED') {
      if (approval.status !== 'PENDING') {
        throw new ForbiddenException(ApprovalErrors.notPending);
      }
    }

    if (target === 'PENDING') {
      // Should only be triggered via request handler.
      return this.prisma.campaignApproval.update({
        where: this.buildUniqueKey(campaignId, companyProfileId),
        data: { status: 'PENDING', remarks: remarks ?? null },
      });
    }

    return this.prisma.campaignApproval.update({
      where: this.buildUniqueKey(campaignId, companyProfileId),
      data: { status: target, remarks: remarks ?? approval.remarks },
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
