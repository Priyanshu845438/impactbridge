import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async markPending(ngoProfileId: string) {
    return this.updateStatus(ngoProfileId, 'PENDING');
  }

  async approve(ngoProfileId: string, remarks?: string) {
    return this.updateStatus(ngoProfileId, 'APPROVED', remarks);
  }

  async reject(ngoProfileId: string, remarks?: string) {
    return this.updateStatus(ngoProfileId, 'REJECTED', remarks);
  }

  private async updateStatus(
    ngoProfileId: string,
    status: 'PENDING' | 'APPROVED' | 'REJECTED',
    remarks?: string,
  ) {
    const profile = await this.prisma.nGOProfile.findUnique({
      where: { id: ngoProfileId },
    });

    if (!profile) {
      throw new NotFoundException('NGO profile not found');
    }

    return this.prisma.nGOProfile.update({
      where: { id: ngoProfileId },
      data: {
        verificationStatus: status,
        verificationRemarks: remarks,
      },
    });
  }
}
