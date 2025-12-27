import {
  resolvePagination,
  withSoftDelete,
  DEFAULT_LIMIT,
  MAX_LIMIT,
  encodeCursor,
  decodeCursor,
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
    const encoded = encodeCursor({ field: 'createdAt', value: 'cursor-value' });
    const result = resolvePagination({ cursor: encoded });

    expect(result.cursor).toEqual({ createdAt: 'cursor-value' });
    expect(result.meta.cursor).toBe(encoded);
    expect(result.meta.cursorField).toBe('createdAt');
    expect(result.meta.cursorValue).toBe('cursor-value');
  });

  it('falls back when cursor not encoded', () => {
    const result = resolvePagination({ cursor: 'raw-id', cursorField: 'id' });

    expect(result.cursor).toEqual({ id: 'raw-id' });
    expect(result.meta.cursorValue).toBe('raw-id');
    expect(result.meta.limit).toBe(DEFAULT_LIMIT);
    expect(result.take).toBe(DEFAULT_LIMIT);
  });

  it('decodes base64url and base64', () => {
    const payload = { field: 'id', value: '123' };
    const base64 = Buffer.from(JSON.stringify(payload), 'utf8').toString(
      'base64',
    );
    const base64url = Buffer.from(JSON.stringify(payload), 'utf8').toString(
      'base64url',
    );

    expect(decodeCursor(base64)).toEqual(payload);
    expect(decodeCursor(base64url)).toEqual(payload);
  });

  it('returns null when decode fails completely', () => {
    expect(decodeCursor('', 'id')).toBeNull();
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
