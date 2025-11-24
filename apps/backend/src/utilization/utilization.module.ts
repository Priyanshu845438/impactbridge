import { Module } from '@nestjs/common';
import { UtilizationController } from './utilization.controller';
import { UtilizationService } from './utilization.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UtilizationController],
  providers: [UtilizationService],
  exports: [UtilizationService],
})
export class UtilizationModule {}
