import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AdminAnalyticsScopeQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Filter analytics to a specific company' })
  companyId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Filter analytics to a specific NGO' })
  ngoId?: string;
}
