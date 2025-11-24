import { Module } from '@nestjs/common';
import { CSRController } from './csr.controller';
import { CSRService } from './csr.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CSRController],
  providers: [CSRService],
  exports: [CSRService],
})
export class CSRModule {}
