import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CreatePublicDonationDto } from '../campaigns/dto/create-public-donation.dto';
import { ActivityLogService } from '../activity/activity-log.service';
import { CSRService } from '../csr/csr.service';

@Injectable()
export class DonationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
    private readonly csrService: CSRService,
  ) {}

  async createDonation(
    userId: string,
    campaignId: string,
    dto: CreateDonationDto,
  ) {
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

    const companyProfileId = await this.getCompanyProfileId(userId);
    if (companyProfileId) {
      await this.csrService.updateSpent(companyProfileId, dto.amount);
    }

    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        raisedAmount: campaign.raisedAmount + dto.amount,
      },
    });

    await this.activityLog.log(userId, 'DONATION_CREATED', {
      campaignId,
      amount: dto.amount,
      donationId: donation.id,
    });

    return donation;
  }

  private async getDonorProfileId(userId: string) {
    const profile = await this.prisma.donorProfile.findUnique({
      where: { userId },
    });
    return profile?.id ?? null;
  }

  private async getCompanyProfileId(userId: string) {
    const profile = await this.prisma.companyProfile.findUnique({
      where: { userId },
    });
    return profile?.id ?? null;
  }

  async getMyDonations(userId: string) {
    return this.prisma.donation.findMany({
      where: {
        OR: [{ donor: { userId } }, { company: { userId } }],
      },
      include: {
        campaign: true,
      },
      orderBy: { donationDate: 'desc' },
    });
  }

  async getNGOCampaignDonations(userId: string) {
    const profile = await this.prisma.nGOProfile.findUnique({
      where: { userId },
    });
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

  async createPublicDonation(campaignId: string, dto: CreatePublicDonationDto) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, status: 'PUBLIC' },
    });

    if (!campaign) {
      throw new Error('Campaign not found or not public');
    }

    const donation = await this.prisma.donation.create({
      data: {
        campaignId,
        amount: dto.amount,
        paymentRef: dto.email,
        paymentMode: 'PUBLIC_FORM',
        donationDate: new Date(),
      },
    });

    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        raisedAmount: campaign.raisedAmount + dto.amount,
      },
    });

    await this.activityLog.log(null, 'PUBLIC_DONATION_CREATED', {
      campaignId,
      amount: dto.amount,
      donationId: donation.id,
      email: dto.email,
    });

    return donation;
  }
}
