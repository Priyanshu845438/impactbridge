import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post('ngo')
  async upsertNGOAddress(@CurrentUser() user: any, @Body() dto: AddressDto) {
    const profile = await this.usersService.getNGOById(user?.sub);
    return this.addressService.createOrUpdateForNGO(profile!.id, dto);
  }
}
