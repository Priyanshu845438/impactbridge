import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApprovalDecisionStatus } from './approval-status.enum';

export class ApproveProjectDto {
  @IsOptional()
  @IsEnum(ApprovalDecisionStatus, {
    message: 'status must be APPROVED or REJECTED',
  })
  status?: ApprovalDecisionStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}
