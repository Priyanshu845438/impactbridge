import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ApproveProjectDto {
  @IsEnum(['PENDING', 'APPROVED', 'REJECTED'])
  status!: 'PENDING' | 'APPROVED' | 'REJECTED';

  @IsOptional()
  @IsString()
  remarks?: string;
}
