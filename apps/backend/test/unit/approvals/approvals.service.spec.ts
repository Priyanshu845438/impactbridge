import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ApprovalsService } from '../../../src/approvals/approvals.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

const NOW = new Date();

const baseApproval = {
  id: 'approval-1',
  campaignId: 'campaign-1',
  companyId: 'company-1',
  ngoId: 'ngo-1',
  status: 'PENDING' as const,
  remarks: null as string | null,
  createdAt: NOW,
  updatedAt: NOW,
  campaign: { id: 'campaign-1', ngoId: 'ngo-1', title: 'Campaign' },
  company: { id: 'company-1', userId: 'company-user', deletedAt: null },
  ngo: { id: 'ngo-1', userId: 'ngo-user' },
};

describe('ApprovalsService workflow', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: ApprovalsService;
  const activityLog = { log: jest.fn() } as any;

  beforeEach(() => {
    prisma = {
      campaign: { findUnique: jest.fn() },
      companyProfile: { findUnique: jest.fn() },
      campaignApproval: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new ApprovalsService(prisma, activityLog);
    activityLog.log.mockReset();
  });

  describe('requestApproval', () => {
    beforeEach(() => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-1',
      } as any);
      prisma.companyProfile.findUnique.mockResolvedValue({
        id: 'company-1',
        deletedAt: null,
      } as any);
    });

    it('creates approval when valid', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue(null);
      prisma.campaignApproval.create.mockResolvedValue({
        ...baseApproval,
        campaign: undefined,
        company: undefined,
        ngo: undefined,
      } as any);

      await service.requestApproval(
        'campaign-1',
        'ngo-1',
        'company-1',
        'ngo-user',
        'please approve',
      );

      expect(prisma.campaignApproval.create).toHaveBeenCalledWith({
        data: {
          campaignId: 'campaign-1',
          companyId: 'company-1',
          ngoId: 'ngo-1',
          status: 'PENDING',
          remarks: 'please approve',
        },
      });
      expect(activityLog.log).toHaveBeenCalledWith(
        expect.objectContaining({
          actorId: 'ngo-user',
          action: 'NGO_APPROVAL_REQUESTED',
          entity: 'CampaignApproval',
        }),
      );
    });

    it('throws when company missing', async () => {
      prisma.companyProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.requestApproval('campaign-1', 'ngo-1', 'missing', 'ngo-user'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects request for campaign belonging to another NGO', async () => {
      prisma.campaign.findUnique.mockResolvedValueOnce({
        id: 'campaign-1',
        ngoId: 'other-ngo',
      } as any);

      await expect(
        service.requestApproval('campaign-1', 'ngo-1', 'company-1', 'ngo-user'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('resets rejected approval back to pending', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'REJECTED',
        remarks: 'previous issue',
      } as any);
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'PENDING',
        remarks: null,
      } as any);

      const result = await service.requestApproval(
        'campaign-1',
        'ngo-1',
        'company-1',
        'ngo-user',
      );

      expect(result.status).toBe('PENDING');
      expect(activityLog.log).toHaveBeenCalledWith(
        expect.objectContaining({
          actorId: 'ngo-user',
          action: 'NGO_APPROVAL_RESET',
        }),
      );
    });
  });

  describe('approve', () => {
    beforeEach(() => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
      } as any);
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
        remarks: 'looks good',
      } as any);
    });

    it('updates record to APPROVED', async () => {
      const result = await service.approve(
        'campaign-1',
        'company-1',
        {
          status: 'APPROVED',
          remarks: 'looks good',
        },
        'company-user',
      );

      expect(result.status).toBe('APPROVED');
      expect(activityLog.log).toHaveBeenCalledWith(
        expect.objectContaining({
          actorId: 'company-user',
          action: 'NGO_APPROVAL_APPROVED',
          entityId: 'approval-1',
        }),
      );
    });

    it('rejects incorrect status input', async () => {
      await expect(
        service.approve(
          'campaign-1',
          'company-1',
          {
            status: 'REJECTED',
          },
          'company-user',
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('requires pending state', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValueOnce({
        ...baseApproval,
        status: 'REJECTED',
      } as any);

      await expect(
        service.approve(
          'campaign-1',
          'company-1',
          { status: 'APPROVED' },
          'company-user',
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('reject', () => {
    beforeEach(() => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
      } as any);
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'REJECTED',
        remarks: 'not aligned',
      } as any);
    });

    it('updates record to REJECTED', async () => {
      const result = await service.reject(
        'campaign-1',
        'company-1',
        {
          status: 'REJECTED',
          remarks: 'not aligned',
        },
        'company-user',
      );

      expect(result.status).toBe('REJECTED');
      expect(activityLog.log).toHaveBeenCalledWith(
        expect.objectContaining({
          actorId: 'company-user',
          action: 'NGO_APPROVAL_REJECTED',
        }),
      );
    });

    it('rejects wrong status', async () => {
      await expect(
        service.reject(
          'campaign-1',
          'company-1',
          { status: 'APPROVED' },
          'company-user',
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('revoke', () => {
    beforeEach(() => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
      } as any);
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'REVOKED',
        remarks: 'issue found',
      } as any);
    });

    it('revokes approved entry', async () => {
      const result = await service.revoke(
        'campaign-1',
        'company-1',
        'company-user',
        'issue found',
      );

      expect(result.status).toBe('REVOKED');
      expect(activityLog.log).toHaveBeenCalledWith(
        expect.objectContaining({
          actorId: 'company-user',
          action: 'NGO_APPROVAL_REVOKED',
        }),
      );
    });

    it('throws when not approved', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValueOnce({
        ...baseApproval,
        status: 'PENDING',
      } as any);

      await expect(
        service.revoke('campaign-1', 'company-1', 'company-user'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
