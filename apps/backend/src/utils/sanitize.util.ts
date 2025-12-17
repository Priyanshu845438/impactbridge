export type SanitizableEntity = Record<string, unknown> & {
  password?: unknown;
  salt?: unknown;
  accessToken?: unknown;
  refreshToken?: unknown;
  verificationToken?: unknown;
};

const SENSITIVE_KEYS = [
  'password',
  'salt',
  'accessToken',
  'refreshToken',
  'verificationToken',
] as const;

type SensitiveKey = (typeof SENSITIVE_KEYS)[number];

type WithoutSensitive<T> = Omit<T, SensitiveKey>;

export function sanitizeEntity<T extends SanitizableEntity>(
  entity: T | null | undefined,
): WithoutSensitive<T> | null {
  if (!entity) {
    return null;
  }

  const clone: Record<string, unknown> = {};
  const entries = Object.entries(entity);

  for (const [key, value] of entries) {
    if (SENSITIVE_KEYS.includes(key as SensitiveKey)) {
      continue;
    }

    clone[key] = value;
  }

  return clone as WithoutSensitive<T>;
}

export function sanitizeEntities<T extends SanitizableEntity>(
  entities: readonly (T | null | undefined)[] | null | undefined,
): WithoutSensitive<T>[] {
  if (!entities) {
    return [];
  }

  return entities
    .map((entity) => sanitizeEntity(entity))
    .filter((entity): entity is WithoutSensitive<T> => entity !== null);
}
