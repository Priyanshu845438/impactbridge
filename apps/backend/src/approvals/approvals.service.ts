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

type ApprovalForLog = {
  id: string;
  ngoId: string;
  companyId: string;
  campaignId: string;
  status: ApprovalStatus;
};

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

  private async logStatusChange(
    actorId: string,
    action: string,
    approval: ApprovalForLog,
    previousStatus: ApprovalStatus,
  ) {
    await this.activityLog.log({
      actorId,
      action,
      entity: 'CampaignApproval',
      entityId: approval.id,
      before: { status: previousStatus },
      after: { status: approval.status },
      metadata: {
        targetNgoId: approval.ngoId,
        campaignId: approval.campaignId,
        companyId: approval.companyId,
      },
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

      await this.logStatusChange(
        actorId,
        'NGO_APPROVAL_RESET',
        reset as ApprovalForLog,
        existing.status as ApprovalStatus,
      );

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

    await this.logStatusChange(
      actorId,
      'NGO_APPROVAL_REQUESTED',
      created as ApprovalForLog,
      'PENDING',
    );

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

    const before = await this.getApprovalOrThrow(campaignId, companyProfileId);
    const updated = await this.transition(
      campaignId,
      companyProfileId,
      'APPROVED',
      dto.remarks,
      before,
    );

    await this.logStatusChange(
      actorId,
      'NGO_APPROVAL_APPROVED',
      updated as ApprovalForLog,
      before.status as ApprovalStatus,
    );

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

    const before = await this.getApprovalOrThrow(campaignId, companyProfileId);
    const updated = await this.transition(
      campaignId,
      companyProfileId,
      'REJECTED',
      dto.remarks,
      before,
    );

    await this.logStatusChange(
      actorId,
      'NGO_APPROVAL_REJECTED',
      updated as ApprovalForLog,
      before.status as ApprovalStatus,
    );

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

    await this.logStatusChange(
      actorId,
      'NGO_APPROVAL_REVOKED',
      updated as ApprovalForLog,
      approval.status as ApprovalStatus,
    );

    return updated;
  }

  private async transition(
    campaignId: string,
    companyProfileId: string,
    target: ApprovalStatus,
    remarks?: string,
    existing?: ApprovalEntity,
  ) {
    const approval =
      existing ??
      (await this.getApprovalOrThrow(campaignId, companyProfileId));

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
