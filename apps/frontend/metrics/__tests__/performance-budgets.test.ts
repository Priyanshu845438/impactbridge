import { checkBudgets } from "../performance-budgets";

describe("checkBudgets", () => {
  it("returns no warnings when metrics are within budget", () => {
    expect(
      checkBudgets({
        route: "/dashboard/company",
        firstLoadJS: 100_000,
        renderDuration: 2_500,
        lcpTime: 2_000,
      }),
    ).toHaveLength(0);
  });

  it("warns when metrics exceed thresholds", () => {
    const warnings = checkBudgets({
      route: "/dashboard/company",
      firstLoadJS: 140_000,
      renderDuration: 3_500,
      lcpTime: 3_000,
    });

    expect(warnings).toEqual(
      expect.arrayContaining([
        expect.stringContaining("firstLoadJS"),
        expect.stringContaining("renderDuration"),
        expect.stringContaining("LCP"),
      ]),
    );
  });

  it("ignores routes without budgets", () => {
    expect(checkBudgets({ route: "/untracked" })).toHaveLength(0);
  });
});
