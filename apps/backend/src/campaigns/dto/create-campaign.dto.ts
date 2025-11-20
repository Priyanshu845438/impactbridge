import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';
import { CampaignCategory } from 'prisma/generated';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description!: string;

  @IsEnum(CampaignCategory)
  category!: CampaignCategory;

  @IsNumber()
  @Min(1)
  targetAmount!: number;

  @IsBoolean()
  isPublic!: boolean;
}
