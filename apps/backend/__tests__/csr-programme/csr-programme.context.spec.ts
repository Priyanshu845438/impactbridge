import { Test } from '@nestjs/testing';
import { CSRProgrammeController } from '../../src/csr-programme/csr-programme.controller';
import { CSRProgrammeService } from '../../src/csr-programme/csr-programme.service';
import { RequestContextService } from '../../src/common/request-context/request-context.service';

describe('CSRProgrammeController actor context', () => {
  const service = {
    create: jest.fn(),
    update: jest.fn(),
    assignNgo: jest.fn(),
    transitionStatus: jest.fn(),
  } as unknown as CSRProgrammeService;

  let controller: CSRProgrammeController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CSRProgrammeController],
      providers: [{ provide: CSRProgrammeService, useValue: service }],
    }).compile();

    controller = moduleRef.get(CSRProgrammeController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    RequestContextService.clear();
  });

  it('passes actorId when present', () => {
    RequestContextService.setActorId('company-actor');
    controller.create('company-1', { title: 't' } as any);
    expect(service.create).toHaveBeenCalledWith('company-1', expect.any(Object), {
      actorId: 'company-actor',
    });
  });

  it('passes null actorId when missing', () => {
    controller.update('company-1', 'programme-1', {} as any);
    expect(service.update).toHaveBeenCalledWith(
      'programme-1',
      'company-1',
      expect.any(Object),
      { actorId: null },
    );
  });

  it('propagates actorId for assign NGO', () => {
    RequestContextService.setActorId('actor-42');
    controller.assignNgo('company-1', 'programme-1', { ngoId: 'ngo-1' } as any);
    expect(service.assignNgo).toHaveBeenCalledWith(
      'programme-1',
      'company-1',
      expect.objectContaining({ ngoId: 'ngo-1' }),
      { actorId: 'actor-42' },
    );
  });

  it('propagates null actorId for status transition when missing', () => {
    controller.transitionStatus('company-1', 'programme-1', 'ACTIVE');
    expect(service.transitionStatus).toHaveBeenCalledWith(
      'programme-1',
      'company-1',
      'ACTIVE',
      { actorId: null },
    );
  });
});
