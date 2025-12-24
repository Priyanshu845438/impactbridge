import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class AssignNgoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(UUID_REGEX, { message: 'ngoId must be a valid UUID' })
  ngoId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
