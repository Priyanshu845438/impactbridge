const DEFAULT_FLAGS = {
  API_DASHBOARD: false,
  REALTIME_NOTIFICATIONS: false,
  SERVER_NAVIGATION: false,
  API_AUTH: false,
  API_PROGRAMME: false,
  API_NGO_FINANCIAL: false,
} as const;

export type FeatureFlagKey = keyof typeof DEFAULT_FLAGS;
export type FeatureFlags = Record<FeatureFlagKey, boolean>;

function parseFlag(value: string | undefined) {
  if (!value) return undefined;
  const normalised = value.trim().toLowerCase();
  if (['1', 'true', 'on', 'yes', 'enabled'].includes(normalised)) return true;
  if (['0', 'false', 'off', 'no', 'disabled'].includes(normalised)) return false;
  return undefined;
}

export function getFeatureFlags(env: Record<string, string | undefined> = process.env): FeatureFlags {
  return {
    API_DASHBOARD: parseFlag(env.NEXT_PUBLIC_FLAG_API_DASHBOARD) ?? DEFAULT_FLAGS.API_DASHBOARD,
    REALTIME_NOTIFICATIONS:
      parseFlag(env.NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS) ?? DEFAULT_FLAGS.REALTIME_NOTIFICATIONS,
    SERVER_NAVIGATION: parseFlag(env.NEXT_PUBLIC_FLAG_SERVER_NAVIGATION) ?? DEFAULT_FLAGS.SERVER_NAVIGATION,
    API_AUTH: parseFlag(env.NEXT_PUBLIC_FLAG_API_AUTH) ?? DEFAULT_FLAGS.API_AUTH,
    API_PROGRAMME: parseFlag(env.NEXT_PUBLIC_FLAG_API_PROGRAMME) ?? DEFAULT_FLAGS.API_PROGRAMME,
    API_NGO_FINANCIAL: parseFlag(env.NEXT_PUBLIC_FLAG_API_NGO_FINANCIAL) ?? DEFAULT_FLAGS.API_NGO_FINANCIAL,
  };
}

export function isFeatureEnabled(key: FeatureFlagKey, env?: Record<string, string | undefined>) {
  return getFeatureFlags(env)[key];
}

export function listFeatureFlags(env?: Record<string, string | undefined>): Array<{ key: FeatureFlagKey; enabled: boolean }> {
  const flags = getFeatureFlags(env);
  return (Object.keys(flags) as FeatureFlagKey[]).map((key) => ({
    key,
    enabled: flags[key],
  }));
}

export const FEATURE_FLAG_DESCRIPTORS: Record<FeatureFlagKey, string> = {
  API_DASHBOARD: 'Enable API-backed dashboards (disables mock data).',
  REALTIME_NOTIFICATIONS: 'Enable websocket-driven notifications.',
  SERVER_NAVIGATION: 'Enable server-driven navigation menus.',
  API_AUTH: 'Route login & register flows through backend auth endpoints.',
  API_PROGRAMME: 'Enable CSR Programme API integration for company dashboards.',
  API_NGO_FINANCIAL: 'Enable NGO financial reports to load from backend APIs.',
};
