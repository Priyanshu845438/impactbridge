import 'reflect-metadata';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';

jest.mock('prisma/generated', () => ({
  PrismaClient: class {
    $connect = jest.fn().mockResolvedValue(undefined);
    $disconnect = jest.fn().mockResolvedValue(undefined);
  },
  Role: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    NGO: 'NGO',
    COMPANY: 'COMPANY',
    DONOR: 'DONOR',
  },
  DocumentType: {
    REGISTRATION: 'REGISTRATION',
    TAX: 'TAX',
    COMPLIANCE: 'COMPLIANCE',
  },
  CampaignCategory: {
    EDUCATION: 'EDUCATION',
    HEALTH: 'HEALTH',
    ENVIRONMENT: 'ENVIRONMENT',
  },
  ProgrammeStatus: {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED',
  },
  ProgrammeMilestoneStatus: {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    BLOCKED: 'BLOCKED',
  },
  ProgrammeAssignmentStatus: {
    INVITED: 'INVITED',
    ACTIVE: 'ACTIVE',
    REJECTED: 'REJECTED',
    COMPLETED: 'COMPLETED',
  },
}));

process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret';
