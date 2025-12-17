export interface PaginationOptions {
  /** Number of items to return */
  limit?: number;
  /** Zero-based offset. Takes precedence over page when provided. */
  offset?: number;
  /** One-based page index. Used only when limit is present. */
  page?: number;
  /** Optional cursor identifier (future friendly, not yet in use). */
  cursor?: string;
  /** Field name to apply cursor against. Defaults to `id`. */
  cursorField?: string;
}

export interface PaginationMeta {
  limit?: number;
  offset?: number;
  page?: number;
  cursor?: string;
}

export interface PaginationResult {
  skip?: number;
  take?: number;
  cursor?: Record<string, string>;
  meta: PaginationMeta;
}

export const DEFAULT_LIMIT = 25;
export const MAX_LIMIT = 100;

const coercePositiveInteger = (value?: number): number | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const coerced = Math.trunc(value);
  if (!Number.isFinite(coerced) || coerced <= 0) {
    return undefined;
  }

  return coerced;
};

/**
 * Normalises limit/page/offset inputs into Prisma-friendly pagination arguments while
 * keeping the default behaviour (unpaginated) when no values are provided.
 */
export function resolvePagination(options?: PaginationOptions): PaginationResult {
  if (!options) {
    return { meta: {} };
  }

  const meta: PaginationMeta = {};
  const result: PaginationResult = { meta };

  const limit = coercePositiveInteger(options.limit);
  if (limit !== undefined) {
    const cappedLimit = Math.min(limit, MAX_LIMIT);
    result.take = cappedLimit;
    meta.limit = cappedLimit;
  }

  const offset = options.offset;
  if (offset !== undefined && offset !== null) {
    const coercedOffset = Math.max(0, Math.trunc(offset));
    result.skip = coercedOffset;
    meta.offset = coercedOffset;
  } else if (result.take !== undefined && options.page !== undefined) {
    const page = coercePositiveInteger(options.page) ?? 1;
    const computedOffset = (page - 1) * (result.take ?? 0);
    result.skip = computedOffset;
    meta.page = page;
    meta.offset = computedOffset;
  } else if (options.page !== undefined) {
    const page = coercePositiveInteger(options.page);
    if (page !== undefined) {
      meta.page = page;
    }
  }

  if (options.cursor) {
    const cursorField = options.cursorField ?? 'id';
    result.cursor = { [cursorField]: options.cursor };
    meta.cursor = options.cursor;
  }

  return result;
}

export interface ListQueryOptions<TWhere>
  extends PaginationOptions {
  where?: TWhere | null;
  includeDeleted?: boolean;
  orderBy?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Ensures soft-deleted records stay excluded unless explicitly requested.
 */
export function withSoftDelete<TWhere extends Record<string, unknown> | null | undefined>(
  where?: TWhere,
  includeDeleted = false,
): Record<string, unknown> {
  if (includeDeleted) {
    return where ? { ...where } : {};
  }

  const base = where ? { ...where } : {};
  if (!Object.prototype.hasOwnProperty.call(base, 'deletedAt')) {
    Object.assign(base, { deletedAt: null });
  }

  return base;
}
