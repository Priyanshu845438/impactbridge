import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CSRProgrammeService } from './csr-programme.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { AssignNgoDto } from './dto/assign-ngo.dto';

@Controller({
  path: 'companies/:companyId/csr-programmes',
  version: '1',
})
export class CSRProgrammeController {
  constructor(private readonly csrProgrammeService: CSRProgrammeService) {}

  @Get()
  list(@Param('companyId') companyId: string) {
    return this.csrProgrammeService.listByCompany(companyId);
  }

  @Get(':programmeId')
  detail(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
  ) {
    return this.csrProgrammeService.getByIdForCompany(companyId, programmeId);
  }

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateProgrammeDto,
  ) {
    return this.csrProgrammeService.create(companyId, dto);
  }

  @Patch(':programmeId')
  update(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
    @Body() dto: UpdateProgrammeDto,
  ) {
    return this.csrProgrammeService.update(programmeId, companyId, dto);
  }

  @Post(':programmeId/assign-ngo')
  assignNgo(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
    @Body() dto: AssignNgoDto,
  ) {
    return this.csrProgrammeService.assignNgo(programmeId, companyId, dto);
  }

  @Post(':programmeId/status')
  transitionStatus(
    @Param('companyId') companyId: string,
    @Param('programmeId') programmeId: string,
    @Body('status') status: string,
  ) {
    return this.csrProgrammeService.transitionStatus(
      programmeId,
      companyId,
      status,
    );
  }
}

