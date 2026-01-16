import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FinancialReportDto } from './dto/financial-report.dto';
import { ActivityLogService } from '../activity/activity-log.service';
import { AdminFinancialReportDto } from './dto/admin-financial-report.dto';
import type { FinancialReportResponse } from './types/financial-report-response.type';

type FinancialReportWithNgo = {
  id: string;
  period: string;
  year: number;
  reportUrl: string;
  ngoId: string;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  ngo?: {
    id: string;
    user?: {
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
};

interface ListOptions {
  year?: number;
}

@Injectable()
export class FinancialService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async uploadReport(
    ngoProfileId: string,
    dto: FinancialReportDto,
    actorId: string | null,
  ) {
    await this.ensureNGOProfile(ngoProfileId);

    await this.ensureUniquePeriod(ngoProfileId, dto.period, dto.year);

    const report = await this.prisma.financialReport.create({
      data: {
        ngoId: ngoProfileId,
        period: dto.period,
        year: dto.year,
        reportUrl: dto.reportUrl,
      },
    });

    await this.activityLog.log({
      actorId,
      action: 'FINANCIAL_REPORT_CREATED',
      entity: 'FinancialReport',
      entityId: report.id,
      after: {
        status: 'CREATED',
      },
      metadata: {
        ngoId: report.ngoId,
        year: report.year,
        period: report.period,
      },
    });

    return report;
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

  async ensureUniquePeriod(
    ngoProfileId: string,
    period: FinancialReportDto['period'],
    year: number,
  ) {
    const existing = await this.prisma.financialReport.findFirst({
      where: {
        ngoId: ngoProfileId,
        period,
        year,
      },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException(
        'Report already submitted for this period and year',
      );
    }
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
    return this.prisma.financialReport.findMany({
      where: { ngoId: ngoProfileId },
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

  mapAdminReport(report: FinancialReportWithNgo): FinancialReportResponse {
    const createdAt =
      report.createdAt instanceof Date
        ? report.createdAt
        : new Date(report.createdAt);

    const response: FinancialReportResponse = {
      id: report.id,
      period: report.period,
      year: report.year,
      reportUrl: report.reportUrl,
      ngoId: report.ngoId,
      ngoName: report.ngo?.user?.name ?? null,
      ngoEmail: report.ngo?.user?.email ?? null,
      createdAt: createdAt.toISOString(),
    };

    if (report.updatedAt) {
      const updatedAt =
        report.updatedAt instanceof Date
          ? report.updatedAt
          : new Date(report.updatedAt);
      response.updatedAt = updatedAt.toISOString();
    }

    return response;
  }
}
