import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BankDetailsDto {
  @IsString()
  @IsNotEmpty()
  accountHolder!: string;

  @IsString()
  @IsNotEmpty()
  accountNumber!: string;

  @IsString()
  @IsNotEmpty()
  ifscCode!: string;

  @IsString()
  @IsNotEmpty()
  bankName!: string;

  @IsOptional()
  @IsString()
  branchName?: string;
}
