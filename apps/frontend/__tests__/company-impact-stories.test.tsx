import { fireEvent, render, screen } from "@testing-library/react";

import CompanyImpactStoriesPage from "@/app/dashboard/company/impact-stories/page";

describe("Company impact stories page", () => {
  it("opens and closes the story drawer", () => {
    render(<CompanyImpactStoriesPage />);

    const viewButtons = screen.getAllByRole("button", { name: /view profile/i });
    fireEvent.click(viewButtons[0]!);

    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveTextContent(/Status/);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders empty state when filters remove stories", () => {
    render(<CompanyImpactStoriesPage />);

    const statusFilter = screen.getByRole("combobox", { name: /status/i });
    fireEvent.mouseDown(statusFilter);
    fireEvent.click(screen.getByRole("option", { name: "Archived" }));

    fireEvent.mouseDown(statusFilter);
    fireEvent.click(screen.getByRole("option", { name: "Draft" }));

    expect(screen.getByText(/No stories match these filters yet./i)).toBeInTheDocument();
  });
});
