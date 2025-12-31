import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

    const users = await this.usersService.findAll(limit, offset);
    return users ?? [];
  }
}
