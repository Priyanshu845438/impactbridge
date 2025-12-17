import { fireEvent, render, screen, within } from "@testing-library/react";

import CompanyPartneredNgosPage from "@/app/dashboard/company/ngos/page";

describe("Company partnered NGOs page", () => {
  it("filters cards by status and category", () => {
    render(<CompanyPartneredNgosPage />);

    // open status select and pick "Pending"
    fireEvent.mouseDown(screen.getByRole("combobox", { name: /status/i }));
    fireEvent.click(screen.getByRole("option", { name: "Pending" }));

    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent("GreenRun Collective");

    // switch to Active and confirm the other two appear
    fireEvent.mouseDown(screen.getByRole("combobox", { name: /status/i }));
    fireEvent.click(screen.getByRole("option", { name: "Active" }));

    const activeCards = screen.getAllByRole("heading", { level: 3 });
    expect(activeCards).toHaveLength(2);
    expect(activeCards.map((card) => card.textContent)).toEqual(
      expect.arrayContaining(["Bright Future Foundation", "HealTrust"]),
    );
  });

  it("shows drawer details and empty drawer skeleton correctly", () => {
    render(<CompanyPartneredNgosPage />);

    fireEvent.click(screen.getByRole("button", { name: /View profile/i }));

    const dialog = screen.getByRole("dialog", { name: /Bright Future Foundation/ });
    expect(within(dialog).getByText(/Deliver STEM education/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Close/ }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
