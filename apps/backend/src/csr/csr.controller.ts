import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CSRService } from './csr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { CSRBudgetDto } from './dto/csr-budget.dto';
import { CSRSummaryRequestDto } from './dto/csr-summary.dto';

@Controller({ path: 'csr', version: '1' })
export class CSRController {
  constructor(private readonly csrService: CSRService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Post('company/budget')
  async upsertBudget(@CurrentUser() user: AuthUser, @Body() dto: CSRBudgetDto) {
    const profile = await this.csrService.getCompanyProfileForUser(user.sub);
    return this.csrService.upsertCSRBudget(profile.id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Get('company/status')
  async getStatus(@CurrentUser() user: AuthUser) {
    const profile = await this.csrService.getCompanyProfileForUser(user.sub);
    return this.csrService.getCSRStatus(profile.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Post('company/spent')
  async updateSpent(@CurrentUser() user: AuthUser, @Body() dto: CSRBudgetDto) {
    const profile = await this.csrService.getCompanyProfileForUser(user.sub);
    return this.csrService.updateSpent(profile.id, dto.spent ?? 0);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY, UserRole.SUPER_ADMIN)
  @Post('summary')
  generateSummary(@Body() dto: CSRSummaryRequestDto) {
    return this.csrService.generateSummary(dto);
  }
}
