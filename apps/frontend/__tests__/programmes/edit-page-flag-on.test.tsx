import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditProgrammePage from "@/app/dashboard/company/programmes/[id]/edit/page";
import { programmes as mockProgrammes } from "@/app/dashboard/company/programmes/mock-data";

const mockMutate = jest.fn();

jest.mock("@/app/dashboard/company/programmes/hooks/useUpdateProgramme", () => ({
  useUpdateProgramme: () => ({ mutate: mockMutate }),
}));

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: mockProgrammes[0].id }),
  notFound: () => undefined,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("CSR programme edit page – API flag on", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it("submits updated values via hook mutation", async () => {
    const user = userEvent.setup();

    render(<EditProgrammePage />);

    expect(screen.getByLabelText(/Programme name/i)).toHaveValue(mockProgrammes[0].name);

    await user.clear(screen.getByLabelText(/Programme name/i));
    await user.type(screen.getByLabelText(/Programme name/i), "Updated CSR Programme");
    await user.clear(screen.getByLabelText(/Summary/i));
    await user.type(screen.getByLabelText(/Summary/i), "Updated summary for programme");

    await user.click(screen.getByLabelText(/Status/i));
    await user.click(screen.getByRole("option", { name: /Completed/i }));

    await user.click(screen.getByLabelText(/Category/i));
    await user.click(screen.getByRole("option", { name: /Healthcare/i }));

    await user.click(screen.getByLabelText(/Region/i));
    await user.click(screen.getByRole("option", { name: /Gujarat/i }));

    await user.click(screen.getByRole("button", { name: /Save changes/i }));

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        programmeId: mockProgrammes[0].id,
        name: "Updated CSR Programme",
        summary: "Updated summary for programme",
        status: "Completed",
        category: "Healthcare",
        region: "Gujarat",
      }),
      expect.any(Object),
    );
  });

  it("shows validation message when name empty", async () => {
    const user = userEvent.setup();

    render(<EditProgrammePage />);

    await user.clear(screen.getByLabelText(/Programme name/i));
    fireEvent.submit(screen.getByRole("button", { name: /Save changes/i }).closest("form")!);

    expect(screen.getByText(/Name and summary are required/i)).toBeInTheDocument();
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
