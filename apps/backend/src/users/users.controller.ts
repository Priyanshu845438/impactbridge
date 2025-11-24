import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { AuthUser } from '../auth/types/auth-user.type';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user (legacy admin)' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change my password' })
  @Post('change-password')
  changePassword(
    @CurrentUser() user: AuthUser,
    @Body() dto: ChangePasswordDto,
  ) {
    const userId = user.sub;
    return this.usersService.changePassword(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY)
  @Get('ngos/:id')
  async getNGO(@Param('id') id: string) {
    const ngo = await this.usersService.getNGOById(id);
    if (!ngo) {
      throw new NotFoundException('NGO not found');
    }
    return ngo;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.NGO)
  @Get('companies/:id')
  async getCompany(@Param('id') id: string) {
    const company = await this.usersService.getCompanyById(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY)
  @Get('ngos-with-campaigns')
  getNGOsWithCampaigns() {
    return this.usersService.getNGOsWithCampaigns();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('companies-with-reports')
  getCompaniesWithReports() {
    return this.usersService.getCompaniesWithDonations();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('/admin/ngos')
  getAllNGOProfiles() {
    return this.usersService.getAllNGOProfiles();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('/admin/companies')
  getAllCompanyProfiles() {
    return this.usersService.getAllCompanyProfiles();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get('/admin/donors')
  getAllDonorProfiles() {
    return this.usersService.getAllDonorProfiles();
  }
}
