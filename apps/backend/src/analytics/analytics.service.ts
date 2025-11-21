import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from 'prisma/generated';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDonationStats() {
    const total = await this.prisma.donation.aggregate({
      _sum: { amount: true },
      _count: { amount: true },
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const weekStart = new Date(todayStart);
    weekStart.setDate(todayStart.getDate() - 7);

    const monthStart = new Date(todayStart);
    monthStart.setMonth(todayStart.getMonth() - 1);

    const [today, week, month] = await Promise.all([
      this.prisma.donation.aggregate({
        where: { donationDate: { gte: todayStart } },
        _sum: { amount: true },
        _count: { amount: true },
      }),
      this.prisma.donation.aggregate({
        where: { donationDate: { gte: weekStart } },
        _sum: { amount: true },
        _count: { amount: true },
      }),
      this.prisma.donation.aggregate({
        where: { donationDate: { gte: monthStart } },
        _sum: { amount: true },
        _count: { amount: true },
      }),
    ]);

    return {
      totalDonations: total._count.amount ?? 0,
      totalAmount: total._sum.amount ?? 0,
      today: {
        count: today._count.amount ?? 0,
        amount: today._sum.amount ?? 0,
      },
      last7Days: {
        count: week._count.amount ?? 0,
        amount: week._sum.amount ?? 0,
      },
      last30Days: {
        count: month._count.amount ?? 0,
        amount: month._sum.amount ?? 0,
      },
    };
  }

  async getCampaignStats() {
    const [total, publicCampaigns, draftCampaigns] = await Promise.all([
      this.prisma.campaign.count(),
      this.prisma.campaign.count({ where: { status: 'PUBLIC' } }),
      this.prisma.campaign.count({ where: { status: 'DRAFT' } }),
    ]);

    return {
      totalCampaigns: total,
      publicCampaigns,
      draftCampaigns,
    };
  }

  async getUserStats() {
    const [ngos, companies, donors] = await Promise.all([
      this.prisma.user.count({ where: { role: Role.NGO } }),
      this.prisma.user.count({ where: { role: Role.COMPANY } }),
      this.prisma.user.count({ where: { role: Role.DONOR } }),
    ]);

    return {
      ngos,
      companies,
      donors,
    };
  }
}
