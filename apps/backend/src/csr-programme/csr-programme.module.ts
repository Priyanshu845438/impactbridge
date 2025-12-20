import { Module } from '@nestjs/common';
import { CSRProgrammeService } from './csr-programme.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CSRProgrammeService],
  exports: [CSRProgrammeService],
})
export class CSRProgrammeModule {}
