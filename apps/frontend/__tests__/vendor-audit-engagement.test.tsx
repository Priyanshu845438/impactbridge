import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AuditCenterPage from "@/app/dashboard/company/audit-center/page";
import CompanyCompliancePage from "@/app/dashboard/company/compliance/page";
import EngagementHubPage from "@/app/dashboard/company/engagement-hub/page";
import VendorDirectoryPage from "@/app/dashboard/company/vendors/page";

type User = ReturnType<typeof userEvent.setup>;

const openSelectOption = async (user: User, trigger: HTMLElement, optionText: string) => {
  await user.click(trigger);
  const option = await screen.findByRole("option", { name: optionText });
  await user.click(option);
};

describe("Vendor Directory interactions", () => {
  it("filters vendors and shows empty state before reset", async () => {
    const user = userEvent.setup();
    render(<VendorDirectoryPage />);

    expect(screen.getByRole("heading", { level: 1, name: "CSR Partner Directory" })).toBeInTheDocument();
    expect(screen.getByTestId("vendor-card-grid").querySelectorAll("button")).toHaveLength(5);

    const [serviceSelect, ratingSelect] = screen.getAllByRole("combobox");
    await openSelectOption(user, serviceSelect, "Compliance");
    expect(screen.getByTestId("vendor-card-grid").querySelectorAll("button")).toHaveLength(1);

    await openSelectOption(user, ratingSelect, "All ratings");
    expect(screen.getByRole("button", { name: /Compliance360/ })).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search by name or service type");
    await user.clear(searchInput);
    await user.type(searchInput, "telehealth");

    expect(await screen.findByText("No vendors match your filters")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Reset filters" })[0]);
    expect(screen.queryByText("No vendors match your filters")).not.toBeInTheDocument();
    expect(screen.getByTestId("vendor-card-grid").querySelectorAll("button")).toHaveLength(5);
  });

  it("opens and closes the vendor drawer", async () => {
    const user = userEvent.setup();
    render(<VendorDirectoryPage />);

    await user.click(screen.getByRole("button", { name: /AuditCo Compliance Partners/ }));

    const drawer = await screen.findByRole("dialog");
    expect(within(drawer).getByRole("heading", { level: 2, name: "AuditCo Compliance Partners" })).toBeInTheDocument();
    expect(within(drawer).getByText("Annual CSR audit")).toBeInTheDocument();

    await user.click(within(drawer).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Audit Center responsiveness", () => {
  it("filters audits and toggles between table and cards", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<AuditCenterPage />);

    expect(screen.getAllByRole("row")).toHaveLength(4); // header + 3 rows

    const [, statusSelect] = screen.getAllByRole("combobox");
    await openSelectOption(user, statusSelect, "Moderate");
    expect(screen.getAllByRole("row")).toHaveLength(2); // header + 1 row

    await openSelectOption(user, statusSelect, "All statuses");

    const search = screen.getByPlaceholderText("Search audit title or reviewer");
    await user.clear(search);
    await user.type(search, "mobile");
    const mobileMatches = await screen.findAllByText("Mobile Clinics Compliance Review");
    expect(mobileMatches.length).toBeGreaterThan(0);

    act(() => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event("resize"));
    });

    rerender(<AuditCenterPage />);

    expect(screen.getByTestId("audit-card-scope")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Open report" })).toHaveLength(2);
  });

  it("opens audit drawer and shows findings", async () => {
    const user = userEvent.setup();
    render(<AuditCenterPage />);

    await user.click(screen.getAllByRole("button", { name: "Open report" })[0]);
    const drawer = await screen.findByRole("dialog");

    expect(within(drawer).getByText("Score breakdown")).toBeInTheDocument();
    expect(within(drawer).getByText("Recommended actions")).toBeInTheDocument();
  });
});

describe("Compliance Overview table behaviour", () => {
  it("filters rows, shows empty state, and resets", async () => {
    const user = userEvent.setup();
    render(<CompanyCompliancePage />);

    expect(screen.getAllByRole("row")).toHaveLength(5); // header + 4 rows

    await user.click(screen.getByRole("button", { name: "Pending" }));
    const searchInput = screen.getByPlaceholderText("Search NGO or missing items");
    await user.clear(searchInput);
    await user.type(searchInput, "visa");

    expect(await screen.findByText("No NGOs match your filters")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.queryByText("No NGOs match your filters")).not.toBeInTheDocument();
  });

  it("opens compliance drawer and renders deadlines", async () => {
    const user = userEvent.setup();
    render(<CompanyCompliancePage />);

    await user.click(screen.getAllByRole("button", { name: "View details" })[0]);
    const drawer = await screen.findByRole("dialog");

    expect(within(drawer).getByText("Upcoming deadlines")).toBeInTheDocument();
    expect(within(drawer).getByText("Record follow-up")).toBeInTheDocument();
  });
});

describe("Engagement Hub tabs", () => {
  it("switches between tabs and preserves content", async () => {
    const user = userEvent.setup();
    render(<EngagementHubPage />);

    expect(screen.getByText("Quarterly milestone achieved")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Conversations" }));
    expect(screen.getByText("Contacts")).toBeInTheDocument();

    const csrStrategyButton = await screen.findByRole("button", { name: /CSR Strategy Team/ });
    await user.click(csrStrategyButton);
    expect(screen.getByText("Today • 10:18 AM")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outreach" }));
    expect(screen.getByText("Awareness email")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Updates" }));
    expect(screen.getByText("Quarterly milestone achieved")).toBeInTheDocument();
  });
});
