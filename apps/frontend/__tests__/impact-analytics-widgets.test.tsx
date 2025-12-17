import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ImpactBenchmarksPage from "@/app/dashboard/company/impact-benchmarks/page";
import ImpactComparePage from "@/app/dashboard/company/impact-compare/page";
import ImpactForecastPage from "@/app/dashboard/company/impact-forecast/page";

describe("Company impact analytics widgets", () => {
  it("renders comparison charts and updates when programmes swap", async () => {
    const user = userEvent.setup();
    render(<ImpactComparePage />);

    expect(screen.getByRole("heading", { level: 1, name: "Impact Comparison" })).toBeInTheDocument();

    expect(screen.getByTestId("impact-compare-bar").querySelector("svg")).not.toBeNull();
    expect(screen.getByTestId("impact-compare-line").querySelector("svg")).not.toBeNull();
    expect(screen.getByTestId("impact-compare-radar").querySelector("svg")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Swap" }));

    const statsCards = screen.getAllByText(/Total beneficiaries/);
    expect(statsCards.length).toBeGreaterThan(0);
  });

  it("responds to budget controls in forecasting simulator", async () => {
    const user = userEvent.setup();
    render(<ImpactForecastPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Impact Forecasting" })).toBeInTheDocument();
    expect(screen.getByText("Beneficiary forecast")).toBeInTheDocument();

    const summaryCards = screen.getAllByText(/Projected/);
    expect(summaryCards.length).toBeGreaterThan(0);

    expect(screen.getByTestId("impact-forecast-chart").querySelector("svg")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "+25%" }));
    expect(screen.getByText(/could accelerate impact delivery/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Trim –10%" }));
    await waitFor(() =>
      expect(screen.getByTestId("insight-timeline")).toHaveTextContent(/introduce phased rollouts/i)
    );
  });

  it("shows benchmark cards and charts with CTA placeholder", () => {
    render(<ImpactBenchmarksPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Impact Benchmarks" })).toBeInTheDocument();

    const kpiCards = screen.getAllByText(/Industry:/);
    expect(kpiCards.length).toBeGreaterThan(0);

    expect(screen.getByText("Company vs industry metrics")).toBeInTheDocument();
    expect(screen.getByText("Strength radar")).toBeInTheDocument();

    expect(screen.getByTestId("impact-benchmark-bar").querySelector("svg")).not.toBeNull();
    expect(screen.getByTestId("impact-benchmark-radar").querySelector("svg")).not.toBeNull();

    expect(screen.getByText(/Sync with the analytics team/)).toBeInTheDocument();
  });
});
