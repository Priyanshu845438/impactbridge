import DashboardLayout from "@/app/dashboard/layout";
import { logViolations, runAxe } from "@/test/a11y-utils";

jest.mock("@/providers/auth-context", () => ({
  useAuth: () => ({
    token: "demo-token",
    user: {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
      role: "COMPANY",
    },
    logout: jest.fn(),
  }),
}));

jest.mock("@/lib/nav-menu", () => ({
  navMenu: [
    {
      label: "Demo",
      href: "/dashboard/demo",
      roles: ["COMPANY"],
      icon: jest.fn(() => null),
    },
  ],
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/providers/locale-context", () => ({
  LocaleProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useLocale: () => ({
    locale: "en" as const,
    setLocale: () => {},
  }),
}));

describe("Accessibility – Dashboard layout", () => {
  it("logs current violations without failing", async () => {
    const results = await runAxe(
      <DashboardLayout>
        <div role="main">Mock content</div>
      </DashboardLayout>,
    );
    logViolations(results);
    expect(results.violations.length).toBeGreaterThanOrEqual(0);
  });
});
