import { IsNumber, IsOptional } from 'class-validator';

export class CSRBudgetDto {
  @IsNumber()
  annualBudget!: number;

  @IsOptional()
  @IsNumber()
  allocated?: number;

  @IsOptional()
  @IsNumber()
  spent?: number;
}
