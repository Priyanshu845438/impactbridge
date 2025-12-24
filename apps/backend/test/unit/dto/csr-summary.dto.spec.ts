import { validate } from 'class-validator';
import { CSRSummaryRequestDto } from '../../../src/csr/dto/csr-summary.dto';

describe('CSRSummaryRequestDto validation', () => {
  it('rejects invalid companyId and financialYear', async () => {
    const dto = new CSRSummaryRequestDto();
    dto.companyId = 'bad-id';
    dto.financialYear = '2024';

    const errors = await validate(dto);
    expect(errors).toHaveLength(2);
  });

  it('accepts valid values', async () => {
    const dto = new CSRSummaryRequestDto();
    dto.companyId = '123e4567-e89b-12d3-a456-426614174000';
    dto.financialYear = '2024-2025';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
