import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentUploadDto } from './dto/document-upload.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadForNGO(ngoProfileId: string, dto: DocumentUploadDto) {
    return this.prisma.document.create({
      data: {
        ngoId: ngoProfileId,
        type: dto.type,
        title: dto.type,
        url: dto.fileUrl,
      },
    });
  }
}
