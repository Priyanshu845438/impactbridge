export class PrismaServiceMock {
  campaignApproval = {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  campaign = {
    findUnique: jest.fn(),
  };

  companyProfile = {
    findUnique: jest.fn(),
  };

  nGOProfile = {
    findUnique: jest.fn(),
  };
}
