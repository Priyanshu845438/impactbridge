import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CSRReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getNGOCompliance(userId: string) {
    const ngo = await this.prisma.nGOProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        bankDetails: true,
        documents: true,
        campaigns: true,
      },
    });

    if (!ngo) {
      throw new NotFoundException('NGO profile not found');
    }

    return ngo;
  }

  async getCompanyCompliance(userId: string) {
    const company = await this.prisma.companyProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        bankDetails: true,
        documents: true,
        donations: true,
      },
    });

    if (!company) {
      throw new NotFoundException('Company profile not found');
    }

    return company;
  }
}
