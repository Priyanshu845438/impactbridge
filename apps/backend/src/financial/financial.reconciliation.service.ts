import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type {
  FinancialReconciliationIssue,
  FinancialReconciliationSummary,
} from './types/financial-reconciliation-result.type';

interface TotalsRow {
  ngoId: string;
  period: string;
  year: number;
  donationTotal: number;
  reportTotal: number;
}

interface AggregatedRow {
  ngoId: string;
  period: string;
  year: number;
  total: number;
}

@Injectable()
export class FinancialReconciliationService {
  constructor(private readonly prisma: PrismaService) {}

  async reconcileAll(): Promise<FinancialReconciliationSummary> {
    const rows = await this.buildRows();

    let matchedPeriods = 0;
    const issues: FinancialReconciliationIssue[] = [];

    for (const row of rows) {
      const { ngoId, period, year, donationTotal, reportTotal } = row;
      const periodLabel = this.buildPeriodLabel(period, year);

      if (donationTotal === 0 && reportTotal === 0) {
        matchedPeriods += 1;
        continue;
      }

      if (reportTotal === 0 && donationTotal > 0) {
        issues.push({
          type: 'MISSING_REPORT',
          ngoId,
          period: periodLabel,
          expectedTotal: donationTotal,
          actualTotal: reportTotal,
        });
        continue;
      }

      if (!this.areTotalsEqual(donationTotal, reportTotal)) {
        issues.push({
          type: 'AMOUNT_MISMATCH',
          ngoId,
          period: periodLabel,
          expectedTotal: donationTotal,
          actualTotal: reportTotal,
        });
        continue;
      }

      matchedPeriods += 1;
    }

    return {
      checkedPeriods: rows.length,
      matchedPeriods,
      issues,
    } satisfies FinancialReconciliationSummary;
  }

  private async buildRows(): Promise<TotalsRow[]> {
    const [donationRows, reportRows] = await Promise.all([
      this.aggregateDonationsByNGO(),
      this.aggregateReportsByNGO(),
    ]);

    const rowsByKey = new Map<string, TotalsRow>();

    for (const donation of donationRows) {
      const key = this.buildKey(donation);
      rowsByKey.set(key, {
        ngoId: donation.ngoId,
        period: donation.period,
        year: donation.year,
        donationTotal: donation.total,
        reportTotal: 0,
      });
    }

    for (const report of reportRows) {
      const key = this.buildKey(report);
      const existing = rowsByKey.get(key);

      if (existing) {
        existing.reportTotal = report.total;
      } else {
        rowsByKey.set(key, {
          ngoId: report.ngoId,
          period: report.period,
          year: report.year,
          donationTotal: 0,
          reportTotal: report.total,
        });
      }
    }

    return Array.from(rowsByKey.values());
  }

  private async aggregateDonationsByNGO(): Promise<AggregatedRow[]> {
    const donations = await this.prisma.donation.findMany({
      select: {
        amount: true,
        donationDate: true,
        campaign: {
          select: { ngoId: true },
        },
      },
      where: { deletedAt: null },
    });

    const totals = new Map<string, AggregatedRow>();

    for (const donation of donations) {
      const ngoId = donation.campaign?.ngoId;
      if (!ngoId) {
        continue;
      }

      const donationDate = new Date(donation.donationDate);
      const year = donationDate.getUTCFullYear();
      const quarter = this.resolveQuarter(donationDate);
      const amount = Number(donation.amount ?? 0);

      this.incrementTotal(totals, { ngoId, period: quarter, year }, amount);
      this.incrementTotal(totals, { ngoId, period: 'ANNUAL', year }, amount);
    }

    return Array.from(totals.values());
  }

  private async aggregateReportsByNGO(): Promise<AggregatedRow[]> {
    const [reports, utilisationReports] = await Promise.all([
      this.prisma.financialReport.findMany({
        select: {
          ngoId: true,
          period: true,
          year: true,
        },
      }),
      this.prisma.utilizationReport.findMany({
        select: {
          amountUsed: true,
          createdAt: true,
          campaign: {
            select: { ngoId: true },
          },
        },
      }),
    ]);

    const utilisationTotals = new Map<string, AggregatedRow>();

    for (const report of utilisationReports) {
      const ngoId = report.campaign?.ngoId;
      if (!ngoId) {
        continue;
      }

      const createdAt = new Date(report.createdAt);
      const year = createdAt.getUTCFullYear();
      const quarter = this.resolveQuarter(createdAt);
      const amount = Number(report.amountUsed ?? 0);

      this.incrementTotal(utilisationTotals, { ngoId, period: quarter, year }, amount);
      this.incrementTotal(utilisationTotals, { ngoId, period: 'ANNUAL', year }, amount);
    }

    const totals = new Map<string, AggregatedRow>();

    for (const report of reports) {
      const key = this.buildKey(report);
      const utilisation = utilisationTotals.get(key);

      totals.set(key, {
        ngoId: report.ngoId,
        period: report.period,
        year: report.year,
        total: utilisation?.total ?? 0,
      });
    }

    return Array.from(totals.values());
  }

  private incrementTotal(
    map: Map<string, AggregatedRow>,
    row: { ngoId: string; period: string; year: number },
    amount: number,
  ) {
    const key = this.buildKey(row);
    const current = map.get(key) ?? {
      ngoId: row.ngoId,
      period: row.period,
      year: row.year,
      total: 0,
    };

    current.total += amount;
    map.set(key, current);
  }

  private buildKey(row: { ngoId: string; period: string; year: number }): string {
    return `${row.ngoId}:${row.period}:${row.year}`;
  }

  private buildPeriodLabel(period: string, year: number): string {
    return `${period}-${year}`;
  }

  private resolveQuarter(date: Date): string {
    const month = date.getUTCMonth();

    if (month <= 2) {
      return 'Q1';
    }
    if (month <= 5) {
      return 'Q2';
    }
    if (month <= 8) {
      return 'Q3';
    }
    return 'Q4';
  }

  private areTotalsEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < 0.01;
  }
}

