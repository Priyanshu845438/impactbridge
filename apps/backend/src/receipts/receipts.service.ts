import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateReceiptDto } from './dto/generate-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(private readonly prisma: PrismaService) {}

  async generateForDonation(dto: GenerateReceiptDto) {
    const donation = await this.prisma.donation.findUnique({
      where: { id: dto.donationId },
    });

    if (!donation) {
      throw new Error('Donation not found');
    }

    return this.prisma.donation.update({
      where: { id: dto.donationId },
      data: {
        receiptUrl: dto.receiptUrl,
      },
    });
  }
}
