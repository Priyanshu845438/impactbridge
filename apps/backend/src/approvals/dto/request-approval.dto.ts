import { IsString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class RequestApprovalDto {
  @IsUUID()
  companyId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}
