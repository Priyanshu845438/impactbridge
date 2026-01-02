import { Module } from '@nestjs/common';
import { CSRProgrammeService } from './csr-programme.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CSRProgrammeController } from './csr-programme.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CSRProgrammeController],
  providers: [CSRProgrammeService],
  exports: [CSRProgrammeService],
})
export class CSRProgrammeModule {}
