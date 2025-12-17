import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import ImpactStoriesPage from "@/app/dashboard/company/impact-stories/page";

describe("Impact stories analytics", () => {
  it("renders analytics cards and chart", async () => {
    const user = userEvent.setup();
    render(<ImpactStoriesPage />);
    const readButtons = screen.getAllByRole("button", { name: /Read full story/i });
    await user.click(readButtons[0]!);

    expect(screen.getByText(/Analytics snapshot/)).toBeInTheDocument();
    expect(screen.getByText(/Views/)).toBeInTheDocument();
    expect(screen.getByText(/Shares/)).toBeInTheDocument();
    expect(screen.getByText(/Estimated influence score/)).toBeInTheDocument();
    const chart = document.querySelector("[data-testid='analytics-chart']");
    expect(chart).not.toBeNull();
  });
});
