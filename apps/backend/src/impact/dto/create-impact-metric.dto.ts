import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateImpactMetricDto {
  @IsString()
  name!: string;

  @IsNumber()
  value!: number;

  @IsString()
  unit!: string;

  @IsOptional()
  @IsString()
  milestoneId?: string;
}
