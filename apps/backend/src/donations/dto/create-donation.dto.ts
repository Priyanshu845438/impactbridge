import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateDonationDto {
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  @IsNotEmpty()
  paymentRef!: string;

  @IsBoolean()
  csrEligible!: boolean;

  @IsBoolean()
  isForeignDonor!: boolean;
}
