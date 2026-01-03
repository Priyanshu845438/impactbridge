import {
  ProgrammeAssignmentStatus,
  ProgrammeMilestoneStatus,
  ProgrammeStatus,
} from 'prisma/generated';

type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

export interface ProgrammeFixture {
  id: string;
  companyId: string;
  title: string;
  description: string | null;
  status: ProgrammeStatus;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  milestones: Array<{
    id: string;
    programmeId: string;
    title: string;
    description: string | null;
    status: ProgrammeMilestoneStatus;
    progress: number;
    dueDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>;
  assignments: Array<{
    id: string;
    programmeId: string;
    ngoId: string;
    status: ProgrammeAssignmentStatus;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    ngo: {
      id: string;
      missionStatement: string | null;
      user: {
        id: string;
        name: string | null;
        email: string | null;
      };
    };
  }>;
}

export const baseCompany = { id: 'company-1' };

export const baseNgo = {
  id: 'ngo-1',
  missionStatement: 'Education impact',
  user: { id: 'user-ngo-1', name: 'Hope Org', email: 'ngo@example.com' },
};

const defaultMilestones: ProgrammeFixture['milestones'] = [
  {
    id: 'milestone-1',
    programmeId: 'programme-1',
    title: 'Planning',
    description: 'Initial planning phase',
    status: ProgrammeMilestoneStatus.PENDING,
    progress: 0,
    dueDate: new Date('2025-02-01T00:00:00.000Z'),
    createdAt: new Date('2024-12-15T00:00:00.000Z'),
    updatedAt: new Date('2024-12-15T00:00:00.000Z'),
    deletedAt: null,
  },
];

const defaultAssignments: ProgrammeFixture['assignments'] = [
  {
    id: 'assignment-1',
    programmeId: 'programme-1',
    ngoId: baseNgo.id,
    status: ProgrammeAssignmentStatus.ACTIVE,
    notes: 'Pilot partnership',
    createdAt: new Date('2024-12-20T00:00:00.000Z'),
    updatedAt: new Date('2024-12-20T00:00:00.000Z'),
    ngo: baseNgo,
  },
];

export const buildProgramme = (
  overrides: DeepPartial<ProgrammeFixture> = {},
): ProgrammeFixture => ({
  id: 'programme-1',
  companyId: baseCompany.id,
  title: 'Water Access',
  description: 'Clean water initiative',
  status: ProgrammeStatus.DRAFT,
  budget: 100000,
  startDate: new Date('2025-01-01T00:00:00.000Z'),
  endDate: new Date('2025-06-30T00:00:00.000Z'),
  createdAt: new Date('2024-12-01T00:00:00.000Z'),
  updatedAt: new Date('2024-12-05T00:00:00.000Z'),
  deletedAt: null,
  milestones: overrides.milestones
    ? (overrides.milestones as ProgrammeFixture['milestones'])
    : defaultMilestones,
  assignments: overrides.assignments
    ? (overrides.assignments as ProgrammeFixture['assignments'])
    : defaultAssignments,
  ...overrides,
});

const SUMMARY_KEYS = [
  'assignments',
  'budget',
  'companyId',
  'createdAt',
  'description',
  'endDate',
  'id',
  'milestones',
  'startDate',
  'status',
  'title',
  'updatedAt',
] as const;

const DETAIL_KEYS = [...SUMMARY_KEYS, 'deletedAt'] as const;

export const expectProgrammeListShape = (payload: any) => {
  expect(Object.keys(payload).sort()).toEqual([...SUMMARY_KEYS].sort());
};

export const expectProgrammeDetailShape = (payload: any) => {
  const keys = Object.keys(payload).sort();
  const expected = [...SUMMARY_KEYS];
  if ('deletedAt' in payload) {
    expected.push('deletedAt');
  }
  expect(keys).toEqual(expected.sort());
};

export const expectAssignmentDtoShape = (payload: any) => {
  const expectedKeys = [
    'assignedAt',
    'id',
    'ngo',
    'ngoId',
    'notes',
    'status',
    'updatedAt',
  ];
  expect(Object.keys(payload).sort()).toEqual(expectedKeys.sort());
  expect(payload.ngo).toMatchObject({
    id: baseNgo.id,
    name: baseNgo.user.name,
    email: baseNgo.user.email,
    missionStatement: baseNgo.missionStatement,
  });
};
