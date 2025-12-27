import { UsersService } from '../../../src/users/users.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('UsersService sanitisation', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: UsersService;

  beforeEach(() => {
    prisma = {
      user: {
        findMany: jest.fn(),
      },
      nGOProfile: {
        findMany: jest.fn(),
      },
      companyProfile: {
        findMany: jest.fn(),
      },
      donorProfile: {
        findMany: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new UsersService(prisma);
  });

  it('removes sensitive fields from NGOs with campaigns', async () => {
    prisma.user.findMany.mockResolvedValueOnce([
      {
        id: 'ngo-user',
        password: 'hashed',
        campaigns: [
          {
            id: 'campaign-1',
            password: 'nested-secret',
            donors: [
              {
                id: 'donor-1',
                refreshToken: 'token',
              },
            ],
          },
        ],
      },
    ] as any);

    const result = await service.getNGOsWithCampaigns();

    expect(result.data[0]).not.toHaveProperty('password');
    expect(result.data[0].campaigns[0]).not.toHaveProperty('password');
    expect(result.data[0].campaigns[0].donors[0]).not.toHaveProperty(
      'refreshToken',
    );
  });

  it('sanitises nested users inside NGO profiles', async () => {
    prisma.nGOProfile.findMany.mockResolvedValueOnce([
      {
        id: 'ngo-profile',
        user: {
          id: 'ngo-user',
          email: 'ngo@example.com',
          password: 'hash',
        },
        documents: [{ id: 'doc-1', verificationToken: 'code' }],
        bankDetails: [{ id: 'bank-1', accessToken: 'secret' }],
        addresses: [],
      },
    ] as any);

    const result = await service.getAllNGOProfiles();

    expect(result[0].user).not.toHaveProperty('password');
    expect(result[0].documents[0]).not.toHaveProperty('verificationToken');
    expect(result[0].bankDetails[0]).not.toHaveProperty('accessToken');
  });

  it('sanitises nested users inside company and donor profiles', async () => {
    prisma.companyProfile.findMany.mockResolvedValueOnce([
      {
        id: 'company-profile',
        user: { id: 'company-user', password: 'hashed' },
        bankDetails: [{ id: 'bank-2', refreshToken: 'rt' }],
        documents: [],
        addresses: [],
      },
    ] as any);

    prisma.donorProfile.findMany.mockResolvedValueOnce([
      {
        id: 'donor-profile',
        user: { id: 'donor-user', password: 'hashed' },
        addresses: [{ id: 'addr-1', verificationToken: 'code' }],
      },
    ] as any);

    const companies = await service.getAllCompanyProfiles();
    const donors = await service.getAllDonorProfiles();

    expect(companies[0].user).not.toHaveProperty('password');
    expect(companies[0].bankDetails[0]).not.toHaveProperty('refreshToken');
    expect(donors[0].user).not.toHaveProperty('password');
    expect(donors[0].addresses[0]).not.toHaveProperty('verificationToken');
  });
});
