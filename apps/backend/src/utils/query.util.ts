import type { Prisma } from 'prisma/generated';
import {
  PaginationOptions,
  resolvePagination,
  withSoftDelete,
  ListQueryOptions,
} from './pagination.util';

export const buildFindManyArgs = <
  TModel extends keyof Prisma.TypeMap['model'],
  TWhere extends Prisma.TypeMap['model'][TModel]['operations']['findMany']['args']['where'],
>(
  options?: ListQueryOptions<TWhere>,
): Prisma.TypeMap['model'][TModel]['operations']['findMany']['args'] => {
  if (!options) {
    return {} as Prisma.TypeMap['model'][TModel]['operations']['findMany']['args'];
  }

  const pagination = resolvePagination(options);
  const where = withSoftDelete(options.where, options.includeDeleted);

  const args = {
    where: where as TWhere,
  } as Prisma.TypeMap['model'][TModel]['operations']['findMany']['args'];

  if (pagination.take !== undefined) {
    args.take = pagination.take;
  }

  if (pagination.skip !== undefined) {
    args.skip = pagination.skip;
  }

  if (options.orderBy) {
    args.orderBy = options.orderBy as any;
  }

  if (pagination.cursor) {
    args.cursor = pagination.cursor as any;
  }

  return args;
};

export const mergeWhere = <T extends Record<string, unknown> | null | undefined>(
  base: T,
  patch?: Record<string, unknown>,
): Record<string, unknown> => {
  if (!patch) {
    return base ? { ...base } : {};
  }

  const merged = base ? { ...base } : {};
  Object.assign(merged, patch);
  return merged;
};
