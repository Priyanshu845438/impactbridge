import {
  IsString,
  IsUUID,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class RequestApprovalDto {
  @Matches(UUID_REGEX, { message: 'companyId must be a valid UUID' })
  companyId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}
