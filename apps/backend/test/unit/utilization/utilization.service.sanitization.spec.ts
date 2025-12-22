import { UtilizationService } from '../../../src/utilization/utilization.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('UtilizationService sanitisation', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: UtilizationService;

  beforeEach(() => {
    prisma = {
      campaign: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'campaign-1',
          ngo: { userId: 'ngo-user' },
        }),
      },
      milestone: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'milestone-1',
          campaignId: 'campaign-1',
        }),
      },
      utilizationReport: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new UtilizationService(prisma);
  });

  it('sanitises created report', async () => {
    prisma.utilizationReport.create.mockResolvedValueOnce({
      id: 'report-1',
      password: 'secret',
      amountUsed: 1000,
    } as any);

    const report = await service.submitReport('campaign-1', 'ngo-user', {
      amountUsed: 1000,
      description: 'Used for project',
    });

    expect(report).not.toHaveProperty('password');
  });

  it('sanitises list responses', async () => {
    prisma.utilizationReport.findMany.mockResolvedValueOnce([
      { id: 'report-1', accessToken: 'secret' },
    ] as any);

    const reports = await service.listReportsForCampaign('campaign-1');

    expect(reports[0]).not.toHaveProperty('accessToken');
  });
});
