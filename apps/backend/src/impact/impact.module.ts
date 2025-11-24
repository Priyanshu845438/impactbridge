import { Module } from '@nestjs/common';
import { ImpactController } from './impact.controller';
import { ImpactService } from './impact.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImpactController],
  providers: [ImpactService],
  exports: [ImpactService],
})
export class ImpactModule {}
