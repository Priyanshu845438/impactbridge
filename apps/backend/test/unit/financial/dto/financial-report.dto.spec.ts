
import { validate } from 'class-validator';
import { FinancialReportDto } from '../../../../src/financial/dto/financial-report.dto';

describe('FinancialReportDto validation', () => {
  it('accepts a valid payload', async () => {
    const dto = Object.assign(new FinancialReportDto(), {
      period: 'Q1',
      year: 2025,
      reportUrl: 'https://example.com/report.pdf',
    });

    const result = await validate(dto);
    expect(result).toHaveLength(0);
  });

  it('rejects invalid year and malformed url', async () => {
    const dto = Object.assign(new FinancialReportDto(), {
      period: 'Q2',
      year: 1899,
      reportUrl: 'invalid-url',
    });

    const result = await validate(dto);
    expect(result.some((error) => error.property === 'year')).toBe(true);
    expect(result.some((error) => error.property === 'reportUrl')).toBe(true);
  });
});
