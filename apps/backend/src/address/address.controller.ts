import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';
import type { AuthUser } from '../auth/types/auth-user.type';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post('ngo')
  async upsertNGOAddress(
    @CurrentUser() user: AuthUser,
    @Body() dto: AddressDto,
  ) {
    const userId = user.sub;
    const profile = await this.usersService.getNGOProfileByUserId(userId);

    if (!profile) {
      throw new NotFoundException('NGO profile not found');
    }

    const ownerId = (profile as Record<string, unknown>).userId as
      | string
      | undefined;
    const embeddedUserId =
      (profile as { user?: { id?: string } }).user?.id ?? undefined;
    const resolvedOwnerId = ownerId ?? embeddedUserId;

    if (resolvedOwnerId && resolvedOwnerId !== userId) {
      throw new ForbiddenException('You cannot modify this NGO profile');
    }

    return this.addressService.createOrUpdateForNGO(profile.id, dto);
  }
}
