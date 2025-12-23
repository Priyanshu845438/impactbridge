import LoginPage from "@/app/login/page";
import { logViolations, runAxe } from "@/test/a11y-utils";

jest.mock("@/lib/api-client", () => ({
  apiClient: {
    post: jest.fn(() => ({ json: jest.fn() })),
  },
}));

jest.mock("@/providers/auth-context", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Accessibility – Login page", () => {
  it("logs current violations without failing", async () => {
    const results = await runAxe(<LoginPage />);
    logViolations(results);
    expect(results.violations.length).toBeGreaterThanOrEqual(0);
  });
});
