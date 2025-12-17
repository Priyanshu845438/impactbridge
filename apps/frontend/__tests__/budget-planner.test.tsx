import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CsrBudgetPlannerPage from "@/app/dashboard/company/budget-planner/page";

describe("CSR Budget Planner", () => {
  it("switches year and updates displayed allocations", async () => {
    const user = userEvent.setup();
    render(<CsrBudgetPlannerPage />);

    expect(screen.getByText("₹125,000,000")).toBeInTheDocument();
    expect(screen.queryByText("Mobile Health Clinics")).not.toBeInTheDocument();

    const [yearSelect] = screen.getAllByRole("combobox");
    await user.click(yearSelect);
    await user.click(await screen.findByRole("option", { name: "2024" }));

    await waitFor(() => expect(screen.getByText("₹110,000,000")).toBeInTheDocument());
    expect(screen.getAllByText("Mobile Health Clinics")[0]).toBeInTheDocument();
    expect(screen.queryByText("Digital Literacy Pods")).not.toBeInTheDocument();
  });

  it("opens the edit drawer, sanitises inputs, and closes correctly", async () => {
    const user = userEvent.setup();
    render(<CsrBudgetPlannerPage />);

    await user.click(screen.getAllByRole("button", { name: /Edit allocation/ })[0]);

    const drawer = await screen.findByRole("dialog");
    expect(within(drawer).getByText(/Digital Literacy Pods/)).toBeInTheDocument();

    const input = within(drawer)
      .getAllByDisplayValue("34500000")
      .find((element) => element.getAttribute("type") === "text") as HTMLInputElement | undefined;
    expect(input).toBeDefined();
    if (!input) return;
    await user.clear(input);
    await user.type(input, "12ab34");
    expect(input).toHaveValue("1234");

    const saveButton = within(drawer).getByRole("button", { name: /Save changes/ });
    expect(saveButton).toBeEnabled();

    await user.click(saveButton);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("handles add allocation modal interactions", async () => {
    const user = userEvent.setup();
    render(<CsrBudgetPlannerPage />);

    await user.click(screen.getByRole("button", { name: /Add programme allocation/ }));

    const dialogs = await screen.findAllByRole("dialog");
    const modal = dialogs[dialogs.length - 1];
    expect(within(modal).getByText("Add programme allocation")).toBeInTheDocument();

    const amountInput = within(modal).getByDisplayValue("5000000");
    await user.clear(amountInput);
    await user.type(amountInput, "55abc0");
    expect(amountInput).toHaveValue("550");

    const saveAllocation = within(modal).getByRole("button", { name: /Save allocation/ });
    expect(saveAllocation).toBeEnabled();

    await user.click(within(modal).getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Add programme allocation" })).not.toBeInTheDocument());
  });
});
