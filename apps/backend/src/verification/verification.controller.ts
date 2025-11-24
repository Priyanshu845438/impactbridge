import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { VerifyNGODto } from './dto/verify-ngo.dto';

@Controller('admin/verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('ngos/:id/approve')
  approve(@Param('id') id: string, @Body() dto: VerifyNGODto) {
    return this.verificationService.approve(id, dto.remarks);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('ngos/:id/reject')
  reject(@Param('id') id: string, @Body() dto: VerifyNGODto) {
    return this.verificationService.reject(id, dto.remarks);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('ngos/:id/pending')
  pending(@Param('id') id: string) {
    return this.verificationService.markPending(id);
  }
}
