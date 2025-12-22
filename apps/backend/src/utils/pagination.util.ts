import { Buffer } from 'node:buffer';

export interface PaginationOptions {
  /** Number of items to return */
  limit?: number;
  /** Zero-based offset. Takes precedence over page when provided. */
  offset?: number;
  /** One-based page index. Used only when limit is present. */
  page?: number;
  /** Optional cursor identifier (base64 encoded payload or raw id). */
  cursor?: string;
  /** Field name to apply cursor against. Defaults to `id`. */
  cursorField?: string;
}

export interface PaginationMeta {
  limit?: number;
  offset?: number;
  page?: number;
  cursor?: string;
  cursorField?: string;
  cursorValue?: string;
}

export interface PaginationResult {
  skip?: number;
  take?: number;
  cursor?: Record<string, string>;
  cursorRaw?: CursorPayload | null;
  meta: PaginationMeta;
}

export const DEFAULT_LIMIT = 25;
export const MAX_LIMIT = 100;

export interface CursorPayload {
  field: string;
  value: string;
}

const decodeBase64 = (value: string): string | null => {
  try {
    return Buffer.from(value, 'base64url').toString('utf8');
  } catch (error) {
    try {
      return Buffer.from(value, 'base64').toString('utf8');
    } catch (innerError) {
      return null;
    }
  }
};

export const encodeCursor = (payload: CursorPayload): string => {
  const serialised = JSON.stringify(payload);
  return Buffer.from(serialised, 'utf8').toString('base64url');
};

export const decodeCursor = (
  cursor: string,
  fallbackField = 'id',
): CursorPayload | null => {
  if (!cursor) {
    return null;
  }

  const decoded = decodeBase64(cursor);
  if (!decoded) {
    return { field: fallbackField, value: cursor };
  }

  try {
    const parsed = JSON.parse(decoded);
    if (typeof parsed?.field === 'string' && typeof parsed?.value === 'string') {
      return { field: parsed.field, value: parsed.value };
    }
  } catch (error) {
    // swallow and fallback below
  }

  return { field: fallbackField, value: cursor };
};

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
export function resolvePagination(
  options?: PaginationOptions,
): PaginationResult {
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
    const decoded = decodeCursor(options.cursor, options.cursorField);
    const cursorField = decoded?.field ?? options.cursorField ?? 'id';
    const cursorValue = decoded?.value ?? options.cursor;

    result.cursor = { [cursorField]: cursorValue };
    result.cursorRaw = decoded;
    meta.cursor = options.cursor;
    meta.cursorField = cursorField;
    meta.cursorValue = cursorValue;

    if (result.take === undefined) {
      result.take = DEFAULT_LIMIT;
      meta.limit = DEFAULT_LIMIT;
    }

    if (result.skip === undefined) {
      result.skip = 1;
    }
  }

  return result;
}

export interface ListQueryOptions<TWhere> extends PaginationOptions {
  where?: TWhere | null;
  includeDeleted?: boolean;
  orderBy?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Ensures soft-deleted records stay excluded unless explicitly requested.
 */
export function withSoftDelete<
  TWhere extends Record<string, unknown> | null | undefined,
>(where?: TWhere, includeDeleted = false): Record<string, unknown> {
  if (includeDeleted) {
    return where ? { ...where } : {};
  }

  const base = where ? { ...where } : {};
  if (!Object.prototype.hasOwnProperty.call(base, 'deletedAt')) {
    Object.assign(base, { deletedAt: null });
  }

  return base;
}
