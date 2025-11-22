import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/types/auth-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: AuthUser) {
    const userId = user.sub;
    const profile = await this.userService.findById(userId);
    if (!profile) {
      throw new NotFoundException('User not found');
    }
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@CurrentUser() user: AuthUser, @Body() dto: UpdateUserDto) {
    const userId = user.sub;
    return this.userService.update(userId, dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const profile = await this.userService.findById(id);
    if (!profile) {
      throw new NotFoundException('User not found');
    }
    return profile;
  }
}
