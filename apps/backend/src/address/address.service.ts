import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdateForNGO(ngoProfileId: string, dto: AddressDto) {
    const existing = await this.prisma.address.findFirst({
      where: { ngoId: ngoProfileId },
    });

    const data = {
      line1: dto.line1,
      line2: dto.line2,
      city: dto.district,
      state: dto.state,
      postalCode: dto.pincode,
      country: dto.country,
    };

    if (existing) {
      return this.prisma.address.update({
        where: { id: existing.id },
        data,
      });
    }

    return this.prisma.address.create({
      data: {
        ngoId: ngoProfileId,
        addressType: 'REGISTERED',
        ...data,
      },
    });
  }
}
