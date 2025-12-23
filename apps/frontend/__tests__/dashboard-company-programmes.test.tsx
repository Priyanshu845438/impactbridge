import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CompanyProgrammeDirectoryPage from "@/app/dashboard/company/programmes/page";
import ProgrammeDetailPage from "@/app/dashboard/company/programmes/[id]/page";

jest.mock("@/hooks/use-debounced-value", () => ({
  useDebouncedValue: <T,>(value: T) => value,
}));

const mockPush = jest.fn();
let mockParams = { id: "programme-1" } as { id?: string };
const mockNotFound = jest.fn(() => undefined);

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useParams: () => mockParams,
  notFound: () => mockNotFound(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<"img">) => <img {...props} alt={props.alt ?? ""} />,
}));

describe("Company CSR programme directory", () => {
  it("renders filters and programme cards", () => {
    render(<CompanyProgrammeDirectoryPage />);

    expect(screen.getByRole("heading", { name: /CSR Programmes/i })).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
    expect(screen.getByPlaceholderText(/Search programme/i)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(0);
  });

  it("filters programmes by search and status", async () => {
    const user = userEvent.setup();
    render(<CompanyProgrammeDirectoryPage />);

    const searchInput = screen.getByPlaceholderText(/Search programme/i);
    await user.type(searchInput, "mobile health");

    expect(await screen.findByText(/Mobile Health Clinics/i)).toBeInTheDocument();

    const statusSelect = screen.getAllByRole("combobox")[1];
    await user.click(statusSelect);
    await user.click(screen.getByRole("option", { name: /Completed/i }));

    expect(screen.getByText(/No programmes match your filters/i)).toBeInTheDocument();
  });

  it("shows skeleton while loading", () => {
    const useStateSpy = jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [
        {
          category: "All",
          status: "All",
          region: "All",
          query: "",
        },
        jest.fn(),
      ])
      .mockImplementationOnce(() => [true, jest.fn()]);

    render(<CompanyProgrammeDirectoryPage />);

    expect(screen.getAllByTestId("programme-skeleton-card")).toHaveLength(6);

    useStateSpy.mockRestore();
  });
});

describe("Company CSR programme detail", () => {
  it("renders programme information and tabs", () => {
    render(<ProgrammeDetailPage />);

    expect(screen.getByRole("heading", { name: /Rural STEM Labs/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /banner/i })).toBeInTheDocument();
    expect(screen.getByText(/Programme overview/i)).toBeInTheDocument();
    expect(screen.getByText(/NGO profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Milestones/i)).toBeInTheDocument();
    expect(screen.getByText(/Documents/i)).toBeInTheDocument();
    expect(screen.getByText(/Updates/i)).toBeInTheDocument();
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it("handles invalid programme id with notFound", () => {
    mockParams = { id: "missing" };
    const notFoundError = new Error("notFound");
    mockNotFound.mockImplementation(() => {
      throw notFoundError;
    });

    expect(() => render(<ProgrammeDetailPage />)).toThrow(notFoundError);
    expect(mockNotFound).toHaveBeenCalled();

    mockParams = { id: "programme-1" };
    mockNotFound.mockImplementation(() => undefined);
  });
});

afterEach(() => {
  jest.clearAllMocks();
  mockParams = { id: "programme-1" };
});
