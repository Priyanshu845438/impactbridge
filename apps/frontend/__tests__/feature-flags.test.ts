import { getFeatureFlags, isFeatureEnabled, listFeatureFlags } from "@/lib/feature-flags";

describe("feature flag resolution", () => {
  const baseEnv = {
    NEXT_PUBLIC_FLAG_API_DASHBOARD: undefined,
    NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS: undefined,
    NEXT_PUBLIC_FLAG_SERVER_NAVIGATION: undefined,
  } as Record<string, string | undefined>;

  it("returns defaults when env vars are missing", () => {
    expect(getFeatureFlags(baseEnv)).toEqual({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
    });
  });

  it("parses truthy string values", () => {
    const env = {
      ...baseEnv,
      NEXT_PUBLIC_FLAG_API_DASHBOARD: "true",
      NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS: "1",
      NEXT_PUBLIC_FLAG_SERVER_NAVIGATION: "enabled",
    };
    expect(getFeatureFlags(env)).toEqual({
      API_DASHBOARD: true,
      REALTIME_NOTIFICATIONS: true,
      SERVER_NAVIGATION: true,
    });
  });

  it("parses falsy string values", () => {
    const env = {
      ...baseEnv,
      NEXT_PUBLIC_FLAG_API_DASHBOARD: "false",
      NEXT_PUBLIC_FLAG_REALTIME_NOTIFICATIONS: "0",
      NEXT_PUBLIC_FLAG_SERVER_NAVIGATION: "disabled",
    };
    expect(getFeatureFlags(env)).toEqual({
      API_DASHBOARD: false,
      REALTIME_NOTIFICATIONS: false,
      SERVER_NAVIGATION: false,
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
    ]);
  });
});
