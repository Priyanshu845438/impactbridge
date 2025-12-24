import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CSRReportsService } from './csr-reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';

@Controller({ path: 'admin/csr', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class CSRReportsController {
  constructor(private readonly csrReports: CSRReportsService) {}

  @Get('ngos/:id')
  getNGOCompliance(@Param('id') id: string) {
    return this.csrReports.getNGOCompliance(id);
  }

  @Get('companies/:id')
  getCompanyCompliance(@Param('id') id: string) {
    return this.csrReports.getCompanyCompliance(id);
  }
}
