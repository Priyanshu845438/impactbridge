import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ApprovalsService } from '../../../src/approvals/approvals.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { PrismaServiceMock } from '../mocks/prisma-service.mock';

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
};

describe('ApprovalsService workflow', () => {
  let prisma: PrismaServiceMock;
  let service: ApprovalsService;

  beforeEach(() => {
    prisma = new PrismaServiceMock();
    service = new ApprovalsService(prisma as unknown as PrismaService);
  });

  describe('requestApproval', () => {
    it('creates approval when valid', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-1',
      });
      prisma.companyProfile.findUnique.mockResolvedValue({ id: 'company-1' });
      prisma.campaignApproval.findUnique.mockResolvedValue(null);
      prisma.campaignApproval.create.mockResolvedValue(baseApproval);

      const result = await service.requestApproval(
        'campaign-1',
        'ngo-1',
        'company-1',
      );

      expect(result).toEqual(baseApproval);
      expect(prisma.campaignApproval.create).toHaveBeenCalledWith({
        data: {
          campaignId: 'campaign-1',
          companyId: 'company-1',
          ngoId: 'ngo-1',
          status: 'PENDING',
        },
      });
    });

    it('throws when campaign missing', async () => {
      prisma.campaign.findUnique.mockResolvedValue(null);

      await expect(
        service.requestApproval('missing', 'ngo-1', 'company-1'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when NGO mismatch', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'other-ngo',
      });

      await expect(
        service.requestApproval('campaign-1', 'ngo-2', 'company-1'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('throws when company missing', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-1',
      });
      prisma.companyProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.requestApproval('campaign-1', 'ngo-1', 'missing'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns existing pending approval idempotently', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-1',
      });
      prisma.companyProfile.findUnique.mockResolvedValue({ id: 'company-1' });
      prisma.campaignApproval.findUnique.mockResolvedValue(baseApproval);

      const result = await service.requestApproval(
        'campaign-1',
        'ngo-1',
        'company-1',
      );

      expect(result).toEqual(baseApproval);
      expect(prisma.campaignApproval.update).not.toHaveBeenCalled();
      expect(prisma.campaignApproval.create).not.toHaveBeenCalled();
    });

    it('resets rejected approvals back to pending', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-1',
      });
      prisma.companyProfile.findUnique.mockResolvedValue({ id: 'company-1' });
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'REJECTED',
        remarks: 'previous issue',
      });
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'PENDING',
        remarks: null,
      });

      const result = await service.requestApproval(
        'campaign-1',
        'ngo-1',
        'company-1',
      );

      expect(result.status).toBe('PENDING');
      expect(prisma.campaignApproval.update).toHaveBeenCalledWith({
        where: {
          campaignId_companyId: {
            campaignId: 'campaign-1',
            companyId: 'company-1',
          },
        },
        data: { status: 'PENDING', remarks: null },
      });
    });

    it('keeps approved approvals unchanged', async () => {
      prisma.campaign.findUnique.mockResolvedValue({
        id: 'campaign-1',
        ngoId: 'ngo-1',
      });
      prisma.companyProfile.findUnique.mockResolvedValue({ id: 'company-1' });
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
      });

      const result = await service.requestApproval(
        'campaign-1',
        'ngo-1',
        'company-1',
      );

      expect(result.status).toBe('APPROVED');
      expect(prisma.campaignApproval.update).not.toHaveBeenCalled();
    });
  });

  describe('approve', () => {
    it('updates record to APPROVED', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'PENDING',
      });
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
        remarks: 'looks good',
      });

      const result = await service.approve('campaign-1', 'company-1', {
        status: 'APPROVED',
        remarks: 'looks good',
      });

      expect(result.status).toBe('APPROVED');
      expect(prisma.campaignApproval.update).toHaveBeenCalledWith({
        where: {
          campaignId_companyId: {
            campaignId: 'campaign-1',
            companyId: 'company-1',
          },
        },
        data: { status: 'APPROVED', remarks: 'looks good' },
      });
    });

    it('rejects incorrect status input', async () => {
      expect(() =>
        service.approve('campaign-1', 'company-1', {
          status: 'REJECTED',
          remarks: 'no',
        }),
      ).toThrow('Status must be APPROVED');
    });

    it('throws when record missing', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue(null);

      await expect(
        service.approve('campaign-1', 'company-1', { status: 'APPROVED' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects non-pending approvals', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'REJECTED',
      });

      await expect(
        service.approve('campaign-1', 'company-1', { status: 'APPROVED' }),
      ).rejects.toThrow('Only pending requests can transition');
    });
  });

  describe('reject', () => {
    it('updates record to REJECTED', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'PENDING',
      });
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'REJECTED',
        remarks: 'not aligned',
      });

      const result = await service.reject('campaign-1', 'company-1', {
        status: 'REJECTED',
        remarks: 'not aligned',
      });

      expect(result.status).toBe('REJECTED');
    });

    it('rejects incorrect status input', async () => {
      expect(() =>
        service.reject('campaign-1', 'company-1', {
          status: 'APPROVED',
          remarks: 'oops',
        }),
      ).toThrow('Status must be REJECTED');
    });

    it('throws when record missing', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue(null);

      await expect(
        service.reject('campaign-1', 'company-1', { status: 'REJECTED' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects non-pending approvals', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
      });

      await expect(
        service.reject('campaign-1', 'company-1', { status: 'REJECTED' }),
      ).rejects.toThrow('Only pending requests can transition');
    });
  });

  describe('revoke', () => {
    it('transitions approved requests to revoked', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValueOnce({
        ...baseApproval,
        status: 'APPROVED',
        remarks: 'initial',
      });
      prisma.campaignApproval.update.mockResolvedValue({
        ...baseApproval,
        status: 'REVOKED',
        remarks: 'policy change',
      });

      const result = await service.revoke(
        'campaign-1',
        'company-1',
        'policy change',
      );

      expect(result.status).toBe('REVOKED');
      expect(prisma.campaignApproval.update).toHaveBeenCalledWith({
        where: {
          campaignId_companyId: {
            campaignId: 'campaign-1',
            companyId: 'company-1',
          },
        },
        data: { status: 'REVOKED', remarks: 'policy change' },
      });
    });

    it('is idempotent for already revoked approvals', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValueOnce({
        ...baseApproval,
        status: 'REVOKED',
      });

      const result = await service.revoke('campaign-1', 'company-1');

      expect(result.status).toBe('REVOKED');
      expect(prisma.campaignApproval.update).not.toHaveBeenCalled();
    });

    it('fails when approval is not approved', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValueOnce({
        ...baseApproval,
        status: 'PENDING',
      });

      await expect(service.revoke('campaign-1', 'company-1')).rejects.toThrow(
        'Only approved requests can be revoked',
      );
    });
  });

  describe('ensureApproved', () => {
    it('passes with approved record', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'APPROVED',
      });

      const result = await service.ensureApproved('campaign-1', 'company-1');
      expect(result.status).toBe('APPROVED');
    });

    it('throws when record missing', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue(null);

      await expect(
        service.ensureApproved('campaign-1', 'company-1'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('throws when status not approved', async () => {
      prisma.campaignApproval.findUnique.mockResolvedValue({
        ...baseApproval,
        status: 'PENDING',
      });

      await expect(
        service.ensureApproved('campaign-1', 'company-1'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
