import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";

import ImpactStoriesPage from "@/app/dashboard/company/impact-stories/page";

const renderPage = () => render(<ImpactStoriesPage />);

const clickFilterOption = async (user: ReturnType<typeof userEvent.setup>, label: string, option: string) => {
  const filterGroup = screen.getByTestId(`filter-${label.toLowerCase()}`);
  const buttons = within(filterGroup).getAllByRole("button");
  const target = buttons.find((button) => button.textContent === option);
  if (!target) throw new Error(`${option} option not found for ${label}`);
  await user.click(target);
};

describe("Impact stories drawer", () => {
  it("opens and closes the drawer", async () => {
    const user = userEvent.setup();
    renderPage();

    const firstCard = screen.getAllByTestId("story-card")[0]!;
    await user.click(within(firstCard).getByRole("button", { name: /Read full story/i }));

    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveTextContent(/Status/);

    await user.click(screen.getByRole("button", { name: /Close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows empty state when filtering removes results", async () => {
    const user = userEvent.setup();
    renderPage();

    await clickFilterOption(user, "Status", "Draft");
    await clickFilterOption(user, "Tags", "Education");

    expect(screen.getByText(/No stories match these filters yet./i)).toBeInTheDocument();
  });
});
