import { ConflictException, NotFoundException } from '@nestjs/common';
import { FinancialService } from '../../../src/financial/financial.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

const report = {
  id: 'report-1',
  ngoId: 'ngo-1',
  period: 'Q1',
  year: 2024,
  reportUrl: 'https://example.com/report.pdf',
  createdAt: new Date('2024-02-01'),
};

describe('FinancialService', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: FinancialService;
  const activityLog = { log: jest.fn() } as any;

  beforeEach(() => {
    prisma = {
      nGOProfile: {
        findUnique: jest.fn(),
      },
      financialReport: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    activityLog.log.mockReset();
    service = new FinancialService(prisma, activityLog);
  });

  describe('uploadReport', () => {
    it('creates report when NGO exists', async () => {
      prisma.nGOProfile.findUnique.mockResolvedValue({ id: 'ngo-1' } as any);
      prisma.financialReport.findFirst.mockResolvedValue(null as any);
      prisma.financialReport.create.mockResolvedValue(report as any);

      const result = await service.uploadReport(
        'ngo-1',
        {
          period: 'Q1',
          year: 2024,
          reportUrl: 'https://example.com/report.pdf',
        },
        'actor-1',
      );

      expect(result).toEqual(report);
      expect(prisma.financialReport.create).toHaveBeenCalledWith({
        data: {
          ngoId: 'ngo-1',
          period: 'Q1',
          year: 2024,
          reportUrl: 'https://example.com/report.pdf',
        },
      });
      expect(activityLog.log).toHaveBeenCalledWith({
        actorId: 'actor-1',
        action: 'FINANCIAL_REPORT_CREATED',
        entity: 'FinancialReport',
        entityId: 'report-1',
        after: { status: 'CREATED' },
        metadata: {
          ngoId: 'ngo-1',
          year: 2024,
          period: 'Q1',
        },
      });
    });

    it('throws when NGO missing', async () => {
      prisma.nGOProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.uploadReport(
          'ngo-1',
          {
            period: 'Q1',
            year: 2024,
            reportUrl: 'https://example.com/report.pdf',
          },
          'actor-1',
        ),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects duplicate period/year combinations', async () => {
      prisma.nGOProfile.findUnique.mockResolvedValue({ id: 'ngo-1' } as any);
      prisma.financialReport.findFirst.mockResolvedValue({
        id: 'existing-report',
      } as any);

      await expect(
        service.uploadReport(
          'ngo-1',
          {
            period: 'Q1',
            year: 2024,
            reportUrl: 'https://example.com/report.pdf',
          },
          'actor-1',
        ),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(prisma.financialReport.create).not.toHaveBeenCalled();
    });
  });

  describe('getReportsForNGO', () => {
    beforeEach(() => {
      prisma.nGOProfile.findUnique.mockResolvedValue({ id: 'ngo-1' } as any);
    });

    it('returns reports sorted by createdAt', async () => {
      prisma.financialReport.findMany.mockResolvedValue([report] as any);

      const result = await service.getReportsForNGO('ngo-1');
      expect(result).toEqual([report]);
      expect(prisma.financialReport.findMany).toHaveBeenCalledWith({
        where: { ngoId: 'ngo-1' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('applies year filter when provided', async () => {
      prisma.financialReport.findMany.mockResolvedValue([report] as any);

      await service.getReportsForNGO('ngo-1', { year: 2024 });

      expect(prisma.financialReport.findMany).toHaveBeenCalledWith({
        where: { ngoId: 'ngo-1', year: 2024 },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('throws when NGO profile missing', async () => {
      prisma.nGOProfile.findUnique.mockResolvedValueOnce(null as any);

      await expect(
        service.getReportsForNGO('missing-ngo'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('getReportsForYear', () => {
    it('returns reports with NGO details', async () => {
      prisma.financialReport.findMany.mockResolvedValue([report] as any);

      const result = await service.getReportsForYear(2024);

      expect(result).toEqual([report]);
      expect(prisma.financialReport.findMany).toHaveBeenCalledWith({
        where: { year: 2024 },
        include: {
          ngo: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('getReportsForNGOId', () => {
    it('returns NGO reports with contact info ordered newest first', async () => {
      prisma.financialReport.findMany.mockResolvedValue([report] as any);

      const result = await service.getReportsForNGOId('ngo-1');

      expect(result).toEqual([report]);
      expect(prisma.financialReport.findMany).toHaveBeenCalledWith({
        where: { ngoId: 'ngo-1' },
        include: {
          ngo: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('getReportsForAdmin', () => {
    it('returns all reports with NGO contact info ordered by newest first', async () => {
      prisma.financialReport.findMany.mockResolvedValue([report] as any);

      const result = await service.getReportsForAdmin();

      expect(result).toEqual([report]);
      expect(prisma.financialReport.findMany).toHaveBeenCalledWith({
        include: {
          ngo: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('mapAdminReport', () => {
    it('sanitises Prisma model into DTO format', () => {
      const createdAt = new Date('2024-03-01T00:00:00.000Z');
      const updatedAt = new Date('2024-03-02T00:00:00.000Z');
      const dto = service.mapAdminReport({
        id: 'rep-1',
        period: 'Q1',
        year: 2024,
        reportUrl: 'https://example.com/report.pdf',
        ngoId: 'ngo-1',
        createdAt,
        updatedAt,
        ngo: {
          id: 'ngo-1',
          user: {
            name: 'NGO Name',
            email: 'ngo@example.com',
          },
        },
      } as any);

      expect(dto).toEqual({
        id: 'rep-1',
        period: 'Q1',
        year: 2024,
        reportUrl: 'https://example.com/report.pdf',
        ngoId: 'ngo-1',
        ngoName: 'NGO Name',
        ngoEmail: 'ngo@example.com',
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      });
    });

    it('handles missing NGO contact info gracefully', () => {
      const createdAt = new Date('2024-03-01T00:00:00.000Z');
      const updatedAt = new Date('2024-03-02T00:00:00.000Z');
      const dto = service.mapAdminReport({
        id: 'rep-2',
        period: 'ANNUAL',
        year: 2023,
        reportUrl: 'https://example.com/annual.pdf',
        ngoId: 'ngo-2',
        createdAt,
        updatedAt,
        ngo: null,
      } as any);

      expect(dto.ngoName).toBeNull();
      expect(dto.ngoEmail).toBeNull();
    });
  });
});
