import { getFeatureFlags, isFeatureEnabled, listFeatureFlags } from "@/lib/feature-flags";

describe("feature flag resolution", () => {
  const baseEnv = {
    NEXT_PUBLIC_FLAG_API_DASHBOARD: undefined,
    NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS: undefined,
    NEXT_PUBLIC_FLAG_SERVER_NAVIGATION: undefined,
    NEXT_PUBLIC_FLAG_API_AUTH: undefined,
    NEXT_PUBLIC_FLAG_API_PROGRAMME: undefined,
    NEXT_PUBLIC_FLAG_API_NGO_FINANCIAL: undefined,
  } as Record<string, string | undefined>;

  it("returns defaults when env vars are missing", () => {
    expect(getFeatureFlags(baseEnv)).toEqual({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
      API_NGO_FINANCIAL: false,
    });
  });

  it("parses truthy string values", () => {
    const env = {
      ...baseEnv,
      NEXT_PUBLIC_FLAG_API_DASHBOARD: "true",
      NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS: "1",
      NEXT_PUBLIC_FLAG_SERVER_NAVIGATION: "enabled",
      NEXT_PUBLIC_FLAG_API_AUTH: "yes",
      NEXT_PUBLIC_FLAG_API_PROGRAMME: "on",
      NEXT_PUBLIC_FLAG_API_NGO_FINANCIAL: "on",
    };
    expect(getFeatureFlags(env)).toEqual({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: true,
      SERVER_NAVIGATION: true,
      API_AUTH: true,
      API_PROGRAMME: true,
      API_NGO_FINANCIAL: true,
    });
  });

  it("parses falsy string values", () => {
    const env = {
      ...baseEnv,
      NEXT_PUBLIC_FLAG_API_DASHBOARD: "false",
      NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS: "0",
      NEXT_PUBLIC_FLAG_SERVER_NAVIGATION: "disabled",
      NEXT_PUBLIC_FLAG_API_AUTH: "no",
      NEXT_PUBLIC_FLAG_API_PROGRAMME: "off",
      NEXT_PUBLIC_FLAG_API_NGO_FINANCIAL: "off",
    };
    expect(getFeatureFlags(env)).toEqual({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
      API_AUTH: false,
      API_PROGRAMME: false,
      API_NGO_FINANCIAL: false,
    });
  });

  it("falls back to defaults on unrecognised values", () => {
    const env = {
      ...baseEnv,
      NEXT_PUBLIC_FLAG_API_DASHBOARD: "maybe",
    };
    expect(getFeatureFlags(env).API_DASHBOARD).toBe(false);
  });

  it("supports individual flag checks", () => {
    const env = {
      ...baseEnv,
      NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS: "yes",
    };
    expect(isFeatureEnabled("REALTIME_NOTIFICATIONS", env)).toBe(true);
    expect(isFeatureEnabled("SERVER_NAVIGATION", env)).toBe(false);
  });

  it("lists flag states for tooling", () => {
    const env = {
      ...baseEnv,
      NEXT_PUBLIC_FLAG_API_DASHBOARD: "on",
    };
    expect(listFeatureFlags(env)).toEqual([
      { key: "API_DASHBOARD", enabled: true },
      { key: "REALTIME_NOTIFICATIONS", enabled: false },
      { key: "SERVER_NAVIGATION", enabled: false },
      { key: "API_AUTH", enabled: false },
      { key: "API_PROGRAMME", enabled: false },
      { key: "API_NGO_FINANCIAL", enabled: false },
    ]);
  });
});
