import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateReceiptDto } from './dto/generate-receipt.dto';
import { ActivityLogService } from '../activity/activity-log.service';

@Injectable()
export class ReceiptsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async generateForDonation(dto: GenerateReceiptDto) {
    const donation = await this.prisma.donation.findUnique({
      where: { id: dto.donationId },
    });

    if (!donation) {
      throw new Error('Donation not found');
    }

    const updated = await this.prisma.donation.update({
      where: { id: dto.donationId },
      data: {
        receiptUrl: dto.receiptUrl,
      },
    });

    await this.activityLog.log(donation.companyId ?? donation.donorId ?? null, 'RECEIPT_GENERATED', {
      donationId: donation.id,
      receiptUrl: dto.receiptUrl,
    });

    return updated;
  }
}
