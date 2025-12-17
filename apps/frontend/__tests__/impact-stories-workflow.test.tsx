import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";

import ImpactStoriesPage from "@/app/dashboard/company/impact-stories/page";

const getTagButton = (name: string) =>
  screen.getAllByRole("button", { name }).find((button) => button.getAttribute("aria-pressed") !== null) ??
  screen.getAllByRole("button", { name })[0]!;

const openDrawerForStory = async (
  user: ReturnType<typeof userEvent.setup>,
  label: RegExp | string,
) => {
  const cards = screen.getAllByTestId("story-card");
  const target = cards.find((card) => card.textContent?.match(label));
  if (!target) {
    throw new Error(`Story card not found for label ${String(label)}`);
  }
  const button = within(target).getByRole("button", { name: /Read full story/i });
  await user.click(button);
};

describe("Impact stories workflow", () => {
  it("toggles tags on and off", async () => {
    const user = userEvent.setup();
    render(<ImpactStoriesPage />);

    const educationTag = getTagButton("Education");
    expect(educationTag).toHaveAttribute("aria-pressed", "false");

    await user.click(educationTag);
    expect(educationTag).toHaveAttribute("aria-pressed", "true");

    await user.click(educationTag);
    expect(educationTag).toHaveAttribute("aria-pressed", "false");
  });

  it("progresses draft → submitted → published", async () => {
    const user = userEvent.setup();
    render(<ImpactStoriesPage />);

    await openDrawerForStory(user, /Mangrove Guardians/);

    const drawer = screen.getByRole("dialog");
    expect(within(drawer).getByText(/Status/i)).toBeInTheDocument();
    expect(within(drawer).getByText(/Draft/i)).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /Submit for review/i });
    await user.click(submitButton);
    expect(within(drawer).getByText(/Submitted/)).toBeInTheDocument();

    const publishButton = screen.getByRole("button", { name: /Publish story/i });
    await user.click(publishButton);
    expect(within(drawer).getByText(/Published/)).toBeInTheDocument();
  });

  it("shows analytics snapshot with cards and chart", async () => {
    const user = userEvent.setup();
    render(<ImpactStoriesPage />);

    await openDrawerForStory(user, /Science Wings/);

    expect(screen.getByText(/Analytics snapshot/)).toBeInTheDocument();
    expect(screen.getByText(/Views/)).toBeInTheDocument();
    expect(screen.getByText(/Shares/)).toBeInTheDocument();
    expect(screen.getByText(/Estimated influence score/)).toBeInTheDocument();
  });
});
