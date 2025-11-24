import { IsEnum, IsOptional, IsString } from 'class-validator';

export class VerifyNGODto {
  @IsEnum(['PENDING', 'APPROVED', 'REJECTED'])
  status!: 'PENDING' | 'APPROVED' | 'REJECTED';

  @IsOptional()
  @IsString()
  remarks?: string;
}
