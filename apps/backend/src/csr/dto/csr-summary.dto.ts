import { IsString, Matches } from 'class-validator';

const FINANCIAL_YEAR_REGEX = /^(20\d{2})-(20\d{2})$/;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class CSRSummaryRequestDto {
  @IsString()
  @Matches(UUID_REGEX, { message: 'companyId must be a valid UUID' })
  companyId!: string;

  @IsString()
  @Matches(FINANCIAL_YEAR_REGEX, {
    message: 'financialYear must follow YYYY-YYYY format',
  })
  financialYear!: string;
}
