import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApproveProjectDto } from './dto/approve-project.dto';
import { ActivityLogService } from '../activity/activity-log.service';

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVOKED';

type ApprovalEntity = Awaited<
  ReturnType<ApprovalsService['getApprovalOrThrow']>
>;

type ApprovalTransition =
  | 'APPROVAL_APPROVED'
  | 'APPROVAL_REJECTED'
  | 'APPROVAL_REVOKED'
  | 'APPROVAL_REQUESTED'
  | 'APPROVAL_RESET';

const ApprovalErrors = {
  notFound: 'Approval request not found',
  notPending: 'Only pending requests can transition',
  notApproved: 'Only approved requests can be revoked',
} as const;

@Injectable()
export class ApprovalsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  private buildUniqueKey(campaignId: string, companyId: string) {
    return {
      campaignId_companyId: { campaignId, companyId },
    } as const;
  }

  private async getApprovalOrThrow(campaignId: string, companyId: string) {
    const approval = await this.prisma.campaignApproval.findUnique({
      where: this.buildUniqueKey(campaignId, companyId),
      include: {
        campaign: { select: { id: true, ngoId: true, title: true } },
        company: { select: { id: true, userId: true, deletedAt: true } },
        ngo: { select: { id: true, userId: true } },
      },
    });

    if (!approval) {
      throw new NotFoundException(ApprovalErrors.notFound);
    }

    if (!approval.company || approval.company.deletedAt) {
      throw new NotFoundException('Company profile not found');
    }

    return approval;
  }

  private async logTransition(
    approvalId: string,
    action: ApprovalTransition,
    actorId: string | null,
    metadata?: Record<string, unknown>,
  ) {
    await this.activityLog.log(actorId, action, {
      approvalId,
      ...metadata,
    });
  }

  async requestApproval(
    campaignId: string,
    ngoProfileId: string,
    companyProfileId: string,
    actorId: string,
    remarks?: string,
  ) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, ngoId: true },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (campaign.ngoId !== ngoProfileId) {
      throw new ForbiddenException('Campaign does not belong to this NGO');
    }

    const company = await this.prisma.companyProfile.findUnique({
      where: { id: companyProfileId },
      select: { id: true, deletedAt: true },
    });

    if (!company || company.deletedAt) {
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

      const reset = await this.prisma.campaignApproval.update({
        where: this.buildUniqueKey(campaignId, companyProfileId),
        data: { status: 'PENDING', remarks: null },
      });

      await this.logTransition(reset.id, 'APPROVAL_RESET', actorId, {
        campaignId,
        companyProfileId,
      });

      return reset;
    }

    const created = await this.prisma.campaignApproval.create({
      data: {
        campaignId,
        companyId: companyProfileId,
        ngoId: ngoProfileId,
        status: 'PENDING',
        remarks: remarks ?? null,
      },
    });

    await this.logTransition(created.id, 'APPROVAL_REQUESTED', actorId, {
      campaignId,
      companyProfileId,
      remarks: remarks ?? null,
    });

    return created;
  }

  async approve(
    campaignId: string,
    companyProfileId: string,
    dto: ApproveProjectDto,
    actorId: string,
  ) {
    if (dto.status && dto.status !== 'APPROVED') {
      throw new BadRequestException('Status must be APPROVED');
    }

    const updated = await this.transition(
      campaignId,
      companyProfileId,
      'APPROVED',
      dto.remarks,
    );

    await this.logTransition(updated.id, 'APPROVAL_APPROVED', actorId, {
      campaignId,
      companyProfileId,
      remarks: dto.remarks ?? null,
    });

    return updated;
  }

  async reject(
    campaignId: string,
    companyProfileId: string,
    dto: ApproveProjectDto,
    actorId: string,
  ) {
    if (dto.status && dto.status !== 'REJECTED') {
      throw new BadRequestException('Status must be REJECTED');
    }

    const updated = await this.transition(
      campaignId,
      companyProfileId,
      'REJECTED',
      dto.remarks,
    );

    await this.logTransition(updated.id, 'APPROVAL_REJECTED', actorId, {
      campaignId,
      companyProfileId,
      remarks: dto.remarks ?? null,
    });

    return updated;
  }

  async revoke(
    campaignId: string,
    companyProfileId: string,
    actorId: string,
    remarks?: string,
  ) {
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

    const updated = await this.prisma.campaignApproval.update({
      where: this.buildUniqueKey(campaignId, companyProfileId),
      data: { status: 'REVOKED', remarks: remarks ?? approval.remarks },
    });

    await this.logTransition(updated.id, 'APPROVAL_REVOKED', actorId, {
      campaignId,
      companyProfileId,
      remarks: remarks ?? approval.remarks ?? null,
    });

    return updated;
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

    if (target === 'APPROVED' || target === 'REJECTED') {
      if (approval.status !== 'PENDING') {
        throw new ForbiddenException(ApprovalErrors.notPending);
      }
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
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        ngo: {
          select: {
            id: true,
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
