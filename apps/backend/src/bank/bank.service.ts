import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BankDetailsDto } from './dto/bank-details.dto';

@Injectable()
export class BankService {
  constructor(private readonly prisma: PrismaService) {}

  async updateNGOBankDetails(ngoProfileId: string, dto: BankDetailsDto) {
    const existing = await this.prisma.bankDetail.findFirst({
      where: { ngoId: ngoProfileId },
    });

    const data = {
      accountHolder: dto.accountHolder,
      accountNumber: dto.accountNumber,
      ifsc: dto.ifscCode,
      bankName: dto.bankName,
      branch: dto.branchName,
    };

    const record = existing
      ? await this.prisma.bankDetail.update({
          where: { id: existing.id },
          data,
        })
      : await this.prisma.bankDetail.create({
          data: {
            ngoId: ngoProfileId,
            ...data,
          },
        });

    const { accountNumber, ...rest } = record;
    return {
      ...rest,
      accountNumberMasked: accountNumber.replace(/.(?=.{4})/g, '*'),
    };
  }
}
