import { IsEnum, IsString, IsUrl } from 'class-validator';
import { DocumentType } from 'prisma/generated';

export class DocumentUploadDto {
  @IsEnum(DocumentType)
  type!: DocumentType;

  @IsString()
  @IsUrl()
  fileUrl!: string;
}
