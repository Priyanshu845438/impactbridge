import { NotFoundException } from '@nestjs/common';
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

  beforeEach(() => {
    prisma = {
      nGOProfile: {
        findUnique: jest.fn(),
      },
      financialReport: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new FinancialService(prisma);
  });

  describe('uploadReport', () => {
    it('creates report when NGO exists', async () => {
      prisma.nGOProfile.findUnique.mockResolvedValue({ id: 'ngo-1' } as any);
      prisma.financialReport.create.mockResolvedValue(report as any);

      const result = await service.uploadReport('ngo-1', {
        period: 'Q1',
        year: 2024,
        reportUrl: 'https://example.com/report.pdf',
      });

      expect(result).toEqual(report);
      expect(prisma.financialReport.create).toHaveBeenCalledWith({
        data: {
          ngoId: 'ngo-1',
          period: 'Q1',
          year: 2024,
          reportUrl: 'https://example.com/report.pdf',
        },
      });
    });

    it('throws when NGO missing', async () => {
      prisma.nGOProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.uploadReport('ngo-1', {
          period: 'Q1',
          year: 2024,
          reportUrl: 'https://example.com/report.pdf',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
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
});
