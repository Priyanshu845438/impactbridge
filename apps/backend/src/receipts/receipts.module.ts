import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReceiptsService],
  controllers: [ReceiptsController],
})
export class ReceiptsModule {}
