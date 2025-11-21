import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePublicDonationDto {
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  @IsNotEmpty()
  donorName!: string;

  @IsEmail()
  email!: string;
}
