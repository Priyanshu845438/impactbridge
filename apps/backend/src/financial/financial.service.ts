import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FinancialReportDto } from './dto/financial-report.dto';

interface ListOptions {
  year?: number;
}

@Injectable()
export class FinancialService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadReport(ngoProfileId: string, dto: FinancialReportDto) {
    await this.ensureNGOProfile(ngoProfileId);

    return this.prisma.financialReport.create({
      data: {
        ngoId: ngoProfileId,
        period: dto.period,
        year: dto.year,
        reportUrl: dto.reportUrl,
      },
    });
  }

  async getReportsForNGO(ngoProfileId: string, options: ListOptions = {}) {
    await this.ensureNGOProfile(ngoProfileId);

    return this.prisma.financialReport.findMany({
      where: {
        ngoId: ngoProfileId,
        ...(options.year ? { year: options.year } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReportsForYear(year: number) {
    return this.prisma.financialReport.findMany({
      where: { year },
      include: {
        ngo: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReportsForNGOId(ngoProfileId: string) {
    return this.getReportsForNGO(ngoProfileId);
  }

  async getReportsForAdmin() {
    return this.prisma.financialReport.findMany({
      include: {
        ngo: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async ensureNGOProfile(ngoProfileId: string) {
    const profile = await this.prisma.nGOProfile.findUnique({
      where: { id: ngoProfileId },
    });

    if (!profile) {
      throw new NotFoundException('NGO profile not found');
    }

    return profile;
  }
}
