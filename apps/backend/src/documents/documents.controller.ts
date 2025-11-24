import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentUploadDto } from './dto/document-upload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import type { AuthUser } from '../auth/types/auth-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.NGO)
  @Post('ngo')
  async uploadForNGO(
    @CurrentUser() user: AuthUser,
    @Body() dto: DocumentUploadDto,
  ) {
    const userId = user.sub;
    const profile = await this.usersService.getNGOProfileByUserId(userId);

    if (!profile) {
      throw new NotFoundException('NGO profile not found');
    }

    return this.documentsService.uploadForNGO(profile.id, dto);
  }
}
