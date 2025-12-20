import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveProjectDto {
  @IsOptional()
  @IsEnum(['APPROVED', 'REJECTED'], {
    message: 'status must be APPROVED or REJECTED',
  })
  status?: 'APPROVED' | 'REJECTED';

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}
