import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NGOFinancialReportsPage from "@/app/dashboard/ngo/finance/reports/page";
import NGOFinancialReportUploadPage from "@/app/dashboard/ngo/finance/reports/upload/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/dashboard/ngo/finance/reports",
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("NGO financial reports screens", () => {
  it("renders list view with mock data", () => {
    render(<NGOFinancialReportsPage />);

    expect(screen.getByRole("heading", { name: /Financial reports/i })).toBeInTheDocument();
    expect(screen.getByText(/Statements archive/i)).toBeInTheDocument();

    const table = screen.getByRole("table", { name: /Financial reports table/i });
    expect(table).toBeInTheDocument();
    expect(screen.getAllByText(/Verified|Submitted|Pending/)).not.toHaveLength(0);
  });

  it("renders upload form and allows mock submission", async () => {
    const user = userEvent.setup();
    render(<NGOFinancialReportUploadPage />);

    expect(screen.getByRole("heading", { name: /Upload financial report/i })).toBeInTheDocument();

    await user.click(screen.getByLabelText(/Fiscal year/i));
    await user.click(screen.getByRole("option", { name: "2024-2025" }));

    await user.click(screen.getByLabelText(/Quarter or period/i));
    await user.click(screen.getByRole("option", { name: "Q1" }));

    await user.click(screen.getByLabelText(/Report type/i));
    await user.click(screen.getByRole("option", { name: "Audited" }));

    await user.type(screen.getByLabelText(/Notes for reviewer/i), "Includes audited balance sheet");

    await user.click(screen.getByRole("button", { name: /Submit report/i }));

    expect(await screen.findByText(/Submission simulated/i)).toBeInTheDocument();
  });
});
