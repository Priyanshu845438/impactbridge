import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CSRProgrammeService } from './csr-programme.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { AssignNgoDto } from './dto/assign-ngo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { RequestContextService } from '../common/request-context/request-context.service';

@Controller({
  path: 'companies/:companyId/csr-programmes',
  version: '1',
})
export class CSRProgrammeController {
  constructor(private readonly csrProgrammeService: CSRProgrammeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Get()
  list(@Param('companyId') companyId: string) {
    return this.csrProgrammeService.listByCompany(companyId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Get(':programmeId')
  detail(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
  ) {
    return this.csrProgrammeService.getByIdForCompany(companyId, programmeId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateProgrammeDto,
  ) {
    const actorId = RequestContextService.getActorId();
    return this.csrProgrammeService.create(companyId, dto, { actorId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Patch(':programmeId')
  update(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
    @Body() dto: UpdateProgrammeDto,
  ) {
    const actorId = RequestContextService.getActorId();
    return this.csrProgrammeService.update(programmeId, companyId, dto, {
      actorId,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Post(':programmeId/assign-ngo')
  assignNgo(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
    @Body() dto: AssignNgoDto,
  ) {
    const actorId = RequestContextService.getActorId();
    return this.csrProgrammeService.assignNgo(programmeId, companyId, dto, {
      actorId,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY)
  @Post(':programmeId/status')
  transitionStatus(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
    @Body('status') status: string,
  ) {
    const actorId = RequestContextService.getActorId();
    return this.csrProgrammeService.transitionStatus(
      programmeId,
      companyId,
      status,
      { actorId },
    );
  }
}
