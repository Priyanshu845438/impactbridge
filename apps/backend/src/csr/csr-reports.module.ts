import { Module } from '@nestjs/common';
import { CSRReportsService } from './csr-reports.service';
import { CSRReportsController } from './csr-reports.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CSRReportsService],
  controllers: [CSRReportsController],
  exports: [CSRReportsService],
})
export class CSRReportsModule {}
