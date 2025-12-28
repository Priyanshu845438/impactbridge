import { CSRProgrammeService } from '../../../src/csr-programme/csr-programme.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { ProgrammeStatus } from 'prisma/generated';

describe('CSRProgrammeService sanitisation', () => {
  let prisma: jest.Mocked<PrismaService>;
  let service: CSRProgrammeService;

  beforeEach(() => {
    prisma = {
      companyProfile: {
        findUnique: jest.fn().mockResolvedValue({ id: 'company-1' }),
      },
      nGOProfile: {
        findUnique: jest.fn().mockResolvedValue({ id: 'ngo-1' }),
      },
      cSRProgramme: {
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn().mockResolvedValue({
          id: 'programme-1',
          companyId: 'company-1',
        }),
      },
      programmeAssignment: {
        findFirst: jest.fn().mockResolvedValue(null),
        upsert: jest.fn(),
      },
      programmeMilestone: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new CSRProgrammeService(prisma);
  });

  it('sanitises nested relations when listing programmes', async () => {
    prisma.cSRProgramme.findMany.mockResolvedValueOnce([
      {
        id: 'programme-1',
        title: 'CSR',
        status: ProgrammeStatus.ACTIVE,
        assignments: [
          {
            id: 'assign-1',
            accessToken: 'secret',
            ngo: {
              id: 'ngo-1',
              missionStatement: 'Mission',
              user: {
                id: 'ngo-user',
                name: 'NGO',
                email: 'ngo@example.com',
                password: 'hash',
              },
            },
          },
        ],
        milestones: [
          {
            id: 'milestone-1',
            password: 'hidden',
            status: 'PENDING',
          },
        ],
      },
    ] as any);

    const result = await service.listByCompany('company-1');

    expect(result[0]).not.toHaveProperty('password');
    expect(result[0].assignments[0]).not.toHaveProperty('accessToken');
    expect(result[0].assignments[0].ngo.user).not.toHaveProperty('password');
    expect(result[0].milestones[0]).not.toHaveProperty('password');
  });

  it('sanitises assignment results', async () => {
    prisma.programmeAssignment.upsert.mockResolvedValueOnce({
      id: 'assignment-1',
      ngoId: 'ngo-1',
      status: 'ACTIVE',
      password: 'secret',
      ngo: {
        id: 'ngo-1',
        user: {
          id: 'ngo-user',
          password: 'hash',
        },
      },
    } as any);

    const result = await service.assignNgo('programme-1', 'company-1', {
      ngoId: 'ngo-1',
    });

    expect(result).not.toHaveProperty('password');
    expect(result.ngo.user).not.toHaveProperty('password');
  });

  it('sanitises milestone mutations', async () => {
    prisma.programmeMilestone.create.mockResolvedValueOnce({
      id: 'milestone-1',
      programmeId: 'programme-1',
      password: 'secret',
    } as any);

    const created = await service.createMilestone('programme-1', 'company-1', {
      title: 'Kickoff',
    });

    expect(created).not.toHaveProperty('password');
  });
});
