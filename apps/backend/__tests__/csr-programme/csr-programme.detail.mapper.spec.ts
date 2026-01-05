import { toProgrammeDetailDto } from '../../src/csr-programme/mappers/programme.mapper';

describe('CSR Programme detail mapper', () => {
  it('maps sanitized programme to ProgrammeDetailDto without altering values', () => {
    const now = '2026-01-05T00:00:00.000Z';
    const sanitized = {
      id: 'programme-1',
      title: 'Clean Water Initiative',
      description: 'Provide access to clean water',
      status: 'ACTIVE',
      budget: 100000,
      startDate: now,
      endDate: now,
      companyId: 'company-1',
      createdAt: now,
      updatedAt: now,
      assignments: [
        {
          id: 'assignment-1',
          programmeId: 'programme-1',
          ngoId: 'ngo-1',
          status: 'ACTIVE',
          notes: 'Primary partner',
          createdAt: now,
          updatedAt: now,
          ngo: {
            id: 'ngo-1',
            missionStatement: 'Empower communities',
            user: {
              id: 'user-1',
              name: 'NGO Lead',
              email: 'lead@ngo.org',
            },
          },
        },
      ],
      milestones: [
        {
          id: 'milestone-1',
          programmeId: 'programme-1',
          title: 'Phase 1',
          description: 'Initial deployment',
          status: 'IN_PROGRESS',
          progress: 50,
          dueDate: now,
          createdAt: now,
          updatedAt: now,
        },
      ],
    } as any;

    const dto = toProgrammeDetailDto(sanitized);

    expect(dto).toMatchObject({
      id: sanitized.id,
      title: sanitized.title,
      description: sanitized.description,
      status: sanitized.status,
      budget: sanitized.budget,
      startDate: sanitized.startDate,
      endDate: sanitized.endDate,
      companyId: sanitized.companyId,
      createdAt: sanitized.createdAt,
      updatedAt: sanitized.updatedAt,
    });

    expect(dto.assignments[0]).toEqual({
      id: sanitized.assignments![0].id,
      ngoId: sanitized.assignments![0].ngoId,
      status: sanitized.assignments![0].status,
      notes: sanitized.assignments![0].notes,
      assignedAt: sanitized.assignments![0].createdAt,
      updatedAt: sanitized.assignments![0].updatedAt,
      ngo: {
        id: sanitized.assignments![0].ngo!.id,
        name: sanitized.assignments![0].ngo!.user?.name,
        email: sanitized.assignments![0].ngo!.user?.email,
        missionStatement: sanitized.assignments![0].ngo!.missionStatement,
      },
    });

    expect(dto.milestones[0]).toEqual({
      id: sanitized.milestones![0].id,
      title: sanitized.milestones![0].title,
      description: sanitized.milestones![0].description,
      status: sanitized.milestones![0].status,
      progress: sanitized.milestones![0].progress,
      dueDate: sanitized.milestones![0].dueDate,
      createdAt: sanitized.milestones![0].createdAt,
      updatedAt: sanitized.milestones![0].updatedAt,
    });
  });
});
