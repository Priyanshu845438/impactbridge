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

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const sanitizeValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (isPlainObject(value)) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      if (SENSITIVE_KEYS.includes(key as SensitiveKey)) {
        continue;
      }

      sanitized[key] = sanitizeValue(nestedValue);
    }

    return sanitized;
  }

  return value;
};

export function sanitizeEntity<T extends SanitizableEntity>(
  entity: T | null | undefined,
): WithoutSensitive<T> | null {
  if (!entity) {
    return null;
  }

  return sanitizeValue(entity) as WithoutSensitive<T>;
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
