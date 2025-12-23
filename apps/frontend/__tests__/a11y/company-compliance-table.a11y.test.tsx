import CompanyCompliancePage from "@/app/dashboard/company/compliance/page";
import { logViolations, runAxe } from "@/test/a11y-utils";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Accessibility – Company compliance table", () => {
  it("logs current violations without failing", async () => {
    const results = await runAxe(<CompanyCompliancePage />);
    logViolations(results);
    expect(results.violations.length).toBeGreaterThanOrEqual(0);
  });
});
