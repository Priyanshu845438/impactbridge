import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FinancialService } from './financial.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { FinancialReportDto } from './dto/financial-report.dto';
import { UserService } from '../user/user.service';
import type { FinancialReportResponse } from './types/financial-report-response.type';

@Controller({ path: 'financial', version: '1' })
export class FinancialController {
  constructor(
    private readonly financialService: FinancialService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post('ngo/upload')
  async uploadReport(
    @CurrentUser() user: AuthUser,
    @Body() dto: FinancialReportDto,
  ) {
    const profile = await this.userService.getNGOProfileByUserId(user.sub);
    if (!profile) {
      throw new ForbiddenException('NGO profile not found for user');
    }

    return this.financialService.uploadReport(profile.id, dto, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Get('ngo/my-reports')
  async getMyReports(@CurrentUser() user: AuthUser) {
    const profile = await this.userService.getNGOProfileByUserId(user.sub);
    if (!profile) {
      throw new ForbiddenException('NGO profile not found for user');
    }
    return this.financialService.getReportsForNGO(profile.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('admin/ngo/:id')
  async getReportsForNGO(
    @Param('id') id: string,
  ): Promise<FinancialReportResponse[]> {
    const reports = await this.financialService.getReportsForNGOId(id);
    return reports.map((report) =>
      this.financialService.mapAdminReport(report),
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('admin/all')
  async getAllReports(): Promise<FinancialReportResponse[]> {
    const reports = await this.financialService.getReportsForAdmin();
    return reports.map((report) =>
      this.financialService.mapAdminReport(report),
    );
  }
}
