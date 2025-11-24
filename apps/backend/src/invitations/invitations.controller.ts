import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { AcceptInviteDto } from './dto/accept-invite.dto';

@Controller()
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('admin/invite')
  inviteUser(@Body() dto: InviteUserDto, @CurrentUser() user: AuthUser) {
    return this.invitationsService.createInvite(dto, user.sub);
  }

  @Post('auth/accept-invite')
  acceptInvite(@Body() dto: AcceptInviteDto) {
    return this.invitationsService.acceptInvite(dto.token, dto.password);
  }
}
