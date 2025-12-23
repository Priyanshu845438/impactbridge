import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NGOFinanceOverviewPage from "@/app/dashboard/ngo/finance/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("NGO Finance Overview Dashboard", () => {
  it("renders summary cards and transactions table", () => {
    render(<NGOFinanceOverviewPage />);

    expect(screen.getByRole("heading", { name: /Finance Overview/i })).toBeInTheDocument();
    expect(screen.getByText(/Total donations received/i)).toBeInTheDocument();
    expect(screen.getByText(/Funds utilized/i)).toBeInTheDocument();
    expect(screen.getByText(/Remaining balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming allocations/i)).toBeInTheDocument();

    const table = screen.getByRole("table", { name: /Transactions/i });
    expect(within(table).getAllByRole("row")).toHaveLength(6);
  });

  it("filters transactions by type and status", async () => {
    const user = userEvent.setup();
    render(<NGOFinanceOverviewPage />);

    const selects = screen.getAllByRole("combobox");

    await user.click(selects[1]);
    await user.click(screen.getByRole("option", { name: /Credits/i }));

    await user.click(selects[2]);
    await user.click(screen.getByRole("option", { name: /Pending/i }));

    const table = screen.getByRole("table", { name: /Transactions/i });
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(2); // header + single pending credit row
    expect(screen.getAllByText(/Pending/)).not.toHaveLength(0);
  });

  it("shows empty state when filters remove all transactions", async () => {
    const user = userEvent.setup();
    render(<NGOFinanceOverviewPage />);

    const selects = screen.getAllByRole("combobox");

    await user.click(selects[1]);
    await user.click(screen.getByRole("option", { name: /Debits/i }));

    await user.click(selects[2]);
    await user.click(screen.getByRole("option", { name: /Pending/i }));

    expect(screen.getByText(/No transactions yet/i)).toBeInTheDocument();
  });
});
