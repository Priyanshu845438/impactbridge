import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthUser } from '../auth/types/auth-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({ path: 'users', version: '1' })
export class UserController {
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

  // Admin/List routes
  @Get()
  async findAll(
    @Query('limit') limitParam?: string,
    @Query('offset') offsetParam?: string,
  ) {
    const limit =
      Number.isFinite(Number(limitParam)) && Number(limitParam) > 0
        ? Number(limitParam)
        : 25;
    const offset =
      Number.isFinite(Number(offsetParam)) && Number(offsetParam) >= 0
        ? Number(offsetParam)
        : 0;

    return this.userService.findMany({ limit, offset });
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Should ideally have RolesGuard(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
