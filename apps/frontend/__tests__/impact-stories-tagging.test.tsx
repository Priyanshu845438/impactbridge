import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import ImpactStoriesPage from "@/app/dashboard/company/impact-stories/page";

const getTagButtons = (label: string) => screen.getAllByRole("button", { name: label });

const clickTag = async (label: string) => {
  const button = getTagButtons(label).find((element) => element.hasAttribute("aria-pressed"));
  if (!button) throw new Error(`Tag button with aria-pressed not found for ${label}`);
  await userEvent.click(button);
};

describe("Impact stories tagging", () => {
  it("filters stories via TagSelector", async () => {
    render(<ImpactStoriesPage />);

    expect(screen.getByText(/Science Wings Fellowship/)).toBeInTheDocument();
    expect(screen.getByText(/Rural Clinics on Wheels/)).toBeInTheDocument();

    await clickTag("Education");
    expect(screen.queryByText(/Rural Clinics on Wheels/)).not.toBeInTheDocument();

    await clickTag("Health");
    expect(screen.getByText(/Rural Clinics on Wheels/)).toBeInTheDocument();

    await clickTag("Education");
    expect(screen.queryByText(/Science Wings Fellowship/)).not.toBeInTheDocument();
  });

  it("renders tag buttons", () => {
    render(<ImpactStoriesPage />);
    expect(getTagButtons("Education").length).toBeGreaterThan(0);
  });
});
