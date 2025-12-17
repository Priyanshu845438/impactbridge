import {
  resolvePagination,
  withSoftDelete,
  DEFAULT_LIMIT,
  MAX_LIMIT,
} from '../../../src/utils/pagination.util';

describe('resolvePagination', () => {
  it('returns empty meta when no options supplied', () => {
    expect(resolvePagination()).toEqual({ meta: {} });
  });

  it('caps limit to MAX_LIMIT and keeps offset when provided', () => {
    const result = resolvePagination({ limit: MAX_LIMIT + 5, offset: 10 });

    expect(result).toMatchObject({
      take: MAX_LIMIT,
      skip: 10,
      meta: {
        limit: MAX_LIMIT,
        offset: 10,
      },
    });
  });

  it('derives skip from page when offset missing', () => {
    const result = resolvePagination({ limit: 10, page: 3 });

    expect(result).toMatchObject({
      take: 10,
      skip: 20,
      meta: {
        limit: 10,
        page: 3,
        offset: 20,
      },
    });
  });

  it('ignores invalid numeric values', () => {
    const result = resolvePagination({ limit: -5, page: 0 });

    expect(result).toEqual({
      meta: {
        page: undefined,
      },
    });
  });

  it('includes cursor metadata when provided', () => {
    const result = resolvePagination({ cursor: 'cursor-id' });

    expect(result).toMatchObject({
      cursor: { id: 'cursor-id' },
      meta: { cursor: 'cursor-id' },
    });
  });
});

describe('withSoftDelete', () => {
  it('adds deletedAt filter when not overridden', () => {
    expect(withSoftDelete({ status: 'ACTIVE' })).toEqual({
      status: 'ACTIVE',
      deletedAt: null,
    });
  });

  it('respects provided deletedAt condition', () => {
    const where = { deletedAt: { not: null } } as const;
    const result = withSoftDelete(where);

    expect(result).toEqual(where);
    expect(result).not.toBe(where);
  });

  it('returns copy of where when includeDeleted true', () => {
    const where = { status: 'ACTIVE' };
    const result = withSoftDelete(where, true);

    expect(result).toEqual(where);
    expect(result).not.toBe(where);
  });

  it('defaults to empty filter with deletedAt null', () => {
    expect(withSoftDelete(undefined)).toEqual({ deletedAt: null });
  });
});
