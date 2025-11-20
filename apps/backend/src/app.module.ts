import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { BankModule } from './bank/bank.module';
import { DocumentsModule } from './documents/documents.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    UserModule,
    AddressModule,
    BankModule,
    DocumentsModule,
    CampaignsModule,
    DonationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
