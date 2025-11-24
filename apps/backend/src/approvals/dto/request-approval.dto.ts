import { IsString } from 'class-validator';

export class RequestApprovalDto {
  @IsString()
  companyId!: string;

  @IsString()
  remarks!: string;
}
