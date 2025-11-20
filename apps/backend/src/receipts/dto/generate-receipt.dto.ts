import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateReceiptDto {
  @IsString()
  @IsNotEmpty()
  donationId!: string;

  @IsString()
  @IsNotEmpty()
  receiptUrl!: string;
}
