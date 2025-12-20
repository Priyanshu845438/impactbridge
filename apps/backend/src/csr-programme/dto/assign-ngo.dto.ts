import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class AssignNgoDto {
  @IsString()
  @IsNotEmpty()
  ngoId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
