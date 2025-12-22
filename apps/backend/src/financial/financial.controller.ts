import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { FinancialReportDto } from './dto/financial-report.dto';
import { UsersService } from '../users/users.service';

@Controller('financial')
export class FinancialController {
  constructor(
    private readonly financialService: FinancialService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post('ngo/upload')
  async uploadReport(
    @CurrentUser() user: AuthUser,
    @Body() dto: FinancialReportDto,
  ) {
    const profile = await this.usersService.getNGOProfileByUserId(user.sub);
    if (!profile) {
      throw new Error('NGO profile not found');
    }
    return this.financialService.uploadReport(profile.id, dto, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Get('ngo/my-reports')
  async getMyReports(@CurrentUser() user: AuthUser) {
    const profile = await this.usersService.getNGOProfileByUserId(user.sub);
    if (!profile) {
      throw new Error('NGO profile not found');
    }
    return this.financialService.getReportsForNGO(profile.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('admin/ngo/:id')
  getReportsForNGO(@Param('id') id: string) {
    return this.financialService.getReportsForNGOId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('admin/all')
  getAllReports() {
    return this.financialService.getReportsForAdmin();
  }
}
