import { IsEnum, IsNumber } from 'class-validator';

export class UpdateMilestoneStatusDto {
  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  status!: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

  @IsNumber()
  progressPercent!: number;
}
