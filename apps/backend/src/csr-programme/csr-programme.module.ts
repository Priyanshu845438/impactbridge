import { Module } from '@nestjs/common';
import { CSRProgrammeService } from './csr-programme.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CSRProgrammeController } from './csr-programme.controller';
import { ActivityLogModule } from '../activity/activity-log.module';

@Module({
  imports: [PrismaModule, ActivityLogModule],
  controllers: [CSRProgrammeController],
  providers: [CSRProgrammeService],
  exports: [CSRProgrammeService],
})
export class CSRProgrammeModule {}
