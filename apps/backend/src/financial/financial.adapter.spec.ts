import { describe, expect, it } from '@jest/globals';
import { FinancialService } from './financial.service';

const service = new FinancialService({} as any, {} as any);

describe('FinancialService mapAdminReport adapter', () => {
  it('handles missing updatedAt gracefully', () => {
    const createdAt = new Date('2024-01-15T12:00:00.000Z');

    const mapped = service.mapAdminReport({
      id: 'report-1',
      period: 'Q1',
      year: 2024,
      reportUrl: 'https://example.com/report.pdf',
      ngoId: 'ngo-1',
      createdAt,
      updatedAt: null,
      ngo: {
        user: {
          name: 'NGO',
          email: 'ngo@example.com',
        },
      },
    });

    expect(mapped).toEqual({
      id: 'report-1',
      period: 'Q1',
      year: 2024,
      reportUrl: 'https://example.com/report.pdf',
      ngoId: 'ngo-1',
      ngoName: 'NGO',
      ngoEmail: 'ngo@example.com',
      createdAt: createdAt.toISOString(),
    });
  });
});
