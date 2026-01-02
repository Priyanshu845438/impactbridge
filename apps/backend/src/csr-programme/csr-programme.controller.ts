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

@Controller({ path: 'csr-programmes', version: '1' })
export class CSRProgrammeController {
  constructor(private readonly csrProgrammeService: CSRProgrammeService) {}

  @Get()
  list() {
    return this.csrProgrammeService.list();
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.csrProgrammeService.detail(id);
  }

  @Post()
  create(@Body() dto: CreateProgrammeDto) {
    return this.csrProgrammeService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProgrammeDto) {
    return this.csrProgrammeService.update(id, dto);
  }

  @Post(':id/assign-ngo')
  assignNgo(@Param('id') id: string, @Body() dto: AssignNgoDto) {
    return this.csrProgrammeService.assignNgo(id, dto);
  }

  @Post(':id/status')
  transitionStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.csrProgrammeService.transitionStatus(id, status);
  }
}

