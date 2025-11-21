import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankDetailsDto } from './dto/bank-details.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('bank')
export class BankController {
  constructor(
    private readonly bankService: BankService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post('ngo')
  async upsertNGOBank(@CurrentUser() user: any, @Body() dto: BankDetailsDto) {
    const profile = await this.usersService.getNGOProfileByUserId(user?.id);
    return this.bankService.updateNGOBankDetails(profile!.id, dto);
  }
}
