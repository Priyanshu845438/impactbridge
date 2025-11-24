import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMilestoneDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsDateString()
  targetDate!: string;

  @IsNumber()
  budget!: number;
}
