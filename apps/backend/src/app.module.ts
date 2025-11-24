import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { BankModule } from './bank/bank.module';
import { DocumentsModule } from './documents/documents.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DonationsModule } from './donations/donations.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { ActivityLogModule } from './activity/activity-log.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CSRReportsModule } from './csr/csr-reports.module';
import { InvitationsModule } from './invitations/invitations.module';
import { VerificationModule } from './verification/verification.module';
import { CSRModule } from './csr/csr.module';
import { FinancialModule } from './financial/financial.module';
import { MilestonesModule } from './milestones/milestones.module';
import { ImpactModule } from './impact/impact.module';
import { UtilizationModule } from './utilization/utilization.module';

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
    ReceiptsModule,
    ActivityLogModule,
    AnalyticsModule,
    CSRReportsModule,
    InvitationsModule,
    VerificationModule,
    CSRModule,
    FinancialModule,
    MilestonesModule,
    ImpactModule,
    UtilizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
