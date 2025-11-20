import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { GenerateReceiptDto } from './dto/generate-receipt.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post()
  generate(@Body() dto: GenerateReceiptDto) {
    return this.receiptsService.generateForDonation(dto);
  }
}
