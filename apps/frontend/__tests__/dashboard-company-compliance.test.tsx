import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CompanyCompliancePage from "@/app/dashboard/company/compliance/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("Company Compliance Dashboard", () => {
  it("renders insight cards and table rows", () => {
    render(<CompanyCompliancePage />);

    expect(screen.getByRole("heading", { name: /Compliance Overview/i })).toBeInTheDocument();
    expect(screen.getByText(/CSR Oversight/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Pending reviews|Compliant NGOs|Missing documents|Expiring registrations/)).not.toHaveLength(0);

    const table = screen.getByRole("table", { name: /Compliance table/i });
    expect(table).toBeInTheDocument();
    expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
  });

  it("filters rows by status and search", async () => {
    const user = userEvent.setup();
    render(<CompanyCompliancePage />);

    const table = screen.getByRole("table", { name: /Compliance table/i });

    await user.click(screen.getByRole("button", { name: /Pending/i }));
    let rows = within(table).getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);

    const searchInput = screen.getByPlaceholderText(/Search NGO/i);
    await user.clear(searchInput);
    await user.type(searchInput, "HealTrust");

    rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(2);
    expect(within(rows[1]).getByText(/HealTrust/i)).toBeInTheDocument();
  });

  it("shows empty state when no matches", async () => {
    const user = userEvent.setup();
    render(<CompanyCompliancePage />);

    await user.type(screen.getByPlaceholderText(/Search NGO/i), "no-match");

    expect(screen.getByText(/No NGOs match your filters/i)).toBeInTheDocument();
  });
});
