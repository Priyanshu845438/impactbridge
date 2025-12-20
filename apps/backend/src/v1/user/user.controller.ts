import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import type { AuthUser } from '../../auth/types/auth-user.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UserService } from '../../user/user.service';
import { UpdateUserDto } from '../../user/dto/update-user.dto';

@Controller('api/v1/users')
export class V1UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: AuthUser) {
    const profile = await this.userService.findById(user.sub);
    if (!profile) {
      throw new NotFoundException('User not found');
    }
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(@CurrentUser() user: AuthUser, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.sub, dto);
  }
}
