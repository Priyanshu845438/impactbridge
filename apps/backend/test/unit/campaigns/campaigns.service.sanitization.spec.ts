import { CampaignsService } from '../../../src/campaigns/campaigns.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('CampaignsService sanitisation', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: CampaignsService;

  beforeEach(() => {
    prisma = {
      campaign: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      nGOProfile: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'ngo-profile',
          verificationStatus: 'APPROVED',
        }),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new CampaignsService(prisma, {
      log: jest.fn(),
    } as any);
  });

  it('sanitises nested NGO data in public campaigns', async () => {
    prisma.campaign.findMany.mockResolvedValueOnce([
      {
        id: 'campaign-1',
        title: 'Public',
        ngo: {
          id: 'ngo-1',
          missionStatement: 'Mission',
          user: {
            id: 'ngo-user',
            email: 'ngo@example.com',
            password: 'hash',
          },
        },
      },
    ] as any);

    const campaigns = await service.getPublicCampaigns();

    expect(campaigns[0].ngo.user).not.toHaveProperty('password');
  });

  it('sanitises single campaign lookup', async () => {
    prisma.campaign.findFirst.mockResolvedValueOnce({
      id: 'campaign-1',
      ngo: {
        id: 'ngo-1',
        user: {
          id: 'ngo-user',
          email: 'ngo@example.com',
          password: 'hash',
        },
      },
    } as any);

    const campaign = await service.getCampaignById('campaign-1');

    expect(campaign?.ngo.user).not.toHaveProperty('password');
  });
});
