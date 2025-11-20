import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDonation(userId: string, campaignId: string, dto: CreateDonationDto) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, status: 'PUBLIC' },
    });

    if (!campaign) {
      throw new Error('Campaign not found or not active');
    }

    const donation = await this.prisma.donation.create({
      data: {
        amount: dto.amount,
        paymentRef: dto.paymentRef,
        paymentMode: dto.isForeignDonor ? 'FOREIGN' : 'DOMESTIC',
        campaignId,
        donorId: await this.getDonorProfileId(userId),
        companyId: await this.getCompanyProfileId(userId),
      },
    });

    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        raisedAmount: campaign.raisedAmount + dto.amount,
      },
    });

    return donation;
  }

  private async getDonorProfileId(userId: string) {
    const profile = await this.prisma.donorProfile.findUnique({ where: { userId } });
    return profile?.id ?? null;
  }

  private async getCompanyProfileId(userId: string) {
    const profile = await this.prisma.companyProfile.findUnique({ where: { userId } });
    return profile?.id ?? null;
  }

  async getMyDonations(userId: string) {
    return this.prisma.donation.findMany({
      where: {
        OR: [
          { donor: { userId } },
          { company: { userId } },
        ],
      },
      include: {
        campaign: true,
      },
      orderBy: { donationDate: 'desc' },
    });
  }

  async getNGOCampaignDonations(userId: string) {
    const profile = await this.prisma.nGOProfile.findUnique({ where: { userId } });
    if (!profile) return [];

    return this.prisma.donation.findMany({
      where: {
        campaign: { ngoId: profile.id },
      },
      include: {
        campaign: true,
        donor: {
          include: { user: { select: { name: true, email: true } } },
        },
        company: {
          include: { user: { select: { name: true, email: true } } },
        },
      },
      orderBy: { donationDate: 'desc' },
    });
  }

  async getAllDonations() {
    return this.prisma.donation.findMany({
      include: {
        campaign: true,
        donor: {
          include: { user: { select: { name: true, email: true } } },
        },
        company: {
          include: { user: { select: { name: true, email: true } } },
        },
      },
      orderBy: { donationDate: 'desc' },
    });
  }
}
