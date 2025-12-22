import { CSRReportsService } from '../../../src/csr/csr-reports.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('CSRReportsService sanitisation', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: CSRReportsService;

  beforeEach(() => {
    prisma = {
      nGOProfile: {
        findUnique: jest.fn(),
      },
      companyProfile: {
        findUnique: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new CSRReportsService(prisma);
  });

  it('sanitises nested relations for NGO compliance', async () => {
    prisma.nGOProfile.findUnique.mockResolvedValueOnce({
      id: 'ngo-profile',
      documents: [{ id: 'doc-1', accessToken: 'secret' }],
      bankDetails: [{ id: 'bank-1', password: 'bank-pass' }],
      campaigns: [
        {
          id: 'campaign-1',
          refreshToken: 'token',
        },
      ],
      user: {
        id: 'ngo-user',
        name: 'NGO',
        email: 'ngo@example.com',
        password: 'hash',
      },
    } as any);

    const result = await service.getNGOCompliance('ngo-user');

    expect(result?.user).not.toHaveProperty('password');
    expect(result?.documents[0]).not.toHaveProperty('accessToken');
    expect(result?.campaigns[0]).not.toHaveProperty('refreshToken');
  });

  it('sanitises nested relations for company compliance', async () => {
    prisma.companyProfile.findUnique.mockResolvedValueOnce({
      id: 'company-profile',
      documents: [{ id: 'doc-2', verificationToken: 'code' }],
      bankDetails: [{ id: 'bank-2', refreshToken: 'token' }],
      donations: [{ id: 'donation-1', password: 'donor secret' }],
      user: {
        id: 'company-user',
        email: 'company@example.com',
        password: 'hash',
      },
    } as any);

    const result = await service.getCompanyCompliance('company-user');

    expect(result?.user).not.toHaveProperty('password');
    expect(result?.documents[0]).not.toHaveProperty('verificationToken');
    expect(result?.bankDetails[0]).not.toHaveProperty('refreshToken');
    expect(result?.donations[0]).not.toHaveProperty('password');
  });
});
